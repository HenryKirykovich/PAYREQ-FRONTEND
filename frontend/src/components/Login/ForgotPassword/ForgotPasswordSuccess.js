import React from "react";

import {withRouter} from "react-router-dom";
import styles from "./ForgotPasswordSuccess.module.scss";
import LoginCard from "../LoginCard";
import {DefaultButton} from "../../common";


const ForgotPasswordSuccess = ({history}) => {

    return (
        <div className={styles.container}>
            <div className={styles.centerDiv}>
                <LoginCard heading="forgotPasswordSuccess.pageHeading" text="forgotPasswordSuccess.message">
                    {/*eslint-disable-next-line*/}
                    <DefaultButton label="forgotPasswordSuccess.backButton"
                                   icon="menu-left"
                                   onClick={() => history.push("../portal/customer/login")}/>
                </LoginCard>
            </div>
        </div>
    );
};

export default withRouter(ForgotPasswordSuccess);
