const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(fileUpload({
    createParentPath: true
}))

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send("Hello Real-Animator")
})

app.post('/', async (req, res) => {
    try {
        if(!req.files) {
            res.send({ message: 'No File Uploaded'})
        } else {
            let videoFile = req.files.videoFile
            videoFile.mv('./uploads/' + videoFile.name)

            res.send({ 
                status: true,
                message: 'File Uploaded',
                data: {
                    name: videoFile.name,
                    mimetype: videoFile.mimetype,
                    size: videoFile.size
                } 
            })
        }
    } catch(err) {
        res.status(500).send(err)
    }
})

app.listen(3000, () => {
    console.log("Real-Animator Server has started on http://localhost:3000")
})