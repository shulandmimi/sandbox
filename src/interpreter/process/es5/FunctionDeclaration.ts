import { FunctionDeclaration, Identifier } from '@swc/core';
import Scope from '../../../runtime/scope';
import { script } from './index';

export default function function_declaration(node: FunctionDeclaration, scope: Scope) {
    const callback = function (this: any, ...arg: any[]) {
        const function_scope = new Scope();
        scope.parent = scope;

        for (let i = 0; i < arg.length; i++) {
            scope.var((node.params[i].pat as Identifier).value, arg[i]);
        }

        function_scope.const('this', this || {});
        function_scope.const('arguments', arg);

        const result = script(node.body!, function_scope);
        console.log(result, 'function declaration')
        return result;
    };

    scope.var(node.identifier.value, callback);

    return callback;
}
