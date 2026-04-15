import React, {useEffect, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {Link} from "react-router-dom";
import {Table, Pager, PageHeading} from "../common";
import Loading from "../Loading";
import {getDateAsFormatted} from "../../utils/date-utils";
import {getCurrencyFormatted} from "../../utils/currency-utils";

const InvoicesList = ({billerId, type = "all", intl}) => {
    const [invoices, setInvoices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (billerId) {
            fetchInvoices(currentPage);
        }
    }, [billerId, type, currentPage]);

    const fetchInvoices = (page) => {
        setIsLoading(true);
        axios.get(`/data/invoices`, {
            params: {billerId, type, page}
        })
            .then(({data}) => {
                setInvoices(data.invoices || []);
                setTotalPages(data.meta?.totalPages || 1);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching invoices:", error);
                setIsLoading(false);
            });
    };

    if (isLoading) {
        return <Loading/>;
    }

    const columns = [
        {key: "invoiceNo", label: intl.formatMessage({id: "invoices.invoiceNo"})},
        {key: "billerName", label: intl.formatMessage({id: "invoices.billerName"})},
        {key: "dueDate", label: intl.formatMessage({id: "invoices.dueDate"}), render: (row) => getDateAsFormatted(row.dueDate)},
        {key: "amountDue", label: intl.formatMessage({id: "invoices.amount"}), render: (row) => getCurrencyFormatted(row.amountDue, row.currencyCode)},
        {key: "status", label: intl.formatMessage({id: "invoices.status"})},
        {key: "actions", label: "", render: (row) => (
            <Link to={`/portal/customer/biller/${billerId}/inbox/${row.id}`}>
                {intl.formatMessage({id: "generic.view"})}
            </Link>
        )}
    ];

    return (
        <div>
            <PageHeading>{intl.formatMessage({id: "invoices.title"})}</PageHeading>
            
            <Table
                columns={columns}
                data={invoices}
                emptyMessage={intl.formatMessage({id: "invoices.noInvoices"})}
            />

            {totalPages > 1 && (
                <Pager
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
        </div>
    );
};

export default injectIntl(InvoicesList);
