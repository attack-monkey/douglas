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
        .version('1.0.0')
        .command('get <package>')
        .action(function (package) {
            npmInitY(package)
        })

    program.parse(process.argv);
}

function npmInitY(package) {
    console.log(green, 'npm init-ing...', reset);
    exec('npm init -y',
        function (error, stdout, stderr) {
            // console.log(stdout);
            // console.log(stderr);
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
            // console.log(stdout);
            // console.log(stderr);
            if (error !== null) {
                console.log(red, error, reset);
            } else {
                moveContentsToRoot(package);
            }
        });
}

function moveContentsToRoot(package) {
    fs.copySync(process.cwd() + '/node_modules/' + package, process.cwd());
    deleteDougPackage(package);
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