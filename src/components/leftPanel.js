import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../contexts/mainContext';

import "../styles/leftpanel.css"
import Folder from './folder';



export default function LeftPanel({ load, baseUrl, branch }) {

    const [tree, setTree] = useState([])
    const mainContext = useContext(MainContext)

    const getRoot = () => {
        fetchRootTreeAsync(baseUrl, branch)
            .then(res => {
                if (res.tree) {
                    setTree(res.tree)
                }
            })
            .catch(err => {
                alert("Something went wrong:(")
            })
    }

    useEffect(() => {
        if (!baseUrl) return
        mainContext.clear()
        setTree([])
        getRoot();
    }, [load])


    return (
        <div className="lp-main">
            {
                tree.map(node => (
                    <Folder _nodeData={node} />
                ))
            }
        </div>
    )
}


const fetchRootTreeAsync = async (url, branch = "master") => {
    //formate it to api.github....   
    const routes = url.split("/")
    const len = routes.length
    const userName = routes[len - 2]
    const repo = routes[len - 1]

    const finalUrl = `https://api.github.com/repos/${userName}/${repo}/git/trees/${branch}`




    const res = await fetch(finalUrl, { method: "GET", headers: { 'Content-Type': 'application/json' } }).then(response => response.json())
    return res
}