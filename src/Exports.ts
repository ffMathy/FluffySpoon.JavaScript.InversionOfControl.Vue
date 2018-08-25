import "reflect-metadata";

import { Container } from '@fluffy-spoon/inverse';

import { addInjectableMetadata, getParameterTypesMetadata } from '@fluffy-spoon/inverse/dist/src/Decorators';
import { getOrCreateArgumentsMetadataForTarget, extractClassName,  } from '@fluffy-spoon/inverse/dist/src/Utilities';

import Vue, { PluginObject, VueConstructor } from 'vue';

export function VueInjectable<T extends { new(...args: any[]): any }>(cls: T) {
    const parameterTypesMetadata = getParameterTypesMetadata(cls);
    if(!parameterTypesMetadata)
        throw new Error('A @VueInjectable decorator must be defined after other decorators that alter class metadata for the class ' + extractClassName(cls) + '. If in doubt, re-order the decorators so that the @VueInjectable decorator is last.');

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