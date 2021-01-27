import { createPlugin, addMessageListener } from '../helpers';
import { EMPTY_VALUE } from '../constants';

const name = 'editor-resetter';

const handleMessage = addMessageListener(
  'reset',
  ({ editor, data = EMPTY_VALUE }) => {
    editor.children = data;
    editor.selection = {
      anchor: { path: [0, 0], offset: 0 },
      focus: { path: [0, 0], offset: 0 },
    };
    editor.onChange();
  },
);

export default () =>
  createPlugin({
    name,
    handleMessage,
  });
