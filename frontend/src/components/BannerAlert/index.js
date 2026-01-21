import React from "react";
import {Alert, Fade} from "react-bootstrap";

import {useAppState, usePresentation} from "../../state";
import {SET_ALERT} from "../../state/reducers/alertReducer";
import {RegularText} from "../common";
import styles from "./BannerAlert.module.scss";

const BannerAlert = () => {
    const [{alert}, dispatch] = useAppState();
    const { isMobileApp } = usePresentation();
    if (isMobileApp) return false;
    if (alert) {
        setTimeout(() => dispatch({type: SET_ALERT, alert: null}), 4000);
    }
    return (
        <Fade in={!!alert} timeout={1000} aria-hidden={!alert}>
            <div className={styles.bannerAlert}
                 style={{height: !alert ? "0px" : "inherit"}}
            >
                <Alert bsStyle={alert ? alert.level : "success"} onDismiss={() => dispatch({type: SET_ALERT, alert: null})} >
                    <RegularText text={alert && alert.text} values={alert && alert.values}/>
                </Alert>
            </div>
        </Fade>
    );
};

export default BannerAlert;
