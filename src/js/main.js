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
// FALLING IMAGE EFFECT – ONE FUNCTION

function fallingImagesEffect(options = {}) {
  const {
    imgSrc,
    count = 20,
    sizeMin = 20,
    sizeMax = 50,
    speedMin = 0.4,
    speedMax = 1.2,
    zIndex = 0,
  } = options;

  if (!imgSrc) return;

  let vw = window.innerWidth;
  let vh = window.innerHeight;

  const container = document.createElement("div");
  container.style.cssText = `
    position:fixed;
    inset:0;
    pointer-events:none;
    overflow:hidden;
    z-index:${zIndex};
  `;
  document.body.appendChild(container);

  const items = [];
  const rand = (min, max) => Math.random() * (max - min) + min;

  for (let i = 0; i < count; i++) {
    const img = document.createElement("img");
    const size = rand(sizeMin, sizeMax);

    img.src = imgSrc;
    img.style.cssText = `
      position:absolute;
      width:${size}px;
      height:auto;
      opacity:0.8;
      will-change:transform;
    `;

    const item = {
      el: img,
      x: rand(0, vw),
      y: rand(-vh, 0),
      speed: rand(speedMin, speedMax),
      drift: rand(-0.3, 0.3),
    };

    container.appendChild(img);
    items.push(item);
  }

  let running = true;

  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
  });

  window.addEventListener("resize", () => {
    vw = window.innerWidth;
    vh = window.innerHeight;
  });

  function animate() {
    if (running) {
      for (const item of items) {
        item.y += item.speed;
        item.x += item.drift;

        if (item.y > vh + 50) {
          item.y = -50;
          item.x = rand(0, vw);
        }

        if (item.x < -50) item.x = vw + 50;
        if (item.x > vw + 50) item.x = -50;

        item.el.style.transform = `translate3d(${item.x}px, ${item.y}px, 0)`;
      }
    }
    requestAnimationFrame(animate);
  }

  animate();
}

document.addEventListener("DOMContentLoaded", () => {
  fallingImagesEffect({
    imgSrc: "/src/assets/icons/cog-service-icon.png",
    count: 15,
    zIndex: 0,
  });
});
