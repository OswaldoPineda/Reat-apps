import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css';

const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getPhotos();
    // eslint-disable-next-line
  }, [page]);

  const getPhotos = () => {
    let apiURL = `https://api.unsplash.com/photos/?`;
    if (query) apiURL = `https://api.unsplash.com/search/photos/?query=${query}&`;
    apiURL += `client_id=${accessKey}`;
    apiURL += `&page=${page}`;

    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        const imagesFromApi = data.results ?? data;

        if (page === 1) setImages(imagesFromApi);

        setImages((images) => [...images, ...imagesFromApi]);
      })
      .catch((error) => {
        console.error('Error call api: ', error);
      });
  };

  const searchPhotos = (e) => {
    e.preventDefault();
    setPage(1);
    getPhotos();
  };

  return (
    <div className="app">
      <h1>Unsplash Image Gallery!</h1>

      <form onSubmit={searchPhotos}>
        <input type="text" placeholder="Search Unsplash..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <button>Search</button>
      </form>

      <InfiniteScroll
        dataLength={images.length}
        next={() => setPage((page) => page + 1)}
        hasMore={true}
        loader={<h4>Loading...</h4>}>
        <div className="image-grid">
          {images.map((image, index) => (
            <div className="image" key={index}>
              <img src={image.urls.regular} alt={image.alt_description} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
      </div>
  );
}
