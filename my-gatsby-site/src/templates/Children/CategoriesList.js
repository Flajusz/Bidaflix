import Category from'./Category'
import React from 'react';
import'../Styles/Categories.scss'
function CategoriesList(props) { 

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
      <div className="catsPlace">
        {props.data.map((value)=>
        {           
          return(
            <Category
            name={value}
            onClick={() => props.onClick(value)}
            isClicked={checkIfActive(value)}            
            />          
          )        
        })}     
      </div>
    );
  }
export default CategoriesList