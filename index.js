const express = require("express");
const bodyParser = require("body-parser");
const { google } = require("googleapis");

const app = express();
app.use(bodyParser.json());


// Load your service account key
const KEYFILEPATH = "credentials.json"; // put your downloaded key JSON here
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

// Auth
const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

// Replace with your Google Sheet ID
const SPREADSHEET_ID = "1fMlgp0wtln_DJororzPrMWLnsiw-K1i1vywHU2rdu3E";  

app.post("/submit", async (req, res) => {
  try {

    const { role, businessName, product, fullName, email, phone, selectedServices } = req.body;
    // Create timestamp
    const timestamp = new Date().toISOString();

    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });



await sheets.spreadsheets.values.append({
  spreadsheetId: SPREADSHEET_ID,
  range: "Sheet1!A1",
  valueInputOption: "RAW",
  requestBody: {
    values: [[
      new Date().toLocaleString(),
      role,
      businessName || "-",
      product || "-",
      fullName,
      email,
      phone,
      Array.isArray(selectedServices) ? selectedServices.join(", ") : selectedServices || "-"
    ]],
  },
});


    res.json({ success: true, message: "Data saved to Google Sheets!" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});





// your /submit route here

// 👇 Export the app for Vercel
module.exports = app;
