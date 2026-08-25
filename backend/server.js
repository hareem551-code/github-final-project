import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 5000;

const server = http.createServer((req, res) => {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle OPTIONS request
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // GET products
  if (req.method === "GET" && req.url === "/api/products") {
    const productsPath = path.join(
      __dirname,
      "data",
      "products.json"
    );

    fs.readFile(productsPath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, {
          "Content-Type": "application/json",
        });

        res.end(
          JSON.stringify({
            message: "Could not read products.json",
            error: err.message,
          })
        );

        return;
      }

      try {
        const products = JSON.parse(data);

        res.writeHead(200, {
          "Content-Type": "application/json",
        });

        res.end(JSON.stringify(products));
      } catch (error) {
        res.writeHead(500, {
          "Content-Type": "application/json",
        });

        res.end(
          JSON.stringify({
            message: "products.json contains invalid JSON",
            error: error.message,
          })
        );
      }
    });

    return;
  }

  // Route not found
  res.writeHead(404, {
    "Content-Type": "application/json",
  });

  res.end(
    JSON.stringify({
      message: "Route not found",
    })
  );
});

server.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});