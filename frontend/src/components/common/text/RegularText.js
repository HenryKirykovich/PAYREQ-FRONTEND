import React from "react";
import {injectIntl} from "react-intl";

const RegularText = ({text, values = {}, intl, className, children, ...otherProps}) => {
    const pContent = text ? intl.formatMessage({id: text}, values) : children;
    return (
        <p className={className} {...otherProps}>{pContent}</p>
    );
};

export default injectIntl(RegularText);
