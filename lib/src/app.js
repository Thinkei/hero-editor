import React, { useState, useMemo } from 'react';
import { render } from 'react-dom';
import HeroEditor, {
  bold,
  italic,
  underline,
  listItem,
  bulletedList,
  numberedList,
  mention,
  editorPlaceholder,
  link,
  cursorTracker,
  h1,
} from './lib';

const placeholder = window.__editorConfigs?.placeholder;
const initialValue = window.__editorConfigs?.initialValue;
const autoFocus = window.__editorConfigs?.autoFocus;
const isAndroid = window.__editorConfigs?.isAndroid;
const style = window.__editorConfigs?.style;

const App = () => {
  const plugins = useMemo(
    () => [
      cursorTracker(),
      bold(),
      italic(),
      underline(),
      bulletedList(),
      numberedList(),
      listItem(),
      mention({ renderMentionList: () => null }),
      editorPlaceholder({ value: placeholder, style }),
      link(),
      h1(),
    ],
    [],
  );
  const [value, setValue] = useState(initialValue);

  return (
    <HeroEditor
      id="webview"
      showToolbar={false}
      isAndroid={isAndroid}
      autoFocus={autoFocus}
      plugins={plugins}
      value={value}
      onChange={(newValue) => setValue(newValue)}
      wrapperStyle={{ border: 'none' }}
      editableStyle={style}
    ></HeroEditor>
  );
};

render(<App />, document.getElementById('root'));
