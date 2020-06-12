import React, { useState, useMemo } from 'react';
import { render } from 'react-dom';
import HeroEditor, { bold, italic, underline } from './lib';

const App = () => {
  const plugins = useMemo(() => [bold, italic, underline], []);
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
    {
      type: 'paragraph',
      children: [
        { text: 'This is editable ' },
        { text: 'rich', bold: true },
        { text: ' text, ' },
        { text: 'much', italic: true },
        { text: ' better than a ' },
        { text: '<textarea>', underline: true },
        { text: '!' },
      ],
    },
  ]);

  return (
    <HeroEditor
      plugins={plugins}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    ></HeroEditor>
  );
};

render(<App />, document.getElementById('root'));
