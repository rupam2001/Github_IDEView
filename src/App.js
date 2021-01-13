import Editor from "./components/editor";
import LeftPanel from "./components/leftPanel";
import MainContextProvider from './contexts/mainContext'

import "./App.css"

import { Resizable, ResizableBox } from 'react-resizable';
import { useState } from "react";



function App() {

  const [baseUrl, setBaseUrl] = useState(null);
  const [load, setLoad] = useState(false);
  const [branch, setBranch] = useState("master")

  return (
    <MainContextProvider>
      <div className="App">
        <div>
          <input value={baseUrl} onChange={(e) => { setBaseUrl(e.target.value) }} className="app-baseurl" placeholder="Public github repo Base url" />
          <input value={branch} onChange={(e) => { setBranch(e.target.value) }} />
          <button onClick={() => { setLoad(!load) }}>Go!</button>
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
    </MainContextProvider>
  );
}

export default App;
