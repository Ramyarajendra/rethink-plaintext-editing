import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CKEditor from 'react-ckeditor-component';
import css from './style.css';
import path from 'path';
function PlaintextEditor({ file, write }) {
  const [fileText, setFileText] = useState('')
  const onClick = (e) => {
    write(file, fileText)
  }
  useEffect(() => {
    (async () => {
      //  if(!localStorage.getItem(file.name)){
        setFileText(await file.text())
      //   localStorage.setItem(file.name, fileText)
      //  }
      //  else{
      //    setFileText(localStorage.getItem(file.name))
      //  }
    })();
  }, [file])

  const onChange = ({ editor }) => setFileText(editor.getData())

  return (
    <div className={css.editor}>
      <div className={css.title}> {path.basename(file.name)} </div>
      <CKEditor
        content={fileText}
        events={{
          change: onChange
        }}
      />
      <button onClick={onClick}>Save</button>
    </div>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
