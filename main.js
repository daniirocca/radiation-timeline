// fetch("data.json")
//   .then((res) => res.json())
//   .then((events) => {
//     const container = document.getElementById("timeline");
//     events.forEach((event) => {
//       const item = document.createElement("div");
//       item.className = "timeline-item";
//       item.innerHTML = `<strong>${event.year} — ${event.name}</strong>`;
//       item.onclick = () => openModal(event);
//       container.appendChild(item);
//     });
//   });

// function openModal(event) {
//   document.getElementById("modal-title").textContent = event.name;
//   document.getElementById("modal-year").textContent = event.year;
//   document.getElementById("modal-location").textContent = event.location;
//   document.getElementById("modal-ines").textContent = event.ines_level;
//   document.getElementById("modal-description").textContent = event.description;
//   document.getElementById("modal-effects").textContent = event.effects;
//   document.getElementById("modal").classList.remove("hidden");
// }

// document.getElementById("close").onclick = () => {
//   document.getElementById("modal").classList.add("hidden");
// };
