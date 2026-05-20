import React, {useEffect, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {useHistory} from "react-router-dom";
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
        axios.get("/data/accounting/catalog")
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

    return (
        <div>
            <h2 className="page-heading">
                {intl.formatMessage({id: "settings.accounting.catalog.heading"})}
            </h2>

            <div className="alert alert-info" role="alert">
                {intl.formatMessage({id: "settings.accounting.catalog.info"})}
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Credits</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.credits}</td>
                                <td>{product.price}</td>
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handlePurchase(product.id)}
                                    >
                                        {intl.formatMessage({id: "settings.accounting.catalog.purchase"})}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">
                                {intl.formatMessage({id: "settings.accounting.catalog.noProducts"})}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default injectIntl(AccountingCatalog);
