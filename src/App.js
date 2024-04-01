import React, {useState} from "react";
import "./App.css";

const data = [
  {
    name: "deepfake",
    url: ["https://www.google.com/"]
  }
]

function App(){

  const [lists, setLists] = useState(data);

  const openTabs = (url) => {
    for(const link of url){
      window.open(link, " _blank")
    }
  }

  return(
    <div className="App">
      <h3>Final Year Project</h3>
      <div className="lists">
        {lists && lists.map((item) =>{
          return(
            <button className="button" onClick={() => {openTabs(item.url)}}>{item.name}</button>
          )
        })}
       
      </div>
    </div>
  );
}

export default App;