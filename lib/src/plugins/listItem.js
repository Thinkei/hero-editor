import React from 'react';
import { createPlugin, makeRenderElement } from '../helpers';
import { LIST_ITEM } from '../constants';

const renderElement = makeRenderElement(
  LIST_ITEM,
  ({ attributes, children }) => <li {...attributes}>{children}</li>,
);

export default () =>
  createPlugin({
    name: LIST_ITEM,
    renderElement,
  });
