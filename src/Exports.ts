import "reflect-metadata";

import { Container } from '@fluffy-spoon/inverse';

import { addInjectableMetadata, getParameterTypesMetadata } from '@fluffy-spoon/inverse/dist/src/Decorators';
import { getOrCreateArgumentsMetadataForTarget, extractClassName,  } from '@fluffy-spoon/inverse/dist/src/Utilities';

import Vue, { PluginObject, VueConstructor } from 'vue';

export function VueInjectable<T extends { new(...args: any[]): any }>(cls: T): T {
    const parameterTypesMetadata = getParameterTypesMetadata(cls);
    const className = extractClassName(cls);
    if(!parameterTypesMetadata)
        throw new Error('Could not find metadata for the class ' + className + '.\nPotential causes:\n-> The @VueInjectable decorator was defined before other decorators that alter class metadata.\n-> The class extends a mixin class. Mixins are not currently supported.\n-> You do not have any arguments to inject in the constructor that have been decorated with @Inject.\n');

    var injectableClass = class extends cls {
        constructor(..._args: any[]) {
            const container = (Vue as any).$inverseContainer as Container;

            const argumentDictionary = getOrCreateArgumentsMetadataForTarget(cls);
            const argumentIndexes = argumentDictionary.getParameterIndexes();
 
            const argumentsToInject = [];
            for(let index of argumentIndexes) {
                const type = argumentDictionary.getParameter(index);
                argumentsToInject[index] = container.resolveInstance(type);
            }

            super(...argumentsToInject);
        }
    };
    
    addInjectableMetadata(cls);

    return injectableClass;
}

export var VueInverse = <PluginObject<Container>> {
    install(Vue: VueConstructor<Vue>, container: Container) {
        if(!container)
            throw new Error('A container must be supplied when setting up the Inverse plugin.');

        if(!(container instanceof Container))
            throw new Error('The provided container is not a Container instance.');

        (Vue as any).$inverseContainer = container;
    }
}