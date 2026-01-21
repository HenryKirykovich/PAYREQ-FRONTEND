import React, {useState} from "react";

import styles from "./FastFormView.module.scss"
import FastFormRegistrationForm from "./FastFormRegistrationForm";
import axios from "axios/index";
import {withRouter} from "react-router-dom";

import {PageHeading, RegularText} from "../common";
import VerticalLayout from "../common/layout/VerticalLayout";

const onSubmit = (billerId, values, setSubmitting, setServerErrors, history) => {
    setSubmitting(true);
    setServerErrors([]);
    axios.post(
        `/ff/biller/${billerId}/register`,
        values
    )
        .then(({data}) => {
            if(data.success) {
                history.push({pathname: "./verify/" + data.code, state: {data}})
            } else {
                setServerErrors(data.errors);
            }})
        .finally(() => setSubmitting(false));
};




const FastFormView = ({billerId, biller, history, params}) => {
    const [serverErrors, setServerErrors] = useState([]);

    return (
        <div className={styles.container}>
            <VerticalLayout>
                <img className={styles.logo} src={biller.logoPath} alt=""/>
                <PageHeading text={biller.fastformRegistrationHeading || "fastForm.registration.heading"} values={{tagName: biller.tagName}}/>
                {biller.fastformRegistrationSubHeading && <RegularText text={biller.fastformRegistrationSubHeading}
                                                                       data-testid="fastform-registration-subheading"/>}
                <div className={styles.wrapper}>
                    <FastFormRegistrationForm  biller={biller}
                                               formErrors={serverErrors}
                                               initialValues={params}
                                               onSubmit={(values, {setSubmitting}) => onSubmit(billerId, values, setSubmitting, setServerErrors, history)}/>
                </div>
            </VerticalLayout>
        </div>
    );
};



export default withRouter(FastFormView);
