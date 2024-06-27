const express = require('express')
const dotenv = require('dotenv')
const router = require('./router'); 

const app = express()

dotenv.config()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', router)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
