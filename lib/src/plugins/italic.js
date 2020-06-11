import React from 'react';
import { useSlate } from 'slate-react';
import { isMarkActive, toggleMark, makeRenderLeaf } from '../helpers';

const renderLeaf = makeRenderLeaf('italic', ({ children }) => (
  <em>{children}</em>
));

const ToolbarButton = () => {
  const editor = useSlate();

  return (
    <button
      style={{
        background: isMarkActive(editor, 'italic') ? 'grey' : 'lightgrey',
      }}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, 'italic');
      }}
    >
      italic
    </button>
  );
};

export default { renderLeaf, ToolbarButton };
