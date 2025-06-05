-- Main Tables
CREATE TABLE students (
  student_id INT AUTO_INCREMENT PRIMARY KEY,
  roll_number VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  class VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subjects (
  subject_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  code VARCHAR(10) UNIQUE NOT NULL
);

-- For Attendance System
CREATE TABLE attendance (
  attendance_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  date DATE NOT NULL,
  status ENUM('Present','Absent','Late') NOT NULL,
  remarks TEXT,
  FOREIGN KEY (student_id) REFERENCES students(student_id),
  UNIQUE KEY (student_id, date)
);

-- For Performance Tracking
CREATE TABLE performance (
  performance_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  subject_id INT NOT NULL,
  marks DECIMAL(5,2) CHECK (marks BETWEEN 0 AND 100),
  assessment_date DATE NOT NULL,
  feedback TEXT,
  FOREIGN KEY (student_id) REFERENCES students(student_id),
  FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)
);

-- Sample Data
INSERT INTO subjects (name, code) VALUES
('Mathematics', 'MATH101'),
('Science', 'SCI201'),
('English', 'ENG301'),
('History', 'HIS401'),
('Computer Science', 'CS501');

INSERT INTO students (roll_number, name, email, class) VALUES
('S2023001', 'Alice Johnson', 'alice@school.com', 'Grade 10'),
('S2023002', 'Bob Williams', 'bob@school.com', 'Grade 11');

INSERT INTO attendance (student_id, date, status) VALUES
(1, '2023-10-01', 'Present'),
(2, '2023-10-01', 'Late');

INSERT INTO performance (student_id, subject_id, marks, assessment_date) VALUES
(1, 1, 85.5, '2023-10-01'),
(2, 2, 92.0, '2023-10-01');