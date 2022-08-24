import { parse, Module } from '@swc/core';
import Script from '../interpreter/script';
import Scope from '../runtime/scope';

interface SandboxOptins {
    scope: Scope;
}

const defaultOptions: Partial<SandboxOptins> = {};

export default class Sandbox {
    private options: SandboxOptins = <SandboxOptins>defaultOptions;

    private ast: Module | null = null;

    constructor(public code: string, options: Partial<SandboxOptins> = {}) {
        Object.assign(this.options, options);
    }

    private async parse() {
        const ast = await parse(this.code, {
            syntax: 'ecmascript',
            target: 'es5',
            script: false,
        });

        return ast;
    }

    async excute() {
        const ast = this.ast || (await this.parse());

        if (this.ast === null) this.ast = ast;

        const scope = new Scope();

        Scope.merge_scope(scope, this.options.scope);

        Script(ast.body, { scope });
    }
}
