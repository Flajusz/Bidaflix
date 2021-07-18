import React from 'react';
function Category(props)
{ 
  let whichStyle=""

  if(props.isClicked)
  {
    whichStyle="catButtonClicked"
  }
  else
  {
    whichStyle="catButton"
  } 

  return(
    <button className={whichStyle} onClick={props.onClick}>{props.name}</button>
  )
}
export default Category