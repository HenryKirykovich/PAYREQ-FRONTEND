import React, {useEffect, useState} from "react";
import axios from "axios";
import ContactsView from "./ContactsView";
import {useAppState} from "../../state";

const PAGE_SIZE = 50;

const Contacts = ({billerId, match}) => {
    const [{biller}] = useAppState();
    const [contacts, setContacts] = useState([]);
    const [total, setTotal] = useState(0);
    const [searchParams, setSearchParams] = useState({
        pageNumber: 1,
        sortOrder: "last_updated",
        sortDirection: "desc",
        searchTerm: "",
        exactSearch: false,
        exactSearchNoticeGroup: false
    });
    const [isLoading, setIsLoading] = useState(true);
    const [visibleColumns, setVisibleColumns] = useState([
        'billerAccountNumber', 
        'name', 
        'contactId2', 
        'lastUpdated'
    ]);

    const fetchContacts = (params, setSubmitting, pageNumber = 1) => {
        setIsLoading(true);
        if (setSubmitting) setSubmitting(true);

        const queryParams = {
            billerId: billerId,
            pageSize: PAGE_SIZE,
            pageNumber: pageNumber,
            sortOrder: params.sortOrder || "last_updated",
            sortDirection: params.sortDirection || "desc",
            ...params
        };

        // Clean up empty params
        Object.keys(queryParams).forEach(key => {
            if (queryParams[key] === "" || queryParams[key] === null || queryParams[key] === undefined) {
                delete queryParams[key];
            }
        });

        axios.get("/data/contacts", { params: queryParams })
            .then(({data}) => {
                setContacts(data.contacts || []);
                setTotal(data.meta?.total || 0);
                setSearchParams({...params, pageNumber});
                setIsLoading(false);
                if (setSubmitting) setSubmitting(false);
            })
            .catch(error => {
                console.error("Error fetching contacts:", error);
                setIsLoading(false);
                if (setSubmitting) setSubmitting(false);
            });
    };

    useEffect(() => {
        if (billerId) {
            fetchContacts(searchParams, null, 1);
            
            // Fetch auth fields to determine visible columns
            axios.get(`/data/contacts/${billerId}/getAuthFields`)
                .then(({data}) => {
                    const columns = ['billerAccountNumber', 'name'];
                    if (data.contactField1Name) columns.push('contactId1');
                    if (data.contactField2Name) columns.push('contactId2');
                    if (data.contactField3Name) columns.push('contactId3');
                    if (data.contactField4Name) columns.push('contactId4');
                    if (data.contactField5Name) columns.push('contactId5');
                    if (data.contactField6Name) columns.push('contactId6');
                    if (data.contactField7Name) columns.push('contactId7');
                    if (data.contactField8Name) columns.push('contactId8');
                    columns.push('lastUpdated');
                    setVisibleColumns(columns);
                })
                .catch(error => {
                    console.error("Error fetching auth fields:", error);
                });
        }
    }, [billerId]);

    const handleSearch = (values, setSubmitting, pageNumber) => {
        fetchContacts(values, setSubmitting, pageNumber);
    };

    const handleImportClick = () => {
        // TODO: Implement import modal
        alert("Import functionality to be implemented");
    };

    const handleDeleteContact = (contact) => {
        if (window.confirm(`Are you sure you want to delete contact ${contact.billerAccountNumber}?`)) {
            axios.delete(`/data/contacts/${contact.id}`)
                .then(() => {
                    // Refresh the list
                    fetchContacts(searchParams, null, searchParams.pageNumber);
                })
                .catch(error => {
                    console.error("Error deleting contact:", error);
                    alert("Error deleting contact. Please try again.");
                });
        }
    };

    const showing = [
        (searchParams.pageNumber - 1) * PAGE_SIZE + 1,
        Math.min(searchParams.pageNumber * PAGE_SIZE, total)
    ];

    if (isLoading && contacts.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <ContactsView
            contacts={contacts}
            total={total}
            showing={showing}
            handleSearch={handleSearch}
            searchParams={searchParams}
            biller={biller}
            canImportContacts={biller?.permissions?.canImportContacts}
            canDeleteContact={biller?.permissions?.canDeleteContact}
            onImportClick={handleImportClick}
            onDeleteContact={handleDeleteContact}
            visibleColumns={visibleColumns}
            hasContactField3={visibleColumns.includes('contactId3')}
        />
    );
};

export default Contacts;
