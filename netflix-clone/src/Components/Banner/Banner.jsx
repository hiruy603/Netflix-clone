import React, { useEffect, useState } from "react";
import axios from "../../Utilis/axios";
import requests from "../../Utilis/requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState({});
  /*const [movie, setMovie] = useState(null);*/

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
            /*  if (request.data.results && request.data.results.length > 0) {
  setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length)]);
} */
          ]
        );
      } catch (error) {
        console.error("Error fetching banner movie:", error);
      }
    };

    fetchData();
  }, []);

  // Function to truncate description text
  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  };

  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        //backgroundImage: `url(${movie?.backdrop_path
        /*? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`*/
        // : "path_to_fallback_image.jpg"})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button play">Play</button>
          <button className="banner_button">My List</button>
          {/* <button className="banner_button play" aria-label="Play Movie">
            Play
          </button>
          <button className="banner_button" aria-label="Add to My List">
            My List
          </button> */}
        </div>
        <h1 className="banner_description">
          {truncate(movie?.overview, 150)}
          {/*const truncate = (str = "", n) => (str.length > n ? str.slice(0, n -
          1) + "..." : str); */}
        </h1>
      </div>
      <div className="banner_fadeBottom" />
    </div>
  );
}

export default Banner;