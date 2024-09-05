// db.js
const mysql = require('mysql2');

// ตั้งค่าการเชื่อมต่อฐานข้อมูล
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'house_db'
});

// เชื่อมต่อกับฐานข้อมูล
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('MySQL connected...');
});

// ส่งออกการเชื่อมต่อ
module.exports = connection;