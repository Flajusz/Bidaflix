import React  from 'react';
function Tag(props)
{
  let whichStyle=""

  if(props.isClicked)
  {
    whichStyle="tagButtonClicked"
  }
  else
  {
    whichStyle="tagButton"
  }
  return(
    <button className={whichStyle} onClick={props.onClick}>{"#"+props.name}</button>
  )
}
export default Tag