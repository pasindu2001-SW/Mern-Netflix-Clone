import React, { use, useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'


const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);  // setting data for our state variable

  const cardsRef = useRef();

  const options = {            // Imported the movie details from TMDB API
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTliMGE0YjQzMGQ1MWE1MmZhOWNmMWZiOGIzYTQ0OCIsIm5iZiI6MTc1MTM3NjY4NC4wNTc5OTk4LCJzdWIiOiI2ODYzZTMyYzgxZWVkNTcwZGRlNjRhOTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7TayRsEf1XONb63XeaGySFjdN1ir4WjpKYEtBrSExI0'
  }
};



const handleWheel = (event) => {
  event.preventDefault(); // Prevent the default scrolling behavior
  cardsRef.current.scrollLeft += event.deltaY; // Scroll horizontally based on the vertical scroll delta
}

useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)   //if passing the category it will that category if we are not passing category then will it display nowplaying 
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));


  cardsRef.current.addEventListener('wheel', handleWheel);
},[])


  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2> 
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" /> 
             {/* Using backdrop_path to get the image */}
            <p>{card.original_title}</p>                                               
             { /* Using original_title to get the title of the movie */}
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards;