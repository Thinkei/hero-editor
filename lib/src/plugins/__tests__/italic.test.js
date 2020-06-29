import { render } from '@testing-library/react';
import italic from '../italic';
import { createPlugin, renderDefaultLeaf } from '../../helpers';

describe('plugin italic', () => {
  it('is a plugin object', () => {
    for (const prop in createPlugin()) {
      expect(italic()[prop]).toBeDefined();
    }
  });

  it('renders em element', () => {
    const { baseElement } = render(
      italic().renderLeaf(renderDefaultLeaf)({
        leaf: { italic: true },
        children: 'Italic text',
      }),
    );
    expect(baseElement).toMatchSnapshot();
  });
});
