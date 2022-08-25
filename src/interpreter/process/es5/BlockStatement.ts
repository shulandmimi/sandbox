import { BlockStatement } from '@swc/core';
import Scope from '../../../runtime/scope';
import { script } from './index';

export default function block_statement(node: BlockStatement, scope: Scope) {
    let lastReturn;
    for (let i = 0; i < node.stmts.length; i++) {
        lastReturn = script(node.stmts[i], scope);
    }

    return lastReturn;
}
