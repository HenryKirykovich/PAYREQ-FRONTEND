import React from "react";
import {DefaultButton, Icon, LinkButton, TextInput} from "../common";
import AdvancedSearch from "./AdvancedSearch";
import styles from "./InboxView.module.scss";

export const INITIAL_VALUES = {searchTerm: "", paymentStatus: "all", downloadStatus: "all", forwardingStatus: "all", documentType: "all", fromDate: "", toDate: ""};

const SearchButton = React.memo(DefaultButton);

const ClearButton = React.memo(LinkButton);

const SearchTermInput = ({
                             values,
                             handleChange,
                             handleBlur,
                             errors,
                             touched,
                             isSubmitting,
                             handleSubmit,
                             resetForm
                         }) => (
    <div className={styles.searchContainer}>
        <TextInput key="searchTerm"
                   name="searchTerm"
                   ariaLabel="generic.search"
                   placeholder="generic.search"
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
                         onClick={(e) => {
                             resetForm({values: INITIAL_VALUES});
                             handleSubmit(e)
                         }}
                         className={styles.hideOnMobile}
            />
        </div>
    </div>
);

const SearchForm = ({
                        handleSubmit,
                        values,
                        searchParams,
                        handleChange,
                        errors,
                        touched,
                        isSubmitting,
                        resetForm
                    }) => (
    <form onSubmit={handleSubmit}>
        <SearchTermInput values={values}
                         handleChange={handleChange}
                         errors={errors}
                         touched={touched}
                         isSubmitting={isSubmitting}
                         resetForm={resetForm}
                         handleSubmit={handleSubmit}/>
        <AdvancedSearch values={values}
                        searchParams={searchParams}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        errors={errors}
                        touched={touched}
        />
    </form>
);

export default SearchForm