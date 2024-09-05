const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // สำหรับ JSON payloads
app.use(express.urlencoded({ extended: true })); // ใช้ express.urlencoded สำหรับ x-www-form-urlencoded

app.post('/add-house', (req, res) => {
  console.log('Received data:', req.body); // ตรวจสอบข้อมูลที่ได้รับ

  const { area_size, num_bedrooms, num_bathrooms, price, house_condition, type, year_built, parking_spaces, address, image_uri } = req.body;

  if (!area_size || !num_bedrooms || !num_bathrooms || !price || !house_condition || !type || !year_built || !parking_spaces || !address || !image_uri) {
      return res.status(400).send('Missing required fields');
  }
  
  const query = 'INSERT INTO houses (area_size, num_bedrooms, num_bathrooms, price, house_condition, type, year_built, parking_spaces, address, image_uri) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [area_size, num_bedrooms, num_bathrooms, price, house_condition, type, year_built, parking_spaces, address, image_uri];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data');
    } else {
      res.status(200).send('Data inserted successfully');
    }
  });
});

// Endpoint สำหรับดึงข้อมูลบ้านตาม ID
app.get('/house/:id', (req, res) => {
  const houseId = req.params.id;

  const query = 'SELECT * FROM houses WHERE id = ?';
  
  db.query(query, [houseId], (err, results) => {
    if (err) {
      console.error('Error fetching house details:', err);
      res.status(500).send('Error fetching house details');
    } else if (results.length === 0) {
      res.status(404).send('House not found');
    } else {
      res.status(200).json(results[0]);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});