import { Employee, VacationRequest, DAYS_OF_PTO as pto } from '../src/hr';
import * as fromHR from '../src/hr';
describe('using classes', () => {
    describe('create instances', () => {
        it('demo', () => {
            expect(pto).toBe(23);
            const jim = new fromHR.Employee(30_000, 'James', 'Brown');
        });
        it('using constructors', () => {
            const bob = new Employee(45_000, 'Robert', 'Jones');
            expect(bob.getSalary()).toBe(45_000);
            expect(bob.firstName).toBe('Robert');
            expect(bob.lastName).toBe('Jones');
            expect(bob.fullName).toBe('Jones, Robert');

            const sue = new Employee(undefined, 'Sue', 'Smith');
            expect(sue.getSalary()).toBe(50_000);
            expect(sue.firstName).toBe('Sue');
            expect(sue.lastName).toBe('Smith');
            expect(sue.fullName).toBe('Smith, Sue');
            const vaction = new VacationRequest(sue);
            expect(vaction.employee.firstName).toBe('Sue');
        });
    });
});
