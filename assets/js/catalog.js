async function loadProducts() {
  const res = await fetch("data/products.json");
  if (!res.ok) throw new Error("Не удалось загрузить каталог");
  return await res.json();
}

function normalize(s) {
  return (s || "").toString().trim().toLowerCase();
}

function buildCategoryOptions(products) {
  const select = document.getElementById("category");
  const categories = Array.from(new Set(products.map(p => p.category))).sort();
  for (const c of categories) {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    select.appendChild(opt);
  }
}

function render(products) {
  const grid = document.getElementById("catalog");
  grid.innerHTML = "";

  if (products.length === 0) {
    grid.innerHTML = `<div class="col"><div class="alert alert-secondary">Ничего не найдено.</div></div>`;
    return;
  }

  for (const p of products) {
    const priceText = p.price == null ? "Цена по запросу" : `${p.price} ₸`;
    const waText = encodeURIComponent(`Здравствуйте! Интересует: ${p.name}. Можно цену и сроки?`);
    const waLink = `https://wa.me/77770000000?text=${waText}`; // TODO: свой номер

    const col = document.createElement("div");
    col.className = "col-12 col-md-6 col-lg-4";
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <div class="text-muted small mb-1">${p.category}</div>
          <h5 class="card-title mb-2">${p.name}</h5>
          <div class="mb-2"><strong>${priceText}</strong> <span class="text-muted">/ ${p.unit}</span></div>
          <div class="text-muted small mb-3">Наличие: ${p.availability}</div>
          <p class="card-text small text-muted">${p.description || ""}</p>
        </div>
        <div class="card-footer bg-white border-0">
          <a class="btn btn-primary w-100" target="_blank" href="${waLink}">Запросить цену в WhatsApp</a>
        </div>
      </div>
    `;
    grid.appendChild(col);
  }
}

function applyFilters(all) {
  const q = normalize(document.getElementById("search").value);
  const cat = document.getElementById("category").value;

  const filtered = all.filter(p => {
    const text = normalize(`${p.name} ${p.category} ${(p.tags || []).join(" ")} ${p.description || ""}`);
    const okQuery = q === "" || text.includes(q);
    const okCat = cat === "" || p.category === cat;
    return okQuery && okCat;
  });

  render(filtered);
}

(async function main() {
  const products = await loadProducts();
  buildCategoryOptions(products);
  render(products);

  document.getElementById("search").addEventListener("input", () => applyFilters(products));
  document.getElementById("category").addEventListener("change", () => applyFilters(products));
  document.getElementById("reset").addEventListener("click", () => {
    document.getElementById("search").value = "";
    document.getElementById("category").value = "";
    render(products);
  });
})();
