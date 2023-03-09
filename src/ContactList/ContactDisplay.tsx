import {IContact} from "../models/models";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import {ReactElement} from "react";
import {TextTd} from "../common/styled";

interface IContactDisplayProps {
    contact: IContact;
}

export const ContactDisplay = ({contact}: IContactDisplayProps): ReactElement => {
    return (
        <Card className='mb-3'>
            <Card.Body>
                <Card.Title>
                    {contact.name}
                </Card.Title>
                <Table striped hover>
                    <tbody>
                    <tr>
                        <td>
                            Specialty
                        </td>
                        <td>
                            {contact.specialty}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Address
                        </td>
                        <TextTd>
                            {contact.address}
                        </TextTd>
                    </tr>
                    <tr>
                        <td>
                            Notes
                        </td>
                        <TextTd>
                            {contact.notes}
                        </TextTd>
                    </tr>
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};
