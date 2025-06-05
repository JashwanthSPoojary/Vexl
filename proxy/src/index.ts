import express from "express";
import { getDeploymentBySubdomain } from "./db";
import { createStaticFileProxy } from "./proxy";
import { generateFallbackHtml } from "./notFoundPage";
const app = express();

app.use(async (req, res, next) => {
  const hostname = req.hostname;
  const subdomain = hostname.split(".")[0];

  if (!subdomain || subdomain === "localhost") {
    res.status(400).setHeader("Content-Type", "text/html");
    res.end(generateFallbackHtml(subdomain));
    return;
  }
  try {
    const deployment = await getDeploymentBySubdomain(subdomain);

    if (!deployment) {
      res.status(400).setHeader("Content-Type", "text/html");
      res.end(generateFallbackHtml(subdomain));
      return;
    }

    const proxy = createStaticFileProxy({
      deployUrl: deployment.deployUrl,
      cdnUrl: process.env.CDN_URL!,
      fallbackHtml: generateFallbackHtml(deployment.deployUrl),
    });

    return proxy(req, res, next);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Proxy server running on port ${process.env.PORT || 3002}`)
);
