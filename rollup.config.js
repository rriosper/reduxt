import typescript from "rollup-plugin-typescript2";

const joinPath = (path) => input => `./${path}/${input}`; 
const joinDistPath = joinPath('dist');
const joinSrcPath = joinPath('src');


export default {
  input: joinSrcPath("index.ts"),
  output : [
    {
        file : joinDistPath('lib.js'),
        format: 'cjs',
    },
    {
        file : joinDistPath('lib.es.js'),
        format: 'es',
    }
  ],
  plugins: [
    typescript(require('typescript'))
  ]
};
