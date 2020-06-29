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
import { UNDERLINE } from '../constants';

const renderLeaf = makeRenderLeaf(UNDERLINE, ({ children }) => (
  <u>{children}</u>
));

const handleMessage = addMessageListener(UNDERLINE, ({ editor }) => {
  toggleMark(editor, UNDERLINE);
});

const ToolbarButton = () => {
  const editor = useSlate();

  return (
    <>
      <Toolbar.Button
        active={isMarkActive(editor, UNDERLINE)}
        onMouseDown={(event) => {
          event.preventDefault();
          postMessage(UNDERLINE, {}, editor);
        }}
      >
        <Icon>format_underlined</Icon>
      </Toolbar.Button>
      <Toolbar.Separator />
    </>
  );
};

export default () =>
  createPlugin({
    name: UNDERLINE,
    renderLeaf,
    handleMessage,
    ToolbarButton,
  });
