import { StringLiteral } from '@swc/core';
import Scope from '../../../../runtime/scope';

export default function string_literal(node: StringLiteral, scope: Scope) {
    return node.value;
}
