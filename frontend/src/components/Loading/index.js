import React, {useEffect, useState} from "react";
import styles from "./Loader.module.scss"
import {injectIntl} from "react-intl";

const Loading = ({intl, text = "generic.loading", delay = 400}) => {
    const [show, setShow] = useState(false);
    useEffect(() => {
            const timer = setTimeout(
                () => setShow(true),
                delay
            );
            return () => clearTimeout(timer);
        },
        [setShow, delay]);

    if (!show) return null;

    return (
        <div className={styles.loadingContainer}>
            <div className={styles.loader}/>
            <h4>{intl.formatMessage({id: text})}</h4>
        </div>
    )
};

export default injectIntl(Loading);