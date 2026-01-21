import React, {useState} from "react";
import {injectIntl} from "react-intl";
import {Formik} from "formik";
import * as Yup from "yup";

import {
    Accordion,
    Card, DateInput,
    DefaultButton,
    Icon,
    LargeText, LinkButton,
    PageHeading,
    PrimaryButton,
    RegularText,
    Select,
    TextInput,
    Label,
    Pager
} from "../../common";
import styles from "./BillerRegistrationsView.module.scss";
import {REGISTRATION_STATUS} from "../registration-constants";
import Loading from "../../Loading";
import {Link} from "react-router-dom";
import {changeAndSubmit, changeAndSubmitOnDate} from "../../../utils/form-utils";

const LABEL_TYPE_BY_STATUS = {
    "0": Label.WARNING,
    "1": Label.SUCCESS,
    "2": Label.DEFAULT,
    "3": Label.DANGER,

};

const channelsToDisplayAuth1 = (channelPartnerSystemId) => {
    return !(channelPartnerSystemId === "mybills" || channelPartnerSystemId === "mybills-bills");
}

const RegistrationCard = ({payerId, registration, intl}) => {
    const Content = () => (
        <Card hover className={styles.card}>
            <div className={styles.headerRow}>
                <div className={styles.account}>
                    {(registration.authItem1 && channelsToDisplayAuth1(registration.channelPartnerSystemId)) && <LargeText>{registration.authItem1}</LargeText>}
                    <RegularText text="registration.account" values={{accountNumber: registration.accountNumber}}/>
                </div>
                <LargeText>
                    <Label text={"registrations.status." + registration.status}
                           type={LABEL_TYPE_BY_STATUS[registration.status]}
                    />
                </LargeText>
            </div>
            {!registration.activatedDate && (
                <RegularText text="registrations.detailCardRow.createdDate"
                             values={{
                                 channelLabel: intl.formatMessage({id: "registrations.receive.channel." + registration.channelPartnerSystemId}),
                                 createDate:  intl.formatDate(new Date(registration.createdDate))
                             }}/>
            )}
            {registration.activatedDate && (
                <RegularText text="registrations.detailCardRow.activatedDate"
                             values={{channelLabel: intl.formatMessage({id: "registrations.receive.channel." + registration.channelPartnerSystemId}),
                                 date: intl.formatDate(new Date(registration.activatedDate))}}/>
            )}
            {registration.status === REGISTRATION_STATUS.deregistered && (
                <RegularText text="registrations.detailCardRow.deregisteredDate"
                             values={{date: intl.formatDate(new Date(registration.deactivatedDate))}}/>
            )}
            {registration.status === REGISTRATION_STATUS.failed && (
                <RegularText text="registrations.detailCardRow.failedDate"
                             values={{date: intl.formatDate(new Date(registration.deactivatedDate))}}/>
            )}
        </Card>
    );

    const ariaLabel = registration.authItem1 + ", " + registration.accountNumber;
    if (["email", "mybillsagent", "mybills", "mybills-bills", "xeroconnect", "reckon", "myob"].includes(registration.channelPartnerSystemId)) {
        return (
            <Link to={`./${registration.billerActorId}/${registration.id}`}
                  aria-label={ariaLabel}>
                <Content/>
            </Link>)
    }

    return (
    <a aria-label={ariaLabel}
       href={`/customer#/biller/${payerId}/incoming/registration/${registration.id}`}
    >
        <Content/>
    </a>
)};

const SearchButton = React.memo(DefaultButton);

const STATUS_OPTIONS = [
    {value: "all", label: "registrations.status.all"},
    {value: REGISTRATION_STATUS.pending, label: "registrations.status." + REGISTRATION_STATUS.pending},
    {value: REGISTRATION_STATUS.active, label: "registrations.status." + REGISTRATION_STATUS.active},
    {value: REGISTRATION_STATUS.deregistered, label: "registrations.status." + REGISTRATION_STATUS.deregistered},
    {value: REGISTRATION_STATUS.failed, label: "registrations.status." + REGISTRATION_STATUS.failed},
];

const validationSchema = Yup.object().shape({
    fromDate: Yup.date().typeError("forms.generic.date.validation.label"),
    toDate: Yup.date().typeError("forms.generic.date.validation.label")
});

const SearchTermInput = ({values, handleChange, handleBlur, errors, touched, isSubmitting, handleSubmit, resetForm}) => (
    <div className={styles.searchContainer}>
        <TextInput key="searchTerm"
                   name="searchTerm"
                   ariaLabel="registrations.search.placeholder"
                   placeholder="registrations.search.placeholder"
                   value={values.searchTerm}
                   error={errors.searchTerm}
                   touched={touched.searchTerm}
                   onChange={handleChange}
                   onBlur={handleBlur}
                   addon={<Icon name="search"/>}
        />
        <div style={{display: "flex"}}>
            <SearchButton type="submit" label="generic.search" disabled={isSubmitting}/>
            <ClearButton label="generic.clearFilters" 
                         onClick={(e) => {resetForm({values: {searchTerm: "", status: "all", fromDate: "", toDate: ""}}); handleSubmit(e)}}
                         className={styles.hideOnMobile}
            />
        </div>
    </div>
);

const ClearButton = React.memo(LinkButton);

const AdvancedSearch = ({values, handleSubmit, handleChange, errors, touched}) => (
    <div className={styles.advancedSearch}>
        <Accordion title="generic.advancedSearch" defaultExpanded={false}>
            <Select name="status"
                    className={`${styles.advancedSearchField} ${values.status !== "all" ? styles.activeFilter : ""}`}
                    label="generic.status"
                    placeholder="registrations.search.statusSelect.placeholder"
                    options={STATUS_OPTIONS}
                    value={values.status}
                    isControlled={true}
                    onChange={e => changeAndSubmit(handleChange, handleSubmit, e, errors.status)}
                    error={errors.status}
                    touched={touched.status}
            />
            <DateInput name="fromDate"
                       className={`${styles.advancedSearchField} ${values.fromDate ? styles.activeFilter : ""}`}
                       label="reports.billPayments.fromDate"
                       value={values.fromDate}
                       onChange={e => changeAndSubmitOnDate(handleChange, handleSubmit, e, errors.fromDate)}
                       error={errors.fromDate}
                       touched={touched.fromDate}/>
            <DateInput name="toDate"
                       className={`${styles.advancedSearchField} ${values.toDate ? styles.activeFilter : ""}`}
                       label="reports.billPayments.toDate"
                       value={values.toDate}
                       onChange={e => changeAndSubmitOnDate(handleChange, handleSubmit, e, errors.toDate)}
                       error={errors.toDate}
                       touched={touched.toDate}/>
        </Accordion>
    </div>
);

const SearchSummaryAndDownload = ({showing, total, handleDownload}) => (
    <div className={styles.resultSummaryRow}>
        {total > 1 ? (
            <RegularText text="pagination.showing.label"
                         values={{first: showing[0], last: showing[1], total}}/>
        ) : <div/>}
        <LinkButton label="generic.downloadCsv" icon="download" onClick={handleDownload} className={styles.hideOnMobile}/>
    </div>
);

const BillerRegistrationsView = ({payerId, registrations, biller, total, showing, intl, handleSearch, handleDownload, searchParams}) => {
    const [pageNumber, setPageNumber] = useState(searchParams.pageNumber ||  1);
    const [isPaging, setIsPaging] = useState(false);
    return (
        <React.Fragment>
            <PageHeading text="registrations.pageHeading" values={{tagName: biller.mybillsDisplayName}}/>
            <div className={styles.buttonContainer}>
                <PrimaryButton linkTo={`../create/${biller.id}`} label="registrations.addAccount.button" icon="plus"/>
            </div>
            <Formik
                initialValues={{searchTerm: "", status: "all", fromDate: "", toDate: "", ...searchParams}}
                validationSchema={validationSchema}
                onSubmit={(values, {setSubmitting}) => {
                    handleSearch(values, setSubmitting, 1);
                    setPageNumber(1);
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleSubmit,
                      resetForm,
                      isSubmitting
                  }) =>
                    (
                        <React.Fragment>
                            <form onSubmit={handleSubmit}>
                                <SearchTermInput values={values}
                                                 handleChange={handleChange}
                                                 errors={errors}
                                                 touched={touched}
                                                 isSubmitting={isSubmitting}
                                                 resetForm={resetForm}
                                                 handleSubmit={handleSubmit}/>

                                <AdvancedSearch values={values}
                                                handleChange={handleChange}
                                                handleSubmit={handleSubmit}
                                                errors={errors}
                                                touched={touched}
                                />
                            </form>


                            {(isSubmitting || isPaging) && <Loading/>}

                            {!isSubmitting && !isPaging && total === 0 &&
                            <RegularText text="registrations.search.noResults"/>}

                            {!isSubmitting && !isPaging && total > 0 && (
                                <React.Fragment>
                                    <SearchSummaryAndDownload showing={showing}
                                                              total={total}
                                                              handleDownload={() => handleDownload(values)}/>
                                    <div className={styles.links}>
                                        {registrations.map(r => <RegistrationCard key={r.id}
                                                                                  payerId={payerId} registration={r}
                                                                                  intl={intl}/>)}
                                    </div>
                                    <Pager className={styles.pagerContainer}
                                           first={showing[0]}
                                           last={showing[1]}
                                           total={total}
                                           onClickPrevious={() => {
                                               handleSearch(values, setIsPaging, pageNumber - 1);
                                               setPageNumber(pageNumber - 1);
                                           }}
                                           onClickNext={() => {
                                               handleSearch(values, setIsPaging, pageNumber + 1);
                                               setPageNumber(pageNumber + 1);
                                           }}
                                           pageNumber={pageNumber}
                                    />
                                </React.Fragment>
                            )}

                        </React.Fragment>
                    )}
            </Formik>
        </React.Fragment>
    )
};

export default injectIntl(BillerRegistrationsView);
