"use strict";

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

const P = require("pino");
const qrcode = require("qrcode-terminal");
const path = require("path");

const config = require("./config");
const {
  getCommand,
  getAllCommands,
  getCommandCount
} = require("./commands");

let sock = null;

const sessionPath = path.join(
  __dirname,
  config.sessionFolder
);

async function startBot() {
  try {
    const { state, saveCreds } =
      await useMultiFileAuthState(sessionPath);

    const { version } =
      await fetchLatestBaileysVersion();

    sock = makeWASocket({
      version,
      auth: state,
      logger: P({
        level: "silent"
      }),
      printQRInTerminal: false,
      browser: [
        config.botName,
        "Chrome",
        config.version
      ]
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on(
      "connection.update",
      ({ connection, lastDisconnect, qr }) => {

        if (qr) {
          console.clear();

          console.log(
            "\n================================="
          );
          console.log("🤖 " + config.botName);
          console.log("📱 Scan QR Code la");
          console.log("=================================\n");

          qrcode.generate(qr, {
            small: true
          });
        }

        if (connection === "open") {
          console.log("\n=================================");
          console.log("✅ KIM-BOT konekte!");
          console.log("👑 Owner: " + config.ownerName);
          console.log("⚡ Prefix: " + config.prefix);
          console.log(
            "📚 Commands: " + getCommandCount()
          );
          console.log("=================================\n");
        }

        if (connection === "close") {

          const statusCode =
            lastDisconnect?.error?.output
              ?.statusCode;

          const shouldReconnect =
            statusCode !==
            DisconnectReason.loggedOut;

          console.log(
            "❌ Koneksyon fèmen."
          );

          if (shouldReconnect) {
            console.log(
              "🔄 KIM-BOT ap rekonekte..."
            );

            setTimeout(() => {
              startBot();
            }, 3000);
          } else {
            console.log(
              "🔐 Session dekonekte. Rekonekte bot la."
            );
          }
        }
      }
    );

    sock.ev.on(
      "messages.upsert",
      async ({ messages }) => {

        try {
          const msg = messages[0];

          if (!msg || !msg.message) return;

          if (msg.key.fromMe) return;

          const jid = msg.key.remoteJid;

          if (!jid) return;

          const messageType =
            Object.keys(msg.message)[0];

          let text = "";

          if (
            messageType === "conversation"
          ) {
            text = msg.message.conversation;
          }

          if (
            messageType === "extendedTextMessage"
          ) {
            text =
              msg.message.extendedTextMessage
                ?.text || "";
          }

          if (!text) return;

          text = text.trim();

          if (!text.startsWith(config.prefix)) {
            return;
          }

          const body = text.slice(
            config.prefix.length
          ).trim();

          if (!body) return;

          const parts = body.split(/\s+/);

          const commandName =
            parts.shift().toLowerCase();

          const args = parts;

          const command =
            getCommand(commandName);

          if (!command) {
            return;
          }

          console.log(
            `📥 ${config.prefix}${commandName}`
          );

          await handleCommand({
            sock,
            msg,
            jid,
            command,
            commandName,
            args,
            text
          });

        } catch (error) {

          console.error(
            "Command error:",
            error
          );
        }
      }
    );

  } catch (error) {

    console.error(
      "❌ Bot startup error:",
      error
    );

    setTimeout(() => {
      startBot();
    }, 5000);
  }
}


/* ======================================================
   COMMAND HANDLER
====================================================== */

async function handleCommand({
  sock,
  msg,
  jid,
  command,
  commandName,
  args,
  text
}) {

  const handler = command.handler;

  /*
   * Commands ki deja gen backend reyèl
   * ap antre isit la youn pa youn.
   */

  switch (handler) {

    case "ping":
      await sock.sendMessage(jid, {
        text: "🏓 Pong!\n\n🤖 KIM-BOT ap fonksyone."
      });
      break;


    case "alive":
    case "status":
      await sock.sendMessage(jid, {
        text:
          "🟢 KIM-BOT ONLINE\n\n" +
          "🤖 " + config.botName + "\n" +
          "⚡ Prefix: " + config.prefix + "\n" +
          "📚 Commands: " + getCommandCount()
      });
      break;


    case "botinfo":
      await sock.sendMessage(jid, {
        text:
          "🤖 *KIM-BOT*\n\n" +
          "👑 Owner: " + config.ownerName + "\n" +
          "📦 Version: " + config.version + "\n" +
          "⚡ Prefix: " + config.prefix + "\n" +
          "📚 Commands: " + getCommandCount()
      });
      break;


    case "owner":
      await sock.sendMessage(jid, {
        text:
          "👑 Owner KIM-BOT:\n\n" +
          config.ownerName
      });
      break;


    case "prefix":
      await sock.sendMessage(jid, {
        text:
          "⚡ Prefix aktyèl la se: " +
          config.prefix
      });
      break;


    case "version":
      await sock.sendMessage(jid, {
        text:
          "📦 KIM-BOT v" +
          config.version
      });
      break;


    case "commands":
    case "menu":

      await sendMenu(sock, jid);

      break;


    case "date":
      await sock.sendMessage(jid, {
        text:
          "📅 " +
          new Date().toLocaleDateString()
      });
      break;


    case "time":
      await sock.sendMessage(jid, {
        text:
          "🕐 " +
          new Date().toLocaleTimeString()
      });
      break;


    case "runtime":
      await sock.sendMessage(jid, {
        text:
          "⏱️ Bot la ap fonksyone.\n" +
          "🟢 Status: Online"
      });
      break;


    default:

      await sock.sendMessage(jid, {
        text:
          "⚠️ Command *." +
          commandName +
          "* an egziste nan KIM-BOT,\n" +
          "men backend li poko aktive.\n\n" +
          "📌 N ap ajoute fonksyon an youn pa youn."
      });

      break;
  }
}


/* ======================================================
   MENU
====================================================== */

async function sendMenu(sock, jid) {

  const allCommands =
    getAllCommands();

  const categories = {};

  for (const command of allCommands) {

    if (!categories[command.category]) {
      categories[command.category] = [];
    }

    categories[command.category].push(
      command
    );
  }

  let menu =
    "╭━━━〔 🤖 KIM-BOT 〕━━━╮\n";

  menu +=
    "┃ 👑 " +
    config.ownerName +
    "\n";

  menu +=
    "┃ ⚡ Prefix: " +
    config.prefix +
    "\n";

  menu +=
    "┃ 📚 Commands: " +
    allCommands.length +
    "\n";

  menu +=
    "╰━━━━━━━━━━━━━━━━━━╯\n\n";


  for (const category of Object.keys(categories)) {

    menu +=
      "╭─〔 " +
      category.toUpperCase() +
      " 〕\n";

    for (
      const command of categories[category]
    ) {

      menu +=
        "│ " +
        config.prefix +
        command.name +
        " — " +
        command.description +
        "\n";
    }

    menu += "╰──────────────\n\n";
  }

  await sock.sendMessage(jid, {
    text: menu
  });
}


/* ======================================================
   START
====================================================== */

console.log(
  "\n🚀 Starting " +
  config.botName +
  "...\n"
);

startBot();


/* ======================================================
   EXPORT
====================================================== */

module.exports = {
  startBot
};
