const stickyNav = document.querySelector(".sticky-top");
const accordion = document.querySelector(".accordion");
const collapses = document.querySelectorAll(".accordion-collapse");
const collapseRate = document.querySelector("#collapse4");
const scoreBar = document.querySelector(".score-bar");
const bsEvent = ["shown.bs.collapse", "click"];
const favoriteIcons = document.querySelectorAll(".favorite-btn");
const score = document.querySelector(".score");
const starBars = document.querySelectorAll(".star-bar");
let scoreList = [];
let totalScore = 0;

favoriteIcons.forEach((favoriteIcon) => {
  favoriteIcon.addEventListener("click", () => {
    if (
      favoriteIcon
        .querySelector("img")
        .getAttribute("src")
        .includes("heart-fill")
    ) {
      favoriteIcon
        .querySelector("img")
        .setAttribute("src", "./img/font/heart.png");
    } else {
      favoriteIcon
        .querySelector("img")
        .setAttribute("src", "./img/font/heart-fill.png");
    }
  });
});

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

starBars.forEach((starBar) => {
  // console.log(starBar.querySelector("p").innerText);
  let barLength = starBar.querySelector("p").innerText;
  let bar = parseInt(barLength) / 100;
  scoreList.push(bar);
  starBar.querySelector(".bar").style.width = barLength;
});

for (let i = 0; i < scoreList.length; i++) {
  totalScore += scoreList[i] * (5 - i);
}
score.querySelector("h2").innerText = totalScore.toFixed(1);
