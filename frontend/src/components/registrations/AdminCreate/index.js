import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";

import {Alert, DefaultButton, Icon, LinkButton, RegularText, SubmitButton, TextInput} from "../../common";
import styles from "./AdminCreate.module.scss";
import LoginCard from "../../Login/LoginCard";
import axios from "axios";
import {Formik} from "formik";
import {ALERT_TYPES} from "../../common/alerts/Alert";
import * as Yup from "yup";
import {useDebouncedEffect} from "../../../utils/form-utils";
import Loading from "../../Loading";

let currentContactId;
const EMPTY_STRING = "";
const schema = (contactFields) => {
    const contactField2 = contactFields && contactFields.contactId2Field && {contactId2: Yup.string().required("forms.generic.required.label")};
    const contactField3 = contactFields && contactFields.contactId3Field && {contactId3: Yup.string().required("forms.generic.required.label")};
    const contactField4 = contactFields && contactFields.contactId4Field && {contactId4: Yup.string().required("forms.generic.required.label")};
    const contactField5 = contactFields && contactFields.contactId5Field && {contactId5: Yup.string().required("forms.generic.required.label")};
    const contactField6 = contactFields && contactFields.contactId6Field && {contactId6: Yup.string().required("forms.generic.required.label")};
    const contactField7 = contactFields && contactFields.contactId7Field && {contactId7: Yup.string().required("forms.generic.required.label")};
    const contactField8 = contactFields && contactFields.contactId8Field && {contactId8: Yup.string().required("forms.generic.required.label")};
    return Yup.object().shape({
        email: Yup.string().trim().email("forms.generic.email.validation.label").required("forms.generic.required.label"),
        customerName: Yup.string().required("forms.generic.required.label"),
        ...contactField2, ...contactField3, ...contactField4, ...contactField5, ...contactField6, ...contactField7, ...contactField8
    });
}

const getContactFields = (billerId, setSearchResult, setIsLoading) => {
    axios.get(`/data/contacts/${billerId}/contact-fields`)
        .then(({data}) => {
            setSearchResult(data);
            setIsLoading(false);
        });
};


const search = (billerId, setSearchResult, contactId, setIsSearching, setError) => {
    currentContactId = contactId;
    setError(false)
    setIsSearching(true);
    axios.get(`/data/contacts/${billerId}/contact-id/${contactId}`)
        .then(({data}) => {
            if (data.search.contactId === currentContactId) {
                setSearchResult(data);
                setIsSearching(false);
            }
        });
};

const submit = (billerId, values, contactId, setError, setSubmitting, history) => {
    axios.post(`/data/registration/${billerId}/create`,
        {contact: {...values, billerAccountNumber: contactId,},
              email: values.email})
        .then(({data}) => {
            setSubmitting(false)
            if (data.success === true) {
                history.push("create/success")
            } else {
                setError(data.error);
            }
        });
};

const AdminCreateForm = ({billerId, searchResult, contactId, isSearching, error, setError, history}) => {
    return (
        <React.Fragment>
            {searchResult && !isSearching &&
                <Formik initialValues={{email: "",
                    customerName: searchResult.contact ? searchResult.contact.name : EMPTY_STRING,
                    contactId2: searchResult.contact ? searchResult.contact.contactId2 : EMPTY_STRING,
                    contactId3: searchResult.contact ? searchResult.contact.contactId3 : EMPTY_STRING,
                    contactId4: searchResult.contact ? searchResult.contact.contactId4 : EMPTY_STRING,
                    contactId5: searchResult.contact ? searchResult.contact.contactId5 : EMPTY_STRING,
                    contactId6: searchResult.contact ? searchResult.contact.contactId6 : EMPTY_STRING,
                    contactId7: searchResult.contact ? searchResult.contact.contactId7 : EMPTY_STRING,
                    contactId8: searchResult.contact ? searchResult.contact.contactId8 : EMPTY_STRING}}
                        onSubmit={(values, {setSubmitting}) => submit(billerId, values, contactId, setError, setSubmitting, history)}
                        validationSchema={schema(searchResult.contactFields)}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleSubmit,
                          isSubmitting,
                      }) => (
                        <form onSubmit={handleSubmit}>
                            <TextInput name="email"
                                       placeholder="registrationAdminCreate.email.label"
                                       label="registrationAdminCreate.email.label"
                                       value={values.email}
                                       onChange={handleChange}
                                       error={errors.email}
                                       touched={touched.email}/>

                            <RegularText text={searchResult.contact ? "registrationAdminCreate.form.editContact" : "registrationAdminCreate.form.newContact"}
                                         values={{contactId}}
                                         className={styles.newContactLabel}/>

                            <TextInput name="customerName"
                                       placeholder="registrationAdminCreate.customerName.label"
                                       label="registrationAdminCreate.customerName.label"
                                       value={values.customerName}
                                       onChange={handleChange}
                                       error={errors.customerName}
                                       touched={touched.customerName}/>

                            {searchResult.contactFields.contactId2Field &&
                                <TextInput name="contactId2"
                                           placeholder={searchResult.contactFields.contactId2Field}
                                           label={searchResult.contactFields.contactId2Field}
                                           value={values.contactId2}
                                           onChange={handleChange}
                                           error={errors.contactId2}
                                           touched={touched.contactId2}/>}

                            {searchResult.contactFields.contactId3Field &&
                                <TextInput name="contactId3"
                                           placeholder={searchResult.contactFields.contactId3Field}
                                           label={searchResult.contactFields.contactId3Field}
                                           value={values.contactId3}
                                           onChange={handleChange}
                                           error={errors.contactId3}
                                           touched={touched.contactId3}/>}

                            {searchResult.contactFields.contactId4Field &&
                                <TextInput name="contactId4"
                                           placeholder={searchResult.contactFields.contactId4Field}
                                           label={searchResult.contactFields.contactId4Field}
                                           value={values.contactId4}
                                           onChange={handleChange}
                                           error={errors.contactId4}
                                           touched={touched.contactId4}/>}

                            {searchResult.contactFields.contactId5Field &&
                                <TextInput name="contactId5"
                                           placeholder={searchResult.contactFields.contactId5Field}
                                           label={searchResult.contactFields.contactId5Field}
                                           value={values.contactId5}
                                           onChange={handleChange}
                                           error={errors.contactId5}
                                           touched={touched.contactId5}/>}

                            {searchResult.contactFields.contactId6Field &&
                                <TextInput name="contactId6"
                                           placeholder={searchResult.contactFields.contactId6Field}
                                           label={searchResult.contactFields.contactId6Field}
                                           value={values.contactId6}
                                           onChange={handleChange}
                                           error={errors.contactId6}
                                           touched={touched.contactId6}/>}

                            {searchResult.contactFields.contactId7Field &&
                                <TextInput name="contactId7"
                                           placeholder={searchResult.contactFields.contactId7Field}
                                           label={searchResult.contactFields.contactId7Field}
                                           value={values.contactId7}
                                           onChange={handleChange}
                                           error={errors.contactId7}
                                           touched={touched.contactId7}/>}

                            {searchResult.contactFields.contactId8Field &&
                                <TextInput name="contactId8"
                                           placeholder={searchResult.contactFields.contactId8Field}
                                           label={searchResult.contactFields.contactId8Field}
                                           value={values.contactId8}
                                           onChange={handleChange}
                                           error={errors.contactId8}
                                           touched={touched.contactId8}/>}

                            <div className={styles.buttonContainer}>
                                <SubmitButton label="registrationAdminCreate.form.submit" disabled={isSubmitting}
                                              icon="plus"/>
                                <LinkButton label="registrationAdminCreate.form.back" onClick={() => window.document.location = `/customer#/biller/${billerId}/registrationsinit`}/>

                            </div>
                            {error &&
                                <Alert className={styles.errorAlert} type={ALERT_TYPES.DANGER}>
                                    <RegularText text={error}/>
                                </Alert>}


                        </form>
                    )}
                </Formik>}
        </React.Fragment>
    )
}


const AdminCreate = ({billerId, history}) => {
    const [contactId, setContactId] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [error, setError] = useState(null);
    const [isSearching, setIsSearching] = useState(true);
    const [doSearch, setDoSearch] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useDebouncedEffect(
        () => {
            if (doSearch) {
                search(billerId, setSearchResult, contactId, setIsSearching, setError);
                setDoSearch(false);
            }
        },
        300,
        [billerId, setSearchResult, contactId, setIsSearching, setError, setDoSearch, doSearch]);

    useEffect(()=> {
            getContactFields(billerId, setSearchResult, setIsLoading);
        },
        [billerId, setSearchResult, setIsLoading]);

    if (isLoading) {
        return <Loading/>;
    }

    return (
        <div className={styles.container}>
            <LoginCard heading="registrationAdminCreate.heading" text="registrationAdminCreate.text" values={{contactId: searchResult && searchResult.contactFields ? searchResult.contactFields.contactId1Field : "registrationAdminCreate.contactId.placeholder"}}>
                <div className={styles.searchInputContainer}>
                    <TextInput key="contactId"
                               name="contactId"
                               ariaLabel={searchResult && searchResult.contactFields ? searchResult.contactFields.contactId1Field : "registrationAdminCreate.contactId.placeholder"}
                               placeholder={searchResult && searchResult.contactFields ? searchResult.contactFields.contactId1Field : "registrationAdminCreate.contactId.placeholder"}
                               value={contactId}
                               onChange={e => {
                                   setContactId(e.target.value);
                                   setDoSearch(true);
                               }}
                               addon={<Icon name="search"/>}/>
                    <div className={styles.searchContainer}>
                        <DefaultButton label="registrationAdminCreate.contactId.search"
                                       onClick={() => search(billerId, setSearchResult, contactId, setIsSearching, setError)}
                        />
                    </div>
                </div>
                <AdminCreateForm billerId={billerId} searchResult={searchResult} contactId={contactId}
                                 isSearching={isSearching} error={error} setError={setError} history={history}/>
                {!searchResult &&
                    <div className={styles.buttonContainer}>
                        <LinkButton label="registrationAdminCreate.form.back"
                                    onClick={() => window.document.location = `/customer#/biller/${billerId}/registrationsinit`}
                                    className={styles.backButton}/>

                    </div> }
            </LoginCard>
        </div>

    );
};

export default withRouter(AdminCreate);
