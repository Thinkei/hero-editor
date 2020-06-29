import { createEditor } from 'slate';
import { render, waitFor, act } from '@testing-library/react';
import editorPlaceholder from '../editorPlaceholder';
import { createPlugin, withId } from '../../helpers';

const sleep = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

describe('editorPlaceholder plugin', () => {
  it('is a plugin object', () => {
    for (const prop in createPlugin()) {
      expect(
        editorPlaceholder({ value: 'Write something...' })[prop],
      ).toBeDefined();
    }
  });

  it('debounces render', async () => {
    const editor = withId('sample')(createEditor());
    const plugin = editorPlaceholder({
      value: 'Write something...',
    });

    editor.insertNode({
      type: 'paragraph',
      children: [
        {
          text: '',
        },
      ],
    });

    const { queryByText, rerender } = render(plugin.renderCustom(editor));

    expect(queryByText('Write something...')).not.toBe(null);

    editor.insertText('Hello');

    rerender(plugin.renderCustom(editor));

    expect(queryByText('Write something...')).not.toBe(null);

    await waitFor(() => {
      expect(queryByText('Write something...')).toBe(null);
    });
  });

  it('leading-debounces render', async () => {
    const editor = withId('sample')(createEditor());
    const plugin = editorPlaceholder({
      value: 'Write something...',
    });

    editor.insertNode({
      type: 'paragraph',
      children: [
        {
          text: '',
        },
      ],
    });

    const { queryByText, rerender } = render(plugin.renderCustom(editor));

    expect(queryByText('Write something...')).not.toBe(null);

    // wait for the cache to be invalidated
    await act(async () => await sleep(1000));

    editor.insertText('Hello');

    rerender(plugin.renderCustom(editor));

    expect(queryByText('Write something...')).toBe(null);
  });
});
