import React from 'react';
import MovieRow from '../components/MovieRow';

/** Pagina por default del home */
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      premiere: [],
      trending: [],
      moviesF: [],
      genres: [],
      error: false,
    };
  };
  // Fetch Genres
  fetchGenres() {
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=50b424b64d21faf2084d9831b493ed84&language=es-ES')
      .then(response => response.json())
      .then(json => this.setState({ genres: json.genres }));
  };
  // Fetch Premiere movies
  fetchPremiere(genres) {
    let url = 'https://api.themoviedb.org/3/discover/movie?api_key=50b424b64d21faf2084d9831b493ed84&language=es-ES&primary_release_year=2019';
    if (genres) {
      url += '&with_genres=' + genres;
    }
    return fetch(url);
  }
  // Fetch Trending movies
  fetchTrending(genres) {
    let url = 'https://api.themoviedb.org/3/discover/movie?api_key=50b424b64d21faf2084d9831b493ed84&language=es-ES&sort_by=popularity.desc';
    if (genres) {
      url += '&with_genres=' + genres;
    }
    return fetch(url);
  }
  // All together
  async componentDidMount(genres) {
    try {
      this.fetchPremiere(genres)
        .then(response => response.json())
        .then(json => this.setState({ premiere: json.results.slice(0, 12) }))
      this.fetchTrending(genres)
        .then(response => response.json())
        .then(json => this.setState({ trending: json.results.slice(0, 6) }))
      this.setState({ loading: false, error: false });
    } catch (e) {
      this.setState({ loading: false, error: true })
    }
  }
  // Calling genres
  componentWillMount() {
    this.fetchGenres();
  };
  // filter movies
  changeGenre(genres) {
    console.log(genres);
    this.componentDidMount(genres);
  }
  // Render
  render() {
    const { premiere, trending, loading, error } = this.state;
    return (
      <div className='Home'>
        <div className='container-flex'>
          <div className='col-12 anchor' id='estrenos'>
            <h1 align="center">Estrenos</h1>
            <div className='row'>
              <div className='col-12 text-left'>
              </div>
              {!loading && premiere.map(movie => <MovieRow movie={movie} key={movie.id} />)}
              {loading && <div className='col-12 text-center'> <p>Cargando información...</p> </div>}
              {!loading && !error && !premiere.length && <div className='col-12 text-center'> <h2>No hay información disponible.</h2></div>}
              {!loading && error && <div className='col-12 text-center'> <h2>Ocurrió un error.</h2></div>}
            </div>
          </div>
          <div className='col-12 anchor' id='populares'>
            <h1 align="center">Películas más populares</h1>
            <div className='row'>
              {!loading && trending.map(movie => <MovieRow movie={movie} key={movie.id} />)}
              {loading && <div className='col-12 text-center'> <p>Cargando información...</p> </div>}
              {!loading && !error && !trending.length && <div className='col-12 text-center'><h2>No hay información disponible.</h2> </div>}
              {!loading && error && <div className='col-12 text-center'> <h2>Ocurrió un error.</h2> </div>}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
