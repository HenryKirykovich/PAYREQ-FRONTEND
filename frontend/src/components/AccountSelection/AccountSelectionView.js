import React from "react";
import styles from './AccountSelection.module.scss'
import LargeText from "../common/text/LargeText";
import RegularText from "../common/text/RegularText";
import {Card, Icon, PageHeading, TextInput} from "../common";
import payreqSymbol from "../../resources/images/payreq_symbol.svg";
import {Link} from "react-router-dom";
import {isBillingAccount} from "../../utils/account-utils";

const getLogoPath = (logoPath) => {
    if (typeof logoPath === 'undefined'){
        return payreqSymbol;
    }
    else return logoPath;
}

const PayreqAccessingAccount = ({account}) => {
    const {id, tagName} = account;
    return (
        <Link to={`../biller/${id}/dashboard`}
              aria-label={tagName}
        >
            <Card hover>
                <div className={styles.wrapper}>
                    <div className={styles.logoContainer}>
                        <img src={payreqSymbol} className={styles.logoAccessing} alt={tagName}/>
                    </div>
                    <div className={styles.accountDetailsWrapper}>
                        <LargeText className={styles.accountName}>{tagName}</LargeText>
                        <RegularText text="accountSelection.accessingAccount" className={styles.accountDetails}/>
                    </div>
                </div>
            </Card>
        </Link>
    )
}

const PayreqSharingAccount = ({account}) => {
    const {id, tagName, mailhouseName, extBillerId, logoPath, accountType} = account;
    return (
        <Link to={`../biller/${id}/admin-dashboard`}
              aria-label={tagName}
        >
            <Card hover>
                <div className={styles.wrapper}>
                    <div className={styles.logoContainer}>
                        <img src={getLogoPath(logoPath)} className={styles.logoSharing} alt={tagName}/>
                    </div>
                    <div className={styles.accountDetailsWrapper}>
                        <LargeText className={styles.accountName}>{tagName}</LargeText>
                        {mailhouseName ? <RegularText text="accountSelection.sharingAccount.text1a" values={{accountID: extBillerId, integrator: mailhouseName}} className={styles.accountDetails}/>
                            : <RegularText text="accountSelection.sharingAccount.text1b" values={{accountID: extBillerId}} className={styles.accountDetails}/>}
                        {isBillingAccount(accountType) ? <RegularText text="accountSelection.sharingAccount.billing"/>
                            : <RegularText text="accountSelection.sharingAccount.payroll"/>}
                    </div>
                </div>
            </Card>
        </Link>
    )
}

const AccountCard = ({account}) => {
    if (account.product === "Payreq Delivery"){
        return <PayreqSharingAccount account={account}/>
    } else {
        return <PayreqAccessingAccount account={account}/>
    }
}

export const AccountSelectionView = ({accounts, searchTerm, setDoSearch, setSearchTerm, setPage, lastElementRef}) => {
    return (
        <React.Fragment>
            <PageHeading text="accountSelection.heading"/>
            <LargeText text="accountSelection.subHeading"/>

            <div className={styles.billerContainer}>
                <div className={styles.searchInputContainer}>
                    <TextInput key="search"
                               name="search"
                               ariaLabel="accountSelection.search.placeholder"
                               placeholder="accountSelection.search.placeholder"
                               value={searchTerm}
                               onChange={e => {
                                   setSearchTerm(e.target.value);
                                   setPage(1);
                                   setDoSearch(true);
                               }}
                               addon={<Icon name="search"/>}
                    />
                </div>

                <div className={styles.links}>
                    {accounts.length > 0 && accounts.map((account, idx) => {
                        if (accounts.length === idx + 1) {
                            return <div key={idx} ref={lastElementRef} > <AccountCard account={account}/> </div>
                        } else {
                            return <div key={idx}> <AccountCard account={account}/> </div>
                        }
                    })}
                </div>
                {accounts.length === 0 && <LargeText text="accountSelection.noAccountsFound"/>}
            </div>
        </React.Fragment>
    )
}
