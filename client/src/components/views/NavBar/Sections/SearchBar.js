import React, { useState } from 'react';
import DropDown from './DropDown';

const SearchBar = ({keyword,setKeyword}) => {
  const BarStyling = {width:"10rem",background:"#F2F1F9", border:"none", padding:"0.5rem",
  display: "block", marginTop: "1em", marginBottom: "1em", marginLeft: "0", marginRight: "0", paddingLeft: "40px"};

  let suggestions = [];
  let display_suggestions = [];
  let listItems;
  let baseURL = 'https://api.themoviedb.org/3/';
  let configData = null;
  let baseImageURL = null;

  const [showResults, setShowResults] = React.useState(false);
  const [search,setSearch]=useState('');
    
  let getConfig = function (keyword) {
      let url = "".concat(baseURL, 'configuration?api_key=', '844dba0bfd8f3a4f3799f6130ef9e335'); 
      console.log('url is '+url)
      fetch(url)
      .then((result)=>{
          return result.json();
      })
      .then((data)=>{
          baseImageURL = data.images.secure_base_url;
          configData = data.images;
          console.log('config:', data);
          console.log('config fetched');
          runSearch(keyword)
      })
      .catch(function(err){
          alert(err);
      });
  }
  
  
  let runSearch = function (keyword) {
      if(keyword==null){
        // setShowResults(false);
        return;
      }
      let url = ''.concat(baseURL, 'search/movie?api_key=', '844dba0bfd8f3a4f3799f6130ef9e335', '&query=', keyword);
      console.log('search url is '+url)
      suggestions = [];
      display_suggestions = [];
      fetch(url)
      .then(result=>result.json())
      .then((data)=>{
          //process the returned data
          suggestions = data.results.map(function(result){
            return result.original_title;
          });
          display_suggestions = suggestions.slice(0,5);
          console.log(display_suggestions);
          console.log("From searchbar");
          //work with results array...          
          setShowResults(true);
      })
  }

  return (
    <div style={{display:'flex',flexdirection:'row'}}>

      <div style={{flex:1}}>
      <input 
      style={BarStyling}
      key="random1"
      value={search}
      placeholder={"Search for movies"}
      onChange={e => setSearch(e.target.value)}
      />  
      </div>
    
      <div style={{borderWidth:10,borderColor:'black',marginTop:24,}}>
      <a href={`/search/${search}`} >
       
            Search
        
        </a>
        </div>

   
    
    </div>

  );
}

export default SearchBar