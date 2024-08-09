const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer') //http://expressjs.com/en/resources/middleware/multer.html npm install --save multer
const UserModel = require('./User')

const app = express()
const port = 3000

const path = require('path') //https://expressjs.com/en/starter/static-files.html
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(cors())
app.use(express.json())
 
main().catch(err => console.log(err));

async function main() {
    try {
        await mongoose.connect('mongodb://localhost:27017/', {});
        console.log("CONNECTED TO DATABASE SUCCESSFULLY");
    } catch (error) {
        console.error('COULD NOT CONNECT TO DATABASE:', error.message);
    }
}

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, "./public/images")
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
})
 
const upload = multer({storage})

app.get('/hello', (req, res) => {
  res.send('Hello World!')
})

app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.body)
  console.log(req.file)
  return res.json({Status: "Success"});
})

app.post('/create',upload.single('file'), (req, res) => {
    UserModel.create({
        name: req.body.name,
        email: req.body.email,
        photo: req.file.filename
    }).then(user => res.json(user))
    .catch(err => res.json(err))
})

app.get('/', (req, res) => {
    UserModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})