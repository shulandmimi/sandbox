import { ReturnStatement } from '@swc/core';
import Scope from '../../../runtime/scope';
import { script } from './index';

export default function return_statement(node: ReturnStatement, scope: Scope) {
    if (node.argument) return script(node.argument, scope);
    return undefined;
}
