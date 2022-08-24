import { Identifier } from '@swc/core';
import Scope from '../../../runtime/scope';

export default function identifier(node: Identifier, scope: Scope) {
    return scope.get(node.value);
}
