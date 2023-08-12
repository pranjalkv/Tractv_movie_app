import { useEffect, useState } from "react"
import "./Reclist.css"
import axios from "axios";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Errormsg from "./Errormsg";

function Reclist ({mood})
{
   
    const moodURL=`https://api.themoviedb.org/3/movie/${mood}/recommendations?${API_KEY}&page=2&language=en-US`;
    const navigateRec=useNavigate();
    const[reclist,setReclist]=useState([]);
    const[recHover,setRechover]=useState(-1);
    const[recErr,setRecerr]=useState(false);

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
    navigateRec(`/search/${e.target.slot}/${e.target.id}`)
   }

   function handelRecerror(e)
   {
    e.target.src="/images/noposter.jpg"
   }

    useEffect(()=>
    {
        async function fetchList()
        {
            try
        {
            const reqList=await axios.get(moodURL)
            setReclist(reqList.data.results)
            return(reqList)
        }
        catch(err)
        {
            setRecerr(true)
        }
    }
        fetchList();
    },[moodURL])

    if(recErr)
    return <Errormsg/>

    return(
        <>
        <div className="reclist-flex">
        {reclist?.map(ele=>(ele?.poster_path)&&<div style={{position:"relative"}} key={ele.id}>
        <img className="items-poster-rec" key={ele.id} src={`https://image.tmdb.org/t/p/original${ele?.poster_path}`}
         style=
        {{
                backgroundPosition:"center center",
                backgroundSize:"cover"}} 
                slot="movie" id={ele.id} 
                onMouseEnter={()=>setRechover(ele.id)} onMouseLeave={()=>setRechover(-1)} onClick={allInfo}
                 onError={handelRecerror} />   
                <div className={` ${recHover===ele.id ? "info-rec":"hide-rec"}`}>
                    <p>{ele?.title || ele?.name}</p>
                    <button><FaPlay/></button>
              <div className="row-nums">
              <p>⭐{topercent(ele.vote_average)}%</p>
              <p>{timecut(ele.first_air_date || ele?.release_date)}</p>
            </div> 
                </div>           
        </div>)}
        </div>
        </>
    )
}
export default Reclist