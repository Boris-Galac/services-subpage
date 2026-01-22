// GALLERY services

if (document.querySelector(".main")?.classList.contains("subpage-main")) {
  const galleries = document.querySelectorAll(".gallery");
  const intervalTime = 4000;

  galleries.forEach((gallery) => {
    const slides = Array.from(gallery.querySelectorAll(".slide-img"));
    if (!slides.length) return;

    let index = slides.findIndex((slide) =>
      slide.classList.contains("current"),
    );

    if (index === -1) {
      index = 0;
      slides[0].classList.add("current");
    }

    setInterval(() => {
      slides[index].classList.remove("current");
      index = (index + 1) % slides.length;
      slides[index].classList.add("current");
    }, intervalTime);
  });
}

function interactiveGradientBackground(options = {}) {
  const {
    colors = ["#1e3c72", "#2a5298", "#6dd5ed", "#2193b0"],
    speed = 0.02,
    zIndex = -1,
  } = options;

  const bg = document.createElement("div");
  bg.style.cssText = `
    position:fixed;
    inset:0;
    z-index:${zIndex};
    pointer-events:none;
    background: linear-gradient(
      120deg,
      ${colors.join(",")}
    );
    background-size: 400% 400%;
    will-change: background-position;
  `;

  document.body.prepend(bg);

  let x = 50;
  let y = 50;
  let targetX = 50;
  let targetY = 50;

  document.addEventListener("mousemove", (e) => {
    targetX = (e.clientX / window.innerWidth) * 100;
    targetY = (e.clientY / window.innerHeight) * 100;
  });

  function animate() {
    x += (targetX - x) * speed;
    y += (targetY - y) * speed;

    bg.style.backgroundPosition = `${x}% ${y}%`;

    requestAnimationFrame(animate);
  }

  animate();
}
interactiveGradientBackground({
  colors: ["#1759ff", "#4b78d9", "#ffffff"],
  speed: 0.03,
  zIndex: -1,
});
