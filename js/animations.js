// Typing animation
var typed = new Typed("#typing-text", {
  strings: [
    "Web Designer",
    "Frontend Developer",
    "UI/UX Designer",
    "Frontend Specialisty",
  ],
  typeSpeed: 70,
  backSpeed: 40,
  backDelay: 2000,
  loop: true,
  cursorChar: "|",
});

// AOS animation
gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero > *", {
  y: 30,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",
  delay: 0.3,
});

gsap.utils
  .toArray(
    ".project-title, .experience-title, .reviews-title, .tools-title, .review-title, .contact-title",
  )
  .forEach((title) => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
      x: -40,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
  });

const cardGrids = [".project-cards", ".tools-cards"];
cardGrids.forEach((grid) => {
  gsap.from(`${grid} > *`, {
    scrollTrigger: {
      trigger: grid,
      start: "top 85%",
    },
    y: 50,
    opacity: 0,
    scale: 0.9,
    duration: 0.8,
    stagger: 0.15,
    ease: "back.out(1.4)",
  });
});

gsap.from(".card", {
  scrollTrigger: {
    trigger: ".experience",
    start: "top 80%",
  },
  x: -30,
  opacity: 0,
  duration: 0.7,
  stagger: 0.2,
  ease: "power2.out",
});

gsap.from(".review-card", {
  scrollTrigger: {
    trigger: ".reviews-grid",
    start: "top 85%",
  },
  y: 40,
  opacity: 0,
  duration: 0.9,
  stagger: 0.25,
  ease: "power3.out",
});

gsap.from(".form .top-inp > *, .form textarea, .notification, .form button", {
  scrollTrigger: {
    trigger: ".contact",
    start: "top 85%",
  },
  y: 25,
  opacity: 0,
  duration: 0.6,
  stagger: 0.1,
  ease: "power1.out",
});

gsap.from(".footer", {
  scrollTrigger: {
    trigger: ".footer",
    start: "top 100%",
  },
  opacity: 0,
  y: 20,
  duration: 1,
});
