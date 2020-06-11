import React from 'react';
import { useSlate } from 'slate-react';
import { isMarkActive, toggleMark, makeRenderLeaf } from '../helpers';

const renderLeaf = makeRenderLeaf('bold', ({ children }) => (
  <strong>{children}</strong>
));

const ToolbarButton = () => {
  const editor = useSlate();

  return (
    <button
      style={{
        background: isMarkActive(editor, 'bold') ? 'grey' : 'lightgrey',
      }}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, 'bold');
      }}
    >
      bold
    </button>
  );
};

export default { renderLeaf, ToolbarButton };
