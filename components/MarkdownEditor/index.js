import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import path from 'path'

const MarkdownPreview = dynamic(() => import('react-markdown'), {
  ssr: false
});
import css from './style.css';

function MarkdownEditor({ file, write }) {
  const [fileText, setFileText] = useState('')
  useEffect(() => {
    (async () => {
      setFileText(await file.text())
    })();
  }, [file])

  const onClick = (e) => {
    write(file, fileText)
  }
  const onChange = (e) => setFileText(e.target.value)

  console.log(file, write);
  return (
    <div className={css.editor}>
       <div className={css.title}> {path.basename(file.name)} </div>
      <textarea
          value={fileText}
          onChange={onChange}
          rows={10}
          style={{width: '100%'}}
      />
      <button onClick={onClick}>Save</button>
      <MarkdownPreview source={fileText} escapeHtml={false} />
    </div>
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
