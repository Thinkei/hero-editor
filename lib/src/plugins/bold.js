import React from 'react';
import { useSlate } from 'slate-react';
import {
  isMarkActive,
  toggleMark,
  makeRenderLeaf,
  addMessageListener,
  postMessage,
} from '../helpers';
import Toolbar from '../components/Toolbar';
import Icon from '../components/Icon';

const pluginName = 'bold';

const renderLeaf = makeRenderLeaf(pluginName, ({ children }) => (
  <strong>{children}</strong>
));

const handleMessage = addMessageListener(pluginName, ({ editor }) => {
  toggleMark(editor, pluginName);
});

const ToolbarButton = () => {
  const editor = useSlate();

  return (
    <Toolbar.Button
      active={isMarkActive(editor, pluginName)}
      onMouseDown={(event) => {
        event.preventDefault();
        postMessage(pluginName, {});
      }}
    >
      <Icon>format_bold</Icon>
    </Toolbar.Button>
  );
};

export default { renderLeaf, handleMessage, ToolbarButton };
