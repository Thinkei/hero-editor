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
      mention({
        renderMentionList: (search, onSelect) => (
          <div
            style={{
              background: 'white',
              boxShadow: '0px 4px 8px rgba(0,0,0,.2)',
              border: 'solid thin #eee',
              borderRadius: 4,
            }}
          >
            <div>Your search: {search}</div>
            {sampleMentions
              .filter(({ name }) => name.toLowerCase().includes(search))
              .map(({ id, name }) => (
                <div
                  key={id}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelect({ id, name });
                  }}
                >
                  {name}
                </div>
              ))}
          </div>
        ),
      }),
    ],
    [],
  );
  const [value, setValue] = useState(defaultValue);

  return (
    <div>
      <HeroEditor
        id="interactive"
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
        id="webview"
        showToolbar={false}
        plugins={plugins}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      ></HeroEditor>

      <Button
        onMouseDown={(event) => {
          event.preventDefault();
          window.postMessage({
            type: '@hero-editor/webview/bold',
          });
        }}
      >
        bold
      </Button>
      <Button
        onMouseDown={(event) => {
          event.preventDefault();
          window.postMessage({
            type: '@hero-editor/webview/italic',
          });
        }}
      >
        italic
      </Button>
      <Button
        onMouseDown={(event) => {
          event.preventDefault();
          window.postMessage({
            type: '@hero-editor/webview/underline',
          });
        }}
      >
        underline
      </Button>
    </div>
  );
};

const sampleMentions = [
  { id: 1, name: 'Toan Nguyen' },
  { id: 2, name: 'Kien Tran' },
  { id: 3, name: 'Huy Vo' },
  { id: 4, name: 'Nam Vo' },
  { id: 5, name: 'Minh Dinh' },
  { id: 6, name: 'Tan Nguyen' },
];

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
        text: 'This is a mention ',
      },
      {
        type: 'mention',
        data: {
          id: 1,
          name: 'Toan Nguyen',
        },
        children: [
          {
            text: 'Toan Nguyen',
          },
        ],
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
