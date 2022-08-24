export default class Scope {
    parent: Scope | null = null;
    scope: Map<string, any> = new Map();

    constructor(scope?: Map<string, any>) {
        if (scope) Scope.merge_scope(this, scope);
    }

    get(key: string): any {
        const scope = this.scope;

        if (scope.has(key)) return scope.get(key);

        return this.parent?.get(key);
    }

    set(key: string, value: any): boolean {
        const scope = this.scope;

        if (scope.has(key) || !this.parent) {
            scope.set(key, value);
        } else {
            this.parent.set(key, value);
        }

        return false;
    }

    static merge_scope(scope: Scope, ...scopes: (Map<string, any> | Scope)[]) {
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
