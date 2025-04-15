let allEvents = [];

const timeline = document.getElementById("timeline");

// Criação dos filtros
const filterContainer = document.createElement("div");
filterContainer.style.display = "flex";
filterContainer.style.gap = "20px";
filterContainer.style.marginBottom = "30px";
filterContainer.innerHTML = `
  <label>
    Filter by Country:
    <select id="countryFilter">
      <option value="All">All</option>
    </select>
  </label>
  <label>
    Filter by INES Level:
    <select id="inesFilter">
      <option value="All">All</option>
    </select>
  </label>
`;
timeline.before(filterContainer);

const countryFilter = document.getElementById("countryFilter");
const inesFilter = document.getElementById("inesFilter");

function renderTimeline(events) {
  timeline.innerHTML = "";

  events.forEach(event => {
    const card = document.createElement("div");
    card.className = "content";
    card.style.marginBottom = "25px";

    card.innerHTML = `
      <p class="date">${event.year} - ${event.name} ${getFlagEmoji(event.location)}</p>
      <p><strong>Location:</strong> ${event.location}</p>
      <p><strong>INES Level:</strong> ${event.ines}</p>
      <a href="${event.link}" target="_blank" style="display:inline-block;margin-top:10px;color:#90caf9;text-decoration:underline;">Learn More</a>
    `;

    timeline.appendChild(card);
  });
}

function getFlagEmoji(location) {
  const match = location.match(/🇦🇷|🇧🇷|🇺🇸|🇷🇺|🇺🇦|🇯🇵|🇬🇧|🇫🇷|🇩🇪|🇨🇳|🇰🇷|🇮🇳|🇮🇱|🇮🇷|🇵🇰/g);
  return match ? match[0] : "";
}

function updateFiltersOptions(events) {
  const countries = new Set();
  const inesLevels = new Set();

  events.forEach(e => {
    countries.add(e.location);
    inesLevels.add(e.ines);
  });

  countries.forEach(c => {
    const option = document.createElement("option");
    option.value = c;
    option.textContent = c;
    countryFilter.appendChild(option);
  });

  inesLevels.forEach(i => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    inesFilter.appendChild(option);
  });
}

function applyFilters() {
  const selectedCountry = countryFilter.value;
  const selectedINES = inesFilter.value;

  const filtered = allEvents.filter(event => {
    const matchCountry = selectedCountry === "All" || event.location === selectedCountry;
    const matchINES = selectedINES === "All" || event.ines === selectedINES;
    return matchCountry && matchINES;
  });

  renderTimeline(filtered);
}

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    allEvents = data.sort((a, b) => a.year - b.year);
    updateFiltersOptions(allEvents);
    renderTimeline(allEvents);

    countryFilter.addEventListener("change", applyFilters);
    inesFilter.addEventListener("change", applyFilters);
  })
  .catch(err => console.error("Error loading data:", err));
