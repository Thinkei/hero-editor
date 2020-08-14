import React, { useMemo, useEffect, useRef } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import {
  composeRenderLeaf,
  composeRenderElement,
  postMessage,
  withId,
  map,
  get,
  apply,
  flow,
  useAndroidHack,
} from './helpers';
import Toolbar from './components/Toolbar';
import {
  EDITOR_CHANGE,
  EDITOR_FOCUS,
  EDITOR_BLUR,
  EDITOR_LAYOUT,
} from './constants';

const styles = {
  editorWrapper: {
    fontFamily: 'sans-serif',
    border: 'solid thin #eaeaea',
    borderRadius: 4,
  },
  editableWrapper: {
    position: 'relative',
  },
  editable: {
    padding: 16,
  },
};

const getCustomElements = (editor) =>
  map(flow(get('renderCustom'), apply([editor])));

const addMessageListeners = (editor) =>
  map(flow(get('handleMessage'), apply([editor])));

const getToolbarButtons = map(({ name, ToolbarButton }) => (
  <ToolbarButton key={name} />
));

const noop = () => {};

const HeroEditor = ({
  id,
  showToolbar = true,
  autoFocus = false,
  plugins = [],
  placeholder,
  value,
  onChange,
  onFocus = noop,
  onBlur = noop,
  onLayout = noop,
  wrapperStyle,
  editableStyle,
  isAndroid = false,
}) => {
  const wrapper = useRef(null);
  const wrapperLayout = useRef({ width: 0, height: 0 });

  const editor = useMemo(
    () =>
      flow(
        createEditor,
        withReact,
        withId(id),
        ...map(get('enhanceEditor'))(plugins),
      )(),
    [],
  );

  const renderLeaf = useMemo(() => composeRenderLeaf(plugins), [plugins]);

  const renderElement = useMemo(() => composeRenderElement(plugins), [plugins]);

  const renderCustom = useMemo(() => () => getCustomElements(editor)(plugins), [
    plugins,
    value,
  ]);

  const toolBarButtons = useMemo(() => getToolbarButtons(plugins), [plugins]);

  useEffect(() => {
    const removeHandlers = addMessageListeners(editor)(plugins);

    return () => removeHandlers.forEach((removeHandler) => removeHandler());
  }, [plugins]);

  useEffect(() => {
    const width = wrapper.current?.offsetWidth;
    const height = wrapper.current?.offsetHeight;

    if (
      width !== wrapperLayout.current.width ||
      height !== wrapperLayout.current.height
    ) {
      wrapperLayout.current = { width, height };
      onLayout(wrapperLayout.current);
      postMessage(EDITOR_LAYOUT, wrapperLayout.current, editor);
    }
  }, [value]);

  // Hack for Slate 0.58 on Android
  let onCompositionEnd, onDOMBeforeInput;

  if (isAndroid) {
    ({ onCompositionEnd, onDOMBeforeInput } = useAndroidHack(editor));
  }

  return (
    <div
      ref={wrapper}
      className="hero-editor--wrapper"
      style={{ ...styles.editorWrapper, ...wrapperStyle }}
    >
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => {
          onChange(value);
          postMessage(EDITOR_CHANGE, { value }, editor);
        }}
      >
        {showToolbar ? <Toolbar>{toolBarButtons}</Toolbar> : null}
        <div style={styles.editableWrapper}>
          <Editable
            className="hero-editor--editable"
            placeholder={placeholder}
            spellCheck
            onCompositionEnd={onCompositionEnd}
            onDOMBeforeInput={onDOMBeforeInput}
            autoFocus={autoFocus}
            renderLeaf={renderLeaf}
            renderElement={renderElement}
            onFocus={(e) => {
              onFocus(e);
              postMessage(EDITOR_FOCUS, {}, editor);
            }}
            onBlur={(e) => {
              onBlur(e);
              postMessage(EDITOR_BLUR, {}, editor);
            }}
            style={{ ...styles.editable, ...editableStyle }}
          />
          {renderCustom()}
        </div>
      </Slate>
    </div>
  );
};

export * from './plugins';
export { default as JsonViewer } from './components/JsonViewer';
export { default as Toolbar } from './components/Toolbar';
export { default as plainSerializer } from './serializers/plain';
export { default as makeReactTransformer } from './transformers/react';
export { defaultReactTransformer } from './transformers/react';
export { isEmptyContent, getUrl } from './helpers';
export default HeroEditor;
