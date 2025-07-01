 🏅 Olympic Medal Tracker

This is a simple but powerful web app I built to track Olympic medals in real-time.  
It gives both the public and admin users an easy way to monitor and manage Olympic game results — all powered by a live backend and mock API.

---

## ✨ What It Does

The app is split into two parts:

### 👥 Public Medal View

Anyone visiting the site can:
- See a **ranked medal tally** of countries based on gold > silver > bronze
- Get a snapshot of:
  - Total games played
  - Total medals awarded
  - Number of countries participating
- Browse a **recent games list** with all event results

The medal table updates dynamically as new games are added or edited.

---

### 🔐 Admin Panel (Protected)

Admins can log in to manage game data. I added a full **login system** connected to a real SQL database and secured with a **Node.js server**.

Once logged in, the admin can:
- Add a new game with:
  - Name
  - Category (e.g., Track, Swimming)
  - Gold, Silver, and Bronze winning countries
  - Date
- Edit or delete games — changes immediately reflect in the public view
- All actions talk to a **MockAPI** for storing/retrieving game data

I also used **LocalStorage** as a fallback in case the API goes down, so the app keeps working.

---
Admin Table (MySQL DB Schema)
To secure the admin panel, I created a MySQL table for admin login credentials:

CREATE TABLE admins (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL
);
The username is stored as plain text for now.

The password field currently stores raw strings.



## 🛠 Tech Stack

- **Frontend:** HTML, CSS, JavaScript (no frameworks)
- **Backend:** Node.js + Express
- **Database:** MySQL (for secure admin authentication)
- **API:** [MockAPI.io](https://mockapi.io/)
- **Extras:** LocalStorage for offline support

---

## 🧠 Key Features I Built

✅ Real-time medal table that rebuilds itself on every change  
✅ Admin login with real credentials (stored in MySQL)  
✅ Node.js + Express backend for secure login  
✅ Game add/edit/delete with live API calls  
✅ Fallback to LocalStorage when the API is unavailable  
✅ Clean, responsive UI  
✅ Medal ranking logic: Gold > Silver > Bronze  

---

## 🔗 API Endpoint

Games are fetched from:

https://685a435e9f6ef961115594b8.mockapi.io/samplegames


Each game looks like:

```json
{
  "id": "1",
  "name": "100m Sprint",
  "category": "Track",
  "gold": "USA",
  "silver": "China",
  "bronze": "India",
  "date": "2024-07-20"
}
💡 How It Works
The app starts with a default set of medal data.

All game results are pulled from the API and used to update the tally.

When a new game is added or edited, it triggers a recalculation of the leaderboard.

If the API is unreachable, data is loaded from LocalStorage.
🔐 Sample Admin Credentials (for demo)
Username: admin

Password: admin123

(Stored securely in the MySQL database)

📈 Future Enhancements
JWT-based authentication

Search and filter by country or event

Export medal data (PDF/CSV)

Responsive improvements

Switch from MockAPI to a full database for game data

👩‍💻 Made With ❤️ by
Likitha Sivani Yellamilli
Hackathon Project: Olympic Medal List - 2025 Edition

