import { FaRegSmileBeam,FaRegFrownOpen,FaRegTired } from "react-icons/fa";
import "./Modal.css"
import { useState,useEffect,useRef } from "react";
import { Link,NavLink } from "react-router-dom";

function Modal()
{
    
    const mRef=useRef()
    const [openMood, setOpenmood]=useState(false)



      useEffect(() => {
    const checkOutside = e => {
      if (openMood && mRef.current && !mRef.current.contains(e.target))
      {
        setOpenmood(false)
      }
    }

    document.addEventListener("mousedown", checkOutside)

    return () => {
      document.removeEventListener("mousedown", checkOutside)
    }
  }, [openMood])

    return(
        <div id="mood">
            <button className="btn-mood" 
            onClick={(e)=>{e.stopPropagation()
              setOpenmood(!openMood)}}>Mood</button>
            {openMood && <div className="screen-reaction">
            <div className="reactions" ref={mRef}>
                <p>How are you feeling today?</p>
                 <div className="emoji-reactions">
                  <Link to="/recommend-happy-list" onClick={()=>setOpenmood(false)}>
                    <div className="emojis">
                    <h3><FaRegSmileBeam/></h3>
                    <p>Happy</p>
                    </div>
                    </Link>
                    <NavLink to="/recommend-tired-list" onClick={()=>setOpenmood(false)}>
                      <div className="emojis">
                   <h3><FaRegTired/></h3>
                    <p>Tired</p>
                    </div>
                    </NavLink> 
                    <NavLink to="/recommend-sad-list" onClick={()=>setOpenmood(false)}>
                      <div className="emojis">
                    <h3><FaRegFrownOpen/></h3>
                    <p>Sad</p>
                    </div></NavLink>   
                </div>
                <div style={{width:"100%"}}>
                <button className="close-mood" onClick={()=>setOpenmood(false)}>Close</button>
                </div>
                </div>
            </div>}
        </div>
    )
}

export default Modal;