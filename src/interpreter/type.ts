import { Expression, ModuleItem } from '@swc/core';
import Scope from '../runtime/scope';

export interface ScriptOptions {
    ecmaversion: 'es5';
    scope: Scope;
}

export type ScriptProcessHandler = (modules: (ModuleItem | Expression)[], scope: Scope) => void;
