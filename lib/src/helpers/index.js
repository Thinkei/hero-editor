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
  funcs.reduceRight((composed, f) => (f ? f(composed) : composed), arg);

const composeRenderLeaf = (...renderers) =>
  compose(...renderers)(renderDefaultLeaf);

const addMessageListener = (type, callback) => (editor) =>
  window.addEventListener('message', (event) => {
    if (event.data.type !== `hero-editor/${type}`) return;
    return callback({ editor, data: event.data.data });
  });

const postMessage = (type, data) =>
  window.postMessage({
    type: `hero-editor/${type}`,
    data,
  });

const DefaultElement = React.forwardRef((props, ref) => (
  <p ref={ref} style={{ margin: 0, lineHeight: 1.5 }} {...props} />
));

const renderDefaultElement = ({ attributes, children }) => (
  <DefaultElement {...attributes}>{children}</DefaultElement>
);

const composeRenderElement = (...renderers) =>
  compose(...renderers)(renderDefaultElement);

export {
  isMarkActive,
  toggleMark,
  makeRenderLeaf,
  compose,
  composeRenderLeaf,
  addMessageListener,
  postMessage,
  composeRenderElement,
};
