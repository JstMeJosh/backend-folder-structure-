const structureData = [
  {
    name: "config",
    type: "folder",
    icon: "🎛️",
    title: "/config",
    path: "config/",
    educative: "Houses configuration settings, database connections, and environment credentials module loaders. Consolidating setups here stops your application logic from being littered with hardcoded connections, ensuring environment changes only require updating a single centralized config file.",
    vibe: "Initializes the secure connection state logic. The main server imports this to securely establish a handshaking interface with external resources and APIs.",
    code: `// config/db.js\nconst mongoose = require('mongoose');\n\nconst connectDatabase = async () => {\n  try {\n    const conn = await mongoose.connect(process.env.MONGO_URI);\n    console.log(\`MongoDB Connected: \${conn.connection.host}\`);\n  } catch (error) {\n    console.error(\`Database connection failed: \${error.message}\`);\n    process.exit(1);\n  }\n};\n\nmodule.exports = connectDatabase;`
  },
  {
    name: "constants",
    type: "folder",
    icon: "🧊",
    title: "/constants",
    path: "constants/",
    educative: "Maintains read-only variable assertions (such as defined user roles, strict HTTP system status codes, or static error labels). Declaring system states as exports here ensures code autocomplete is clean and prevents typos from introducing silent runtime bugs.",
    vibe: "Acts as the structural source-of-truth. Reference variables here when firing HTTP status payloads or matching permissions restrictions.",
    code: `// constants/roles.js\nconst USER_ROLES = {\n  ADMIN: 'ADMIN',\n  USER: 'USER',\n  GUEST: 'GUEST'\n};\n\nconst STATUS_CODES = {\n  OK: 200,\n  CREATED: 201,\n  BAD_REQUEST: 400,\n  UNAUTHORIZED: 401,\n  INTERNAL_ERROR: 500\n};\n\nmodule.exports = { USER_ROLES, STATUS_CODES };`
  },
  {
    name: "routes",
    type: "folder",
    icon: "🚦",
    title: "/routes",
    path: "routes/",
    educative: "Specifies endpoint URL mappings. When an incoming network query is captured, the route module assesses the HTTP verb and directly forwards the processing execution stack to its target controller logic.",
    vibe: "Serves as the gateway controller. It directly controls structural entry patterns and links routing parameters to middlewares and schemas.",
    code: `// routes/auth.routes.js\nconst express = require('express');\nconst router = express.Router();\nconst { loginUser, registerUser } = require('../controllers/authController');\nconst { validateSchema } = require('../validation/validate');\nconst { userSchema } = require('../validation/schemas/userSchema');\n\nrouter.post('/register', validateSchema(userSchema), registerUser);\nrouter.post('/login', loginUser);\n\nmodule.exports = router;`
  },
  {
    name: "middleware",
    type: "folder",
    icon: "🥷",
    title: "/middleware",
    path: "middleware/",
    educative: "Contains logic execution blocks that intercept HTTP cycles. It acts as an early gatekeeper to handle user authorization verification (e.g., verifying JWT keys), manage server request auditing, or filter payload sizes before a request hits the controller layer.",
    vibe: "Ensures controller endpoints remain safe. Requests that fail middleware parsing parameters are directly rejected, preventing downstream overhead.",
    code: `// middleware/auth.js\nconst jwt = require('jsonwebtoken');\n\nconst protect = (req, res, next) => {\n  const token = req.headers.authorization?.split(' ')[1];\n  if (!token) {\n    return res.status(401).json({ error: "Access Denied. No token provided." });\n  }\n  try {\n    req.user = jwt.verify(token, process.env.JWT_SECRET);\n    next();\n  } catch (error) {\n    res.status(401).json({ error: "Invalid Token" });\n  }\n};\n\nmodule.exports = { protect };`
  },
  {
    name: "validation",
    type: "folder",
    icon: "🧼",
    title: "/validation",
    path: "validation/",
    educative: "Specifies schema parsing profiles using tools like Zod or Joi. The engine evaluates payload values (req.body) against precise strict definitions (e.g., matching length requirements or checking string formats) before processing.",
    vibe: "Sanitizes incoming payloads early in the execution lifecycle, preventing corrupt or malformed datasets from processing.",
    code: `// validation/validate.js\nconst validateSchema = (schema) => (req, res, next) => {\n  const result = schema.safeParse(req.body);\n  if (!result.success) {\n    return res.status(400).json({\n      errors: result.error.errors.map(err => err.message)\n    });\n  }\n  next();\n};`
  },
  {
    name: "controllers",
    type: "folder",
    icon: "🧠",
    title: "/controllers",
    path: "controllers/",
    educative: "Directly coordinates client interactions. The controller unpacks query headers, reads payloads, references backend computational layers, and responds with appropriate status payloads.",
    vibe: "Acts as the bridge layer. Keeps business data processing isolated from low-level database operations by passing calls downward.",
    code: `// controllers/authController.js\nconst { registerNewUser } = require('../services/userService');\n\nconst registerUser = async (req, res) => {\n  try {\n    const user = await registerNewUser(req.body);\n    res.status(201).json({ success: true, data: user });\n  } catch (err) {\n    res.status(500).json({ error: err.message });\n  }\n};\n\nmodule.exports = { registerUser };`
  },
  {
    name: "services",
    type: "folder",
    icon: "💼",
    title: "/services",
    path: "services/",
    educative: "Encapsulates heavy business computation logic. Isolating complex third-party system interactions (like processing Stripe payments or triggering SMS/email alerts) keeping controller actions thin, clean, and testable.",
    vibe: "Maintains decoupling standards. Reusable logic interfaces live here, keeping models and routers completely free of side effects.",
    code: `// services/userService.js\nconst User = require('../models/User');\nconst bcrypt = require('bcrypt');\n\nconst registerNewUser = async (userData) => {\n  const hashedPassword = await bcrypt.hash(userData.password, 10);\n  return await User.create({\n    username: userData.username,\n    email: userData.email,\n    password: hashedPassword\n  });\n};\n\nmodule.exports = { registerNewUser };`
  },
  {
    name: "models",
    type: "folder",
    icon: "📐",
    title: "/models",
    path: "models/",
    educative: "Configures explicit database blueprints utilizing engines like Mongoose or Prisma. Declaring schemas enforces structure on collections and limits what fields can be created or updated.",
    vibe: "Enforces data models. Ensures write actions strictly adhere to the defined properties, types, and relationships.",
    code: `// models/User.js\nconst mongoose = require('mongoose');\n\nconst UserSchema = new mongoose.Schema({\n  username: { type: String, required: true },\n  email: { type: String, required: true, unique: true },\n  password: { type: String, required: true }\n}, { timestamps: true });\n\nmodule.exports = mongoose.model('User', UserSchema);`
  },
  {
    name: "templates",
    type: "folder",
    icon: "🎨",
    title: "/templates",
    path: "templates/",
    educative: "Stores dynamic rendering layout assets (like HTML structures, EJS pages, or invoice blueprints). When triggered, dynamic data gets merged directly into these templates before execution.",
    vibe: "Keeps UI elements separate from calculations. Separating long styling blocks or HTML strings keeps your backend code clean.",
    code: `\n<div style="font-family: Arial, sans-serif; padding: 20px;">\n  <h1>Welcome back, {{username}}!</h1>\n  <p>Your authentication tokens have been successfully generated.</p>\n  <a href="{{url}}">Go to Dashboard</a>\n</div>`
  },
  {
    name: "package.json",
    type: "file",
    icon: "📜",
    title: "package.json",
    path: "package.json",
    educative: "The Node.js project manifest file. Keeps track of descriptive metadata (app name, package version, entrypoints) along with system commands and lists dependencies required to build the application.",
    vibe: "Declares structural dependency profiles. When setting up a new environment, running npm install reads this file to build the local dependency folder.",
    code: `{\n  "name": "unilag-backend-anatomy",\n  "version": "1.0.0",\n  "main": "server.js",\n  "scripts": {\n    "start": "node server.js",\n    "dev": "nodemon server.js"\n  },\n  "dependencies": {\n    "bcrypt": "^5.1.1",\n    "express": "^4.19.2",\n    "mongoose": "^8.2.1",\n    "zod": "^3.22.4"\n  }\n}`
      },
  {
    name: "package-lock.json",
    type: "file",
    icon: "🔒",
    title: "package-lock.json",
    path: "package-lock.json",
    educative: "Locks down the absolute dependency tree layout. It tracks exact sub-dependency version hashes at install-time, which guarantees identical local builds across other developers' machines or servers.",
    vibe: "Should never be updated manually. Node handles lock profiles during updates to ensure environmental parity across server instances.",
    code: `{\n  "name": "unilag-backend-anatomy",\n  "version": "1.0.0",\n  "lockfileVersion": 3,\n  "requires": true,\n  "packages": {\n    "": {\n      "name": "unilag-backend-anatomy",\n      "dependencies": {\n        "express": "^4.19.2"\n      }\n    }\n  }\n}`
  },
  {
    name: "node_modules",
    type: "folder",
    icon: "📦",
    title: "node_modules/",
    path: "node_modules/",
    educative: "Stores all downloaded external libraries compiled during node installation processes. Since node packages can contain hundreds of other dependencies, this folder rapidly balloons in size.",
    vibe: "Your local runtime environment. These packages run locally and should always be kept out of your remote repository.",
    code: `// [FOLDER REFERENCE - node_modules/]\n// Auto-generated package directory.\n// Contains:\n//   - lodash/\n//   - express/\n//   - mongoose/\n//   - ...and hundreds of other nested dependencies.`
  },
  {
    name: "env",
    type: "file",
    icon: "🔑",
    title: ".env",
    path: ".env",
    educative: "Acts as your secure environmental vault. Houses server configurations, database passwords, and critical integration tokens completely decoupled from your tracking systems.",
    vibe: "Environmental configuration file. Sensitive credentials should always live here to prevent credential exposure in shared spaces.",
    code: `PORT=5000\nMONGO_URI="mongodb+srv://admin:securePassword123@cluster0.abc.mongodb.net/prod_db"\nJWT_SECRET="super_secret_unilag_token_generator_key"\nSTRIPE_SECRET_KEY="sk_test_51O..."`
  },
  {
    name: "gitignore",
    type: "file",
    icon: "🙈",
    title: ".gitignore",
    path: ".gitignore",
    educative: "Guides code monitoring engines to intentionally bypass files or folders (like the .env configuration or the node_modules cache) so they are not tracked by Git.",
    vibe: "Essential for repository security. Ensures local files and sensitive credentials never accidentally leak to public environments.",
    code: `node_modules/\n.env\n.env.local\ndist/\nbuild/\n.DS_Store`
  },
  {
    name: "server.js",
    type: "file",
    icon: "🚀",
    title: "server.js",
    path: "server.js",
    educative: "The bootstrap entry point. Imports your main application configuration files, binds the API endpoints, opens database streams, and starts listening on a network port.",
    vibe: "The ignition key. When executing system start commands, Node reads this index file first to initialize the server runtime environment.",
    code: `// server.js\nrequire('dotenv').config();\nconst express = require('express');\nconst connectDatabase = require('./config/db');\n\nconst app = express();\nconnectDatabase();\n\napp.use(express.json());\napp.use('/api/v1/auth', require('./routes/auth.routes'));\n\nconst PORT = process.env.PORT || 5000;\napp.listen(PORT, () => console.log(\`Server is running on port \${PORT}\`));`
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
const codeViewer = document.getElementById("codeViewer");
const tabBar = document.getElementById("tabBar");
const terminalOutput = document.getElementById("terminalOutput");

// Initialize Sidebar Tree
function initTree() {
  structureData.forEach((item, index) => {
    const btn = document.createElement("button");
    // Responsive responsive sizing with standard VS Code tree styles
    btn.className = `w-full text-left flex items-center space-x-2 py-1.5 px-4 transition-all duration-150 hover:bg-[#2a2d2e] focus:outline-none text-[#cccccc] shrink-0`;
    btn.dataset.index = index;

    const labelColor = item.type === "folder" ? "text-[#e5c07b]" : "text-[#abb2bf]";
    const prefix = item.type === "folder" ? "📁 " : "📄 ";

    btn.innerHTML = `
      <span class="text-xs select-none w-4">${prefix}</span>
      <span class="text-[13px] code-font ${labelColor}">${item.name}${item.type === 'folder' ? '/' : ''}</span>
    `;

    btn.addEventListener("click", () => handleSelection(btn, item));
    fileTree.appendChild(btn);
  });
}

// Handle Sidebar Item Selection
function handleSelection(treeElement, data) {
  // Reset highlighted items
  Array.from(fileTree.children).forEach(child => child.classList.remove("bg-[#37373d]", "text-white"));
  treeElement.classList.add("bg-[#37373d]", "text-white");

  // Update tabs
  updateEditorTabs(data);

  // Transition UI
  defaultScreen.classList.add("hidden");
  editorContent.classList.remove("hidden");

  editorIcon.innerText = data.icon;
  editorTitle.innerText = data.title;
  editorPath.innerText = data.path;
  editorEducative.innerText = data.educative;
  editorVibe.innerText = data.vibe;
  
  // Update clean code structure layout
  codeViewer.textContent = data.code;

  // Append new system activities into the output logging feed
  simulateTerminalAction(data);
}

// Update Active Editor Tabs
function updateEditorTabs(data) {
  tabBar.innerHTML = "";
  const tab = document.createElement("div");
  tab.className = "bg-[#1e1e1e] text-white px-4 border-t-2 border-blue-500 flex items-center space-x-2 h-full text-xs font-semibold select-none border-r border-[#252526]";
  tab.innerHTML = `
    <span>${data.icon}</span>
    <span>${data.name}</span>
    <span class="hover:bg-gray-700 px-1 rounded cursor-pointer text-[10px]">✕</span>
  `;
  tabBar.appendChild(tab);
}

// Simulate Interactive Dev Log Output
function simulateTerminalAction(data) {
  const line = document.createElement("div");
  line.className = "text-blue-400 font-light mt-1 border-l-2 border-blue-500 pl-2";
  line.innerHTML = `→ Loaded module: <span class="text-white">${data.path}</span> - Compilation verified.`;
  terminalOutput.appendChild(line);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Initialize on execution
initTree();
