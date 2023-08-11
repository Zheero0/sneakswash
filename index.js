const path = require("path");
require('dotenv').config();
const express = require("express");
const nodemailer = require('nodemailer');
const multer = require('multer');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for the about page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Route for the contact page
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/prices', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'prices.html'));
});

const storage = multer.memoryStorage(); // Use memory storage to keep files in memory

const upload = multer({ storage: storage });

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/submit-form', upload.single('fileInput'), (req, res) => {
    const formData = req.body;
    const file = req.file;
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_REC,
      subject: 'New Form Submission',
      text: `
        Name: ${formData.name}
        Phone: ${formData.phone}
        Message: ${formData.message}
      `,
      attachments: [
        {
          filename: file.originalname,
          content: file.buffer, // Attach the file content directly from memory
        },
      ],
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Error sending email.' });
      }
  
      console.log('Email sent:', info.response);
  
      // Send a response to indicate the need to show the modal
      res.set('Content-Type', 'text/plain');
      res.send('ShowModal');
    });
  });
  

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});

