let lastScrollPos = window.scrollY;
const header = document.querySelector("header");
const navbarbigarrow = document.querySelector(".arrowicon  img");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
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
      window.scrollTo(0, position); // for cursor to go back to main place  in screen
    }, 0.1);
  }
});

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
  if (
    parseInt(window.innerWidth) > 984 &&
    document.querySelector(".closebutton").style.display !== "none"
  ) {
    bignav.style.display = "none";
  }

  burgerimage.setAttribute("src", "/images/icons8-menu.svg");
});

function appearreverse(bignav) {
  header.style.position = "sticky";
  bignav.animate(
    [
      { left: "100%", display: "none" },
      { left: "0%", display: "flex" },
    ],
    {
      duration: 500,
      easing: "ease",
    }
  );
  bignav.style.left = "0";
  bignav.style.display = "flex";
}
navbarbigarrow.addEventListener("click", (e) => {
  appearreverse(document.querySelector(".navbarbig2"));
  sleep(500).then(() => {
    header.style.position = "fixed";
    header.style.top = "0";
  });
});

function dissappeareverse(bignav) {
  header.style.position = "sticky";
  bignav.animate(
    [
      { left: "0%", display: "flex" },
      { left: "100%", display: "none" },
    ],
    {
      duration: 500,
      easing: "ease",
    }
  );
  bignav.style.left = "100%";
  bignav.style.display = "none";
}
document.querySelector(".closebutton").addEventListener("click", (e) => {
  dissappeareverse(document.querySelector(".navbarbig2"));
  sleep(500).then(() => {
    header.style.position = "fixed";
    header.style.top = "0";
  });
});
if (window.innerWidth > 987) {
  document
    .querySelector("div.producto")
    .addEventListener("mouseover", handlemouseover);
  document
    .querySelector("div.producto")
    .addEventListener("mouseout", handlemouseout);

  document
    .querySelector(".navbarbig2")
    .addEventListener("mouseover", handlemouseover);
  document
    .querySelector(".navbarbig2")
    .addEventListener("mouseout", handlemouseout);
}

window.addEventListener("resize", (e) => {
  if (parseInt(window.innerWidth) < 987) {
    document
      .querySelector(".navbarbig2")
      .removeEventListener("mouseover", handlemouseover);
    document
      .querySelector(".navbarbig2")
      .removeEventListener("mouseout", handlemouseout);
  } else {
    document
      .querySelector(".navbarbig2")
      .addEventListener("mouseover", handlemouseover);
    document
      .querySelector(".navbarbig2")
      .addEventListener("mouseout", handlemouseout);
  }
});
function handlemouseover() {
  document.querySelector(".navbarbig").style.display = "flex";
  document.querySelector(".options").style.display = "none";
  document.querySelector(".navbarbig2").style.display = "flex";
  document.querySelector(".navbarbig2").style.flexDirection = "row";
  document.querySelector(".tophalf").style.flexDirection = "row";
}
function handlemouseout() {
  document.querySelector(".navbarbig").style.display = "none";
  document.querySelector(".options").style.display = "flex";
  document.querySelector(".navbarbig2").style.display = "none";
  document.querySelector(".navbarbig2").style.flexDirection = "column";
  document.querySelector(".tophalf").style.flexDirection = "column";
}
