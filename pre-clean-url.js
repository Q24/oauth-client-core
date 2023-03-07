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
  } else if (window.location.search.indexOf("code") !== -1) {
    const url = new URL(window.location.href);

    // Save the codeFlow url to sessionStorage
    sessionStorage.setItem("codeFlowUrl", window.location.href);

    url.searchParams.delete('code');
    url.searchParams.delete('state');

    history.pushState(
      "",
      document.title,
      url.href
    );
  }
})(window);
