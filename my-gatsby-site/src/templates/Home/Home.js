import { graphql,useStaticQuery} from "gatsby";
import React,{useState,useEffect} from 'react';
import CategoriesList from "../Children/CategoriesList"
import TagsList from "../Children/TagsList"
import MoviesList from "../Children/MoviesList"
import './index.scss';
import'../Styles/Carousel.scss'
import magnifierImage from "./search.png"


const Home = ({ 
}) => {
  const data= useStaticQuery(graphql`
  query MyQuery {
    umbracoData {
      CategoriesList
      TagsList
      MoviesList {
        Title
        PublishDate
        Description
        Category
        MovieTags
        MediaFill {
          Urls
          exampleType
        }
      }
    }
  }
  `)

  const [properties, setProperties] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [apiLoading, setApiLoading] = useState(true);
  const [filter, setFilter]=useState(
    {
      Category:[],
      Tag:"",
      Name:""        
    })

    useEffect(async() => {
      setApiLoading(true);       
       setProperties(data.umbracoData);
       setFilteredData(data.umbracoData.MoviesList);             
       setApiLoading(false);
      }, []);
      
      const searchByTag=(tag) =>
      {        
        if(filter.Tag==tag)
        {
          setFilter({...
            filter,Tag:""
            });
            FilterMovies(filter.Name,"",filter.Category)                          
        }
        else
        {
          setFilter({...
            filter,Tag:tag
            }); 
            FilterMovies(filter.Name, tag,filter.Category)  
        }         
      }

      const searchByCat=(categorie)=>
      {        
        let categoriesFilter=filter.Category;         
        let isInFilter=false;    
        if(categoriesFilter.length==0)
          {
            categoriesFilter.push(categorie);
          }
        else{
            for(let i=0; i<categoriesFilter.length;i++){
              if(categoriesFilter[i]===categorie){           
                isInFilter=true;
                categoriesFilter.splice(i,1);
              } 
          }
          if(!isInFilter){
            categoriesFilter.push(categorie);
          }        
        }   
        setFilter({...
          filter,Category:categoriesFilter
          });
          FilterMovies(filter.Name,filter.Tag,categoriesFilter)
      }

      const handleSearch=(event)=>
      {
        let value = event.target.value;        
        setFilter({...
          filter,Name:value
          });          
          FilterMovies(value,filter.Tag,filter.Category)
      }

      function FilterMovies(inputValue,tagValue,categoryValue)
      {
        let inputResult = []; 
        inputResult=properties.MoviesList.filter((filterData)=>
        {      
          return filterData.Title.search(inputValue) !==-1;
        });     
        if(inputValue==="")
        {    
          inputResult=properties.MoviesList;         
        }
        let tagResult=[];        
        if(tagValue=="")
        {
          tagResult=properties.MoviesList;
        }
        else
        {
          tagResult=properties.MoviesList.filter((filterData)=>filterData.MovieTags.includes(tagValue));
        }
         
        let helper=[];
        let categoryResult=[];

        if(categoryValue.length>0){
          for(let i=0; i<categoryValue.length;i++){
          helper =properties.MoviesList.filter((data)=>data.Category.includes(categoryValue[i]));      
          for(let j=0;j<helper.length;j++)
          {       
            categoryResult=categoryResult.concat(helper[j])       
          }     
        }}
        else
        {
          categoryResult=properties.MoviesList;
        } 

        let finalResult=[]
        for (let index = 0; index < properties.MoviesList.length; index++) {         
          if(
            inputResult.includes(properties.MoviesList[index]) &&
            tagResult.includes(properties.MoviesList[index]) &&
            categoryResult.includes(properties.MoviesList[index])
          )
          {
            finalResult=finalResult.concat(properties.MoviesList[index])
          }
        }
        setFilteredData(finalResult)        
      }
      const selectMedia=((value)=>
      {                 
        switch(value.MediaFill.exampleType)
        {
          case 0 :
            {
              return<img src={`https://umbracoapp.azurewebsites.net${value.MediaFill.Urls[0]}`}/>
            }
          case 1 :
            { 
              return(
              <div style={{height:"100%"}}>
                <section class="carousel" aria-label="Gallery">
                  <ol class="carousel__viewport">
                    {value.MediaFill.Urls.map((value,x)=>
                    {
                      return(
                        <li id={`carousel__slide${x}`}
                        tabindex="0"
                        class="carousel__slide"
                        >
                        <div class="carousel__snapper">                        
                      </div>
                      <img src={`https://umbracoapp.azurewebsites.net${value}`}/>
                        </li>                        
                      )
                    })}
                  </ol>
                </section>
              </div>
              )
            }
          case 2:
            {
              return<iframe src={value.MediaFill.Urls[0]} />
            }
          case 3 :
            {
              return <iframe src={`https://umbracoapp.azurewebsites.net${value.MediaFill.Urls[0]}`} controls="false" />
            }
            default :
            {
              break;
            }
        }
      })

  if(apiLoading)
  {
    return(
      <>Loading</>
    )
  }

  return (
    <div>
        <div className="logo">  
         <b>BIEDAFLIX</b>       
         </div>
        <input type="text" className="customInput" placeholder="Search.." onChange={(event) =>handleSearch(event)} ></input>
        <button className="search-button">
          <img src={magnifierImage} />
        </button> 
      <CategoriesList
      data={properties.CategoriesList}
      onClick={(name)=>searchByCat(name)}
      isClicked={filter.Category}
      />
      <TagsList
      data={properties.TagsList}      
      onClick={(name)=>searchByTag(name)}      
      isClicked={filter.Tag} 
      />
      <MoviesList
      data={filteredData}
      method={(value=>selectMedia(value))}
      />
    </div>
  );
};
export default Home;
