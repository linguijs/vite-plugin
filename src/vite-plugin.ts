import type { Plugin, HmrContext } from 'vite';
import type { PluginContext } from 'rollup';
import osPath from 'path';
import { minimatch } from 'minimatch';
import { promisify } from 'util';
import { exec } from 'child_process';

interface LinguiOptions {
  /**
   * The PHP Artisan command.
   * @default 'php artisan lingui:make-json'
   */
  command?: string;
  /**
   * Set what locales should be generated (if not specified, all will be generated).
   * @default undefined
   */
  locales?: string[];
  /**
   * Set the output folder directory.
   * @default 'public/lang'
   */
  outPath?: string;
  /**
   * Set the lang folder directory.
   * @default 'lang'
   */
  langPath?: string;
}

let context: PluginContext;

const execAsync = promisify(exec);

const shouldRunCommand = (patterns: string[], opts: Pick<HmrContext, 'file' | 'server'>): boolean => {
  const file = opts.file.replaceAll('\\', '/');
  return patterns.some((pattern) => {
    pattern = osPath.resolve(opts.server.config.root, pattern).replaceAll('\\', '/');

    return minimatch(file, pattern);
  });
};

export const lingui = ({
  outPath,
  locales,
  langPath = 'lang',
  command = 'php artisan lingui:make-json',
}: LinguiOptions = {}): Plugin => {
  const patterns = [`${langPath}/**/*.php`, `${langPath}/*.json`];

  const args: string[] = [];

  if (langPath) {
    args.push(`--lang-path=${langPath}`);
  }

  if (outPath) {
    args.push(`--out-path=${outPath}`);
  }

  if (locales?.length) {
    args.push(...locales.map((l) => `--locale=${l}`));
  }

  const runCommand = async (options?: { locales?: string[] }) => {
    try {
      if (options?.locales?.length) {
        args.push(...options.locales.map((l) => `--locale=${l}`));
      }

      const commandOutput = await execAsync(`${command} ${args.join(' ')}`);

      if (commandOutput.stderr) {
        context.error(commandOutput.stderr);
      }

      context.info(commandOutput.stdout);
    } catch (error) {
      context.error(`Error while executing command: "${error}"`);
    }
  };

  return {
    name: '@linguijs/vite-plugin-lingui',
    enforce: 'pre',
    buildStart() {
      context = this;

      return runCommand();
    },
    async handleHotUpdate({ file, server }) {
      if (shouldRunCommand(patterns, { file, server })) {
        const matched = file.match(/\/lang\/([^\/]+)/);
        const locales = matched ? [matched[1].replace(/\.json$/, '')] : [];

        runCommand({ locales });
      }
    },
  };
};
