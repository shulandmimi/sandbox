import { NumericLiteral } from '@swc/core';
import Scope from '../../../../runtime/scope';

export default function number_literal(node: NumericLiteral, scope: Scope) {
    return node.value;
}
