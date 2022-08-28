import { ConstVariate, LetVariate, Variate, VarVariate } from './variate';

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

    const(key: string, value: any) {
        if (this.scope.has(key)) {
            return false;
        }
        this.scope.set(key, new ConstVariate(value));
        return true;
    }

    let(key: string, value: any) {
        if (this.scope.has(key)) {
            return false;
        }
        this.scope.set(key, new LetVariate(value));
        return true;
    }

    var(key: string, value: any) {
        this.scope.set(key, new VarVariate(value));
        return true;
    }

    has_in_current_scope(key: string): boolean {
        return this.scope.has(key);
    }

    has_in_scope(key: string): boolean {
        let scope: Scope | null = this;
        while (scope) {
            if (scope.has_in_current_scope(key)) return true;
            else scope = scope.parent;
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
