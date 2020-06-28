import React from 'react';
import { useSlate } from 'slate-react';
import {
  createPlugin,
  isMarkActive,
  toggleMark,
  makeRenderLeaf,
  addMessageListener,
  postMessage,
} from '../helpers';
import Toolbar from '../components/Toolbar';
import Icon from '../components/Icon';
import { BOLD } from '../constants';

const renderLeaf = makeRenderLeaf(BOLD, ({ children }) => (
  <strong>{children}</strong>
));

const handleMessage = addMessageListener(BOLD, ({ editor }) => {
  toggleMark(editor, BOLD);
});

const ToolbarButton = () => {
  const editor = useSlate();

  return (
    <Toolbar.Button
      active={isMarkActive(editor, BOLD)}
      onMouseDown={(event) => {
        event.preventDefault();
        postMessage(BOLD, {}, editor);
      }}
    >
      <Icon>format_bold</Icon>
    </Toolbar.Button>
  );
};

export default createPlugin({
  name: BOLD,
  renderLeaf,
  handleMessage,
  ToolbarButton,
});
