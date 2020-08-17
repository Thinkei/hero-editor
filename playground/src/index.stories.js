import React, { useState } from 'react';
import HeroEditor, {
  JsonViewer,
  bold,
  italic,
  underline,
  logger,
  cursorTracker,
  listItem,
  bulletedList,
  numberedList,
  mention,
  editorPlaceholder,
  link,
  headingOne,
  headingTwo,
} from 'hero-editor';

export default { title: 'Hero Editor' };

const plugins = [
  logger(),
  cursorTracker(),
  link(),
  bold(),
  italic(),
  underline(),
  bulletedList(),
  numberedList(),
  listItem(),
  headingOne(),
  headingTwo(),
  mention({
    renderMentionList: (search, onSelect) => {
      const results = sampleMentions.filter(({ name }) =>
        name.toLowerCase().includes(search.toLowerCase()),
      );

      if (!results.length)
        return (
          <div style={styles.list}>
            <div style={{ ...styles.listItem, textAlign: 'center' }}>
              No result
            </div>
          </div>
        );

      return (
        <div style={styles.list}>
          {results.map(({ id, name }) => (
            <div
              key={id}
              style={styles.listItem}
              onMouseDown={(e) => {
                e.preventDefault();
                onSelect({ id, name });
              }}
            >
              {name}
            </div>
          ))}
        </div>
      );
    },
  }),
  editorPlaceholder({
    value:
      'Has someone brightened up your day? Type @ to give them a Shout Out!',
  }),
];

export const interactive = () => {
  const [value, setValue] = useState(emptyValue);

  return (
    <div>
      <HeroEditor
        id="interactive"
        plugins={plugins}
        value={value}
        onChange={(newValue) => setValue(newValue)}
        autoFocus
        editableStyle={{ minHeight: 200 }}
      ></HeroEditor>
      <JsonViewer value={value} />
    </div>
  );
};

export const webview = () => {
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

const styles = {
  list: {
    border: 'solid thin #eaeaea',
    background: 'white',
    boxShadow: '0px 2px 8px rgba(0,0,0,.2)',
    borderRadius: 4,
  },
  listItem: {
    minWidth: 150,
    padding: '8px 12px',
    cursor: 'pointer',
  },
};

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

const emptyValue = [
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
];

const defaultValue = [
  {
    type: 'heading-one',
    children: [
      {
        text: 'Hero Editor',
      },
    ],
  },
  {
    type: 'heading-two',
    children: [
      {
        text: 'This is heading 2',
      },
    ],
  },
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
            text: '',
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
