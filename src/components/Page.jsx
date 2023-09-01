import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import {FaPlay}  from 'react-icons/fa';
import "./Page.css"
import Row from "./Row";
import axios from "axios";
import arLang from "./lang";
import Ytvid from "./Ytvid";

function Page()
{
    const API_KEY=import.meta.env.VITE_API_KEY
    const[vidopen,setVidopen]=useState(false)
    const{typeMed ,idapp}=useParams();
    const [filmresult, setFilmresult] = useState([])
    const [allcast ,setCast]=useState([])
    const [n,setN]=useState(250)


    const searchUrl=`https://api.themoviedb.org/3/${typeMed}/${idapp}?api_key=${API_KEY}`
    const getCast =`https://api.themoviedb.org/3/${typeMed}/${idapp}/credits?api_key=${API_KEY}`
    const getRowrec=`https://api.themoviedb.org/3/${typeMed}/${idapp}/recommendations?api_key=${API_KEY}`

     function changetv(media)
    {
        if(media ==="tv")
        {
            media="series";
        }
        return media;
    }

    function year(string)
    {
        return string?.slice(0,4)
    }

    var x=0;
    function cut(string,n)
    {
     x=string?.length;
     return string?.length>n ? string.slice(0,n-1)+"..." : string
    }

    function hrsMin(minutes)
    {
        let h=Math.floor(minutes/60);
        let m=minutes%60;
        let thrs= h>0 ? h+(h===1 ? "hr ":"hrs ") : "";
        let tmin= m>0? m+(m===1 ?"min " : "mins "):"";

        return thrs+tmin;
    }
    function numFromat(num) {
    if(num > 999 && num < 1000000)
    {
        return (num/1000).toFixed(1) + 'K'; 
    }
    else if(num >=1000000 && num<=999999999)
    {
        return (num/1000000).toFixed(1) + 'M'; 
    }
    else if(num >=1000000000)
    {
        return (num/1000000000).toFixed(1)+ 'B'
    }
    else if(num < 999 && num>0)
    {
        return num; // if value < 1000, nothing to do
    }
    else 
    {
        return " -/-"
    }
}

function topercent(value)
{
   return (value*10).toFixed(2)
}
    useEffect(()=>{
        async function fetchSearch()
        {
            const req=await axios.get(searchUrl)
            const reqCast=await axios.get(getCast)
            setFilmresult(req.data)
            setN(250)
            setVidopen(false)
            setCast(reqCast.data.cast.slice(0,7))

            return (req ,reqCast)
        }

        window.scrollTo(0,0);
        fetchSearch();
    },[searchUrl])


    function changeLang(lang)
    {
        for(let i=0;i<arLang.length;i++)
        {
            if(arLang[i].iso_639_1===lang)
            {
                lang=arLang[i].english_name;
            }
        }
        return lang
    }

    function handelError(e)
    {
        e.target.src="/images/noposter.jpg"
    }
    return(
        <>
        <section id="search" onClick={()=>console.log("hello Page")}>
           <img className="search-img" 
            src="/images/back2.jpg" alt="" />
            <div className="overlay"></div>
        <div className="page-result">
            <div className="poster-left">
                {filmresult?.poster_path ?<img  className="img-poster" 
                src={`https://image.tmdb.org/t/p/original${filmresult?.poster_path}`}  onError={handelError}/>:
                <img  className="img-poster" 
                src="/images/noposter.jpg" alt="fsag" />}
            </div>
            <div className="info-right">
                <p className="movie-name">{filmresult?.title || filmresult?.name}</p>
                  <div>
                    {filmresult["genres"]?.map((ele,i)=><p className="movie-genre-search" key={i}><span>{ele.name}</span></p>)} 
                </div>
         
                <div className="num-info">
                <p style={{fontWeight:"600",textTransform:"capitalize"}}>{changetv(typeMed)}
                <span className="lang-span"> ({changeLang(filmresult?.original_language)})</span></p>
                {typeMed==="movie"?<p >{year(filmresult?.release_date)}</p>:<p>Started {year(filmresult?.first_air_date)}</p>}
                {typeMed==="movie" ? <p>{hrsMin(filmresult?.runtime)}</p>:<p style={{textTransform:"capitalize"}}>{filmresult?.status}</p>}
                </div>

              
                

                <div className="vote">
                    <p>⭐{topercent(filmresult?.vote_average)}%</p>
                     <p>Total Votes:&nbsp;<span style={{fontWeight:600,color:"var(--yellow)"}}>{numFromat(filmresult?.vote_count)}</span></p>
                </div>

                <p className="search-desc">{cut(filmresult?.overview,n)}
                 {x>250 &&<button className="read-more"  
                 onClick={()=>{setN(n=>n+2000)}}>{n>250 ? "" :"Read More"}</button>}
                </p>

                {(typeMed==="movie" && filmresult?.budget>0) &&<div className="money">
                  
                    <p className="budget">Budget &nbsp; &nbsp; &nbsp;<span>${numFromat(filmresult?.budget)}</span></p>
                    {filmresult?.revenue>0 && <p className="collection">Collection <span>${numFromat(filmresult?.revenue)}</span></p>}
                </div>}

                    <div className="all-cast">Cast &nbsp;
                    {allcast?.map((ele,i)=><p className="comma" key={i}>{ele?.name}</p>)}
                    </div>
                     <div>
                        <button className="play-btn" onClick={()=>setVidopen(true)}><FaPlay className="play-icon"/>PLAY</button>
                    </div>  
                    {vidopen && <Ytvid close={vidopen}
                     idvid={filmresult?.id} media={filmresult?.name ? "tv":"movie"} setClose={setVidopen}></Ytvid>}
             </div>
        </div>
        </section>
        <hr className="line"/>
        <Row fetch={getRowrec} isOrignal></Row>
        </>
    )
}
export default Page;


