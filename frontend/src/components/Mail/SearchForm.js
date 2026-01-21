import React from "react";
import {Checkbox, DefaultButton, Icon, LinkButton, Select, TextInput} from "../common";
import AdvancedSearch from "./AdvancedSearch";
import styles from "./MailView.module.scss";
import {changeAndSubmit} from "../../utils/form-utils";
import {BILL_FORMAT_ALL, MAIL_STATUS_OPTIONS} from "./mail-constants";

export const INITIAL_VALUES = {searchTerm: "", type: "all", billFormat: BILL_FORMAT_ALL, fromDate: "", toDate: "", exactSearch: false, exactSearchJobId: false};

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

        <div className={styles.statusOptions}>
        <Select name="type"
                placeholder="mail.view.mailStatus.label"
                options={MAIL_STATUS_OPTIONS}
                value={values.type}
                isControlled={true}
                onChange={e => changeAndSubmit(handleChange, handleSubmit, e, errors.type)}
                error={errors.type}
                touched={touched.type}
        />
        </div>

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

const ExactSearchInput = ({values, errors, touched, setFieldValue, setFieldTouched}) => (
    <div className={styles.exactSearch}>
        <Checkbox name="exactSearch"
                  value={values.exactSearch}
                  onChange={() => {
                      const newCheckboxValue = !values.exactSearch;
                      setFieldValue("exactSearch", newCheckboxValue);
                      if(newCheckboxValue && values.exactSearchJobId) {
                          setFieldValue("exactSearchJobId", !values.exactSearchJobId);
                      }
                  }}
                  onBlur={() => setFieldTouched("exactSearch")}
                  error={errors.exactSearch}
                  touched={touched.exactSearch}
                  label="mail.view.exactSearch.label"
        />

        <Checkbox name="exactSearchJobId"
                  value={values.exactSearchJobId}
                  onChange={() => {
                      const newCheckboxValue = !values.exactSearchJobId;
                      setFieldValue("exactSearchJobId", newCheckboxValue);
                      if(newCheckboxValue && values.exactSearch) {
                          setFieldValue("exactSearch", !values.exactSearch);
                      }
                  }}
                  onBlur={() => setFieldTouched("exactSearchJobId")}
                  error={errors.exactSearchJobId}
                  touched={touched.exactSearchJobId}
                  label="mail.view.exactSearchJobId.label"
        />
    </div>
)

const SearchForm = ({
                        handleSubmit,
                        values,
                        searchParams,
                        handleChange,
                        errors,
                        touched,
                        isSubmitting,
                        resetForm,
                        billFormats,
                        setFieldValue,
                        setFieldTouched
                    }) => (
    <form onSubmit={handleSubmit}>
        <SearchTermInput values={values}
                         handleChange={handleChange}
                         errors={errors}
                         touched={touched}
                         isSubmitting={isSubmitting}
                         resetForm={resetForm}
                         handleSubmit={handleSubmit}/>

        <ExactSearchInput values={values}
                          errors={errors}
                          touched={touched}
                          setFieldTouched={setFieldTouched}
                          setFieldValue={setFieldValue}
                          />

        <AdvancedSearch values={values}
                        searchParams={searchParams}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        errors={errors}
                        touched={touched}
                        billFormats={billFormats}
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
        />
    </form>
);

export default SearchForm
