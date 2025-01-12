// rollup.config.js

import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs'; // Add the CommonJS plugin

export default {
  input: 'src/main.jsx',  // Your main.jsx is the entry point here
  output: {
    file: 'dist/bundle.js',  // The bundled file output
    format: 'esm',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },
  external: ['react', 'react-dom'],  // Exclude react and react-dom from the bundle
  plugins: [
    replace({
      'use client': '',  // Handle any replacements if needed
      preventAssignment: true,
    }),
    resolve({
      extensions: ['.js', '.jsx'],  // Resolving .jsx files
    }),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: ['@babel/plugin-transform-react-jsx'],
      babelHelpers: 'bundled',
    }),
    postcss({
      extensions: ['.css'],  // Process CSS files
    }),
    json(),  // Allow JSON imports
    commonjs(), // No need for namedExports option anymore
  ],
};
