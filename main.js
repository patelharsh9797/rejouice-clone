// TODO: Variables

// ---------------------------
// TODO: Event Listeners
// ---------------------------
cursorEffect();

// ---------------------------
// TODO: Event Functions
// ---------------------------
function cursorEffect() {
  const page1Content = document.querySelector("#page1-content");
  const cursor = document.querySelector("#cursor");

  page1Content.addEventListener("mousemove", (dets) => {
    gsap.to(cursor, {
      x: dets.x,
      y: dets.y,
    });
  });

  page1Content.addEventListener("mouseenter", (dets) => {
    gsap.to(cursor, {
      scale: 1,
      opacity: 1,
    });
  });

  page1Content.addEventListener("mouseleave", (dets) => {
    gsap.to(cursor, {
      scale: 0,
      opacity: 0,
    });
  });
}
