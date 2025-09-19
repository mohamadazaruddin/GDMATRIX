const routes = [
  {
    name: "Teams",
    content: "Analyst List",
    description: "List of all analyst working on cases",
    slug: "Teams",
  },
  {
    name: "Tools",
    content: "Tools Content",
    description: "List of all analyst working on cases",
    slug: "Tools",
  },
  {
    name: "Operations",
    content: "Operations Content",
    description: "List of all analyst working on cases",
    slug: "Operations",
  },
  {
    name: "Research",
    content: "Research Content",
    description: "List of all analyst working on cases",
    slug: "Research",
  },
  {
    name: "Documents",
    content: "Documents Content",
    description: "List of all analyst working on cases",
    slug: "Documents",
  },
  {
    name: "Narations",
    content: "Narations Content",
    description: "List of all analyst working on cases",
    slug: "Narations",
  },
];
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

      // Show the selected content div
      const activeDiv = document.getElementById(routes[currentNavIndex].slug);
      if (activeDiv) activeDiv.style.display = "block";

      content.textContent = routes[currentNavIndex].content;
      pageDescription.textContent = routes[currentNavIndex].description;
    };
    sidebar.appendChild(nav);
  });

  pageDescription.textContent = routes[currentNavIndex].description;
  content.textContent = routes[currentNavIndex].content;

  // Hide all content divs
  routes.forEach((r) => {
    const div = document.getElementById(r.slug);
    if (div) div.style.display = "none";
  });

  // Show the selected content div
  const activeDiv = document.getElementById(routes[currentNavIndex].slug);
  if (activeDiv) activeDiv.style.display = "block";
}

function fetchOrgData() {
  fetch("org.json")
    .then((response) => response.json())
    .then((data) => {
      renderList(data);
      setupSearch(data);
    })
    .catch((error) => {
      document.getElementById("grid-body").innerHTML =
        "<p>Error loading data.</p>";
      console.error("Error fetching JSON:", error);
    });
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
              <div class="grid-cell">${row.Batch}</div>
              <div class="grid-cell">${row.Group}</div>
              <div class="grid-cell">${"hyd"}</div>
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
renderNav();
fetchOrgData();
