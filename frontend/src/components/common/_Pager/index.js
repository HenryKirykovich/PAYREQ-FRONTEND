import React from "react";
import {Pager} from "react-bootstrap";
import PropTypes from "prop-types"
import {injectIntl} from "react-intl";

import {RegularText} from "../index";
import styles from "./_Pager.module.scss"

const _Pager = ({className, first, last, total, pageNumber, onClickPrevious, onClickNext, intl}) => (
    <Pager className={`${styles.pagerContainer} ${className}`}>
        <RegularText text="pagination.showing.label"
                     values={{first, last, total}}/>
        <Pager.Item disabled={pageNumber === 1}
                    onClick={onClickPrevious}>
            {intl.formatMessage({id: "generic.previous"})}
        </Pager.Item>
        <Pager.Item disabled={last === total}
                    onClick={onClickNext}>
            {intl.formatMessage({id: "forms.generic.next.button"})}
        </Pager.Item>
    </Pager>
);

_Pager.propTypes = {
    className: PropTypes.string,
    first: PropTypes.number,
    last: PropTypes.number,
    total: PropTypes.number,
    pageNumber: PropTypes.number,
    onClickPrevious: PropTypes.func,
    onClickNext: PropTypes.func,
};

export default injectIntl(_Pager);