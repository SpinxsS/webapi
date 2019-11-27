import React,{Component} from 'react';
// Movie card component
class MovieRow extends React.Component {
    render(){
        return(
            <div className="col-xs-6 col-sm-4 col-md-2 col-lg-2 col-xl-2 float-left text-center movierow" key={this.props.movie.id}>
               
                <img className="img-thumbnail thumb" alt="poster" src={`https://image.tmdb.org/t/p/w500${this.props.movie.poster_path}`}/>
                <h5> {this.props.movie.title}</h5>
                
            </div>
        )
    };
}
export default MovieRow;