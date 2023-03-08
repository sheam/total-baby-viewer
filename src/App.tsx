import React from 'react';
import {AppContextProvider} from "./provider/AppContext";
import {ContactList} from "./ContactList";
import {NavigationControl} from "./NavigationControl";
import Container from "react-bootstrap/Container";

function App() {
    return (
        <Container>
            <AppContextProvider>
                <NavigationControl/>
            </AppContextProvider>
        </Container>
    );
}

export default App;
