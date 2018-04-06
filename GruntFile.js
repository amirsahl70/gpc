module.exports = function(grunt) {
	grunt.initConfig({
		express: {
			dev: {
				options: {	
					script: 'app.js',			
					livereload: false,
				}
			}
		},
		sass: {  
		options: {                       
        	sourcemap: 'none',
      	},                            
		    dist: {                        
		      files: {                         
		        './public/stylesheets/style.css':'./asset/style.scss',      
		    }
		  }
		},

		cssmin: {
		  target: {
		    files: [{
		      expand: true,
		      cwd: './public/stylesheets',
		      src: ['*.css', '!*.min.css'],
		      dest: './public/stylesheets/build',
		      ext: '.min.css'
		    }]
		  }
		},
		uglify : {
			options: {
				sourceMap: true,
				
			},
			dist: {
				files: {
					'./public/javascripts/build/script.min.js': './public/javascripts/script.js'
				}
			}
		},
		watch: {
			sass: {
		        files: '**/*.scss',
		        tasks: ['sass','cssmin'],
		        options : {
					event : ['changed'],
					livereload : true,
					spawn: false
				}
     		 },
	 		 scripts: {
			    files: './public/javascripts/script.js',
			    tasks: ['uglify:dist'],
			    options: {
			      event: ['changed'],
			      livereload : true,
			    },
			 },
    		 
		},


	});


	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.registerTask('default', ['express:dev','watch']);

};

