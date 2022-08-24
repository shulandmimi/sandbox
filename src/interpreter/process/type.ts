import { ComputedPropName, Expression, Import, ModuleItem, PrivateName, Super } from '@swc/core';

export type AstNode = ModuleItem | Expression | Super | Import | PrivateName | ComputedPropName;
