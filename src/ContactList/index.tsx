import {useAppContext} from "../provider/AppContext";
import {ReactElement} from "react";

export const ContactList = (): ReactElement => {
    const context = useAppContext();
    return (
        <div>
            <pre>
                {JSON.stringify(context.contacts, undefined, 4)}
            </pre>
        </div>
    );
};
