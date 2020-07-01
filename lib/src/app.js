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
} from './lib';

const placeholder = window.__editorConfigs?.placeholder;
const initialValue = window.__editorConfigs?.initialValue;
const autoFocus = window.__editorConfigs?.autoFocus;
const style = window.__editorConfigs?.style;

const App = () => {
  const plugins = useMemo(
    () => [
      bold(),
      italic(),
      underline(),
      bulletedList(),
      numberedList(),
      listItem(),
      mention({ renderMentionList: () => null }),
      editorPlaceholder({ value: placeholder, style }),
    ],
    [],
  );
  const [value, setValue] = useState(initialValue);

  return (
    <HeroEditor
      id="webview"
      showToolbar={false}
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
