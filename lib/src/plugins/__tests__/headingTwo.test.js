import { render } from '@testing-library/react';
import headingTwo from '../headingTwo';
import { createPlugin, renderDefaultElement } from '../../helpers';

describe('headingTwo plugin', () => {
  it('is a plugin object', () => {
    for (const prop in createPlugin()) {
      expect(headingTwo()[prop]).toBeDefined();
    }
  });

  it('renders h2 element', () => {
    const { baseElement } = render(
      headingTwo().renderElement(renderDefaultElement)({
        element: { type: 'heading-two' },
        children: 'Heading two',
      }),
    );
    expect(baseElement).toMatchSnapshot();
  });
});
