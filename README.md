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

### 📌 Future Improvements (Optional)
- Add “Read More” page (post details page)
- Search bar for posts
- Improve description trimming (line clamp)
- Store posts in JSON or fetch from API
 
