import React, {Suspense} from "react";
import {PageHeading} from "../../common";
import Loading from "../../Loading";

const ChangePasswordForm = React.lazy(() => import("./ChangePasswordForm"));


function ChangePasswordView() {
    return (
        <React.Fragment>
            <PageHeading text="personalSettings.password.update"/>
            <Suspense fallback={<Loading/>}>
                <ChangePasswordForm/>
            </Suspense>
        </React.Fragment>
    )
}

export default ChangePasswordView;