const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card');

for (let card of cards) {
  // no evento de click da classe de card eu addiciona a lista de classes a classe active
  card.addEventListener("click", function () {
    const videoId = card.getAttribute("id");
    window.location.href = `/video?id=${videoId}`
  })
}

