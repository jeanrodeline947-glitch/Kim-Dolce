"use strict";

/*
=========================================================
🤖 KIM-BOT WEBSITE
Frontend script
=========================================================
*/

document.addEventListener("DOMContentLoaded", () => {
  console.log("🤖 KIM-BOT website loaded.");

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const statusElement =
    document.getElementById("bot-status");

  if (statusElement) {
    statusElement.textContent = "● Offline";
  }
});


/* ======================================================
   UTILITY
====================================================== */

function setBotStatus(status) {
  const statusElement =
    document.getElementById("bot-status");

  if (!statusElement) return;

  statusElement.textContent = status;
}


/* ======================================================
   FUTURE API CONNECTION
====================================================== */

async function getBotStatus() {
  /*
   * N ap konekte sa ak backend KIM-BOT
   * pita.
   */

  return {
    online: false,
    name: "KIM-BOT",
    version: "2.0.0"
  };
}
