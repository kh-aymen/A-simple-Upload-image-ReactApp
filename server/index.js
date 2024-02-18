import express from "express"
import cors from "cors"
import multer from "multer"
import path from 'path'

const app = express()
app.use(cors())
app.use(express.json())

const __dirname = path.resolve()
const publicDirectoryPath = path.join(__dirname, 'public')
app.use('/public', express.static(publicDirectoryPath))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/ProfileImages")
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10 MB limit
})

app.post('/upload', upload.single('file'), (req, res) => {
    const imageUrl = `${req.protocol}://${req.get('host')}/public/ProfileImages/${req.file.filename}`
    console.log("Generated image URL:", imageUrl)
    res.status(200).json({ imageUrl })
})

app.listen(3001, () => {
    console.log('server running')
})
