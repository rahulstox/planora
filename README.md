# planora [Live Demo](https://travel-grid.vercel.app/)

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%">

[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/Adarsh-Chaubey03/planora)

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%">

> Welcome to **planora**, your all-in-one travel platform! Book tickets, rent vehicles, reserve hotels, explore travel guides, and select customizable packages—all in one place.

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="150%">
This repo contains the Planora project.
<a name="top"></a>

🚀 **Live Demo:** [Click here to view deployment](https://planora-sepia.vercel.app/)

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%">
<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=24&duration=3000&pause=1000&color=00C853&center=true&vCenter=true&width=900&lines=Thanks+for+visiting+planora!+🙌;Start+the+repo+✅;Share+it+with+others+🌍;Contribute+and+grow+🛠️;Happy+Coding+✨!" alt="Thanks Banner Typing SVG" />
</div>
<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="150%">

**🚀 Getting Started**

Follow these steps to set up **planora** locally and begin contributing.

**_Prerequisites_**

- Node.js (v16 or higher)
- npm or yarn
- Git
- Code editor (VS Code recommended)

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

**Installation**

1. Clone the repository

```bash
git clone https://github.com/yourusername/planora.git
cd planora
```

> 📸 Screenshot placeholder: After cloning the repo, show the folder structure.

2. Install Frontend Dependencies

```bash
cd client
npm install
```

> ⚠️ Common issue: If you get npm WARN deprecated or peer dependency errors, use:

npm install --legacy-peer-deps

> 📸 Screenshot placeholder: After installing frontend dependencies.

3. Install Backend Dependencies

cd ../server
npm install

> ⚠️ Common issue: If you see ENOENT: no such file or directory, package.json, make sure you are in the correct server folder.
> 📸 Screenshot placeholder: After installing backend dependencies.

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

Running the Application

Start the Backend Server

cd server
npm start

**Server will run on http://localhost:5000**

> 📸 Screenshot placeholder: Backend running in terminal.

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

Start the Frontend (in a new terminal)
cd client
npm run dev

**Client will run on http://localhost:5173**

> 📸 Screenshot placeholder: Frontend running in browser.

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

Troubleshooting Tips

Issue Solution

npm ERR! enoent Make sure you are in the correct folder (client or server) before running npm install.
Port already in use Stop other apps using the port or change the port in vite.config.js or backend server.
Dependencies errors Run npm install --legacy-peer-deps for frontend.
Server not starting Check .env file for correct MongoDB URI and ports.

**📂 Project Structure**

```bash
planora/
├── README.md
├── LICENSE
├── package.json
├── package-lock.json
│
├── client/                 # Frontend (React + Vite)
│   ├── public/             # Static assets (favicon, logos, images)
│   ├── src/                # App source
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page-level components
│   │   ├── context/        # Context API (Auth, Theme, etc.)
│   │   ├── assets/         # Images, icons
│   │   └── utils/          # Helper functions
│   └── vite.config.js
│
├── server/                 # Backend (Node.js + Express + MongoDB)
│   ├── index.js
│   ├── config/             # DB config
│   ├── routes/             # API routes
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── middleware/         # Middleware (auth, upload, etc.)
│   └── utils/              # Utilities (email, async handler, etc.)
│
└── docs/                   # Project docs / setup guides
    ├── ENVIRONMENT_SETUP.md
    ├── GOOGLE_AUTH_SETUP.md
    ├── DARK_MODE_IMPLEMENTATION.md
    └── IMPLEMENTATION_SUMMARY.md
```

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%">

<h2 align="center">
<p style="font-family:var(--ff-philosopher);font-size:3rem;"><b> Show some <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Red%20Heart.png" alt="Red Heart" width="40" height="40" /> by starring this awesome repository!
</p>
</h2>

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="150%">

**💡 Suggestions & Feedback**

Feel free to open issues or discussions if you have any feedback, feature suggestions, or want to collaborate!

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="150%">

**🙌 Support & Star**

**_If you find this project helpful, please give it a star ⭐ to support more such educational initiatives!_**

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%">

<h2>🧑‍💻Project Admin:</h2>
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/rahulstox">
        <img src="https://avatars.githubusercontent.com/u/144617974?s=96&v=4" height="140px" width="140px" alt="Rahul Gupta">
      </a>
      <br>
      <sub><b>Rahul Gupta</b></sub>
      <br>
      <a href="https://www.linkedin.com/in/rahul-gupta-9a223a289/">
        <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/73993775/278833250-adb040ea-e3ef-446e-bcd4-3e8d7d4c0176.png" width="45px" height="45px">
      </a>
    </td>
  </tr>
</table>


<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%">

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%">

<h1 align="center"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Glowing%20Star.png" alt="Glowing Star" width="25" height="25" /> Give us a Star and let's make magic! <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Glowing%20Star.png" alt="Glowing Star" width="25" height="25" /></h1>

<p align="center">
     <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Mirror%20Ball.png" alt="Mirror Ball" width="150" height="150" />
</p>

<div align="center">
    <a href="#top">
       <img src="https://img.shields.io/badge/Back%20to%20Top-0078D7?style=for-the-badge&logo=github&logoColor=white" />
    </a>
</div>
<img src="https://img.shields.io/badge/Back%20to%20Top-000000?style=for-the-badge&logo=github&logoColor=white" alt="Back to Top" />
**Ready to show off your coding achievements? Get started with planora today! 🚀**
