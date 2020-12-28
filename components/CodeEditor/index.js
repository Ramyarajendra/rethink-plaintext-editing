import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import path from 'path'
const AceEditor = dynamic(() => import('react-ace'), { ssr: false })
import css from './style.css'
dynamic(() => import('ace-builds/src-noconflict/mode-javascript'), { ssr: false })
dynamic(() => import('ace-builds/src-noconflict/theme-github'), { ssr: false })


const CodeEditor = ({file, write}) => {
    const [fileText, setFileText] = useState('')
    useEffect(() => {
        (async () => {
        setFileText(await file.text())
        })();
    }, [file])

    const onChange = (newVal) => setFileText(newVal)
    const onClick = (e) => {
        write(file, fileText)
      }
    return (
        <div className={css.editor}>
        <div className={css.title}> {path.basename(file.name)} </div>
        <AceEditor
            style={{border: '1px solid #000'}}
            value={fileText}
            mode="javascript"
            theme="github"
            onChange={onChange}
            highlightActiveLine={true}
            setOptions={{
                enableBasicAutocompletion : true,
                enableLiveAutocompletion: true
                }}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
        />
        <button onClick={onClick}>Save</button>
        </div>
    )
}

export default CodeEditor