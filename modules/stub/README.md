# @iabgpp/stub

Cmp API Stub code. May be included in commonjs loader or dropped directly on the page.

#### Installation

```
npm install @iabgpp/stub
```

#### Using

##### Include via module loading

```javascript
import "@iabgpp/stub";
```

or

```javascript
require("@iabgpp/stub");
```

This will set up the global `__gpp()` window function with the queuing functionality. **You do not need to call any function after import; `__gpp` is available globally.**

> **Note:** Importing or requiring this module has a global side effect: it attaches `__gpp` to the `window` object.

##### To drop on a page

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
