import React, {useMemo} from "react";
import {Accordion, DateInput, Select} from "../common";
import styles from "./MailView.module.scss";
import {changeAndSubmit, changeAndSubmitOnDate} from "../../utils/form-utils";
import {BILL_FORMAT_ALL, CONSUMER_COMMUNICATION_MAIL_TEMPLATE} from "./mail-constants";
import {injectIntl} from "react-intl";

const isStatusFilterOn = status => status !== BILL_FORMAT_ALL

const optionsBillFormats = (billFormats, intl) => {
    const billFormatLabels = billFormats.map(({id, displayName}) => ({value: id, label: displayName}))
                                        .filter(billFormat => !(billFormat.value === CONSUMER_COMMUNICATION_MAIL_TEMPLATE))
                                        .sort((a,b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0))
    return [{value: BILL_FORMAT_ALL, label: intl.formatMessage({id: "generic.all"})}].concat(billFormatLabels)
};

const getDefaultExpanded = ({   billFormat,
                                fromDate,
                                toDate,
                            }) => {
    return !!(isStatusFilterOn(billFormat) || fromDate || toDate)
};

const AdvancedSearch = ({values, searchParams, handleChange, handleSubmit, errors, touched, billFormats, intl}) => {
    const optionsForBillFormats = useMemo(() => optionsBillFormats(billFormats, intl), [billFormats, intl]);
    return(
        <div className={styles.advancedSearch}>
            <Accordion title="generic.advancedSearch" defaultExpanded={getDefaultExpanded(values)}>
                <div className={styles.advancedSearchFields}>
                    <Select name="billFormat"
                            label="mail.view.mailTemplate.label"
                            placeholder="mail.view.mailTemplate.label"
                            className={`${styles.advancedSearchField} ${isStatusFilterOn(searchParams.billFormat) ? styles.activeFilter : ""}`}
                            options={optionsForBillFormats}
                            value={values.billFormat}
                            isControlled={true}
                            internationalisedOptions={false}
                            onChange={e => changeAndSubmit(handleChange, handleSubmit, e, errors.type)}
                            error={errors.billFormat}
                            touched={touched.billFormat}
                    />
                    <DateInput name="fromDate"
                               className={`${styles.advancedSearchField} ${searchParams.fromDate ? styles.activeFilter : ""}`}
                               label="forms.generic.fromDate"
                               value={values.fromDate}
                               onChange={e => changeAndSubmitOnDate(handleChange, handleSubmit, e)}
                               error={errors.fromDate}
                               touched={touched.fromDate}/>
                    <DateInput name="toDate"
                               className={`${styles.advancedSearchField} ${searchParams.toDate ? styles.activeFilter : ""}`}
                               label="forms.generic.toDate"
                               value={values.toDate}
                               onChange={e => changeAndSubmitOnDate(handleChange, handleSubmit, e)}
                               error={errors.toDate}
                               touched={touched.toDate}/>
                </div>
            </Accordion>
        </div>
    )
};

export default injectIntl(AdvancedSearch);
