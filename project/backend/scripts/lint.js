const path = require('path');
const { ESLint } = require('eslint');
const js = require('@eslint/js');
const globals = require('globals');

const backendPath = path.resolve(__dirname, '..');
const frontendPath = path.resolve(backendPath, '../frontend');

const run = async () => {
  const backendEslint = new ESLint({ cwd: backendPath });
  const frontendEslint = new ESLint({
    cwd: frontendPath,
    overrideConfigFile: true,
    overrideConfig: [
      js.configs.recommended,
      {
        languageOptions: {
          ecmaVersion: 2022,
          sourceType: 'script',
          globals: globals.browser,
        },
      },
    ],
  });

  const results = [
    ...(await backendEslint.lintFiles(['src', 'tests', 'scripts'])),
    ...(await frontendEslint.lintFiles(['app.js'])),
  ];
  const formatter = await backendEslint.loadFormatter('stylish');
  const output = formatter.format(results);
  if (output) process.stdout.write(output);

  if (results.some((result) => result.errorCount > 0)) {
    process.exitCode = 1;
  }
};

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
