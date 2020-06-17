import React from 'react';
import {
  createPlugin,
  makeRenderElement,
  addMessageListener,
  postMessage,
} from '../helpers';
import { MENTION } from '../constants';

const MentionElement = ({ attributes, element }) => (
  <span {...attributes}>@{element.name}</span>
);

const renderElement = makeRenderElement(MENTION, MentionElement);

export default createPlugin({
  name: MENTION,
  renderElement,
});
