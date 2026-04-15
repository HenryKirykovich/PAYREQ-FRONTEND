import React from "react";
import {Link, useRouteMatch} from "react-router-dom";
import {Glyphicon} from "react-bootstrap";
import {injectIntl} from "react-intl";
import styles from "./SubNavbar.module.scss";

const SubNavbar = ({intl, billerId, breadcrumbs}) => {
    const match = useRouteMatch();
    const dashboardPath = `/portal/customer/biller/${billerId}/dashboard`;

    return (
        <div className={styles.subNavbar}>
            <Link to={dashboardPath} className={styles.backButton}>
                <Glyphicon glyph="chevron-left"/>
                {intl.formatMessage({id: "subNavbar.back"})}
            </Link>
            {breadcrumbs && breadcrumbs.length > 0 && (
                <div className={styles.breadcrumbs}>
                    {breadcrumbs.map((crumb, index) => (
                        <React.Fragment key={index}>
                            {index > 0 && <span className={styles.breadcrumbSeparator}>/</span>}
                            {crumb.path ? (
                                <Link to={crumb.path} className={styles.breadcrumbLink}>
                                    {crumb.labelId ? intl.formatMessage({id: crumb.labelId}) : crumb.label}
                                </Link>
                            ) : (
                                <span className={styles.breadcrumbCurrent}>
                                    {crumb.labelId ? intl.formatMessage({id: crumb.labelId}) : crumb.label}
                                </span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    );
};

export default injectIntl(SubNavbar);
