import { render } from '@testing-library/react';
import headingOne from '../headingOne';
import { createPlugin, renderDefaultElement } from '../../helpers';

describe('headingOne plugin', () => {
  it('is a plugin object', () => {
    for (const prop in createPlugin()) {
      expect(headingOne()[prop]).toBeDefined();
    }
  });

  it('renders h1 element', () => {
    const { baseElement } = render(
      headingOne().renderElement(renderDefaultElement)({
        element: { type: 'heading-one' },
        children: 'Heading one',
      }),
    );
    expect(baseElement).toMatchSnapshot();
  });
});
