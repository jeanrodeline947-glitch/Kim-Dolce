"use strict";

/*
=========================================================
🤖 KIM-BOT v2 — COMMAND REGISTRY
Owner: KIM DOLCE
Prefix: .
=========================================================
*/

const commands = new Map();

/**
 * Register one or multiple command names.
 */
function add(names, description, category, handler) {
  for (const name of names) {
    const commandName = String(name).toLowerCase().trim();

    if (!commandName) continue;

    commands.set(commandName, {
      name: commandName,
      description,
      category,
      handler
    });
  }
}


/* ======================================================
   GENERAL
====================================================== */

add(["menu", "help"], "Show command menu", "General", "menu");
add(["ping"], "Check bot response", "General", "ping");
add(["alive"], "Check bot status", "General", "alive");
add(["botinfo", "info", "about"], "Bot information", "General", "botinfo");
add(["runtime", "uptime"], "Show bot runtime", "General", "runtime");
add(["owner", "creator"], "Show owner information", "General", "owner");
add(["version"], "Show bot version", "General", "version");
add(["status", "online"], "Show bot status", "General", "status");
add(["prefix"], "Show command prefix", "General", "prefix");
add(["commands", "cmd", "cmds"], "Show command count", "General", "menu");
add(["support"], "Show support information", "General", "support");
add(["repo"], "Project information", "General", "repo");
add(["website"], "Show website", "General", "website");
add(["date"], "Show server date", "General", "date");
add(["time"], "Show server time", "General", "time");


/* ======================================================
   GROUP
====================================================== */

add(["groupinfo", "ginfo"], "Group information", "Group", "groupinfo");
add(["admins", "admin"], "List group admins", "Group", "admins");
add(["members", "participants"], "List group members", "Group", "members");
add(["groupid"], "Show group ID", "Group", "groupid");
add(["groupname"], "Show group name", "Group", "groupinfo");
add(["grouplink"], "Show group link", "Group", "grouplink");
add(["groupdesc"], "Show group description", "Group", "groupinfo");
add(["groupowner"], "Show group owner", "Group", "admins");
add(["groupcreated"], "Group creation information", "Group", "groupinfo");
add(["groupstats"], "Group statistics", "Group", "groupinfo");
add(["listadmins"], "List group admins", "Group", "admins");
add(["listmembers"], "List group members", "Group", "members");


/* ======================================================
   MODERATION
====================================================== */

add(["promote"], "Promote a member", "Moderation", "promote");
add(["demote"], "Demote a member", "Moderation", "demote");
add(["remove", "kick"], "Remove a member", "Moderation", "remove");
add(["add"], "Add a member", "Moderation", "add");
add(["warn"], "Warn a member", "Moderation", "warn");
add(["warnings"], "Show warnings", "Moderation", "warnings");
add(["mute"], "Mute group", "Moderation", "mute");
add(["unmute"], "Unmute group", "Moderation", "unmute");
add(["lock"], "Lock group settings", "Moderation", "lock");
add(["unlock"], "Unlock group settings", "Moderation", "unlock");
add(["open"], "Open group settings", "Moderation", "open");
add(["close"], "Close group settings", "Moderation", "close");
add(["approve"], "Approve request", "Moderation", "approve");
add(["reject"], "Reject request", "Moderation", "reject");


/* ======================================================
   PROTECTION
====================================================== */

add(["antispam"], "Anti-spam protection", "Protection", "antispam");
add(["antilink"], "Anti-link protection", "Protection", "antilink");
add(["antitag"], "Anti-tag protection", "Protection", "antitag");
add(["antisticker"], "Anti-sticker protection", "Protection", "antisticker");
add(["antidelete"], "Anti-delete monitoring", "Protection", "antidelete");
add(["antiflood"], "Anti-flood protection", "Protection", "antiflood");
add(["antimention"], "Anti-mention protection", "Protection", "antitag");
add(["antibot"], "Bot protection", "Protection", "antibot");
add(["antifake"], "Fake account protection", "Protection", "antifake");
add(["antilinkgc"], "Group-link protection", "Protection", "antilink");
add(["antinsfw"], "Content filter", "Protection", "filter");
add(["protection", "protect"], "Protection settings", "Protection", "protection");


/* ======================================================
   WELCOME / EVENTS
====================================================== */

add(["welcome"], "Welcome message", "Automation", "welcome");
add(["goodbye"], "Goodbye message", "Automation", "goodbye");
add(["welcomeon"], "Enable welcome", "Automation", "welcomeon");
add(["welcomeoff"], "Disable welcome", "Automation", "welcomeoff");
add(["goodbyeon"], "Enable goodbye", "Automation", "goodbyeon");
add(["goodbyeoff"], "Disable goodbye", "Automation", "goodbyeoff");
add(["setwelcome"], "Set welcome message", "Automation", "setwelcome");
add(["setgoodbye"], "Set goodbye message", "Automation", "setgoodbye");
add(["events"], "Group events", "Automation", "events");
add(["joinmsg"], "Join message", "Automation", "welcome");
add(["leavemsg"], "Leave message", "Automation", "goodbye");


/* ======================================================
   MEDIA
====================================================== */

add(["sticker", "s"], "Create sticker from media", "Media", "sticker");
add(["toimg", "toimage"], "Convert sticker to image", "Media", "toimg");
add(["take"], "Change sticker pack information", "Media", "take");
add(["crop"], "Crop media", "Media", "crop");
add(["resize"], "Resize media", "Media", "resize");
add(["rotate"], "Rotate media", "Media", "rotate");
add(["flip"], "Flip media", "Media", "flip");
add(["blur"], "Blur media", "Media", "blur");
add(["caption"], "Add caption", "Media", "caption");
add(["watermark"], "Add watermark", "Media", "watermark");
add(["compress"], "Compress media", "Media", "compress");
add(["convert"], "Convert media", "Media", "convert");
add(["gif"], "Create GIF", "Media", "gif");
add(["mp4"], "Convert media to MP4", "Media", "mp4");
add(["mp3"], "Extract audio", "Media", "mp3");
add(["audio"], "Convert to audio", "Media", "audio");
add(["voice"], "Convert to voice", "Media", "voice");
add(["vv"], "View-once helper", "Media", "vv");
add(["save"], "Save media", "Media", "save");


/* ======================================================
   CONTACT / VCF
====================================================== */

add(["vcf", "card"], "Create contact card", "Contacts", "vcf");
add(["contact"], "Contact information", "Contacts", "contact");
add(["savecontact"], "Save contact", "Contacts", "savecontact");
add(["mycontact"], "Show contact", "Contacts", "mycontact");


/* ======================================================
   FUN
====================================================== */

add(["joke"], "Random joke", "Fun", "joke");
add(["quote"], "Random quote", "Fun", "quote");
add(["fact"], "Random fact", "Fun", "fact");
add(["truth"], "Truth question", "Fun", "truth");
add(["dare"], "Dare prompt", "Fun", "dare");
add(["8ball"], "Magic 8 ball", "Fun", "8ball");
add(["roll"], "Roll a number", "Fun", "roll");
add(["flipcoin"], "Flip a coin", "Fun", "coin");
add(["coin"], "Flip a coin", "Fun", "coin");
add(["dice"], "Roll dice", "Fun", "dice");
add(["choose"], "Choose between options", "Fun", "choose");
add(["random"], "Random response", "Fun", "random");
add(["rate"], "Rate something", "Fun", "rate");
add(["ship"], "Fun compatibility game", "Fun", "ship");
add(["compliment"], "Generate compliment", "Fun", "compliment");
add(["motivate"], "Motivation", "Fun", "motivate");
add(["wisdom"], "Random wisdom", "Fun", "quote");


/* ======================================================
   TEXT / UTILITY
====================================================== */

add(["calc", "calculate"], "Calculator", "Utility", "calc");
add(["qr"], "QR utility", "Utility", "qr");
add(["translate"], "Translate text", "Utility", "translate");
add(["short"], "Shorten URL", "Utility", "short");
add(["url"], "URL utility", "Utility", "url");
add(["encode"], "Encode text", "Utility", "encode");
add(["decode"], "Decode text", "Utility", "decode");
add(["base64"], "Base64 utility", "Utility", "base64");
add(["reverse"], "Reverse text", "Utility", "reverse");
add(["upper"], "Uppercase text", "Utility", "upper");
add(["lower"], "Lowercase text", "Utility", "lower");
add(["count", "length"], "Count text", "Utility", "count");
add(["repeat"], "Repeat text", "Utility", "repeat");
add(["timestamp"], "Timestamp", "Utility", "timestamp");


/* ======================================================
   AUTOMATION
====================================================== */

add(["autoreact"], "Automatic reactions", "Automation", "autoreact");
add(["autorecord"], "Automatic recording", "Automation", "autorecord");
add(["autoview"], "Automatic view", "Automation", "autoview");
add(["autotyping"], "Automatic typing", "Automation", "autotyping");
add(["autoread"], "Automatic read", "Automation", "autoread");
add(["autostatus"], "Automatic status", "Automation", "autostatus");
add(["statusreact"], "React to statuses", "Automation", "statusreact");
add(["statusview"], "View statuses", "Automation", "statusview");
add(["statussave"], "Save statuses", "Automation", "statussave");
add(["statusreply"], "Status reply", "Automation", "statusreply");


/* ======================================================
   DOWNLOAD
====================================================== */

add(["download", "dl"], "Download public media", "Download", "download");
add(["mediafire"], "Media utility", "Download", "download");
add(["telegram"], "Telegram media helper", "Download", "telegram");
add(["stickertelegram"], "Telegram sticker helper", "Download", "telegram");
add(["image"], "Image utility", "Download", "image");
add(["video"], "Video utility", "Download", "video");
add(["audio2"], "Audio utility", "Download", "audio");


/* ======================================================
   OWNER
====================================================== */

add(["setprefix"], "Change bot prefix", "Owner", "setprefix");
add(["setname"], "Change bot name", "Owner", "setname");
add(["setbio"], "Change bot bio", "Owner", "setbio");
add(["restart"], "Restart bot", "Owner", "restart");
add(["shutdown"], "Shutdown bot", "Owner", "shutdown");
add(["broadcast"], "Broadcast message", "Owner", "broadcast");
add(["block"], "Block user", "Owner", "block");
add(["unblock"], "Unblock user", "Owner", "unblock");
add(["join"], "Join a group", "Owner", "join");
add(["leave"], "Leave a group", "Owner", "leave");
add(["groups"], "List groups", "Owner", "groups");
add(["sessions"], "Session information", "Owner", "sessions");
add(["logs"], "Show bot logs", "Owner", "logs");
add(["clearcache"], "Clear cache", "Owner", "clearcache");
add(["maintenance"], "Maintenance mode", "Owner", "maintenance");


/* ======================================================
   AI
====================================================== */

add(["ai", "ask"], "AI assistant", "AI", "ai");
add(["question"], "Ask a question", "AI", "ai");
add(["summarize"], "Summarize text", "AI", "summarize");
add(["rewrite"], "Rewrite text", "AI", "rewrite");
add(["grammar"], "Grammar helper", "AI", "grammar");
add(["explain"], "Explain something", "AI", "explain");


/* ======================================================
   EXTRA ALIASES
====================================================== */

add(["allcmd"], "Show all commands", "General", "menu");
add(["listcmd"], "List commands", "General", "menu");
add(["features"], "Show features", "General", "menu");
add(["tools"], "Show tools", "General", "menu");
add(["bot"], "Bot information", "General", "botinfo");
add(["kim"], "KIM-BOT information", "General", "botinfo");


/* ======================================================
   API
====================================================== */

function getCommand(name) {
  return commands.get(
    String(name || "").toLowerCase().trim()
  );
}

function getAllCommands() {
  return [...commands.values()];
}

function getCommandCount() {
  return commands.size;
}

module.exports = {
  commands,
  getCommand,
  getAllCommands,
  getCommandCount
};
