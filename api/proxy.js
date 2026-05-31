const https = require("https");

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") { res.status(204).end(); return; }

  let body = "";
  req.on("data", chunk => body += chunk);
  req.on("end", () => {
    const options = {
      hostname: "api.anthropic.com",
      path: "/v1/messages",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
    };

    const proxy = https.request(options, apiRes => {
      res.status(apiRes.statusCode).setHeader("Content-Type", "application/json");
      apiRes.pipe(res);
    });
    proxy.on("error", err => {
      res.status(502).json({ error: { message: err.message } });
    });
    proxy.write(body);
    proxy.end();
  });
}
