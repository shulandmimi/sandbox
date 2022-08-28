import { BlockStatement } from '@swc/core';
import Scope from '../../../../../runtime/scope';
import variable_declaration from '../../Declaration/VariableDeclaration';
import { script } from '../../index';
import { AstNode } from '../../../type';

/** function 和 变量 提升 */
export default function scope_preload(node: AstNode[], scope: Scope) {
    for (const stmt of node) {
        switch (stmt.type) {
            case 'FunctionDeclaration':
                script(stmt, scope);
                break;
            case 'VariableDeclaration':
                variable_declaration(stmt, scope, true);
                break;
        }
    }
}
