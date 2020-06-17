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
import { BULLETED_LIST } from '../constants';

const renderElement = makeRenderElement(BULLETED_LIST, 'ul');

const handleMessage = addMessageListener(BULLETED_LIST, ({ editor }) => {
  const isActive = isBlockActive(editor, BULLETED_LIST);

  // Unwrap all the items of any list
  Transforms.unwrapNodes(editor, {
    match: isList,
    split: true,
  });

  if (isActive) {
    Transforms.setNodes(editor, { type: 'paragraph' });
  } else {
    Transforms.setNodes(editor, { type: listItem.name });
    Transforms.wrapNodes(editor, { type: BULLETED_LIST, children: [] });
  }
});

const ToolbarButton = () => {
  const editor = useSlate();

  return (
    <Toolbar.Button
      active={isBlockActive(editor, BULLETED_LIST)}
      onMouseDown={(event) => {
        event.preventDefault();
        postMessage(BULLETED_LIST, {}, editor);
      }}
    >
      <Icon>format_list_bulleted</Icon>
    </Toolbar.Button>
  );
};

export default createPlugin({
  name: BULLETED_LIST,
  renderElement,
  handleMessage,
  ToolbarButton,
});
