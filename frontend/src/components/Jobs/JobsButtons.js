import React from "react";
import {ButtonGroup, ButtonToolbar} from "react-bootstrap";
import {DefaultButton} from '../common'
import styles from "./JobsButtons.module.scss"

const RefreshButton = React.memo(DefaultButton);
const RunJobButton = React.memo(DefaultButton);

const JobsButtons = ({doRefresh, doRunJob, ...otherProps}) => {
    return (
        <ButtonToolbar className={styles.toolbar} {...otherProps}>
            <ButtonGroup style={{display: "flex"}}>
                {doRefresh && <RefreshButton type="button" icon="refresh" label="generic.refresh" onClick={doRefresh} />}
                {doRunJob && <RunJobButton type="button" icon="upload" label="jobs.buttons.runJob" onClick={doRunJob} />}
            </ButtonGroup>
        </ButtonToolbar>
    );
};

export default JobsButtons;
