const flow = (...funcs) => (arg) =>
  funcs.reduce((composed, f) => (f ? f(composed) : composed), arg);

export default flow;
