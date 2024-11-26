import { StaticRouter } from "react-router-dom/server";
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import HelmetAsync from "react-helmet-async";
import App from "./App";
import "./index.css";

const { HelmetProvider } = HelmetAsync;

export function render(
  url: string,
  postMeta?: {
    title?: string;
    description?: string;
    content?: string;
    category?: string;
    tags?: string[];
    coverImage?: string;
    publishDate?: string;
  },
) {
  const helmetContext: { helmet?: HelmetAsync.HelmetServerState } = {};

  // React 앱을 서버에서 렌더링
  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url} basename={process.env.BASE || "/"}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>,
  );

  const { helmet } = helmetContext;

  console.log(`POST META: ${JSON.stringify(postMeta)}`);

  // SEO 메타 태그 생성
  const seoHead = `
    ${helmet?.title?.toString() || `<title>${postMeta?.title || "Default Title"}</title>`}
    ${helmet?.meta?.toString() || ""}
    <meta property="og:title" content="${postMeta?.title || "Default Title"}" />
    <meta property="og:image" content="${postMeta?.coverImage?.slice(2) || "/default-image.png"}" />
    <meta name="category" content="${postMeta?.category || "Uncategorized"}" />
    <meta name="tags" content="${postMeta?.tags?.join(", ") || "No Tags"}" />
    <meta property="article:published_time" content="${postMeta?.publishDate || ""}" />
  `;

  // HTML 렌더링 결과 반환
  return {
    html,
    head: seoHead,
  };
}
