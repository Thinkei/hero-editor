import React, { useCallback, useEffect, useRef } from 'react';
import { createPlugin, useForceUpdate } from '../helpers';

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

const CACHE_TTL = 500;

const isDefined = (ref) => typeof ref.current !== 'undefined';

const checkEmptyOptimistically = (content) =>
  content.length === 1 &&
  content[0].type === 'paragraph' &&
  content[0].children.length === 1 &&
  content[0].children[0].text === '';

const EditorPlaceholder = ({ value, editor }) => {
  const cache = useRef(undefined);
  const { isForceUpdated, forceUpdate } = useForceUpdate();

  const createPlaceholder = useCallback(() => {
    const isEmpty = checkEmptyOptimistically(editor.children);

    return isEmpty ? <div style={styles.placeholder}>{value}</div> : null;
  }, []);

  useEffect(() => {
    if (isDefined(cache)) {
      const timerId = setTimeout(() => {
        cache.current = undefined;

        if (!isForceUpdated) forceUpdate();
      }, CACHE_TTL);

      return () => clearTimeout(timerId);
    }
  });

  if (isDefined(cache)) return cache.current;

  cache.current = createPlaceholder();

  return cache.current;
};

export default ({ value }) =>
  createPlugin({
    name: 'editor-placeholder',
    renderCustom: (editor) => (
      <EditorPlaceholder
        key="editor-placeholder"
        value={value}
        editor={editor}
      />
    ),
  });
