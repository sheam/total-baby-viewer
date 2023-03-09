import {ReactElement} from "react";
import {Mode, useAppContext} from "../provider/AppContext";
import {KidList} from "../KidList";
import {ContactList} from "../ContactList";
import {ActivityList} from "../ActivityList";

export const ContentDisplay = (): ReactElement => {
    const { mode}  = useAppContext();
    return (
        <>
            {mode === Mode.kids && <KidList />}
            {mode === Mode.contacts && <ContactList />}
            {mode === Mode.activities && <ActivityList />}
        </>
    );
};
