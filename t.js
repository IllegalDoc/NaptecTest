let lastScrollPos = window.scrollY;
const header = document.querySelector("header");
document.addEventListener("scroll", (e) => {
  if (lastScrollPos > window.scrollY) {
    const scrollupEvent = new CustomEvent("custom:scrollupEvent", {
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(scrollupEvent);
    lastScrollPos = window.scrollY;
  } else {
    const scrolldownEvent = new CustomEvent("custom:scrolldownEvent", {
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(scrolldownEvent);
    lastScrollPos = window.scrollY;
  }
});
document.addEventListener("custom:scrollupEvent", (e) => {
  if (header.style.position !== "fixed") {
    header.style.position = "sticky";
    header.style.top = "0px";
  }
});
document.addEventListener("custom:scrolldownEvent", (e) => {
  if (header.style.position !== "fixed") {
    header.style.top = "-100px";
  }
});

const hamburger = document.querySelector(".menu");
const burgerimage = hamburger.querySelector("a img");
const bignav = document.querySelector(".navbarbig");
let position = 0;
hamburger.addEventListener("click", (e) => {
  if (burgerimage.getAttribute("src") === "/images/icons8-menu.svg") {
    burgerimage.setAttribute("src", "images/crossicon.png");
    bignav.style.display = "flex";
    bignav.style.width = "0%";
    bignav.style.padding = "0px";
    position = window.scrollY;

    appear(bignav);
  } else {
    burgerimage.setAttribute("src", "/images/icons8-menu.svg");

    disapear(bignav);

    setTimeout(function () {
      window.scrollTo(0, position);
    }, 0.1);
  }
});
let StartTime = null;

function appear(bignav) {
  bignav.animate(
    [
      { width: "0%", padding: "0px", display: "none" },
      { width: "100%", padding: "12px", display: "flex" },
    ],
    {
      duration: 200,
      easing: "ease",
    }
  );
  bignav.style.width = "100%";
  bignav.style.padding = "12px";
  header.style.position = "fixed";
}

function disapear(bignav) {
  bignav.animate(
    [
      { width: "100%", padding: "12px", display: "flex" },
      { width: "0%", padding: "0px", display: "none" },
    ],
    {
      duration: 200,
      easing: "ease",
    }
  );
  bignav.style.width = "0px";
  bignav.style.padding = "0px";
  bignav.style.display = "none";
  header.style.position = "sticky";
}
window.addEventListener("resize", (e) => {
  if (parseInt(window.innerWidth) > 984) {
    bignav.style.display = "none";
  }

  burgerimage.setAttribute("src", "/images/icons8-menu.svg");
});
