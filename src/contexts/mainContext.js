import React, { useState } from 'react';


const MainContext = React.createContext(null)

const MainContextProvider = (props) => {

    const [currentEditorDataRaw, setCurrentEditorDataRaw] = useState(null)

    const [currentOpenBlob, setCurrentOpenBlob] = useState(null)

    const [currentOpenExtention, setCurrentOpenExtention] = useState("plain")

    const clear = () => {
        setCurrentEditorDataRaw(null)
        setCurrentOpenBlob(null)
    }

    return (
        <MainContext.Provider
            value={{
                currentEditorDataRaw, setCurrentEditorDataRaw,
                currentOpenBlob, setCurrentOpenBlob, clear,
                currentOpenExtention, setCurrentOpenExtention
            }}>
            {props.children}
        </MainContext.Provider>
    )
}
export default MainContextProvider


export { MainContext }