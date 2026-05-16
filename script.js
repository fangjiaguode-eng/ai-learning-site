const searchInput = document.querySelector("#noteSearch");
const noteCards = document.querySelectorAll(".note-card");

if (searchInput && noteCards.length > 0) {
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.trim().toLowerCase();

    noteCards.forEach((card) => {
      const text = `${card.textContent} ${card.dataset.keywords || ""}`.toLowerCase();
      card.style.display = text.includes(keyword) ? "" : "none";
    });
  });
}
