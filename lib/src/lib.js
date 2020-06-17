import React, { useMemo, useEffect } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { composeRenderLeaf, composeRenderElement } from './helpers';
import Toolbar from './components/Toolbar';

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

const HeroEditor = ({ showToolbar = true, plugins = [], value, onChange }) => {
  const editor = useMemo(() => withReact(createEditor()), []);

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
    () => () => plugins.map((plugin) => plugin.renderCustom(value)),
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
      <Slate editor={editor} value={value} onChange={onChange}>
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
