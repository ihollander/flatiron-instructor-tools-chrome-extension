document.addEventListener("DOMContentLoaded", () => {
  const batchIdInput = document.querySelector("#batch-id");
  const batchList = document.querySelector("#batch-list");
  const form = document.querySelector("form");

  // fetch batches
  fetch("https://learn.co/api/v1/batch-management/rosters")
    .then(r => r.json())
    .then(batches => {
      batches.sort((b1, b2) => b1.name > b2.name);
      batches.forEach(batch => {
        const option = document.createElement("option");
        option.value = batch.id;
        option.textContent = batch.name;
        batchList.appendChild(option);
      });
    });

  // set input value based on storage
  chrome.storage.sync.get("batchId", ({ batchId }) => {
    batchIdInput.value = batchId;
  });

  form.addEventListener("submit", e => {
    e.preventDefault(); // necessary?
    const batchId = e.target.elements["batchId"].value;
    chrome.storage.sync.set({ batchId: batchId }, function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
          file: `select-batch.js`
        });
      });
      // hide the popup
      window.close();
    });
  });
});
