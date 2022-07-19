function openNav() {
  let links = document.querySelector(".nav-links-of-modal");
  let navLinksModalWrapper = document.querySelector(".nav-links-modal-wrapper");
  if (links.style.display === "block") {
    links.style.display = "none";
  } else {
    links.style.display = "flex";
    // navLinksModalWrapper.style.display = "block";
    navLinksModalWrapper.classList.add("open");

    // links.style.display = "flex";
  }
}

function closeNav() {
  let navLinksModalWrapper = document.querySelector(".nav-links-modal-wrapper");

  navLinksModalWrapper.classList.remove("open");
}
