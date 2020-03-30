import { isEven } from './utils';

describe('functions', () => {
    describe('declaring them', () => {
        it('has two kinds and three ways to create them', () => {
            // name function (can use before it is declared - it is in scope)
            // compiler moves code in the correct order. (named functions are hoisted to the top)
            function add(a: number, b: number) {
                return a + b;
            }
            // anonymous functions
            // tslint:disable-next-line: only-arrow-functions
            const subtract = function(a: number, b: number) {
                return a - b;
            };
            const multiply = (a: number, b: number) => a * b;
            expect(multiply(3, 3)).toBe(9);
            type MathOp = (a: number, b: number) => number;
            function doMath(a: number, b: number, f: MathOp) {
                return f(a, b);
            }
            expect(doMath(2, 2, add)).toBe(4);
            expect(doMath(2, 2, subtract)).toBe(0);
            expect(doMath(2, 5, multiply)).toBe(10);
            expect(doMath(10, 2, (a, b) => a / b)).toBe(5);
        });
    });
    describe('arguments to functions', () => {
        it('optional default arguments', () => {
            function add(a: number = 10, b: number = 5, ...rest: number[]) { // "Rest"
                const firstTwo = a + b;
                return rest.reduce((s, n) => s + n, firstTwo);
            }
            expect(add(undefined, 10)).toBe(20);
            expect(add()).toBe(15);
            expect(add(1)).toBe(6);
            expect(add(1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe(45);
            function addThemAll(...rest: number[]) {
                return rest.reduce((s, n) => s + n);
            }
            expect(addThemAll(1, 2)).toBe(3);
            expect(addThemAll(1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe(45);
        });
    });
    describe('array method', () => {
        // Importance: 10+++;
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        it('visiting each member of an array', () => {
            numbers.forEach((v, i, n) => console.log({ v, i, n }));
        });
        describe('methods that create a new array', () => {
            it('has a filter', () => {
                // const evens = numbers.filter(n => n % 2 === 0);
                const evens = numbers.filter(isEven); // linq where
                expect(evens).toEqual([2, 4, 6, 8]);
                expect(numbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            });
            it('transforming each one', () => {
                const doubled = numbers.map(n => n * 2); // linq select
                expect(doubled).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18]);
            });
        });
        describe('scalar array methods', () => {
            describe('testing membership', () => {
                it('can see if every element of the array matches the criteria', () => {
                    const allEven = numbers.every(isEven); // linq - 'all'
                    expect(allEven).toBe(false);
                });
                it('can see if any element in an array mactches the criterial', () => {
                    const anyEven = numbers.some(isEven); // linq - 'any'
                    expect(anyEven).toBe(true);
                });
                it('boiling down a list of things to a single value', () => {
                    const total = numbers.reduce((s, n) => s + n);
                    expect(total).toBe(45);
                    const total2 = numbers.reduce((s, n) => s + n, 100); // 100 here is the "seed" or initial state
                    expect(total2).toBe(145);
                    // Note: also a reduceRight to go from Right to Left - reduce goes from Left to Right
                });
            });
            describe('practice', () => {
                interface CartItem { name: string; qty: number; price: number; }
                const cart: CartItem[] = [
                    { name: 'Eggs', qty: 1, price: 2.99 },
                    { name: 'Bread', qty: 3, price: 3.57 },
                    { name: 'Shampoo', qty: 2, price: 7.25 }
                ];
                interface ShippingInfo { totalQty: number; totalPrice: number; }
                it('Can you calculate the shipping info for the cart?', () => {
                    const originalShippingInfo: ShippingInfo = {
                        totalPrice: 0,
                        totalQty: 0
                    };
                    const shippingInfo: ShippingInfo = cart.reduce((previous: ShippingInfo, nextCartItem: CartItem) => ({
                        totalQty: previous.totalQty + nextCartItem.qty,
                        totalPrice: previous.totalPrice + (nextCartItem.qty * nextCartItem.price)
                    }), originalShippingInfo);
                    expect(shippingInfo.totalPrice).toBe((1 * 2.99) + (3 * 3.57) + (2 * 7.25));
                    expect(shippingInfo.totalQty).toBe(6); // 1 + 3 + 2
                });
            });
            describe('another practice', () => {
                interface BowlingGame { playerName: string; score: number; }
                const scores: BowlingGame[] = [
                    { playerName: 'Jeff', score: 127 },
                    { playerName: 'Henry', score: 227 },
                    { playerName: 'Violet', score: 118 }
                ];
                it('practice', () => {
                    // figure out who has the highest score, who has the lowest score, and what the highest and lowest score are.
                    // there are no ties. We don't believe in that, don't worry about.
                    // 1. Design an interface that is what you want the result to be.
                    interface Results { highScorer: string; highScore: number; lowScorer: string; lowScore: number; }
                    // 2. Set the initial state as above.
                    const initialState: Results = {
                        highScorer: null,
                        highScore: -1,
                        lowScorer: null,
                        lowScore: 301
                    };
                    // 3. Profit!
                    const results: Results = scores.reduce((state: Results, next: BowlingGame) => {
                        return {
                            highScorer: next.score > state.highScore ? next.playerName : state.highScorer,
                            highScore: next.score > state.highScore ? next.score : state.highScore,
                            lowScorer: next.score < state.lowScore ? next.playerName : state.lowScorer,
                            lowScore: next.score < state.lowScore ? next.score : state.lowScore
                        };
                    }, initialState);
                    expect(results.highScorer).toBe('Henry');
                    expect(results.highScore).toBe(227);
                    expect(results.lowScorer).toBe('Violet');
                    expect(results.lowScore).toBe(118);
                });
            });
        });
    });
});


