let isComic = false;

document.addEventListener("DOMContentLoaded", () => {
  const comicButton = document.getElementById("comicButton");

  comicButton.addEventListener("click", () => {
    if (!isComic) {
      document.body.setAttribute("id", "comic-font");
      isComic = true;
    } else {
      document.body.removeAttribute("id");
      isComic = false;
    }
  });
});