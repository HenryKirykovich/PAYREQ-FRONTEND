import React, {Suspense} from "react";
import {Card, FieldGroup, LargeText} from "../common";
import Loading from "../Loading";
import styles from "./InviteAcceptance.module.scss"

const InviteAcceptanceForm = React.lazy(() => import("./InviteAcceptanceForm"));

const InviteAcceptanceView = ({invite}) => (
    <Card heading="verifyAccountConfirmation.heading" className={styles.card}>
        <LargeText text="inviteAcceptance.intro1" values={{inviter: invite.inviter.name}}/>
        <LargeText text="inviteAcceptance.intro2" values={{inviter: invite.inviter.name}}/>
        <FieldGroup className={styles.emailContainer} fields={[{value: invite.email, label: "settings.contactDetails.email"}]}/>
        <Suspense fallback={<Loading/>}>
            <InviteAcceptanceForm email={invite.email} name={invite.name} userId={invite.id} inviteCode={invite.inviteCode}/>
        </Suspense>
    </Card>
)

export default InviteAcceptanceView;
