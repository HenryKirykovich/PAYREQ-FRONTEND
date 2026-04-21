import React, {useState} from "react";
import axios from "axios";

import {
    PageHeading,
    LargeText,
    RegularText,
    Select,
    SubmitButton,
    LinkButton, TextInput, Accordion, DefaultButton
} from "../../common";
import CreateRegistrationViewContainer from "../CreateRegistrationViewContainer";
import reckonButtonImage from "../../../resources/images/oauthButtons/reckon-connect-button.png"
import styles from "./CreateReckonRegistrationView.module.scss";
import {Formik} from "formik";
import * as Yup from "yup";
import CreateReckonRegistrationForm from "./CreateReckonRegistrationForm";
import {injectIntl} from "react-intl";

const australia = "Australia";
const newZealand = "New Zealand";

const RECKON_COUNTRY_OPTIONS = [
    {value: australia, label: australia},
    {value: newZealand, label: newZealand}
];


const connectReckonAccount = (payerId, registeringForbillerId, values) => {
    const {country, companyFile, companyFileUsername, companyFilePassword} = values;
    axios.get(`/data/settings/reckon/${payerId}/connecttoreckon/${registeringForbillerId}/registration`,
        {params: {reckonCountry: country, reckonCompanyFile: companyFile, reckonApiUsername: companyFileUsername, reckonApiPassword: companyFilePassword}})
        .then(({data}) => window.location.href = data.requesttoken.uri)
};

const ConnectToReckon = ({setConnectToReckon}) => (
    <React.Fragment>
        <PageHeading text="registrations.createReckon.connectHeading"/>
        <RegularText text="registrations.createReckon.connect1"/>
        <ol>
            <li><RegularText text="registrations.createReckon.connect2"/></li>
            <li><RegularText text="registrations.createReckon.connect3"/></li>
            <li><RegularText text="registrations.createReckon.connect4"/></li>
        </ol>
        <p><RegularText text="registrations.createReckon.connect5"/></p>

        <img src={reckonButtonImage}
             style={{cursor: "pointer"}}
             className={styles.connectButton}
             alt="Connect to Reckon"
             onClick={() => setConnectToReckon(true)}/>
    </React.Fragment>
);

const schema = Yup.object().shape({
    country: Yup.string().required("forms.generic.required.label"),
    companyFile: Yup.string().required("forms.generic.required.label"),
    companyFileUsername: Yup.string().required("forms.generic.required.label"),
    companyFilePassword: Yup.string().required("forms.generic.required.label")
});

const ConnectToReckonConnectionDetails = ({payerId, registeringForbillerId, setConnectToReckon, intl}) => (
    <React.Fragment>
        <PageHeading text="registrations.createReckon.connectDetails.Heading"/>
        <LargeText text="registrations.createReckon.connectDetails.Message"/>
        <Formik
            initialValues={{
                country: australia}}
            validationSchema={schema}
            onSubmit={(values, {setSubmitting}) => connectReckonAccount(payerId, registeringForbillerId, values)}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleSubmit,
                  handleBlur,
                  isSubmitting
              }) => (
                <form onSubmit={handleSubmit}>
                    <Select name="country"
                            label="registrations.createReckon.connectDetails.country.label"
                            placeholder="registrations.createReckon.connectDetails.country.label"
                            options={RECKON_COUNTRY_OPTIONS}
                            internationalisedOptions={false}
                            value={values.country}
                            onChange={handleChange}
                            error={errors.country}
                            touched={touched.country}
                    />

                    <TextInput key="companyFile"
                               name="companyFile"
                               label="registrations.createReckon.connectDetails.file.label"
                               value={values.companyFile}
                               onChange={handleChange}
                               onBlur={handleBlur}
                               error={errors.companyFile}
                               touched={touched.companyFile}
                    />
                    <Accordion title="registrations.createReckon.connectDetails.file.help.title"
                               textDecoration={false}
                               defaultExpanded={false}>
                        <div className={styles.helpLink}>
                            <a href={intl.formatMessage({id: 'registrations.createReckon.connectDetails.file.help.url'})} rel="noopener noreferrer" className="text-muted" target="_blank">
                                {intl.formatMessage({id: 'registrations.createReckon.connectDetails.file.help.line1'})}
                            </a>
                        </div>
                        <ol>
                            <li><RegularText text="registrations.createReckon.connectDetails.file.help.line2"/></li>
                            <li><RegularText text="registrations.createReckon.connectDetails.file.help.line3"/></li>
                        </ol>
                    </Accordion>
                    <TextInput key="companyFileUsername"
                               name="companyFileUsername"
                               label="registrations.createReckon.connectDetails.fileUsername.label"
                               value={values.companyFileUsername}
                               onChange={handleChange}
                               onBlur={handleBlur}
                               error={errors.companyFileUsername}
                               touched={touched.companyFileUsername}
                    />
                    <TextInput key="companyFilePassword"
                               name="companyFilePassword"
                               type="password"
                               label="registrations.createReckon.connectDetails.filePassword.label"
                               value={values.companyFilePassword}
                               onChange={handleChange}
                               onBlur={handleBlur}
                               error={errors.companyFilePassword}
                               touched={touched.companyFilePassword}
                    />

                    <div className={styles.buttonContainer}>
                        <SubmitButton type="submit" label="registrations.createReckon.connectDetails.submitButton"
                                      isSubmitting={isSubmitting}/>
                        <LinkButton label="forms.generic.cancel.button" onClick={() => setConnectToReckon(false)}/>
                    </div>

            </form>
            )}
        </Formik>
    </React.Fragment>
);

const CreateReckonRegistrationView = ({config, payerId, registeringForbillerId, intl}) => {
    const [connectToReckon, setConnectToReckon] = useState(false);
    const {logoPath, tagName, connection, reckonvendors} = config;

    return (
        <CreateRegistrationViewContainer logoPath={logoPath} billerName={tagName}>
            {connection && reckonvendors.length > 0 && (
                <React.Fragment>
                    <PageHeading text="registrations.createReckon.pageHeading"/>
                    <LargeText text="registrations.createReckon.secondaryHeading"/>
                    <LargeText text="fastForm.registration.verification.heading" className={styles.newInputSection}/>
                    <CreateReckonRegistrationForm config={config}
                                                  payerId={payerId}
                                                  registeringForbillerId={registeringForbillerId}
                    />
                </React.Fragment>)
            }
            {connection && reckonvendors.length === 0 && (
                <React.Fragment>
                    <PageHeading text="registrations.createReckon.connectionError.heading"/>
                    <LargeText text="registrations.createReckon.connectionError.msg" className={styles.errorMessage}/>
                    <DefaultButton label="registrations.createReckon.connectionError.button" onClick={() => window.location.href = `/portal/customer/biller/${payerId}/settings/connections`}/>
                </React.Fragment>
            )}
            {!connection && connectToReckon === false &&
                <ConnectToReckon setConnectToReckon={setConnectToReckon}/>
            }
            {!connection && connectToReckon === true &&
                <ConnectToReckonConnectionDetails payerId={payerId} registeringForbillerId={registeringForbillerId} setConnectToReckon={setConnectToReckon} intl={intl}/>
            }

        </CreateRegistrationViewContainer>
    )
};

export default injectIntl(CreateReckonRegistrationView);
