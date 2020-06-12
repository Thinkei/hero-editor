import React, { useMemo } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { composeRenderLeaf } from './helpers';
import Toolbar from './components/Toolbar';

const styles = {
  editorWrapper: {
    border: 'solid thin #eaeaea',
    borderRadius: 4,
  },
  editable: {
    padding: 16,
  },
};

const HeroEditor = ({ plugins = [], value, onChange }) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderLeaf = useMemo(
    () => composeRenderLeaf(...plugins.map((plugin) => plugin.renderLeaf)),
    [plugins],
  );
  const toolBarButtons = useMemo(
    () =>
      plugins.map(({ ToolbarButton }, index) => <ToolbarButton key={index} />),
    [plugins],
  );

  return (
    <div style={styles.editorWrapper}>
      <Slate editor={editor} value={value} onChange={onChange}>
        <Toolbar>{toolBarButtons}</Toolbar>
        <Editable renderLeaf={renderLeaf} style={styles.editable} />
      </Slate>
    </div>
  );
};

export * from './plugins';
export { default as JsonViewer } from './components/JsonViewer';
export { default as Toolbar } from './components/Toolbar';
export default HeroEditor;
