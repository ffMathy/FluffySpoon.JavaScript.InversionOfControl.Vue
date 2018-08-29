`@fluffy-spoon/inverse-vue` is a Vue.js plugin that allows constructor dependency injection using the [`@fluffy-spoon/inverse`](https://www.npmjs.com/package/@fluffy-spoon/inverse-vue) framework.

# Installing
`npm i @fluffy-spoon/inverse-vue --save`

# Example
_To understand the following example, you have to be familiar with [`@fluffy-spoon/inverse`](https://www.npmjs.com/package/@fluffy-spoon/inverse-vue) first._

In the example below, we provide the plugin with the IOC container we want to use and define a component called `MyVueComponent` which injects a `Foo` as a dependency automatically. 

```typescript
import { Container, Inject, Injectable } from '@fluffy-spoon/inverse';
import { VueInverse, VueInjectable } from '@fluffy-spoon/inverse-vue';

import Component from 'vue-class-component';
import Vue from 'vue';

var container = new Container();
Vue.use(VueInverse, container);

@Injectable
class Foo { }

@Component({
    template: '<div></div>'
})
@VueInjectable
class MyVueComponent extends Vue {
    constructor(
        @Inject private foo: Foo) 
    {
        super();  

        console.log('foo is injected - look:', foo);
    }
}
```

Now if you provide `MyVueComponent` to Vue.js anywhere, it will always have its constructor parameters injected in.
