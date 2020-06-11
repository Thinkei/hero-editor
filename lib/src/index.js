import React, { useMemo } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { composeRenderLeaf } from './helpers';

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
    <Slate editor={editor} value={value} onChange={onChange}>
      <div>{toolBarButtons}</div>
      <Editable renderLeaf={renderLeaf} />
    </Slate>
  );
};

export * from './plugins';
export { default as JsonViewer } from './components/JsonViewer';
export default HeroEditor;
