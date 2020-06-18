const compose = (...funcs) => (arg) =>
  funcs.reduceRight((composed, f) => (f ? f(composed) : composed), arg);

export default compose;
