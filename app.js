// Complete Backend Folder & File Structure Dataset
const structureData = [
  {
    name: "config",
    type: "folder",
    icon: "🎛️",
    title: "/config",
    path: "config/",
    educative: "Central command center of your backend. It pulls configuration settings, database connections, and environment credentials into organized modules so you never have to hardcode keys or URLs directly in your core logic.",
    vibe: "The control room. It handles passport control and the secret handshakes needed to talk to your database or external APIs."
  },
  {
    name: "constants",
    type: "folder",
    icon: "🧊",
    title: "/constants",
    path: "constants/",
    educative: "Application anchors. This folder exports global read-only values that stay completely static (like user role strings, strict HTTP status codes, or consistent error configurations) so you never break your logic with a simple typo.",
    vibe: "The anchors. Keeps hardcoded strings safe so you don't break your server by spelling 'SUCCESS' three different ways."
  },
  {
    name: "routes",
    type: "folder",
    icon: "🚦",
    title: "/routes",
    path: "routes/",
    educative: "The URL highway map of your API. It maps specific endpoints (like /api/v1/users) to their corresponding controllers, dictating precisely which HTTP methods (GET, POST, PUT, DELETE) are permitted.",
    vibe: "The traffic cop. Redirects frontend requests to the proper rooms. If they use the wrong pathway, they hit a 404 dead end."
  },
  {
    name: "middleware",
    type: "folder",
    icon: "🥷",
    title: "/middleware",
    path: "middleware/",
    educative: "Request interceptors. Functions that run right in the middle of the request-response cycle. Crucial for handling auth token handshakes, requests logs, rate-limiting, and early defense validation.",
    vibe: "The VIP bouncer. Inspects incoming login tokens and blocks sketchy actors before they can even glance at the database."
  },
  {
    name: "validation",
    type: "folder",
    icon: "🧼",
    title: "/validation",
    path: "validation/",
    educative: "The security checkpoint. Contains schema definitions (using packages like Zod or Joi) and validation engines (validate.js) that strictly evaluate incoming requests payloads (req.body) before database parsing.",
    vibe: "The TSA checkpoint. Checks your data format at the door. Trying to send letters in a phone number? Denied."
  },
  {
    name: "controllers",
    type: "folder",
    icon: "🧠",
    title: "/controllers",
    path: "controllers/",
    educative: "The brains of your operation. Controllers coordinate the data processing. They parse client requests, retrieve or send structural operations to the models, and return response codes/payloads safely back.",
    vibe: "The kitchen chefs. They take the frontend's raw order, cook the data, plate it, and send it out to be served."
  },
  {
    name: "services",
    type: "folder",
    icon: "💼",
    title: "/services",
    path: "services/",
    educative: "Heavy-duty logic layers. Abstracts third-party system dependencies and database interactions (like Stripe payouts, email triggers, or custom search indexes) out of controllers, keeping your routes lightweight.",
    vibe: "The outsourced worker bees. Controllers take the credit, but services handle the messy, exhausting API requests."
  },
  {
    name: "models",
    type: "folder",
    icon: "📐",
    title: "/models",
    path: "models/",
    educative: "The database schematics. Models declare formatting blueprints using toolkits like Mongoose, Prisma, or Sequelize. They force raw data objects to strictly match structured specifications.",
    vibe: "The rigid blueprint. Tells the database: 'You must look exactly like this, or you aren't allowed to exist.' strict rules only."
  },
  {
    name: "templates",
    type: "folder",
    icon: "🎨",
    title: "/templates",
    path: "templates/",
    educative: "Dynamic structure engines. Stores raw formatting layouts like HTML, EJS, or Pug layouts. Primarily leveraged on the backend to render emails or generate clean PDF documents dynamically.",
    vibe: "The wardrobe department. Because raw data looks terrible in a user's inbox, we dress it up in HTML before sending it."
  },
  {
    name: "package.json",
    type: "file",
    icon: "📜",
    title: "package.json",
    path: "package.json",
    educative: "Your Node.js manifest. Outlines project identification metrics (name, scripts, authors) alongside metadata defining which explicit external dependency layers must be fetched to successfully build.",
    vibe: "The recipe card. The absolute core file containing startup commands and the main grocery list of packages."
  },
  {
    name: "package-lock.json",
    type: "file",
    icon: "🔒",
    title: "package-lock.json",
    path: "package-lock.json",
    educative: "The locked-down dependency tree. Tracks precise sub-dependency micro-versions at the millisecond of installations to ensure that environments across your local host and deployed clouds remain strictly identical.",
    vibe: "The locked contract. Guarantees that if the project compiles on my machine, it won't mysteriously fail on yours."
  },
  {
    name: "node_modules",
    type: "folder",
    icon: "📦",
    title: "node_modules/",
    path: "node_modules/",
    educative: "A compiled registry of all third-party dependencies downloaded via npm install. Unbelievably nested, as packages recursively fetch all sub-dependencies needed, expanding local project directories massively.",
    vibe: "The black hole. Heavier than a dying star. Contains 4GB of folders just so I can parse dates. Never try to push this to GitHub."
  },
  {
    name: "env",
    type: "file",
    icon: "🔑",
    title: ".env",
    path: ".env",
    educative: "Your security vault. Stores local credentials, production passwords, and highly-sensitive integration secrets outside the actual project codebase to ensure environment parity and absolute privacy.",
    vibe: "The top-secret vault. If you show this file on screen for even a microsecond, change your identities and delete your accounts immediately."
  },
  {
    name: "gitignore",
    type: "file",
    icon: "🙈",
    title: ".gitignore",
    path: ".gitignore",
    educative: "The version-control shield. Directs Git tracking engines to bypass local directories (like node_modules) or private configs (.env) to prevent catastrophic security leaks to public tracking hubs.",
    vibe: "The cover-up. Keeps your local secrets local. Missing this file is a direct, one-way ticket to a surprise server bill."
  },
  {
    name: "server.js",
    type: "file",
    icon: "🚀",
    title: "server.js",
    path: "server.js",
    educative: "The entry ignition node. Starts up server frameworks like Express, coordinates active database links, loads global server processes, and binds your app to a network port to safely stream incoming traffic.",
    vibe: "The ignition key. When you type 'npm run dev', this file wakes up the server and officially brings your logic to life."
  }
];

// DOM references
const fileTree = document.getElementById("fileTree");
const defaultScreen = document.getElementById("defaultScreen");
const editorContent = document.getElementById("editorContent");
const editorIcon = document.getElementById("editorIcon");
const editorTitle = document.getElementById("editorTitle");
const editorPath = document.getElementById("editorPath");
const editorEducative = document.getElementById("editorEducative");
const editorVibe = document.getElementById("editorVibe");
const tabBar = document.getElementById("tabBar");
const terminalOutput = document.getElementById("terminalOutput");

// State tracker
let activeTabElement = null;

// Populate Tree sidebar
function initTree() {
  structureData.forEach((item, index) => {
    const btn = document.createElement("button");
    // Classy VS Code styling: indentation, hover state, and icon support
    btn.className = `w-full text-left flex items-center space-x-2 py-1 px-4 transition-colors hover:bg-[#2a2d2e] focus:outline-none text-[#cccccc]`;
    btn.dataset.index = index;

    const labelColor = item.type === "folder" ? "text-[#e5c07b]" : "text-[#abb2bf]";
    const prefix = item.type === "folder" ? "📁 " : "📄 ";

    btn.innerHTML = `
      <span class="text-xs select-none w-4">${prefix}</span>
      <span class="text-[13px] ${labelColor}">${item.name}${item.type === 'folder' ? '/' : ''}</span>
    `;

    btn.addEventListener("click", () => handleSelection(btn, item));
    fileTree.appendChild(btn);
  });
}

// Handle Select Action
function handleSelection(treeElement, data) {
  // Clear highlighted state in sidebar
  Array.from(fileTree.children).forEach(child => child.classList.remove("bg-[#37373d]", "text-white"));

  // Highlight selected tree node
  treeElement.classList.add("bg-[#37373d]", "text-white");

  // Manage tabs
  updateEditorTabs(data);

  // Transition Content
  defaultScreen.classList.add("hidden");
  editorContent.classList.remove("hidden");

  editorIcon.innerText = data.icon;
  editorTitle.innerText = data.title;
  editorPath.innerText = data.path;
  editorEducative.innerText = data.educative;
  editorVibe.innerText = `"${data.vibe}"`;

  // Print corresponding terminal event logs
  simulateTerminalAction(data);
}

// Keep VS Code styled tabs clean at the top
function updateEditorTabs(data) {
  tabBar.innerHTML = ""; // Reset tabs

  const tab = document.createElement("div");
  tab.className = "bg-[#1e1e1e] text-white px-4 border-t-2 border-blue-500 flex items-center space-x-2 h-full text-xs font-semibold select-none border-r border-[#252526]";
  tab.innerHTML = `
    <span>${data.icon}</span>
    <span>${data.name}</span>
    <span class="hover:bg-gray-700 px-1 rounded cursor-pointer text-[10px]">✕</span>
  `;
  tabBar.appendChild(tab);
}

// Interactive Terminal Logger
function simulateTerminalAction(data) {
  const line = document.createElement("div");
  line.className = "text-yellow-400 font-light mt-1 border-l-2 border-yellow-500 pl-2 animate-fade-in";
  line.innerHTML = `→ Inspecting node: <span class="text-white">${data.path}</span> - Dynamic module initialized successfully.`;
  terminalOutput.appendChild(line);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Boot up app
initTree();
