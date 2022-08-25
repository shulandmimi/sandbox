import {
    ArrayPattern,
    AssignmentOperator,
    AssignmentPattern,
    ComputedPropName,
    Expression,
    Import,
    ModuleItem,
    ObjectPattern,
    PrivateName,
    RestElement,
    Super,
    ThisExpression,
} from '@swc/core';

export type AstNode =
    | ModuleItem
    | Expression
    | Super
    | Import
    | PrivateName
    | ComputedPropName
    | ThisExpression
    | ArrayPattern
    | RestElement
    | ObjectPattern
    | AssignmentPattern;
