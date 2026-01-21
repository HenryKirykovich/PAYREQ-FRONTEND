import React from "react";
import {LargeText} from "../common";

import styles from "./GenericError.module.scss"

const GenericError = () => <div className={styles.errorContainer}><LargeText text="forms.generic.error"/></div>;

export default GenericError;