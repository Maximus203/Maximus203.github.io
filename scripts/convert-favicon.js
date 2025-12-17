// Script pour convertir logo.webp en favicon.ico
// Nécessite sharp: npm install sharp

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../public/assets/logo.webp');
const outputPath = path.join(__dirname, '../public/favicon.ico');

async function convertToIco() {
 try {
  // Convertir en PNG de taille 32x32 (taille standard pour favicon)
  await sharp(inputPath)
   .resize(32, 32)
   .toFile(outputPath.replace('.ico', '-32x32.png'));

  // Convertir en PNG de taille 16x16
  await sharp(inputPath)
   .resize(16, 16)
   .toFile(outputPath.replace('.ico', '-16x16.png'));

  console.log('✅ Favicons créés avec succès!');
  console.log('Note: Pour un vrai .ico, utilisez un outil en ligne comme:');
  console.log('https://convertio.co/png-ico/');
  console.log('ou utilisez le logo.webp directement comme favicon');
 } catch (error) {
  console.error('❌ Erreur:', error);
 }
}

convertToIco();
