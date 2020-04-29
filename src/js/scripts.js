// https://superuser.com/questions/280694/how-can-i-share-my-google-chrome-search-engine-entries

// Open the Search Engine Settings page in Chrome (chrome://settings/searchEngines).
// Open Chrome Developer Tools.
// Shortcut: F12 or Ctrl+Shift+I (on Windows, shortcuts on other platforms may differ).
// Manual navigation: Three-dot menu in upper-right corner > More Tools > Developer Tools.
// Click Console in the top menu bar of Chrome Developer Tools.
// Paste one of the following scripts into the console and press Enter.

(function exportSEs() {
  /* Auxiliary function to download a file with the exported data */
  function downloadData(filename, data) {
    const file = new File([data], { type: 'text/json' });
    const elem = document.createElement('a');
    elem.href = URL.createObjectURL(file);
    elem.download = filename;
    elem.click();
  }

  /* Actual search engine export magic */
  settings.SearchEnginesBrowserProxyImpl.prototype.getSearchEnginesList()
    .then((searchEngines) => {
      downloadData('search_engines.json', JSON.stringify(searchEngines.others));
    });
}());


(async function importSEs() {
  /* Auxiliary function to open a file selection dialog */
  function selectFileToRead() {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.addEventListener('change', (e) => {
        resolve(e.target.files[0]);
      }, false);
      input.click();
    });
  }

  /* Auxiliary function to read data from a file */
  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', (e) => {
        resolve(e.target.result);
      });
      reader.readAsText(file);
    });
  }

  const file = await selectFileToRead();
  const content = await readFile(file);
  const searchEngines = JSON.parse(content);
  searchEngines.forEach(({ name, keyword, url }) => {
    /* Actual search engine import magic */
    chrome.send('searchEngineEditStarted', [-1]);
    chrome.send('searchEngineEditCompleted', [name, keyword, url]);
  });
}());