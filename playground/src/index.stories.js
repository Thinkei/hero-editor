import React, { useState, useMemo } from 'react';
import HeroEditor, {
  JsonViewer,
  bold,
  italic,
  underline,
  logger,
} from 'hero-editor';

export default { title: 'Hero Editor' };

export const interactive = () => {
  const plugins = useMemo(() => [logger, bold, italic, underline], []);
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
    <div>
      <HeroEditor
        plugins={plugins}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      ></HeroEditor>
      <JsonViewer value={value} />
    </div>
  );
};
