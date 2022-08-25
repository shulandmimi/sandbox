import { Variate } from './variate';

export default class Scope {
    parent: Scope | null = null;
    scope: Map<string, Variate> = new Map();

    constructor(scope?: Map<string, Variate>) {
        if (scope) Scope.merge_scope(this, scope);
    }

    get(key: string): Variate | undefined {
        const scope = this.scope;

        if (scope.has(key)) return scope.get(key);

        return this.parent?.get(key);
    }

    set(key: string, value: Variate): boolean {
        const scope = this.scope;

        if (scope.has(key) || !this.parent) {
            scope.set(key, value);
        } else {
            this.parent.set(key, value);
        }

        return false;
    }

    static merge_scope(scope: Scope, ...scopes: (Map<string, Variate> | Scope)[]) {
        for (const s of scopes) {
            if (!s) continue;
            if (s instanceof Scope) {
                this.merge_scope(scope, s.scope);
            } else {
                for (const [key, val] of s) {
                    scope.set(key, val);
                }
            }
        }
    }
}
