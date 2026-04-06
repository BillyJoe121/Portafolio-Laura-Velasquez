const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dacmlsbqc',
  api_key: '236461485693988',
  api_secret: 'Kf9Gfv0q04fASxFof9vXDIYfM-I'
});

const assetsDir = path.join(__dirname, '..', 'src', 'assets');

async function uploadDir(dirPath) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await uploadDir(fullPath);
    } else {
      // It's a file
      const relativePath = path.relative(assetsDir, fullPath);
      const publicId = `assets/${relativePath.replace(/\\/g, '/').replace(/\.[^/.]+$/, "")}`;
      
      const isVideo = file.match(/\.(mp4|mov|webm)$/i);
      const resourceType = isVideo ? 'video' : 'image';

      console.log(`Uploading ${relativePath} as ${publicId} (${resourceType})...`);

      try {
        await cloudinary.uploader.upload(fullPath, {
          public_id: publicId,
          resource_type: resourceType,
          overwrite: true
        });
        console.log(`Successfully uploaded ${publicId}`);
      } catch (err) {
        console.error(`Error uploading ${relativePath}:`, err.message);
      }
    }
  }
}

console.log('Starting bulk upload to Cloudinary...');
uploadDir(assetsDir).then(() => {
  console.log('Bulk upload complete!');
}).catch(err => {
  console.error('Migration failed:', err);
});
