enum VariateType {
    FUNCTION,
    VAR,
    LET,
    CONST,
}

// interface Variate {
//     type: VariateType;
// }

abstract class Variate {
    abstract value: any;
    abstract type: VariateType;
    abstract get(): any;
    abstract set(v: any): void;
}

class FunctionVariate extends Variate {
    type = VariateType.FUNCTION;
    constructor(public value: any) {
        super();
    }
}
