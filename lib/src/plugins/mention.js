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

const MentionElement = ({ attributes, children, element }) => (
  <span
    {...attributes}
    contentEditable={false}
    style={{ padding: '2px 4px', background: '#eeeeee', borderRadius: 4 }}
  >
    @{element.data.name}
    {children}
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
        } else {
          postMessage('mention-search', { target: null, search: '' }, editor);
        }
      }
    },
  )(editor);

  const removeMentionApplyListener = addMessageListener(
    'mention-apply',
    ({ editor, data }) => {
      const { id, name, meta, target } = data;
      Transforms.select(editor, target);
      const mention = {
        type: MENTION,
        data: { id, name, meta },
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

        if (data.target) {
          const domRange = ReactEditor.toDOMRange(editor, data.target);
          const rangeRect = domRange.getBoundingClientRect();
          const editorRect = wrapperEl.parentElement.getBoundingClientRect();

          wrapperEl.style.display = 'block';
          wrapperEl.style.top = `${rangeRect.top - editorRect.top + 20}px`;
          wrapperEl.style.left = `${rangeRect.left - editorRect.left}px`;
        } else {
          wrapperEl.style.display = 'none';
        }

        setSearch(data.search);
        setTarget(data.target);
      },
    )(editor);

    return () => removeMentionSearchListener();
  }, []);

  return (
    <div
      ref={wrapper}
      style={{ position: 'absolute', zIndex: 1, display: 'none' }}
    >
      {renderMentionList(search, ({ id, name, meta }) => {
        postMessage('mention-apply', { id, name, meta, target }, editor);
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
