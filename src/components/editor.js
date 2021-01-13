import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../contexts/mainContext';
import "../styles/editor.css"


import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/mode-java"
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/mode-c_cpp"
import "ace-builds/src-noconflict/mode-golang"
import "ace-builds/src-noconflict/mode-yaml"
import "ace-builds/src-noconflict/mode-tsx"
import "ace-builds/src-noconflict/mode-html"
import "ace-builds/src-noconflict/mode-php"
import "ace-builds/src-noconflict/mode-ruby"
import "ace-builds/src-noconflict/mode-rust"
import "ace-builds/src-noconflict/mode-sql"
import "ace-builds/src-noconflict/mode-css"
import "ace-builds/src-noconflict/mode-sass"




import "ace-builds/src-noconflict/theme-github"
import "ace-builds/src-noconflict/theme-ambiance"
import "ace-builds/src-noconflict/theme-solarized_dark"
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-terminal"
import "ace-builds/src-noconflict/theme-tomorrow"

export default function Editor() {


    const mainContext = useContext(MainContext)

    const [text, setText] = useState(null)

    const [mode, setMode] = useState("")



    useEffect(() => {
        if (!mainContext.currentEditorDataRaw) {
            setText(null)
            return
        }
        const raw = mainContext.currentEditorDataRaw
        let decoded = atob(raw)

        if (mainContext.currentOpenExtention in { "png": 1, "jpg": 1 }) {
            decoded = raw
        }

        setText(decoded)

        setMode(extentionToMode(mainContext.currentOpenExtention))

    }, [mainContext.currentEditorDataRaw])



    return (
        <div className="ed-main">
            <AceEditor
                mode={mode}
                theme="tomorrow"
                value={text}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
                style={{
                    height: '100%',
                    width: '100%'
                }}
                showGutter={true}
                highlightActiveLine={true}
                height={"100%"}
            />
        </div>
    )
}


const extentionToMode = (ext) => {
    switch (ext) {
        case "js":
            return "javascript"
        case "py":
            return "python"
        case "ts":
            return "typescript"


        default:
            return ext

    }
}