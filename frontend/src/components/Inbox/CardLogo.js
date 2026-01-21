import React from "react";
import styles from "./InboxView.module.scss";

const CardLogoContainer = ({logoPath, billerName}) => (
    <div className={styles.logoContainer}>
        <img src={logoPath} className={styles.logo} alt={`${billerName} logo`}/>
    </div>
);

export default CardLogoContainer;