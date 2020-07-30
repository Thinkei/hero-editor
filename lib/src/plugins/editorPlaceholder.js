import React, { useCallback, useEffect, useRef } from 'react';
import { createPlugin, useForceUpdate, isEmptyContent } from '../helpers';

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

const CACHE_TTL = 50;

const isDefined = (ref) => typeof ref.current !== 'undefined';

const EditorPlaceholder = ({ value, editor, style }) => {
  const cache = useRef(undefined);
  const { isForceUpdated, forceUpdate } = useForceUpdate();

  const createPlaceholder = useCallback(() => {
    const isEmpty = isEmptyContent(editor.children);
    const mergedStyle = { ...styles.placeholder, ...style };

    return isEmpty ? <div style={mergedStyle}>{value}</div> : null;
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

export default ({ value, style }) =>
  createPlugin({
    name: 'editor-placeholder',
    renderCustom: (editor) => (
      <EditorPlaceholder
        key="editor-placeholder"
        value={value}
        editor={editor}
        style={style}
      />
    ),
  });
