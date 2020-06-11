import React from 'react';
import { useSlate } from 'slate-react';
import { isMarkActive, toggleMark, makeRenderLeaf } from '../helpers';
import Toolbar from '../components/Toolbar';
import Icon from '../components/Icon';

const renderLeaf = makeRenderLeaf('underline', ({ children }) => (
  <u>{children}</u>
));

const ToolbarButton = () => {
  const editor = useSlate();

  return (
    <Toolbar.Button
      active={isMarkActive(editor, 'underline')}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, 'underline');
      }}
    >
      <Icon>format_underlined</Icon>
    </Toolbar.Button>
  );
};

export default { renderLeaf, ToolbarButton };
