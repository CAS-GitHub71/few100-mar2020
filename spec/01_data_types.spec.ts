describe('declare a variable in typescript', () => {
    it('constant might not mean what you think it means', () => {
        // const means the variable cannot be reassigned to.
        const PI = 3.1415927;
        // PI = 3;
        const numbers = [1, 2, 3];
        // numbers = [9, 2, 3];
        numbers[0] = 9;
        const movie = { title: 'Jaws', yearReleased: 1979 };
        // movie = { title}
        movie.yearReleased = 1977;
    });
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
            // tslint:disable-next-line
            const subtract: MathOperation = function (a: number, b: number) {
                return a - b;
            };

        });
    });
});

describe('literals', () => {
    describe('string literals', () => {
        it('has then', () => {
            const message = 'She told me "You look nice today!"';
            const message2 = 'The Author was Flannery O\'Connor';
            // tslint:disable-next-line: quotemark
            const message3 = "The Author was Flannery O'Connor";
        });
        it('has template strings', () => {
            const message = `She told me "You look good today!"`;
            const message2 = `THe author was Flannery O'Connor`;

            const story = `Life
            isn't about waiting for the storm to pass...
            It's learning to Dance in the rain...`;

            const fragment = `<div>
            <h1>Hello</h1>
            </div>`;

            // tslint:disable-next-line: one-variable-per-declaration
            const name = 'Bob',
                age = 38;
            const message3 = `The name is ${name} and the age is ${age}`;
            const message4 = 'The name is ' + name + ' and the age is ' + age;
            expect(message3).toEqual(message4);
        });
        it('some various misc. things about literals', () => {
            const n1 = 1;
            const n2 = 1.3;
            const n3 = 0xff; // base 16
            const n4 = 0b01010; // binary
            const n5 = 0o23; // octal.
            const big = 1_000_000;
        });
    });
});
describe('array literals and tuple types', () => {
    it('two ways to declare an array', () => {
        const numbers: (number | string)[] = [1, 2, 3, 4];
        numbers[0] = 'Tacos';
        numbers[2] = 'Burritos';
    });
    it('has array destructiuring', () => {
        //                  0      1       2        3;
        const friends = ['Sean', 'Amy', 'David', 'Sarah'];
        // const f1 = friends[0];
        // const f2 = friends[1];
        // const f3 = friends[3];
        const [f1, f2, , f3] = friends; // destructuring array
        expect(f1).toBe('Sean');
        expect(f2).toBe('Amy');
        expect(f3).toBe('Sarah');
        const [first, ...allTheOthers] = friends; // ... "the rest" (rest operator) ***
        expect(first).toBe('Sean');
        expect(allTheOthers).toEqual(['Amy', 'David', 'Sarah']);
    });
    it('using immutable techniques to change  arrays', () => {
        const friends = ['Sean', 'Amy', 'David', 'Sarah'];
        const friends2 = ['Henry', ...friends]; // ... "the spread operator" ***
        // if you do not use the ... you will get a nested array.
        expect(friends2).toEqual(['Henry', 'Sean', 'Amy', 'David', 'Sarah']);
    });
});
describe('a practical example of a tuple', () => {
    it('how non-funcationa pragrammers would solve the problem', () => {
        interface FormatNameResult { formattedName: string; numberOfletters: number; }
        // how to do an anonomce interface,above we gave it a name
        // function formatName(first: string, last: string): { formattedName: string; numberOfletters: number; }
        function formatName(first: string, last: string): FormatNameResult { // FormatNameResult is the return type
            const name = `${last}, ${first}`;
            return {
                formattedName: name,
                numberOfletters: name.length
            };
        }
        // const result = formatName('Han', 'Solo');
        const { formattedName, numberOfletters: letters } = formatName('Han', 'Solo'); // deconstructed Ojbect
        expect(formattedName).toBe('Solo, Han');
        expect(letters).toBe(9);
    });
    it('the same thing with tuples', () => {
        function formatName2(first: string, last: string): [string, number] {
            const name = `${last}, ${first}`;
            return [name, name.length];
        }
        const [n, l] = formatName2('Han', 'Solo');
        expect(n).toBe('Solo, Han');
        expect(l).toBe(9);
    });
    it('tuple syntax examples', () => {
        type Musician = [string, string, number, string];
        const nick: Musician = ['Nick', 'Cave', 58, 'Singer'];
        const warren: Musician = ['Warren', 'Ellis', 63, 'Violin'];
        expect(nick[2]).toBe(58);
    });
});

describe('Object liternal and interfaces', () => {
    it('anonymous objects are defined by an interface', () => {
        const thor = {
            title: 'Thor: Ragnorak',
            direcotr: 'Taika Wiltiti',
            yearReleased: 2017
        };
        // thor.yearReleased = 2018;
        const updatedThor = { ...thor, yearReleased: 2018 };
        expect(updatedThor.title).toBe('Thor: Ragnorak');
        expect(updatedThor.yearReleased).toBe(2018);
        expect(thor.yearReleased).toBe(2017);
    });
    it('extensible objects', () => {
        interface Book { title: string; author: string; pages: number; publisher?: string; year: number | null; }
        const book: Book = {
            title: 'Lord of the Ring',
            author: 'Tolken',
            pages: 50000,
            year: null
        };
        book.publisher = '';
        function doBookStuff(someNBook: Book) {
            // evaluating true "Falthy or Truthy"
            const hasPublisher = !!someNBook.publisher; // this will return if publisher is "truthy"
            if (!book.publisher) {
                // don't count on that being there...
            }
        }
        function doBookStuff2(someBook: Book) {
            const hasPublisher = !!someBook.publisher; // this will return if publisher is "truthy"
            if (!hasPublisher) {
                // don't count ont hat being there..
            }
        }
    });
    it('truth table', () => {
        expect(undefined).toBeFalsy();
        expect(null).toBeFalsy();
        expect(0).toBeFalsy();
        expect('').toBeFalsy();
        expect(1).toBeTruthy();
        expect(-1).toBeTruthy();
        expect(NaN).toBeFalsy();
        expect('penguin').toBeTruthy();
    });
});

describe('structural typing (aka "duck typing")', () => {
    it('an example', () => {
        interface IHaveAMessage { message: string; }
        function logItOut(thingy: IHaveAMessage) {
            console.log(`At ${new Date().toISOString()}: ${thingy.message}`);
        }

        logItOut({ message: 'Hello' });
        const phoneCall = {
            from: 'Mom',
            line: 'Home Phone',
            message: 'Call your mom'
        };
        logItOut(phoneCall);
    });
});
describe('enums and string unions', () => {
    it('assigning seats', () => {
        type SeatType = 'aisle' | 'window' | 'middle';
        let mySeat: SeatType;
        mySeat = (() => 'window' as SeatType)();
        let price = 0;
        switch (mySeat) {
            case 'aisle': {
                price = 100;
                return;
            }
            case 'middle': {
                price = 75;
                return;
            }
            case 'window': {
                price = 125;
                return;
            }
        }
        expect(price).toBe(125);
        type FileType = 'xml' | 'json' | 'jsonp' | 'text';
        const theFile: FileType = 'jsonp';
        enum AccountType { Standard, Gold = 99, Platinum }
        const myAcccount: AccountType = AccountType.Gold;
    });

});
