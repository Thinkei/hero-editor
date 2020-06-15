import { makeRenderLeaf } from '../helpers';

const renderLeaf = makeRenderLeaf('debugger', () => null);

const handleMessage = () =>
  window.addEventListener('message', (event) => {
    if (event.data.type?.startsWith('hero-editor/')) {
      console.group(`%c ${event.data.type} `, 'color: limegreen;');
      console.log({
        data: event.data.data,
        event,
      });
      console.groupEnd();
    }
  });

const ToolbarButton = () => null;

export default { renderLeaf, handleMessage, ToolbarButton };
