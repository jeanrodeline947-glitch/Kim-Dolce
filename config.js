"use strict";

/*
=========================================================
🤖 KIM-BOT — CONFIGURATION
=========================================================
*/

module.exports = {

  /* =========================
     BOT INFORMATION
  ========================== */

  botName: "KIM-BOT",

  version: "2.0.0",

  ownerName: "KIM DOLCE",


  /* =========================
     COMMAND SETTINGS
  ========================== */

  prefix: ".",

  commandMode: "prefix",


  /* =========================
     SESSION
  ========================== */

  sessionFolder: "session",


  /* =========================
     WEBSITE
  ========================== */

  websiteName: "KIM-BOT",

  websiteUrl: "",


  /* =========================
     BOT SETTINGS
  ========================== */

  autoReconnect: true,

  showCommandErrors: true,

  logCommands: true,


  /* =========================
     SECURITY
  ========================== */

  ownerOnlyCommands: [
    "setprefix",
    "setname",
    "setbio",
    "restart",
    "shutdown",
    "broadcast",
    "block",
    "unblock",
    "join",
    "leave",
    "groups",
    "sessions",
    "logs",
    "clearcache",
    "maintenance"
  ]

};
