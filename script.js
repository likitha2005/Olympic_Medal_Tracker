// Initial medal data
let medalData = {
  USA: { gold: 42, silver: 38, bronze: 36 },
  China: { gold: 39, silver: 35, bronze: 30 },
  Japan: { gold: 28, silver: 20, bronze: 21 },
  France: { gold: 25, silver: 23, bronze: 22 },
  UK: { gold: 24, silver: 30, bronze: 26 },
  Germany: { gold: 20, silver: 18, bronze: 22 },
  Australia: { gold: 21, silver: 19, bronze: 25 },
  South_Korea: { gold: 12, silver: 10, bronze: 14 },
  Italy: { gold: 16, silver: 18, bronze: 20 },
  Netherlands: { gold: 14, silver: 15, bronze: 16 },
  Canada: { gold: 13, silver: 11, bronze: 15 },
  Brazil: { gold: 11, silver: 13, bronze: 12 },
  India: { gold: 10, silver: 9, bronze: 14 },
  Spain: { gold: 9, silver: 12, bronze: 11 },
  Ukraine: { gold: 8, silver: 7, bronze: 10 },
  Hungary: { gold: 7, silver: 6, bronze: 9 },
  Poland: { gold: 6, silver: 8, bronze: 7 },
  Sweden: { gold: 6, silver: 6, bronze: 8 },
  New_Zealand: { gold: 5, silver: 7, bronze: 6 },
  Turkey: { gold: 4, silver: 5, bronze: 7 }
};

let games = [];
const API_URL = "https://685a435e9f6ef961115594b8.mockapi.io/samplegames";

// --- Utility Functions ---
function updateMedalTally(game) {
  const update = (country, medalType) => {
    if (!country) return;
    if (!medalData[country]) {
      medalData[country] = { gold: 0, silver: 0, bronze: 0 };
    }
    medalData[country][medalType]++;
  };
  update(game.gold, "gold");
  update(game.silver, "silver");
  update(game.bronze, "bronze");
}

function rebuildMedalData() {
  medalData = {};
  games.forEach(updateMedalTally);
}

function renderMedalTable() {
  const tbody = document.getElementById("medalTableBody");
  tbody.innerHTML = "";

  const countries = Object.entries(medalData).map(([country, medals]) => {
    const total = medals.gold + medals.silver + medals.bronze;
    return { country, ...medals, total };
  });

  countries.sort((a, b) => b.gold - a.gold || b.silver - a.silver || b.bronze - a.bronze);

  countries.forEach((entry, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${entry.country}</td>
      <td>${entry.gold}</td>
      <td>${entry.silver}</td>
      <td>${entry.bronze}</td>
      <td>${entry.total}</td>`;
    tbody.appendChild(row);
  });
}

function updateStats() {
  document.getElementById("total-games").textContent = games.length;
  const countrySet = new Set();
  games.forEach(g => [g.gold, g.silver, g.bronze].forEach(c => c && countrySet.add(c)));
  document.getElementById("total-countries").textContent = countrySet.size;
  document.getElementById("total-medals").textContent = games.length * 3;
}

function renderRecentGames(list, limit = 5) {
  const container = document.getElementById("recent-games");
  if (!container) return;
  container.innerHTML = "";

  const recent = [...list].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, limit);

  if (recent.length === 0) {
    container.innerHTML = "<p>No recent games available.</p>";
    return;
  }

  recent.forEach(game => {
    const div = document.createElement("div");
    div.classList.add("recent-games");
    div.innerHTML = `
      <strong>${game.name}</strong> (${game.category})<br>
      🥇 ${game.gold}, 🥈 ${game.silver}, 🥉 ${game.bronze}<br>
      <small>${new Date(game.date).toLocaleDateString()}</small>
      <hr>`;
    container.appendChild(div);
  });
}

function renderGames() {
  const list = document.getElementById("games-list");
  if (!list) return;
  list.innerHTML = "";

  games.forEach((game, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${game.name}</strong> (${game.category}) - ${game.date}<br>
      🥇 ${game.gold}, 🥈 ${game.silver}, 🥉 ${game.bronze}<br>
      <button class="btn btn-warning" onclick="editGame(${index})">✏️ Edit</button>
      <button class="btn btn-danger" onclick="deleteGame('${game.id}')">🗑️ Delete</button>
      <hr>`;
    list.appendChild(div);
  });
}

function renderAll() {
  rebuildMedalData();
  renderGames();
  updateStats();
  renderMedalTable();
  renderRecentGames(games);
}

// --- API Actions ---
function fetchGames() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      games = data;
      localStorage.setItem("games", JSON.stringify(games));
      renderAll();
    })
    .catch(() => {
      const saved = localStorage.getItem("games");
      games = saved ? JSON.parse(saved) : [];
      renderAll();
    });
}

function deleteGame(id) {
  fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then(() => {
      games = games.filter(g => g.id !== id);
      localStorage.setItem("games", JSON.stringify(games));
      renderAll();
      alert("🗑️ Game deleted.");
    })
    .catch(() => alert("Failed to delete game."));
}

function editGame(index) {
  const game = games[index];
  document.getElementById("game-name").value = game.name;
  document.getElementById("game-category").value = game.category;
  document.getElementById("gold-country").value = game.gold;
  document.getElementById("silver-country").value = game.silver;
  document.getElementById("bronze-country").value = game.bronze;
  document.getElementById("game-date").value = game.date;

  const form = document.getElementById("game-form");
  form.dataset.editId = game.id;
}

// --- Form Submission ---
const form = document.getElementById("game-form");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const gameData = {
      name: document.getElementById("game-name").value,
      category: document.getElementById("game-category").value,
      gold: document.getElementById("gold-country").value.trim(),
      silver: document.getElementById("silver-country").value.trim(),
      bronze: document.getElementById("bronze-country").value.trim(),
      date: document.getElementById("game-date").value,
    };

    const editId = form.dataset.editId;

    if (editId) {
      fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gameData)
      })
        .then(res => res.json())
        .then(updated => {
          const index = games.findIndex(g => g.id === updated.id);
          games[index] = updated;
          delete form.dataset.editId;
          localStorage.setItem("games", JSON.stringify(games));
          renderAll();
          alert("✅ Game updated!");
          form.reset();
        });
    } else {
      fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gameData)
      })
        .then(res => res.json())
        .then(newGame => {
          games.push(newGame);
          localStorage.setItem("games", JSON.stringify(games));
          renderAll();
          alert("✅ Game submitted!");
          form.reset();
        });
    }
  });
}

// --- Initialize ---
fetchGames();
