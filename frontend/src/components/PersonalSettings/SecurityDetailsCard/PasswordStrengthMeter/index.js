import React, {useEffect, useState} from "react";
import styles from "./PasswordStrengthMeter.module.scss";
import {ProgressBar, HelpBlock, FormGroup} from "react-bootstrap";
import {injectIntl} from "react-intl";
import zxcvbn from "zxcvbn";

// eslint-disable-next-line
export const symbolRegex = /[$@#-/:-?{-~!"^_`\[\]]/
export const numberRegex = /[0-9]/

const PROGRESS_BAR_VARIANTS = [
    "danger",
    "warning",
    "warning",
    "warning",
    "success"]

const zxcvbnErrorMapping = {
    "Use a few words, avoid common phrases": "changePassword.suggestions.1",
    "No need for symbols, digits, or uppercase letters": "changePassword.suggestions.2",
    'Straight rows of keys are easy to guess': "changePassword.suggestions.3",
    'Short keyboard patterns are easy to guess': "changePassword.suggestions.4",
    'Use a longer keyboard pattern with more turns': "changePassword.suggestions.5",
    'Repeats like "aaa" are easy to guess': "changePassword.suggestions.6",
    'Repeats like "abcabcabc" are only slightly harder to guess than "abc"': "changePassword.suggestions.7",
    'Avoid repeated words and characters': "changePassword.suggestions.8",
    "Sequences like abc or 6543 are easy to guess": "changePassword.suggestions.9",
    'Avoid sequences': "changePassword.suggestions.10",
    "Recent years are easy to guess": "changePassword.suggestions.11",
    'Avoid recent years': "changePassword.suggestions.12",
    'Avoid years that are associated with you': "changePassword.suggestions.13",
    "Dates are often easy to guess": "changePassword.suggestions.14",
    'Avoid dates and years that are associated with you': "changePassword.suggestions.15",
    'This is a top-10 common password': "changePassword.suggestions.16",
    'This is a top-100 common password': "changePassword.suggestions.17",
    'This is a very common password': "changePassword.suggestions.18",
    'This is similar to a commonly used password': "changePassword.suggestions.19",
    'A word by itself is easy to guess': "changePassword.suggestions.20",
    'Names and surnames by themselves are easy to guess': "changePassword.suggestions.21",
    'Common names and surnames are easy to guess': "changePassword.suggestions.22",
    "Capitalization doesn't help very much": "changePassword.suggestions.23",
    "All-uppercase is almost as easy to guess as all-lowercase": "changePassword.suggestions.24",
    "Reversed words aren't much harder to guess": "changePassword.suggestions.25",
    "Predictable substitutions like '@' instead of 'a' don't help very much": "changePassword.suggestions.26",
    "Add another word or two. Uncommon words are better.": "changePassword.suggestions.27"
};

const calculateScore = (password, result) => {
    const meetsStupidBackendRequirements = password.match(symbolRegex) && password.match(numberRegex) && password.length >= 10;
    const manualStrengthAdjustment = meetsStupidBackendRequirements ? 0 : 1
    return result.score - manualStrengthAdjustment;
};

const PasswordStrengthMeter = ({password, intl}) => {
    const [score, setScore] = useState();
    const [result, setResult] = useState();
    useEffect(() => {
        const result = zxcvbn(password)
        setScore(calculateScore(password, result));
        setResult(result);
    }, [password])

    return (
        <FormGroup className={styles.progressBarContainer}>
            <ProgressBar bsStyle={PROGRESS_BAR_VARIANTS[score]}
                         now={password ? 100 / (5 - score) : 0}
                         key={score}
                         className={styles.progressBar}/>
            {password && result.feedback.suggestions.map(s => <HelpBlock key={zxcvbnErrorMapping[s]} className={styles.passwordSuggestions}>
                {(zxcvbnErrorMapping[s]) ? intl.formatMessage({id: zxcvbnErrorMapping[s]}) : ""}
            </HelpBlock>)}
        </FormGroup>
    )
};

export default injectIntl(PasswordStrengthMeter);
