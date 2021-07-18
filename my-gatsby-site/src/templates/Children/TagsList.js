import React from 'react';
import Tag from"./Tag"
import '../Styles/Tags.scss'

function TagsList(props) {

  function checkIfActive(value)
  {
    if(props.isClicked.includes(value))
    {       
      return true;        
    }
    else
    {
      return false;
    }
  }
      return (
        <div className="tagsPlace">
          {props.data.map((value)=>
          {
            return(
              <Tag
              name={value}
              onClick={() => props.onClick(value)} 
              isClicked={checkIfActive(value)}                             
              />          
            )        
          })}     
        </div>
      );
    }
  
  export default TagsList