import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaSearch } from 'react-icons/fa';
import MovieCard from './movieCard';
import './App.css';

const API_URL = 'http://www.omdbapi.com?apikey=262498df'
const movie1 =
  {
    "Title": "Italian Spiderman",
    "Year": "2007",
    "imdbID": "tt2705436",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZWQxMjcwNjItZjI0ZC00ZTc4LWIwMzItM2Q0YTZhNzI3NzdlXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_SX300.jpg"
}


const App =() =>{
  const [movies,setMovies] = useState([ ])
  const [search,setSearch] = useState(' ')
  
  const searchMovies = async (title) =>{
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json();
    setMovies(data.Search);
        }

  useEffect(()=>{
searchMovies('Spiderman')
  },[search])

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = () => {
    searchMovies(search);
  };
  return ( 
    <div className="App">
      <h1>MovieLand</h1>

      <div className='search'>
        <input
          placeholder='Search for movies'
          value={search}
          onChange={handleInputChange}
        />
        <FaSearch className='search-icon' onClick={handleSearchClick} />
      </div>

      {
        movies?.length > 0
        ? (
          <div className='container'>
          {movies.map((movie)=>(
            <MovieCard movie={movie}/>
          ))}
            </div>
        ):(
          <div className='empty'>
            <h2>No movies found</h2>
            </div>
        )
      }
     
    </div>
  );
}

export default App;
