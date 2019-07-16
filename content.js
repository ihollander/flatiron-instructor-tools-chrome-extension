console.log("hello from content!");
console.log(document.body);

// use mutationObserver to check when the element we need has been added
// (also assuming that the page scripts we need are loaded at this point)
var mutationObserver = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    const trackEl = Array.from(mutation.addedNodes).find(
      el => el.id === "track-explorer-layout"
    );
    // good to go!
    if (trackEl !== undefined) {
      const s = document.createElement("script");
      s.textContent = `(()=>{console.log("o boi");$('.batches').val(1012),$('.batches').trigger('change')})()`;
      document.head.appendChild(s);
      s.remove();
      // cleanup mutation observer
      mutationObserver.disconnect();
    }
  });
});

// run the mutation observer
// TODO: remove unneeded options
mutationObserver.observe(document.body, {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true,
  attributeOldValue: true,
  characterDataOldValue: true
});
