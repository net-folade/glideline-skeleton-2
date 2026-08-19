const products = [
  { id: "GL–01", name: "The Regent", type: "Agbada", tone: "Ivory", image: "public/trads/gl-001-1.svg", alt: "public/trads/gl-001-2.svg" },
  { id: "GL–05", name: "Noir", type: "Agbada", tone: "Obsidian", image: "public/trads/gl-005-1.svg", alt: "public/trads/gl-005-2.svg" },
  { id: "GL–08", name: "River Pearl", type: "South-South", tone: "Pearl", image: "public/trads/gl-008-1.svg", alt: "public/trads/gl-008-2.svg" },
  { id: "GL–07", name: "The Passage", type: "Danshiki", tone: "Indigo", image: "public/trads/gl-007-1.svg", alt: "public/trads/gl-007-2.svg" },
  { id: "GL–03", name: "Sage Leisure", type: "Casual", tone: "Sage", image: "public/trads/gl-003-1.svg", alt: "public/trads/gl-003-2.svg" },
  { id: "GL–04", name: "Bronze Crest", type: "Danshiki", tone: "Bronze", image: "public/trads/gl-004-1.svg", alt: "public/trads/gl-004-2.svg" }
];
const filters = ["All", "Agbada", "South-South", "Danshiki", "Casual"];
const phone = "2348000000000";
const $ = (selector, root = document) => root.querySelector(selector);
const whatsapp = text => `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
let filter = "All";
let selected = null;
let picks = [];
try { picks = JSON.parse(localStorage.getItem("glideline-luxury-picks")) || []; } catch { picks = []; }
picks = picks.filter(id => products.some(product => product.id === id));

function togglePick(id) {
  picks = picks.includes(id) ? picks.filter(item => item !== id) : [...picks, id];
  localStorage.setItem("glideline-luxury-picks", JSON.stringify(picks));
  renderProducts(); renderPicks(); if (selected) renderModal();
}

function renderFilters() {
  $(".filters").innerHTML = filters.map(item => `<button type="button" class="${filter === item ? "active" : ""}" data-filter="${item}">${item}</button>`).join("");
}

function renderProducts() {
  const visible = filter === "All" ? products : products.filter(product => product.type === filter);
  $(".product-grid").innerHTML = visible.map((product, index) => `<article class="product"><button class="product-image" type="button" data-product="${product.id}" aria-label="View ${product.name}"><span class="index">${String(index + 1).padStart(2, "0")}</span><img src="${product.image}" alt="${product.name}"><img class="alternate" src="${product.alt}" alt=""><span class="view">View piece</span></button><div class="product-meta"><div><h3>${product.name}</h3><p>${product.type} · ${product.tone}</p></div><button type="button" data-pick="${product.id}" aria-label="${picks.includes(product.id) ? "Remove" : "Add"} ${product.name} ${picks.includes(product.id) ? "from" : "to"} picks">${picks.includes(product.id) ? "×" : "+"}</button></div></article>`).join("");
}

function renderPicks() {
  const wrap = $(".picks-wrap");
  wrap.hidden = picks.length === 0;
  $(".bag b").textContent = String(picks.length).padStart(2, "0");
  $(".picked-items").innerHTML = picks.map(id => { const p = products.find(item => item.id === id); return `<div class="picked-item"><button class="picked-product" type="button" data-product="${p.id}"><img src="${p.image}" alt=""><span><strong>${p.name}</strong><small>${p.id} · ${p.type}</small></span></button><button class="picked-remove" type="button" data-pick="${p.id}" aria-label="Remove ${p.name}">Remove</button></div>`; }).join("");
  $(".picks-bar button").textContent = `${picks.length} ${picks.length === 1 ? "pick" : "picks"} — ${$(".picks-panel").hidden ? "View picks" : "Hide"}`;
  $(".picks-bar a").href = whatsapp(`Hello Glideline, I am interested in: ${picks.join(", ")}.`);
}

function renderModal() {
  const modal = $(".modal");
  modal.hidden = !selected;
  document.body.classList.toggle("modal-open", Boolean(selected));
  if (!selected) return;
  $(".modal-image img").src = selected.image; $(".modal-image img").alt = selected.name;
  $(".modal-copy .section-no").textContent = `${selected.id} · ${selected.type}`;
  $(".modal-copy h2").textContent = selected.name;
  $(".modal-copy .gold-button").href = whatsapp(`Hello Glideline, I am interested in ${selected.name} (${selected.id}).`);
  $(".modal-copy .text-button").textContent = picks.includes(selected.id) ? "Remove from picks" : "Add to picks";
}

function setPicksOpen(open) {
  $(".picks-panel").hidden = !open; $(".picks-bar button").setAttribute("aria-expanded", open); $(".bag").setAttribute("aria-expanded", open); renderPicks();
}

document.addEventListener("click", event => {
  const filterButton = event.target.closest("[data-filter]");
  const productButton = event.target.closest("[data-product]");
  const pickButton = event.target.closest("[data-pick]");
  if (filterButton) { filter = filterButton.dataset.filter; renderFilters(); renderProducts(); }
  if (productButton) { selected = products.find(item => item.id === productButton.dataset.product); renderModal(); }
  if (pickButton) togglePick(pickButton.dataset.pick);
});

$(".menu-button").addEventListener("click", event => { const menu = $(".mobile-menu"); menu.hidden = !menu.hidden; event.currentTarget.setAttribute("aria-expanded", !menu.hidden); });
$(".mobile-menu").addEventListener("click", () => { $(".mobile-menu").hidden = true; $(".menu-button").setAttribute("aria-expanded", "false"); });
$(".bag").addEventListener("click", () => { if (picks.length) setPicksOpen(!$(".picks-panel").hidden); });
$(".picks-bar button").addEventListener("click", () => setPicksOpen(!$(".picks-panel").hidden));
$(".picks-title button").addEventListener("click", () => setPicksOpen(false));
$(".modal-close").addEventListener("click", () => { selected = null; renderModal(); });
$(".modal").addEventListener("click", event => { if (event.target === event.currentTarget) { selected = null; renderModal(); } });
$(".modal-copy .text-button").addEventListener("click", () => togglePick(selected.id));
document.addEventListener("keydown", event => { if (event.key === "Escape" && selected) { selected = null; renderModal(); } });
$(".service-contact").href = whatsapp("Hello Glideline, I would like to discuss a piece.");
$(".footer-contact").href = whatsapp("Hello Glideline.");
renderFilters(); renderProducts(); renderPicks();
