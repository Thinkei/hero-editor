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
} from './lib';

const placeholder = window.__editorConfigs?.placeholder;
const initialValue = window.__editorConfigs?.initialValue;

const App = () => {
  const plugins = useMemo(
    () => [
      bold,
      italic,
      underline,
      bulletedList,
      numberedList,
      listItem,
      mention({ renderMentionList: () => null }),
    ],
    [],
  );
  const [value, setValue] = useState(initialValue);

  return (
    <HeroEditor
      id="webview"
      showToolbar={false}
      plugins={plugins}
      placeholder={placeholder}
      value={value}
      onChange={(newValue) => setValue(newValue)}
      wrapperStyle={{ border: 'none' }}
    ></HeroEditor>
  );
};

render(<App />, document.getElementById('root'));
