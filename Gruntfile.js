"use strict";

module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    less: {
      style: {
        files: {
          "build/css/style.css": "less/style.less"
        }
      }
    },

    postcss: {
      style: {
        options: {
          processors: [
          require("autoprefixer")({browsers: [
            "last 2 versions"
          ]}),
          require("css-mqpacker")({
            sort: false
          })
          ]
        },
        src: "build/css/*.css"
      }
    },

    csso: {
      style: {
        options: {
          report: "gzip"
        },
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3,
          progressice: true
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg,gif}"]
        }]
      }
    },

    svgstore: {
      options: {
        svg: {
          style: "display: none"
        }
      },
      symbols: {
        files: {
          "build/img/symbols.svg": ["img/*.svg"]
        }
      }
    },

    svgmin: {
      symbols: {
        files: [{
          expand: true,
          src: ["build/img/*.svg"]
        }]
      }
    },

    copy: {
      build: {
        files: [{
            expand: true,
              src: [
                "fonts/**/*.{woff,woff2}",
                "img/**",
                "js/**",
                "*.html"
              ],
              dest: "build"
            }]
          },
          html: {
            files: [{
              expand: true,
              src: ["*.html"],
              dest: "build"
            }]
          }
      },

    clean: {
      build: ["build"]
    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
          "build/*.html",
          "build/css/*.css"
          ]
        },
        options: {
          server: "build/",
          watchTask: true,
          notify: false,
          open: true,
          cors: true,
          ui: false
        }
      }
    },

    watch: {

      html: {
        files: ["*.html"],
        tasks: ["copy:html"]
      },

      style: {
        files: ["less/**/*.less"],
        tasks: ["less", "postcss", "csso"]
      }
    }
  });

  grunt.registerTask("serve", ["browserSync", "watch"]);
  grunt.registerTask("symbols", ["svgmin", "svgstore"]);

    grunt.registerTask("build", [
    "clean",
    "copy",
    "less",
    "postcss",
    "csso",
    "symbols",
    "imagemin"
  ]);
};
