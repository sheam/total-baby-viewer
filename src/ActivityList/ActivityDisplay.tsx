import {Entry, EntryType, IDrVisit, IFirst, IImmunization, IMeasurement, IPrescription, IStory} from "../models/models";
import {ReactElement} from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import {showDate} from "../util";
import {TextTd} from "../common/styled";
import { CardImage } from "./styled";

interface IActivityDisplayProps {
    entry: Entry;
}

export const ActivityDisplay = ({entry}: IActivityDisplayProps): ReactElement => {
    return (
        <Card className='mb-3'>
            <EntryImage entry={entry} />
            <Card.Body>
                <Card.Title>
                    {entry.title}
                </Card.Title>
                <Table striped hover>
                    <tbody>
                    <tr>
                        <td>
                            Date
                        </td>
                        <td>
                            {showDate(entry.date)}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Child
                        </td>
                        <td>
                            {entry.child.name}
                        </td>
                    </tr>
                    {entry.type === EntryType.Firsts && <FirstsRow entry={entry} />}
                    {entry.type === EntryType.Story && <StoryRow entry={entry} />}
                    {entry.type === EntryType.Prescriptions && <PrescriptionRow entry={entry} />}
                    {entry.type === EntryType.DrVisits && <DrVisitRow entry={entry} />}
                    {entry.type === EntryType.Immunization && <ImmunizationRow entry={entry} />}
                    {entry.type === EntryType.Measurements && <MeasurementRow entry={entry} />}
                    <tr>
                        <td>
                            Notes
                        </td>
                        <TextTd>
                            {entry.notes}
                        </TextTd>
                    </tr>
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

interface IStoryRowProps {
    entry: IStory;
}

export const StoryRow = ({entry}: IStoryRowProps): ReactElement => {
    return (
        <>
            <tr>
                <td>
                    Type
                </td>
                <td>
                    Story
                </td>
            </tr>
            <tr>
                <td>Is birth record</td>
                <td>{entry.isBirthRecord ? 'Yes' : 'No'}</td>
            </tr>
        </>
    );
};

interface IFirstsRowProps {
    entry: IFirst;
}

export const FirstsRow = ({entry}: IFirstsRowProps): ReactElement => {
    return (
        <tr>
            <td>Type</td>
            <td>Firsts</td>
        </tr>
    );
};

interface IPrescriptionRowProps {
    entry: IPrescription;
}

export const PrescriptionRow = ({entry}: IPrescriptionRowProps): ReactElement => {
    return (
        <tr>
            <td>Type</td>
            <td>Prescription</td>
        </tr>
    );
};

interface IDrVisitRowProps {
    entry: IDrVisit;
}

export const DrVisitRow = ({entry}: IDrVisitRowProps): ReactElement => {
    return (
        <>
            <tr>
                <td>
                    Type
                </td>
                <td>
                    Doctor Visit
                </td>
            </tr>
            <tr>
                <td>
                    Doctor
                </td>
                <td>
                    {entry.contact?.name}
                </td>
            </tr>
            {entry.contact?.address &&
            <tr>
                <td>
                    Address
                </td>
                <td>
                    {entry.contact?.address}
                </td>
            </tr>
            }
        </>
    );
};

interface IImmunizationRowProps {
    entry: IImmunization;
}

export const ImmunizationRow = ({entry}: IImmunizationRowProps): ReactElement => {
    return (
        <>
            <tr>
                <td>
                    Type
                </td>
                <td>
                    Immunization
                </td>
            </tr>
            <tr>
                <td>
                    Doctor
                </td>
                <td>
                    {entry.contact?.name}
                </td>
            </tr>
            {entry.contact?.address &&
                <tr>
                    <td>
                        Address
                    </td>
                    <td>
                        {entry.contact?.address}
                    </td>
                </tr>
            }
        </>
    );
};

interface IMeasurementRowProps {
    entry: IMeasurement;
}

export const MeasurementRow = ({entry}: IMeasurementRowProps): ReactElement => {
    return (
        <>
            <tr>
                <td>
                    Type
                </td>
                <td>
                    Measurement
                </td>
            </tr>
            <tr>
                <td>
                    Weight (kg)
                </td>
                <td>
                    {entry.weightKG}
                </td>
            </tr>
            <tr>
                <td>
                    Height (cm)
                </td>
                <td>
                    {entry.heightCM}
                </td>
            </tr>
            <tr>
                <td>
                    Head (cm)
                </td>
                <td>
                    {entry.headCM}
                </td>
            </tr>
            <tr>
                <td>Is birth record</td>
                <td>{entry.isBirthRecord ? 'Yes' : 'No'}</td>
            </tr>
        </>
    );
};

interface IEntryImageProps {
    entry: Entry;
}

export const EntryImage = ({entry}: IEntryImageProps): ReactElement => {
    if(entry.type !== EntryType.Story && entry.type !== EntryType.Firsts) {
        return <></>;
    }
    if(!entry.imageFile) {
        return <></>;
    }
    const imageSrc = `photos/${entry.imageFile || 'no-image'}`;
    const imageAlt = entry.imageFile ? 'image' : 'No Image'
    return (
        <CardImage variant='top' src={imageSrc} alt={imageAlt} />
    );
};


