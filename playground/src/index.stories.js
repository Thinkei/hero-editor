import React, { useState, useMemo } from 'react';
import HeroEditor, {
  JsonViewer,
  bold,
  italic,
  underline,
  logger,
} from 'hero-editor';

const Button = (props) => (
  <button
    {...props}
    style={{
      padding: '4px 8px',
      margin: '8px 8px 0 0',
      border: 'solid thin silver',
      background: 'transparent',
      borderRadius: 4,
      cursor: 'pointer',
    }}
  />
);

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

export const webview = () => {
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
        showToolbar={false}
        plugins={plugins}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      ></HeroEditor>

      <Button
        onMouseDown={(event) => {
          event.preventDefault();
          window.postMessage({
            type: '@hero-editor/bold',
          });
        }}
      >
        bold
      </Button>
      <Button
        onMouseDown={(event) => {
          event.preventDefault();
          window.postMessage({
            type: '@hero-editor/italic',
          });
        }}
      >
        italic
      </Button>
      <Button
        onMouseDown={(event) => {
          event.preventDefault();
          window.postMessage({
            type: '@hero-editor/underline',
          });
        }}
      >
        underline
      </Button>
    </div>
  );
};
