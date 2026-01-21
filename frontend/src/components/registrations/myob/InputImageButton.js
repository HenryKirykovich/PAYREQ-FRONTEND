import React from "react";
import {InputGroup, FormControl} from "react-bootstrap";
import styles from "./CreateMyobRegistrationView.module.scss";


const InputImageButton = ({touched, error, placeholder, onClick, imageSrc, alt, disabled}) => {
    const showError = touched && error;

    return (
        <InputGroup validationState={showError ? "error" : null}>
            <FormControl
                type="image"
                placeholder={placeholder}
                onClick={onClick}
                disabled={disabled}
                className={styles.imageButton}
                src={imageSrc}
                alt={alt}/>
        </InputGroup>
    );
};

export default (InputImageButton);
