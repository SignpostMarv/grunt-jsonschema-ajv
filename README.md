# grunt-jsonschema-ajv [![Build Status](https://travis-ci.org/SignpostMarv/grunt-jsonschema-ajv.svg?branch=master)](https://travis-ci.org/SignpostMarv/grunt-jsonschema-ajv)

> Grunt plugin for validating files against JSON Schema with ajv

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jsonschema-ajv --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jsonschema-ajv');
```

## The "jsonschema" task

### Overview
In your project's Gruntfile, add a section named `jsonschema` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  jsonschema: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options
See [epoberezkin/ajv](https://github.com/epoberezkin/ajv#options)

### Usage Examples


```js
grunt.initConfig({
  jsonschema: {
    tests: {
      files: {
        'tests.schema.json': 'tests/*.json',
      },
    }
  },
});
```

## Contributing
[airbnb/legacy](https://github.com/airbnb/javascript/tree/master/es5) is used
as a style guide, with the exception of 2-space indentation and 79 character
line lengths (because reasons).
Add unit tests for any new or changed functionality where possible.
Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
