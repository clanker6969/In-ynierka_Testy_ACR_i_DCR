/*************************************************************************
         (C) Copyright AudioLabs 2017 - Modified for Local Download
**************************************************************************/

function DataSender(config) {
  this.config = config;
}

DataSender.prototype.send = function(_session) {
  // 1. Zamień wyniki sesji na tekst (JSON)
  var sessionJSON = JSON.stringify(_session, null, 2);
  
  // 2. Wygeneruj nazwę pliku (np. wyniki_inzynierka_unikalneID.json)
  var filename = "wyniki_" + (_session.testId || "badanie") + "_" + (_session.uuid || "id") + ".json";

  // 3. Stwórz wirtualny plik w przeglądarce
  var blob = new Blob([sessionJSON], {type: 'application/json'});
  
  // 4. Wymuś pobranie pliku
  if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
  } else {
      var elem = window.document.createElement('a');
      elem.href = window.URL.createObjectURL(blob);
      elem.download = filename;
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
  }

  // 5. Zwróć false (lub true), żeby WebMUSHRA myślała, że się udało
  console.log("Plik pobrany lokalnie.");
  return false; 
};
