"use strict";
// ---- Fade up animation on navigation -----
const nav = document.querySelector(".nav");
const handleHover = function (e, opc) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    console.log(link);
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector(".text-logo");
    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = opc;
    });
    logo.style.opacity = opc;
  }
};
nav.addEventListener("mouseover", function (e) {
  handleHover(e, 0.5);
});
nav.addEventListener("mouseout", function (e) {
  handleHover(e, 1);
});

////// sticky navigation

const header = document.querySelector(".header");
const about = document.querySelector(".about");
const portfolio = document.querySelector(".portfolio");
const testimonial = document.querySelector(".testimonial");
const faq = document.querySelector(".faq-question");
const contact = document.querySelector(".contact");
const hero = document.querySelector(".hero-container");
const heroHeight = hero.getBoundingClientRect().height;
const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${heroHeight}px`,
};
const colorOpt = {
  root: null,
  threshold: 0,
};
const stickyNav = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
    document.querySelector(".text-logo").style.color = "#007bff";
    nav.style.border = "none";
    document
      .querySelectorAll(".nav__link")
      .forEach((el) => (el.style.color = "#444"));
  } else {
    nav.classList.remove("sticky");
    document.querySelector(".text-logo").style.color = "#dbd2d2";
    nav.style.borderBottom = "1px solid ##6c757d";
    document
      .querySelectorAll(".nav__link")
      .forEach((el) => (el.style.color = "#dbd2d2"));
  }
};
const colorChanged = function (entries, observer) {
  const [entry] = entries;
  console.log(entry.target.dataset.section);
  if (entry.isIntersecting)
    document.querySelector(
      `.link--${entry.target.dataset.section}`
    ).style.color = "#007bff";
  else
    document.querySelector(
      `.link--${entry.target.dataset.section}`
    ).style.color = "#444";
};
const headerObserver = new IntersectionObserver(stickyNav, obsOptions);
headerObserver.observe(header);
const aboutObserver = new IntersectionObserver(colorChanged, colorOpt);
aboutObserver.observe(about);
const portfolioObserver = new IntersectionObserver(colorChanged, colorOpt);
portfolioObserver.observe(portfolio);
const testimonialObserver = new IntersectionObserver(colorChanged, colorOpt);
testimonialObserver.observe(testimonial);
const faqObserver = new IntersectionObserver(colorChanged, colorOpt);
faqObserver.observe(faq);
const contactObserver = new IntersectionObserver(colorChanged, colorOpt);
contactObserver.observe(contact);
// ----- mouseover Events on team members ------
const teamMembersContainer1 = document.querySelector(".team1");
const teamMembersContainer2 = document.querySelector(".team2");
const personsInfo = document.querySelectorAll(".person-info__container");

teamMembersContainer1.addEventListener("mouseover", function (e) {
  const data = e.target.closest(".person-info__container").dataset.person;
  console.log(data);
  personsInfo.forEach((t) => {
    t.children[0].style.opacity = 0;
    t.children[0].classList.remove("social--active");
  });
  document.querySelector(`.social-media--${data}`).style.opacity = 1;
  document
    .querySelector(`.social-media--${data}`)
    .classList.add("social--active");
});
teamMembersContainer2.addEventListener("mouseover", function (e) {
  const data = e.target.closest(".person-info__container").dataset.person;
  console.log(data);
  personsInfo.forEach((t) => {
    t.children[0].style.opacity = 0;
    t.children[0].classList.remove("social--active");
  });
  document.querySelector(`.social-media--${data}`).style.opacity = 1;
  document
    .querySelector(`.social-media--${data}`)
    .classList.add("social--active");
});

// ------ tab Component ----------
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");

  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//reveal section
const sections = document.querySelectorAll(".section");
const revealSections = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};
const revealOptions = {
  root: null,
  threshold: 0.15,
};
const revealImgOptions = {
  root: null,
  threshold: 0,
};
const sectionObserver = new IntersectionObserver(revealSections, revealOptions);
const teamObserver = new IntersectionObserver(revealSections, revealImgOptions);
const team1 = document.querySelector(".team1");
const team2 = document.querySelector(".team2");
teamObserver.observe(team1);
teamObserver.observe(team2);
team1.classList.add("section--hidden");
team2.classList.add("section--hidden");

sections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// Slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
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

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

// ------- Faq Questions ---------

const questions = document.querySelectorAll(".question");
const answers = document.querySelectorAll(".answer");
const arrows = document.querySelectorAll(".arrow");
const faqContainer = document.querySelector(".faq");

faqContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".question-box").children[1];
  const rotateArrow = e.target.closest(".question-box").children[0].children[0];
  answers.forEach((a) => a.classList.remove("answer-opened"));
  clicked.classList.add("answer-opened");
  arrows.forEach((arr) => arr.classList.remove("arrow-rotated"));
  rotateArrow.classList.add("arrow-rotated");
});
