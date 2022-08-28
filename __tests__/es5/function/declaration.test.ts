import Sandbox from '@/sandbox';

describe('function declaration', () => {
    it('declaration foo', async () => {
        const source = `
            function foo() {
                return 0;
            }
        `;
        const sandbox = new Sandbox(source);

        const { global } = await sandbox.excute();

        expect(global.get('foo')).not.toBeUndefined();
    });

    it('declaration function this', async () => {
        const source = `
            function foo() {
                this.name = 123;

                return this;
            }
        `;

        const sandbox = new Sandbox(source);

        const { global } = await sandbox.excute();

        const function_context = global.get('foo')?.get()();
        expect(function_context).toEqual({ name: 123 });
    });

    it('repeat declaration function', async () => {
        const source = `
            function foo() {
                return 'first';
            }
            function foo() {
                return 'second';
            }
        `;

        const sandbox = new Sandbox(source);

        const { global } = await sandbox.excute();

        const foo = global.get('foo')?.get()();

        expect(foo).toBe('second');
    });
});
