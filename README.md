Hi, I'm Douglas.

I fetch npm packages and install them as ready to roll projects.

When I fetch an npm package, I empty it's contents to your current directory - along with all dependencies.

I'm perfect for seed projects, demos, and simple project scaffolding.

# Install

Install me globally

`npm i -g douglas`

Now I'm on your command line.

_Or if you just need me semi-frequently, you can just skip the global install and use via npx._

Let's find an npm package.  

e.g...

_If globally installed:_

`douglas get doug-test`

_Or if not installed globally..._

`npx douglas get doug-test`

Douglas goes off an installs doug-test + dependencies, moves the contents to the current directory, and then removes doug-test from node_modules.

# Publish

To publish a project, use 

```

douglas publish

```

This clones your package.json and names it `_package.json`.

What's with the _package.json I hear you ask...

When douglas fetches a package - it replaces the package.json (that has been altered through the publishing process) with _package.json (which doesn't undergo any changes).

> Fun fact: You can still `douglas get` any npm package, even if it doesn't have a _package.json, but you'll notice a far more verbose package.json due to all the the things that the npm publish process adds in.

## Some tips when publishing

Remember to bump your version in package.json before publishing.

Also - make sure you include the keyword *douglas* to your package.json or even prepend your npm package with `doug-` or `douglas-` e.g. `doug-test`. Or `douglas-test`.

This just makes douglas packages easier to find.

When you're ready...

```

douglas publish

```