import React from "react";
import LoginCard from "../Login/LoginCard";
import CreateAccountForm from "./CreateAccountForm";
import styles from "./CreateAccount.module.scss";

const CreateAccountView = ({setUsername}) => (
    <div className={styles.container}>
        <div className={styles.centerDiv}>
            <LoginCard heading="createAccount.usernameCheck.heading" text="createAccount.usernameCheck.text">
                <CreateAccountForm setUsername={setUsername}/>
            </LoginCard>
        </div>
    </div>
);

export default CreateAccountView;