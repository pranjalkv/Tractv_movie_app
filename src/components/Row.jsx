import { useEffect, useRef, useState} from "react";
import "./Row.css"
import {FaChevronLeft, FaChevronRight,FaPlay} from 'react-icons/fa';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Errormsg from "./Errormsg";


function Row({title,fetch,isOrignal})
{
    const slider=useRef(null)
    const navigateRow=useNavigate();

    const[film,setFilm]=useState([])
    const [scrollEnd, setscrollEnd] = useState(false);
    const[scroller,setScroller]=useState(0)   
    const[hover,setHover]=useState(false);

    const [hasError,setHasError]=useState(false);


    const[rowHover,setRowhover]=useState(-1);
  
      const actions = (shift) => {
    slider.current.scrollLeft += shift;
    setScroller(scroller + shift);
  };

      const scrollCheck = () => {
    setScroller(slider.current.scrollLeft);
    if (Math.floor(slider.current.scrollWidth - slider.current.scrollLeft) <=slider.current.offsetWidth)
      {
      setscrollEnd(true);
    } 
    else 
    {
      setscrollEnd(false);
    }
  };

    function timecut(string)
    {
        return string?.slice(0,4)
    }

    function topercent(value)
   {
   return (value*10).toFixed(2)
    }

   function allInfo(e)
   {
    e.stopPropagation()

    navigateRow(`/search/${e.target.slot}/${e.target.id}`)
   }



  useEffect(()=>{
    async function fetchdata()
    {
      try
    {
            const request=await axios.get(fetch)
            setFilm(request.data.results)
        return request;
        }
        catch(err)
        {
             setHasError(true);
        }
      }
  
        fetchdata();
  },[fetch])

 if (hasError) 
 return <Errormsg />

    return(

<section className="rows" key={title}>
        <p>{title}</p>
        <div className="all-items"  ref={slider} onScroll={scrollCheck} onMouseEnter={() => setHover(true) }
        onMouseLeave={() => setHover(false)}>
            {film.map((ele)=>((isOrignal && ele.poster_path)||(!isOrignal && ele.backdrop_path))&& 
            (<div>
              <div  key ={ele?.id} className={`${isOrignal ? "items-poster":"items-flat"}`} 
            style={{
                backgroundImage:`url("https://image.tmdb.org/t/p/original${isOrignal?ele.poster_path:ele.backdrop_path}")`,
                backgroundPosition:"center center",
                backgroundSize:"cover"
            }}  
            onMouseEnter={()=>setRowhover(ele.id)} onMouseLeave={()=>setRowhover(-1)} 
            slot={ele?.title ? "movie" :"tv"} id={ele?.id} onClick={allInfo} > 

              <div className={` ${rowHover===ele.id ? "div-abs":"hider"}`}>
              <p>{ele?.title || ele?.name}</p>
              <button><FaPlay/></button>
              <div className="row-nums">
              <p>⭐{topercent(ele?.vote_average)}%</p>
              <p>{timecut(ele?.first_air_date || ele?.release_date)}</p>
            </div> 
            </div>
            </div>
            {!isOrignal && <p className="mobile-title">{ele?.name || ele?.title}</p>}
            </div>))}
        </div>
        {film.length > 4 && <div>
          {scroller!==0 &&(<button className={`shifters arrows-left ${!hover?"show":""}`} key="left" onClick={()=>{actions(-500)}} onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}>
            <FaChevronLeft size={40} className="arrow-icon"  />
            </button>)}
        {!scrollEnd &&(<button className={`shifters arrows-right ${!hover?"show":""}`} key="right"onClick={()=>{actions(+500)}} onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}>
            <FaChevronRight size={40} className="arrow-icon" />
        </button>)}
        </div>}
        </section>
    )
}

export default Row