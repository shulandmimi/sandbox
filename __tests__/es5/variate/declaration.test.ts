import Sandbox from '@/sandbox';
import { initial_properties_from_object } from '../../../src/interpreter/process/default';

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
});
