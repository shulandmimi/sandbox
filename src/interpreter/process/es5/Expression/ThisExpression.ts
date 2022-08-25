import { ThisExpression } from '@swc/core';
import Scope from '../../../../runtime/scope';

export default function this_expression(node: ThisExpression, scope: Scope) {
    console.log(scope.get('this')?.get());
    return scope.get('this')?.get();
}
