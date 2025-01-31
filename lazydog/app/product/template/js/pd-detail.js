const stickyNav = document.querySelector(".sticky-top");
const accordion = document.querySelector(".accordion");
const collapses = document.querySelectorAll(".accordion-collapse");
const collapseRate = document.querySelector("#collapse4");
const scoreBar = document.querySelector(".score-bar");
const bsEvent = ["shown.bs.collapse", "click"];

window.addEventListener("scroll", () => {
  if (window.scrollY >= stickyNav.offsetTop) {
    stickyNav.style.opacity = "1";
  } else {
    stickyNav.style.opacity = "0";
  }
});

stickyNav.addEventListener("click", (e) => {
  if (e.target.tagName == "A") {
    let collapseID = e.target.getAttribute("href").replace("-heading", "");
    document.querySelector(collapseID).classList.add("show");
  }
});

collapses.forEach((collapse) => {
  collapse.addEventListener("click", (e) => {
    e.currentTarget.previousElementSibling.querySelector("button").click();
  });
});

bsEvent.forEach((event) => {
  accordion.addEventListener(event, () => {
    collapseRateStar();
  });
});

collapseRateStar();
function collapseRateStar() {
  if (collapseRate.getAttribute("class").includes("show")) {
    // let imgs = scoreBar.querySelectorAll("img");
    // imgs.forEach((img) => {
    //   if (img.getAttribute("src").includes("star-fill")) {
    //     let src = img.getAttribute("src").replace("star-fill", "whitestar");
    //     img.setAttribute("src", src);
    //   }
    // });
    scoreBar.querySelector("h2").style.display = "";
    scoreBar.querySelector(".info-rate-group").style.display = "";
  } else {
    scoreBar.querySelector("h2").style.display = "none";
    scoreBar.querySelector(".info-rate-group").style.display = "none";
  }
}
