import express from "express";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";
import { PrismaClient } from "@prisma/client";
dotenv.config();

const app = express();
const db = new PrismaClient();

app.use(async (req, res, next) => {
  const hostname = req.hostname;
  const subdomain = hostname.split(".")[0];
  if (!subdomain || subdomain === "localhost") {
    res.status(400).send("Invalid subdomain");
    return;
  }
  try {
    const data = await db.deployment.findFirst({
      where: {
        alternativeDeployUrl: subdomain,
      },
      select: {
        deployUrl: true,
      },
    });
    if (!data) {
      res.status(400).send("no subdomain named available");
      return;
    }
    const proxy = createProxyMiddleware({
      target: process.env.CDN_URL,
      changeOrigin: true,
      pathRewrite: (path, req) => {
        if (path === "/") {
          return `/__outputs/${data.deployUrl}/index.html`;
        }
        return `/__outputs/${data.deployUrl}/${path}`;
      },
    });
    return proxy(req, res, next);
  } catch (error) {
    console.log(error);
    res.status(400).send("Internal server error");
    return;
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Proxy server running on ${process.env.PORT}`)
);
