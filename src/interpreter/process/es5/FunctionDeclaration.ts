import { FunctionDeclaration, Identifier, parse } from '@swc/core';
import Scope from '../../../runtime/scope';
import { script } from './index';

export default function function_declaration(node: FunctionDeclaration, scope: Scope) {
    const callback = function (this: any, ...arg: any[]) {
        const function_scope = new Scope();

        function_scope.parent = scope;

        const objectArguments: Record<string, any> = { length: arg.length };
        for (let i = 0; i < arg.length; i++) {
            objectArguments[i] = arg[i];
            /**
             * function foo() {
             *      return arguments;
             * }
             *
             * foo(1, 2, 3);
             */
            if (i >= node.params.length) continue;
            function_scope.var((node.params[i].pat as Identifier).value, arg[i]);
        }

        function_scope.const('this', this || {});
        function_scope.const('arguments', objectArguments);

        const result = script(node.body!, function_scope);
        return result;
    };

    scope.var(node.identifier.value, callback);

    return callback;
}
