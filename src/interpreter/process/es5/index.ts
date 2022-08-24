import { CallExpression, ExpressionStatement, Identifier, MemberExpression, StringLiteral } from '@swc/core';
import Scope from '../../../runtime/scope';
import { ScriptProcessHandler } from '../../type';
import { AstNode } from '../type';
import call_expression from './CallExpression';
import expression_statement from './ExpressionStatement';
import identifier from './Identifier';
import string_literal from './Literal/String';
import member_expression from './MemberExpression';

export default <ScriptProcessHandler>function scripts(modules, scope) {
    modules.forEach((module) => script(module, scope));
};

interface Actions {
    ExpressionStatement: (node: ExpressionStatement, scope: Scope) => any;
    CallExpression: (node: CallExpression, scope: Scope) => any;
    MemberExpression: (node: MemberExpression, scope: Scope) => any;
    Identifier: (node: Identifier, scope: Scope) => any;
    StringLiteral: (node: StringLiteral, scope: Scope) => string;
}

const actions: Actions = {
    ExpressionStatement: expression_statement,
    CallExpression: call_expression,
    MemberExpression: member_expression,
    Identifier: identifier,
    StringLiteral: string_literal,
};

export function script(module: AstNode, scope: Scope) {
    // @ts-ignore
    const action = actions[module.type];

    console.log(module);

    if (action) {
        return action(module, scope);
    } else {
        throw new Error('syntax error');
    }
}
