import { render } from '@testing-library/react';
import underline from '../underline';
import { createPlugin, renderDefaultLeaf } from '../../helpers';

describe('plugin underline', () => {
  it('is a plugin object', () => {
    for (const prop in createPlugin()) {
      expect(underline()[prop]).toBeDefined();
    }
  });

  it('renders u element', () => {
    const { baseElement } = render(
      underline().renderLeaf(renderDefaultLeaf)({
        leaf: { underline: true },
        children: 'Underlined text',
      }),
    );
    expect(baseElement).toMatchSnapshot();
  });
});
