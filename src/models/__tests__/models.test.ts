import {getAddress, getDateFromIntegerDate} from "../models";
import {Interval, isValid, isWithinInterval} from 'date-fns';
import {IDbContact} from "../DatabaseTables";

const data = require('../../data/total_baby.json');

const baselineInterval: Interval = {
    start: new Date(2005, 0, 1),
    end: new Date(),
};

const baselineDateMin = new Date(2005, 0, 1);
const baselineDateMax = new Date();

describe('dates', () => {
    it('parsing entry dates', () => {
        const items = data.entries;
        for(const item of items) {
            const date = getDateFromIntegerDate(item.dateInteger);
            expect(isValid(date)).toBeTruthy();
            const isReasonable = date && isWithinInterval(date, baselineInterval);
            expect(isReasonable).toBeTruthy();
        }
    });
    it('parsing child dates', () => {
        const items = data.kids.filter((x: any) => !!x.birthdate);
        for(const item of items) {
            const date = getDateFromIntegerDate(item.birthdate);
            expect(isValid(date)).toBeTruthy();
            const isReasonable = date && isWithinInterval(date, baselineInterval);
            expect(isReasonable).toBeTruthy();
        }
    });
    it('20100513 integer', () => {
        expect(getDateFromIntegerDate(20100513)).toStrictEqual(new Date(2010, 4, 13));
    });
});

describe('addresses', () => {
    const getContact = (): IDbContact => ({
        street: 'street',
        street2: 'street2',
        city: 'city',
        state: 'state',
        zip: 'zip',
        country: 'country',
    } as IDbContact);

    it('creates address with all parts', () => {
        const expectedAddress = `street
street2
city state
zip
country`;
        const address = getAddress(getContact());
        expect(address).toBe(expectedAddress);
    });

    it('creates address missing street2', () => {
        const contact = getContact();
        contact.street2 = undefined;
        const expectedAddress = `street
city state
zip
country`;
        const address = getAddress(contact as IDbContact);
        expect(address).toBe(expectedAddress);
    });

    it('creates address missing city', () => {
        const contact = getContact();
        contact.city = undefined;
        const expectedAddress = `street
street2
state
zip
country`;
        const address = getAddress(contact as IDbContact);
        expect(address).toBe(expectedAddress);
    });

    it('creates address missing state', () => {
        const contact = getContact();
        contact.state = undefined;
        const expectedAddress = `street
street2
city
zip
country`;
        const address = getAddress(contact as IDbContact);
        expect(address).toBe(expectedAddress);
    });

    it('creates address missing city and state', () => {
        const contact = getContact();
        contact.city = undefined;
        contact.state = undefined;
        const expectedAddress = `street
street2
zip
country`;
        const address = getAddress(contact as IDbContact);
        expect(address).toBe(expectedAddress);
    });

    it('creates address missing street', () => {
        const contact = getContact();
        contact.street = undefined;
        const expectedAddress = `street2
city state
zip
country`;
        const address = getAddress(contact as IDbContact);
        expect(address).toBe(expectedAddress);
    });

    it('creates address missing country', () => {
        const contact = getContact();
        contact.country = undefined;
        const expectedAddress = `street
street2
city state
zip`;
        const address = getAddress(contact as IDbContact);
        expect(address).toBe(expectedAddress);
    });

    it('creates empty', () => {
        const expectedAddress = '';
        const address = getAddress({} as IDbContact);
        expect(address).toBe(expectedAddress);
    });
});
