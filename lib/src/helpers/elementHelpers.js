import React from 'react';
import { Editor } from 'slate';
import compose from './compose';
import { NUMBERED_LIST, BULLETED_LIST, HEADING } from '../constants';

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });
  return !!match;
};

const isList = (node) => [BULLETED_LIST, NUMBERED_LIST].includes(node.type);

const DefaultElement = React.forwardRef((props, ref) => (
  <p ref={ref} style={{ margin: 0, lineHeight: 1.5 }} {...props} />
));

const HeadingElement = React.forwardRef((props, ref) => (
  <div ref={ref} style={{ margin: 0, lineHeight: 1.5 }} {...props} />
));

const renderDefaultElement = ({ attributes, children, element }) => {
  const isHeading = element.type === HEADING;
  return isHeading ? (
    <HeadingElement {...attributes}>{children}</HeadingElement>
  ) : (
    <DefaultElement {...attributes}>{children}</DefaultElement>
  );
};

const makeRenderElement = (block, CustomElement) => (next) => (props) => {
  if (props.element.type === block) {
    return <CustomElement {...props} />;
  }
  return next(props);
};

const composeRenderElement = (plugins) =>
  compose(...plugins.map((plugin) => plugin.renderElement))(
    renderDefaultElement,
  );

export {
  isBlockActive,
  isList,
  renderDefaultElement,
  makeRenderElement,
  composeRenderElement,
};
