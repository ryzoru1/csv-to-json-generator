# Testing Guide (`TEST.md`)

This guide explains how to test the **csv-to-json-generator** application, verify CSV parsing, test mock REST API endpoints, and validate backend code exports.

---

## 1. Testing the Web UI & CSV Parsing (Tab 1)

1. Start the server locally:
   ```bash
   npm start
   ```
   Open `http://localhost:3000` in your browser.
2. **Test Presets:** Click the quick preset buttons (**⚔️ RPG**, **🤖 CYBER**, **🏆 SCORES**) to instantly load sample CSV data.
3. **Test File Upload:** Drag and drop any `.csv` file into the upload zone or click to select a file from your computer.
4. **Test Raw Paste:** Paste custom CSV text into the raw text area and click **PARSE CSV ⚡**.
5. **Verify Inspector Grid:** Check that the Total Rows, Total Columns, and Data Preview table update correctly.

---

## 2. Testing API Endpoints & Routing (Tab 2)

1. Navigate to **2. API CONFIG**.
2. Customize the **API RESOURCE NAME** (e.g., change `items` to `characters`).
3. Verify that the generated mock endpoint URLs update in real time (`/api/v1/characters`, `/api/v1/characters/:id`).

---

## 3. Testing the Live API Sandbox (Tab 3)

1. Navigate to **3. LIVE SANDBOX**.
2. **Test List Endpoint:** Select `GET /api/v1/resource`, set limit, and click **EXECUTE REQUEST ⚡**. Verify that the JSON response displays `status: "success"` and array records.
3. **Test Single ID Endpoint:** Select `GET /api/v1/resource/:id`, enter an ID (e.g., `1`), and click **EXECUTE REQUEST ⚡**. Verify that the specific record object is returned.
4. **Test Search Filter:** Select `GET /api/v1/resource?search=...`, enter a keyword (e.g., `Sword`), and verify filtered results.

---

## 4. Testing Code Export & Downloads (Tab 4)

1. Navigate to **4. CODE EXPORT**.
2. Click through the format tabs (**JSON**, **EXPRESS.JS**, **FASTAPI**, **JS FETCH**).
3. Click **📋 COPY** to test clipboard copying.
4. Click **DOWNLOAD FILE 💾** to verify that the respective file (`server.js`, `main.py`, `api_export.json`, `client_snippet.js`) downloads successfully.
