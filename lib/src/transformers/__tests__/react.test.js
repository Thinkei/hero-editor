import { render } from '@testing-library/react';
import { defaultReactTransformer } from '../react';

describe('reactTransformer', () => {
  it('works properly', () => {
    const { baseElement } = render(defaultReactTransformer(value));
    expect(baseElement).toMatchSnapshot();
  });
});

const value = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'A',
        bold: true,
        underline: true,
      },
      {
        text: ' ',
        underline: true,
      },
      {
        text: 'paragraph',
        italic: true,
        underline: true,
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'This is a mention ',
      },
      {
        type: 'mention',
        data: {
          id: 1,
          name: 'Toan Nguyen',
        },
        children: [
          {
            text: '',
          },
        ],
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'bulleted-list',
    children: [
      {
        type: 'list-item',
        children: [
          {
            text: 'Item 1',
          },
        ],
      },
      {
        type: 'list-item',
        children: [
          {
            text: 'Item 2',
          },
        ],
      },
    ],
  },
  {
    type: 'numbered-list',
    children: [
      {
        type: 'list-item',
        children: [
          {
            text: 'Item 1',
          },
        ],
      },
      {
        type: 'list-item',
        children: [
          {
            text: 'Item 2',
          },
        ],
      },
    ],
  },
];
