# 🌍 Full Stack App — Tailwind Frontend + Flask Backend + Docker

This is a full-stack project consisting of:
- A static frontend (HTML + JavaScript + TailwindCSS)
- A backend API built with Python Flask
- Dockerized development using `docker-compose`

---

## 📁 Project Structure

project-root/
├── client/ # Frontend (static files)
│ ├── index.html
│ ├── script.js
│ ├── input.css # Tailwind input
│ ├── output.css # Tailwind output
│ ├── Dockerfile # Frontend container
│ ├── package.json
│ └── ...
├── server/ # Backend (Flask API)
│ ├── app.py
│ ├── data.json
│ ├── requirements.txt
│ └── Dockerfile # Backend container
├── docker-compose.yml # Orchestration for both
└── README.md # You are here

---

## 🚀 Quick Start

### 📦 Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## 🧪 Local Development using Docker

### 1. Build and Run

From the root directory, run:

```bash
docker-compose up --build

This will:

Build and serve the frontend at http://localhost:3000

Serve the backend API at http://localhost:5000/api/data

2. Stop Containers

docker-compose down

⚙️ Docker Details
🖼️ client/Dockerfile
Uses Node to build Tailwind CSS

Uses NGINX to serve static HTML/CSS/JS

🐍 server/Dockerfile
Uses Python 3.10

Installs requirements.txt and runs Flask app on port 5000

📡 API Reference
GET /api/designers
Returns the JSON data from data.json.

Example Response:
[
 {
    "id": 2,
    "name": "Studio D3",
    "years": 6,
    "projects": 43,
    "rating": 4.5,
    "price": "$$$",
    "phones": ["+91-9090909090","+91-9090909090"]
  },
]

📘 Scripts

For Frontend
# Inside /client
npm install                # Install tailwind and postcss
npx tailwindcss -i ./input.css -o ./output.css --minify  # Build Tailwind

📌 Notes
Tailwind CSS is built using input.css → output.css

Shortlist states are saved in localStorage

Backend serves static JSON for now (data.json), can be extended with a DB

You can run both services independently if needed

🧠 Contribution
Feel free to fork this repo and contribute with:

Bug fixes

Feature improvements

Optimizations and better tooling

🛡 License
This project is open-source and available under the MIT License.

🙌 Acknowledgements
Tailwind CSS

Flask

Docker

---

Let me know if you'd like me to provide a full `docker-compose.yml` or the two Dockerfiles next!