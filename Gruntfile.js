// Generated on 2016-03-29 using generator-web-data-connector 1.0.1

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'js/*.js',
        '!js/scripts.min.js'
      ]
    },
    concat: {
      js: {
        options: {
          separator: ';'
        },
        src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/tether/dist/js/tether.js',
          'bower_components/tableau/dist/*.js',
          'bower_components/bootstrap/dist/js/bootstrap.js',
          'bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.js',
          'src/wrapper.js',
          'src/**/*.js'
        ],
        dest: 'build/all.js'
      }
    },
    uglify: {
      options: {
        compress: true,
        mangle: true,
        sourceMap: true
      },
      target: {
        src: 'build/all.js',
        dest: 'build/all.min.js'
      }
    },
    connect: {
      server: {
        options: {
          base: './',
          port: 9001
        }
      }
    },
    watch: {
      scripts: {
        files: 'src/**/*.js',
        tasks: [
          'jshint',
          'concat',
          'uglify'
        ]
      }
    },
    'gh-pages': {
      options: {
        base: '.'
      },
      src: ['**'],
      travisDeploy: {
        options: {
          user: {
            name: 'Travis Deployment',
            email: 'noreply@travis-ci.org'
          },
          repo: 'https://' + process.env.GITHUB_ACCESS_TOKEN + '@github.com/Webtrends/tableau-infinity-wdc.git',
          message: 'Auto-deploy via Travis CI',
          silent: true
        },
        src: ['**']
      }
    },
    release: {
      options: {
        npm: false, //default: true
        github: {
          repo: 'Webtrends/tableau-infinity-wdc', //put your user/repo here
          accessTokenVar: 'GITHUB_ACCESS_TOKEN', //ENVIRONMENT VARIABLE that contains GitHub Access Token
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-release');

  grunt.registerTask('default', [
    'build',
    'run'
  ]);

  grunt.registerTask('run', [
    'connect:server',
    'watch'
  ]);

  grunt.registerTask('build', [
    'jshint',
    'concat',
    'uglify'
  ]);

  grunt.registerTask('deploy', [
    'build',
    'gh-pages'
  ]);

  grunt.registerTask('autoDeploy', [
    'build',
    'gh-pages:travisDeploy'
  ]);
};
