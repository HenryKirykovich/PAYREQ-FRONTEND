import React, {useState} from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import {Pager, RegularText, LargeText} from "../common";
import {Button} from "react-bootstrap";
import Loading from "../Loading";
import ContactsTable from "./ContactsTable";
import ContactsSearchForm, {INITIAL_VALUES} from "./ContactsSearchForm";
import {SORT_DIRECTION} from "./contacts-constants";

const validationSchema = Yup.object().shape({
    searchTerm: Yup.string()
});

const ContactsView = ({
    contacts, 
    total, 
    showing, 
    handleSearch, 
    searchParams, 
    biller, 
    canImportContacts, 
    canDeleteContact,
    onImportClick,
    onDeleteContact,
    visibleColumns,
    hasContactField3
}) => {
    const [pageNumber, setPageNumber] = useState(searchParams.pageNumber || 1);
    const [isPaging, setIsPaging] = useState(false);
    const [sortOrder, setSortOrder] = useState(searchParams.sortOrder || "lastUpdated");
    const [sortDirection, setSortDirection] = useState(searchParams.sortDirection || SORT_DIRECTION.desc);

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-12">
                    <h2 className="page-heading">
                        {total > 0 ? `Contacts (${total} total)` : "Contacts"}
                    </h2>
                </div>
            </div>

            {canImportContacts && (
                <div className="row actions-row">
                    <div className="actions btn-group col-sm-4">
                        <Button onClick={onImportClick}>
                            <span className="glyphicon glyphicon-import"></span> Import Contacts
                        </Button>
                    </div>
                </div>
            )}

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
                            <ContactsSearchForm 
                                handleSubmit={handleSubmit}
                                values={values}
                                searchParams={searchParams}
                                handleChange={handleChange}
                                errors={errors}
                                touched={touched}
                                isSubmitting={isSubmitting}
                                resetForm={resetForm}
                                hasContactField3={hasContactField3}
                            />

                            {(isSubmitting || isPaging) && <Loading/>}

                            {!isSubmitting && !isPaging && total === 0 &&
                            <LargeText text="contacts.search.noResults"/>}

                            {!isSubmitting && !isPaging && total > 0 && (
                                <React.Fragment>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <ContactsTable 
                                                rows={contacts}
                                                onColumnClick={columnName => {
                                                    setSortOrder(columnName);
                                                    setSortDirection(dir => dir === SORT_DIRECTION.asc ? SORT_DIRECTION.desc : SORT_DIRECTION.asc);
                                                    handleSubmit();
                                                }}
                                                sortOrder={sortOrder}
                                                sortDirection={sortDirection}
                                                biller={biller}
                                                visibleColumns={visibleColumns}
                                                canDeleteContact={canDeleteContact}
                                                onDeleteContact={onDeleteContact}
                                            />
                                        </div>
                                    </div>
                                    <Pager 
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
    );
};

export default ContactsView;
