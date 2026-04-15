import React, {useEffect, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {PageHeading, TextInput, Button, Alert} from "../common";
import Loading from "../Loading";

const InvoiceBillerManagement = ({billerId, invoiceBillerId, intl}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [biller, setBiller] = useState(null);
    const [tagName, setTagName] = useState("");
    const [email, setEmail] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if (billerId && invoiceBillerId) {
            fetchInvoiceBiller();
        }
    }, [billerId, invoiceBillerId]);

    const fetchInvoiceBiller = () => {
        setIsLoading(true);
        axios.get(`/data/invoices/biller`, {
            params: {
                billerActorId: invoiceBillerId,
                payerActorId: billerId
            }
        })
            .then(({data}) => {
                setBiller(data);
                setTagName(data.tagName || "");
                setEmail(data.email || "");
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching invoice biller:", error);
                setErrorMessage("Failed to load biller information");
                setIsLoading(false);
            });
    };

    const handleUpdate = () => {
        setIsSaving(true);
        setSuccessMessage(null);
        setErrorMessage(null);

        const updateData = {
            billerActorId: invoiceBillerId,
            payerActorId: billerId,
            tagName,
            email
        };

        axios.post(`/data/invoices/biller`, updateData)
            .then(({data}) => {
                setSuccessMessage("Successfully updated biller");
                setBiller(data);
                setIsSaving(false);
            })
            .catch(error => {
                setErrorMessage("An error occurred while updating the selected biller. Please try again later.");
                setIsSaving(false);
            });
    };

    if (isLoading) {
        return <Loading/>;
    }

    if (!biller) {
        return <Alert variant="danger">Biller not found</Alert>;
    }

    return (
        <div>
            <PageHeading>Manage Biller</PageHeading>

            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <div className="panel panel-default">
                <div className="panel-body">
                    <TextInput
                        label="Tag Name"
                        value={tagName}
                        onChange={(e) => setTagName(e.target.value)}
                        help="A custom label for this biller"
                    />

                    <TextInput
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        help="Email address for this biller"
                    />

                    <div className="text-right">
                        <Button variant="primary" onClick={handleUpdate} disabled={isSaving}>
                            {isSaving ? "Updating..." : "Update Biller"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default injectIntl(InvoiceBillerManagement);
