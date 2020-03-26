describe('declare a variable in typescript', () => {
    describe('typing', () => {
        it('implicitly typed variables', () => {
            let name = 'Chistine';
            name = 'Ray';
            const age = 50;

        });
        it('explicitly', () => {
            let name: string;
            name = 'Sue';
        });
        it('union types', () => {
            let stuff: string | number | string[];
            stuff = 'food';
            stuff = 42;
            stuff = ['Tacos', 'food'];
        });
        it('type aliases', () => {
            type ThingswithLettersAndStuff = string;
            const name: ThingswithLettersAndStuff = 'Joe';
            type MathOperation = (a: number, b: number) => number;
            const add: MathOperation = (a, b) => a + b;
            expect(add(2, 2)).toBe(4);
            const subtract: MathOperation = function (a: number, b: number) {
                return a - b;
            };

        });
    });
});
