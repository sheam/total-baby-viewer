import React from 'react';
import {AppContextProvider} from "./provider/AppContext";
import {NavigationControl} from "./NavigationControl";
import Container from "react-bootstrap/Container";
import {ContentDisplay} from "./ContentDisplay";

function App() {
    return (
        <Container>
            <AppContextProvider>
                <NavigationControl/>
                <ContentDisplay />
            </AppContextProvider>
        </Container>
    );
}

export default App;
