import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Formik} from "formik";

import {
    Card,
    PageHeading,
    LargeText,
    TextInput,
    Icon,
    Select,
    RegularText,
    LinkButton,
    Modal, PrimaryButton
} from "../../common"

import styles from "./BillerSelectionView.module.scss"

const BillerCard = ({biller}) => {
    const displayName = biller.countryCode === 'au' ? biller.mybillsDisplayName + ' ('+ biller.extBillerId +')' : biller.mybillsDisplayName;

    return (
    <Link to={`./create/${biller.id}`}
          aria-label={biller.mybillsDisplayName}
    >
        <Card hover>
            <div className={styles.billerCard}>
                <div className={styles.logoContainer}>
                    <img src={biller.logoPath} className={styles.logo} alt={`${biller.mybillsDisplayName} logo`}/>
                </div>
                <div className={styles.billerDetails}>
                    <LargeText>{displayName}</LargeText>
                </div>
            </div>

        </Card>
    </Link>
)};

const SetCountryModal =
    ({show, onCancel, setCountry, country, setDoSearch}) => {
        if (!show) return null;
        return (
            <Formik
                initialValues={{country: country}}
                onSubmit={(values) => {
                    setCountry(values.country);
                    setDoSearch(true);
                    onCancel();
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleSubmit
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <Modal show={show}
                               title="registrations.billerSelection.setCountryModal.heading"
                               buttonLabel="registrations.billerSelection.setCountryModal.button"
                               onCancel={onCancel}
                               onPrimaryAction={handleSubmit}
                               PrimaryButtonComponent={PrimaryButton}
                        >
                            <Select name="country"
                                    label="registrations.billerSelection.setCountryModal.select.label"
                                    placeholder="registrations.billerSelection.setCountryModal.select.placeholder"
                                    options={[
                                        {value: "all", label: "registrations.billerSelection.setCountryModal.select.all"},
                                        {value: "au", label: "country.AU"},
                                        {value: "ca", label: "country.CA"},
                                        {value: "gb", label: "country.GB"},
                                    ]}
                                    value={values.country}
                                    onChange={handleChange}
                                    error={errors.country}
                                    touched={touched.country}
                            />
                        </Modal>
                    </form>
                )}
            </Formik>

        )
    };

const BillerSelectionView = ({searchTerm, setSearchTerm, billers, country, setCountry, setDoSearch}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <React.Fragment>
            <PageHeading text="registrations.billerSelection.pageHeading"/>

            <div className={styles.billerContainer}>
                <div className={styles.searchInputContainer}>
                    <TextInput key="search"
                               name="search"
                               ariaLabel="registrations.billerSelection.search.placeholder"
                               placeholder="registrations.billerSelection.search.placeholder"
                               value={searchTerm}
                               onChange={e => {
                                   setSearchTerm(e.target.value);
                                   setDoSearch(true);
                               }}
                               addon={<Icon name="search"/>}
                    />

                    <div className={styles.changeCountryContainer}>
                        <RegularText text={"registrations.billerSelection.search.countryFilter." + country}/>
                        <RegularText>
                            <LinkButton className={styles.changeCountryButton}
                                        label="registrations.billerSelection.search.changeCountry.button"
                                        onClick={() => setShowModal(true)}
                            />
                        </RegularText>
                    </div>
                </div>

                <div className={styles.links}>
                    {billers.length > 0 && billers.map(b => <BillerCard key={b.id} biller={b}/>)}
                </div>
                {billers.length === 0 && <LargeText text="registrations.billerSelection.noBillersFound"/>}
            </div>

            <SetCountryModal show={showModal}
                             onCancel={() => setShowModal(false)}
                             country={country}
                             setCountry={setCountry}
                             setDoSearch={setDoSearch}/>
        </React.Fragment>

    )}
;

export default BillerSelectionView;
