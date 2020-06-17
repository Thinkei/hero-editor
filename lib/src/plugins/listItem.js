import { createPlugin, makeRenderElement } from '../helpers';

const name = 'list-item';

const renderElement = makeRenderElement(name, 'li');

export default createPlugin({
  name,
  renderElement,
});
