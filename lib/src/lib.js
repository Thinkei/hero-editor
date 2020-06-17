import React, { useMemo, useEffect } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import {
  composeRenderLeaf,
  composeRenderElement,
  postMessage,
} from './helpers';
import withId from './helpers/withId';
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

const HeroEditor = ({
  id,
  showToolbar = true,
  plugins = [],
  value,
  onChange,
}) => {
  const editor = useMemo(() => withId(id)(withReact(createEditor())), []);

  const renderLeaf = useMemo(
    () => composeRenderLeaf(...plugins.map((plugin) => plugin.renderLeaf)),
    [plugins],
  );

  const renderElement = useMemo(
    () =>
      composeRenderElement(...plugins.map((plugin) => plugin.renderElement)),
    [plugins],
  );

  const renderCustom = useMemo(
    () => () => plugins.map((plugin) => plugin.renderCustom()),
    [plugins, value],
  );

  const toolBarButtons = useMemo(
    () =>
      plugins.map(({ ToolbarButton }, index) => <ToolbarButton key={index} />),
    [plugins],
  );

  useEffect(() => {
    const removeHandlers = plugins.map((plugin) =>
      plugin.handleMessage(editor),
    );

    return () => removeHandlers.forEach((removeHandler) => removeHandler());
  }, [plugins]);

  return (
    <div style={styles.editorWrapper}>
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
