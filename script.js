"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btn_scroll = document.querySelector(".btn--scroll-to");
const section1 = document.getElementById("section--1");
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

btn_scroll.addEventListener("click", () => {
  section1.scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  console.log("YES");
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    console.log(e.target);

    if (id !== "#")
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

const container_tab = document.querySelector(".operations__tab-container");

const tabs = document.querySelectorAll(".operations__tab");

const tabsContent = document.querySelectorAll(".operations__content");

container_tab.addEventListener("click", (e) => {
  const tab = e.target.closest(".operations__tab");
  if (!tab) return;
  tabs.forEach((t) => {
    t.classList.remove("operations__tab--active");
  });
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));
  document
    .querySelector(`.operations__content--${tab.dataset.tab}`)
    .classList.add("operations__content--active");
  tab.classList.add("operations__tab--active");
});

const nav = document.querySelector(".nav");
const navHeight = nav.getBoundingClientRect().height;
const mouseNavHandler = function (e) {
  if (!e.target.classList.contains("nav__link")) return;
  const link = e.target;
  const links = link.closest(".nav").querySelectorAll(".nav__link");
  const logo = link.closest(".nav").querySelector("img");
  links.forEach((l) => {
    if (l !== link) {
      l.style.opacity = this;
    }
  });
  logo.style.opacity = this;
};

nav.addEventListener("mouseover", mouseNavHandler.bind(0.5));
nav.addEventListener("mouseout", mouseNavHandler.bind(1));

const header = document.querySelector(".header");
const sticky = (entries) => {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const observerHeader = new IntersectionObserver(sticky, {
  root: null,
  threshold: 0,
  rootMargin: `${-navHeight}px`,
});

observerHeader.observe(header);

const sections = document.querySelectorAll(".section");
const sectionObserveCallBack = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};
const sectionObserve = new IntersectionObserver(sectionObserveCallBack, {
  root: null,
  threshold: 0.15,
});
sections.forEach((section) => {
  section.classList.add("section--hidden");
  sectionObserve.observe(section);
});

const imgs = document.querySelectorAll("img[data-src]");

const imgObserverCallBack = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(imgObserverCallBack, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgs.forEach((img) => {
  imgObserver.observe(img);
});
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btn_left = document.querySelector(".slider__btn--left");
  const btn_right = document.querySelector(".slider__btn--right");
  let currentSlide = 0;
  const lenghtSlides = slides.length;
  const dots = document.querySelector(".dots");

  const goToSlide = (current_slide) => {
    console.log("YES");
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - current_slide)}%)`;
    });
  };
  const prvSlide = () => {
    currentSlide--;
    if (currentSlide === -1) currentSlide = lenghtSlides - 1;
    goToSlide(currentSlide);
  };

  const nextSlide = () => {
    currentSlide++;
    currentSlide %= lenghtSlides;
    goToSlide(currentSlide);
  };
  const createDots = function () {
    slides.forEach((_, i) => {
      dots.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide = ${i}></button>`
      );
    });
  };
  const activeDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide ="${slide}"]`)
      .classList.add("dots__dot--active");
  };
  const init = () => {
    goToSlide(0);
    createDots();
    activeDot(0);
  };
  init();
  btn_right.addEventListener("click", nextSlide);

  btn_left.addEventListener("click", prvSlide);

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    else if (e.key === "ArrowLeft") prvSlide();
  });

  dots.addEventListener("click", (e) => {
    if (!e.target.classList.contains("dots__dot")) return;
    goToSlide(e.target.dataset.slide);
    activeDot(e.target.dataset.slide);
  });
};
slider();
