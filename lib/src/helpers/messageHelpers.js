const messagePrefix = '@hero-editor';

const addMessageListener = (type, callback) => (editor) => {
  const listener = (event) => {
    if (event.data.type === `${messagePrefix}/${editor.id}/${type}`) {
      callback({ editor, data: event.data.data });
    }
  };
  window.addEventListener('message', listener);
  return () => window.removeEventListener('message', listener);
};

const postMessage = (type, data, editor) =>
  window.postMessage({
    type: `${messagePrefix}/${editor.id}/${type}`,
    data,
  });

export { addMessageListener, postMessage };