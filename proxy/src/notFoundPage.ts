import { Request, Response } from "express";

export function handleNotFound(
  req: Request,
  res: Response,
  deployUrl: string,
  fallbackHtml?: string
) {
  if ((req.path === "/" || req.path.endsWith(".html")) && fallbackHtml) {
    res.setHeader("Content-Type", "text/html");
    return res.status(200).send(fallbackHtml);
  }

  if (req.path.includes(".")) {
    return res.status(404).json({
      error: "File Not Found",
      path: req.path,
      deployUrl,
    });
  }

  res.status(404).send(generateFallbackHtml(deployUrl));
}

export function handleCdnError(
  req: Request,
  res: Response,
  statusCode: number,
  body: string
) {
  const isCdnDown =
    body.includes("Cloudflare") || body.includes("Access Denied");

  if (isCdnDown) {
    return res.status(503).json({
      error: "CDN Unavailable",
      message: "Temporary issue connecting to CDN",
      retryAfter: "30 seconds",
    });
  }

  res.status(statusCode).send(body);
}

export function generateFallbackHtml(deployUrl: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Page Not Found</title>
        <style>
          body { font-family: Arial; text-align: center; padding: 3em; }
          h1 { color: #e74c3c; }
        </style>
      </head>
      <body>
        <h1>404 - Not Found</h1>
        <p>Couldn't find the page in deployment: <strong>${deployUrl}</strong></p>
        <p>Please check the URL or try again later.</p>
      </body>
    </html>
  `;
}