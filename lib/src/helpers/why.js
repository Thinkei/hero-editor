// lmao
const y = (f) =>
  ((g) => (...a) => f(g(g))(...a))((g) => (...a) => f(g(g))(...a));

export default y;
