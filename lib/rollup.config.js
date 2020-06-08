import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/index',
  output: {
    file: 'lib.js',
    format: 'commonjs',
  },
  plugins: [
    resolve(),
    babel({
      // TODO: change to 'runtime'
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      babelrc: false,
      presets: ['@babel/preset-react'],
    }),
  ],
  external: [
    'react',
  ],
};
