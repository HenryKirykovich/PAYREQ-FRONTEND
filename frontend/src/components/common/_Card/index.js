import React from "react";
import {injectIntl} from "react-intl";
import PropTypes from "prop-types";

import RegularText from "../text/RegularText";
import styles from "./_Card.module.scss";

const _Card = ({className, heading, children, intl, subHeading, hover}) => (
    <div
        className={["panel", hover ? styles.hoverBoxShadow : "", styles.boxShadow, className, styles.cardContainer].join(" ")}>
        {heading && (
            <div className="panel-heading">
                <h2 className="panel-title">{intl.formatMessage({id: heading})}</h2>
                {subHeading && <RegularText className={styles.subHeading} text={intl.formatMessage({id: subHeading})}/>}
            </div>
        )}
        <div className="panel-body">{children}</div>
    </div>
);

_Card.propTypes = {
    className: PropTypes.string,
    heading: PropTypes.string,
    subHeading: PropTypes.string
};

export default injectIntl(_Card);