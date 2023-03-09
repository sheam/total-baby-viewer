import {IDbChild, IDbContact, IDbEntry} from "./DatabaseTables";

enum Sex {
    male = 'male',
    female = 'female',
}

export function getDateFromIntegerDate(intDate: string | number | undefined): Date {
    if (!intDate) throw new Error('Could not create date from null or empty data');

    if (typeof (intDate) === 'string') {
        const yyyy = parseInt(intDate.substring(0, 4)) || 0;
        const MM = parseInt(intDate.substring(4, 6)) || 0;
        const dd = parseInt(intDate.substring(6, 8)) || 0;
        const hh = parseInt(intDate.substring(8, 10)) || 0;
        const mm = parseInt(intDate.substring(10, 12)) || 0;
        const ss = parseInt(intDate.substring(12, 14)) || 0;
        if (yyyy === 0 || MM === 0 || dd === 0) {
            throw new Error(`Could not convert string '${intDate}' into a date object`);
        }

        return new Date(yyyy, MM - 1, dd, hh, mm, ss);
    }

    return getDateFromIntegerDate(intDate.toString());
}


export interface IKid {
    pk: number;
    sex: Sex;
    name: string;
    birthdate: Date | null;
    heightCM: string | null;
    weightKG: string | null;
    headCircumferenceCM: string | null;
    bloodType: string | null;
}

export function createKid(data: IDbChild): IKid {
    return {
        pk: data.pk,
        name: data.name,
        birthdate: getDateFromIntegerDate(data.birthdate),
        heightCM: data.heightCM || null,
        weightKG: data.weightKG || null,
        headCircumferenceCM: data.head_circumferenceCM || null,
        bloodType: data.bloodtype || null,
        sex: data.sex === 1 ? Sex.male : Sex.female,
    };
}

export interface IContact {
    pk: string;
    name: string;
    specialty: string;
    address: string;
    notes: string;
}

export function getAddress(data: IDbContact): string {
    const {street, street2, city, state, zip, country} = data;
    const validParts = [street, street2, `${city || ''} ${state || ''}`.trim(), zip, country].filter(x => !!x);
    return validParts.join('\n');
}

export function createContact(data: IDbContact): IContact {
    return {
        pk: data.pk,
        name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
        specialty: data.doctor_specialty || '',
        notes: data.notes || '',
        address: getAddress(data),
    };
}

export enum EntryType {
    Story = 0,
    Firsts = 5,
    DrVisits = 10,
    Measurements = 15,
    Immunization = 20,
    Prescriptions = 22,
}

interface IEntry {
    type: number;
    pk: string;
    child: IKid;
    date: Date;
    notes: string;
    title: string;
}

export interface IStory extends IEntry {
    type: EntryType.Story;
    isBirthRecord: boolean;
    imageFile: string | null;
}

function getStory(data: IDbEntry, entry: IEntry): IStory {
    return {
        ...entry,
        isBirthRecord: data.birth_record === 1,
        imageFile: data.imageFile,
    }
}
export interface IFirst extends IEntry {
    type: EntryType.Firsts;
    imageFile: string | null;
}
function getFirst(data: IDbEntry, entry: IEntry): IFirst {
    return {
        ...entry,
        imageFile: data.imageFile,
    }
}

export interface IDrVisit extends IEntry {
    type: EntryType.DrVisits;
    contact: IContact;
}
function getDrVisit(data: IDbEntry, entry: IEntry, contacts: IContact[]): IDrVisit {
    const contact = contacts.find(x => x.pk === data.contact_id);
    if(!contact) throw new Error(`Could not find contact with id '${data.contact_id}' for dr visit entry '${entry.pk}'`);
    return {
        ...entry,
        contact,
    }
}

export interface IMeasurement extends IEntry {
    type: EntryType.Measurements;
    weightKG?: string;
    heightCM?: string;
    headCM?: string;
    isBirthRecord: boolean;
}
function getMeasurement(data: IDbEntry, entry: IEntry): IMeasurement {
    return {
        ...entry,
        weightKG: data.weightKG,
        heightCM: data.heightCM,
        headCM: data.headCM,
        isBirthRecord: data.birth_record === 1,
    }
}

export interface IImmunization extends IEntry {
    type: EntryType.Immunization;
    contact?: IContact;
}
function getImmunization(data: IDbEntry, entry: IEntry, contacts: IContact[]): IImmunization {
    const contact = contacts.find(x => x.pk === data.contact_id);
    // if(!contact) console.warn(`Could not find contact with id '${data.contact_id}' for immunization entry '${entry.pk}'`);
    return {
        ...entry,
        contact,
    }
}

export interface IPrescription extends IEntry {
    type: EntryType.Prescriptions;
}
function getPrescription(data: IDbEntry, entry: IEntry): IPrescription {
    return {
        ...entry
    }
}

export type Entry = IStory | IFirst | IDrVisit | IMeasurement | IImmunization | IPrescription;

export function createEntry(data: IDbEntry, kids: IKid[], contacts: IContact[]): Entry {
    const kid = kids.find((x: IKid) => x.pk === data.child_id);
    if (!kid) throw new Error(`Could not find child with id ${data.child_id} for entry ${data.pk}`);
    const entry: IEntry = {
        type: data.type,
        pk: data.pk,
        child: kid,
        date: getDateFromIntegerDate(data.dateInteger),
        notes: data.notes || '',
        title: data.title || '',
    };
    switch (data.type) {
        case EntryType.Story:
            return getStory(data, entry);
        case EntryType.Firsts:
            return getFirst(data, entry);
        case EntryType.Measurements:
            return getMeasurement(data, entry);
        case EntryType.Prescriptions:
            return getPrescription(data, entry);
        case EntryType.Immunization:
            return getImmunization(data, entry, contacts);
        case EntryType.DrVisits:
            return getDrVisit(data, entry, contacts);
        default:
            throw new Error(`Could not determine entry type based on value ${data.type} for entry ${data.pk}`);
    }
}

