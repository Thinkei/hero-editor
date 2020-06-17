import React from 'react';
import { Editor } from 'slate';
import { NUMBERED_LIST, BULLETED_LIST } from '../constants';

const createPlugin = (configs) => {
  const defaultPlugin = {
    name: '',
    renderLeaf: (next) => (props) => next(props),
    renderElement: (next) => (props) => next(props),
    handleMessage: () => () => {},
    ToolbarButton: () => null,
  };
  return { ...defaultPlugin, ...configs };
};

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

const messagePrefix = '@hero-editor';

const addMessageListener = (type, callback) => (editor) => {
  const listener = (event) => {
    if (event.data.type === `${messagePrefix}/${type}`) {
      callback({ editor, data: event.data.data });
    }
  };
  window.addEventListener('message', listener);
  return () => window.removeEventListener('message', listener);
};

const postMessage = (type, data) =>
  window.postMessage({
    type: `${messagePrefix}/${type}`,
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

const makeRenderElement = (block, CustomElement) => (next) => (props) => {
  if (props.element.type === block) {
    return (
      <CustomElement {...props.attributes}>{props.children}</CustomElement>
    );
  }

  return next(props);
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });

  return !!match;
};

const isList = (node) => [BULLETED_LIST, NUMBERED_LIST].includes(node.type);

export {
  createPlugin,
  isMarkActive,
  toggleMark,
  makeRenderLeaf,
  renderDefaultLeaf,
  compose,
  composeRenderLeaf,
  addMessageListener,
  postMessage,
  composeRenderElement,
  renderDefaultElement,
  makeRenderElement,
  isBlockActive,
  isList,
};
