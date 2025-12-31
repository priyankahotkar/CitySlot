require("dotenv").config();
const express = require('express')
const rateLimit = require('express-rate-limit')

const app = express();
const port = process.env.PORT

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,               // 100 requests per IP
  standardHeaders: true,  // RateLimit-* headers
  legacyHeaders: false,   // Disable X-RateLimit-*
});

app.use(limiter);

app.get('/', (req, res) => {
    res.send('Root route working');
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})
