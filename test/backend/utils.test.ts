import {removeAllPrivateProperties,clone} from "../../src/backend/utils";

class A {
    constructor(
        public a: number
    ) {}
}

class B {
    constructor(
        private a: A
    ) {}
}

class C {
    constructor(
        private _a: A
    ) {}
}

describe("utils.ts", () => {
    describe("removeAllPrivateProperties", () => {
        test("should not remove private properties without the '_'", () => {
            const a = new A(1);
            const b = new B(a);
            expect(removeAllPrivateProperties(b)).toEqual({a: {a: 1}});
        });

        test("should remove private properties with the '_'", () => {
            const a = new A(1);
            const c = new C(a);
            expect(removeAllPrivateProperties(c)).toEqual({});
        });
    });
    describe("clone", () => {
        test("should clone an object without reference", () => {
            const a = new A(1);
            const cloneA = clone(a);
            expect(cloneA).toEqual(a);
            a.a = 10;
            expect(cloneA).not.toEqual(a);
        });
    });
});


