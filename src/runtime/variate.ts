enum VariateType {
    FUNCTION,
    VAR,
    LET,
    CONST,
}

export abstract class Variate<T = any> {
    protected abstract value: T;
    protected abstract type: VariateType;
    abstract get(): T;
    abstract set(v: T): void;
}

export class FunctionVariate extends Variate {
    type = VariateType.FUNCTION;

    constructor(public value: any) {
        super();
    }

    get() {
        return this.value;
    }

    set(v: any): void {
        this.value = v;
    }
}

export class ConstVariate extends Variate {
    type = VariateType.CONST;

    get() {
        return this.value;
    }

    set(v: any): void {
        return;
    }

    constructor(public value: any) {
        super();
    }
}

export class VarVariate extends Variate {
    type = VariateType.VAR;

    constructor(public value: any) {
        super();
    }

    get() {
        return this.value;
    }

    set(v: any): void {
        this.value = v;
    }
}

export class LetVariate extends Variate {
    type = VariateType.LET;

    constructor(public value: any) {
        super();
    }

    get() {
        return this.value;
    }

    set(v: any) {
        this.value = v;
    }
}
