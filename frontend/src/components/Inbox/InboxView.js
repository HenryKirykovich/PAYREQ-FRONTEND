import React, {useEffect, useState} from "react";
import {Formik} from "formik";
import * as Yup from "yup";

import {PageHeading, Pager, RegularText, LargeText} from "../common";
import styles from "./InboxView.module.scss"
import Loading from "../Loading";
import InboxTable from "./InboxTable";
import SearchForm, {INITIAL_VALUES} from "./SearchForm";
import SearchSummaryAndActions from "./SearchSummaryAndActions";
import {SORT_DIRECTION, VIEWS, INVOICE_DOCUMENT_TYPES} from "./inbox-constants";
import BillCard from "./BillCard";
import PayrollCard from "./PayrollCard";
import LetterCard from "./LetterCard";
import CreditNoteCard from "./CreditNoteCard";

const chooseCardView = (inboxItem) => {
    switch (inboxItem.documentType)  {
        case INVOICE_DOCUMENT_TYPES.invoice: case INVOICE_DOCUMENT_TYPES.peppol_invoice: case INVOICE_DOCUMENT_TYPES.invoice_reminder:
            return <BillCard key={inboxItem.id} bill={inboxItem}/>;
        case INVOICE_DOCUMENT_TYPES.peppol_credit_note:
            return <CreditNoteCard key={inboxItem.id} bill={inboxItem}/>;
        case INVOICE_DOCUMENT_TYPES.letter:
            return <LetterCard key={inboxItem.id} document={inboxItem}/>
        default:
            return <PayrollCard key={inboxItem.id} document={inboxItem}/>
    }
};

const validationSchema = Yup.object().shape({
    fromDate: Yup.date().typeError("forms.generic.date.validation.label"),
    toDate: Yup.date().typeError("forms.generic.date.validation.label")
});

function overrideTableViewOnScreenResize(setView, view) {
    if (window.matchMedia && typeof window.matchMedia === 'function') {
        const mql = window.matchMedia('(max-width: 900px)');

        const handleMatchesChange = () => {
            if (view === VIEWS.table && mql.matches) {
                setView(VIEWS.cards);
            }
        };

        let remove = null;
        if (mql.addListener && typeof mql.addListener === 'function') {
            mql.addListener(handleMatchesChange);
            remove = () => {
                mql.removeListener(handleMatchesChange);
            }
        }

        handleMatchesChange();
        return remove;
    }
}

const InboxView = ({inboxItems, total, typeCounts, downloadLimit, showing, handleSearch, searchParams, view, setView, biller}) => {
    const [pageNumber, setPageNumber] = useState(searchParams.pageNumber || 1);
    const [isPaging, setIsPaging] = useState(false);
    const [sortOrder, setSortOrder] = useState(searchParams.sortOrder);
    const [sortDirection, setSortDirections] = useState(searchParams.sortDirection);

    useEffect(() => overrideTableViewOnScreenResize(setView, view), [setView, view])

    return (
        <React.Fragment>

            <PageHeading text="inbox.pageHeading"/>

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
                                        resetForm={resetForm}/>

                            {(isSubmitting || isPaging) && <Loading/>}

                            {!isSubmitting && !isPaging && total === 0 &&
                            <LargeText text="inbox.search.noResults"/>}

                            {!isSubmitting && !isPaging && total > 0 && (
                                <React.Fragment>
                                    <SearchSummaryAndActions showing={showing}
                                                              total={total}
                                                              setView={setView}
                                                              view={view}
                                                              biller={biller}
                                                              typeCounts={typeCounts}
                                                              downloadLimit={downloadLimit}/>
                                    <div className={styles.links}>
                                        {view !== VIEWS.table && inboxItems.map(chooseCardView)}
                                        {view === VIEWS.table && <InboxTable rows={inboxItems}
                                                                             onColumnClick={columnName => {
                                                                                 setSortOrder(columnName);
                                                                                 setSortDirections(dir => dir === SORT_DIRECTION.asc ? SORT_DIRECTION.desc : SORT_DIRECTION.asc)
                                                                                 handleSubmit();
                                                                             }}
                                                                             sortOrder={sortOrder}
                                                                             sortDirection={sortDirection}
                                        />}
                                    </div>
                                    <Pager className={`${view !== VIEWS.table ? styles.pagerContainerCardsView : styles.pagerContainerTableView}`}
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
                                    <RegularText text="inbox.search.paymentStatusFootnote"/>
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    )}
            </Formik>

        </React.Fragment>
    );
}

export default InboxView;
