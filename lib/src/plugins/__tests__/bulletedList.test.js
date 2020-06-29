import { createEditor } from 'slate';
import { render, waitFor } from '@testing-library/react';
import bulletedList from '../bulletedList';
import {
  createPlugin,
  renderDefaultElement,
  postMessage,
  withId,
} from '../../helpers';

describe('bulletedList plugin', () => {
  it('is a plugin object', () => {
    for (const prop in createPlugin()) {
      expect(bulletedList[prop]).toBeDefined();
    }
  });

  it('renders ul element', () => {
    const { baseElement } = render(
      bulletedList.renderElement(renderDefaultElement)({
        element: { type: 'bulleted-list' },
        children: 'Bulleted list',
      }),
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('handles bulleted-list message properly', async () => {
    const editor = withId('sample')(createEditor());
    bulletedList.handleMessage(editor);
    editor.insertNode({
      type: 'paragraph',
      children: [
        {
          text: 'A line of text',
        },
      ],
    });
    postMessage('bulleted-list', {}, editor);
    await waitFor(() => {
      expect(editor.children).toEqual([
        {
          type: 'bulleted-list',
          children: [
            {
              type: 'list-item',
              children: [
                {
                  text: 'A line of text',
                },
              ],
            },
          ],
        },
      ]);
    });
  });
});
