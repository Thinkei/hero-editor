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

const handleMessage = (editor) => {
  const removeEditorChangeListener = addMessageListener(
    EDITOR_CHANGE,
    ({ editor }) => {
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
          postMessage('mention-search', beforeMatch[1], editor);
          return;
        }
      }

      postMessage('mention-search', '', editor);
    },
  )(editor);

  const removeMentionApplyListener = addMessageListener(
    'mention-apply',
    ({ editor, data }) => {},
  )(editor);

  return () => {
    removeEditorChangeListener();
    removeMentionApplyListener();
  };
};

const MentionListWrapper = ({ renderMentionList }) => {
  const [search, setSearch] = useState('');
  const editor = useSlate();

  useEffect(() => {
    const removeMentionSearchListener = addMessageListener(
      'mention-search',
      ({ data }) => {
        setSearch(data);
      },
    )(editor);

    return () => removeMentionSearchListener();
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
    handleMessage,
  });
