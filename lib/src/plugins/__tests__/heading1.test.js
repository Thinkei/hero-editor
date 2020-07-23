import { render } from '@testing-library/react';
import h1 from '../heading1';
import { createPlugin, renderDefaultLeaf } from '../../helpers';

describe('plugin h1', () => {
  it('is a plugin object', () => {
    for (const prop in createPlugin()) {
      expect(h1()[prop]).toBeDefined();
    }
  });

  it('renders strong element', () => {
    const { baseElement } = render(
      h1().renderLeaf(renderDefaultLeaf)({
        leaf: { h1: true },
        children: 'Heading 1',
      }),
    );
    expect(baseElement).toMatchSnapshot();
  });
});
