fetch('data.json')
  .then(response => response.json())
  .then(events => {
    // Ordena por ano
    events.sort((a, b) => a.year - b.year);

    const timeline = document.getElementById("timeline");

    events.forEach((event, index) => {
      const container = document.createElement("div");
      container.className = `container ${index % 2 === 0 ? "left" : "right"}`;

      const content = document.createElement("div");
      content.className = "content";
      content.innerHTML = `
        <p class="date">${event.year} - ${event.name}</p>
        <p>${event.summary} <br><em>${event.ines}</em></p>
        <p class="details">${event.details}</p>
      `;

      content.onclick = () => {
        const detail = content.querySelector(".details");
        detail.style.display = detail.style.display === "block" ? "none" : "block";
      };

      container.appendChild(content);
      timeline.appendChild(container);
    });
  })
  .catch(error => console.error("Error loading timeline data:", error));
