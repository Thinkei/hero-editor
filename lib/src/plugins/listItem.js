import { createPlugin, makeRenderElement } from '../helpers';

const name = 'list-item';

const renderElement = makeRenderElement(name, ({ attributes, children }) => (
  <li {...attributes}>{children}</li>
));

export default createPlugin({
  name,
  renderElement,
});
