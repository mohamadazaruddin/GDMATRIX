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
function formatDateToDDMMYYYY(value) {
  if (!value) return "-";
  if (typeof value === "number") {
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    excelEpoch.setUTCDate(excelEpoch.getUTCDate() + value);
    value = excelEpoch;
  } else if (typeof value === "string") {
    value = new Date(value);
  }

  if (value instanceof Date && !isNaN(value)) {
    let day = String(value.getDate()).padStart(2, "0");
    let month = String(value.getMonth() + 1).padStart(2, "0");
    let year = value.getFullYear();
    return `${day}/${month}/${year}`;
  }
  return "-";
}
function renderList(data) {
  const gridBody = document.getElementById("grid-body");
  let rows = "";
  data.forEach((row, idx) => {
    rows += `
      <div class="grid-row">
        <div class="grid-cell">${row.Batch}</div>
        <div class="grid-cell">${row.L1_Analyst_ECM}</div>
        <div class="grid-cell">${row.L1_Analyst}</div>
        <div class="grid-cell">${row.L1_QC_ECM}</div>
        <div class="grid-cell">${row.L1_QC}</div>
        <div class="grid-cell">${row.L1_Team_Lead_ECM}</div>
        <div class="grid-cell">${row.L1_Team_Lead}</div>
        <div class="grid-cell">${row.L2_QC}</div>
        <div class="grid-cell">${row.L2_Team_Lead}</div>
        <div class="grid-cell">${row.Case_Type}</div>
        <div class="grid-cell">${row.Location}</div>
        <div class="grid-cell">${
          formatDateToDDMMYYYY(row.Sampling_Date) || "-"
        }</div>
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
        (row.L1_Analyst_ECM + "").toLowerCase().includes(searchValue) ||
        (row.L1_Analyst + "").toLowerCase().includes(searchValue) ||
        (row.Location ? row.Location.toLowerCase() : "").includes(searchValue)
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
function createNarrationCard(narration, idx, cat) {
  const uniqueId = `${cat}-${idx}`;
  return `
        <div class="card">
          <div class="card-title">${narration.title}</div>
          <div class="card-link" id="desc-${uniqueId}">${narration.description}</div>
          <button class="copy-btn" onclick="copyText('desc-${uniqueId}')">Copy</button>
        </div>
      `;
}
function renderNarrationCards() {
  const container = document.getElementById("Narations");
  container.innerHTML = "";

  Object.entries(Narrations).forEach(([category, narrations]) => {
    const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
    const cards = narrations
      .map((narr, idx) => createNarrationCard(narr, idx, category))
      .join("");
    container.innerHTML += `
          <div>
            <div class="category-title">${categoryTitle}</div>
            <div class="card-list">${cards}</div>
          </div>
        `;
  });
}
function copyText(elementId) {
  // Code Generated by Sidekick is for learning and experimentation purposes only.
  const text = document.getElementById(elementId).innerText;
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("Description copied!");
    })
    .catch(() => alert("Copy failed. Please try again."));
}

// Render cards on page load
async function createCaseFolder(params) {
  const caseId = document.getElementById("caseId").value.trim();
  const counterParty = document.querySelector(
    'input[name="counterParty"]:checked'
  ).value;
  const message = document.getElementById("message");
  message.textContent = "";
  if (!caseId) {
    message.textContent = "Please enter a Case ID.";
    return;
  }

  if ("showDirectoryPicker" in window) {
    try {
      const dirHandle = await window.showDirectoryPicker();
      const caseFolder = await dirHandle.getDirectoryHandle(`Case_${caseId}`, {
        create: true,
      });
      await caseFolder.getDirectoryHandle("Focal_Entity", {
        create: true,
      });
      // await caseFolder.getDirectoryHandle("OFAC_Focal_Entity", {
      //   create: true,
      // });
      // await caseFolder.getDirectoryHandle("Screening_Focal_Entity", {
      //   create: true,
      // });
      const fileHandle = await caseFolder.getFileHandle("Customer_Info.txt", {
        create: true,
      });
      const writable = await fileHandle.createWritable();
      await writable.write("");
      await writable.close();

      const docxHandle = await caseFolder.getFileHandle(
        `${caseId}_Summary.docx`,
        {
          create: true,
        }
      );
      const docxWritable = await docxHandle.createWritable();
      await docxWritable.write("");
      await docxWritable.close();
      if (counterParty === "yes") {
        await caseFolder.getDirectoryHandle("Counter_party", {
          create: true,
        });
        // await caseFolder.getDirectoryHandle("OFAC_Counter_party", {
        //   create: true,
        // });
        // await caseFolder.getDirectoryHandle("Screening_Counter_party", {
        //   create: true,
        // });
      }

      const caseDetail = {
        caseId,
        addedby: "Azar",
        date: formatDateToDDMMYYYY(new Date()), // e.g. "2025-09-23"
      };
      let casesArr = [];
      try {
        casesArr = JSON.parse(localStorage.getItem("casesList")) || [];
      } catch (e) {
        casesArr = [];
      }
      casesArr.push(caseDetail);
      localStorage.setItem("casesList", JSON.stringify(casesArr));

      message.classList.add("success");
      message.textContent = `Folder "${caseId}", subfolders created successfully!`;
      renderCasesTable();
    } catch (err) {
      if (err.name !== "AbortError") {
        message.textContent = "Error: " + err.message;
      }
    }
  } else {
    message.classList.add("error");
    message.textContent =
      "File System Access API is not supported in this browser.";
  }
}
function renderCasesTable() {
  const casesArr = JSON.parse(localStorage.getItem("casesList")) || [];
  const tableBody = document.getElementById("case-table-body");
  tableBody.innerHTML = ""; // Clear previous

  if (casesArr.length === 0) {
    tableBody.innerHTML = `<div style="grid-column: 1 / -1; text-align:center; color:#888; padding:18px;">No cases found.</div>`;
    return;
  }

  casesArr.forEach((item, idx) => {
    const row = document.createElement("div");
    row.className = "case-table-row";
    row.innerHTML = `
      <div>${idx + 1}</div>
      <div>${item.caseId}</div>
      <div>${item.date}</div>
      <div>${item.addedby}</div>
    `;
    tableBody.appendChild(row);
  });
}
function openSearchTabs() {
  const name = encodeURIComponent(document.getElementById("name").value.trim());
  const city = encodeURIComponent(document.getElementById("city").value.trim());
  const state = encodeURIComponent(
    document.getElementById("state").value.trim()
  );

  if (!name) {
    alert("Please enter a name");
    return;
  }

  // OFAC Search (general landing page)
  const ofacURL = `https://sanctionssearch.ofac.treas.gov/`;

  // FastPeopleSearch (formatted for name/city/state)
  const fpsName = document
    .getElementById("name")
    .value.trim()
    .replace(/\s+/g, "-");
  const fpsCity = document
    .getElementById("city")
    .value.trim()
    .replace(/\s+/g, "-");
  const fpsState = document
    .getElementById("state")
    .value.trim()
    .replace(/\s+/g, "-");
  let fpsURL = `https://www.fastpeoplesearch.com/name/${fpsName}`;
  if (fpsCity || fpsState) {
    fpsURL += `/${fpsCity}${fpsState ? "-" + fpsState : ""}`;
  }
  const googleURL = `https://www.google.com/search?q=%22${name}%22+%2B+%22${city}%22+%2B+%22${state}%22`;

  // Open all three tabs/windows
  window.open(ofacURL, "_blank");
  window.open(fpsURL, "_blank");
  window.open(googleURL, "_blank");
}
function fetchExcelData() {
  fetch("TeamMapping.xlsx")
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => {
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);
      renderList(jsonData);
      setupSearch(jsonData);
    });
}
document.getElementById("docs-grid").innerHTML = documents
  .map(
    (doc) => `
      <div class="doc-card">
        <div class="doc-title">${doc.title}</div>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="70"
            viewBox="0 0 54 70"
          >
            <!-- Main document sheet -->
            <rect
              x="6"
              y="7"
              width="42"
              height="56"
              rx="8"
              fill="#ffffff"
              stroke="#FF7A2F"
              stroke-width="2"
            />
            <!-- Fold corner -->
            <polygon points="43,7 43,19 54,19" fill="#FF7A2F" />
            <!-- Horizontal lines (content) -->
            <rect x="14" y="24" width="26" height="4" rx="2" fill="#FF7A2F" />
            <rect x="14" y="32" width="16" height="4" rx="2" fill="#FF7A2F" />
            <rect x="14" y="40" width="20" height="4" rx="2" fill="#FF7A2F" />
            <!-- Shine animation line -->
            <rect
              class="doc-svg-shine"
              x="5"
              y="8"
              width="44"
              height="4"
              rx="2"
              fill="#fff"
              opacity="0.4"
            />
          </svg>
        <button class="download-btn" onclick="window.open('${doc.file}','_blank')">Download</button>
      </div>
    `
  )
  .join("");

// Code Generated by Sidekick is for learning and experimentation purposes only.
// Code Generated by Sidekick is for learning and experimentation purposes only.
// Code Generated by Sidekick is for learning and experimentation purposes only.

function renderCounterpartyTable(filteredArr = null) {
  const arr =
    filteredArr || JSON.parse(localStorage.getItem("counterpartyList")) || [];
  const tableBody = document.getElementById("counterparty-table-body");
  tableBody.innerHTML = "";

  if (arr.length === 0) {
    const emptyRow = document.createElement("div");
    emptyRow.className = "counterparty-table-row";
    emptyRow.style.color = "#888";
    emptyRow.innerHTML = `<div style="grid-column:1/span 3;">No counterparties added yet.</div>`;
    tableBody.appendChild(emptyRow);
    return;
  }

  arr.forEach((item, idx) => {
    const row = document.createElement("div");
    row.className = "counterparty-table-row";
    row.innerHTML = `
      <div>${idx + 1}</div>
      <div>${item.counterparty}</div>
      <div>${item.analyst}</div>
    `;
    tableBody.appendChild(row);
  });
}

// Filter and re-render table on search input
document
  .getElementById("searchcounterparty")
  .addEventListener("input", function () {
    const searchValue = this.value.trim().toLowerCase();
    let arr = JSON.parse(localStorage.getItem("counterpartyList")) || [];
    if (searchValue) {
      arr = arr.filter((item) =>
        item.counterparty.toLowerCase().includes(searchValue)
      );
    }
    renderCounterpartyTable(arr);
  });

// Button to add new counterparty
document.getElementById("addCounterpartyBtn").onclick = function () {
  const counterparty = document
    .getElementById("counterpartyInput")
    .value.trim();
  const analyst = document.getElementById("analystInput").value.trim();
  if (!counterparty || !analyst) {
    alert("Please enter both Counterparty Name and Analyst Name.");
    return;
  }
  let arr = [];
  try {
    arr = JSON.parse(localStorage.getItem("counterpartyList")) || [];
  } catch (e) {
    arr = [];
  }
  arr.push({ counterparty, analyst });
  localStorage.setItem("counterpartyList", JSON.stringify(arr));
  document.getElementById("counterpartyInput").value = "";
  renderCounterpartyTable();
};

// Initial render
renderCounterpartyTable();

renderCounterpartyTable();
fetchExcelData();
renderNav();
renderCards();
renderNarrationCards();
renderCasesTable();
