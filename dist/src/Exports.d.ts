import "reflect-metadata";
import { Container } from '@fluffy-spoon/inverse';
import { PluginObject } from 'vue';
export declare function VueInjectable<T extends {
    new (...args: any[]): any;
}>(cls: T): T;
export declare var VueInverse: PluginObject<Container>;
