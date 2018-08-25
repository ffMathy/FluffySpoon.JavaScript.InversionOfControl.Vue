`@fluffy-spoon/inverse-vue` is a Vue.js plugin that allows constructor dependency injection using the `[@fluffy-spoon/inverse](https://www.npmjs.com/package/@fluffy-spoon/inverse-vue)` framework.

# Installing
`npm i @fluffy-spoon/inverse-vue --save`

# Example
_To understand the following example, you have to be familiar with `[@fluffy-spoon/inverse](https://www.npmjs.com/package/@fluffy-spoon/inverse-vue)` first._

## Setting up the plugin
To use the plugin, we must provide it with the IOC container we want to use.

```typescript
import Container from '@fluffy-spoon/inverse';
import VueInversePlugin from '@fluffy-spoon/inverse-vue';

var container = new Container();
Vue.usePlugin(VueInversePlugin, { container });
```

## Using the plugin
In the following usage scenario, we have a component called `MyVueComponent` which injects a `Foo` as a dependency.

```typescript
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

@Injectable
class Foo { }
```

Voila! Now if you provide `MyVueComponent` to Vue.js anywhere, it will always have its constructor parameters injected in.