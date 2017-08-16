module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: { //css压缩
      target: {
        files: [{
          expand: true,
          cwd: 'dist/css/',
          src: ['app.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    },
    less: {
      development: {
        files: [{
          expand: true,//启用以下选项
          cwd: 'less',//待编译文件夹
          src: ['**/*.less'],//匹配cwd目录下所有以less为后缀的文件
          dest: 'dist/css/component/',//编译输出目录
          ext: '.css'//编译后文件的后缀名
        }]
      }
    },
    imagemin: { //压缩图片大小
      dist: {
        options: {
          optimizationLevel: 3 //定义 PNG 图片优化水平
        },
        files: [{
          expand: true,
          cwd: 'img',
          src: ['**/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
          dest: 'dist/img' // 优化后的图片保存位置
        }]
      }
    },
    concat: { //合并文件
      options: {
        banner: '/**V1.0 doctor only css file **/'
      },
      dist: {
        src: 'dist/css/component/**.css',
        dest: 'dist/css/app.css'
      }
    },
    watch: { //检测文件是否有改动
      scripts: {
        files: [
          'less/**.less',
          'img/*.{png,jpg,jpeg}'
        ],
        tasks: [ 'less','concat','cssmin','imagemin'],
        options: {
          interrupt: true
        }
      }
    }
  });

  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['less','concat','cssmin','imagemin','watch']);
};