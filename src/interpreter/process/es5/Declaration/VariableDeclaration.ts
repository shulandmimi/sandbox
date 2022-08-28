import { VariableDeclaration } from '@swc/core';
import Scope from '../../../../runtime/scope';
import { script } from '../index';

export default function variable_declaration(node: VariableDeclaration, scope: Scope, preload: boolean = false) {
    switch (node.kind) {
        case 'var':
            for (const declaration of node.declarations) {
                switch (declaration.id.type) {
                    case 'Identifier': {
                        const initial = preload ? undefined : typeof declaration.init === 'undefined' ? undefined : script(declaration.init, scope);
                        scope.var(declaration.id.value, initial);
                        break;
                    }
                }
            }
            break;
        default:
            throw new SyntaxError(`${node.kind} not support`);
    }
}
