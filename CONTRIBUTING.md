# Contribution

In order to contribute to the improvement of the project, below you will find the project development flow.
Before being able to open a PR with changes to be applied or bug fixes to be solved, it is necessary to open an issue 
and explain the reason and a possible solution. You can open each PR by forking the project and creating the PR directly from 
your project to the project of our library.

Main rules:
- Open issue
- Create PR from forked project
- Link your PR to the issue

### Init

```sh
npm install
```

### Run tests

```sh
npm run test
```

### Build

```sh
npm run build
```

## ESM - CJS

This library is exported to support both ESM and CJS usage.
To ensure a good output on ESM we need to add the extension on exports and imports with '.js'. 
This is necessary and also recommended by Typescript maintainers to 
generate code that works in environments where ESM can be used.
