import React from "react";
import {Glyphicon} from "react-bootstrap";
import PropTypes from "prop-types";
import LargeText from "./LargeText";

const Icon = ({name, large, className, ...rest}) => {
    const icon = <Glyphicon glyph={name} className={className} {...rest}/>;
    return large ? <LargeText>{icon}</LargeText> : icon;
};

Icon.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    large: PropTypes.bool
};

export default Icon;