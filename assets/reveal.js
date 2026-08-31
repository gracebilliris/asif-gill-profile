(() => {
  const decks = document.querySelectorAll("[data-reveal]");

  decks.forEach((deck) => {
    const track = deck.querySelector(".reveal-track");
    const panels = Array.from(track.children);
    const current = deck.querySelector("[data-current]");
    const total = deck.querySelector("[data-total]");
    const previousButtons = deck.querySelectorAll("[data-previous]");
    const nextButtons = deck.querySelectorAll("[data-next]");
    let active = 0;
    let touchStart = 0;
    let touchStartY = 0;
    let wheelLocked = false;
    let wheelTimer;

    if (!panels.length) return;

    deck.classList.add("is-interactive");
    total.textContent = panels.length;

    const show = (index) => {
      active = Math.max(0, Math.min(index, panels.length - 1));
      track.style.transform = `translateX(-${active * 100}%)`;
      current.textContent = active + 1;

      panels.forEach((panel, panelIndex) => {
        panel.setAttribute("aria-hidden", panelIndex !== active);
        panel.inert = panelIndex !== active;
      });

      previousButtons.forEach((button) => {
        button.disabled = active === 0;
      });
      nextButtons.forEach((button) => {
        button.disabled = active === panels.length - 1;
      });
    };

    previousButtons.forEach((button) => {
      button.addEventListener("click", () => show(active - 1));
    });
    nextButtons.forEach((button) => {
      button.addEventListener("click", () => show(active + 1));
    });

    deck.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") show(active - 1);
      if (event.key === "ArrowRight") show(active + 1);
    });

    deck.addEventListener("wheel", (event) => {
      const movement = Math.abs(event.deltaY) >= Math.abs(event.deltaX)
        ? event.deltaY
        : event.deltaX;

      if (Math.abs(movement) < 12) return;
      event.preventDefault();
      window.clearTimeout(wheelTimer);
      wheelTimer = window.setTimeout(() => {
        wheelLocked = false;
      }, 180);

      if (wheelLocked) return;
      wheelLocked = true;
      show(active + (movement > 0 ? 1 : -1));
    }, { passive: false });

    deck.addEventListener("touchstart", (event) => {
      touchStart = event.changedTouches[0].clientX;
      touchStartY = event.changedTouches[0].clientY;
    }, { passive: true });

    deck.addEventListener("touchend", (event) => {
      const distanceX = event.changedTouches[0].clientX - touchStart;
      const distanceY = event.changedTouches[0].clientY - touchStartY;
      const horizontal = Math.abs(distanceX) >= Math.abs(distanceY);
      const distance = horizontal ? distanceX : distanceY;

      if (Math.abs(distance) < 45) return;
      show(active + (distance < 0 ? 1 : -1));
    }, { passive: true });

    show(0);
  });
})();
