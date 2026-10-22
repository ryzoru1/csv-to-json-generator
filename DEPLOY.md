# Deployment Guide (`DEPLOY.md`)

This guide outlines how to deploy the **csv-to-json-generator** application to **Render**, **Vercel**, or **Docker** environments.

---

## 1. Deploying to Render (Recommended)

This project includes a `render.yaml` Blueprint configuration file, making deployment fully automated.

### Steps:
1. Push your repository to **GitHub** or **GitLab**.
2. Log in to your [Render Dashboard](https://dashboard.render.com/).
3. Click **New** -> **Blueprint**.
4. Connect your repository.
5. Render will automatically detect `render.yaml`, install dependencies (`npm install`), and start the production server (`npm start`).
6. Once deployed, your application and live REST API will be accessible at your Render service URL.

---

## 2. Running Locally (Development & Production)

To run the application locally on your machine:

1. **Install Node.js** (v18 or higher recommended).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Open your browser and navigate to:
   ```http
   http://localhost:3000
   ```

---

## 3. Deploying to Vercel (Static Frontend Only)

If you wish to deploy only the static frontend to Vercel:
1. Install Vercel CLI: `npm i -g vercel`
2. Run in project root:
   ```bash
   vercel
   ```
3. Follow the CLI prompts to deploy `index.html`.
