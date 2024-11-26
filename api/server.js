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

// 절대 경로 설정
const distPath = path.join(process.cwd(), "dist", "client");
const indexHtml = path.join(distPath, "index.html");

const app = express();

// 정적 파일 제공 설정
if (isProduction) {
  app.use(base, express.static(distPath, { index: false }));
}

let vite;
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
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
      template = await fs.readFile("./index.html", "utf-8");
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule("./src/entry-server.tsx")).render;
    } else {
      try {
        template = await fs.readFile(indexHtml, "utf-8");
        render = (await import("./dist/server/entry-server.js")).render;
      } catch (err) {
        console.error("Error reading index.html:", err);
        return res.status(500).send("Server Error");
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
    res.status(500).end(e.stack);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;
