import React from "react";
import styles from "./TopButtonBar.module.scss";

const TopButtonBar = ({children}) => (
    <div className={styles.topButtonBar}>
        {children}
    </div>
);

export default TopButtonBar;