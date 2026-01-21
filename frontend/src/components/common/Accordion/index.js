import React, {useState} from "react";
import {Panel, Button} from 'react-bootstrap';
import Icon from "../text/Icon";
import RegularText from "../text/RegularText";
import PropTypes from "prop-types";

import styles from "./Accordion.module.scss"
import LinkButton from "../buttons/_LinkButton";

const Accordion = ({title, values, children, textDecoration = true, defaultExpanded = true}) => {
    const [open, setOpen] = useState(false);
    return (
        <Panel bsClass={styles.imagesDiv} defaultExpanded={defaultExpanded}
               className={textDecoration ? "" : styles.noDecoration}>
            <Panel.Heading>
                <Panel.Title onClick={() => setOpen(!open)} toggle>
                    <div className={styles.title}>
                        {!textDecoration && (
                        <React.Fragment>
                            <Button className={styles.caretLink} bsStyle="link">
                                <Icon name={open ? "chevron-down" : "chevron-right"} className={styles.caret}/>
                            </Button>
                            <RegularText text={title} values={values}/>
                        </React.Fragment>
                        )}

                        {textDecoration && (
                            <LinkButton icon={open ? "chevron-down" :"chevron-right"}
                                         className={styles.caretLink}
                                         label={title}
                                         values={values}/>
                        )}
                    </div>
                </Panel.Title>
            </Panel.Heading>
            <Panel.Collapse>
                <Panel.Body>
                    {children}
                </Panel.Body>
            </Panel.Collapse>
        </Panel>
    )
};

Accordion.propTypes = {
    title: PropTypes.string,
    values: PropTypes.object
};

export default Accordion;