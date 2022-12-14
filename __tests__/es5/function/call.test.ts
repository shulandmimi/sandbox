import Sandbox from '@/sandbox';
import { initial_properties_from_object } from '@/interpreter/process/default';

describe('function call', () => {
    it('function 可以被执行', async () => {
        const foo = jest.fn();

        const scope = initial_properties_from_object({
            foo,
        });

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

            const scope = initial_properties_from_object({
                obj,
            });

            const sandbox = new Sandbox('obj.foo()', { scope });

            await sandbox.excute();

            expect(foo).toHaveLastReturnedWith(obj);
        });
    });

    describe('params', () => {
        it('Parameter passing', async () => {
            const source = `
                function foo(first, second, third) {
                    return [first, second, third];
                }
            `;

            const sandbox = new Sandbox(source);

            const { global } = await sandbox.excute();

            const foo = global.get('foo')?.get();

            expect(foo('1', '2', '3')).toEqual(['1', '2', '3']);
        });

        it('arguments', async () => {
            const source = `
                function foo() {
                    return arguments;
                }
            `;

            const sandbox = new Sandbox(source);

            const { global } = await sandbox.excute();

            const foo = global.get('foo')?.get();
            expect(foo(1, 2, 3)).toEqual({ '0': 1, '1': 2, '2': 3, length: 3 });
        });
    });
});
