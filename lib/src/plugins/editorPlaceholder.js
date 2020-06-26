import React from 'react';
import { useSlate } from 'slate-react';
import { createPlugin } from '../helpers';

const styles = {
  placeholder: {
    boxSizing: 'border-box',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    padding: 16,
    lineHeight: 1.5,
    color: 'lightgrey',
    zIndex: -1,
  },
};

const isOptimisticallyEmpty = (content) => {
  if (
    content.length === 1 &&
    content[0].type === 'paragraph' &&
    content[0].children.length === 1 &&
    content[0].children[0].text === ''
  )
    return true;
  return false;
};

const EditorPlaceholder = ({ value }) => {
  const editor = useSlate();
  const isEmpty = isOptimisticallyEmpty(editor.children);
  return isEmpty ? <div style={styles.placeholder}>{value}</div> : null;
};

export default ({ value }) =>
  createPlugin({
    name: 'editor-placeholder',
    renderCustom: () => (
      <EditorPlaceholder key="editor-placeholder" value={value} />
    ),
  });
