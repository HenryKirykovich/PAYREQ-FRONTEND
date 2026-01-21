import {Collapse, Panel} from "react-bootstrap";
import {injectIntl} from "react-intl";
import React from "react";
import {LinkButton, PrimaryButton} from "../../index";
import styles from "./FormStep.module.scss"

const StepActions = ({disabled, cancelLink, onNext, onCancel, primaryButtonType = "submit"}) => {
    return (
        <div className={styles.actions}>
            {onCancel ? (
                <LinkButton label="forms.generic.cancel.button" disabled={disabled} onClick={onCancel} />
            ) : (
                <LinkButton label="forms.generic.cancel.button" disabled={disabled} linkTo={cancelLink}/>
            )}
            <PrimaryButton type={primaryButtonType} label="forms.generic.next.button" disabled={disabled} onClick={onNext}/>
        </div>
    )
};

const FormStep = ({intl, isActive, isOpen, children, title, className}) => (
    <Panel className={className} style={{borderColor: isActive ? "inherit" : "#5e5e5e"}}>
        <Panel.Heading>
            <Panel.Title componentClass="h4" style={{color: isActive ? "inherit" : "#5e5e5e"}}>{intl.formatMessage({id: title})}</Panel.Title>
        </Panel.Heading>
        <Panel.Body style={{padding: isOpen ? "15px" : "0px"}}>
            <Collapse in={isOpen}>
                <div>
                    {children}
                </div>
            </Collapse>
        </Panel.Body>
    </Panel>
);

FormStep.Actions = StepActions;

export default injectIntl(FormStep);