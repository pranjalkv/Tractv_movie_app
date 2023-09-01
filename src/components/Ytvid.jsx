import { useEffect, useState } from "react"
import "./Ytvid.css"
import ReactPlayer from 'react-player/youtube'
import axios from "axios"



function Ytvid({setClose,idvid,media})
{
     const API_KEY=import.meta.env.VITE_API_KEY
    const vidUrl=`https://api.themoviedb.org/3/${media}/${idvid}/videos?api_key=${API_KEY}`
    // const[close,setClose]=useState(false)
    const[vids,setVids]=useState([])

    useEffect(()=>{
        async function getVid()
        {
            const reqVid= await axios.get(vidUrl);
            onlyTrailer(reqVid.data.results)
            return(reqVid)
        }
        getVid();
    },[vidUrl])


    function onlyTrailer(vidf)
    {
        let trailer=vidf.findIndex((obj)=>obj.name==="Official Trailer")
        let trailer1=vidf.findIndex((obj)=>obj.name==="Official Trailer 1")
    if(trailer!==-1)
    setVids(vidf[trailer]);
    else if( trailer1!==-1)
    setVids(vidf[trailer1]);
    else
    setVids(vidf[0])
    }

    function handleViderror(e)
    {
        e.target.url="https://www.youtube.com/watch?v=_Sa7PbyRrCs"
    }
    

    return(
        <>
            vids?.key &&<div className="yt-videos">
            <button className="close-vid" onClick={()=>setClose(false)}>Close</button>
            <div className="react-player">
         {vids?.key ? <ReactPlayer controls={true} 
          url={`https://www.youtube.com/watch?v=${vids?.key}`} width="100%" height="100%" onError={handleViderror}/>:
        <div className="on-error"><p>Sorry ,No video Available for particular item </p></div>}
        </div>
        </div>
        </>
    )
}
export default Ytvid