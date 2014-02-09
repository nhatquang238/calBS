module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			options: {
				livereload: true
			},
			sass: {
				files: ['sass/**/*.{scss,sass}','sass/_partials/**/*.{scss,sass}'],
				tasks: ['sass:dist']
			},
			livereload: {
				files: ['public/*.html', 'sass/*.scss', 'public/js/**/*.{js,json}', 'public/css/*.css','img/**/*.{png,jpg,jpeg,gif,webp,svg}']
			}
		},
		sass: {
			dist: {
				files: {
					'public/css/main.css': 'sass/main.scss'
				}
			}
		}
	});
	grunt.registerTask('default', ['sass:dist', 'watch']);
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-reload');
};