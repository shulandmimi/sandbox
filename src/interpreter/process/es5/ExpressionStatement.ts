import { ExpressionStatement } from '@swc/core';
import Scope from '../../../runtime/scope';
import { script } from './index';

export default function expression_statement(node: ExpressionStatement, scope: Scope) {
    script(node.expression, scope);
}
