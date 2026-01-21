import React from "react";
import {withRouter} from 'react-router-dom'
import {injectIntl} from "react-intl";
import {FieldGroup, LinkButton,  AlertDanger} from "../../common";
import styles from "./ForwardingRule.module.scss";

const getHeadingLabel = (forwardingRule) => {
    switch (forwardingRule.accountFn){
        case "account-no-starting-with": return "settings.forwardingRules.card.heading.account";
        case "all-accounts-bills": return "settings.forwardingRules.card.heading.all-bills";
        default: return "settings.forwardingRules.card.heading.all"
    }
}

const _ForwardingCardHeading = ({forwardingRule, intl}) => (
    <div className={styles.cardHeading}>
        {intl.formatMessage({id: getHeadingLabel(forwardingRule)},
            {billerName: forwardingRule.tagName, accountNumber: forwardingRule.accountValue})}
        <strong>{forwardingRule.displayName}</strong>
    </div>

);

const ForwardingCardHeading = injectIntl(_ForwardingCardHeading);

const _ForwardingGroupPropertyMe = ({forwardingRule, intl}) => (

        <FieldGroup className={styles.fieldGroup} fields={[{label: "settings.forwardingRules.create.propertyme.supplier.label", value: forwardingRule.field1},
            {label: "settings.forwardingRules.create.propertyme.tax.label", value:  intl.formatMessage({id: "forms.generic." +  forwardingRule.field2})},
            {label: "settings.forwardingRules.create.propertyme.duedate.label", value: intl.formatMessage({id: "forms.generic." +  forwardingRule.field3})},
            {label: "settings.forwardingRules.create.propertyme.details.label", value: intl.formatMessage({id: "settings.forwardingRules.create.propertyme.details." +  forwardingRule.field4 + ".label"})}]}/>

);

const ForwardingGroupPropertyMe = injectIntl(_ForwardingGroupPropertyMe);


const ForwardingRule = ({forwardingRule, showButtons, history}) => {

    return (
        <React.Fragment>

            <div key={forwardingRule.id} className={styles.card}>
                <div className={styles.cardHeaderPannel}>
                    <ForwardingCardHeading forwardingRule={forwardingRule}/>

                    {showButtons &&
                        <div  className={styles.button}>
                            <LinkButton label="forms.generic.edit.button"
                                             className={styles.buttonContainer}
                                             icon="pencil"
                                             onClick={() => history.push("./"+ forwardingRule.id +"/edit")}/>
                            <LinkButton label="forms.generic.delete.button"
                                             icon="remove"
                                             className={styles.buttonContainer}
                                             onClick={() => history.push("./" + forwardingRule.id + "/delete")}/>
                        </div>}
                </div>
                {forwardingRule.error && <AlertDanger value={forwardingRule.error}/>}

                <div className={styles.cardBody}>
                    {forwardingRule.name === "propertyme" &&
                        <ForwardingGroupPropertyMe forwardingRule={forwardingRule}/>}


                </div>
            </div>

        </React.Fragment>
    );
};

export default withRouter(ForwardingRule);