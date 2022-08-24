import { MemberExpression } from '@swc/core';
import Scope from '../../../runtime/scope';
import { script } from './index';

export default function member_expression(node: MemberExpression, scope: Scope) {
    const object = script(node.object, scope);
    const property_node = node.property;
    let property;
    switch (property_node.type) {
        case 'Identifier':
            property = property_node.value;
            break;
        case 'PrivateName':
            property = property_node.id.value;
            break;
        case 'Computed':
            return script(node, scope);
    }

    return Reflect.get(object, property);
}
