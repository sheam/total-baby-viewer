import {createContext, PropsWithChildren, ReactElement, useContext, useEffect, useState} from "react";
import {IDatabaseData} from "../models/DatabaseTables";
import {
    createContact,
    createEntry,
    createKid,
    Entry,
    EntryType,
    IContact, IKid
} from "../models/models";
import {compareAsc} from "date-fns/fp";

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
    getEntries: () => Entry[]
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
        entries.sort( (a, b) => compareAsc(a.date, b.date));
        setEntries(entries);
    }, [importedData]);
    const getEntries = (): Entry[] =>
        entries?.filter(x =>
            (currentChild === null || x.child.pk === currentChild?.pk) &&
            (currentActivity === null || x.type === currentActivity)) || [];

    return {
        currentChild,
        setCurrentChild,
        mode,
        setMode,
        currentActivity,
        setCurrentActivity,
        kids,
        contacts,
        getEntries,
    };
}

const AppContext = createContext<IAppContextType|null>(null);

export const useAppContext = () => useContext(AppContext) as IAppContextType;

const _data = require('../data/total_baby.json') as IDatabaseData;
export const AppContextProvider = ({children}: PropsWithChildren): ReactElement => {
    const appContext = useAppContextData(_data);
    return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
}
