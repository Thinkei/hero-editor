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
import { H1 } from '../constants';

const renderLeaf = makeRenderLeaf(H1, ({ children }) => <h1>{children}</h1>);

const handleMessage = addMessageListener(H1, ({ editor }) => {
  toggleMark(editor, H1);
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
