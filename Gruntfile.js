module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bump: {
            options: {
                push: true,
                pushTo: 'origin',
				commitFiles: ['-a']
            }

        },
        shell: {
            publish: {
                command: 'npm publish'
            }
        }
    });

    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('patch', 'patch', function() {
        grunt.task.run('bump:patch');
    });

    grunt.registerTask('release', 'Release a new version, push it and publish it', function() {
        grunt.task.run('bump:patch', 'shell:publish');
    });

};
