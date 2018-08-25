import "reflect-metadata";
import { Container } from '@fluffy-spoon/inverse';
import { PluginObject } from 'vue';
export declare function VueInjectable<T extends {
    new (...args: any[]): any;
}>(cls: T): {
    new (..._args: any[]): {
        [x: string]: any;
    };
} & T;
declare type Options = {
    container: Container;
};
declare const _default: PluginObject<Options>;
export default _default;
