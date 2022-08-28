import { BlockStatement } from '@swc/core';
import Scope from '../../../runtime/scope';
import { script } from './index';
import scope_preload from './Rule/scope/scope_preload';

export default function block_statement(node: BlockStatement, scope: Scope) {
    let lastReturn;

    scope_preload(node.stmts, scope);

    for (let i = 0; i < node.stmts.length; i++) {
        lastReturn = script(node.stmts[i], scope);
    }

    return lastReturn;
}
