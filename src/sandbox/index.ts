import { parse, Module } from '@swc/core';

interface SandboxOptins {}

const defaultOptions: SandboxOptins = {};

export default class Sandbox {
    private options: SandboxOptins = defaultOptions;

    private ast: Module | null = null;

    constructor(public code: string, options: Partial<SandboxOptins>) {
        Object.assign(this.options, options);
    }

    private async parse() {
        const ast = await parse(this.code, {
            syntax: 'ecmascript',
            target: 'es5',
        });

        return ast;
    }

    async excute() {
        const ast = this.ast || (await this.parse());

        if (this.ast === null) this.ast = ast;
    }
}
