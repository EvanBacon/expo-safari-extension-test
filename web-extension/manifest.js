const manifest = () => {
  return {
    manifest_version: 2,
    default_locale: "en",

    name: "__MSG_extension_name__",
    description: "__MSG_extension_description__",
    version: "1.0",

    icons: {
      48: "images/icon/icon-48.png",
      96: "images/icon/icon-96.png",
      128: "images/icon/icon-128.png",
      256: "images/icon/icon-256.png",
      512: "images/icon/icon-512.png",
    },

    host_permissions: [
      "http://www.localhost:19000/",
      "https://www.localhost:19000/",
      "*://localhost/*",
    ],
    externally_connectable: {
      matches: ["http://localhost/*"],
    },

    // Implicit permissions
    permissions: [
        // Non-sensitive -- doesn't require any extra privileges
        "alarms", "clipboardWrite","menus",
        "nativeMessaging", "storage",
        // sensitive -- these include website identifying info
        "cookies", "tabs", "webNavigation",

        // Avoid alerts
        "activeTab"
    ],

    background: {
      scripts: ["src/_background.js"],
      persistent: false,
    },

    // Injects the following script...
    content_scripts: [
      {
        matches: ["*://*/*"],
        match_about_blank: true,
        js: ["src/_main.js"],
        all_frames: true,
        run_at: "document_start",
      },
    ],

    browser_action: {
      default_popup: "src/index.html",
      default_icon: {
        16: "images/toolbar/icon-16.png",
        19: "images/toolbar/icon-19.png",
        32: "images/toolbar/icon-32.png",
        38: "images/toolbar/icon-38.png",
        48: "images/toolbar/icon-48.png",
        72: "images/toolbar/icon-72.png",
      },
    },
  };
};

(() => {
  const fs = require("fs");
  const path = require("path");
  const contents = manifest();
  fs.writeFileSync(
    path.join(__dirname, "manifest.json"),
    JSON.stringify(contents, null, 2),
    "utf8"
  );
})();
