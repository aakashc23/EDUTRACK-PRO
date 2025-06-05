const express = require('express');
//const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'edutrack',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });
const pool = require('./db');


// Student Registration
app.post('/api/students', async (req, res) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO students SET ?', 
      req.body
    );
    res.json({ 
      success: true,
      student_id: result.insertId
    });
  } catch (err) {
    handleDBError(err, res);
  }
});

// Attendance Marking
app.post('/api/attendance', async (req, res) => {
  try {
    const { roll_number, date, status } = req.body;
    
    // Get student_id from roll_number
    const [[student]] = await pool.query(
      'SELECT student_id FROM students WHERE roll_number = ?', 
      [roll_number]
    );
    
    if (!student) throw new Error('Student not found');
    
    await pool.query(
      'INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)',
      [student.student_id, date, status]
    );
    
    res.json({ success: true });
  } catch (err) {
    handleDBError(err, res);
  }
});

// Performance Recording
app.post('/api/performance', async (req, res) => {
  try {
    const { roll_number, subject, marks, date, feedback } = req.body;
    
    // Get IDs
    const [[student]] = await pool.query(
      'SELECT student_id FROM students WHERE roll_number = ?', 
      [roll_number]
    );
    const [[subj]] = await pool.query(
      'SELECT subject_id FROM subjects WHERE name = ?',
      [subject]
    );
    
    if (!student || !subj) throw new Error('Invalid student or subject');
    
    await pool.query(
      `INSERT INTO performance 
       (student_id, subject_id, marks, assessment_date, feedback)
       VALUES (?, ?, ?, ?, ?)`,
      [student.student_id, subj.subject_id, marks, date, feedback]
    );
    
    res.json({ success: true });
  } catch (err) {
    handleDBError(err, res);
  }
});

// Dashboard Data
app.get('/api/dashboard', async (req, res) => {
  try {
    const [stats] = await pool.query(`
      SELECT 
        (SELECT COUNT(*) FROM students) AS total_students,
        (SELECT AVG(marks) FROM performance) AS avg_performance,
        (SELECT COUNT(*) FROM attendance WHERE status = 'Present' 
         AND date = CURDATE()) AS today_attendance
    `);
    res.json(stats[0]);
  } catch (err) {
    handleDBError(err, res);
  }
});

// Error handler
function handleDBError(err, res) {
  console.error('DB Error:', err.message);
  res.status(500).json({ 
    success: false,
    error: err.message.includes('Duplicate') 
      ? 'Duplicate entry (roll number/email already exists)'
      : 'Database operation failed'
  });
}


app.get('/debug/students', async (req, res) => {
  try {
    const [students] = await pool.query('SELECT * FROM students');
    console.log("Current students in DB:", students); // Check terminal
    res.json(students);
  } catch (err) {
    console.error("Debug error:", err);
    res.status(500).send("Debug error");
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));