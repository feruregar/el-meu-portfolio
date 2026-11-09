"use strict";

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const navLinks = document.querySelectorAll("#site-nav a");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

function closeMenu() {
  if (!menuToggle || !siteNav) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir el menú");
  siteNav.classList.remove("is-open");
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "Abrir el menú" : "Cerrar el menú");
    siteNav.classList.toggle("is-open", !isExpanded);
  });

  navLinks.forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

const yearElement = document.querySelector("#current-year");
if (yearElement) yearElement.textContent = String(new Date().getFullYear());

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

if (contactForm instanceof HTMLFormElement && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const name = String(formData.get("name")).trim();
    const senderEmail = String(formData.get("email")).trim();
    const message = String(formData.get("message")).trim();
    const subject = encodeURIComponent(`Mensaje de ${name} desde el portfolio`);
    const body = encodeURIComponent(`${message}\n\nDe: ${name} (${senderEmail})`);

    // Cambia esta dirección por la tuya para recibir los mensajes.
    window.location.href = `mailto:hola@exemple.cat?subject=${subject}&body=${body}`;
    formStatus.textContent = "Se ha preparado el mensaje en tu gestor de correo. Cambia hola@exemple.cat en el código por tu dirección para recibirlo.";
  });
}
