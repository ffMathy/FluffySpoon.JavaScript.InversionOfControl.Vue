"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inverse_1 = require("@fluffy-spoon/inverse");
var Decorators_1 = require("@fluffy-spoon/inverse/dist/src/Decorators");
var Utilities_1 = require("@fluffy-spoon/inverse/dist/src/Utilities");
var vue_1 = __importDefault(require("vue"));
function VueInjectable(cls) {
    var parameterTypesMetadata = Decorators_1.getParameterTypesMetadata(cls);
    if (!parameterTypesMetadata)
        throw new Error('A @VueInjectable decorator must be defined after other decorators that alter class metadata for the class ' + Utilities_1.extractClassName(cls) + '. If in doubt, re-order the decorators so that the @VueInjectable decorator is last.');
    var injectableClass = /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _args[_i] = arguments[_i];
            }
            var _this = this;
            var container = vue_1.default.$inverseContainer;
            var argumentDictionary = Utilities_1.getOrCreateArgumentsMetadataForTarget(cls);
            var argumentIndexes = argumentDictionary.getParameterIndexes();
            var argumentsToInject = [];
            for (var _a = 0, argumentIndexes_1 = argumentIndexes; _a < argumentIndexes_1.length; _a++) {
                var index = argumentIndexes_1[_a];
                var type = argumentDictionary.getParameter(index);
                argumentsToInject[index] = container.resolveInstance(type);
            }
            _this = _super.apply(this, argumentsToInject) || this;
            return _this;
        }
        return class_1;
    }(cls));
    Decorators_1.addInjectableMetadata(cls);
    return injectableClass;
}
exports.VueInjectable = VueInjectable;
exports.VueInverse = {
    install: function (Vue, container) {
        if (!container)
            throw new Error('A container must be supplied when setting up the Inverse plugin.');
        if (!(container instanceof inverse_1.Container))
            throw new Error('The provided container is not a Container instance.');
        Vue.$inverseContainer = container;
    }
};
//# sourceMappingURL=Exports.js.map