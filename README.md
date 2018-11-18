Hi, I'm Douglas.

I fetch npm packages and install them as ready to roll projects.

When I fetch an npm package, I empty it's contents to your current directory - along with all dependencies.

I'm perfect for seed projects, demos, and simple project scaffolding.

# Install

Install me globally

`npm i -g douglas`

Now I'm on your command line.

Let's find an npm package.  

e.g...

`douglas get doug-test`

Douglas goes off an installs doug-test + dependencies, moves the contents to the current directory, and then removes doug-test from node_modules.

# Publish

Before publishing, make a clone of your package.json and name it _package.json.  
To be clear - you should now have both a package.json and _package.json

What's with the _package.json I hear you ask...

When douglas fetches a package - it replaces the package.json (that has been altered through the publishing process) with _package.json which remains nice and clean.

Also - make sure you include the keyword *douglas* to your package.json or even prepend your npm package with `doug-` e.g. `doug-test`. This just makes douglas packages easier to find.

When you're ready...

```

npm publish

```