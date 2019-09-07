/*
 * grunt-jsonschema-ajv
 * https://github.com/SignpostMarv/grunt-jsonschema-ajv
 *
 * Copyright (c) 2016 SignpostMarv
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function exportAjvTask(grunt) {
  var _ajv = module.require('ajv');
  grunt.registerMultiTask(
    'jsonschema',
    'Check if schema is valid',
    function ajvMultiTask() {
      var self = this;
      var ajv = _ajv(this.options({
        allErrors: true,
        verbose: true,
      }));
      this.files.forEach(function foreachFile(f) {
        var schema;
        var validate;
        var validateSchema = f.src.indexOf(f.dest) === -1;
        if (validateSchema) {
          grunt.log.writeln('Checking if schmea exists...');
          if (!grunt.file.exists(f.dest) || grunt.file.isDir(f.dest)) {
            grunt.fail.warn(
              self.target +
              ' has missing schema: "' +
              f.dest +
              '"'
            );
            return false;
          }
          try {
            schema = grunt.file.readJSON(f.dest);
            validate = ajv.compile(schema);
          } catch (err) {
            grunt.log.errorlns(err.message);
            grunt.fail.warn(
              'Schema "' +
              f.dest +
              '" is invalid!'
            );
            return false;
          }
        } else {
          validate = ajv.compile({
            $schema: 'http://json-schema.org/draft-04/schema#',
          });
        }
        f.src.filter(function filterSrc(filepath) {
          if (!grunt.file.exists(filepath)) {
            grunt.log.warn(
              'File to validate "' +
              filepath +
              '" does not exist!'
            );
            return false;
          } else if (grunt.file.isDir(filepath)) {
            grunt.log.warn(
              'File to validate "' +
              filepath +
              '" is a directory!'
            );
          }
          return true;
        }).map(function validateFiles(filepath) {
          var filePathJson = grunt.file.readJSON(filepath);
          if (validateSchema) {
            if (validate(filePathJson) === false) {
              grunt.log.errorlns(
                'File "' +
                filepath +
                '" does not validate against schema "' +
                f.dest +
                '"'
              );
              validate.errors.forEach(function feErrors(err) {
                Object.keys(err).forEach(function feErr(errKey) {
                  var errOut = err[errKey];
                  if (errKey === 'parentSchema') {
                    errOut = err[errKey].$schema;
                  } else if (typeof(errOut) === 'object') {
                    errOut = JSON.stringify(errOut, null, '\t');
                  }
                  grunt.log.errorlns(errKey + ': ' + errOut);
                });
              });
            } else {
              grunt.log.oklns(
                'File "' +
                filepath +
                '" validates against schema "' +
                f.dest +
                '"'
              );
            }
          }
        });
      });
    }
  );
};
