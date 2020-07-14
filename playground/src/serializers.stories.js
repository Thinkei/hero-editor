import React from 'react';
import { plainSerializer, defaultReactTransformer } from 'hero-editor';

export default { title: '(De)serializers' };

export const plainText = () => (
  <div style={{ fontFamily: 'sans-serif', whiteSpace: 'pre-wrap' }}>
    {plainSerializer(value)}
  </div>
);

export const react = () => (
  <div style={{ fontFamily: 'sans-serif' }}>
    {defaultReactTransformer(value)}
  </div>
);

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
        text: 'This is a link ',
      },
      {
        type: 'link',
        data: {
          url: 'https://google.com',
        },
        children: [
          {
            text: 'https://',
          },
          {
            text: 'google',
            bold: true,
          },
          {
            text: '.com',
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
