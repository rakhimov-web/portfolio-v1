// Configuration for Telegram Bot
const botToken = "8239365513:AAGQY9AcMRvVGO2T7tEg1qtRX3L6990sqMI";
const chatId = "5379497693";

// Page scroll (Lenis)
const lenis = new Lenis({
  duration: 1.5,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  prevent: (node) => node.nodeName === "VERBATIM",
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Anchor navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const href = this.getAttribute("href");

    if (href === "#top") {
      lenis.scrollTo(0, { duration: 2 });
    } else {
      const target = document.querySelector(href);
      if (target) {
        lenis.scrollTo(target, { duration: 1.8 });
      }
    }
  });
});

// Counter animation logic
const startCounting = (el) => {
  const target = parseInt(el.getAttribute("data-target"));
  const duration = 1000;
  const startTime = performance.now();

  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    el.innerText = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.innerText = target;
  };
  requestAnimationFrame(update);
};

// Intersection observer for counters
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        entry.target.classList.add("counted");
        startCounting(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".count").forEach((num) => {
  if (!num.hasAttribute("data-target"))
    num.setAttribute("data-target", num.innerText);
  num.innerText = "0";
  observer.observe(num);
});

// Slider logic
document.addEventListener("DOMContentLoaded", () => {
  const slider = {
    container: document.querySelector(".review-container"),
    prevBtn: document.querySelector(".btn-left"),
    nextBtn: document.querySelector(".btn-right"),
    cards: document.querySelectorAll(".review-card"),
    counter: 0,
    gap: 20,
  };

  if (!slider.container || slider.cards.length === 0) return;

  const updateSliderUI = () => {
    const { container, prevBtn, nextBtn, cards, counter, gap } = slider;
    const isFirst = counter === 0;
    const isLast = counter === cards.length - 1;

    [prevBtn, nextBtn].forEach((btn) => (btn.style.transition = "0.3s"));

    prevBtn.style.opacity = isFirst ? "0.3" : "1";
    prevBtn.style.pointerEvents = isFirst ? "none" : "auto";

    nextBtn.style.opacity = isLast ? "0.3" : "1";
    nextBtn.style.pointerEvents = isLast ? "none" : "auto";

    const moveDistance = counter * (container.offsetWidth + gap);
    container.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
    container.style.transform = `translateX(${-moveDistance}px)`;
  };

  slider.nextBtn.addEventListener("click", () => {
    if (slider.counter < slider.cards.length - 1) {
      slider.counter++;
      updateSliderUI();
    }
  });

  slider.prevBtn.addEventListener("click", () => {
    if (slider.counter > 0) {
      slider.counter--;
      updateSliderUI();
    }
  });

  window.addEventListener("resize", updateSliderUI);
  updateSliderUI();
});

// Telegram Contact Form Logic
document.querySelector(".form")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = this.querySelector("#name").value.trim();
  const email = this.querySelector("#email").value.trim();
  const message = this.querySelector("#message").value.trim();
  const notification = this.querySelector(".notification");
  const btn = document.getElementById("send-btn");

  const showNotification = (msg, isSuccess) => {
    notification.innerText = msg;
    notification.style.opacity = "1";
    notification.style.color = isSuccess ? "#4BB543" : "#ff4d4d";

    setTimeout(() => {
      notification.innerText = "Fill the inputs 🚀";
      notification.style.color = "";
    }, 5000);
  };

  if (!name || !email || !message) {
    showNotification("Please fill all fields correctly!", false);
    return;
  }

  const originalBtnText = btn.innerText;
  const telegramText = `
*NEW MESSAGE FROM PORTFOLIO*
---------------------------------------
👤 *Name:* ${name}
📧 *Email:* ${email}
📝 *Message:* ${message}
---------------------------------------
📅 *Date:* ${new Date().toLocaleString()}
  `;

  btn.innerText = "Sending...";
  btn.disabled = true;

  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: telegramText,
      parse_mode: "Markdown",
    }),
  })
    .then((res) => {
      if (res.ok) {
        showNotification("Message sent successfully!", true);
        this.reset();
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      showNotification("Failed to send message. Try again!", false);
    })
    .finally(() => {
      btn.innerText = originalBtnText;
      btn.disabled = false;
    });
});

// Footer current year
document.getElementById("current-year").innerText = new Date().getFullYear();
