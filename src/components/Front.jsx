import { useEffect, useState } from "react";
import "./Front.css"
import {FaPlay} from 'react-icons/fa';
import axios from "axios";
import genreAr from "./Genre";
import { useNavigate } from "react-router-dom";
import Errormsg from "./Errormsg";



function Front({fetchBanner ,def_type})
{ 
    const frontNavigate=useNavigate()
    const [movie,newMovie]=useState([]);
    const [hasErr,setHasErr]=useState(false);

    useEffect(()=>{
        async function fetch()
        {
        try
        {
            const request=await axios.get(fetchBanner)
            newMovie(request.data.results[Math.floor(Math.random()*request.data.results.length-1)
            ]
        )
        return request;
        }
        catch(err)
        {
             setHasErr(true);
        }
    }
        fetch();
    },[fetchBanner])

    if(hasErr)
    return <Errormsg />

    function cut(string,n)
    {
        return string?.length>n ? string.slice(0,n-1)+"..." : string
    }
    function timecut(string)
    {
        return string?.slice(0,4)
    }
    function getGen(genId)
    {
        for(let i=0;i<genreAr.length;i++)
        {
            if(genreAr[i].id===genId)
            {
                return genreAr[i].name
            }
        }
            return "";
    }
    function changetv(media)
    {
        if(media ==="tv")
        {
            media="series";
        }
        return media;
    }

    function openFront(e)
    {
        e.stopPropagation()
        frontNavigate(`/search/${e.target.slot}/${e.target.id}`)
    }

    return(
        <section className="front-app">
          {movie?.backdrop_path && <div className="cover"
        style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
            backgroundSize: "cover",
            backgroundPositionX: "center",
            backgroundRepeat: "no-repeat"
        }}>
        <div className="content-api">
            <p className="movie-name">{movie?.title || movie?.name}</p>
            <p className="movie-des">{cut(`${movie?.overview}
`,150)}</p>
                <div className="time-date">
                    {movie?.release_date && <p>{timecut(`${movie?.release_date}`)}</p>}
                    {movie?.first_air_date && <p>Since {timecut(`${movie?.first_air_date}`)}</p>}
                    <p>•</p>
                    <p className="media-type">{changetv(movie?.media_type || def_type)}</p>
            </div>
           <p className="movie-genre"><span>{getGen(movie?.genre_ids[0])} </span> 
           <span>{getGen(movie?.genre_ids[1])} </span>
           <span>{getGen(movie?.genre_ids[2])}</span></p>
            <div>
            <button className="play-btn" id={movie?.id} slot={movie?.name ? "tv" : "movie"} 
            onClick={openFront} ><FaPlay className="play-icon"/>Play</button>
            </div>
        </div>
        
        <div className="grandient-color"></div>
        </div>}
        {!movie?.backdrop_path &&<div className="cover"
        style={{
            backgroundImage: "url(images/default.jpg)",
            backgroundSize: "cover",
            backgroundPositionX: "center",
            backgroundRepeat: "no-repeat"
        }}>
        <div className="content-api-error">
            <p  className="movie-name">Welcome to tractv..</p>
            <p  className="movie-des">Try the tractv mood selector by clicking at top right corner
             <span style={{fontWeight:"600"}}> 'Mood'</span> button</p>
            <div  className="time-date">
                <p>Website • 2023 • Pranjal Kumar</p>
            </div>
        </div>
        </div>}
        </section>
    )
}

export default Front