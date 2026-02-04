import React, {useState} from "react";
import {injectIntl} from "react-intl";
import {FormControl, Button} from "react-bootstrap";

export const INITIAL_VALUES = {
    searchTerm: "",
    fromDate: "",
    toDate: "",
    status: "",
    billFormat: "",
    exactSearch: false,
    exactSearchJobId: false
};

const BillsSearchForm = ({
    handleSubmit,
    values,
    handleChange,
    errors,
    touched,
    isSubmitting,
    resetForm,
    searchParams,
    intl,
    biller
}) => {
    const [showSearch, setShowSearch] = useState(true);

    const statusOptions = [
        { value: "", label: intl.formatMessage({id: "bills.status.all"}) },
        { value: "draft", label: intl.formatMessage({id: "bills.status.draft"}) },
        { value: "review-by-biller", label: intl.formatMessage({id: "bills.status.reviewByBiller"}) },
        { value: "readyForDispatch", label: intl.formatMessage({id: "bills.status.readyForDispatch"}) },
        { value: "dispatched", label: intl.formatMessage({id: "bills.status.dispatched"}) },
        { value: "rejected", label: intl.formatMessage({id: "bills.status.rejected"}) }
    ];

    return (
        <div className="panel panel-default">
            <div 
                className="panel-heading search-panel-heading"
                onClick={() => setShowSearch(!showSearch)}
                style={{cursor: "pointer"}}
            >
                <h4 className="panel-title search-panel-title">
                    <span className="glyphicon glyphicon-search search-panel-glyphicon"/> 
                    {" "}Search
                    <span style={{float: "right"}} className={`glyphicon ${showSearch ? 'glyphicon-chevron-up' : 'glyphicon-chevron-down'}`}/>
                </h4>
            </div>
            {showSearch && (
                <div className="panel-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-sm-4">
                                    <FormControl
                                        type="text"
                                        name="searchTerm"
                                        value={values.searchTerm}
                                        onChange={handleChange}
                                        placeholder="Search term"
                                    />
                                </div>
                                <div className="col-sm-3">
                                    <FormControl
                                        type="date"
                                        name="fromDate"
                                        value={values.fromDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-sm-3">
                                    <FormControl
                                        type="date"
                                        name="toDate"
                                        value={values.toDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-sm-2">
                                    <Button bsStyle="primary" type="submit" disabled={isSubmitting}>
                                        Search
                                    </Button>
                                </div>
                            </div>

                            <div className="row" style={{marginTop: "10px"}}>
                                <div className="col-sm-12">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="exactSearch"
                                            checked={values.exactSearch}
                                            onChange={handleChange}
                                        />
                                        {" "}{intl.formatMessage({id: "bills.search.exactSearch"})}
                                    </label>
                                </div>
                            </div>

                            <div className="row" style={{marginTop: "10px"}}>
                                <div className="col-sm-12">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="exactSearchJobId"
                                            checked={values.exactSearchJobId}
                                            onChange={handleChange}
                                        />
                                        {" "}{intl.formatMessage({id: "bills.search.exactSearchJobId"})}
                                    </label>
                                </div>
                            </div>

                            <div className="row" style={{marginTop: "15px"}}>
                                <div className="col-sm-4">
                                    <FormControl
                                        componentClass="select"
                                        name="status"
                                        value={values.status}
                                        onChange={handleChange}
                                    >
                                        {statusOptions.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </FormControl>
                                </div>
                                <div className="col-sm-2">
                                    <Button 
                                        type="button"
                                        onClick={() => {
                                            resetForm({values: INITIAL_VALUES});
                                        }}
                                    >
                                        Clear
                                    </Button>
                                </div>
                            </div>
                        </form>
                </div>
            )}
        </div>
    );
};

export default injectIntl(BillsSearchForm);
