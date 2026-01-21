import React from "react";
import {DefaultButton} from "../../common";
import styles from "./AdminCreateSuccess.module.scss";
import LoginCard from "../../Login/LoginCard";

const AdminCreateSuccess = ({billerId}) => {
    return (
        <div className={styles.container}>
            <LoginCard heading="registrationAdminCreateSuccess.heading" text="registrationAdminCreateSuccess.text">
                <div className={styles.backButtonContainer}>
                    <DefaultButton label="registrationAdminCreate.form.back"
                                onClick={() => window.document.location = `/customer#/biller/${billerId}/registrations/registered`}/>

                </div>
            </LoginCard>
        </div>

    );
};

export default AdminCreateSuccess;
