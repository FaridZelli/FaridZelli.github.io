document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href]');
  links.forEach(link => {
    const url = new URL(link.href, window.location.origin);
    if (url.origin !== window.location.origin) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  });
});
