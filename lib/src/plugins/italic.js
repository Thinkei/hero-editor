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
import { ITALIC } from '../constants';

const renderLeaf = makeRenderLeaf(ITALIC, ({ children }) => (
  <em>{children}</em>
));

const handleMessage = addMessageListener(ITALIC, ({ editor }) => {
  toggleMark(editor, ITALIC);
});

const ToolbarButton = () => {
  const editor = useSlate();

  return (
    <Toolbar.Button
      active={isMarkActive(editor, ITALIC)}
      onMouseDown={(event) => {
        event.preventDefault();
        postMessage(ITALIC, {}, editor);
      }}
    >
      <Icon>format_italic</Icon>
    </Toolbar.Button>
  );
};

export default createPlugin({
  name: ITALIC,
  renderLeaf,
  handleMessage,
  ToolbarButton,
});
