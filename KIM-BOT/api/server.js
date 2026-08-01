"use strict";

/*
=========================================================
🤖 KIM-BOT — API SERVER
=========================================================
*/

const http = require("http");

const config = require("../bot/config");
const {
  getAllCommands,
  getCommandCount
} = require("../bot/commands");

const PORT = process.env.API_PORT || 3001;


/* ======================================================
   HELPERS
====================================================== */

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });

  res.end(JSON.stringify(data));
}


/* ======================================================
   SERVER
====================================================== */

const server = http.createServer((req, res) => {

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    });

    res.end();
    return;
  }


  if (req.method !== "GET") {
    sendJSON(res, 405, {
      success: false,
      message: "Method Not Allowed"
    });

    return;
  }


  const url =
    new URL(
      req.url,
      `http://${req.headers.host || "localhost"}`
    );


  /* =========================
     HEALTH
  ========================== */

  if (url.pathname === "/api/health") {

    sendJSON(res, 200, {
      success: true,
      status: "ok",
      service: "KIM-BOT API"
    });

    return;
  }


  /* =========================
     BOT STATUS
  ========================== */

  if (url.pathname === "/api/status") {

    sendJSON(res, 200, {
      success: true,
      bot: config.botName,
      version: config.version,
      owner: config.ownerName,
      prefix: config.prefix,
      online: false,
      message:
        "WhatsApp connection status will be connected later."
    });

    return;
  }


  /* =========================
     COMMANDS
  ========================== */

  if (url.pathname === "/api/commands") {

    sendJSON(res, 200, {
      success: true,
      count: getCommandCount(),
      commands: getAllCommands().map(command => ({
        name: command.name,
        description: command.description,
        category: command.category
      }))
    });

    return;
  }


  /* =========================
     404
  ========================== */

  sendJSON(res, 404, {
    success: false,
    message: "API route not found."
  });

});


/* ======================================================
   START
====================================================== */

server.listen(PORT, () => {

  console.log("");
  console.log("=================================");
  console.log("🤖 KIM-BOT API");
  console.log("=================================");
  console.log(`🚀 API running on port ${PORT}`);
  console.log("=================================");
  console.log("");

});


module.exports = server;
