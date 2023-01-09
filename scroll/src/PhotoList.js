export default function PhotoList({ $target, initialState, onScrollEnded }) {
  let isInitialize = false;
  const $photoList = document.createElement("div");
  $target.appendChild($photoList);
  this.state = initialState;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.state.isLoading) {
          observer.unobserve(entry.target);
          if (this.state.totalCount > this.state.photos.length) {
            onScrollEnded();
          }
        }
      });
    },
    { threshold: 1 }
  );

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (!isInitialize) {
      $photoList.innerHTML = `
        <ul class="PhotoList__photos"></ul>
        <button class="PhotoList__loadMore" style="width: 100%;">Load More</button>
        `;
      isInitialize = true;
    }
    const { isLoading, photos } = this.state;
    const $photos = $photoList.querySelector(".PhotoList__photos");

    photos.forEach((photo) => {
      if ($photos.querySelector(`li[data-id="${photo.id}"]`) === null) {
        const $li = document.createElement("li");
        $li.setAttribute("data-id", photo.id);
        $li.style = "list-style: none;";
        $li.innerHTML = `<img width="70%" src="${photo.imagePath}" />`;

        $photos.appendChild($li);
      }
    });
    const $nextLi = $photos.querySelector("li:last-child");

    if ($nextLi !== null) {
      observer.observe($nextLi);
    }
  };

  this.render();

  $photoList.addEventListener("click", (e) => {
    if (e.target.className === "PhotoList__loadMore" && !this.state.isLoading) {
      onScrollEnded();
    }
  });

  window.addEventListener("scroll", () => {
    const isScrollEnded =
      window.innerHeight + window.scrollY >= document.body.offsetHeight;

    if (isScrollEnded && !this.state.isLoading) {
      onScrollEnded();
    }
  });
}
