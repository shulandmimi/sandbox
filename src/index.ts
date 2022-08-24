import Scope from './runtime/scope';
import Sandbox from './sandbox';

const scope = new Scope();

scope.set('console', console);

const sandbox = new Sandbox('console.log("hello world")', {
    scope,
});

sandbox.excute().then((res) => {
    console.log(res);
});
