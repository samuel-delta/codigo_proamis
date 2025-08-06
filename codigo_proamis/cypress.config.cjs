const { defineConfig } = require('cypress');
const webpack = require('@cypress/webpack-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/features/**/*.feature',
    supportFile: './cypress/support/e2e.js',

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      const bundler = webpack({
        webpackOptions: {
          resolve: {
            extensions: ['.js'],
            alias: {
              '@pages': path.resolve(__dirname, 'cypress/support/pages'),
            },
          },
          module: {
            rules: [
              {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                  },
                },
              },
              {
                test: /\.feature$/,
                use: [
                  {
                    loader: '@badeball/cypress-cucumber-preprocessor/webpack',
                    options: config,
                  },
                ],
              },
            ],
          },
        },
      });

      on('file:preprocessor', bundler);

      // Agora com o import corrigido
      const { readPDF, readTXT, readExcel, deleteDownloads } = require('./cypress/node_tasks.cjs');

      on('task', {
        readPDF,
        readTXT,
        readExcel,
        deleteDownloads,
      });

      config.env.stepDefinitions = 'cypress/e2e/step_definitions/**/*.js';
      return config;
    },
    baseUrl: 'https://homolog.sistemas.df.gov.br',
  },
});
