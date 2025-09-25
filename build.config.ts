import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  clean: true,
  declaration: true,
  externals: ['rollup', 'vite', 'minimatch', '@isaacs/brace-expansion', '@isaacs/balanced-match'],
  failOnWarn: false,
  rollup: {
    emitCJS: true,
  },
});
