const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dpa4jjv5v",
  api_key: process.env.CLOUDINARY_API_KEY || "993297429417567",
  api_secret: process.env.CLOUDINARY_API_SECRET || "qKyi-NierG6SOsl-TEwBZFNBAc8",
});

module.exports = cloudinary;
