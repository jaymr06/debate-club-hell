require('dotenv').config();
const http  = require("http");
const https = require("https");

const PORT = 3001;

http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") { res.writeHead(204); res.end(); return; }

  let body = "";
  req.on("data", chunk => body += chunk);
  req.on("end", () => {
    const options = {
      hostname: "api.anthropic.com",
      path:     "/v1/messages",
      method:   "POST",
      headers: {
        "Content-Type":      "application/json",
        "Content-Length":    Buffer.byteLength(body),
        "x-api-key":         process.env.ANTHROPIC_API_KEY,
        "anthropic-version": req.headers["anthropic-version"] || "2023-06-01",
      },
    };

    const proxy = https.request(options, apiRes => {
      res.writeHead(apiRes.statusCode, { "Content-Type": "application/json" });
      apiRes.pipe(res);
    });
    proxy.on("error", err => {
      res.writeHead(502); res.end(JSON.stringify({ error: { message: err.message } }));
    });
    proxy.write(body);
    proxy.end();
  });
}).listen(PORT, () => console.log(`Proxy running at http://localhost:${PORT}`));