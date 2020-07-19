import { ReactEditor } from 'slate-react';
import { createPlugin, addMessageListener, postMessage } from '../helpers';
import { EDITOR_CHANGE } from '../constants';

const handleMessage = addMessageListener(EDITOR_CHANGE, ({ editor }) => {
  const { selection } = editor;

  if (selection) {
    const domRange = ReactEditor.toDOMRange(editor, selection);
    const rangeRect = domRange.getBoundingClientRect();

    postMessage(
      'cursor-change',
      {
        offset: undefined,
        position: {
          top: rangeRect.top,
          left: rangeRect.left,
        },
      },
      editor,
    );
  }
});

export default () =>
  createPlugin({
    name: 'cursor-tracker',
    handleMessage,
  });
