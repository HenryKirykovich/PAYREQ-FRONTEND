import React from 'react';
import {AccountSelectionView} from "../components/AccountSelection/AccountSelectionView";


export default {
    title: 'Account Selection',
};

const accounts = [
    {"masterId": 3287,
    "features": [
        "registration-export"
    ],
    "isSub": true,
    "availableActions": [
    ],
    "meta": {
        "total": 20
    },
    "channelPartnerSystemId": "epost",
    "customerName": "102085497 Saskatchewan Ltd.",
    "tagName": "102085497 Saskatchewan Ltd.",
    "referMasterBiller": true,
    "masterBiller": {
        "masterId": null,
        "displayFields": [],
        "isSub": false,
        "channelPartnerSystemId": "epost",
        "isQboBiller": false,
        "tagName": "MyPay",
        "customerId": 3399,
        "isMaster": true,
        "updatedBy": "system",
        "accountNumberPrefixLength": 5,
        "status": 1,
        "extBillerId": "payreqmypay",
        "id": 3287,
        "logoPath": null,
        "multiplePayers": true,
        "emailLogoS3": null,
        "tag": "MYPAY",
        "sendNonDigitalToPrinter": false,
        "referralCode": null,
        "mustReadBills": false,
        "creationDate": "2016-08-29T05:22:34.396Z",
        "accountNumberPrefix": null,
        "extBillerName": "MyPay"
    },
    "customerId": 103794,
    "product": "Payreq Delivery",
    "abn": null,
    "extBillerId": "10161",
    "id": 103807,
    "systemId": "filetx",
    "countryId": 2,
    "logoPath": "https://s3-ap-southeast-2.amazonaws.com/testdocs.payreq.com/logos/102085497 Saskatchewan Ltd.png",
    "accountType": "payroll",
    "mailhouseId": null,
    "stateId": 111,
    "tag": "102085497SASKATCHEWANLTD",
    "referralCode": "RC102085497SASKATCHEWANLTDywX6r",
    "mailhouseName": null,
    "extBillerName": "102085497 Saskatchewan Ltd.."
    },
    {
        "masterId": null,
        "features": [
            "registration-export"
        ],
        "isSub": false,
        "availableActions": [],
        "meta": {
            "total": 20
        },
        "channelPartnerSystemId": null,
        "customerName": "Kristie Bergamin",
        "tagName": "Kristie Bergamin",
        "referMasterBiller": false,
        "customerId": 51823,
        "product": "Payreq Inbox",
        "abn": null,
        "extBillerId": null,
        "id": 51629,
        "systemId": "incoming-invoice",
        "countryId": null,
        "logoPath": null,
        "accountType": null,
        "mailhouseId": "payreq",
        "stateId": null,
        "tag": "17848638-9451-4d36-86b2-f7dc359a8411",
        "referralCode": "RC17848638-9451-4d36-86b2-f7dc359a8411e1dY",
        "mailhouseName": null,
        "extBillerName": null
    },
    {
        "masterId": null,
        "features": [
            "registration-export"
        ],
        "isSub": false,
        "availableActions": [],
        "meta": {
            "total": 20
        },
        "channelPartnerSystemId": "bpv",
        "customerName": "AQWest",
        "tagName": "AQWest",
        "referMasterBiller": false,
        "customerId": 5337,
        "product": "Payreq Delivery",
        "abn": null,
        "extBillerId": "22327",
        "id": 5143,
        "systemId": "filetx",
        "countryId": 1,
        "logoPath": "https://s3-ap-southeast-2.amazonaws.com/testdocs.payreq.com/logos/aqwest.jpeg",
        "accountType": "billing",
        "mailhouseId": "bingmail",
        "stateId": null,
        "tag": "AQWEST",
        "referralCode": "RCAQWESTAj1k",
        "mailhouseName": "Bingmail",
        "extBillerName": "AQWest"
    },];

export const payreqAccounts = () => {
    return <React.Fragment>
        <AccountSelectionView accounts={accounts}/>
    </React.Fragment>
}
