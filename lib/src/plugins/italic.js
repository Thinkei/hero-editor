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

const name = 'italic';

const renderLeaf = makeRenderLeaf(name, ({ children }) => <em>{children}</em>);

const handleMessage = addMessageListener(name, ({ editor }) => {
  toggleMark(editor, name);
});

const ToolbarButton = () => {
  const editor = useSlate();

  return (
    <Toolbar.Button
      active={isMarkActive(editor, name)}
      onMouseDown={(event) => {
        event.preventDefault();
        postMessage(name, {}, editor);
      }}
    >
      <Icon>format_italic</Icon>
    </Toolbar.Button>
  );
};

export default createPlugin({ name, renderLeaf, handleMessage, ToolbarButton });
