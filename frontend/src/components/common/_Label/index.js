import React from "react";
import {Label} from "react-bootstrap";
import {injectIntl} from "react-intl";
import PropTypes from 'prop-types';

import styles from "./_Label.module.scss"

const SUCCESS = "success";
const PRIMARY = "primary";
const DEFAULT = "default";
const WARNING = "warning";
const DANGER = "danger";

const LABEL_CLASS_BY_TYPE = {
    [WARNING]: styles.warningLabel,
    [SUCCESS]: styles.successLabel,
    [DEFAULT]: styles.defaultLabel,
    [DANGER]: styles.dangerLabel,

};

const _Label = ({className, type = DEFAULT, text, values, children, intl}) => (
    <Label className={styles.statusLabel + " " + LABEL_CLASS_BY_TYPE[type] + " " + className}
           bsStyle={type}>
        {text && intl.formatMessage({id: text}, values)}
        {children}
    </Label>
);

_Label.propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf([SUCCESS, PRIMARY, DEFAULT, WARNING, DANGER]),
    text: PropTypes.string
};

_Label.SUCCESS = SUCCESS;
_Label.PRIMARY = PRIMARY;
_Label.DEFAULT = DEFAULT;
_Label.WARNING = WARNING;
_Label.DANGER = DANGER;

export default injectIntl(_Label);