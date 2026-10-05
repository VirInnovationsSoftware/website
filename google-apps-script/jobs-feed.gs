// Deploy this script as a web app. The spreadsheet itself can remain private;
// the web app exposes only rows marked Published.
function doGet(e) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('Jobs');
  if (!sheet || sheet.getLastRow() < 2) return output_([], e && e.parameter && e.parameter.callback);

  const values = sheet.getDataRange().getValues();
  const headers = values.shift().map(function (value) { return String(value).trim(); });
  const rows = values.map(function (row) {
    const item = {};
    headers.forEach(function (header, index) { item[header] = row[index] || ''; });
    return item;
  });

  const jobs = rows.filter(function (row) {
    return String(row.Status).trim().toLowerCase() === 'published' &&
      row['Job Title'] && isGoogleForm_(row['Google Form URL']);
  }).map(function (row) {
    return {
      title: String(row['Job Title'] || ''),
      department: String(row.Department || ''),
      location: String(row.Location || ''),
      type: String(row['Employment Type'] || ''),
      experience: String(row.Experience || ''),
      description: String(row.Description || ''),
      requirements: row.Requirements ? String(row.Requirements).split('\n').map(function (value) { return value.trim(); }).filter(String) : [],
      responsibilities: row.Responsibilities ? String(row.Responsibilities).split('\n').map(function (value) { return value.trim(); }).filter(String) : [],
      qualifications: row.Qualifications ? String(row.Qualifications).split('\n').map(function (value) { return value.trim(); }).filter(String) : [],
      jdUrl: String(row['JD URL'] || ''),
      applyLink: String(row['Google Form URL'] || '')
    };
  });

  return output_(jobs, e && e.parameter && e.parameter.callback);
}

function isGoogleForm_(url) {
  return /^https:\/\/(docs\.google\.com\/forms\/|forms\.gle\/)/i.test(String(url || '').trim());
}

function output_(data, callback) {
  const json = JSON.stringify(data);
  if (callback && /^[A-Za-z_$][0-9A-Za-z_$]*$/.test(callback)) {
    return ContentService.createTextOutput(callback + '(' + json + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}
