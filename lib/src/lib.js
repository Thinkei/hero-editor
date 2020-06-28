import React, { useMemo, useEffect } from 'react';
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
} from './helpers';
import Toolbar from './components/Toolbar';
import { EDITOR_CHANGE } from './constants';

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

const HeroEditor = ({
  id,
  showToolbar = true,
  plugins = [],
  placeholder,
  value,
  onChange,
  wrapperStyle,
}) => {
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

  return (
    <div style={{ ...styles.editorWrapper, ...wrapperStyle }}>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => {
          onChange(value);
          postMessage(EDITOR_CHANGE, {}, editor);
        }}
      >
        {showToolbar ? <Toolbar>{toolBarButtons}</Toolbar> : null}
        <div style={styles.editableWrapper}>
          <Editable
            placeholder={placeholder}
            renderLeaf={renderLeaf}
            renderElement={renderElement}
            style={styles.editable}
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
export default HeroEditor;
