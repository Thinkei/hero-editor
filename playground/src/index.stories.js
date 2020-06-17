import React, { useState, useMemo } from 'react';
import HeroEditor, {
  JsonViewer,
  bold,
  italic,
  underline,
  logger,
  listItem,
  bulletedList,
  numberedList,
  mention,
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

const defaultValue = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'A',
        bold: true,
        underline: true,
      },
      {
        text: ' ',
        underline: true,
      },
      {
        text: 'paragraph',
        italic: true,
        underline: true,
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'bulleted-list',
    children: [
      {
        type: 'list-item',
        children: [
          {
            text: 'Item 1',
          },
        ],
      },
      {
        type: 'list-item',
        children: [
          {
            text: 'Item 2',
          },
        ],
      },
    ],
  },
  {
    type: 'numbered-list',
    children: [
      {
        type: 'list-item',
        children: [
          {
            text: 'Item 1',
          },
        ],
      },
      {
        type: 'list-item',
        children: [
          {
            text: 'Item 2',
          },
        ],
      },
    ],
  },
];

export default { title: 'Hero Editor' };

export const interactive = () => {
  const plugins = useMemo(
    () => [
      logger,
      bold,
      italic,
      underline,
      bulletedList,
      numberedList,
      listItem,
      mention({ renderMentionList: (search) => <h1>{search}</h1> }),
    ],
    [],
  );
  const [value, setValue] = useState(defaultValue);

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
  const plugins = useMemo(
    () => [
      logger,
      bold,
      italic,
      underline,
      bulletedList,
      numberedList,
      listItem,
    ],
    [],
  );
  const [value, setValue] = useState(defaultValue);

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
