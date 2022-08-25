import { AssignmentExpression, AssignmentOperator, Identifier } from '@swc/core';
import { script } from '..';
import Scope from '../../../../runtime/scope';
import { Variate, VarVariate } from '../../../../runtime/variate';

export default function assignment_expression(node: AssignmentExpression, scope: Scope) {
    switch (node.left.type) {
        case 'MemberExpression': {
            const object = script(node.left.object, scope);
            const property = (<Identifier>node.left.property).value;

            const r = script(node.right, scope);

            const a = new VarVariate(object[property]);
            const b = new VarVariate(r);

            assignment(node.operator, a, b);

            object[property] = a.get();
            break;
        }
    }
}

function assignment(operator: AssignmentOperator, a: Variate, b: Variate) {
    switch (operator) {
        case '=': {
            a.set(b.get());
            break;
        }
    }
}
