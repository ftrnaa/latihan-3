const express = require('express');
const app = express();
const PORT = 8001;

// Token rahasia (hardcode, bisa juga diambil dari .env)
const TOKEN = "mysecrettoken";

// Middleware sederhana untuk cek Bearer Token
function authBearer(req, res, next) {
  const authHeader = req.headers['authorization'];   // ambil header Authorization
  const token = authHeader && authHeader.split(' ')[1]; // format: "Bearer token"

  if (!token) {
    return res.status(401).json({ error: 'Token tidak ditemukan' });
  }

  if (token !== TOKEN) {
    return res.status(403).json({ error: 'Token salah atau tidak valid' });
  }

  next(); // lanjut ke route berikutnya
}

app.use(express.json());

// Route default
app.get('/', (req, res) => {
  res.send('Hello, World');
});

// Route baru tanpa proteksi
app.get('/api/about', (req, res) => {
  res.json([
    { id: 1, name: 'Andi', job: 'Senior Programmer' },
    { id: 2, name: 'Budi', job: 'Technical Report' },
    { id: 3, name: 'Cindy', job: 'Front-end Programmer' },
    { id: 4, name: 'Deli', job: 'UI/UX Designer' },
    { id: 5, name: 'Erlang', job: 'Marketing' }
  ]);
});

// API endpoint dengan proteksi token
app.get('/api/payments', authBearer, (req, res) => {
  res.json([
    { id: 101, user: 'Andi', amount: 150000, status: 'Success', method: 'Bank Transfer' },
    { id: 102, user: 'Budi', amount: 250000, status: 'Pending', method: 'Credit Card' },
    { id: 103, user: 'Cici', amount: 50000, status: 'Failed', method: 'E-Wallet' }
  ]);
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
