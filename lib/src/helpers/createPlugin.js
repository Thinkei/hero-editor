const createPlugin = (configs) => {
  const defaultPlugin = {
    name: '',
    renderLeaf: (next) => (props) => next(props),
    renderElement: (next) => (props) => next(props),
    ToolbarButton: () => null,
    renderCustom: () => null,
    handleMessage: () => () => {},
    enhanceEditor: (editor) => editor,
  };
  return { ...defaultPlugin, ...configs };
};

export default createPlugin;
