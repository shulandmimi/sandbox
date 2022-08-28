import { VariableDeclaration } from '@swc/core';
import Scope from '../../../../runtime/scope';
import { script } from '../index';

export default function variable_declaration(node: VariableDeclaration, scope: Scope) {
    switch (node.kind) {
        case 'var':
            for (const declaration of node.declarations) {
                switch (declaration.id.type) {
                    case 'Identifier':
                        scope.var(declaration.id.value, declaration.init ? script(declaration.init, scope) : undefined);
                        break;
                }
            }
            break;
        default:
            throw new SyntaxError(`const not support`);
    }
}
