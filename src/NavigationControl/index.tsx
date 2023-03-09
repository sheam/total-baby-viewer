import {ChangeEvent, ReactElement} from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import {Mode, useAppContext} from "../provider/AppContext";
import {Label, StyledNav} from "./styled";
import {EntryType} from "../models/models";

const ALL = 'none';

export const NavigationControl = (): ReactElement => {
    const context = useAppContext();
    if (!context.kids) return (<i>loading...</i>);

    const onChildChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (e.currentTarget.value === ALL) {
            context.setCurrentChild(null);
        } else {
            const targetValue = parseInt(e.currentTarget.value);
            if (!targetValue) return;
            const newCurrentChild = context.kids?.find(x => x.pk === targetValue);
            context.setCurrentChild(newCurrentChild || null);
        }
    };

    const onModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const targetValue = e.currentTarget.value;
        if (!targetValue) return;
        context.setMode(targetValue as Mode);
    };

    const onActivityChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (e.currentTarget.value === ALL) {
            context.setCurrentActivity(null);
        } else {
            const targetValue = e.currentTarget.value;
            if (!targetValue) return;
            const enumVal = EntryType[targetValue as any] as any;
            context.setCurrentActivity(enumVal);
        }
    };

    console.log(`current mode = ${context.mode}`);
    const showActivityControls = context.mode === Mode.activities;
    const activityNames = Object.values(EntryType).filter(x => typeof (x) === 'string');
    const currentActivityName = context.currentActivity !== null ? EntryType[context.currentActivity] : ALL;

    return (
        <StyledNav>
                    <Col>
                        <Label className='text-right'>Showing:</Label>
                    </Col>
                    <Col>
                        <Form.Select value={context.mode || Mode.kids} onChange={onModeChange} size='sm'>
                            <option value={Mode.kids}>Kids</option>
                            <option value={Mode.contacts}>Contacts</option>
                            <option value={Mode.activities}>Activies</option>
                        </Form.Select>
                    </Col>

                    {showActivityControls && <>
                        <Col>
                            <Label className='text-right'>Child:</Label>
                        </Col>
                        <Col sm={4}>
                            <Form.Select value={context.currentChild?.pk || ALL} onChange={onChildChange} size='sm'>
                                <option value={ALL}>All</option>
                                {context.kids.map(k => <option key={k.pk} value={k.pk}>{k.name}</option>)}
                            </Form.Select>
                        </Col>

                        <Col>
                            <Label className='text-right'>Activity:</Label>
                        </Col>
                        <Col sm={3}>
                            <Form.Select value={currentActivityName} onChange={onActivityChange} size='sm'>
                                <option value={ALL}>All</option>
                                {activityNames.map(t => <option key={t} value={t}>{t}</option>)}
                            </Form.Select>
                        </Col>
                    </>}
        </StyledNav>
    );
};
