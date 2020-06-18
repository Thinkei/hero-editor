import React from 'react';
import { render } from '@testing-library/react';
import { compose, composeRenderLeaf, makeRenderLeaf } from '../index';
import { bold, italic, underline } from '../../plugins';

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
    const renderLeaf = composeRenderLeaf([bold, italic, underline]);
    const { baseElement } = render(
      renderLeaf({
        leaf: { bold: true, italic: true, underline: true },
        children: 'Rich text',
      }),
    );
    expect(baseElement).toMatchSnapshot();
  });
});
