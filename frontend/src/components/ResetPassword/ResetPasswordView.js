import React, {Suspense} from "react";
import {FieldGroup, LargeText} from "../common";
import LoginCard from "../Login/LoginCard";
import Loading from "../Loading";
import styles from "./ResetPassword.module.scss"

const ResetPasswordForm = React.lazy(() => import("./ResetPasswordForm"));

const ResetPasswordView = ({reset}) => (
    <div className={styles.resetPasswordContainer}>
        <LoginCard heading="resetPassword.heading" className={styles.card}>
            <LargeText text="resetPassword.intro"/>
            <FieldGroup className={styles.emailContainer} fields={[{value: reset.uid, label: "settings.contactDetails.email"}]}/>
            <Suspense fallback={<Loading/>}>
                <ResetPasswordForm id={reset.id} inviteCode={reset.code}/>
            </Suspense>
        </LoginCard>
    </div>
)

export default ResetPasswordView;
