# Antigravity Task Management - Beginner's Guide 🚀

Follow this step-by-step guide to run and explore the application on your local machine.

## 🛠️ Step 1: Starting the Engines

You need to have two terminal windows open because the app has a **Backend** (the brain) and a **Frontend** (the face).

### 1. Start the Backend
Open a terminal and run:
```powershell
cd backend
npm run dev
```
*Wait for it to say `Server running on http://localhost:5000`.*

### 2. Start the Frontend
Open a **second** terminal window and run:
```powershell
cd my-react-router-app
npm run dev
```
*Wait for it to show a local URL, usually `http://localhost:5173`.*

---

## 🏃‍♂️ Step 2: Your First Flight (A Basic Flow)

Now that everything is running, open your browser to `http://localhost:5173`.

### 1. Create an Account
- Click on **Register**.
- Fill in your Name, Email, and a Password.
- Once registered, you'll be logged in automatically.

### 2. Create Your First Project
- Go to the **Projects** tab in the sidebar.
- Click on **New Project**.
- Give it a name (e.g., "Holiday Planning") and pick a vibrant color.
- Click **Create Project**.

### 3. Add Some Tasks
- Go to the **Tasks** tab.
- Click **New Task**.
- Fill in the title, pick your "Holiday Planning" project, and set a due date.
- Click **Create Task**.
- Use the **Search Bar** to find your task instantly.

### 4. add Attachments
- Click on any **Task Card** to open its **Detail Page**.
- Here you can see the full description.
- Click **Attach Image** to upload a photo (e.g., a boarding pass or hotel photo).
- Watch the **Toast Notification** in the bottom-right corner confirm the upload!

### 5. Check the Dashboard
- Go to the **Dashboard** in the sidebar.
- See your stats (Total Tasks, To Do, etc.).
- See your upcoming deadlines listed and your recent projects.

---

## 🔍 Troubleshooting
- **Images not uploading?** Ensure your ImageKit keys in the `.env` file are correct.
- **Server errors?** Make sure you ran `npm install` in both directories if you haven't already.
- **Can't log in?** Ensure the backend is running; the frontend needs it to verify your account.

Enjoy organizing your work with Antigravity! 🌌
