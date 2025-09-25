# Lingui Vite Plugin

Vite plugin for [Lingui Laravel](https://github.com/linguijs/lingui-laravel).

```ts
import { lingui } from '@linguijs/vite-plugin-lingui';

export default defineConfig({
  plugins: [
    lingui(),
    // ...
  ],
});
```

All options have sensible defaults, but should you need to customize anything:

```ts
import { lingui } from '@linguijs/vite-plugin-lingui';

export default defineConfig({
  plugins: [
    lingui({
      outPath: 'my/custom/path/to/output/lang/files',
      command: 'herd php artisan lingui:make-json',
    }),
    // ...
  ],
});
```
