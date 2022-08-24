import { CallExpression } from '@swc/core';
import Scope from '../../../runtime/scope';
import { script } from './index';

export default function call_expression(node: CallExpression, scope: Scope) {
    const callee = <Function>script(node.callee, scope);
    const args = node.arguments.map((item) => script(item.expression, scope));

    return callee.apply({}, args);
}
