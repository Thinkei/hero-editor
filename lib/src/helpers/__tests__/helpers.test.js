import React from 'react';
import { render } from '@testing-library/react';
import { bold, italic, underline } from '../../plugins';
import {
  compose,
  flow,
  composeRenderLeaf,
  makeRenderLeaf,
  getUrl,
  isEmptyContent,
} from '../index';

describe('isEmptyContent', () => {
  it.each`
    content                                                            | result
    ${undefined}                                                       | ${false}
    ${null}                                                            | ${false}
    ${[]}                                                              | ${false}
    ${[{ type: 'image' }]}                                             | ${false}
    ${[{ type: 'paragraph' }]}                                         | ${false}
    ${[{ type: 'paragraph', children: [] }]}                           | ${false}
    ${[{ type: 'paragraph', children: [{ text: 'foo' }] }]}            | ${false}
    ${[{ type: 'paragraph', children: [{ text: '' }] }]}               | ${true}
    ${[{ type: 'paragraph', children: [{ text: '' }, { text: '' }] }]} | ${false}
  `('checks if content is empty', ({ content, result }) => {
    expect(isEmptyContent(content)).toEqual(result);
  });
});

describe('getUrl', () => {
  it('gets URL from link node', () => {
    const node = {
      type: 'link',
      children: [
        {
          text: 'http://',
        },
        {
          text: 'google.com',
          bold: true,
        },
      ],
    };
    expect(getUrl(node)).toEqual('http://google.com');
    expect(getUrl(undefined)).toEqual(null);
    expect(getUrl({})).toEqual(null);
  });
});

describe('compose', () => {
  it('composes functions', () => {
    expect(
      compose(
        (x) => x + 1,
        undefined,
        (x) => x * 2,
      )(10),
    ).toEqual(21);
  });
});

describe('flow', () => {
  it('... composes functions, too', () => {
    expect(
      flow(
        (x) => x + 1,
        undefined,
        (x) => x * 2,
      )(10),
    ).toEqual(22);
  });
});

describe('makeRenderLeaf', () => {
  it('does not block the next render', () => {
    const renderLeaf = makeRenderLeaf('foo', 'code');
    const next = jest.fn();
    renderLeaf(next)({
      leaf: { foo: true },
      children: 'baz',
    });
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith({
      leaf: { foo: true },
      children: <code leaf={{ foo: true }}>baz</code>,
    });
  });
});

describe('composeRenderLeaf', () => {
  it('renders nested leaf nodes in correct order', () => {
    const renderLeaf = composeRenderLeaf([bold(), italic(), underline()]);
    const { baseElement } = render(
      renderLeaf({
        leaf: { bold: true, italic: true, underline: true },
        children: 'Rich text',
      }),
    );
    expect(baseElement).toMatchSnapshot();
  });
});
