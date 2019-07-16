// select batch
chrome.storage.sync.get("batchId", ({ batchId }) => {
  $(".batches").val(batchId);
  $(".batches").trigger("change");
});
