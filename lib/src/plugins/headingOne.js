import React from 'react';
import { Transforms } from 'slate';
import { useSlate } from 'slate-react';
import {
  createPlugin,
  isBlockActive,
  makeRenderElement,
  addMessageListener,
  postMessage,
  isList,
} from '../helpers';
import Toolbar from '../components/Toolbar';
import Icon from '../components/Icon';
import { HEADING_ONE } from '../constants';

const renderElement = makeRenderElement(
  HEADING_ONE,
  ({ attributes, children }) => <h1 {...attributes}>{children}</h1>,
);

const handleMessage = addMessageListener(HEADING_ONE, ({ editor }) => {
  const isActive = isBlockActive(editor, HEADING_ONE);

  // Unwrap all the items of any list
  Transforms.unwrapNodes(editor, {
    match: isList,
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : HEADING_ONE,
  });
});

const ToolbarButton = () => {
  const editor = useSlate();

  return (
    <Toolbar.Button
      active={isBlockActive(editor, HEADING_ONE)}
      onMouseDown={(event) => {
        event.preventDefault();
        postMessage(HEADING_ONE, {}, editor);
      }}
    >
      <Icon>looks_one</Icon>
    </Toolbar.Button>
  );
};

export default () =>
  createPlugin({
    name: HEADING_ONE,
    renderElement,
    handleMessage,
    ToolbarButton,
  });
