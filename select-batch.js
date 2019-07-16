// select batch
chrome.storage.sync.get("batchId", ({ batchId }) => {
  const s = document.createElement("script");
  s.textContent = `(()=>{$('.batches').val(${batchId}),$('.batches').trigger('change')})()`;
  document.head.appendChild(s);
  s.remove();
});
