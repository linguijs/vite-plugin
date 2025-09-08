import type { Plugin, HmrContext } from "vite";
import type { PluginContext } from "rollup";
import osPath from "path";
import { minimatch } from "minimatch";
import { promisify } from "util";
import { exec } from "child_process";

const execAsync = promisify(exec);

let context: PluginContext;

interface CommandOptions {
  locales?: string[];
}

interface LinguiOptions {
  path?: string;
  command?: string;
}

export const lingui = ({
  path = "lang",
  command = "php artisan lingui:make-json",
}: LinguiOptions = {}): Plugin => {
  const runCommand = async ({ locales = [] }: CommandOptions = {}) => {
    try {
      const args: string[] = [];

      if (locales.length > 0) {
        args.push(...locales.map((locale) => `--locale=${locale}`));
      }

      await execAsync(`${command} ${path} ${args.join(" ")}`);
    } catch (error) {
      context.error(`Error executing command: ${error}`);
    }
    context.info("JSON translation files generated in `public/lang` directory");
  };

  return {
    name: "@collaborar/vite-plugin-lingui",
    enforce: "pre",
    buildStart() {
      context = this;
      return runCommand();
    },
    async handleHotUpdate({ file, server }) {
      if (shouldRun(path, { file, server })) {
        await runCommand({
          locales: getLocalesFromPath(file),
        });
      }
    },
  };
};

const getLocalesFromPath = (path: string): string[] => {
  const localeMatch = path.match(/\/lang\/([^\/]+)/);
  const locale = localeMatch
    ? localeMatch[1].replace(/\.json$/, "")
    : undefined;

  return locale ? [locale] : [];
};

const shouldRun = (
  path: string,
  opts: Pick<HmrContext, "file" | "server">,
): boolean => {
  const file = opts.file.replaceAll("\\", "/");
  const patterns = [`${path}/*.json`, `${path}/**/*.php`];

  return patterns.some((pattern) => {
    pattern = osPath
      .resolve(opts.server.config.root, pattern)
      .replaceAll("\\", "/");

    return minimatch(file, pattern);
  });
};
