
const API_KEY=import.meta.env.VITE_API_KEY

const list={
getBanner: `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`,
getNetflix: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213`,
getAction:`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`,
getComedy:`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`,
getDrama:`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=18`,
getHorror:`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27`,
getPrime:`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=1024`,
getTVdrama:`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=18&language=en-US&page=4&region=us&page=13`,
getTVaMystery:`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=9648`,
getTVCrime:`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=99`,

getBannerAnim:`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=16&page=2`,
getTVAnim:`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16`,
getAnim:`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=16`,
getJanime:`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&page=1&with_genres=16&with_keywords=210024|287501&include_adult=false&with_text_query=death`,

getTabmovie:`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`,
getTabtrend:`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=en-US`,
getTabtop:`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`,

getTabTv:`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=3&language=en-US&region=us`,
getTvTrend:`https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}&language=en-US&region=us`,
getTvRated:`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US`,

}

export default list;