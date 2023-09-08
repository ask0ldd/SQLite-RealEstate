const multer = require('multer');

const MIME_TYPES = { 'image/jpg': 'jpg', 'image/jpeg': 'jpg', 'image/png': 'png' }
// const upload = multer({ dest: 'pics/' })

const storage = multer.diskStorage({
    destination: (req, file, callback) => { 
      // save the file into the 'pics' folder
      callback(null, 'pics/')
    },
    filename: (req, file, callback) => { 
      // .split('.')[0] added to get rid of the extension before update the filename
      const name = file.originalname.split(' ').join('_').split('.')[0] // max length fname?
      const extension = MIME_TYPES[file.mimetype] // valid extensions
      callback(null, name + Date.now() + '.' + extension)
    }
})

module.exports = multer({ storage: storage }).single('image')