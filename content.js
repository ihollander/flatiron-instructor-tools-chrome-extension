const selectBatch = () => {
  // get batchId from extension storage
  chrome.storage.sync.get("batchId", ({ batchId }) => {
    const s = document.createElement("script");
    s.textContent = `(()=>{$('.batches').val(${batchId}),$('.batches').trigger('change')})()`;
    document.head.appendChild(s);
    s.remove();
  });
};

// use mutationObserver to check when the element we need has been added
// (also assuming that the page scripts we need are loaded at this point)
const mutationObserver = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    const trackEl = Array.from(mutation.addedNodes).find(
      el => el.id === "track-explorer-layout"
    );

    // good to go!
    if (trackEl !== undefined) {
      selectBatch();
      // cleanup mutation observer
      mutationObserver.disconnect();
    }
  });
});

// run the mutation observer
mutationObserver.observe(document.body, {
  childList: true,
  subtree: true
});
