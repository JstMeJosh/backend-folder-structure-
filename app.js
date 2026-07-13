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

// Reference DOM elements
const fileTree = document.getElementById("fileTree");
const defaultPrompt = document.getElementById("defaultPrompt");
const activeContent = document.getElementById("activeContent");
const activePath = document.getElementById("activePath");
const activeIcon = document.getElementById("activeIcon");
const activeTitle = document.getElementById("activeTitle");
const activeEducative = document.getElementById("activeEducative");
const activeVibe = document.getElementById("activeVibe");

// Render Sidebar Explorer
function renderTree() {
  structureData.forEach((item, index) => {
    const itemEl = document.createElement("button");
    itemEl.className = `w-full text-left flex items-center space-x-2.5 px-3 py-2 rounded-md transition-colors text-sm hover:bg-[#21262d] focus:outline-none focus:ring-1 focus:ring-blue-500`;
    itemEl.dataset.index = index;
    
    // Style folders differently from files for visual hierarchy
    const labelColor = item.type === "folder" ? "text-blue-300 font-medium" : "text-gray-300";
    
    itemEl.innerHTML = `
      <span class="text-base">${item.icon}</span>
      <span class="${labelColor}">${item.name}${item.type === 'folder' ? '/' : ''}</span>
    `;

    itemEl.addEventListener("click", () => handleSelect(itemEl, item));
    fileTree.appendChild(itemEl);
  });
}

// Handle Sidebar Item Selection
function handleSelect(element, item) {
  // Clear active styling on all explorer elements
  Array.from(fileTree.children).forEach(child => {
    child.classList.remove("bg-[#21262d]", "border-l-2", "border-blue-500", "pl-[10px]");
  });

  // Apply active styling to the clicked element
  element.classList.add("bg-[#21262d]", "border-l-2", "border-blue-500", "pl-[10px]");

  // Update Dynamic Panel Content with fade effect
  activeContent.classList.add("opacity-0");
  
  setTimeout(() => {
    defaultPrompt.classList.add("hidden");
    activeContent.classList.remove("hidden");
    
    activePath.innerText = item.path;
    activeIcon.innerText = item.icon;
    activeTitle.innerText = item.title;
    activeEducative.innerText = item.educative;
    activeVibe.innerText = item.vibe;

    activeContent.classList.remove("opacity-0");
  }, 150);
}

// Initialize on page load
renderTree();
