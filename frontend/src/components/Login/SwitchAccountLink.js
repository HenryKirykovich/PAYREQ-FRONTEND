import React from "react";
import styles from "./SwitchAccountLink.module.scss";

import {LinkButton} from "../common";


const SwitchAccountLink = ({onClick}) => {

    return (
        <div className={styles.switchAccount}>
            <LinkButton label="login.password.switchAccountLink"  onClick={onClick}/>
        </div>
    );
};

export default SwitchAccountLink;