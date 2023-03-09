import {useAppContext} from "../provider/AppContext";
import {ReactElement} from "react";
import {ListContainer} from "../common/styled";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {ContactDisplay} from "./ContactDisplay";

export const ContactList = (): ReactElement => {
    const { contacts } = useAppContext();
    return (
        <ListContainer>
            <h2>Contacts:</h2>
            <Row>
                {contacts?.map(c => <Col key={c.pk} sm={6}><ContactDisplay contact={c} /></Col>)}
            </Row>
        </ListContainer>
    );
};
