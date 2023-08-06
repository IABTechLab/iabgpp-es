# @iabgpp/stub

Cmp API Stub code. May be included in commonjs loader or dropped directly on the page.

#### Installation

```
npm install @iabgpp/stub
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

npm install

npm run build
```

Built stub will be output to ./lib

##### Getting queue of commands

```javascript
__gpp("ping", function (data, success) {
  console.log("ping success: " + success + " data: " + JSON.stringify(data));
});
```
