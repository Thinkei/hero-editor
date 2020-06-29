import { createPlugin } from '../helpers';

const name = 'logger';

const isEmpty = (object) => object && Object.keys(object).length < 1;

const handleMessage = () => {
  const listener = (event) => {
    if (event.data.type?.startsWith('@hero-editor')) {
      const groupMethod = isEmpty(event.data.data) ? 'groupCollapsed' : 'group';
      console[groupMethod](`%c ${event.data.type} `, 'color: limegreen;');
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

export default () => createPlugin({ name, handleMessage });
