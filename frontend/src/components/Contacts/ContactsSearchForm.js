import React, {useState} from "react";
import {injectIntl} from "react-intl";
import {FormControl, Button} from "react-bootstrap";

export const INITIAL_VALUES = {
    searchTerm: "",
    exactSearch: false,
    exactSearchNoticeGroup: false
};

const ContactsSearchForm = ({
    handleSubmit,
    values,
    handleChange,
    errors,
    touched,
    isSubmitting,
    resetForm,
    intl,
    hasContactField3
}) => {
    const [showSearch, setShowSearch] = useState(true);

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
                                <div className="col-sm-6">
                                    <FormControl
                                        type="text"
                                        name="searchTerm"
                                        value={values.searchTerm}
                                        onChange={handleChange}
                                        placeholder="Search term"
                                    />
                                </div>
                                <div className="col-sm-2">
                                    <Button bsStyle="primary" type="submit" disabled={isSubmitting}>
                                        Search
                                    </Button>
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

                            <div className="row" style={{marginTop: "10px"}}>
                                <div className="col-sm-12">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="exactSearch"
                                            checked={values.exactSearch}
                                            onChange={handleChange}
                                        />
                                        {" "}{intl.formatMessage({id: "contacts.search.exactSearch"})}
                                    </label>
                                </div>
                            </div>

                            {hasContactField3 && (
                                <div className="row" style={{marginTop: "10px"}}>
                                    <div className="col-sm-12">
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="exactSearchNoticeGroup"
                                                checked={values.exactSearchNoticeGroup}
                                                onChange={handleChange}
                                            />
                                            {" "}{intl.formatMessage({id: "contacts.search.exactSearchNoticeGroup"})}
                                        </label>
                                    </div>
                                </div>
                            )}
                        </form>
                </div>
            )}
        </div>
    );
};

export default injectIntl(ContactsSearchForm);
