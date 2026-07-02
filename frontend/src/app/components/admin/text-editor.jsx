import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const TextEditor = ({ placeholder,value ,changeHandler,defaultValue }) => {
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || 'Start typings...'
    }),
    [placeholder]
  );

  return (
    <JoditEditor
      defaultValue={defaultValue}
      ref={editor}
      value={value}
      config={config}
      tabIndex={1} // tabIndex of textarea
    
      onChange={(data)=> changeHandler(data)}
    />
  );
};

export default TextEditor;