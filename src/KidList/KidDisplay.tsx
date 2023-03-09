import {IKid} from "../models/models";
import {ReactElement} from "react";
import Card from "react-bootstrap/Card"
import Table from "react-bootstrap/Table"
import {showDate} from "../util";

interface IKidDisplayProps {
    kid: IKid;
}

export const KidDisplay = ({kid}: IKidDisplayProps): ReactElement => {
    return (
        <Card className='mb-3'>
            <Card.Body>
                <Card.Title>
                    {kid.name}
                </Card.Title>
                <Table striped hover>
                    <tbody>
                    <tr>
                        <td>
                            Sex
                        </td>
                        <td>
                            {kid.sex}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Birthday
                        </td>
                        <td>
                            {showDate(kid.birthdate)}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Height (cm)
                        </td>
                        <td>
                            {kid.heightCM}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Weight (kg)
                        </td>
                        <td>
                            {kid.weightKG}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Head (cm)
                        </td>
                        <td>
                            {kid.heightCM}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Blood type
                        </td>
                        <td>
                            {kid.bloodType}
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};
