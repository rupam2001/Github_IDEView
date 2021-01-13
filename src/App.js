import Editor from "./components/editor";
import LeftPanel from "./components/leftPanel";
import MainContextProvider, { MainContext } from './contexts/mainContext'

import "./App.css"

import { Resizable, ResizableBox } from 'react-resizable';
import { useContext, useState } from "react";



function App() {

  const [baseUrl, setBaseUrl] = useState(null);
  const [load, setLoad] = useState(false);
  const [branch, setBranch] = useState("master")

  const [night, setNight] = useState(true)

  const mainContext = useContext(MainContext)



  return (

    <div className="App">
      <div className="app-header">

        <input value={baseUrl} onChange={(e) => { setBaseUrl(e.target.value) }} className="app-baseurl" placeholder="Public github repo Base url" />

        <input value={branch} onChange={(e) => { setBranch(e.target.value) }} />
        <button onClick={() => { setLoad(!load) }}>Go!</button>

        <i class="fa fa-moon" aria-hidden="true"
          onClick={() => {
            changeTheme(night);
            mainContext.setCurrentIDETheme(night ? "twilight" : "tomorrow")
            setNight(!night);

          }}
        ></i>

      </div>

      <div className="app-holder">

        <div className="app-lpanel">
          <LeftPanel baseUrl={baseUrl} load={load} branch={branch} />
        </div>

        <div className="app-editor">
          <Editor />
        </div>

      </div>
    </div>
  );
}

export default App;




const changeTheme = (night) => {
  if (night) {
    document.body.style.setProperty("--primary", "black");
    document.body.style.setProperty("--secondary", "grey");
    document.body.style.setProperty("--thirdary", "rgb(39, 38, 38)");

  } else {
    document.body.style.setProperty("--primary", "white");
    document.body.style.setProperty("--secondary", "black");
    document.body.style.setProperty("--thirdary", "rgb(243, 243, 243)");
  }
}
