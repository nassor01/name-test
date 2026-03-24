const express = require("express");
const app = express();
const PORT = 3000;

// Middleware (to read JSON)
app.use(express.json());

// Sample data
let users = [
  { id: 1, name: "John Doe", email: "john@example.com", age: 28, country: "USA" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", age: 25, country: "UK" },
  { id: 3, name: "Michael Johnson", email: "michael@example.com", age: 32, country: "Canada" },
  { id: 4, name: "Emily Davis", email: "emily@example.com", age: 27, country: "Australia" },
  { id: 5, name: "Daniel Brown", email: "daniel@example.com", age: 30, country: "Germany" },
  { id: 6, name: "Sophia Wilson", email: "sophia@example.com", age: 24, country: "France" },
  { id: 7, name: "James Taylor", email: "james@example.com", age: 35, country: "South Africa" },
  { id: 8, name: "Olivia Martinez", email: "olivia@example.com", age: 29, country: "Spain" },
  { id: 9, name: "William Anderson", email: "william@example.com", age: 31, country: "Italy" },
  { id: 10, name: "Ava Thomas", email: "ava@example.com", age: 26, country: "Kenya" }
];


// ✅ GET all users
app.get("/users", (req, res) => {
  res.json(users);
});


// ✅ GET single user by ID
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

// POST (create new user)
app.post("/users", (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Request body is missing" });
  }

  const { name, email, age, country } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    age,
    country
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// ✅ PUT (update user)
app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { name, email, age, country } = req.body;

  user.name = name || user.name;
  user.email = email || user.email;
  user.age = age || user.age;
  user.country = country || user.country;

  res.json(user);
});


// ✅ DELETE user
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const deletedUser = users.splice(index, 1);
  res.json({ message: "User deleted", user: deletedUser });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});