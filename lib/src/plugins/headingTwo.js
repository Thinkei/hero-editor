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
import { HEADING_TWO } from '../constants';

const renderElement = makeRenderElement(
  HEADING_TWO,
  ({ attributes, children }) => <h2 {...attributes}>{children}</h2>,
);

const handleMessage = addMessageListener(HEADING_TWO, ({ editor }) => {
  const isActive = isBlockActive(editor, HEADING_TWO);

  // Unwrap all the items of any list
  Transforms.unwrapNodes(editor, {
    match: isList,
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : HEADING_TWO,
  });
});

const ToolbarButton = () => {
  const editor = useSlate();

  return (
    <Toolbar.Button
      active={isBlockActive(editor, HEADING_TWO)}
      onMouseDown={(event) => {
        event.preventDefault();
        postMessage(HEADING_TWO, {}, editor);
      }}
    >
      <Icon>looks_two</Icon>
    </Toolbar.Button>
  );
};

export default () =>
  createPlugin({
    name: HEADING_TWO,
    renderElement,
    handleMessage,
    ToolbarButton,
  });
