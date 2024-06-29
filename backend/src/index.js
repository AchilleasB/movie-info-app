const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors');
const router = require('./router'); 

const app = express()

dotenv.config()
const PORT = process.env.PORT || 3000

//Enable cors for all requests
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', router)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost/${PORT}`);
});
