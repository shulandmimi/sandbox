import Scope from '../../runtime/scope';
import { ConstVariate } from '../../runtime/variate';

export default function initial_global_properties(): Scope {
    const initial: Record<string, any> = {
        console: console,
    };

    const scope = initial_properties_from_object(initial);

    return scope;
}

export function initial_properties_from_object(properties: Record<string, any>): Scope {
    const scope = new Scope();

    for (const key in properties) {
        scope.set(key, new ConstVariate(properties[key]));
    }

    return scope;
}
