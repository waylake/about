import fs from "node:fs/promises";
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

const templateHtml = isProduction
  ? await fs.readFile("./dist/client/index.html", "utf-8")
  : "";

const app = express();

// 프로덕션 환경에서 정적 파일 제공
if (isProduction) {
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;

  app.use(base, (req, res, next) => {
    console.log("Static file requested:", req.originalUrl);
    next();
  });

  app.use(base, sirv("./dist/client", { extensions: ["html"] }));
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
      console.log(`Fetching post data for slug: ${slug}`);
      try {
        const response = await contentfulClient.getEntries({
          content_type: "blog",
          "fields.slug": slug,
          limit: 1,
        });

        const item = response.items[0];
        console.log(item);
        if (item) {
          postMeta = {
            title: item.fields.title || "",
            content: documentToHtmlString(item.fields.content),
            category: item.fields.category?.fields?.name || "Uncategorized",
            tags: Array.isArray(item.fields.tags) ? item.fields.tags : [],
            coverImage: item.fields.coverImage?.fields?.file?.url || "",
            publishDate: item.fields.publishDate || new Date().toISOString(),
          };
        } else {
          console.warn(`Post not found for slug: ${slug}`);
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
      template = templateHtml;
      render = (await import("./dist/server/entry-server.js")).render;
    }

    const rendered = await render(url, postMeta);

    // 서버에서 로드한 데이터를 클라이언트에 전달
    const html = template
      .replace("<!--app-head-->", rendered.head ?? "")
      .replace("<!--app-html-->", rendered.html ?? "")
      .replace(
        "<!--app-state-->",
        `<script>window.__INITIAL_DATA__ = ${JSON.stringify(postMeta)};</script>`,
      );

    // 디버깅용 로그
    console.log("Initial Data Sent:", JSON.stringify(postMeta, null, 2));

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e) {
    console.error("SSR Error:", e);
    res.status(500).end(e.stack);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
