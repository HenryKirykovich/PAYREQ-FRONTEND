import React from "react";
import styles from "./LoginCard.module.scss";
import {PageHeading, RegularText} from "../common";


const LoginCard = ({children, heading, headingContainerStyles, text, values}) => {

    return (
        <div className={styles.card}>
            {heading &&
                <div className={headingContainerStyles}>
                    <PageHeading text={heading}/>
                </div>}
            {text && <RegularText text={text} values={values}/>}
            {children}
        </div>
    );
};

export default LoginCard;