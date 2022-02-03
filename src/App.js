import React, {useState} from "react";

export default function SearchMovies(){
    
    //states- input query, movies
    const [query, setQuery] = useState('');
    //create the state for movies, and update that state appropriate
    const [movies, setMovies] = useState([]);
    
    const searchMovies = async (e) => {
        e.preventDefault();
                
        const url = `https://api.themoviedb.org/3/search/movie?api_key=5dcf7f28a88be0edc01bbbde06f024ab&language=en-US&query=${query}&page=1&include_adult=false`;
        
        try {
            const res = await fetch(url);
            const data  = await res.json();
            setMovies(data.results);
        }catch(err){
            console.error(err);
        }
    }
    
    return (
        <div className="bg-info">
            <div className="container bg-warning" style={{padding:"2rem"}}>
        <h1 className="title"  className="d-flex justify-content-center text-white bg-secondary">React Movie Search</h1>
        <nav className="navbar navbar-light" className="d-flex justify-content-center bg-secondary">
  <div className="container-fluid">
    <form className="d-flex" onSubmit={searchMovies}>
    <label className="label" htmlFor="query" className="flex" className="lead" style={{margin:"1rem"}}>Movie Name</label>
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" 
        value={query} onChange={(e) =>setQuery(e.target.value)} style={{margin:"1rem"}}
        />
      <button className="btn btn-outline-success" type="submit" style={{margin:"1rem"}}>Search</button>
    </form>
  </div>
</nav>
      </div>
      
            <div className="card-group d-flex justify-content-center">
                {movies.filter(movie => movie.poster_path).map(movie => (
                    
                    <div className="card-group m-2  d-flex justify-content-center" style={{width:"22rem",border:"4px solid black",borderRadius:"3.3%"}} key={movie.id}>
                        <img className="card-image-top w-100 p-1" style={{borderRadius:"5%"}}
                            src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                            alt={movie.title + ' poster'}
                            />
                        <div className="card-body">
                        <h3 className="card-title">{movie.title}</h3>
                        <p className="card-text">RELEASE DATE: {movie.release_date}</p>
                        <p className="card-text">RATING: {movie.vote_average}</p>
                        <p className="card-text">{movie.overview}</p>
                        </div>

                    </div>
                ))}
            </div>    
        </div>
    )
}