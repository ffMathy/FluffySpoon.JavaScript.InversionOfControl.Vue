import test from 'ava';

import { Container, Inject, Injectable } from '@fluffy-spoon/inverse';

import Component, { mixins } from 'vue-class-component';
import Vue from 'vue';

import { VueInverse, VueInjectable } from '../src/index';

@Injectable
class Foo {
    constructor() {
         
    }
}

@VueInjectable
class VueBaseClass extends Vue {
    constructor(@Inject public foo: Foo) {
        super();
    }
}

@Component({
    template: '<div></div>'
})
@VueInjectable
class VueClass extends VueBaseClass {
}

let container: Container;

test.beforeEach(() => {
    container = new Container();
    Vue.use(VueInverse, container);
});

test('can resolve VueClass', t => {
    const instance = container.resolveInstance(VueClass);
    t.true(instance instanceof VueClass);
    t.true(instance.foo instanceof Foo);
});

test('can create VueClass with injected dependencies', t => {
    const instance = new (VueClass as any)();
    t.true(instance.foo instanceof Foo);
});