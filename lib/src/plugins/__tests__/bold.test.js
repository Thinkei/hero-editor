import { render } from '@testing-library/react';
import bold from '../bold';
import { renderDefaultLeaf } from '../../helpers';

describe('plugin bold', () => {
  it('is a plugin object', () => {
    expect(typeof bold.renderLeaf).toBe('function');
  });

  it('renders bold element', () => {
    const { baseElement } = render(
      bold.renderLeaf(renderDefaultLeaf)({
        leaf: { bold: true },
        children: 'Bold text',
      }),
    );
    expect(baseElement).toMatchSnapshot();
  });
});
