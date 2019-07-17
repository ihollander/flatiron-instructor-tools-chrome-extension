// select batch
chrome.storage.sync.get("batchId", ({ batchId }) => {
  console.log("run jquery from select-batch");
  const s = document.createElement("script");
  s.textContent = `(()=>{$('.batches').val(${batchId}),$('.batches').trigger('change')})()`;
  document.head.appendChild(s);
  s.remove();
});
