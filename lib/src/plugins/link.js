import React from 'react';
import isUrl from 'is-url';
import { Transforms } from 'slate';
import {
  createPlugin,
  makeRenderElement,
  addMessageListener,
  postMessage,
} from '../helpers';
import { LINK } from '../constants';

const getUrl = (element) =>
  element.children.reduce((url, node) => url + node.text, '');

const LinkElement = ({ attributes, children, element }) => (
  <a {...attributes} href={getUrl(element)}>
    {children}
  </a>
);

const renderElement = makeRenderElement(LINK, LinkElement);

const handleMessage = addMessageListener(LINK, ({ editor, data: { url } }) => {
  Transforms.insertNodes(editor, {
    type: LINK,
    data: { url },
    children: [{ text: url }],
  });
});

const enhanceEditor = (editor) => {
  const { isInline, insertData } = editor;

  editor.isInline = (element) => {
    return element.type === LINK ? true : isInline(element);
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');

    if (text && isUrl(text)) {
      postMessage(LINK, { url: text }, editor);
    } else {
      insertData(data);
    }
  };

  return editor;
};

export default () =>
  createPlugin({
    name: LINK,
    renderElement,
    handleMessage,
    enhanceEditor,
  });
