import React, {Suspense} from "react";
import LoginCard from "../Login/LoginCard";
import styles from "./CreateAccount.module.scss";
import FieldGroup from "../common/FieldGroup";
import Loading from "../Loading";

const CreateAccountDetailsForm = React.lazy(() => import("./CreateAccountDetailsForm"));

const CreateAccountDetailsView = ({username, fastpass, formDefaults, setUsername}) => (
    <div className={styles.container}>
        <div className={styles.centerDiv}>
            <LoginCard heading="createAccount.usernameCheck.heading">
                <FieldGroup className={styles.emailContainer} fields={[{value: username, label: "createAccount.email.label"}]}/>
                <Suspense fallback={<Loading/>}>
                    <CreateAccountDetailsForm username={username} fastpass={fastpass} formDefaults={formDefaults} setUsername={setUsername}/>
                </Suspense>
            </LoginCard>
        </div>
    </div>
);

export default CreateAccountDetailsView;
