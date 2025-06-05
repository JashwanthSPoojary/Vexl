import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { handleCdnError, handleNotFound } from "./notFoundPage";

interface ProxyOptions {
  deployUrl: string;
  cdnUrl: string;
  fallbackHtml?: string;
}

export function createStaticFileProxy({
  deployUrl,
  cdnUrl,
  fallbackHtml,
}: ProxyOptions) {
  return createProxyMiddleware({
    target: cdnUrl,
    changeOrigin: true,
    selfHandleResponse: true,
    pathRewrite: (path) => {
      if (path === "/") {
        return `/__outputs/${deployUrl}/index.html`;
      }
      return `/__outputs/${deployUrl}/${path}`;
    },
    on: {
      proxyRes: (proxyRes, req, res) => {
        const expressReq = req as ExpressRequest;
        const expressRes = res as ExpressResponse;

        if (proxyRes.statusCode === 404) {
          return handleNotFound(
            expressReq,
            expressRes,
            deployUrl,
            fallbackHtml
          );
        }

        if (proxyRes.statusCode! >= 400) {
          let body = "";
          proxyRes.on("data", (chunk) => (body += chunk));
          proxyRes.on("end", () =>
            handleCdnError(expressReq, expressRes, proxyRes.statusCode!, body)
          );
          return;
        }

        expressRes.status(proxyRes.statusCode!);
        Object.entries(proxyRes.headers).forEach(([key, val]) => {
          if (val) expressRes.setHeader(key, val as string);
        });

        proxyRes.pipe(expressRes);
      },
    },
  });
}
