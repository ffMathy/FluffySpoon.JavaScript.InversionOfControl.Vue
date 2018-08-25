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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = __importDefault(require("ava"));
var inverse_1 = __importStar(require("@fluffy-spoon/inverse"));
var vue_class_component_1 = __importDefault(require("vue-class-component"));
var vue_1 = __importDefault(require("vue"));
var index_1 = __importStar(require("../src/index"));
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo = __decorate([
        inverse_1.Injectable,
        __metadata("design:paramtypes", [])
    ], Foo);
    return Foo;
}());
var VueClass = /** @class */ (function (_super) {
    __extends(VueClass, _super);
    function VueClass(foo) {
        var _this = _super.call(this) || this;
        _this.foo = foo;
        return _this;
    }
    VueClass = __decorate([
        vue_class_component_1.default({
            template: '<div></div>'
        }),
        index_1.VueInjectable,
        __param(0, inverse_1.Inject),
        __metadata("design:paramtypes", [Foo])
    ], VueClass);
    return VueClass;
}(vue_1.default));
var container;
ava_1.default.beforeEach(function () {
    container = new inverse_1.default();
    vue_1.default.use(index_1.default, {
        container: container
    });
});
ava_1.default('can resolve VueClass', function (t) {
    var instance = new VueClass();
    t.true(instance.foo instanceof Foo);
});
//# sourceMappingURL=index.test.js.map