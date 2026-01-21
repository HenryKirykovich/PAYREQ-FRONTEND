import React from "react";
import CreateRegistrationViewContainer from "../CreateRegistrationViewContainer";
import {PageHeading, RegularText, SecondaryHeading, Select, LargeText} from "../../common";
import {MYOB_PRODUCTS} from "./constrants";
import {Formik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import MyobButtonImage from "../../../resources/images/oauthButtons/MYOB-connect-purple.png";
import CreateMyobRegistrationForm from "../myob/CreateMyobRegistrationForm";
import InputImageButton from "./InputImageButton";


const connectMyobAccount = (payerId, registeringForbillerId, product) => {
    axios.get(`/data/settings/myob/${payerId}/connecttomyob/${registeringForbillerId}/registration`, {params: {product: product}})
        .then(({data}) => window.location.href = data.requesttoken.uri)
};

const schema = () => {
    return Yup.object().shape({
        MyobProduct: Yup.string().required("forms.generic.required.label")
    })
}

const ConnectToMyob = ({payerId, registeringForbillerId}) => {
    return (<React.Fragment>
        <SecondaryHeading text="registrations.createMyob.connectHeading"/>
        <RegularText text="registrations.createMyob.connect1"/>
        <ol>
            <li><RegularText text="registrations.createMyob.connect2"/></li>
            <li><RegularText text="registrations.createMyob.connect3"/></li>
        </ol>
        <p><RegularText text="registrations.createMyob.connect4"/></p>
        <p><RegularText text="registrations.createMyob.connect5"/></p>
        <Formik
            initialValues={{
                MyobProduct: ""
            }}
            validationSchema={schema}
            onSubmit={(values) => {
                const product = values.MyobProduct;
                connectMyobAccount(payerId, registeringForbillerId, product);
            }}>
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleSubmit
              }) => (
                <form onSubmit={handleSubmit}>
                    <Select name="MyobProduct"
                            label="registrations.createMyob.connectProductHeading"
                            placeholder="registrations.createMyob.connectProductSelect"
                            options={MYOB_PRODUCTS}
                            value={values.MyobProduct}
                            onChange={handleChange}
                            error={errors.MyobProduct}
                            touched={touched.MyobProduct}/>

                    <InputImageButton imageSrc={MyobButtonImage}
                                      alt="Connect to MYOB"/>
                </form>
            )}
        </Formik>
    </React.Fragment>)
};

const CreateMyobRegistrationView = ({channel, helpImageAccountNumber, helpImageAuthItem1, serverErrors, logoPath, billerName, payerId, registeringForbillerId, myobOrganisations, fastformRegistrationAcceptLabel, onSubmit}) => {
    return <CreateRegistrationViewContainer logoPath={logoPath} billerName={billerName}>
        <PageHeading text="registrations.createMyob.pageHeading"/>

        {!myobOrganisations.length &&
        <ConnectToMyob payerId={payerId} registeringForbillerId={registeringForbillerId}/>}

        {myobOrganisations.length > 0 && (
            <React.Fragment>
                <LargeText text="registrations.createMyob.secondaryHeading"/>
                <LargeText text="fastForm.registration.verification.heading"/>
                <CreateMyobRegistrationForm channel={channel}
                                            helpImageAccountNumber={helpImageAccountNumber}
                                            helpImageAuthItem1={helpImageAuthItem1}
                                            fastformRegistrationAcceptLabel={fastformRegistrationAcceptLabel}
                                            onSubmit={onSubmit}
                                            serverErrors={serverErrors}
                                            myobOrganisations={myobOrganisations}/>
            </React.Fragment>
        )}

    </CreateRegistrationViewContainer>
};
export default CreateMyobRegistrationView;
