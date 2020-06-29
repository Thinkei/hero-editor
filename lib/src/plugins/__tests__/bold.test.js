import { render } from '@testing-library/react';
import bold from '../bold';
import { createPlugin, renderDefaultLeaf } from '../../helpers';

describe('plugin bold', () => {
  it('is a plugin object', () => {
    for (const prop in createPlugin()) {
      expect(bold()[prop]).toBeDefined();
    }
  });

  it('renders strong element', () => {
    const { baseElement } = render(
      bold().renderLeaf(renderDefaultLeaf)({
        leaf: { bold: true },
        children: 'Bold text',
      }),
    );
    expect(baseElement).toMatchSnapshot();
  });
});
