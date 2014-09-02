# RamlGen

Generate code from RAML. Initial implementation for Node.js, WIP.

## Installation

Via npm on Node:

```
npm install ramlgen
```

## Usage

Global install
```
npm install ramlgen -g
```

Create and generate a project
```
ramlgen create myproj
cd myproj
ramlgen generate <ramlfilepaht>
npm install
npm start
```

A web server is created, using Express. Browse to `http://localhost:3000`. ie:

```
http://localhost:3000/songs
```

TBD

## Development

```
git clone git://github.com/ajlopez/RamlGen.git
cd RamlGen
npm install
npm test
```

## Samples

TBD

## Versions

- 0.0.1 Published
- 0.0.2 Published, loadRamlFile in main project and enriched ajgenesis

## Contribution

Feel free to [file issues](https://github.com/ajlopez/RamlGen) and submit
[pull requests](https://github.com/ajlopez/RamlGen/pulls) — contributions are
welcome.

If you submit a pull request, please be sure to add or update corresponding
test cases, and ensure that `npm test` continues to pass.

