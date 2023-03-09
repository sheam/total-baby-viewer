import {ReactElement} from "react";
import {useAppContext} from "../provider/AppContext";
import {ListContainer} from "../common/styled";
import {KidDisplay} from "./KidDisplay";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"

export const KidList = (): ReactElement => {
    const {kids} = useAppContext();
    return (
        <ListContainer>
            <h2>Kids:</h2>
            <Row>
                {kids?.map(k => <Col sm={6} key={k.pk}><KidDisplay kid={k}/></Col>)}
            </Row>
        </ListContainer>
    );
};
