"use strict";

/*
=========================================================
🤖 KIM-BOT — WEBSITE API CLIENT
=========================================================
*/

const KIMBOT_API = {

  baseURL: "/api",

  async request(endpoint, options = {}) {

    const response = await fetch(
      this.baseURL + endpoint,
      {
        method: options.method || "GET",

        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {})
        },

        body: options.body
          ? JSON.stringify(options.body)
          : undefined
      }
    );

    let data = {};

    try {
      data = await response.json();
    } catch {
      data = {};
    }

    if (!response.ok) {
      throw new Error(
        data.message ||
        "API request failed."
      );
    }

    return data;
  },


  /* =========================
     BOT STATUS
  ========================== */

  async getStatus() {
    return this.request("/status");
  },


  /* =========================
     COMMANDS
  ========================== */

  async getCommands() {
    return this.request("/commands");
  },


  /* =========================
     HEALTH
  ========================== */

  async health() {
    return this.request("/health");
  }

};


/*
=========================================================
GLOBAL
=========================================================
*/

window.KIMBOT_API = KIMBOT_API;
