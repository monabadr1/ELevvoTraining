# 🌟 Frontend Training Repository  

This repository contains the projects and practical work completed during my Frontend Development training.

---

# 🎓 Training Overview  

During this training, I gained foundational and practical knowledge in front-end development.  
The training focused on building a strong understanding of core web technologies and modern development tools.

---

## 📚 Technologies & Concepts Learned  

### 🔹 HTML
- Semantic elements  
- Forms & inputs  
- Page structure and layout  

### 🔹 CSS
- Styling and layout techniques  
- Flexbox  
- Responsive Design  
- Media Queries  

### 🔹 JavaScript
- Variables and data types  
- Functions  
- DOM manipulation  
- Event handling  
- Basic form validation  

### 🔹 Bootstrap
- Grid system  
- Responsive utilities  
- Prebuilt components  

### 🔹 React (Introduction)
- Components concept  
- JSX basics  
- Props  
- Basic state understanding  

---

## 🚀 Practical Experience  

- Building responsive web pages  
- Creating forms with validation  
- Applying clean UI design principles  
- Understanding component-based architecture  

---

# 📂 Projects  

---

## 📩 Project 1 – Contact Form  

### 📌 Overview  
A responsive **Contact Us form** built using HTML and CSS with basic client-side validation using JavaScript.

### 🛠 Tech Stack  
- HTML
- CSS  
- JavaScript  

### ✨ Features  
- Responsive card layout  
- Styled input fields  
- Email validation using Regular Expression  
- Required field validation  
- Prevent default form submission  
- Success alert message  

### 🚀 How to Run  
1. Clone the repository  
2. Open `Form.html` in your browser

(No additional dependencies required)

---
## 📰 Project 2 – Personal Blog Homepage (Cards + Filter + Pagination)

### 📌 Overview
A simple homepage for a personal blog that displays posts in a **card layout**.  
Users can filter posts by category (Food / Tech / Travel) and navigate posts using **pagination** (limited number of posts per page).

### 🛠 Tech Stack
- React (Functional Components)
- JavaScript (ES6)
- CSS3 (Responsive Grid Layout)

### ✨ Features
- Blog header with title: **The Daily Spark**
- Blog post cards showing:
  - Image
  - Title
  - Short description
  - Date
  - Category badge
- Category filter buttons:
  - All / Food / Tech / Travel
- Pagination:
  - Limits visible posts to **3 posts per page**
  - Prev / Next buttons
  - Page number buttons
- Responsive layout:
  - 3 columns on desktop
  - 2 columns on tablet
  - 1 column on mobile

### 📂 Project Structure (example)
```text
blog-homepage/
│── Home.jsx
│── Home.css
│── data/
│   └── posts.js
│── images/
    ├── food/
    ├── Tech/
    └── Travel/
```

### 🚀 How to Run
1. Install dependencies
```bash
npm install
```

2. Start the project
```bash
npm run dev
```
> (Or `npm start` depending on your React setup)

### ⚙️ Key Logic
- Filtering posts by category using `useMemo`
- Pagination logic:
  - `POSTS_PER_PAGE = 3`
  - `totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)`
  - Slice posts based on current page
---
## 🧭 Project 3 – Responsive Sidebar Navigation (Expandable + Mobile + Submenu)

### 📌 Overview
A responsive sidebar navigation system built with **HTML, CSS, and JavaScript**.  
The main goal of this project is to create a reusable sidebar that supports:
- Expand / collapse (desktop)
- Mobile open/close with overlay
- Active link highlighting based on current page
- Submenu toggle
- Loading sidebar content from an external HTML file (`sidebar.html`) for reusability across pages

> Extra pages (Home, Basket, Favorite, Account) are included only to demonstrate and test the sidebar in a multi-page layout.

### 🛠 Tech Stack
- HTML
- CSS (Flexbox/Grid + Media Queries)
- JavaScript
- Font Awesome (icons)
- LocalStorage (used in demo pages like Basket/Account/Favorite)

### ✨ Core Features (Main Requirements)
- **Collapsible sidebar**
  - Default collapsed width
  - Expanded width on toggle button
- **Mobile sidebar**
  - Opens with a menu button
  - Closes with overlay click or `Esc`
- **Active Link Highlight**
  - Automatically detects current page using `location.pathname`
- **Submenu**
  - Expand/collapse submenu items
  - Updates `aria-expanded` for accessibility
- **Reusable Sidebar**
  - Sidebar is stored in `sidebar.html`
  - Loaded dynamically using `fetch()` into each page

### 📂 Project Structure (example)
```text
shopping-sidebar/
│── index.html               # redirect to home.html
│── home.html
│── basket.html
│── favorite.html
│── account.html
│── sidebar.html             # sidebar markup (reusable)
│── home.css                 # shared styles (sidebar + layout + home UI)
│── basket.css
│── favorite.css
│── account.css
│── sidebar.js               # load + sidebar interactions
│── basket.js                # demo functionality (localStorage)
│── favorite.js              # demo functionality (localStorage)
│── account.js               # demo functionality (localStorage)
│── images/
```

### 🚀 How to Run
1. Open `index.html` or `home.html` in the browser.

✅ Recommended: run with a local server (because `fetch("sidebar.html")` may not work in some browsers when opening files directly).
Example:
```bash
# VS Code
Live Server extension
```

### ⚙️ Key Logic
- Load sidebar into pages:
  - `fetch("sidebar.html")` → inject into `<aside id="sidebar">`
- Toggle expand/collapse:
  - Add/remove `.expanded`
- Mobile sidebar:
  - Add/remove `.active` + overlay
- Submenu:
  - Toggle `.open` class
- Active link:
  - Compare `href` with current file name
---

## 🎯 Project 4 – StudySphere Landing Page (Dark/Light Mode + Demo)

### 📌 Overview
A modern responsive landing page for **StudySphere**, a study assistant concept that offers AI summaries, quizzes, flashcards, and study plans.  
The project is **front-end only** and includes interactive UI features such as **dark/light mode**, **smooth scrolling**, **stats counter animation**, and a **mini demo** that generates a mock summary + quiz from user text.

### 🛠 Tech Stack
- HTML
- CSS (Responsive Layout + Media Queries)
- Vanilla JavaScript
- Font Awesome (icons)

### ✨ Features
- Sticky top navigation bar
- Dark / Light mode toggle (saved in `localStorage`)
- Smooth scrolling for internal links
- Hero section with CTA buttons and feature pills
- Stats section with animated counters (IntersectionObserver + requestAnimationFrame)
- Features grid (cards layout)
- Mini Demo section:
  - User pastes text
  - Generates mock summary + quick quiz + keywords (front-end simulation)
- Pricing section (Free / Pro)
- Testimonials section
- Final call-to-action section
- Fully responsive design (desktop / tablet / mobile)

### 📂 Project Structure (example)
```text
studysphere-landing/
│── index.html
│── LandingPage.css
│── landingpage.js
│── images/
│   └── learn.jpg
```

### 🚀 How to Run
1. Clone the repository
2. Open `landingpage.html` in your browser  
(No dependencies or build steps required)

### ⚙️ Key Functionality
- **Theme Toggle**
  - Adds/removes `light-mode` class on `<body>`
  - Saves preference in `localStorage`

- **Stats Counter Animation**
  - Runs when the stats section becomes visible using `IntersectionObserver`

- **Mini Demo Generator**
  - Cleans text input
  - Extracts first 1–2 sentences as a mock summary
  - Generates keywords and a simple quiz template

---
## ☁️ Project 5 – Weather Dashboard (Multi-City + Search + 3-Day Forecast)

### 📌 Overview
A minimal **multi-city weather dashboard** that fetches real-time weather data and a **3-day forecast** using the **OpenWeatherMap API**.  
Users can search and add new cities, remove cities, refresh data, and the app remembers saved cities using `localStorage`.

### 🛠 Tech Stack
- HTML
- CSS (Responsive Grid Layout)
-  JavaScript
- OpenWeatherMap API

### ✨ Features
- Multi-city weather cards (default cities included)
- Add city by search input
- Remove city from dashboard
- “Refresh” button to reload all cities
- Auto refresh every **10 minutes**
- 3-day forecast preview on each card
- Skeleton loading UI while fetching data
- Toast notifications (success / error)
- Saves selected cities in **localStorage** (persists after reload)

### 📂 Project Structure (example)
```text
weather-dashboard/
│── weatherdashboard.html
│── weatherdashboard.css
│── weatherdashboard.js
```

### 🔑 Setup (API Key)
This project uses OpenWeatherMap API.

1) Create an API key from OpenWeatherMap  
2) Add your key in the JS file:
```js
window.OWM_API_KEY = "YOUR_API_KEY_HERE";
```

> ⚠️ Important: Don’t publish your real API key in a public repository.

### 🚀 How to Run
1. Open `index.html` in your browser.

✅ Recommended: run with a local server for best results:
- VS Code → Live Server

### ⚙️ How It Works (Key Logic)
- **Current weather** endpoint:
  - `/data/2.5/weather?q={city}&appid={key}&units=metric`
- **Forecast** endpoint:
  - `/data/2.5/forecast?q={city}&appid={key}&units=metric`
- Forecast is grouped by day and selects values closest to **12:00 PM** for a clean daily preview.
- Prevents duplicate cities (case-insensitive).
- Uses `Promise.allSettled()` to load multiple cities safely.
- Uses `AbortController` to cancel previous requests when refreshing/searching quickly.



