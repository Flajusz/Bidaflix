import React  from 'react';
import Movie from "./Movie"
import'../Styles/Movies.scss'

function MoviesList(props)
{
  
  return(
    <div className="MoviesPlace">
      {props.data.map((value)=>
      {
        return(
          <Movie
          data={value}
          method={()=>props.method(value)}
          media={value.MediaFill.exampleType}
          />          
        )        
      })}     
      </div>
  )

}
export default MoviesList