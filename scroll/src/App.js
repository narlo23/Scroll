import PhotoList from "./PhotoList.js";
const data = [
  {
    id: 1,
    imagePath: "../photos/snow_1.jpg",
  },
  {
    id: 2,
    imagePath: "../photos/snow_2.jpg",
  },
  {
    id: 3,
    imagePath: "../photos/snow_3.jpg",
  },
  {
    id: 4,
    imagePath: "../photos/snow_4.jpg",
  },
  {
    id: 5,
    imagePath: "../photos/snow_5.jpg",
  },
  {
    id: 6,
    imagePath: "../photos/snow_6.jpg",
  },
  {
    id: 7,
    imagePath: "../photos/snow_7.jpg",
  },
  {
    id: 8,
    imagePath: "../photos/snow_8.jpg",
  },
  {
    id: 9,
    imagePath: "../photos/snow_9.jpg",
  },
  {
    id: 10,
    imagePath: "../photos/snow_10.jpg",
  },
  {
    id: 11,
    imagePath: "../photos/snow_11.jpg",
  },
  {
    id: 12,
    imagePath: "../photos/snow_12.jpg",
  },
  {
    id: 13,
    imagePath: "../photos/snow_13.jpg",
  },
  {
    id: 14,
    imagePath: "../photos/snow_14.jpg",
  },
  {
    id: 15,
    imagePath: "../photos/snow_15.jpg",
  },
];

export function getData(start, limit) {
  return data.slice(start, start + limit);
}

export default function App({ $target }) {
  const $h1 = document.createElement("h1");
  $h1.innerText = "스노우볼 토끼";
  $h1.style.textAlign = "center";
  $target.appendChild($h1);

  this.state = {
    limit: 3,
    nextStart: 0,
    photos: [],
    isLoading: false,
  };

  const photoListComponent = new PhotoList({
    $target,
    initialState: {
      isLoading: this.state.isLoading,
      photos: this.state.photos,
    },
    onScrollEnded: async () => {
      await fetchPhotos();
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    photoListComponent.setState({
      isLoading: this.state.isLoading,
      photos: nextState.photos,
    });
  };

  const fetchPhotos = async () => {
    this.setState({
      ...this.state,
      isLoading: true,
    });
    const { limit, nextStart } = this.state;
    const photos = await getData(nextStart, limit);
    this.setState({
      ...this.state,
      nextStart: nextStart + limit,
      photos: this.state.photos.concat(photos),
      isLoading: false,
    });
  };

  fetchPhotos();
}
