import React, {useEffect, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {useHistory, useParams} from "react-router-dom";
import {PageHeading, Button, Alert} from "../common";
import Loading from "../Loading";

const AccountingCheckout = ({billerId, intl}) => {
    const history = useHistory();
    const {productId} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [isPurchasing, setIsPurchasing] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    const fetchProduct = () => {
        setIsLoading(true);
        axios.get(`/data/accounting/catalog/${productId}`)
            .then(({data}) => {
                setProduct(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching product:", error);
                setErrorMessage("Failed to load product details");
                setIsLoading(false);
            });
    };

    const handleCompletePurchase = () => {
        setIsPurchasing(true);
        setErrorMessage(null);

        axios.post(`/data/accounting/purchase`, {
            billerId,
            productId
        })
            .then(() => {
                history.push(`/portal/customer/biller/${billerId}/settings/accounting`);
            })
            .catch(error => {
                setErrorMessage(error.response?.data?.message || "Purchase failed");
                setIsPurchasing(false);
            });
    };

    if (isLoading) {
        return <Loading/>;
    }

    if (!product) {
        return <Alert variant="danger">Product not found</Alert>;
    }

    return (
        <div>
            <PageHeading>Checkout</PageHeading>

            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title">Purchase Summary</h4>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-6">
                            <h4>{product.name}</h4>
                            <p>{product.description}</p>
                            <p><strong>Credits:</strong> {product.credits}</p>
                            <p><strong>Price:</strong> ${product.price}</p>
                        </div>
                    </div>

                    <hr/>

                    <div className="text-right">
                        <Button
                            variant="default"
                            onClick={() => history.goBack()}
                            className="mr-2"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="success"
                            onClick={handleCompletePurchase}
                            disabled={isPurchasing}
                        >
                            {isPurchasing ? "Processing..." : "Complete Purchase"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default injectIntl(AccountingCheckout);
