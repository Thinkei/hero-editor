import { makeRenderLeaf } from '../helpers';

const renderLeaf = makeRenderLeaf('debugger', () => null);

const handleMessage = () => {
  const listener = (event) => {
    if (event.data.type?.startsWith('@hero-editor')) {
      console.group(`%c ${event.data.type} `, 'color: limegreen;');
      console.log({
        data: event.data.data,
        event,
      });
      console.groupEnd();
    }
  };
  window.addEventListener('message', listener);
  return () => window.removeEventListener('message', listener);
};

const ToolbarButton = () => null;

export default { renderLeaf, handleMessage, ToolbarButton };
