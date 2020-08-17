import { render } from '@testing-library/react';
import headingTwo from '../headingOne';
import { createPlugin, renderDefaultElement } from '../../helpers';

describe('headingTwo plugin', () => {
  it('is a plugin object', () => {
    for (const prop in createPlugin()) {
      expect(headingTwo()[prop]).toBeDefined();
    }
  });

  it('renders h1 element', () => {
    const { baseElement } = render(
      headingTwo().renderElement(renderDefaultElement)({
        element: { type: 'heading-two' },
        children: 'Heading Two',
      }),
    );
    expect(baseElement).toMatchSnapshot();
  });
});
