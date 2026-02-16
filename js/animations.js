window.addEventListener("load", () => {
  gsap.to(".layout", { opacity: 1, duration: 0.3 });
});

// AOS animation
gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  gsap.from(".header", {
    y: -50,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
  });

  gsap.from(".hero > *", {
    y: 30,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
  });
});

const titles = gsap.utils.toArray(
  ".experience-title, .project-title, .tools-title, .reviews-title, .contact-title, .contact-subtitle",
);

titles.forEach((title) => {
  gsap.from(title, {
    scrollTrigger: {
      trigger: title,
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
    x: -50,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });
});

const cardConfigs = [
  { trigger: ".experience-cards", target: ".card" },
  { trigger: ".project-cards", target: ".project-card" },
  { trigger: ".tools-cards", target: ".tool-card" },
  { trigger: ".review-container", target: ".review-card" },
];

cardConfigs.forEach((config) => {
  if (document.querySelector(config.trigger)) {
    gsap.from(config.target, {
      scrollTrigger: {
        trigger: config.trigger,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 60,
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      stagger: 0.15,
      ease: "back.out(1.2)",
    });
  }
});

gsap.from(".form .top-inp > *, .form textarea, .notification, .form button", {
  scrollTrigger: {
    trigger: ".form",
    start: "top 85%",
  },
  y: 30,
  opacity: 0,
  duration: 0.8,
  stagger: 0.1,
  ease: "power2.out",
});

// Typing animation
var typed = new Typed("#typing-text", {
  strings: [
    "Web Designer",
    "Frontend Developer",
    "UI/UX Designer",
    "Frontend Specialist",
  ],
  typeSpeed: 70,
  backSpeed: 40,
  backDelay: 2000,
  loop: true,
  cursorChar: "|",
});
