import { CallExpression } from '@swc/core';
import Scope from '../../../runtime/scope';
import { script } from './index';

export default function call_expression(node: CallExpression, scope: Scope) {
    let object: Object = {};
    let callee!: Function;
    const args = node.arguments.map((item) => script(item.expression, scope));

    switch (node.callee.type) {
        case 'Identifier': {
            callee = <Function>scope.get(node.callee.value)?.get();
            break;
        }
        case 'MemberExpression': {
            [callee, object] = <[Function, Object]>script(node.callee, scope);
            break;
        }

        default:
            throw new Error(`CallExpression "${node.callee.type}" not implements`);
    }

    return callee.apply(object, args);
}
