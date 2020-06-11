import React from 'react';
import { Editor } from 'slate';

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

const makeRenderLeaf = (mark, CustomLeaf) => (next) => (props) => {
  if (props.leaf[mark]) {
    const children = <CustomLeaf {...props} />;
    return next({ ...props, children });
  }

  return next(props);
};

const DefaultLeaf = 'span';

const renderDefaultLeaf = ({ attributes, children }) => (
  <DefaultLeaf {...attributes}>{children}</DefaultLeaf>
);

const compose = (...funcs) => (arg) =>
  funcs.reduceRight((composed, f) => f(composed), arg);

const composeRenderLeaf = (...renderers) =>
  compose(...renderers)(renderDefaultLeaf);

export { isMarkActive, toggleMark, makeRenderLeaf, compose, composeRenderLeaf };
