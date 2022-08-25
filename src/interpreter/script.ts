import { Expression, ModuleItem } from '@swc/core';
import Scope from '../runtime/scope';
import { ScriptOptions, ScriptProcessHandler } from './type';

const defaultOptions: Partial<ScriptOptions> = {
    ecmaversion: 'es5',
};

export default async function Script(modules: (ModuleItem | Expression)[], options: Partial<ScriptOptions> = {}) {
    const _options = Object.assign({}, defaultOptions, options);
    const scope = _options.scope ?? new Scope();

    let module: ScriptProcessHandler = () => void 0;

    switch (_options.ecmaversion) {
        case 'es5': {
            module = (await import('./process/es5')).default;
            break;
        }
    }

    return module(modules, scope);
}
