# et-dependency
The dependency for et-template compiled codes.

##Install

```
npm i et-dependency --save-dev
```

## ES6/ES5
```
import * as dependency from 'et-dependency'
```

## For amd
```
var dependency = require('et-dependency/dist/amd')
```

## For cmd
```
var dependency = require('et-dependency/dist/cmd')
```

## Angular1
```
<script src="node_modules/angular/angular.js">
<script src="node_modules/et-dependency/dist/ng.js"></script>
<script>
angular.module('yourAppName', ['et.template'])
</script>
```

## Develop
The project depends on Phantomjs. If you are in China and there has the problem to install it. Write the following codes to this file `~/.npmrc`.

```
phantomjs_cdnurl=http://cnpmjs.org/downloads
```
