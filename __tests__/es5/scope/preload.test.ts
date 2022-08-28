import { initial_properties_from_object } from '@/interpreter/process/default';
import Sandbox from '@/sandbox';

describe('声明提升', () => {
    it('当在声明之前取值，应该为 undefined', async () => {
        const source = `
            var str = 'parent';
            function foo() {
                callback(str);
                var str = 'hello world';
            }

            foo();
        `;
        const callback = jest.fn();
        const scope = initial_properties_from_object({
            callback,
        });

        const sandbox = new Sandbox(source, {
            scope,
        });

        await sandbox.excute();

        expect(callback).toHaveBeenLastCalledWith(undefined);
    });

    it('当作用域中存在 function 声明时，应该在作用域创建时提升至顶端', async () => {
        const source = `
            callback(foo);
            function foo() {}
        `;
        const callback = jest.fn();
        const scope = initial_properties_from_object({
            callback,
        });

        const sandbox = new Sandbox(source, {
            scope,
        });

        await sandbox.excute();

        expect(callback.mock.calls[0][0]).toBeInstanceOf(Function);
    });
});
