import {createContext, PropsWithChildren, ReactElement, useContext, useEffect, useState} from "react";
import {IDatabaseData} from "../models/DatabaseTables";
import {
    createContact,
    createEntry,
    createKid,
    Entry,
    EntryType,
    IContact, IDrVisit,
    IFirst, IImmunization,
    IKid, IMeasurement, IPrescription,
    IStory
} from "../models/models";

export enum Mode {
    kids = 'Kids',
    contacts = 'Contacts',
    activities = 'Activities',
}

interface IAppContextType {
    currentChild: IKid|null;
    setCurrentChild: (kid: IKid|null) => void;
    mode: Mode|null;
    setMode: (mode: Mode) => void;
    currentActivity: EntryType|null;
    setCurrentActivity: (mode: EntryType|null) => void;
    kids: IKid[]|undefined;
    contacts: IContact[]|undefined;
    getStories: () => IStory[];
    getFirsts: () => IFirst[];
    getMeasurements: () => IMeasurement[];
    getPrescriptions: () => IPrescription[];
    getImmunizations: () => IImmunization[];
    getDrVisits: () => IDrVisit[];
}

function useAppContextData(importedData: IDatabaseData): IAppContextType {
    const [kids, setKids] = useState<IKid[]>();
    const [contacts, setContacts] = useState<IContact[]>();
    const [entries, setEntries] = useState<Entry[]>();

    const [currentChild, setCurrentChild] = useState<IKid|null>(null);
    const [currentActivity, setCurrentActivity] = useState<EntryType|null>(null);
    const [mode, setMode] = useState<Mode>(Mode.kids);

    useEffect(() => {
        const kids = importedData.kids.filter(x => x.birthdate).map(createKid);
        setKids(kids);

        const contacts = importedData.contacts.map(createContact);
        setContacts(contacts);

        const entries = importedData.entries.map(x => createEntry(x, kids, contacts));
        setEntries(entries);
    }, [importedData]);

    const getStories = (): IStory[] => entries?.filter(x => x.child.pk === currentChild?.pk && x.type === EntryType.Story).map(x => x as IStory) || [];
    const getFirsts = (): IFirst[] => entries?.filter(x => x.child.pk === currentChild?.pk && x.type === EntryType.Firsts).map(x => x as IFirst) || [];
    const getMeasurements = (): IMeasurement[] => entries?.filter(x => x.child.pk === currentChild?.pk && x.type === EntryType.Measurements).map(x => x as IMeasurement) || [];
    const getPrescriptions = (): IPrescription[] => entries?.filter(x => x.child.pk === currentChild?.pk && x.type === EntryType.Prescriptions).map(x => x as IPrescription) || [];
    const getImmunizations = (): IImmunization[] => entries?.filter(x => x.child.pk === currentChild?.pk && x.type === EntryType.Immunization).map(x => x as IImmunization) || [];
    const getDrVisits = (): IDrVisit[] => entries?.filter(x => x.child.pk === currentChild?.pk && x.type === EntryType.DrVisits).map(x => x as IDrVisit) || [];

    return {
        currentChild,
        setCurrentChild,
        mode,
        setMode,
        currentActivity,
        setCurrentActivity,
        kids,
        contacts,
        getStories,
        getFirsts,
        getMeasurements,
        getPrescriptions,
        getImmunizations,
        getDrVisits,
    };
}

const AppContext = createContext<IAppContextType|null>(null);

export const useAppContext = () => useContext(AppContext) as IAppContextType;

const _data = require('../data/total_baby.json') as IDatabaseData;
export const AppContextProvider = ({children}: PropsWithChildren): ReactElement => {
    const appContext = useAppContextData(_data);
    return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
}
