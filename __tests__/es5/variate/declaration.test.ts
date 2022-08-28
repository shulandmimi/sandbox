import Sandbox from '@/sandbox';

describe('variate', () => {
    it('var declaration', async () => {
        const source = `
            var str = 'hello world';
        `;

        const sandbox = new Sandbox(source);

        const { global } = await sandbox.excute();

        const str = global.get('str')?.get();
        expect(str).toBe('hello world');
    });

    // it('当在声明之前取值，应该为 undefined');
});
