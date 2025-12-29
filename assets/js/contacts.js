const CONTACT = {
  phoneDisplay: "+7 771 540 88 08",
  phoneRaw: "77715408808",
  email: "info@stroycompany.kz",
  address: "г. Алматы, ул. Гагарина 93А, офис 403",
  schedule: "Пн–Сб, 9:00–18:00"
};

function setText(selector, text) {
  document.querySelectorAll(selector).forEach(el => { el.textContent = text; });
}

function setHref(selector, href) {
  document.querySelectorAll(selector).forEach(el => { el.setAttribute("href", href); });
}

function applyContacts() {
  setText("[data-contact='phone-text'], [data-contact='phone-link']", CONTACT.phoneDisplay);
  setHref("[data-contact='phone-link']", `tel:+${CONTACT.phoneRaw}`);

  const waHref = `https://wa.me/${CONTACT.phoneRaw}`;
  setHref("[data-contact='wa-link']", waHref);

  setText("[data-contact='email-text'], [data-contact='email-link']", CONTACT.email);
  setHref("[data-contact='email-link']", `mailto:${CONTACT.email}`);

  setText("[data-contact='address-text']", CONTACT.address);
  setText("[data-contact='schedule-text']", CONTACT.schedule);
}

document.addEventListener("DOMContentLoaded", applyContacts);
