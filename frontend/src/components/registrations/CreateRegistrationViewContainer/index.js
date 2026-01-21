import React from "react";
import {VerticalLayout} from "../../common";
import styles from "./CreateRegistrationViewContainer.module.scss";

const CreateRegistrationViewContainer = ({logoPath, billerName, children, half = true}) => {
    return (
        <VerticalLayout half={half}>
            <div className={styles.logoContainer}>
                <img src={logoPath} className={styles.logo} alt={billerName + " Logo"}/>
            </div>
            {children}
        </VerticalLayout>
    );
};

export default CreateRegistrationViewContainer;