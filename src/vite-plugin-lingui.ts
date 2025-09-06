import type { Plugin, HmrContext } from "vite";
import type { PluginContext } from "rollup";
import osPath from "path";
import { minimatch } from "minimatch";
import { promisify } from "util";
import { exec } from "child_process";

const execAsync = promisify(exec);

let context: PluginContext;

interface LinguiOptions {
  langPath?: string;
  command?: string;
}

export const lingui = ({
  langPath = "lang",
  command = "php artisan lingui:make-json",
}: LinguiOptions = {}): Plugin => {
  const args: string[] = [];

  if (langPath) {
    args.push(langPath);
  }

  const runCommand = async () => {
    try {
      await execAsync(`${command} ${args.join(" ")}`);
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
      if (shouldRun(langPath, { file, server })) {
        await runCommand();
      }
    },
  };
};

const shouldRun = (
  path: string,
  opts: Pick<HmrContext, "file" | "server">,
): boolean => {
  const file = opts.file.replaceAll("\\", "/");
  const patterns = [`${path}/**/*.php`, `${path}/*.json`];

  return patterns.some((pattern) => {
    pattern = osPath
      .resolve(opts.server.config.root, pattern)
      .replaceAll("\\", "/");

    return minimatch(file, pattern);
  });
};
