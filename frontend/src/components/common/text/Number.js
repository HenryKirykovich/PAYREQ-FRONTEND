import React from "react";
import {FormattedNumber} from "react-intl";

const Number = ({value, currency, type }) => <FormattedNumber value={value} style={type} currency={currency}/>;

export default Number