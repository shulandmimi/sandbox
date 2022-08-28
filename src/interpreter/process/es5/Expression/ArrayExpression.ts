import { ArrayExpression } from '@swc/core';
import Scope from '../../../../runtime/scope';
import { script } from '../index';

export default function array_expression(node: ArrayExpression, scope: Scope) {
    const array = [];
    for (const element of node.elements) {
        array.push(element ? script(element.expression, scope) : undefined);
    }
    return array;
}
