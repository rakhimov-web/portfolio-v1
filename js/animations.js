window.addEventListener("load", () => {
  gsap.to(".layout", { opacity: 1, duration: 0.5 });
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

  gsap.from(".footer", {
    opacity: 0,
    y: 20,
    duration: 1,
    scrollTrigger: {
      trigger: ".footer",
      start: "top 95%",
    },
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

gsap.from(".form .top-inp > *, .form textarea, .notification, #send-btn", {
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
if (document.querySelector("#typing-text")) {
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
}

// Cursor design
const customCursor = document.querySelector(".custom-cursor");

if (customCursor) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  const speed = 0.15;

  const onMouseMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (getComputedStyle(customCursor).opacity === "0") {
      customCursor.style.opacity = "1";
    }
  };

  window.addEventListener("mousemove", onMouseMove, { passive: true });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;

    customCursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    requestAnimationFrame(animateCursor);
  }

  requestAnimationFrame(animateCursor);

  document.addEventListener("mouseleave", () => {
    customCursor.style.opacity = "0";
  });

  document.addEventListener("mouseenter", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    customCursor.style.opacity = "1";
  });

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      gsap.to(customCursor, { scale: 1.5, duration: 0.3 });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(customCursor, { scale: 1, duration: 0.3 });
    });
  });
}
