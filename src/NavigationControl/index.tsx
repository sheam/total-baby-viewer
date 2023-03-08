import {ChangeEvent, ReactElement} from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Mode, useAppContext} from "../provider/AppContext";
import {StyledNav} from "./styled";
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

    console.log(`current activity = ${context.currentActivity}`);
    const showActivityControls = context.mode == Mode.activities;
    const activityNames = Object.values(EntryType).filter(x => typeof (x) === 'string');
    const currentActivityName = context.currentActivity !== null ? EntryType[context.currentActivity] : ALL;

    return (
        <StyledNav>
            <Form>
                <Row>
                    <Col>
                        <Form.Label>Showing:</Form.Label>
                    </Col>
                    <Col>
                        <Form.Select value={context.mode || Mode.kids} onChange={onModeChange} size='sm'>
                            {Object.values(Mode).map(m => <option key={m} value={m}>{m}</option>)}
                        </Form.Select>
                    </Col>

                    {showActivityControls && <>
                        <Col>
                            <Form.Label>Child:</Form.Label>
                        </Col>
                        <Col sm={4}>
                            <Form.Select value={context.currentChild?.pk || ALL} onChange={onChildChange} size='sm'>
                                <option value={ALL}>All</option>
                                {context.kids.map(k => <option key={k.pk} value={k.pk}>{k.name}</option>)}
                            </Form.Select>
                        </Col>

                        <Col>
                            <Form.Label>Activity:</Form.Label>
                        </Col>
                        <Col sm={3}>
                            <Form.Select value={currentActivityName} onChange={onActivityChange} size='sm'>
                                <option value={ALL}>All</option>
                                {activityNames.map(t => <option key={t} value={t}>{t}</option>)}
                            </Form.Select>
                        </Col>
                    </>}
                </Row>
                <Form.Group>
                </Form.Group>
            </Form>
        </StyledNav>
    );
};
