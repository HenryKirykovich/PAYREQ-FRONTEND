import React from "react";
import styles from "./FieldGroup.module.scss"
import {injectIntl} from "react-intl";

const Field = (props) => {
  const {label, labelClassName, value, fieldRowClassName} = props;
  const testId = props["data-testid"];
  const labelTestid = testId ? {"data-testid": `${testId}-label`} : {};
  const valueTestid = testId ? {"data-testid": `${testId}-value`} : {};
  return (
    <div className={[styles.fieldRow, fieldRowClassName].join(" ")}>
      <div className={[styles.label, labelClassName].join(" ")} {...labelTestid}>
        {label}
      </div>
      <div {...valueTestid}>
        {value}
      </div>
    </div>
  );
};

const FieldGroup = ({fields, children, intl, className, internationaliseValues = false}) => (
    <div className={[styles.group, className].join(" ")}>
        {fields && fields.map(({label, value}) => <Field key={label} label={intl.formatMessage({id: label})}
                                                         value={internationaliseValues ? intl.formatMessage({id: value}) : value}/>)}
        {children}
    </div>
);

FieldGroup.Field = Field;

export default injectIntl(FieldGroup);
