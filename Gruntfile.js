/*
 * grunt-jsonschema-ajv
 * https://github.com/SignpostMarv/grunt-jsonschema-ajv
 *
 * Copyright (c) 2016 SignpostMarv
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function Gruntfile(grunt) {
  var jsonSchemaTestSuite = 'node_modules/json-schema-test-suite/tests';
  // Project configuration.
  grunt.initConfig({
    eslint: {
      options: {
        configFile: '.eslintrc',
      },
      Gruntfile: [
        'Gruntfile.js',
      ],
      tasks: [
        'tasks/*.js',
      ],
    },
    jsonschema: {
      draft4: {
        files: [
          {
            expand: true,
            src: jsonSchemaTestSuite + '/draft4/*.json',
          },
          {
            expand: true,
            src: jsonSchemaTestSuite + '/draft4/optional/*.json',
          },
        ],
      },
    },
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-eslint');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['eslint', 'jsonschema']);
};
