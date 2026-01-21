import React, {useState} from "react";
import {Formik} from "formik";
import * as Yup from "yup";

import {LargeText, PageHeading, Pager} from "../common";
import styles from "./MailView.module.scss"
import Loading from "../Loading";
import SearchForm, {INITIAL_VALUES} from "./SearchForm";
import {SORT_DIRECTION} from "../Inbox/inbox-constants";
import MailTable from "./MailTable";
import SearchSummaryAndActions from "./SearchSummaryAndActions";


const validationSchema = Yup.object().shape({
    fromDate: Yup.date().typeError("forms.generic.date.validation.label"),
    toDate: Yup.date().typeError("forms.generic.date.validation.label")
});


const MailView = ({inboxItems, total, billFormats, showing, handleSearch, searchParams, biller, approvalCount, possibleDeregistrations, downloadLimit}) => {
    const [pageNumber, setPageNumber] = useState(searchParams.pageNumber || 1);
    const [isPaging, setIsPaging] = useState(false);
    const [sortOrder, setSortOrder] = useState(searchParams.sortOrder);
    const [sortDirection, setSortDirections] = useState(searchParams.sortDirection);

    return (
        <React.Fragment>

            <PageHeading text="mail.pageHeading"/>

            <Formik
                initialValues={{...INITIAL_VALUES, ...searchParams}}
                onSubmit={(values, {setSubmitting}) => {
                    handleSearch({...values, sortOrder, sortDirection}, setSubmitting, 1);
                    setPageNumber(1);
                }}
                validationSchema={validationSchema}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      resetForm,
                      setFieldValue,
                      setFieldTouched,
                      isSubmitting
                  }) =>
                    (
                        <React.Fragment>
                            <SearchForm handleSubmit={handleSubmit}
                                        values={values}
                                        searchParams={searchParams}
                                        handleChange={handleChange}
                                        errors={errors}
                                        touched={touched}
                                        isSubmitting={isSubmitting}
                                        resetForm={resetForm}
                                        billFormats={billFormats}
                                        setFieldValue={setFieldValue}
                                        setFieldTouched={setFieldTouched}/>

                            {(isSubmitting || isPaging) && <Loading/>}

                            {!isSubmitting && !isPaging && (
                                <React.Fragment>
                                    <SearchSummaryAndActions showing={showing}
                                                             searchParams={searchParams}
                                                             total={total}
                                                             billFormats={billFormats}
                                                             biller={biller}
                                                             approvalCount={approvalCount}
                                                             possibleDeregistrations={possibleDeregistrations}
                                                             downloadLimit={downloadLimit}/>
                                    <div className={styles.links}>
                                        <MailTable rows={inboxItems}
                                                   biller={biller}
                                                   searchParams={searchParams}
                                                   onColumnClick={columnName => {
                                                        setSortOrder(columnName);
                                                        setSortDirections(dir => dir === SORT_DIRECTION.asc ? SORT_DIRECTION.desc : SORT_DIRECTION.asc)
                                                        handleSubmit();
                                                   }}
                                                   sortOrder={sortOrder}
                                                   sortDirection={sortDirection}
                                            />
                                        {total === 0 && <LargeText text="inbox.search.noResults" className={styles.noMailFound}/>}
                                    </div>
                                    {total > 0 &&   <Pager className={styles.pagerContainerTableView}
                                                           first={showing[0]}
                                                           last={showing[1]}
                                                           total={total}
                                                           onClickPrevious={() => {
                                                               handleSearch({...values, sortOrder, sortDirection}, setIsPaging, pageNumber - 1);
                                                               setPageNumber(pageNumber - 1);
                                                           }}
                                                           onClickNext={() => {
                                                               handleSearch({...values, sortOrder, sortDirection}, setIsPaging, pageNumber + 1);
                                                               setPageNumber(pageNumber + 1);
                                                           }}
                                                           pageNumber={pageNumber}
                                                    />}
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    )}
            </Formik>

        </React.Fragment>
    );
}

export default MailView;
