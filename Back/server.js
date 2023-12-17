const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const app = express();
const port = 3006;

cloudinary.config({
  cloud_name: 'dreamanga',
  api_key: '181138134563512',
  api_secret: 'EGdGxWO_G_bAZWaPtbFE9SkCtxU',
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.buffer, { folder: 'imageDreamanga' });

    res.json({ public_id: result.public_id, url: result.secure_url });
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
