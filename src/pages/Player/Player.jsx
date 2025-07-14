import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow from '../../assets/back_arrow.png' 
import { useParams, useNavigate } from 'react-router-dom' // Importing useParams to get the movie ID from the URL

const Player = () => {

  const {id} = useParams();

  const navigate = useNavigate(); // Importing useNavigate to navigate back to the home page

  const [apiData, setApiData] = useState({
    name:"",
    key:"",
    published_at:"",
    typeof:""
  });

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTliMGE0YjQzMGQ1MWE1MmZhOWNmMWZiOGIzYTQ0OCIsIm5iZiI6MTc1MTM3NjY4NC4wNTc5OTk4LCJzdWIiOiI2ODYzZTMyYzgxZWVkNTcwZGRlNjRhOTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7TayRsEf1XONb63XeaGySFjdN1ir4WjpKYEtBrSExI0'
  }
};

useEffect(()=> {
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results[0]))
  .catch(err => console.error(err));
},[])




  return (
    <div className='player'>
      <img src={back_arrow} alt="" onClick={()=>{navigate(-2)}}/>
      <iframe width= '90%' height='90%' 
      src={`https://www.youtube.com/embed/${apiData.key}`}
      title="trailer" frameBorder="0" allow="accelerometer;encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.typeof}</p>
      </div>
    </div>
  )
}

export default Player