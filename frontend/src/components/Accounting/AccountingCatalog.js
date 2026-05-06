import React, {useEffect, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {useHistory} from "react-router-dom";
import {Table, Button, Alert} from "../common";
import Loading from "../Loading";

const AccountingCatalog = ({billerId, intl}) => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (billerId) {
            fetchCatalog();
        }
    }, [billerId]);

    const fetchCatalog = () => {
        setIsLoading(true);
        axios.get(`/data/accounting/catalog`)
            .then(({data}) => {
                setProducts(data.products || []);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching catalog:", error);
                setIsLoading(false);
            });
    };

    const handlePurchase = (productId) => {
        history.push(`/portal/customer/biller/${billerId}/settings/accounting/checkout/${productId}`);
    };

    if (isLoading) {
        return <Loading/>;
    }

    const columns = [
        {key: "name", label: "Product"},
        {key: "credits", label: "Credits"},
        {key: "price", label: "Price"},
        {
            key: "actions",
            label: "",
            render: (row) => (
                <Button variant="primary" size="sm" onClick={() => handlePurchase(row.id)}>
                    {intl.formatMessage({id: "settings.accounting.catalog.purchase"})}
                </Button>
            )
        }
    ];

    return (
        <div>
            <h2 className="page-heading">
                {intl.formatMessage({id: "settings.accounting.catalog.heading"})}
            </h2>

            <Alert variant="info">
                {intl.formatMessage({id: "settings.accounting.catalog.info"})}
            </Alert>

            <Table
                columns={columns}
                data={products}
                emptyMessage={intl.formatMessage({id: "settings.accounting.catalog.noProducts"})}
            />
        </div>
    );
};

export default injectIntl(AccountingCatalog);
