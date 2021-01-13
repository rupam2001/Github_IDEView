import React, { useState } from 'react';


const MainContext = React.createContext(null)

const MainContextProvider = (props) => {

    const [currentEditorDataRaw, setCurrentEditorDataRaw] = useState(null)

    const [currentOpenBlob, setCurrentOpenBlob] = useState(null)

    const [currentOpenExtention, setCurrentOpenExtention] = useState("plain")

    const [currentIDETheme, setCurrentIDETheme] = useState('tomorrow')

    const clear = () => {
        setCurrentEditorDataRaw(null)
        setCurrentOpenBlob(null)
    }

    return (
        <MainContext.Provider
            value={{
                currentEditorDataRaw, setCurrentEditorDataRaw,
                currentOpenBlob, setCurrentOpenBlob, clear,
                currentOpenExtention, setCurrentOpenExtention,
                currentIDETheme, setCurrentIDETheme
            }}>
            {props.children}
        </MainContext.Provider>
    )
}
export default MainContextProvider


export { MainContext }