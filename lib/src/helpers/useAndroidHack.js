// https://github.com/ianstormtaylor/slate/issues/3470#issuecomment-639431390
import { useRef, useCallback } from 'react';
import { Transforms, Editor as SlateEditor } from 'slate';
import { ReactEditor } from 'slate-react';

const useAndroidHack = (editor) => {
  const lastComposeData = useRef(null);

  const onDOMBeforeInput = useCallback(
    (e) => {
      switch (e.inputType) {
        case 'insertCompositionText': {
          // We need to push each composition event so we can apply it when finished
          if (!lastComposeData.current) {
            lastComposeData.current = [];
          }
          try {
            // We need to convert the selection right away, as the window.getSelection() will change with the window
            const selection = window.getSelection();
            const sel = ReactEditor.toSlateRange(editor, selection);

            // The offsets may not match because the composition text might be far ahead etc...
            sel.anchor.offset = selection.anchorOffset;
            sel.focus.offset = selection.focusOffset;

            lastComposeData.current.push({
              selection: sel,
              value: e.data,
              node: selection?.anchorNode,
              elementNode: selection?.anchorNode?.parentElement.closest(
                '[data-slate-node="element"]',
              ),
            });
          } catch {
            lastComposeData.current = null;
          }
          break;
        }
        case 'insertFromComposition':
        case 'deleteByComposition':
          // If we get this event we don't need to apply any sort of fix, this is the correct event to handle things
          lastComposeData.current = null;
          break;
        default:
          break;
      }
    },
    [editor],
  );

  const onCompositionEnd = useCallback(
    (e) => {
      const { current } = lastComposeData;
      if (current) {
        // Store the current selection so we can move back once we have finished applying queued changes
        // Convert to slate range straight away as the selection can get messed up due to element fixing code
        const {
          anchorNode,
          anchorOffset,
          focusNode,
          focusOffset,
          isCollapsed,
        } = window.getSelection();

        // Apply each of the changes
        for (const c of current) {
          const { selection, value, node, elementNode } = c;
          Transforms.select(editor, selection);
          SlateEditor.insertText(editor, value);

          if (value) {
            // HACK #1 - when a new line is created slate creates a zero-width
            // but actually it will be filled in, this causes slate crashes
            // Have to recreate a full element instead of an empty element in slate
            const el = node.parentElement;
            if (el && el.hasAttribute('data-slate-zero-width')) {
              el.removeAttribute('data-slate-length');
              el.removeAttribute('data-slate-zero-width');
              el.setAttribute('data-slate-string', 'true');
              el.innerText = value;
              const { path, offset } = editor.selection.anchor;
              const p = { path, offset: offset - 1 };
              Transforms.select(editor, { anchor: p, focus: p });
            }
          } else {
            // HACK #2 - when an element is made empty during compose
            // the element is removed from dom, need to add it back
            // as a zero-width element to match
            const textNode = node.parentElement.closest(
              '[data-slate-node="text"]',
            );
            const el = node.parentElement;
            if (
              elementNode &&
              textNode &&
              el &&
              elementNode.children.length === 1 &&
              elementNode.children[0].nodeName === 'BR'
            ) {
              el.innerHTML = '&#65279;';
              el.setAttribute('data-slate-length', '0');
              el.setAttribute('data-slate-zero-width', 'n');
              el.removeAttribute('data-slate-string');
              elementNode.replaceChild(textNode, elementNode.children[0]);
            }
          }
        }

        lastComposeData.current = null;

        // Move back to existing selection
        try {
          const ss = ReactEditor.toSlateRange(editor, {
            startContainer: anchorNode,
            startOffset: anchorOffset,
            endContainer: focusNode,
            endOffset: focusOffset,
            collapsed: isCollapsed,
          });
          // Small fixup again
          ss.anchor.offset = anchorOffset;
          ss.focus.offset = focusOffset;
          Transforms.select(editor, ss);

          // Reset the dom selection as well... this can get out of alignment
          const sel = window.getSelection();
          sel.removeAllRanges();
          const newDomRange = ReactEditor.toDOMRange(editor, ss);
          if (newDomRange) {
            sel.addRange(newDomRange);
          }
        } catch {}
      }

      // Prevent slate from doing anything
      // This prevents the hack that is currently in onCompositionEnd that doesn't work
      e.data = null;
    },
    [editor],
  );

  return {
    onCompositionEnd,
    onDOMBeforeInput,
  };
};

export default useAndroidHack;
