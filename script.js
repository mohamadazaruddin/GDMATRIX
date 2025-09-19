let currentNavIndex = 0;
const sidebar = document.getElementById("sidebar");
const content = document.getElementById("content");
const pageDescription = document.getElementById("page-description");
function renderNav() {
  sidebar.innerHTML = "";
  routes.forEach((route, idx) => {
    const nav = document.createElement("div");
    nav.className = "nav" + (idx === currentNavIndex ? " active" : "");
    nav.textContent = route.name;
    nav.onclick = () => {
      currentNavIndex = idx;
      renderNav();
      routes.forEach((r) => {
        const div = document.getElementById(r.slug);
        if (div) div.style.display = "none";
      });
      const activeDiv = document.getElementById(routes[currentNavIndex].slug);
      if (activeDiv) activeDiv.style.display = "block";

      content.textContent = routes[currentNavIndex].content;
      pageDescription.textContent = routes[currentNavIndex].description;
    };
    sidebar.appendChild(nav);
  });
  pageDescription.textContent = routes[currentNavIndex].description;
  content.textContent = routes[currentNavIndex].content;
  routes.forEach((r) => {
    const div = document.getElementById(r.slug);
    if (div) div.style.display = "none";
  });
  const activeDiv = document.getElementById(routes[currentNavIndex].slug);
  if (activeDiv) activeDiv.style.display = "block";
}
function renderList(data) {
  const gridBody = document.getElementById("grid-body");
  let rows = "";
  data.forEach((row, idx) => {
    rows += `
      <div class="grid-row">
        <div class="grid-cell">${row.Batch}</div>
        <div class="grid-cell">${row.Group}</div>
        <div class="grid-cell">${row.Resource}</div>
        <div class="grid-cell">${row.role}</div>
        <div class="grid-cell">${row.Resource}</div>
        <div class="grid-cell">${row.role}</div>
        <div class="grid-cell">${row.Resource}</div>
        <div class="grid-cell">${row.role}</div>
        <div class="grid-cell">${row.Resource}</div>
        <div class="grid-cell">${row.role}</div>
      </div>
    `;
  });
  gridBody.innerHTML = rows;
}
function setupSearch(data) {
  const searchInput = document.getElementById("search-input");
  if (!searchInput) return;

  searchInput.oninput = function () {
    const searchValue = this.value.toLowerCase();
    const filteredData = data.filter(
      (row) =>
        (row.Batch + "").toLowerCase().includes(searchValue) ||
        (row.Group + "").toLowerCase().includes(searchValue) ||
        (row.Resource + "").toLowerCase().includes(searchValue) ||
        (row.role ? row.role.toLowerCase() : "").includes(searchValue)
    );
    renderList(filteredData);
  };
}
function createCard(site) {
  return `
    <a class="card" href="${site["Website"]}" target="_blank">
      <div class="card-title">${site["Site Name"]}</div>
      <div class="card-link">${site["Website"]}</div>
    </a>
  `;
}

function renderCards() {
  const container = document.getElementById("card-container");
  container.innerHTML = "";

  Object.entries(dueDiligenceLinks).forEach(([category, sites]) => {
    const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
    const cards = sites.map(createCard).join("");
    container.innerHTML += `
      <div>
        <div class="category-title">${categoryTitle}</div>
        <div class="card-list">${cards}</div>
      </div>
    `;
  });
}

renderList(orgData);
setupSearch(orgData);
renderNav();
renderCards();
