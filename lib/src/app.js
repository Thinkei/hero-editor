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
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);

  return (
    <HeroEditor
      id="webview"
      showToolbar={false}
      plugins={plugins}
      value={value}
      onChange={(newValue) => setValue(newValue)}
      wrapperStyle={{ border: 'none' }}
    ></HeroEditor>
  );
};

render(<App />, document.getElementById('root'));
