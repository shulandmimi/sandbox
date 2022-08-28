import {
    CallExpression,
    ExpressionStatement,
    FunctionDeclaration,
    Identifier,
    MemberExpression,
    StringLiteral,
    NumericLiteral,
    ReturnStatement,
} from '@swc/core';
import Scope from '../../../runtime/scope';
import { ScriptProcessHandler } from '../../type';
import { AstNode } from '../type';
import call_expression from './CallExpression';
import expression_statement from './ExpressionStatement';
import identifier from './Identifier';
import string_literal from './Literal/String';
import member_expression from './MemberExpression';
import function_declaration from './FunctionDeclaration';
import block_statement from './BlockStatement';
import assignment_expression from './Assignment/AssignmentExpression';
import this_expression from './Expression/ThisExpression';
import number_literal from './Literal/Number';
import return_statement from './ReturnStatement';
import array_expression from './Expression/ArrayExpression';
import variable_declaration from './Declaration/VariableDeclaration';
import scope_preload from './Rule/scope/scope_preload';

export default <ScriptProcessHandler>function scripts(modules, scope) {
    scope_preload(modules, scope);
    modules.forEach((module) => script(module, scope));
};

interface Actions {
    ExpressionStatement: (node: ExpressionStatement, scope: Scope) => any;
    CallExpression: (node: CallExpression, scope: Scope) => any;
    MemberExpression: (node: MemberExpression, scope: Scope) => any;
    Identifier: (node: Identifier, scope: Scope) => any;
    StringLiteral: (node: StringLiteral, scope: Scope) => string;
    FunctionDeclaration: (node: FunctionDeclaration, scope: Scope) => Function;
    BlockStatement: typeof block_statement;
    AssignmentExpression: typeof assignment_expression;
    ThisExpression: typeof this_expression;
    NumericLiteral: typeof number_literal;
    ReturnStatement: typeof return_statement;
    ArrayExpression: typeof array_expression;
    VariableDeclaration: typeof variable_declaration;
}

const actions: Actions = {
    ExpressionStatement: expression_statement,
    CallExpression: call_expression,
    MemberExpression: member_expression,
    Identifier: identifier,
    StringLiteral: string_literal,
    FunctionDeclaration: function_declaration,
    BlockStatement: block_statement,
    AssignmentExpression: assignment_expression,
    ThisExpression: this_expression,
    NumericLiteral: number_literal,
    ReturnStatement: return_statement,
    ArrayExpression: array_expression,
    VariableDeclaration: variable_declaration,
};

export function script(module: AstNode, scope: Scope) {
    // @ts-ignore
    const action = actions[module.type];

    if (action) {
        return action(module, scope);
    } else {
        console.log(module);
        throw new Error(`type "${module.type}" not implemented`);
    }
}
