document.lastScrollPosition = 0;
document.lastCentered = 0;
document.onWayTo = null;
document.addEventListener("scroll", () => {
  const direction =
    window.pageYOffset - document.lastScrollPosition > 0 ? "down" : "up";
  const sections = [...document.querySelectorAll("section")];

  if (document.onWayTo === null) {
    const destIndex =
      direction === "up"
        ? document.lastCentered - 1
        : document.lastCentered + 1;

    if (destIndex >= 0 && destIndex < sections.length) {
      document.onWayTo = destIndex;
      window.scroll(0, sections[destIndex].offsetTop);
    }
  }
  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const offsetRange = 150; // Adjust this value to define the range/tolerance

    if (
      window.pageYOffset >= sectionTop - offsetRange &&
      window.pageYOffset < sectionTop + sectionHeight - offsetRange
    ) {
      document.lastCentered = index;
      section.classList.add("active");
      if (document.onWayTo === index) {
        document.onWayTo = null;
      }
    } else {
      section.classList.remove("active");
    }
  });

  document.lastScrollPosition = window.pageYOffset;
});
