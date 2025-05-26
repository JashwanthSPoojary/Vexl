import express from "express";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";
dotenv.config();

const app = express();

app.use((req, res, next) => {
  const hostname = req.hostname;
  const subdomain = hostname.split(".")[0];
  if (!subdomain || subdomain === "localhost") {
    res.status(400).send("Invalid subdomain");
    return 
  }
  const proxy = createProxyMiddleware({
    target:process.env.CDN_URL,
    changeOrigin:true,
    pathRewrite:(path,req)=>{
        if(path==='/'){
            return `/__outputs/${subdomain}/index.html`;
        }
        return `/__outputs/${subdomain}/${path}`;
    }
  });
  return proxy(req,res,next);
});

app.listen(process.env.PORT, () =>
  console.log(`Proxy server running on ${process.env.PORT}`)
);
