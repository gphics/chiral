const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  cloud_name: process.env.CLOUD_NAME,
});

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const newFileName = `chiral-${file.originalname
      .slice(0, 21)
      .replaceAll(" ", "-")}`;
    /*
    // mimetype check
    const mimetype = file.mimetype;
    if (
      mimetype !== "image/jpeg" &&
      mimetype !== "image/png" &&
      mimetype !== "image/jpg" &&
      mimetype !== "image/webp" &&
      mimetype !== "image/svg"
    ) {
      const err = new Error(
        `${mimetype} mimetype for ${file.originalname} image is unacceptable`
      );
      err.code = 400;
      cb(err, newFileName);
    }
    */

    cb(null, newFileName);
  },
});

const upload = multer({ storage });

module.exports = { configuredCloudinary: cloudinary, upload };
