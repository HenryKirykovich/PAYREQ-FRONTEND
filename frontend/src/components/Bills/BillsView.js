import React, {useEffect, useState} from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import {Pager, RegularText, LargeText, DefaultButton} from "../common";
import Loading from "../Loading";
import BillsTable from "./BillsTable";
import BillsSearchForm, {INITIAL_VALUES} from "./BillsSearchForm";
import {SORT_DIRECTION} from "./bills-constants";

const validationSchema = Yup.object().shape({
    fromDate: Yup.date().typeError("forms.generic.date.validation.label"),
    toDate: Yup.date().typeError("forms.generic.date.validation.label")
});

const BillsView = ({bills, total, showing, handleSearch, searchParams, biller, canUpload, onUploadClick}) => {
    const [pageNumber, setPageNumber] = useState(searchParams.pageNumber || 1);
    const [isPaging, setIsPaging] = useState(false);
    const [sortOrder, setSortOrder] = useState(searchParams.sortOrder || "receivedTime");
    const [sortDirection, setSortDirection] = useState(searchParams.sortDirection || SORT_DIRECTION.desc);

    return (
        <React.Fragment>
            <h1 id="pageHeading" className="page-heading">Bills</h1>

            {canUpload && (
                <div className="row actions-row" role="toolbar">
                    <div className="actions btn-group col-sm-4">
                        <DefaultButton onClick={onUploadClick}>
                            <span className="glyphicon glyphicon-upload"></span> Upload
                        </DefaultButton>
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
                            <BillsSearchForm 
                                handleSubmit={handleSubmit}
                                values={values}
                                searchParams={searchParams}
                                handleChange={handleChange}
                                errors={errors}
                                touched={touched}
                                isSubmitting={isSubmitting}
                                resetForm={resetForm}
                                biller={biller}
                            />

                            {(isSubmitting || isPaging) && <Loading/>}

                            {!isSubmitting && !isPaging && total === 0 &&
                            <LargeText text="bills.search.noResults"/>}

                            {!isSubmitting && !isPaging && total > 0 && (
                                <React.Fragment>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <BillsTable 
                                                rows={bills}
                                                onColumnClick={columnName => {
                                                    setSortOrder(columnName);
                                                    setSortDirection(dir => dir === SORT_DIRECTION.asc ? SORT_DIRECTION.desc : SORT_DIRECTION.asc);
                                                    handleSubmit();
                                                }}
                                                sortOrder={sortOrder}
                                                sortDirection={sortDirection}
                                                biller={biller}
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

export default BillsView;
