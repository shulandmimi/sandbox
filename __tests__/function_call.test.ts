import Sandbox from '../src/sandbox';
import Scope from '../src/runtime/scope';

describe('function call', () => {
    it('function 可以被执行', async () => {
        const foo = jest.fn();

        const scope = new Scope();

        scope.set('foo', foo);

        const sandbox = new Sandbox('foo()', { scope });

        await sandbox.excute();

        expect(foo).toHaveBeenCalled();
    });

    describe('function 中的 this', () => {
        it('obj.foo 的情况下， foo 运行时的 this 应该是 obj', async () => {
            const foo = jest.fn(function (this: any) {
                return this;
            });
            const obj = {
                a: 1,
                foo: foo,
            };

            const scope = new Scope();

            scope.set('obj', obj);

            const sandbox = new Sandbox('obj.foo()', { scope });

            await sandbox.excute();

            expect(foo).toHaveLastReturnedWith(obj);
        });
    });
});
