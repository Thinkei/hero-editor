import React from 'react';
import { useSlate } from 'slate-react';
import { isMarkActive, toggleMark, makeRenderLeaf } from '../helpers';
import Toolbar from '../components/Toolbar';
import Icon from '../components/Icon';

const renderLeaf = makeRenderLeaf('italic', ({ children }) => (
  <em>{children}</em>
));

const ToolbarButton = () => {
  const editor = useSlate();

  return (
    <Toolbar.Button
      active={isMarkActive(editor, 'italic')}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, 'italic');
      }}
    >
      <Icon>format_italic</Icon>
    </Toolbar.Button>
  );
};

export default { renderLeaf, ToolbarButton };
