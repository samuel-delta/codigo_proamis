const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
const XLSX = require('xlsx');

const readPDF = (pathToPdf) => {
  return new Promise((resolve, reject) => {
    try {
      const pdfPath = path.resolve(pathToPdf);
      const pdfData = fs.readFileSync(pdfPath);
      pdf(pdfData).then(({ text }) => resolve(text)).catch(reject);
    } catch (error) {
      reject(error);
    }
  });
};

const readTXT = (pathToTxt) => {
  return new Promise((resolve, reject) => {
    try {
      const txtPath = path.resolve(pathToTxt);
      const txtData = fs.readFileSync(txtPath, 'utf-8');
      resolve(txtData);
    } catch (error) {
      reject(error);
    }
  });
};

const readExcel = (pathToExcel) => {
  return new Promise((resolve, reject) => {
    try {
      const excelPath = path.resolve(pathToExcel);
      const fileBuffer = fs.readFileSync(excelPath);
      const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

// Adicione essa função:
const deleteDownloads = () => {
  const downloadsPath = path.resolve(__dirname, 'downloads');
  
  if (fs.existsSync(downloadsPath)) {
    fs.readdirSync(downloadsPath).forEach(file => {
      fs.unlinkSync(path.join(downloadsPath, file));
    });
  }

  return null;
};

module.exports = { readPDF, readTXT, readExcel, deleteDownloads };
