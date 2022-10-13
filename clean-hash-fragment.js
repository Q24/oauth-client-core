(function (window) {
  // Let's stop the page, so that we can check if there's an access_token in the hash fragment.
  // We need to hide that asap.
  if (window.location.hash.indexOf("id_token") !== -1) {
    // Save the full hash to sessionStorage
    sessionStorage.setItem("hash_fragment", window.location.hash.substring(1));

    history.pushState(
      "",
      document.title,
      window.location.pathname + window.location.search
    );
  }
})(window);
