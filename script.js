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

// const { Client, Databases, ID } = Appwrite;

// const client = new Client()
//   .setEndpoint("https://fra.cloud.appwrite.io/v1") // e.g., 'https://cloud.appwrite.io/v1'
//   .setProject("65c0ff8899a8453945af"); // Your Appwrite project ID

// const databases = new Databases(client);
// const databaseId = "68d1396100206a743faa"; // Your Appwrite database ID
// const collectionId = "cp-details"; // Your Appwrite collection ID

// const userList = document.getElementById("userList");
// const addUserForm = document.getElementById("addUserForm");

// function fetchUsers() {
//   databases
//     .listDocuments(databaseId, collectionId)
//     .then((response) => {
//       userList.innerHTML = "";
//       response.documents.forEach((user) => {
//         const li = document.createElement("li");
//         li.textContent = `${user.name} (${user.email})`;
//         userList.appendChild(li);
//       });
//     })
//     .catch((error) => {
//       userList.innerHTML = "<li>Error loading users.</li>";
//       console.error(error);
//     });
// }

// addUserForm.addEventListener("submit", function (e) {
//   e.preventDefault();
//   const name = document.getElementById("name").value;
//   const email = document.getElementById("email").value;

//   databases
//     .createDocument(databaseId, collectionId, ID.unique(), { name, email })
//     .then(() => {
//       fetchUsers();
//       addUserForm.reset();
//     })
//     .catch((error) => {
//       alert("Failed to add user.");
//       console.error(error);
//     });
// });

// Initial load
// fetchUsers();
renderList(TeamMapping);
setupSearch(TeamMapping);
renderNav();
renderCards();
