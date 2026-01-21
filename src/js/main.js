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
