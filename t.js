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
    if (parseInt(window.innerWidth) > 986) {
      sleep(150).then(() => {
        document.querySelector(".navbarbig2").style.top = "12%";
      });
    } else document.querySelector(".navbarbig2").style.top = "5%";
  }
});
document.addEventListener("custom:scrolldownEvent", (e) => {
  if (header.style.position !== "fixed") {
    header.style.top = "-100px";
    if (parseInt(window.innerWidth) > 986) {
      document.querySelector(".navbarbig2").style.top = "0";
    } else document.querySelector(".navbarbig2").style.top = "5%";
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
    parseInt(window.innerWidth) > 987 &&
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
  document.querySelector("a#producto").style.textDecoration = "underline";
  document.querySelector(".navbarbig2").style.top = "12%";
}
function handlemouseout() {
  document.querySelector(".navbarbig").style.display = "none";
  document.querySelector(".options").style.display = "flex";
  document.querySelector(".navbarbig2").style.display = "none";
  document.querySelector(".navbarbig2").style.flexDirection = "column";
  document.querySelector(".tophalf").style.flexDirection = "column";
  document.querySelector("a#producto").style.textDecoration = "none";
  document.querySelector(".navbarbig2").style.top = "5%";
}
const headerelements = Array.from(document.querySelectorAll(".header > *"));
document
  .querySelector("div.search")
  .addEventListener("click", () => headervanish(headerelements));
function headervanish(header) {
  console.log(headerelements);
  for (let i = 1; i < header.length; i++) {
    header[i].animate(
      [
        { opacity: "1", display: "flex" },
        { opacity: "0", display: "none" },
      ],
      {
        duration: 200,
        easing: "ease",
      }
    );
    header[i].style.display = "none";
  }

  document.querySelector(".searchbar").style.display = "flex";
  document.querySelector(".header").style.justifyContent = "center";
  document.querySelector(".header").style.height = "82px";
  document.querySelector(".header").style.padding = "8px";
  document.querySelector(".searchbar").animate(
    [
      {
        position: "absolute",
        opacity: "0",
        height: "46.19px",
      },
      {
        position: "absolute",
        opacity: "1",
        height: "46.19px",
      },
    ],
    { duration: 200, easing: "ease-in-out" }
  );
}
document.querySelector(".searchbarradius").addEventListener("click", (e) => {
  document.querySelector(".searchbarradius").style.borderRadius = "30px";
  document.querySelector(".searchbarradius").style.borderStyle = "solid";
  document.querySelector(".searchbarradius").style.borderWidth = "2px";
  document.querySelector(".searchbarradius").style.borderColor = "white";
  if (document.querySelector(".searchtext").style.scale !== "0.6") {
    document.querySelector(".searchtext").animate(
      [
        { scale: "1", alignSelf: "center" },
        { scale: "0.6", alignSelf: "start" },
      ],
      {
        duration: 100,
        easing: "ease",
      }
    );
    document.querySelector(".searchtext").style.scale = "0.6";
    document.querySelector(".searchtext").style.alignSelf = "start";
  }
});
const searchbox = document
  .querySelector(".searchbarradius")
  .getBoundingClientRect();
document.querySelector(".header").addEventListener("click", (e) => {
  const searchbar = document.querySelector(".searchbar");
  if (searchbar.style.display === "flex") {
    const searchbox = searchbar.getBoundingClientRect();
    if (
      e.clientX < searchbox.left ||
      e.clientX > searchbox.right - 70 ||
      e.clientY < searchbox.top ||
      e.clientY > searchbox.bottom
    ) {
      document.querySelector(".searchtext").style.scale = "1";
      document.querySelector(".searchtext").style.alignSelf = "center";
      document.querySelector(".searchbarradius").style.borderRadius = "0";
      document.querySelector(".searchbarradius").style.borderStyle = "none";
      document.querySelector(".searchbarradius").style.borderWidth = "0";
      document.querySelector(".searchbarradius").style.borderColor = "white";
    }
  }
});

document
  .querySelector(".cancelsearch")
  .addEventListener("click", () => headerappear(headerelements));

function headerappear(header) {
  document.querySelector(".searchbar").animate(
    [
      {
        position: "absolute",
        opacity: "1",
        height: "46.19px",
      },
      {
        position: "absolute",
        opacity: "0",
        height: "46.19px",
      },
    ],
    { duration: 200, easing: "ease-in-out" }
  );
  console.log(headerelements);
  for (let i = 2; i < header.length; i++) {
    header[i].animate([{ opacity: "0" }, { opacity: "1" }], {
      duration: 200,
      easing: "ease",
    });
    header[i].style.display = "flex";
  }

  document.querySelector(".searchbar").style.display = "none";
  document.querySelector(".header").removeAttribute("justify-content");
  document.querySelector(".header").removeAttribute("height");
  document.querySelector(".header").style.padding = "20px";
  document.querySelector(".header-middle").removeAttribute("style");
  document.querySelector(".menu").removeAttribute("style");
}
const producttypeselements = document.querySelectorAll(".producttype");
producttypeselements.forEach((element) => {
  element.addEventListener("mouseover", (e) => {
    element.querySelector(" svg path").animate(
      [
        { transform: "rotate(0deg)", fill: "white" },
        { transform: "rotate(-90deg)", fill: "#073b43" },
      ],
      {
        duration: 200,
        easing: "ease",
      }
    );
    element.querySelector(" svg path").style.transform = "rotate(-90deg)";
    element.querySelector(" svg path").style.fill = "#073b43";
    element.querySelector(" svg").style.fill = "white";
  });
  element.addEventListener("mouseout", (e) => {
    element
      .querySelector(" svg path")
      .animate(
        [{ transform: "rotate(-90deg)" }, { transform: "rotate(0deg)" }],
        {
          duration: 200,
          easing: "ease",
        }
      );
    element.querySelector(" svg path").style.transform = "rotate(0deg)";
    element.querySelector(" svg").style.fill = "transparent";
    element.querySelector(" svg path").style.fill = "white";
  });
});
