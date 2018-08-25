import test from 'ava';

import Container, { Inject, Injectable } from '@fluffy-spoon/inverse';

import Component from 'vue-class-component';
import Vue from 'vue';

import { VueInverse, VueInjectable } from '../src/index';
 
@Injectable
class Foo {
    constructor() {
         
    }
} 

@Component({
    template: '<div></div>'
})
@VueInjectable
class VueClass extends Vue {
    constructor(@Inject public foo: Foo) {
        super();  
    }
}
 
let container: Container;

test.beforeEach(() => {
    container = new Container();
    Vue.use(VueInverse, container);
});

test('can resolve VueClass', t => {
    const instance = new (VueClass as any)();
    t.true(instance.foo instanceof Foo);
});