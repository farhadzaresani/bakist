"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// const message = document.createElement("div");
// message.classList.add("cookie-message");

// message.innerHTML =
//   "we used cookies for imporved somthing.<button class='btn btn--close--cookie'>got it<button/>";

// header.append(message);

// document
//   .querySelector(".btn--close--cookie")
//   .addEventListener("click", function () {
//     message.remove();
//   });

//styles
// message.style.backgroundColor = "#37383d";
// message.style.width = "120%";

//scrol function
btnScrollTo.addEventListener("click", function () {
  // const s1coords = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  //modern way and short way
  section1.scrollIntoView({ behavior: "smooth" });
});

//page navigation

// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

document.querySelector(".nav__links").addEventListener("click", function (e) {
  if (e.target.classList.contains("nav__link")) {
    e.preventDefault();
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//tabbed components
const tabs = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  console.log(clicked);
  //guard close
  if (!clicked) return;
  //remove active classes
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((con) =>
    con.classList.remove("operations__content--active")
  );
  //active tab
  clicked.classList.add("operations__tab--active");

  //active content tab
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//manu fade activation

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
      logo.style.opacity = this;
    });
  }
};

// nav.addEventListener("mouseover", handleHover.bind(0.5));
// nav.addEventListener("mouseout", handleHover.bind(1));
// //sticky navigation
// const initialCoods = section1.getBoundingClientRect();
// window.addEventListener("scroll", function () {
//   if (window.scrollY >= initialCoods.top) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// });
//other way to sticky navigation
// const obsCallback = function (enteries, observer) {
//   enteries.forEach((entry) => {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   root: null,
//   treshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

//better navigation sticky
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (enteries) {
  const [entry] = enteries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//showing sections bueati

const allSections = document.querySelectorAll(".section");
const revealSection = function (enteries, observer) {
  const [entry] = enteries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};
const sectopnObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectopnObserver.observe(section);
  // section.classList.add("section--hidden");
});

//lazy loading images***
const imgTarget = document.querySelectorAll("img[data-src]");
const loadImg = function (enteries, observer) {
  const [entry] = enteries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const imgOserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "-100px",
});
imgTarget.forEach((img) => imgOserver.observe(img));

//Slider
const sliderComponent = function () {
  const slides = document.querySelectorAll(".slide");
  const slider = document.querySelector(".slider");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotCountainer = document.querySelector(".dots");
  slider.style.overflow = "hidden";
  let currenSlide = 0;
  const maxSlide = slides.length;

  //functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotCountainer.insertAdjacentHTML(
        "beforeend",
        `<button class='dots__dot' data-slide=${i}></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const gotToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * [i - slide]}%)`)
    );
  };

  //next slide
  const nextSlide = function () {
    if (currenSlide === maxSlide - 1) {
      currenSlide = 0;
    } else currenSlide++;
    gotToSlide(currenSlide);
    activateDot(currenSlide);
  };
  const prevSlide = function () {
    if (currenSlide === 0) {
      currenSlide = maxSlide - 1;
    } else currenSlide--;
    gotToSlide(currenSlide);
    activateDot(currenSlide);
  };
  const init = function () {
    gotToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  //events
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    e.key === "ArrowLeft" && prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotCountainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      gotToSlide(slide);
      activateDot(slide);
    }
  });
};
sliderComponent();
