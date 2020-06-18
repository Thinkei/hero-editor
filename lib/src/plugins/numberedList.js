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
import listItem from './listItem';
import { NUMBERED_LIST } from '../constants';

const renderElement = makeRenderElement(
  NUMBERED_LIST,
  ({ attributes, children }) => <ol {...attributes}>{children}</ol>,
);

const handleMessage = addMessageListener(NUMBERED_LIST, ({ editor }) => {
  const isActive = isBlockActive(editor, NUMBERED_LIST);

  // Unwrap all the items of any list
  Transforms.unwrapNodes(editor, {
    match: isList,
    split: true,
  });

  if (isActive) {
    Transforms.setNodes(editor, { type: 'paragraph' });
  } else {
    Transforms.setNodes(editor, { type: listItem.name });
    Transforms.wrapNodes(editor, { type: NUMBERED_LIST, children: [] });
  }
});

const ToolbarButton = () => {
  const editor = useSlate();

  return (
    <Toolbar.Button
      active={isBlockActive(editor, NUMBERED_LIST)}
      onMouseDown={(event) => {
        event.preventDefault();
        postMessage(NUMBERED_LIST, {}, editor);
      }}
    >
      <Icon>format_list_numbered</Icon>
    </Toolbar.Button>
  );
};

export default createPlugin({
  name: NUMBERED_LIST,
  renderElement,
  handleMessage,
  ToolbarButton,
});
