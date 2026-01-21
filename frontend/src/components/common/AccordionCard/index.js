import React from "react";
import {Panel} from "react-bootstrap";
import {injectIntl} from "react-intl";
import PropTypes from "prop-types";
import Icon from "../text/Icon";
import styles from "./AccordionCard.module.scss";
import cardStyles from "../_Card/_Card.module.scss";
import {SecondaryHeading} from "../index";

function AccordionCard({title, values, isOpen, handleSelect, children}) {
    return (
        <Panel bsStyle="default"
               expanded={isOpen}
               onToggle={handleSelect}
               className={["panel", cardStyles.hoverBoxShadow, cardStyles.boxShadow].join(" ")}>
            <Panel.Heading>
                <Panel.Title toggle className={styles.panelTitle}>
                    <SecondaryHeading text={title} values={values}/>
                    <Icon name={isOpen ? "menu-up" : "menu-down"} className={styles.caret}/>
                </Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
                {children}
            </Panel.Body>
        </Panel>
    )
}

AccordionCard.propTypes = {
    title: PropTypes.string,
    values: PropTypes.object,
    key: PropTypes.string
};
export default injectIntl(AccordionCard);
