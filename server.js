"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const WEBSITE_DIR = path.join(__dirname, "website");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function sendFile(res, filePath) {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(500, {
        "Content-Type": "text/plain; charset=utf-8"
      });

      res.end("Server error.");
      return;
    }

    const extension =
      path.extname(filePath).toLowerCase();

    res.writeHead(200, {
      "Content-Type":
        MIME_TYPES[extension] ||
        "application/octet-stream"
    });

    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  if (req.method !== "GET") {
    res.writeHead(405, {
      "Content-Type": "text/plain; charset=utf-8"
    });

    res.end("Method Not Allowed");
    return;
  }

  let requestPath =
    decodeURIComponent(
      req.url.split("?")[0]
    );

  if (requestPath === "/") {
    requestPath = "/index.html";
  }

  const requestedFile =
    path.normalize(
      path.join(
        WEBSITE_DIR,
        requestPath
      )
    );

  /*
   * Prevent requests from escaping
   * the website directory.
   */

  if (
    !requestedFile.startsWith(
      WEBSITE_DIR + path.sep
    )
  ) {
    res.writeHead(403, {
      "Content-Type": "text/plain; charset=utf-8"
    });

    res.end("Forbidden");
    return;
  }

  fs.stat(requestedFile, (error, stats) => {
    if (!error && stats.isFile()) {
      sendFile(res, requestedFile);
      return;
    }

    const notFound =
      path.join(
        WEBSITE_DIR,
        "404.html"
      );

    fs.stat(notFound, (notFoundError) => {
      if (!notFoundError) {
        res.writeHead(404, {
          "Content-Type":
            "text/html; charset=utf-8"
        });

        fs.readFile(notFound, (readError, data) => {
          if (readError) {
            res.end("404 — Page Not Found");
            return;
          }

          res.end(data);
        });

        return;
      }

      res.writeHead(404, {
        "Content-Type":
          "text/plain; charset=utf-8"
      });

      res.end("404 — Page Not Found");
    });
  });
});

server.listen(PORT, () => {
  console.log("");
  console.log("=================================");
  console.log("🌐 KIM-BOT WEBSITE");
  console.log("=================================");
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("=================================");
  console.log("");
});

module.exports = server;
