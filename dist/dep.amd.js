;define('et-dependency', [], function() {
    var exports = {};
    var module = {};

    (function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var _ = __webpack_require__(1);
	__export(__webpack_require__(2));
	__export(__webpack_require__(7));
	// polyfill es5 and es6 features
	__webpack_require__(24);
	if (!Array.isArray) {
	    _.extend(Array, {
	        isArray: function (arg) {
	            return Object.prototype.toString.call(arg) === '[object Array]';
	        }
	    });
	}


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	function LOOP() { }
	exports.LOOP = LOOP;
	function each(arr, iterator) {
	    if (!arr)
	        return;
	    for (var i = 0, len = arr.length; i < len; i++) {
	        var item = arr[i];
	        iterator(item, i, arr);
	    }
	}
	exports.each = each;
	function filter(arr, iterator) {
	    var newArr = [];
	    each(arr, function (item, index, arr) {
	        if (iterator(item, index, arr))
	            newArr.push(item);
	    });
	    return newArr;
	}
	exports.filter = filter;
	function clone(arr) {
	    var newArr = [];
	    each(arr, function (item) { return newArr.push(item); });
	    return newArr;
	}
	exports.clone = clone;
	function extend(obj) {
	    var list = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        list[_i - 1] = arguments[_i];
	    }
	    each(list, function (item) {
	        for (var key in item) {
	            if (item.hasOwnProperty(key)) {
	                obj[key] = item[key];
	            }
	        }
	    });
	    return obj;
	}
	exports.extend = extend;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(3));
	__export(__webpack_require__(4));
	__export(__webpack_require__(5));
	__export(__webpack_require__(6));


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	function after(prevNode, afterNode) {
	    var parent = prevNode.parentNode;
	    if (!parent)
	        return;
	    var nextNode = prevNode.nextSibling;
	    parent.insertBefore(afterNode, nextNode);
	}
	exports.after = after;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	function before(prevNode, afterNode) {
	    var parent = prevNode.parentNode;
	    if (!parent)
	        return;
	    parent.insertBefore(afterNode, prevNode);
	}
	exports.before = before;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	function remove(node) {
	    var parent = node.parentNode;
	    if (!parent)
	        return;
	    return parent.removeChild(node);
	}
	exports.remove = remove;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util_1 = __webpack_require__(1);
	function concatMatrix(arr, martrix, index) {
	    concatArray(arr, martrix[index]);
	}
	exports.concatMatrix = concatMatrix;
	function concatMatrixOthers(arr, martrix, index) {
	    util_1.each(martrix, function (tmpArr, i) {
	        if (i !== index)
	            concatArray(arr, tmpArr);
	    });
	}
	exports.concatMatrixOthers = concatMatrixOthers;
	function concatArray(arrA, arrB) {
	    util_1.each(arrB, function (item) { return arrA.push(item); });
	    return arrA;
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(8));
	__export(__webpack_require__(11));
	__export(__webpack_require__(12));
	__export(__webpack_require__(13));
	__export(__webpack_require__(21));
	__export(__webpack_require__(23));


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var if_1 = __webpack_require__(9);
	function eif(template, parentId, currentId, dataFn) {
	    var node = template.nodes.get(parentId);
	    var ifTemplate = new if_1.IfTemplate(template.context, dataFn);
	    ifTemplate.arguments = template.arguments;
	    if (node) {
	        node.appendChild(ifTemplate.get());
	    }
	    else {
	        template.roots.push(currentId);
	    }
	    template.templates.set(currentId, ifTemplate);
	    template.handlers.push(function () {
	        ifTemplate.context = template.context;
	        ifTemplate.arguments = template.arguments;
	        ifTemplate.update();
	    });
	}
	exports.eif = eif;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var helper = __webpack_require__(2);
	var basic_1 = __webpack_require__(10);
	var IfTemplate = (function (_super) {
	    __extends(IfTemplate, _super);
	    function IfTemplate(context, dataFn) {
	        _super.call(this, context);
	        this.ifDataFn = dataFn;
	        this.first = document.createComment('Start If');
	        this.last = document.createComment('End If');
	        this.nodes.set(-1, this.first);
	        this.roots.unshift(-1);
	        this.nodes.set(-2, this.last);
	        this.roots.push(-2);
	    }
	    IfTemplate.prototype.update = function (isForce) {
	        var dataFn = this.ifDataFn;
	        var arr = dataFn(this.context, this.arguments);
	        var nextId = arr[0];
	        var templateConstructor = arr[1];
	        var next = this.pickChild(nextId, templateConstructor);
	        if (next === this.current) {
	            next.update();
	        }
	        else {
	            if (this.current)
	                this.current.remove();
	            next.update();
	            helper.after(this.first, next.get());
	        }
	        this.roots = [nextId];
	    };
	    IfTemplate.prototype.pickChild = function (id, templateConstructor) {
	        var child = this.templates.get(id);
	        if (!child) {
	            child = new templateConstructor(this.context);
	            this.templates.set(id, child);
	        }
	        child.arguments = this.arguments;
	        child.context = this.context;
	        return child;
	    };
	    return IfTemplate;
	}(basic_1.Template));
	exports.IfTemplate = IfTemplate;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(1);
	var helper = __webpack_require__(2);
	var EVENT_SPLITTER = /\s+|,/;
	var Template = (function () {
	    function Template(context) {
	        this.roots = [];
	        this.arguments = [];
	        this.nodes = new Map();
	        this.templates = new Map();
	        this.handlers = [];
	        this.events = [];
	        this.context = context;
	        var create = this.createFn;
	        if (typeof create === 'function') {
	            create(this);
	        }
	        this.first = this.pickFirstNode();
	        this.last = this.pickLastNode();
	    }
	    Template.prototype.get = function () {
	        var _this = this;
	        var $frag = document.createDocumentFragment();
	        _.each(this.roots, function (id) {
	            var node = _this.nodes.get(id);
	            if (node)
	                return $frag.appendChild(node);
	            var template = _this.templates.get(id);
	            if (template)
	                return $frag.appendChild(template.get());
	        });
	        return $frag;
	    };
	    Template.prototype.point = function (id) {
	        var node = this.nodes.get(id);
	        if (node)
	            return node;
	        var template = this.templates.get(id);
	        if (template)
	            return template.get();
	    };
	    Template.prototype.update = function () {
	        var _this = this;
	        _.each(this.handlers, function (fn) { return fn(_this.arguments); });
	    };
	    Template.prototype.remove = function () {
	        var _this = this;
	        _.each(this.roots, function (id) {
	            var node = _this.nodes.get(id);
	            if (node)
	                return helper.remove(node);
	            var template = _this.templates.get(id);
	            if (template)
	                return template.remove();
	        });
	    };
	    Template.prototype.destroy = function () {
	        this.remove();
	        _.each(this.events, function (event) {
	            event.node.removeEventListener(event.type, event.fn, false);
	        });
	        this.context = null;
	        this.first = null;
	        this.last = null;
	        this.nodes = new Map();
	        this.templates = new Map();
	        this.handlers = [];
	        this.roots = [];
	        this.arguments = [];
	        this.events = [];
	    };
	    Template.prototype.bind = function (idOrNode, event, fn) {
	        var _this = this;
	        var node;
	        if (typeof idOrNode === 'number' || typeof idOrNode === 'string') {
	            node = this.nodes.get(idOrNode);
	        }
	        else {
	            node = idOrNode;
	        }
	        if (!node)
	            return;
	        var list = event.split(EVENT_SPLITTER);
	        _.each(list, function (type) {
	            node.addEventListener(type, fn, false);
	            _this.events.push({ node: node, fn: fn, type: type });
	        });
	    };
	    Template.prototype.pickFirstNode = function () {
	        var firstId = this.roots[0];
	        if (!firstId)
	            return;
	        var firstNode = this.nodes.get(firstId);
	        if (firstNode)
	            return firstNode;
	        var firstTemplate = this.templates.get(firstId);
	        if (firstTemplate)
	            return firstTemplate.first;
	    };
	    Template.prototype.pickLastNode = function () {
	        var lastId = this.roots[this.roots.length - 1];
	        if (!lastId)
	            return;
	        var lastNode = this.nodes.get(lastId);
	        if (lastNode)
	            return lastNode;
	        var lastTemplate = this.templates.get(lastId);
	        if (lastTemplate)
	            return lastTemplate.last;
	    };
	    return Template;
	}());
	exports.Template = Template;


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	function text(template, parentId, currentId, value, pipeFn) {
	    if (typeof value === 'string') {
	        return createSolidText(template, parentId, currentId, value);
	    }
	    else if (pipeFn) {
	        return createPipeText(template, parentId, currentId, value, pipeFn);
	    }
	    else {
	        return createDynamicText(template, parentId, currentId, value);
	    }
	}
	exports.text = text;
	function createSolidText(template, parentId, currentId, value) {
	    var $text = document.createTextNode(value || '');
	    template.nodes.set(currentId, $text);
	    var parentNode = template.nodes.get(parentId);
	    if (parentNode) {
	        parentNode.appendChild($text);
	    }
	    else {
	        template.roots.push(currentId);
	    }
	    return $text;
	}
	function createDynamicText(template, parentId, currentId, valueFn) {
	    var $text = createSolidText(template, parentId, currentId, '');
	    template.handlers.push(function () {
	        $text.textContent = valueFn(template.context, template.arguments);
	    });
	    return $text;
	}
	function createPipeText(template, parentId, currentId, valueFn, pipeFn) {
	    var $text = createSolidText(template, parentId, currentId, '');
	    template.handlers.push(function () {
	        var values = pipeFn(template.context, template.arguments);
	        $text.textContent = valueFn(template.context, template.arguments, values);
	    });
	    return $text;
	}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var util_1 = __webpack_require__(1);
	var basic_1 = __webpack_require__(10);
	function template(createFn) {
	    var Template = (function (_super) {
	        __extends(Template, _super);
	        function Template() {
	            _super.apply(this, arguments);
	        }
	        return Template;
	    }(basic_1.Template));
	    util_1.extend(Template.prototype, { createFn: createFn });
	    return Template;
	}
	exports.template = template;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util_1 = __webpack_require__(1);
	var helper = __webpack_require__(14);
	function element(template, parendId, currentId, nodeName, attrs, pipes, events, conditionFn, attrsFn) {
	    var parent = template.nodes.get(parendId);
	    var current = document.createElement(nodeName);
	    template.nodes.set(currentId, current);
	    if (parent) {
	        parent.appendChild(current);
	    }
	    else {
	        template.roots.push(currentId);
	    }
	    var _a = helper.separateAttrs(attrs), resident = _a.resident, dynamic = _a.dynamic;
	    helper.setAttrs(current, resident);
	    if (events) {
	        events.forEach(function (fn, key) {
	            template.bind(current, key, function ($event) {
	                fn($event, template.context, template.arguments);
	            });
	        });
	    }
	    var inclusions = [];
	    var exclusions = [];
	    if (conditionFn && attrsFn) {
	        template.handlers.push(function () {
	            var marks = conditionFn(template.context, template.arguments);
	            var arr = attrsFn(marks);
	            inclusions = arr[0] || [];
	            exclusions = arr[1] || [];
	            helper.removeAttribute(current, exclusions);
	            var tmpResident = [];
	            util_1.each(resident, function (item) {
	                if (inclusions.indexOf(item.key) >= 0) {
	                    tmpResident.push(item);
	                }
	            });
	            helper.setAttrs(current, tmpResident);
	        });
	    }
	    if (!pipes)
	        pipes = new Map();
	    util_1.each(dynamic, function (item) {
	        template.handlers.push(function () {
	            if (exclusions.indexOf(item.key) >= 0)
	                return;
	            var value = item.fn(template.context, template.arguments);
	            var pipeFn = pipes.get(item.key);
	            var values = Array.isArray(value) ? value : [value];
	            if (pipeFn)
	                value = pipeFn(values, template.context, template.arguments);
	            if (Array.isArray(value)) {
	                helper.setAttr(current, item.key, value.join());
	            }
	            else {
	                helper.setAttr(current, item.key, value);
	            }
	        });
	    });
	}
	exports.element = element;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(15));
	__export(__webpack_require__(16));
	__export(__webpack_require__(18));
	__export(__webpack_require__(19));
	__export(__webpack_require__(20));


/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	function separateAttrs(attrs) {
	    var resident = [];
	    var dynamic = [];
	    if (attrs) {
	        attrs.forEach(function (item, key) {
	            if (typeof item === 'function') {
	                dynamic.push({ key: key, fn: item });
	            }
	            else {
	                resident.push({ key: key, value: item });
	            }
	        });
	    }
	    return { resident: resident, dynamic: dynamic };
	}
	exports.separateAttrs = separateAttrs;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var isProperty_1 = __webpack_require__(17);
	function getAttr(node, key) {
	    var value;
	    if (isProperty_1.isProperty(node, key)) {
	        value = node[key];
	    }
	    else {
	        value = node.getAttribute(key);
	    }
	    return value;
	}
	exports.getAttr = getAttr;


/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	var PROPERTIY_SET = {
	    'INPUT': ['value', 'checked'],
	    'TEXTAREA': ['value']
	};
	function isProperty(node, key) {
	    return chargeProperty(node.nodeName, key);
	}
	exports.isProperty = isProperty;
	function chargeProperty(nodeName, key) {
	    var propertiesList = PROPERTIY_SET[nodeName.toLocaleUpperCase()] || [];
	    return !!~propertiesList.indexOf(key);
	}


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var isProperty_1 = __webpack_require__(17);
	function setAttr(node, key, value) {
	    if (isProperty_1.isProperty(node, key)) {
	        node[key] = value;
	    }
	    else {
	        node.setAttribute(key, value);
	    }
	}
	exports.setAttr = setAttr;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var setAttr_1 = __webpack_require__(18);
	var _ = __webpack_require__(1);
	function setAttrs(node, attrs) {
	    if (Array.isArray(attrs)) {
	        return setAttrsByArr(node, attrs);
	    }
	    else {
	        return setAttrsByMap(node, attrs);
	    }
	}
	exports.setAttrs = setAttrs;
	function setAttrsByMap(node, attrs) {
	    attrs.forEach(function (value, key) {
	        setAttr_1.setAttr(node, key, value);
	    });
	}
	function setAttrsByArr(node, attrs) {
	    _.each(attrs, function (item) {
	        setAttr_1.setAttr(node, item.key, item.value);
	    });
	}


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util_1 = __webpack_require__(1);
	var isProperty_1 = __webpack_require__(17);
	function removeAttribute(node, key) {
	    if (Array.isArray(key)) {
	        removeArr(node, key);
	    }
	    else {
	        removeOne(node, key);
	    }
	}
	exports.removeAttribute = removeAttribute;
	function removeOne(node, key) {
	    if (isProperty_1.isProperty(node, key)) {
	        delete node[key];
	    }
	    else {
	        node.removeAttribute(key);
	    }
	}
	function removeArr(node, keys) {
	    util_1.each(keys, function (key) { return removeOne(node, key); });
	}


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var for_1 = __webpack_require__(22);
	function efor(template, parentId, currentId, childConstructor, dataFn, trackByFn) {
	    var node = template.nodes.get(parentId);
	    var forTemplate = new for_1.ForTemplate(template.context, childConstructor, dataFn, trackByFn);
	    if (node) {
	        node.appendChild(forTemplate.get());
	    }
	    else {
	        template.roots.push(currentId);
	    }
	    forTemplate.arguments = template.arguments;
	    template.templates.set(currentId, forTemplate);
	    template.handlers.push(function () {
	        forTemplate.context = template.context;
	        forTemplate.arguments = template.arguments;
	        forTemplate.update();
	    });
	}
	exports.efor = efor;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var _ = __webpack_require__(1);
	var helper = __webpack_require__(2);
	var basic_1 = __webpack_require__(10);
	var FIRST_COMMENT_ID = -1;
	var LAST_COMMENT_ID = -2;
	var ForTemplate = (function (_super) {
	    __extends(ForTemplate, _super);
	    function ForTemplate(context, childConstructor, dataFn, trackByFn) {
	        _super.call(this, context);
	        this.childConstructor = childConstructor;
	        this.forDataFn = dataFn;
	        this.forTrackByFn = trackByFn;
	        this.first = document.createComment('Start For');
	        this.last = document.createComment('End For');
	        this.nodes.set(FIRST_COMMENT_ID, this.first);
	        this.roots.unshift(FIRST_COMMENT_ID);
	        this.nodes.set(LAST_COMMENT_ID, this.last);
	        this.roots.push(LAST_COMMENT_ID);
	    }
	    ForTemplate.prototype.update = function () {
	        var _this = this;
	        var dataList = this.getForList();
	        var childrenIds = [];
	        var childrenTps = [];
	        _.each(dataList, function (item, index) {
	            var args = _this.assembleArguments(item, index);
	            var trackBy = _this.getForTrackBy(args, index);
	            var child = _this.pickChild(trackBy, args);
	            childrenIds.push(trackBy);
	            childrenTps.push(child);
	        });
	        var exclusions = _.filter(this.roots, function (id) { return !(childrenIds.indexOf(id) >= 0); });
	        _.each(exclusions, function (id) {
	            var child = _this.templates.get(id);
	            if (child)
	                child.remove();
	        });
	        var isChange = false;
	        var last = null;
	        _.each(childrenIds, function (id, index) {
	            var lastId = _this.roots[index + 1];
	            if (id !== lastId && !isChange)
	                isChange = true;
	            var child = childrenTps[index];
	            child.update();
	            if (isChange && !last) {
	                helper.after(_this.first, child.get());
	            }
	            else if (isChange) {
	                helper.after(last, child.get());
	            }
	            last = child.last;
	        });
	        childrenIds.unshift(FIRST_COMMENT_ID);
	        childrenIds.push(LAST_COMMENT_ID);
	        this.roots = childrenIds;
	    };
	    ForTemplate.prototype.assembleArguments = function (item, index) {
	        var args = [];
	        args = _.clone(this.arguments);
	        args.push(item, index);
	        return args;
	    };
	    ForTemplate.prototype.pickChild = function (id, args) {
	        var child = this.templates.get(id);
	        if (!child) {
	            child = new this.childConstructor(this.context);
	            this.templates.set(id, child);
	        }
	        child.context = this.context;
	        child.arguments = args;
	        return child;
	    };
	    ForTemplate.prototype.getForList = function () {
	        var fn = this.forDataFn;
	        return fn(this.context, this.arguments);
	    };
	    ForTemplate.prototype.getForTrackBy = function (args, index) {
	        var fn = this.forTrackByFn;
	        if (fn) {
	            return fn(this.context, args);
	        }
	        else {
	            return index;
	        }
	    };
	    return ForTemplate;
	}(basic_1.Template));
	exports.ForTemplate = ForTemplate;


/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";
	function child(template, parentId, currentId, childConstructor, contextFn) {
	    var node = template.nodes.get(parentId);
	    var childTemplate = new childConstructor(findContext(template, contextFn));
	    if (node) {
	        node.appendChild(childTemplate.get());
	    }
	    else {
	        template.roots.push(currentId);
	    }
	    template.templates.set(currentId, childTemplate);
	    template.handlers.push(function () {
	        childTemplate.context = findContext(template, contextFn);
	        childTemplate.update();
	    });
	}
	exports.child = child;
	function findContext(template, contextFn) {
	    if (typeof contextFn === 'function') {
	        return contextFn(template.context, template.arguments);
	    }
	    else {
	        return template.context;
	    }
	}


/***/ },
/* 24 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {(function (exports) {'use strict';
	  //shared pointer
	  var i;
	  //shortcuts
	  var defineProperty = Object.defineProperty, is = function(a,b) { return (a === b) || (a !== a && b !== b) };


	  //Polyfill global objects
	  if (typeof WeakMap == 'undefined') {
	    exports.WeakMap = createCollection({
	      // WeakMap#delete(key:void*):boolean
	      'delete': sharedDelete,
	      // WeakMap#clear():
	      clear: sharedClear,
	      // WeakMap#get(key:void*):void*
	      get: sharedGet,
	      // WeakMap#has(key:void*):boolean
	      has: mapHas,
	      // WeakMap#set(key:void*, value:void*):void
	      set: sharedSet
	    }, true);
	  }

	  if (typeof Map == 'undefined' || typeof ((new Map).values) !== 'function' || !(new Map).values().next) {
	    exports.Map = createCollection({
	      // WeakMap#delete(key:void*):boolean
	      'delete': sharedDelete,
	      //:was Map#get(key:void*[, d3fault:void*]):void*
	      // Map#has(key:void*):boolean
	      has: mapHas,
	      // Map#get(key:void*):boolean
	      get: sharedGet,
	      // Map#set(key:void*, value:void*):void
	      set: sharedSet,
	      // Map#keys(void):Iterator
	      keys: sharedKeys,
	      // Map#values(void):Iterator
	      values: sharedValues,
	      // Map#entries(void):Iterator
	      entries: mapEntries,
	      // Map#forEach(callback:Function, context:void*):void ==> callback.call(context, key, value, mapObject) === not in specs`
	      forEach: sharedForEach,
	      // Map#clear():
	      clear: sharedClear
	    });
	  }

	  if (typeof Set == 'undefined' || typeof ((new Set).values) !== 'function' || !(new Set).values().next) {
	    exports.Set = createCollection({
	      // Set#has(value:void*):boolean
	      has: setHas,
	      // Set#add(value:void*):boolean
	      add: sharedAdd,
	      // Set#delete(key:void*):boolean
	      'delete': sharedDelete,
	      // Set#clear():
	      clear: sharedClear,
	      // Set#keys(void):Iterator
	      keys: sharedValues, // specs actually say "the same function object as the initial value of the values property"
	      // Set#values(void):Iterator
	      values: sharedValues,
	      // Set#entries(void):Iterator
	      entries: setEntries,
	      // Set#forEach(callback:Function, context:void*):void ==> callback.call(context, value, index) === not in specs
	      forEach: sharedForEach
	    });
	  }

	  if (typeof WeakSet == 'undefined') {
	    exports.WeakSet = createCollection({
	      // WeakSet#delete(key:void*):boolean
	      'delete': sharedDelete,
	      // WeakSet#add(value:void*):boolean
	      add: sharedAdd,
	      // WeakSet#clear():
	      clear: sharedClear,
	      // WeakSet#has(value:void*):boolean
	      has: setHas
	    }, true);
	  }


	  /**
	   * ES6 collection constructor
	   * @return {Function} a collection class
	   */
	  function createCollection(proto, objectOnly){
	    function Collection(a){
	      if (!this || this.constructor !== Collection) return new Collection(a);
	      this._keys = [];
	      this._values = [];
	      this._itp = []; // iteration pointers
	      this.objectOnly = objectOnly;

	      //parse initial iterable argument passed
	      if (a) init.call(this, a);
	    }

	    //define size for non object-only collections
	    if (!objectOnly) {
	      defineProperty(proto, 'size', {
	        get: sharedSize
	      });
	    }

	    //set prototype
	    proto.constructor = Collection;
	    Collection.prototype = proto;

	    return Collection;
	  }


	  /** parse initial iterable argument passed */
	  function init(a){
	    var i;
	    //init Set argument, like `[1,2,3,{}]`
	    if (this.add)
	      a.forEach(this.add, this);
	    //init Map argument like `[[1,2], [{}, 4]]`
	    else
	      a.forEach(function(a){this.set(a[0],a[1])}, this);
	  }


	  /** delete */
	  function sharedDelete(key) {
	    if (this.has(key)) {
	      this._keys.splice(i, 1);
	      this._values.splice(i, 1);
	      // update iteration pointers
	      this._itp.forEach(function(p) { if (i < p[0]) p[0]--; });
	    }
	    // Aurora here does it while Canary doesn't
	    return -1 < i;
	  };

	  function sharedGet(key) {
	    return this.has(key) ? this._values[i] : undefined;
	  }

	  function has(list, key) {
	    if (this.objectOnly && key !== Object(key))
	      throw new TypeError("Invalid value used as weak collection key");
	    //NaN or 0 passed
	    if (key != key || key === 0) for (i = list.length; i-- && !is(list[i], key);){}
	    else i = list.indexOf(key);
	    return -1 < i;
	  }

	  function setHas(value) {
	    return has.call(this, this._values, value);
	  }

	  function mapHas(value) {
	    return has.call(this, this._keys, value);
	  }

	  /** @chainable */
	  function sharedSet(key, value) {
	    this.has(key) ?
	      this._values[i] = value
	      :
	      this._values[this._keys.push(key) - 1] = value
	    ;
	    return this;
	  }

	  /** @chainable */
	  function sharedAdd(value) {
	    if (!this.has(value)) this._values.push(value);
	    return this;
	  }

	  function sharedClear() {
	    (this._keys || 0).length =
	    this._values.length = 0;
	  }

	  /** keys, values, and iterate related methods */
	  function sharedKeys() {
	    return sharedIterator(this._itp, this._keys);
	  }

	  function sharedValues() {
	    return sharedIterator(this._itp, this._values);
	  }

	  function mapEntries() {
	    return sharedIterator(this._itp, this._keys, this._values);
	  }

	  function setEntries() {
	    return sharedIterator(this._itp, this._values, this._values);
	  }

	  function sharedIterator(itp, array, array2) {
	    var p = [0], done = false;
	    itp.push(p);
	    return {
	      next: function() {
	        var v, k = p[0];
	        if (!done && k < array.length) {
	          v = array2 ? [array[k], array2[k]]: array[k];
	          p[0]++;
	        } else {
	          done = true;
	          itp.splice(itp.indexOf(p), 1);
	        }
	        return { done: done, value: v };
	      }
	    };
	  }

	  function sharedSize() {
	    return this._values.length;
	  }

	  function sharedForEach(callback, context) {
	    var it = this.entries();
	    for (;;) {
	      var r = it.next();
	      if (r.done) break;
	      callback.call(context, r.value[1], r.value[0], this);
	    }
	  }

	})(typeof exports != 'undefined' && typeof global != 'undefined' ? global : window );

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ])));

    return module.exports || exports['default'] || exports;
  });