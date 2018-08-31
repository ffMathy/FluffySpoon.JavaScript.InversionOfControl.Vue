import test from 'ava';

import { Container, Inject, Injectable } from '@fluffy-spoon/inverse';

import Component, { mixins } from 'vue-class-component';
import Vue from 'vue';

import { VueInverse, VueInjectable } from '../src/index';

let container: Container;

@Injectable
class Foo {
    constructor() {
         
    }
}

class ClassWithoutDependenciesBase {

}

@Injectable
class ClassWithoutDependencies extends ClassWithoutDependenciesBase {

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

@VueInjectable
class DummyVueClass {

}

test.beforeEach(() => {
    container = new Container();
    Vue.use(VueInverse, container);
});

test('can resolve VueClass', t => {
    const instance = container.resolveInstance(VueClass);
    t.true(instance instanceof VueClass);
    t.true(instance.foo instanceof Foo);
});

test('can resolve VueBaseClass resolved as VueClass', t => {
    container.whenResolvingType(VueBaseClass).useType(VueClass);

    const instance = container.resolveInstance(VueBaseClass);
    
    t.false(instance instanceof DummyVueClass);
 
    t.true(instance instanceof VueClass);
    t.true(instance instanceof VueBaseClass);

    t.true(instance.foo instanceof Foo);
});

test('can create VueBaseClass resolved as VueClass with injected dependencies', t => {
    const instance = new (VueClass as any)();
    
    t.false(instance instanceof DummyVueClass);

    t.true(instance instanceof VueClass);
    t.true(instance instanceof VueBaseClass);
    
    t.true(instance.foo instanceof Foo);
});

test('can create ClassWithoutDependenciesBase resolved as ClassWithoutDependencies', t => {
    container.whenResolvingType(ClassWithoutDependenciesBase).useType(ClassWithoutDependencies);

    const instance = new (container.resolveType(ClassWithoutDependenciesBase))();
    
    t.false(instance instanceof DummyVueClass);

    t.true(instance instanceof ClassWithoutDependencies);
    t.true(instance instanceof ClassWithoutDependenciesBase);
});

test('can create VueClass with injected dependencies', t => {
    const instance = new (VueClass as any)();
    t.true(instance.foo instanceof Foo);
});