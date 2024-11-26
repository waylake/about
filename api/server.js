import fs from "node:fs/promises";
import path from "path";
import express from "express";
import { createClient } from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";

// Contentful 클라이언트 설정
const contentfulClient = createClient({
  space: process.env.VITE_CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.VITE_CONTENTFUL_ACCESS_TOKEN || "",
});

// Vercel 환경에서의 경로 설정
const DIST_PATH = path.join(process.cwd(), "dist");
const CLIENT_PATH = path.join(DIST_PATH, "client");
const SERVER_PATH = path.join(DIST_PATH, "server");

const app = express();

// 정적 파일 제공 설정
if (isProduction) {
  app.use(base, express.static(CLIENT_PATH, { index: false }));
}

// 모든 요청 처리
app.use("*", async (req, res) => {
  try {
    const url = decodeURIComponent(req.originalUrl.replace(base, ""));
    let template;
    let render;
    let postMeta = null;

    // 특정 포스트 데이터 로드
    if (url.startsWith("blog/")) {
      const slug = url.split("blog/")[1];
      try {
        const response = await contentfulClient.getEntries({
          content_type: "blog",
          "fields.slug": slug,
          limit: 1,
        });
        const item = response.items[0];
        if (item) {
          postMeta = {
            title: item.fields.title || "",
            content: documentToHtmlString(item.fields.content),
            category: item.fields.category?.fields?.name || "Uncategorized",
            tags: Array.isArray(item.fields.tags) ? item.fields.tags : [],
            coverImage: item.fields.coverImage?.fields?.file?.url || "",
            publishDate: item.fields.publishDate || new Date().toISOString(),
          };
        }
      } catch (err) {
        console.error("Error fetching post data:", err);
      }
    }

    if (!isProduction) {
      const vite = await import("vite");
      const server = await vite.createServer({
        server: { middlewareMode: true },
        appType: "custom",
        base,
      });
      app.use(server.middlewares);
      template = await fs.readFile("index.html", "utf-8");
      template = await server.transformIndexHtml(url, template);
      render = (await server.ssrLoadModule("src/entry-server.tsx")).render;
    } else {
      try {
        template = await fs.readFile(
          path.join(CLIENT_PATH, "index.html"),
          "utf-8",
        );
        render = (await import(path.join(SERVER_PATH, "entry-server.js")))
          .render;
      } catch (err) {
        console.error("Error reading files:", err);
        return res.status(500).send("Server Error - Check file paths");
      }
    }

    const rendered = await render(url, postMeta);
    const html = template
      .replace("<!--app-head-->", rendered.head ?? "")
      .replace("<!--app-html-->", rendered.html ?? "")
      .replace(
        "<!--app-state-->",
        `<script>window.__INITIAL_DATA__ = ${JSON.stringify(postMeta)};</script>`,
      );

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e) {
    console.error("SSR Error:", e);
    res.status(500).send(`Server Error: ${e.message}`);
  }
});

export default app;
