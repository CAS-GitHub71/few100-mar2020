import { add } from './utils';

describe('writing specs in typescript', () => {
    it('is easy', () => {
        expect(true).toBe(true);
    });
    it('can add', () => {
        expect(add(2, 2)).toBe(4);
    });
});
describe('writting a basic spec', () => {
    it('an example', () => {
        const myName = 'Joe';
        expect(myName.length).toBe(3);
    });
});
describe('using the snipite', () => {
    it('cool', () => {

    });
});

