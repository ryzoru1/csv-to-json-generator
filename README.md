# CSV to JSON Generator

> A retro arcade–themed workbench that turns CSV files into clean JSON, mock REST APIs, and production-ready server code — no database required.

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-339933?logo=node.js&logoColor=white)](package.json)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)](package.json)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg)](#contributing)

---

## Overview

**CSV to JSON Generator** is a single-page web app with a small Express backend. Drop in a CSV file (or paste raw CSV text), inspect the parsed data, and immediately:

- Browse it as a table with row/column stats
- Preview the REST endpoints a real API would expose
- Query the dataset in an interactive API sandbox
- Export the data or generate an Express, FastAPI, or JavaScript client scaffold

The UI is styled as a neon pixel-art terminal, but the output is practical, copy-pasteable code.

---

## Features

### 1. Data input
- Drag-and-drop or file-picker upload for `.csv` / `.txt`
- Raw CSV paste area
- Three quick presets: **⚔️ RPG**, **🤖 CYBER**, **🏆 SCORES**
- Live stats for total rows, total columns, and detected primary key
- Scrollable preview table

### 2. API configuration
- Configurable resource name (e.g. `items` → `characters`)
- API version selector (`/api/v1`, `/api/v2`)
- Toggleable pagination and filter capabilities
- Routing table that updates as you type

### 3. Live sandbox
- List, single-record, and search queries
- Adjustable `limit`
- Simulated `200` / `404` responses with formatted JSON
- Runs entirely in the browser against the parsed dataset — works even when the frontend is hosted statically

### 4. Code export
- **JSON** — the parsed dataset
- **Express.js** — standalone Node server with CORS and the same endpoints
- **FastAPI** — Python equivalent using the dataset
- **JS Fetch** — a client snippet for consuming the API

Download any format as a file or copy it to the clipboard.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | Vanilla HTML/CSS/JavaScript, PapaParse (CDN) |
| Fonts | Press Start 2P, Share Tech Mono |
| Backend | Node.js, Express, CORS, Multer |
| CSV parsing (server/export) | PapaParse |
| Deployment | Render (Blueprint), any Node host, static host for UI-only |

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) **v18 or newer**
- npm

### Install & run

```bash
git clone https://github.com/ryzoru1/csv-to-json-generator.git
cd csv-to-json-generator
npm install
npm start
```

Open **http://localhost:3000**.

The server listens on `PORT` (default `3000`):

```bash
PORT=8080 npm start
```

---

## Project Structure

```
csv-to-json-generator/
├── index.html        # Entire frontend: UI, styles, parsing, sandbox, export engine
├── server.js         # Express server + REST API + static file hosting
├── package.json      # Dependencies and npm scripts
├── render.yaml       # Render deployment blueprint
├── DEPLOY.md         # Deployment instructions
├── TEST.md           # Manual testing checklist
└── LICENSE           # GNU GPL v3
```

---

## API Reference

Base URL: `http://localhost:3000`

### `GET /api/v1/:resource`

Returns records from the in-memory dataset.

| Query param | Type | Default | Description |
| --- | --- | --- | --- |
| `limit` | integer | dataset size | Maximum number of records to return |
| `search` | string | — | Case-insensitive substring match across all fields |

```bash
curl "http://localhost:3000/api/v1/items?limit=2&search=sword"
```

```json
{
  "status": "success",
  "count": 1,
  "total": 1,
  "data": [
    { "id": 1, "name": "Iron Sword", "type": "Weapon", "attack": 25, "price": 150, "rarity": "Common" }
  ]
}
```

> `:resource` is a cosmetic label. The server keeps a single in-memory dataset, so `/api/v1/items` and `/api/v1/characters` return the same records. Use the exported Express/FastAPI scaffold if you need per-resource collections.

### `GET /api/v1/:resource/:id`

Fetches a single record. The lookup key is the first field of the first record (falling back to `id`), and the literal `id` field is also checked.

```bash
curl http://localhost:3000/api/v1/items/4
```

```json
{
  "status": "success",
  "data": { "id": 4, "name": "Dragon Shield", "type": "Armor", "attack": 60, "price": 800, "rarity": "Epic" }
}
```

Missing records return **404**:

```json
{ "status": "error", "message": "Record with ID '99' not found." }
```

### `POST /api/v1/sync`

Replaces the in-memory dataset with an array of objects.

```bash
curl -X POST http://localhost:3000/api/v1/sync \
  -H "Content-Type: application/json" \
  -d '{"data":[{"id":1,"name":"Excalibur","type":"Weapon"}]}'
```

```json
{ "status": "success", "count": 1 }
```

> Storage is in memory only. The dataset resets to the bundled RPG sample whenever the server restarts.

---

## Deployment

### Render (recommended)

The included `render.yaml` Blueprint configures a free Node web service automatically.

1. Push the repository to GitHub.
2. In [Render](https://dashboard.render.com/), choose **New → Blueprint** and connect the repo.
3. Render runs `npm install` and `npm start`, then serves the UI and API at your service URL.

See [DEPLOY.md](DEPLOY.md) for the full walkthrough.

### Vercel / static hosting

The frontend is self-contained (`index.html`), so it can be deployed alone with the Vercel CLI:

```bash
npm i -g vercel
vercel
```

> Static hosting serves the UI and the in-browser sandbox, but **not** the `/api/v1/*` routes. Deploy `server.js` to a Node host for a live API.

### Docker / other Node hosts

Any environment that can run `npm install && npm start` works. Expose the port from the `PORT` environment variable.

---

## Testing

A manual QA checklist covering uploads, presets, routing, sandbox responses, and file exports lives in [TEST.md](TEST.md).

Quick smoke test:

```bash
npm start
curl http://localhost:3000/api/v1/items?limit=1
```

---

## Notes & Limitations

- **In-memory only** — uploaded/parsed server data is not persisted; restarting resets it.
- **Single collection** — the backend API does not partition records by `:resource`.
- **Client-side sandbox** — requests in Tab 3 are simulated in the browser, not sent to the Express server.
- **CDN dependencies** — PapaParse and Google Fonts are loaded from public CDNs, so the UI needs network access on first load.

---

## Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository.
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push and open a pull request.

For larger changes, please open an issue first so we can align on the approach.

---

## License

Released under the **GNU General Public License v3.0**. See [LICENSE](LICENSE) for details.
