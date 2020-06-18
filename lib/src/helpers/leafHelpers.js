import React from 'react';
import { Editor } from 'slate';
import compose from './compose';

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const DefaultLeaf = 'span';

const renderDefaultLeaf = ({ attributes, children }) => (
  <DefaultLeaf {...attributes}>{children}</DefaultLeaf>
);

const makeRenderLeaf = (mark, CustomLeaf) => (next) => (props) => {
  if (props.leaf[mark]) {
    const children = <CustomLeaf {...props} />;
    return next({ ...props, children });
  }
  return next(props);
};

const composeRenderLeaf = (plugins) =>
  compose(...plugins.map((plugin) => plugin.renderLeaf))(renderDefaultLeaf);

export {
  isMarkActive,
  toggleMark,
  renderDefaultLeaf,
  makeRenderLeaf,
  composeRenderLeaf,
};
