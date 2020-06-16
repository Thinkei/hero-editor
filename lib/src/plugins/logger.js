import { createPlugin } from '../helpers';

const name = 'logger';

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

export default createPlugin({ name, handleMessage });
