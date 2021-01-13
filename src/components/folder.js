import React, { useContext, useState } from 'react';
import { MainContext } from '../contexts/mainContext';


export default function Folder({ _nodeData }) {

    const [nodeData, setNodeData] = useState(_nodeData);

    const [tree, setTree] = useState([])

    const mainContext = useContext(MainContext)

    const [isOpen, setIsOpen] = useState(false)

    const [loading, setLoading] = useState(false)

    const handleExpand = () => {

        setIsOpen(!isOpen);
        setLoading(true)
        fetchNextTreeAsync(_nodeData.url)
            .then(res => {
                if (res.tree) {
                    setTree(res.tree)
                }
                else if (res.content) {
                    const ext = nodeData.path.split(".")[nodeData.path.split(".").length - 1]
                    // alert(ext)
                    mainContext.setCurrentOpenExtention(ext)
                    mainContext.setCurrentEditorDataRaw(res.content)
                    mainContext.setCurrentOpenBlob(nodeData)

                }
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                setIsOpen(false)
            })
    }

    return (
        <div className="fl-main">
            <div className="fl-title" onClick={handleExpand}>

                {getIcon(nodeData, isOpen, mainContext.currentOpenBlob?.sha)}
                <p>{_nodeData.path}</p>
                {
                    loading &&
                    <p className="fl-loading">(loading..)</p>
                }
            </div>
            {
                isOpen &&
                <div className="fl-subs" >
                    {
                        tree.map(node => (
                            <Folder _nodeData={node} />
                        ))
                    }
                </div>
            }
        </div>
    )
}

const fetchNextTreeAsync = async (url) => {
    //formate it to api.github....                                     >>>>>>>>>>>>>>>pending
    const res = await fetch(url, { method: "GET", headers: { 'Content-Type': 'application/json' } }).then(response => response.json())
    return res
}

const getIcon = (data, isOpen, sha) => {

    if (data.type == 'tree') {

        if (isOpen)
            return (<i class="fa fa-folder-open" aria-hidden="true"></i>)

        return (<i class="fa fa-folder" aria-hidden="true"></i>)
    }
    if (data.type == 'blob') {

        if (isOpen && sha == data.sha)
            return (<i class="fa fa-file" aria-hidden="true" style={{ color: 'rgb(0, 140, 255)' }}></i>)

        return (
            <i class="fa fa-file" aria-hidden="true"></i>
        )
    }
}