import React from 'react';
import { useSlate } from 'slate-react';
import { isMarkActive, toggleMark, makeRenderLeaf } from '../helpers';
import Toolbar from '../components/Toolbar';
import Icon from '../components/Icon';

const renderLeaf = makeRenderLeaf('bold', ({ children }) => (
  <strong>{children}</strong>
));

const ToolbarButton = () => {
  const editor = useSlate();

  return (
    <Toolbar.Button
      active={isMarkActive(editor, 'bold')}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, 'bold');
      }}
    >
      <Icon>format_bold</Icon>
    </Toolbar.Button>
  );
};

export default { renderLeaf, ToolbarButton };
