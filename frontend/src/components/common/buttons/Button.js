import React from "react";
import PropTypes from "prop-types";

const Button = ({
    variant = "default",
    size,
    disabled = false,
    onClick,
    children,
    className = "",
    ...rest
}) => {
    const variantClass = variant ? `btn-${variant}` : "btn-default";
    const sizeClass = size ? `btn-${size}` : "";
    const classes = `btn ${variantClass} ${sizeClass} ${className}`.trim();

    return (
        <button
            className={classes}
            disabled={disabled}
            onClick={onClick}
            {...rest}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    variant: PropTypes.oneOf(["default", "primary", "success", "info", "warning", "danger", "link"]),
    size: PropTypes.oneOf(["sm", "lg"]),
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string
};

export default Button;
