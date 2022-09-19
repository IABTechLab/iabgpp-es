[![NPM version](https://img.shields.io/npm/v/@iabgpp/stub.svg?style=flat-square)](https://www.npmjs.com/package/@iabgpp/stub)
[![npm module downloads per month](http://img.shields.io/npm/dm/@iabgpp/stub.svg?style=flat)](https://www.npmjs.org/package/@iabgpp/stub)
[![InteractiveAdvertisingBureau](https://circleci.com/gh/InteractiveAdvertisingBureau/iabgpp-es.svg?style=shield)](https://circleci.com/gh/InteractiveAdvertisingBureau/iabgpp-es)

# @iabgpp/stub

Cmp API Stub code. Maybe included in commonjs loader or dropped directly on the page.

#### Installation

npm

```
npm install @iabgpp/stub
```

yarn

```
yarn add @iabgpp/stub
```

#### Using

##### include via module loading

```javascript
import * as cmpstub from "@iabgpp/stub";
```

or

```javascript
const cmpstub = require("@iabgpp/stub");
```

then execute:

```javascript
cmpstub();
```

this should generate the `__gpp()` window function with the queing functionality.

##### to drop on a page

```
git clone https://github.com/InteractiveAdvertisingBureau/iabgpp-es.git

cd iabgpp-es/modules/stub/

yarn // or npm install

yarn build // or npm run build
```

Built stub will be output to ./lib

##### Getting queue of commands

```javascript
console.log(__gpp("ping"));
```
