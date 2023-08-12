import './App.css';
import Navbar from './components/Navbar';
import list from './components/data';
import Error from './components/Error';
import Loading from './components/Loading';
import Front from './components/Front';

import { Routes,Route } from 'react-router-dom';
import { Suspense, lazy } from 'react'
import Footer from './components/Footer';

const Reclist = lazy(()=>loadMood(import('./components/Reclist')))
const Page=lazy(()=>loadPage(import('./components/Page')))
const Row =lazy(()=>loadRow(import('./components/Row')))
function App() {

   let happy=[597,1010581,1016121,2105,10528,88751,253412];
   let tired=[752623,335787,361743,5174,447365,157336,137113];
   let sad=[12133,8363,57214,502356,868759,76493,10201]

   let rN=Math.floor(Math.random() *7);
  return (
    <>
    
    <Navbar></Navbar>
    <Routes>
      <Route path="/" element={
        <>
        
         <Front fetchBanner={list.getBanner}></Front>
         <Suspense fallback={<Loading />} >
    <Row title="Netflix Orignals"  fetch={list.getNetflix} isOrignal></Row>
    <Row title="Action Movies"  fetch={list.getAction}></Row>
    <Row title="Comedy Movies"   fetch={list.getComedy}></Row>
    <Row title="Horror Movies"   fetch={list.getHorror}></Row>
    <Row title="Prime Amazon Originals"  fetch={list.getPrime} isOrignal></Row>
    <Row title="Drama Series"  fetch={list.getTVdrama}></Row>
    <Row title="Mystery Series"  fetch={list.getTVaMystery}></Row>
    </Suspense>
        </>}>
      </Route>

        <Route path="/animated" element={<>
      <Front fetchBanner={list.getBannerAnim} def_type="movie"></Front>
      <Row title ="Animated TV Shows"  fetch={list.getTVAnim} isOrignal></Row>
      <Row title ="Anime"  fetch={list.getJanime} ></Row>
      <Row title ="Animated Movies"  fetch={list.getAnim} ></Row>
      </>}>
      </Route>

      <Route path="/movies" element={
      <>
      <Front fetchBanner={list.getTabmovie} def_type="Movie"></Front>
      <Row title="Trending Now"  fetch={list.getTabtrend} isOrignal></Row>
      <Row title="Top Rated"  fetch={list.getTabtop}></Row>
      </>}>
      </Route>

      <Route path="/series" element={<>
      <Front fetchBanner={list.getTabTv} def_type="tv"></Front>
      <Row title="Trending Now"  fetch={list.getTvTrend} isOrignal></Row>
      <Row title="Top Rated"  fetch={list.getTvRated}></Row>
        </>}></Route>


        <Route path="/recommend-happy-list" element={<><Suspense fallback={<Loading/>}>
        <p className="app-rec-para">Here are few options that will make you even <span className='app-mood-color'>more Happier</span></p>
        <Reclist mood={happy[rN]}></Reclist>
        </Suspense></>}>
        </Route>


         <Route path="/recommend-tired-list" element={<><Suspense fallback={<Loading/>}>
        <p className="app-rec-para">Here are few options to make you <span className='app-mood-color'>feel relaxed</span></p>
        <Reclist mood={tired[rN]}></Reclist>
        </Suspense></>}></Route>

        <Route path="/recommend-sad-list" element={<><Suspense fallback={<Loading/>}>
        <p className="app-rec-para">Here are few options to <span className='app-mood-color'>cheer up</span> your mood</p>
        <Reclist mood={sad[rN]}></Reclist>
        </Suspense></>}></Route> 
         
        <Route path="/search/:typeMed/:idapp" element={<Suspense fallback={<Loading/>}><Page/></Suspense>}></Route>
        <Route path="*" element={<Error />}></Route>
    </Routes>

    <Footer></Footer>
    </>
  )
}
async function loadMood(promise) {
  return new Promise(resolve => {
    setTimeout(resolve, 5000);
  }).then(() => promise);
}

loadRow

async function loadPage(promise) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  }).then(() => promise);
}

async function loadRow(promise) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  }).then(() => promise);
}



export default App;
