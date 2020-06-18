import React, { useState, useEffect, useRef } from 'react';
import { Editor, Range, Transforms } from 'slate';
import { useSlate, ReactEditor } from 'slate-react';
import {
  createPlugin,
  makeRenderElement,
  addMessageListener,
  postMessage,
} from '../helpers';
import { MENTION, EDITOR_CHANGE } from '../constants';

const MentionElement = ({ attributes, element }) => (
  <span
    {...attributes}
    style={{ padding: '2px 4px', background: 'lavender', borderRadius: 4 }}
  >
    @{element.data.name}
  </span>
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
          postMessage(
            'mention-search',
            { target: beforeRange, search: beforeMatch[1] },
            editor,
          );
          return;
        }
      }

      // postMessage('mention-search', { target: null, search: '' }, editor);
    },
  )(editor);

  const removeMentionApplyListener = addMessageListener(
    'mention-apply',
    ({ editor, data }) => {
      const { id, name, meta } = data;
      Transforms.select(editor, meta.target);
      const mention = {
        type: MENTION,
        data: { id, name },
        children: [{ text: '' }],
      };
      Transforms.insertNodes(editor, mention);
      Transforms.move(editor);
    },
  )(editor);

  return () => {
    removeEditorChangeListener();
    removeMentionApplyListener();
  };
};

const MentionListWrapper = ({ renderMentionList }) => {
  const [search, setSearch] = useState('');
  const [target, setTarget] = useState(null);
  const wrapper = useRef(null);
  const editor = useSlate();

  useEffect(() => {
    const removeMentionSearchListener = addMessageListener(
      'mention-search',
      ({ data }) => {
        const wrapperEl = wrapper.current;
        const domRange = ReactEditor.toDOMRange(editor, data.target);
        const rangeRect = domRange.getBoundingClientRect();
        const editorRect = wrapperEl.parentElement.getBoundingClientRect();

        wrapperEl.style.top = `${rangeRect.top - editorRect.top + 24}px`;
        wrapperEl.style.left = `${rangeRect.left - editorRect.left}px`;

        setSearch(data.search);
        setTarget(data.target);
      },
    )(editor);

    return () => removeMentionSearchListener();
  }, []);

  return (
    <div ref={wrapper} style={{ position: 'absolute' }}>
      {renderMentionList(search, ({ id, name }) => {
        postMessage('mention-apply', { id, name, meta: { target } }, editor);
      })}
    </div>
  );
};

const enhanceEditor = (editor) => {
  const { isInline, isVoid } = editor;

  editor.isInline = (element) => {
    return element.type === MENTION ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return element.type === MENTION ? true : isVoid(element);
  };

  return editor;
};

export default ({ renderMentionList }) =>
  createPlugin({
    name: MENTION,
    renderElement,
    renderCustom: () => (
      <MentionListWrapper key={MENTION} renderMentionList={renderMentionList} />
    ),
    handleMessage,
    enhanceEditor,
  });
