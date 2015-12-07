# et-dependency
The dependency for et-template compiled codes.

##Install

```
npm i et-dependency --save-dev
```
## ES6
```
import * as dependency from 'et-dependency/common'
```

## For amd/cmd
```
var dependency = require('et-dependency/common')
```

## Angular1
```
<script src="node_modules/angular/angular.js">
<script src="node_modules/et-dependency/ng/index.js"></script>
<script>
angular.module('yourAppName', ['et.template'])
</script>
```
