import { parse } from '@swc/core';

parse("console.log('hello world')", {
    syntax: 'ecmascript',
    target: 'es5',
    isModule: false,
    script: false,
}).then(res => {
    console.log(res.body);
});
