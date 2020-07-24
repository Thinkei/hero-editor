import React from 'react';
import { useSlate } from 'slate-react';
import { Transforms } from 'slate';
import {
  createPlugin,
  isMarkActive,
  toggleMark,
  makeRenderLeaf,
  addMessageListener,
  postMessage,
  isHeading,
  isBlockActive,
} from '../helpers';
import Toolbar from '../components/Toolbar';
import Icon from '../components/Icon';
import { H1, HEADING } from '../constants';

const renderLeaf = makeRenderLeaf(H1, ({ children }) => <h1>{children}</h1>);

const handleMessage = addMessageListener(H1, ({ editor }) => {
  const isActive = isBlockActive(editor, HEADING);
  toggleMark(editor, H1);
  return Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : 'heading',
  });
});

const ToolbarButton = () => {
  const editor = useSlate();

  return (
    <Toolbar.Button
      active={isMarkActive(editor, H1)}
      onMouseDown={(event) => {
        event.preventDefault();
        postMessage(H1, {}, editor);
      }}
    >
      <Icon>format_h1</Icon>
    </Toolbar.Button>
  );
};

export default () =>
  createPlugin({
    name: H1,
    renderLeaf,
    handleMessage,
    ToolbarButton,
  });
