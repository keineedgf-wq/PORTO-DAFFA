/* =========================================================
   PERSONAL PORTFOLIO — EDIT DATA DI BAGIAN CONFIG DI BAWAH
   Ganti placeholder dengan informasi milik Anda sendiri.
   Nomor WhatsApp harus memakai format internasional tanpa +,
   spasi, atau tanda hubung, contoh: 6281234567890.
   ========================================================= */
const PORTFOLIO_CONFIG = {
  name: "Daffa Arif Alyansyah",
  initials: "D",
  phoneDisplay: "+62 851-8176-2630",
  phoneLink: "+6285181762630",
  whatsappNumber: "6285181762630",
  email: "daffaalyansyah@gmail.com",
  instagramUsername: "daffaaaarf_",
  instagramUrl: "https://instagram.com/daffaaaarf_",
  location: "Depok, Jawa Barat",
  year: new Date().getFullYear()
};

// Isi kontak di halaman dari satu konfigurasi agar mudah diperbarui.
const setText = (selector, value) => {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
};

setText("[data-phone-text]", PORTFOLIO_CONFIG.phoneDisplay);
setText("[data-email-text]", PORTFOLIO_CONFIG.email);
setText("[data-instagram-text]", `@${PORTFOLIO_CONFIG.instagramUsername}`);
setText("[data-location-text]", PORTFOLIO_CONFIG.location);
setText("#year", PORTFOLIO_CONFIG.year);
setText(".brand-mark", `${PORTFOLIO_CONFIG.initials}.`);
setText(".brand-name", PORTFOLIO_CONFIG.name.toUpperCase());
setText(".footer-brand .brand-mark", `${PORTFOLIO_CONFIG.initials}.`);
setText(".footer-brand .brand-name", PORTFOLIO_CONFIG.name.toUpperCase());
document.title = `${PORTFOLIO_CONFIG.name} — Digital Portfolio`;

document.querySelectorAll("[data-phone]").forEach((link) => {
  link.href = `tel:${PORTFOLIO_CONFIG.phoneLink}`;
});
document.querySelectorAll("[data-email]").forEach((link) => {
  link.href = `mailto:${PORTFOLIO_CONFIG.email}`;
});
document.querySelectorAll("[data-instagram]").forEach((link) => {
  link.href = PORTFOLIO_CONFIG.instagramUrl;
});
document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  link.href = `https://wa.me/${PORTFOLIO_CONFIG.whatsappNumber}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

// Mobile navigation.
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Buka menu navigasi" : "Tutup menu navigasi");
  navLinks.classList.toggle("open", !isOpen);
});
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu navigasi");
  });
});

// Fade-in on scroll. Fallback tetap menampilkan semua konten jika API tidak tersedia.
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

// Back-to-top button.
const backToTop = document.querySelector(".back-to-top");
const updateScrollUI = () => {
  backToTop.classList.toggle("visible", window.scrollY > 500);
  const sections = [...document.querySelectorAll("main section[id]")];
  const current = sections.reverse().find((section) => section.getBoundingClientRect().top <= 130);
  if (current) {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current.id}`);
    });
  }
};
window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
