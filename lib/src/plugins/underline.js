import React from 'react';
import { useSlate } from 'slate-react';
import { isMarkActive, toggleMark, makeRenderLeaf } from '../helpers';

const renderLeaf = makeRenderLeaf('underline', ({ children }) => (
  <u>{children}</u>
));

const ToolbarButton = () => {
  const editor = useSlate();

  return (
    <button
      style={{
        background: isMarkActive(editor, 'underline') ? 'grey' : 'lightgrey',
      }}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, 'underline');
      }}
    >
      underline
    </button>
  );
};

export default { renderLeaf, ToolbarButton };
