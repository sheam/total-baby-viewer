import {ReactElement} from "react";
import {ListContainer} from "../common/styled";
import {useAppContext} from "../provider/AppContext";
import {ActivityDisplay} from "./ActivityDisplay";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"

export const ActivityList = (): ReactElement => {
    const {getEntries} = useAppContext();
    return (
        <ListContainer>
            <h2>Activities</h2>
            <Row>
                {getEntries().map(e => <Col sm={6} key={e.pk}><ActivityDisplay entry={e}/></Col>)}
            </Row>
        </ListContainer>
    );
};
