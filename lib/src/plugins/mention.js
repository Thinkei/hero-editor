import React, { useState, useEffect } from 'react';
import { Editor, Range } from 'slate';
import { useSlate } from 'slate-react';
import {
  createPlugin,
  makeRenderElement,
  addMessageListener,
  postMessage,
} from '../helpers';
import { MENTION, EDITOR_CHANGE } from '../constants';

const MentionElement = ({ attributes, element }) => (
  <span {...attributes}>@{element.name}</span>
);

const renderElement = makeRenderElement(MENTION, MentionElement);

// TODO:
// We can listen to editor-change and post another message for the outside window

const MentionListWrapper = ({ renderMentionList }) => {
  const editor = useSlate();
  const [search, setSearch] = useState('');

  useEffect(() => {
    const removeMessageListener = addMessageListener(EDITOR_CHANGE, () => {
      const { selection } = editor;

      if (selection && Range.isCollapsed(selection)) {
        const [start] = Range.edges(selection);
        const wordBefore = Editor.before(editor, start, { unit: 'word' });
        const before = wordBefore && Editor.before(editor, wordBefore);
        const beforeRange = before && Editor.range(editor, before, start);
        const beforeText = beforeRange && Editor.string(editor, beforeRange);
        const beforeMatch = beforeText && beforeText.match(/^@(\w+)$/);
        const after = Editor.after(editor, start);
        const afterRange = Editor.range(editor, start, after);
        const afterText = Editor.string(editor, afterRange);
        const afterMatch = afterText.match(/^(\s|$)/);

        if (beforeMatch && afterMatch) {
          setSearch(beforeMatch[1]);
          return;
        }
      }

      setSearch('');
    })();

    return () => removeMessageListener();
  }, []);

  return renderMentionList(search);
};

export default ({ renderMentionList }) =>
  createPlugin({
    name: MENTION,
    renderElement,
    renderCustom: () => (
      <MentionListWrapper renderMentionList={renderMentionList} />
    ),
  });
