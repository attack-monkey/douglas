#!/usr/bin/env node

const program = require('commander');
const exec = require('child_process').exec;
const fs = require('fs-extra');
const red = '\x1b[31m';
const green = '\x1b[32m';
const yellow = '\x1b[33m';
const reset = '\x1b[0m';

loadCommands();

function loadCommands() {
    program
        .version('1.5.0')
        .command('get <package>')
        .action(function (package) {
            npmInitY(package)
        });
    
    program
        .command('publish')
        .action(function () {
            create_packageJson()
        });

    program.parse(process.argv);
}

function npmInitY(package) {
    console.log(green, 'npm init-ing...', reset);
    exec('npm init -y',
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log(red, error, reset);
            } else {
                installNpmPackage(package);
            }
        });
}

function installNpmPackage(package) {
    console.log(green, 'Getting npm package...', reset);
    exec('npm install ' + package,
        function (error, stdout, stderr) {
            const errorMsg = 'We\'re having trouble locating your npm package. Maybe you\'ve spelt the name incorrectly ?!';
            if (error !== null) {
                console.log(red, errorMsg, reset);
            } else {
                moveContentsToRoot(package);
            }
        });
}

function moveContentsToRoot(package) {
    fs.copySync(process.cwd() + '/node_modules/' + package, process.cwd());
    overWritePackage(package);
}

function overWritePackage(package) {
    try {
        fs.copySync(process.cwd() + '/_package.json', process.cwd() + '/package.json');
        deleteDoug_PackageJson(package);
    } catch (e) {
        // no _package.json
        // moving on...
        deleteDougPackage(package);
    }
}

function deleteDoug_PackageJson(package) {
    fs.remove(process.cwd() + '/_package.json', err => {
        if (err) return console.error(red, err, reset)
        deleteDougPackage(package);
    })
}

function deleteDougPackage(package) {
    console.log(green, 'Removing ' + package + ' from node_modules', reset);
    fs.remove(process.cwd() + '/node_modules/' + package, err => {
        if (err) return console.error(red, err, reset)
        npmInstall();
    })
}

function npmInstall() {
    console.log(green, 'npm install-ing...', reset);
    exec('npm install',
        function (error, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(red, error, reset);
            } else {
                console.log(green, 'Done... Douglas out!', reset);
            }
        });
}

//// publish

function create_packageJson() {
    try {
        console.log(green, 'Creating a _package.json... ', reset);
        fs.copySync(process.cwd() + '/package.json', process.cwd() + '/_package.json');
        npmPublish();
    } catch (e) {
        const error = 'Error creating a _package.json from package.json. Is the file missing?'
        console.log(red, error, reset);
    }
}

function npmPublish() {
    console.log(green, 'npm publish-ing...', reset);
    exec('npm publish',
        function (error, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(red, error, reset);
            } else {
                console.log(green, 'Done... Douglas out!', reset);
            }
        });
}

