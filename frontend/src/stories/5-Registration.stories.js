import React from 'react';
import CreateEmailRegistrationView from "../components/registrations/email/CreateEmailRegistrationView";
import RegistrationsCreated from "../components/registrations/email/RegistrationCreated";
import ChannelSelectionView from "../components/registrations/ChannelSelection/ChannelSelectionView";
import BillerSelectionView from "../components/registrations/BillerSelection/BillerSelectionView";
import BillersView from "../components/registrations/Billers/BillersView";
import BillerRegistrationsView from "../components/registrations/BillerRegistrations/BillerRegistrationsView";
import RegistrationView from "../components/registrations/Registration/RegistrationView";
import MyBillsAgentRegistrationCreated from "../components/registrations/mybillsagent/MyBillsAgentRegistrationCreated";
import CreateXeroRegistrationView from "../components/registrations/xero/CreateXeroRegistrationView";

export default {
    title: 'Registrations',
};

export const billers = () => <BillersView billers={
    [
        {
            "tagName": "City of Stonnington",
            "active": 12,
            "pending": 9,
            "logoPath": "https://s3-ap-southeast-2.amazonaws.com/testdocs.payreq.com/logos/city_of_stonnington.jpg",
        },
        {
            "tagName": "Hornsby Shire Council",
            "active": 100,
            "logoPath": "https://s3-ap-southeast-2.amazonaws.com/testdocs.payreq.com/logos/hornsby-shire-council.jpeg",
        },
        {
            "tagName": "Canterbury Bankstown Council",
            "active": 2345,
            "logoPath": "https://s3-ap-southeast-2.amazonaws.com/testdocs.payreq.com/logos/camden_council_logo.jpg",
        },
        {
            "tagName": "Moree Plains Council - Sundry Debtors",
            "active": 6789,
            "logoPath": "https://s3-ap-southeast-2.amazonaws.com/testdocs.payreq.com/logos/moree_plains_shire_council_logo.jpg",
        },
        {
            "tagName": "Murrindindi Shire Council Animals",
            "active": 24,
            "logoPath": "https://s3-ap-southeast-2.amazonaws.com/testdocs.payreq.com/logos/murrindindi_shire_council_logo.jpg",
        }
    ]}/>;

export const billersNoneActive = () => <BillersView billers={[]}/>;

const registrationsSampleResponse = [
    {
        "billerActorId": 1,
        "channelPartnerSystemId": "email",
        "authItem1": "Roger Federer",
        "createdDate": "2020-09-23T00:23:04Z",
        "activatedDate": null,
        "deactivatedDate": null,
        "accountNumber": "12341234",
        "status": 0
    },
    {
        "billerActorId": 1,
        "channelPartnerSystemId": "email",
        "authItem1": "E Really Long-Last-Name-That-Goes-And-Goes-And-Goes",
        "createdDate": "2020-09-22T05:42:38Z",
        "activatedDate": null,
        "deactivatedDate": null,
        "accountNumber": "43214321",
        "status": 1
    },
    {
        "billerActorId": 1,
        "channelPartnerSystemId": "mybillsagent",
        "authItem1": "A Sanchez",
        "createdDate": "2020-09-22T05:42:38Z",
        "activatedDate": null,
        "deactivatedDate": null,
        "accountNumber": "09870987",
        "status": 1
    },
    {
        "billerActorId": 1,
        "channelPartnerSystemId": "xeroconnect",
        "authItem1": "E Smith",
        "createdDate": "2020-09-18T04:03:29Z",
        "activatedDate": null,
        "deactivatedDate": null,
        "accountNumber": "20200733",
        "status": 1
    },
    {
        "billerActorId": 1,
        "channelPartnerSystemId": "myob",
        "authItem1": "Emile Raffoul",
        "createdDate": "2020-09-18T04:01:14Z",
        "activatedDate": null,
        "deactivatedDate": null,
        "accountNumber": "20200718",
        "status": 1
    },
    {
        "billerActorId": 1,
        "channelPartnerSystemId": "reckon",
        "authItem1": "o'blah",
        "createdDate": "2020-09-02T16:35:02Z",
        "activatedDate": null,
        "deactivatedDate": null,
        "accountNumber": "12341233",
        "status": 1
    },
    {
        "billerActorId": 1,
        "channelPartnerSystemId": "xeroconnect",
        "authItem1": "T O'fail",
        "createdDate": "2020-07-31T12:27:35Z",
        "activatedDate": null,
        "deactivatedDate": "2020-07-31T12:27:35Z",
        "accountNumber": "20200732",
        "status": 2
    },
    {
        "billerActorId": 1,
        "channelPartnerSystemId": "mybillsagent",
        "authItem1": "Alexis Sanchez",
        "createdDate": "2020-07-02T20:57:07Z",
        "activatedDate": null,
        "deactivatedDate": null,
        "accountNumber": "20200407",
        "status": 3
    },
    {
        "billerActorId": 1,
        "channelPartnerSystemId": "email",
        "authItem1": "regex2",
        "createdDate": "2020-05-22T13:49:39Z",
        "activatedDate": null,
        "deactivatedDate": null,
        "accountNumber": "12341234",
        "status": 3
    },
    {
        "billerActorId": 1,
        "channelPartnerSystemId": "email",
        "authItem1": "Emile Raffoul",
        "createdDate": "2020-08-25T15:15:34Z",
        "activatedDate": "2020-08-25T15:49:55Z",
        "deactivatedDate": null,
        "accountNumber": "20200826",
        "status": 3
    }];

export const billerRegistrations = () => <BillerRegistrationsView registrations={registrationsSampleResponse}
                                                                  handleSearch={(values, _, pageNumber) => alert(`Searching page ${pageNumber}` + JSON.stringify(values))}
                                                                  biller={{
                                                                      "tagName": "City of Stonnington",
                                                                      "logoPath": "https://s3-ap-southeast-2.amazonaws.com/testdocs.payreq.com/logos/demo_logo.jpg",
                                                                      "id": 1
                                                                  }}
                                                                  showing={[1, 10]}
                                                                  total={31}
                                                                  pageNumber={"1"}
/>;

export const billerRegistrationsNoResults = () => <BillerRegistrationsView registrations={[]}
                                                                           handleSearch={() => {}}
                                                                           biller={{
                                                                               "tagName": "City of Stonnington",
                                                                               "logoPath": "https://s3-ap-southeast-2.amazonaws.com/testdocs.payreq.com/logos/demo_logo.jpg",
                                                                               "id": 1
                                                                           }}
                                                                           showing={[0, 0]}
                                                                           total={0}
                                                                           pageNumber={"1"}/>;

const sampleBillersApiResp = [
    {
        "tagName": "City of Stonnington Water",
        "extBillerId": "11111",
        "id": 68,
        "logoPath": "https://s3-ap-southeast-2.amazonaws.com/testdocs.payreq.com/logos/city_of_stonnington.jpg",
    },
    {
        "tagName": "Canterbury-Bankstown Council",
        "extBillerId": "22222",
        "id": 68,
        "logoPath": "https://s3-ap-southeast-2.amazonaws.com/testdocs.payreq.com/logos/camden_council_logo.jpg",
    },
    {
        "tagName": "Hornsby Shire Council",
        "extBillerId": "33333",
        "id": 68,
        "logoPath": "https://s3-ap-southeast-2.amazonaws.com/testdocs.payreq.com/logos/hornsby_shire_council_logo.jpg",
    },
    {
        "tagName": "Moree Plains Council - Sundry Debtors",
        "extBillerId": "46566790582",
        "id": 68,
        "logoPath": "https://s3-ap-southeast-2.amazonaws.com/testdocs.payreq.com/logos/moree_plains_shire_council_logo.jpg",
    },
    {
        "tagName": "Murrindindi Shire Council Animals",
        "extBillerId": "585125",
        "id": 68,
        "logoPath": "https://s3-ap-southeast-2.amazonaws.com/testdocs.payreq.com/logos/murrindindi_shire_council_logo.jpg",
    }
];

export const billerSelection = () => <BillerSelectionView isSearching={false} billers={sampleBillersApiResp}/>;

export const billerSelectionSearching = () => <BillerSelectionView isSearching={true} billers={sampleBillersApiResp}/>;

export const billerSelectionNoResults = () => <BillerSelectionView isSearching={false} billers={[]}/>;

const channelsAPIResp = [
    {"channelPartnerSystemId": "email"},
    {"channelPartnerSystemId": "mybills"},
    {"channelPartnerSystemId": "mybills-bills"},
    {"channelPartnerSystemId": "mybillsagent"},
    {"channelPartnerSystemId": "myob"},
    {"channelPartnerSystemId": "xeroconnect"},
    {"channelPartnerSystemId": "reckon"},
    {"channelPartnerSystemId": "bpv"}
];

export const channelSelection = () => <ChannelSelectionView
    channels={channelsAPIResp}
    logoPath="https://s3-ap-southeast-2.amazonaws.com/testdocs.payreq.com/logos/demo_logo.jpg"/>;

const sampleEmailRegoChannel = {
    logoPath: "https://s3-ap-southeast-2.amazonaws.com/testdocs.payreq.com/logos/demo_logo.jpg",
    channel: {
        "checkPayerCred": true,
        "useAuthItem3": false,
        "useAuthItem1": true,
        "authItem2Help": "",
        "authItem1Field": "Your name as on your bill",
        "authItem4Help": "",
        "channelPartnerSystemId": "email",
        "generateCrnMethod": null,
        "authItem3Help": "",
        "regBillerAccountNumberIsNumber": false,
        "generateIcrn": null,
        "registrationContactIdValidationMsg": "Must be an 8 digit number",
        "useAuthItem4": false,
        "authItem4Field": null,
        "emailBillDeliveryValue": null,
        "authItem1Help": "",
        "registrationContactIdField": "BVRN",
        "registrationContactIdFormat": "^[0-9]{8}$",
        "authItem2Field": "Mobile",
        "isEmail": true,
        "extBillerId": "12345678",
        "registrationContactIdHelp": "8 digit number",
        "authItem3Field": null,
        "billerAccountNumberLength": null,
        "agentNoticeIdContactIdField": "",
        "useAuthItem2": false,
        "emailMarkEachAsFailed": false,
        "maxNoDetails": 5,
        "extBillerName": "Payreq Delivery Demo",
        "billerId": 1
    }
};

export const EmailRegoForm = () => <CreateEmailRegistrationView channel={sampleEmailRegoChannel.channel}
                                                                logoPath={sampleEmailRegoChannel.logoPath}
                                                                user={{email: "someone@somewhere.com"}}
                                                                payerId={1} billerId={2}/>;

export const EmailRegoFormServerErrors = () => (
    <CreateEmailRegistrationView channel={sampleEmailRegoChannel.channel} payerId={1} billerId={2}
                                 user={{emails: [""]}}
                                 logoPath={sampleEmailRegoChannel.logoPath}
                                 serverErrors={[
                                     {name: "invalid-submission"},
                                     {name: "unknown-error"},
                                     {
                                         name: "at-least-one-email",
                                         field: "email"
                                     },
                                     {
                                         name: "pending",
                                         field: "accountNumber"
                                     },
                                     {
                                         name: "maxemails",
                                         values: {account: "11223344"},
                                         field: "email"
                                     },
                                     {
                                         name: "invalid-email", values: {emails: "aaa, bbb"},
                                         field: "email"
                                     },
                                     {
                                         name: "duplicate-email", values: {emails: "someone@duplicate.com"},
                                         field: "email"
                                     },
                                     {
                                         name: "registration-exists",
                                         field: "accountNumber"
                                     }
                                 ]}
    />
);

export const EmailRegoCreatedForUser = () => <RegistrationsCreated emailsToVerify={[]}/>;
export const EmailRegoCreatedForUserWithGateway = () => <RegistrationsCreated emailsToVerify={[]} hasPaymentGateway/>;
export const EmailRegoCreatedRequiringVerification = () => (
    <RegistrationsCreated emailsToVerify={["first@email.com", "second@email.com"]}/>
);

const emailRegistrationPendingAPIResponse = {"registration":{"deactivatedReason":null,"xeroaccounts":[],"supplier":{"terms":null},"useAuthItem3":false,"useAuthItem1":true,"reckontaxcodes":null,"billerActorId":1,"authItem1Field":"Your name as on your bill","accountNumber":"20200826","channelPartnerSystemId":"email","authItem2":null,"myobaccounts":null,"tagName":"Payreq Delivery Demo","useAuthItem4":false,"authItem3":null,"authItem4Field":null,"registrationContactIdField":"BVRN","authItem4":null,"authItem2Field":"Mobile","details":[{"registrationValue":"emile.raffoul@payreq.com","deactivatedTime":null,"payerRegistrationId":484,"lastUpdatedTime":"2020-09-30T05:55:29Z","verificationCode":null,"isValid":true,"createdTime":"2020-09-30T05:55:29Z","updatedBy":"emile.raffoul@payreq.com","status":0,"id":143,"activatedTime":"2020-09-30T05:55:29Z"},{"registrationValue":"emile.raffoul+2@payreq.com","deactivatedTime":null,"payerRegistrationId":484,"lastUpdatedTime":"2020-10-01T00:39:32Z","verificationCode":"0e97405f-1ce4-4c57-9c6c-692ecfe4083d:1601512772919","isValid":false,"createdTime":"2020-10-01T00:39:32Z","updatedBy":"emile.raffoul@payreq.com","status":1,"id":145,"activatedTime":null}],"isEmail":true,"status":"pending","reckonaccounts":null,"id":454,"activatedDate":"2020-08-25T15:49:55.938Z","reckonvendors":null,"payerId":24,"authItem3Field":null,"createdDate":"2020-08-25T15:15:34.527Z","useAuthItem2":false,"maxNoDetails":5,"deactivatedDate":"2020-09-30T05:43:49.113Z","authItem1":"Emile Raffoul"},"lastBill":null}

export const registrationPendingView = () => (
    <RegistrationView registration={emailRegistrationPendingAPIResponse.registration}
                      lastBill={emailRegistrationPendingAPIResponse.lastBill}
    />
);

const emailRegistrationActiveAPIResponse = {"registration":{"deactivatedReason":null,"xeroaccounts":[],"supplier":{"terms":null},"useAuthItem3":false,"useAuthItem1":true,"reckontaxcodes":null,"billerActorId":1,"authItem1Field":"Your name as on your bill","accountNumber":"20200826","channelPartnerSystemId":"email","authItem2":null,"myobaccounts":null,"tagName":"Payreq Delivery Demo","useAuthItem4":false,"authItem3":null,"authItem4Field":null,"registrationContactIdField":"BVRN","authItem4":null,"authItem2Field":"Mobile","details":[{"registrationValue":"emile.raffoul@payreq.com","deactivatedTime":null,"payerRegistrationId":484,"lastUpdatedTime":"2020-09-30T05:55:29Z","verificationCode":null,"isValid":true,"createdTime":"2020-09-30T05:55:29Z","updatedBy":"emile.raffoul@payreq.com","status":0,"id":143,"activatedTime":"2020-09-30T05:55:29Z"},{"registrationValue":"emile.raffoul+2@payreq.com","deactivatedTime":null,"payerRegistrationId":484,"lastUpdatedTime":"2020-10-01T00:39:32Z","verificationCode":"0e97405f-1ce4-4c57-9c6c-692ecfe4083d:1601512772919","isValid":false,"createdTime":"2020-10-01T00:39:32Z","updatedBy":"emile.raffoul@payreq.com","status":1,"id":145,"activatedTime":null}],"isEmail":true,"status":"active","reckonaccounts":null,"id":454,"activatedDate":"2020-08-25T15:49:55.938Z","reckonvendors":null,"payerId":24,"authItem3Field":null,"createdDate":"2020-08-25T15:15:34.527Z","useAuthItem2":false,"maxNoDetails":5,"deactivatedDate":"2020-09-30T05:43:49.113Z","authItem1":"Emile Raffoul"},"lastBill":{documentType: "invoice", documentHref: "http://localhost:3000/bill-detail?bill-id=20200826-2-744c43a9-cc88-482b-805e-313094332337.pdf", "dueDate2":"2020-08-28T00:00:00Z","billRef6":null,"description":"Payreq Delivery Demo Invoice Due 2020-08-28","archived":false,"forwardingField1":null,"prevAccountBalance":null,"amountDue":200.00,"accountBalance":null,"receivedTime":"2020-09-11T00:14:10Z","latePaymentDate":null,"billerActorId":1,"billerActorId2":1,"submittedChannel":3,"amountDue2":200.00,"sentTime":"2020-09-11T00:14:10Z","billerInvoiceNumber":"20200826-2","gstPercentage":0.00,"endTime":null,"status2":3,"invoicesForwardingRuleId":null,"id2":307,"actionedOn":null,"actorSystemBillId":8,"billRef2":null,"downloadStatus":true,"minAmountDue":30.00,"forwardingStatus":null,"sendToPrinter":false,"billRef1":"20200826","invoiceNo":"20200826-2","detailedInvoice":null,"currency":null,"billId":307,"documentId":"20200826-2-744c43a9-cc88-482b-805e-313094332337.pdf","replacedBillId":306,"billRef4":null,"createdTime":"2020-02-10T00:00:00Z","documentFileName":"20200826-2","receivedBy":1,"updatedBy":"emile.raffoul@payreq.com","status":1,"contentsType":0,"id":167,"actionDescription":null,"dueDate":"2020-08-28T00:00:00Z","reminderSentDatetime":null,"billerCustomerNumber":"20200826","mailhouseFileId":null,"latePaymentAmount":null,"actioned":false,"documentLocationId":1,"documentSize":238428,"currencyCode":"aud","securepayBillId":null,"securepayAuthToken":null,"numberOfPayers":1,"jobId":648,"noPaymentOverride":false,"billRef5":null,"documentId2":"20200826-2-744c43a9-cc88-482b-805e-313094332337.pdf","extRefNumber":"20200826","documentPages":1,"payerActorId":24,"billRef3":"Emile Raffoul","receivedTime2":"2020-09-11T00:13:47Z","updatedBy2":"emile.raffoul@payreq.com"}, "autoPayment": {"updatedDate":"2020-09-22T10:12:10.459Z","expireMonth":12,"billerActorId":1,"accountNumber":"10000057","paymentDay":"received-date","updatedDate2":"2020-09-09T06:42:02.852Z","status2":"active","id2":18,"cardHolderName":"Emile local master","vaultToken":"510336ff-1fe4-4a27-8d98-ca052e462529","installment":"min","cardId":18,"updatedBy":"emile.raffoul@payreq.com","status":"active","id":39,"debitLimit":null,"scheme":"mastercard","userId":1,"expireYear":2022,"last4Digits":"2346","createdDate":"2020-09-22T10:12:10.460Z","billerName":"Payreq Delivery Demo","payerActorId":24,"updatedBy2":"emile.raffoul@payreq.com"}}

export const registrationActiveView = () => (
    <RegistrationView registration={emailRegistrationActiveAPIResponse.registration}
                      lastBill={emailRegistrationActiveAPIResponse.lastBill}
                      autoPayment={emailRegistrationActiveAPIResponse.autoPayment}
    />
);

const emailRegistrationActiveLetterAPIResponse = {"registration":{"deactivatedReason":null,"xeroaccounts":[],"supplier":{"terms":null},"useAuthItem3":false,"useAuthItem1":true,"reckontaxcodes":null,"billerActorId":1,"authItem1Field":"Your name as on your bill","accountNumber":"20200826","channelPartnerSystemId":"email","authItem2":null,"myobaccounts":null,"tagName":"Payreq Delivery Demo","useAuthItem4":false,"authItem3":null,"authItem4Field":null,"registrationContactIdField":"BVRN","authItem4":null,"authItem2Field":"Mobile","details":[{"registrationValue":"emile.raffoul@payreq.com","deactivatedTime":null,"payerRegistrationId":484,"lastUpdatedTime":"2020-09-30T05:55:29Z","verificationCode":null,"isValid":true,"createdTime":"2020-09-30T05:55:29Z","updatedBy":"emile.raffoul@payreq.com","status":0,"id":143,"activatedTime":"2020-09-30T05:55:29Z"},{"registrationValue":"emile.raffoul+2@payreq.com","deactivatedTime":null,"payerRegistrationId":484,"lastUpdatedTime":"2020-10-01T00:39:32Z","verificationCode":"0e97405f-1ce4-4c57-9c6c-692ecfe4083d:1601512772919","isValid":false,"createdTime":"2020-10-01T00:39:32Z","updatedBy":"emile.raffoul@payreq.com","status":1,"id":145,"activatedTime":null}],"isEmail":true,"status":"active","reckonaccounts":null,"id":454,"activatedDate":"2020-08-25T15:49:55.938Z","reckonvendors":null,"payerId":24,"authItem3Field":null,"createdDate":"2020-08-25T15:15:34.527Z","useAuthItem2":false,"maxNoDetails":5,"deactivatedDate":"2020-09-30T05:43:49.113Z","authItem1":"Emile Raffoul"},"lastBill":{documentType: "letter", documentHref: "http://localhost:3000/bill-detail?bill-id=20200826-2-744c43a9-cc88-482b-805e-313094332337.pdf", "dueDate2":"2020-08-28T00:00:00Z","billRef6":null,"description":"Payreq Delivery Demo Invoice Due 2020-08-28","archived":false,"forwardingField1":null,"prevAccountBalance":null,"amountDue":200.00,"accountBalance":null,"receivedTime":"2020-09-11T00:14:10Z","latePaymentDate":null,"billerActorId":1,"billerActorId2":1,"submittedChannel":3,"amountDue2":200.00,"sentTime":"2020-09-11T00:14:10Z","billerInvoiceNumber":"20200826-2","gstPercentage":0.00,"endTime":null,"status2":3,"invoicesForwardingRuleId":null,"id2":307,"actionedOn":null,"actorSystemBillId":8,"billRef2":null,"downloadStatus":true,"minAmountDue":30.00,"forwardingStatus":null,"sendToPrinter":false,"billRef1":"20200826","invoiceNo":"20200826-2","detailedInvoice":null,"currency":null,"billId":307,"documentId":"20200826-2-744c43a9-cc88-482b-805e-313094332337.pdf","replacedBillId":306,"billRef4":null,"createdTime":"2020-02-10T00:00:00Z","documentFileName":"20200826-2","receivedBy":1,"updatedBy":"emile.raffoul@payreq.com","status":1,"contentsType":0,"id":167,"actionDescription":null,"dueDate":"2020-08-28T00:00:00Z","reminderSentDatetime":null,"billerCustomerNumber":"20200826","mailhouseFileId":null,"latePaymentAmount":null,"actioned":false,"documentLocationId":1,"documentSize":238428,"currencyCode":"aud","securepayBillId":null,"securepayAuthToken":null,"numberOfPayers":1,"jobId":648,"noPaymentOverride":false,"billRef5":null,"documentId2":"20200826-2-744c43a9-cc88-482b-805e-313094332337.pdf","extRefNumber":"20200826","documentPages":1,"payerActorId":24,"billRef3":"Emile Raffoul","receivedTime2":"2020-09-11T00:13:47Z","updatedBy2":"emile.raffoul@payreq.com"}, "autoPayment": {"updatedDate":"2020-09-22T10:12:10.459Z","expireMonth":12,"billerActorId":1,"accountNumber":"10000057","paymentDay":"received-date","updatedDate2":"2020-09-09T06:42:02.852Z","status2":"active","id2":18,"cardHolderName":"Emile local master","vaultToken":"510336ff-1fe4-4a27-8d98-ca052e462529","installment":"min","cardId":18,"updatedBy":"emile.raffoul@payreq.com","status":"active","id":39,"debitLimit":null,"scheme":"mastercard","userId":1,"expireYear":2022,"last4Digits":"2346","createdDate":"2020-09-22T10:12:10.460Z","billerName":"Payreq Delivery Demo","payerActorId":24,"updatedBy2":"emile.raffoul@payreq.com"}}

export const registrationActiveLetterView = () => (
    <RegistrationView registration={emailRegistrationActiveLetterAPIResponse.registration}
                      lastBill={emailRegistrationActiveLetterAPIResponse.lastBill}
                      autoPayment={emailRegistrationActiveLetterAPIResponse.autoPayment}
    />
);

const emailRegistrationActiveNoBillAPIResponse = {"registration":{"deactivatedReason":null,"xeroaccounts":[],"supplier":{"terms":null},"useAuthItem3":false,"useAuthItem1":true,"reckontaxcodes":null,"billerActorId":1,"authItem1Field":"Your name as on your bill","accountNumber":"20200826","channelPartnerSystemId":"email","authItem2":null,"myobaccounts":null,"tagName":"Payreq Delivery Demo","useAuthItem4":false,"authItem3":null,"authItem4Field":null,"registrationContactIdField":"BVRN","authItem4":null,"authItem2Field":"Mobile","details":[{"registrationValue":"emile.raffoul@payreq.com","deactivatedTime":null,"payerRegistrationId":484,"lastUpdatedTime":"2020-09-30T05:55:29Z","verificationCode":null,"isValid":true,"createdTime":"2020-09-30T05:55:29Z","updatedBy":"emile.raffoul@payreq.com","status":0,"id":143,"activatedTime":"2020-09-30T05:55:29Z"},{"registrationValue":"emile.raffoul+2@payreq.com","deactivatedTime":null,"payerRegistrationId":484,"lastUpdatedTime":"2020-10-01T00:39:32Z","verificationCode":"0e97405f-1ce4-4c57-9c6c-692ecfe4083d:1601512772919","isValid":false,"createdTime":"2020-10-01T00:39:32Z","updatedBy":"emile.raffoul@payreq.com","status":1,"id":145,"activatedTime":null}],"isEmail":true,"status":"active","reckonaccounts":null,"id":454,"activatedDate":"2020-08-25T15:49:55.938Z","reckonvendors":null,"payerId":24,"authItem3Field":null,"createdDate":"2020-08-25T15:15:34.527Z","useAuthItem2":false,"maxNoDetails":5,"deactivatedDate":"2020-09-30T05:43:49.113Z","authItem1":"Emile Raffoul"},"lastBill": null, "autoPayment": {"updatedDate":"2020-09-22T10:12:10.459Z","expireMonth":12,"billerActorId":1,"accountNumber":"10000057","paymentDay":"received-date","updatedDate2":"2020-09-09T06:42:02.852Z","status2":"active","id2":18,"cardHolderName":"Emile local master","vaultToken":"510336ff-1fe4-4a27-8d98-ca052e462529","installment":"min","cardId":18,"updatedBy":"emile.raffoul@payreq.com","status":"active","id":39,"debitLimit":null,"scheme":"mastercard","userId":1,"expireYear":2022,"last4Digits":"2346","createdDate":"2020-09-22T10:12:10.460Z","billerName":"Payreq Delivery Demo","payerActorId":24,"updatedBy2":"emile.raffoul@payreq.com"}}

export const registrationActiveNoBillView = () => (
    <RegistrationView registration={emailRegistrationActiveNoBillAPIResponse.registration}
                      lastBill={emailRegistrationActiveNoBillAPIResponse.lastBill}
                      autoPayment={emailRegistrationActiveNoBillAPIResponse.autoPayment}
    />
);

const emailRegistrationDeregisteredAPIResponse = {"registration":{"deactivatedReason":"deactivation-customer-paper-bills-recommence","xeroaccounts":[],"supplier":{"terms":null},"useAuthItem3":false,"useAuthItem1":true,"reckontaxcodes":null,"billerActorId":1,"authItem1Field":"Your name as on your bill","accountNumber":"20200826","channelPartnerSystemId":"email","authItem2":null,"myobaccounts":null,"tagName":"Payreq Delivery Demo","useAuthItem4":false,"authItem3":null,"authItem4Field":null,"registrationContactIdField":"BVRN","authItem4":null,"authItem2Field":"Mobile","details":[{"registrationValue":"emile.raffoul@payreq.com","deactivatedTime":null,"payerRegistrationId":484,"lastUpdatedTime":"2020-09-30T05:55:29Z","verificationCode":null,"isValid":true,"createdTime":"2020-09-30T05:55:29Z","updatedBy":"emile.raffoul@payreq.com","status":0,"id":143,"activatedTime":"2020-09-30T05:55:29Z"},{"registrationValue":"emile.raffoul+2@payreq.com","deactivatedTime":null,"payerRegistrationId":484,"lastUpdatedTime":"2020-10-01T00:39:32Z","verificationCode":"0e97405f-1ce4-4c57-9c6c-692ecfe4083d:1601512772919","isValid":false,"createdTime":"2020-10-01T00:39:32Z","updatedBy":"emile.raffoul@payreq.com","status":1,"id":145,"activatedTime":null}],"isEmail":true,"status":"deregistered","reckonaccounts":null,"id":454,"activatedDate":"2020-08-25T15:49:55.938Z","reckonvendors":null,"payerId":24,"authItem3Field":null,"createdDate":"2020-08-25T15:15:34.527Z","useAuthItem2":false,"maxNoDetails":5,"deactivatedDate":"2020-09-30T05:43:49.113Z","authItem1":"Emile Raffoul"},"lastBill":{documentHref: "http://localhost:3000/bill-detail?bill-id=20200826-2-744c43a9-cc88-482b-805e-313094332337.pdf", "dueDate2":"2020-08-28T00:00:00Z","billRef6":null,"description":"Payreq Delivery Demo Invoice Due 2020-08-28","archived":false,"forwardingField1":null,"prevAccountBalance":null,"amountDue":200.00,"accountBalance":null,"receivedTime":"2020-09-11T00:14:10Z","latePaymentDate":null,"billerActorId":1,"billerActorId2":1,"submittedChannel":3,"amountDue2":200.00,"sentTime":"2020-09-11T00:14:10Z","billerInvoiceNumber":"20200826-2","gstPercentage":0.00,"endTime":null,"status2":3,"invoicesForwardingRuleId":null,"id2":307,"actionedOn":null,"actorSystemBillId":8,"billRef2":null,"downloadStatus":true,"minAmountDue":30.00,"forwardingStatus":null,"sendToPrinter":false,"billRef1":"20200826","invoiceNo":"20200826-2","detailedInvoice":null,"currency":null,"billId":307,"documentId":"20200826-2-744c43a9-cc88-482b-805e-313094332337.pdf","replacedBillId":306,"billRef4":null,"createdTime":"2020-02-10T00:00:00Z","documentFileName":"20200826-2","receivedBy":1,"updatedBy":"emile.raffoul@payreq.com","status":1,"contentsType":0,"id":167,"actionDescription":null,"dueDate":"2020-08-28T00:00:00Z","reminderSentDatetime":null,"billerCustomerNumber":"20200826","mailhouseFileId":null,"latePaymentAmount":null,"actioned":false,"documentLocationId":1,"documentSize":238428,"currencyCode":"aud","securepayBillId":null,"securepayAuthToken":null,"numberOfPayers":1,"jobId":648,"noPaymentOverride":false,"billRef5":null,"documentId2":"20200826-2-744c43a9-cc88-482b-805e-313094332337.pdf","extRefNumber":"20200826","documentPages":1,"payerActorId":24,"billRef3":"Emile Raffoul","receivedTime2":"2020-09-11T00:13:47Z","updatedBy2":"emile.raffoul@payreq.com"}}

export const registrationDeregisteredView = () => (
    <RegistrationView registration={emailRegistrationDeregisteredAPIResponse.registration}
                      lastBill={emailRegistrationDeregisteredAPIResponse.lastBill}
    />
);

const emailRegistrationFailedAPIResponse = {"registration":{"deactivatedReason":"deactivation-customer-paper-bills-recommence","xeroaccounts":[],"supplier":{"terms":null},"useAuthItem3":false,"useAuthItem1":true,"reckontaxcodes":null,"billerActorId":1,"authItem1Field":"Your name as on your bill","accountNumber":"20200826","channelPartnerSystemId":"email","authItem2":null,"myobaccounts":null,"tagName":"Payreq Delivery Demo","useAuthItem4":false,"authItem3":null,"authItem4Field":null,"registrationContactIdField":"BVRN","authItem4":null,"authItem2Field":"Mobile","details":[{"registrationValue":"emile.raffoul@payreq.com","deactivatedTime":null,"payerRegistrationId":484,"lastUpdatedTime":"2020-09-30T05:55:29Z","verificationCode":null,"isValid":true,"createdTime":"2020-09-30T05:55:29Z","updatedBy":"emile.raffoul@payreq.com","status":0,"id":143,"activatedTime":"2020-09-30T05:55:29Z"},{"registrationValue":"emile.raffoul+2@payreq.com","deactivatedTime":null,"payerRegistrationId":484,"lastUpdatedTime":"2020-10-01T00:39:32Z","verificationCode":"0e97405f-1ce4-4c57-9c6c-692ecfe4083d:1601512772919","isValid":false,"createdTime":"2020-10-01T00:39:32Z","updatedBy":"emile.raffoul@payreq.com","status":1,"id":145,"activatedTime":null}],"isEmail":true,"status":"failed","reckonaccounts":null,"id":454,"activatedDate":"2020-08-25T15:49:55.938Z","reckonvendors":null,"payerId":24,"authItem3Field":null,"createdDate":"2020-08-25T15:15:34.527Z","useAuthItem2":false,"maxNoDetails":5,"deactivatedDate":"2020-09-30T05:43:49.113Z","authItem1":"Emile Raffoul"},"lastBill":{documentHref: "http://localhost:3000/bill-detail?bill-id=20200826-2-744c43a9-cc88-482b-805e-313094332337.pdf", "dueDate2":"2020-08-28T00:00:00Z","billRef6":null,"description":"Payreq Delivery Demo Invoice Due 2020-08-28","archived":false,"forwardingField1":null,"prevAccountBalance":null,"amountDue":200.00,"accountBalance":null,"receivedTime":"2020-09-11T00:14:10Z","latePaymentDate":null,"billerActorId":1,"billerActorId2":1,"submittedChannel":3,"amountDue2":200.00,"sentTime":"2020-09-11T00:14:10Z","billerInvoiceNumber":"20200826-2","gstPercentage":0.00,"endTime":null,"status2":3,"invoicesForwardingRuleId":null,"id2":307,"actionedOn":null,"actorSystemBillId":8,"billRef2":null,"downloadStatus":true,"minAmountDue":30.00,"forwardingStatus":null,"sendToPrinter":false,"billRef1":"20200826","invoiceNo":"20200826-2","detailedInvoice":null,"currency":null,"billId":307,"documentId":"20200826-2-744c43a9-cc88-482b-805e-313094332337.pdf","replacedBillId":306,"billRef4":null,"createdTime":"2020-02-10T00:00:00Z","documentFileName":"20200826-2","receivedBy":1,"updatedBy":"emile.raffoul@payreq.com","status":1,"contentsType":0,"id":167,"actionDescription":null,"dueDate":"2020-08-28T00:00:00Z","reminderSentDatetime":null,"billerCustomerNumber":"20200826","mailhouseFileId":null,"latePaymentAmount":null,"actioned":false,"documentLocationId":1,"documentSize":238428,"currencyCode":"aud","securepayBillId":null,"securepayAuthToken":null,"numberOfPayers":1,"jobId":648,"noPaymentOverride":false,"billRef5":null,"documentId2":"20200826-2-744c43a9-cc88-482b-805e-313094332337.pdf","extRefNumber":"20200826","documentPages":1,"payerActorId":24,"billRef3":"Emile Raffoul","receivedTime2":"2020-09-11T00:13:47Z","updatedBy2":"emile.raffoul@payreq.com"}}

export const registrationFailedView = () => (
    <RegistrationView registration={emailRegistrationFailedAPIResponse.registration}/>
);

export const myBillsAgentRegistrationSaved = () => (
    <MyBillsAgentRegistrationCreated registrationsCreated={[
        {regNo: "1", accountNumber: "1111", authfield1: "Sammy Wu", exists: false},
        {regNo: "3", accountNumber: "3333", authfield1: "Zoha Riggs", exists: false}]}
    registrationsExisting={[
        {regNo: "2", accountNumber: "2222", authfield1: "Celeste England", exists: true},
        {regNo: "4", accountNumber: "4444", authfield1: "Fabian Dunlop", exists: true}]}
    />);

const xeroConfig = {"channel":{"isXeroconnect":true,"showInMybills":true,"checkPayerCred":true,"useAuthItem3":false,"useAuthItem1":true,"authItem2Help":"","authItem1Field":"First name as on the bill","authItem4Help":"","channelPartnerSystemId":"xeroconnect","generateCrnMethod":null,"authItem3Help":"","regBillerAccountNumberIsNumber":false,"generateIcrn":null,"registrationContactIdValidationMsg":null,"useAuthItem4":false,"authItem4Field":null,"emailBillDeliveryValue":null,"authItem1Help":"Please enter the EXACT customer name that appears on the notice. EG. AB Smith or AB & CD Smith","registrationContactIdField":"BPAY View Reference Number","registrationContactIdFormat":null,"authItem2Field":null,"extBillerId":"12345678","registrationContactIdHelp":"Please enter the 9 digit BPAY View Registration Number located below the BPAY logo.","authItem3Field":null,"billerAccountNumberLength":null,"agentNoticeIdContactIdField":"","useAuthItem2":false,"emailMarkEachAsFailed":false,"maxNoDetails":null,"emailTemplateText":null,"extBillerName":"Demo Council","billerId":10841},"previousFields":{"channelRef1":"Inclusive","channelRef2":"310","channelRef3":"DRAFT","channelRef4":"TOTAL","channelRef5":""},"connection":{"id":747,"needsAttention":false,"connectedDate":"2021-09-17T02:37:28Z","connectionError":false,"extraInfo1":"","partnerStatus":"Beta"},"hasPaymentGateway":true,"xeroaccounts":[{"name":"Payreq Demo Account","id":"314a5e30-7b59-46d9-98d3-6e3b82416be7","accounts":[{"ordering":1,"displayName":"EXPENSE - 310: Cost of Goods Sold","class":"EXPENSE","code":"310","name":"Cost of Goods Sold"},{"ordering":1,"displayName":"EXPENSE - 400: Advertising","class":"EXPENSE","code":"400","name":"Advertising"},{"ordering":1,"displayName":"EXPENSE - 404: Bank Fees","class":"EXPENSE","code":"404","name":"Bank Fees"},{"ordering":1,"displayName":"EXPENSE - 408: Cleaning","class":"EXPENSE","code":"408","name":"Cleaning"},{"ordering":1,"displayName":"EXPENSE - 412: Consulting & Accounting","class":"EXPENSE","code":"412","name":"Consulting & Accounting"},{"ordering":1,"displayName":"EXPENSE - 416: Depreciation","class":"EXPENSE","code":"416","name":"Depreciation"},{"ordering":1,"displayName":"EXPENSE - 420: Entertainment","class":"EXPENSE","code":"420","name":"Entertainment"},{"ordering":1,"displayName":"EXPENSE - 425: Freight & Courier","class":"EXPENSE","code":"425","name":"Freight & Courier"},{"ordering":1,"displayName":"EXPENSE - 429: General Expenses","class":"EXPENSE","code":"429","name":"General Expenses"},{"ordering":1,"displayName":"EXPENSE - 433: Insurance","class":"EXPENSE","code":"433","name":"Insurance"},{"ordering":1,"displayName":"EXPENSE - 437: Interest Expense","class":"EXPENSE","code":"437","name":"Interest Expense"},{"ordering":1,"displayName":"EXPENSE - 441: Legal expenses","class":"EXPENSE","code":"441","name":"Legal expenses"},{"ordering":1,"displayName":"EXPENSE - 445: Light, Power, Heating","class":"EXPENSE","code":"445","name":"Light, Power, Heating"},{"ordering":1,"displayName":"EXPENSE - 449: Motor Vehicle Expenses","class":"EXPENSE","code":"449","name":"Motor Vehicle Expenses"},{"ordering":1,"displayName":"EXPENSE - 453: Office Expenses","class":"EXPENSE","code":"453","name":"Office Expenses"},{"ordering":1,"displayName":"EXPENSE - 461: Printing & Stationery","class":"EXPENSE","code":"461","name":"Printing & Stationery"},{"ordering":1,"displayName":"EXPENSE - 469: Rent","class":"EXPENSE","code":"469","name":"Rent"},{"ordering":1,"displayName":"EXPENSE - 473: Repairs and Maintenance","class":"EXPENSE","code":"473","name":"Repairs and Maintenance"},{"ordering":1,"displayName":"EXPENSE - 477: Wages and Salaries","class":"EXPENSE","code":"477","name":"Wages and Salaries"},{"ordering":1,"displayName":"EXPENSE - 478: Superannuation","class":"EXPENSE","code":"478","name":"Superannuation"},{"ordering":1,"displayName":"EXPENSE - 485: Subscriptions","class":"EXPENSE","code":"485","name":"Subscriptions"},{"ordering":1,"displayName":"EXPENSE - 489: Telephone & Internet","class":"EXPENSE","code":"489","name":"Telephone & Internet"},{"ordering":1,"displayName":"EXPENSE - 493: Travel - National","class":"EXPENSE","code":"493","name":"Travel - National"},{"ordering":1,"displayName":"EXPENSE - 494: Travel - International","class":"EXPENSE","code":"494","name":"Travel - International"},{"ordering":1,"displayName":"EXPENSE - 497: Bank Revaluations","class":"EXPENSE","code":"497","name":"Bank Revaluations"},{"ordering":1,"displayName":"EXPENSE - 498: Unrealised Currency Gains","class":"EXPENSE","code":"498","name":"Unrealised Currency Gains"},{"ordering":1,"displayName":"EXPENSE - 499: Realised Currency Gains","class":"EXPENSE","code":"499","name":"Realised Currency Gains"},{"ordering":1,"displayName":"EXPENSE - 505: Income Tax Expense","class":"EXPENSE","code":"505","name":"Income Tax Expense"},{"ordering":2,"displayName":"LIABILITY - 800: Accounts Payable","class":"LIABILITY","code":"800","name":"Accounts Payable"},{"ordering":2,"displayName":"LIABILITY - 801: Unpaid Expense Claims","class":"LIABILITY","code":"801","name":"Unpaid Expense Claims"},{"ordering":2,"displayName":"LIABILITY - 804: Wages Payable - Payroll","class":"LIABILITY","code":"804","name":"Wages Payable - Payroll"},{"ordering":2,"displayName":"LIABILITY - 820: GST","class":"LIABILITY","code":"820","name":"GST"},{"ordering":2,"displayName":"LIABILITY - 825: PAYG Withholdings Payable","class":"LIABILITY","code":"825","name":"PAYG Withholdings Payable"},{"ordering":2,"displayName":"LIABILITY - 826: Superannuation Payable","class":"LIABILITY","code":"826","name":"Superannuation Payable"},{"ordering":2,"displayName":"LIABILITY - 830: Income Tax Payable","class":"LIABILITY","code":"830","name":"Income Tax Payable"},{"ordering":2,"displayName":"LIABILITY - 840: Historical Adjustment","class":"LIABILITY","code":"840","name":"Historical Adjustment"},{"ordering":2,"displayName":"LIABILITY - 850: Suspense","class":"LIABILITY","code":"850","name":"Suspense"},{"ordering":2,"displayName":"LIABILITY - 860: Rounding","class":"LIABILITY","code":"860","name":"Rounding"},{"ordering":2,"displayName":"LIABILITY - 877: Tracking Transfers","class":"LIABILITY","code":"877","name":"Tracking Transfers"},{"ordering":2,"displayName":"LIABILITY - 880: Owner A Drawings","class":"LIABILITY","code":"880","name":"Owner A Drawings"},{"ordering":2,"displayName":"LIABILITY - 881: Owner A Funds Introduced","class":"LIABILITY","code":"881","name":"Owner A Funds Introduced"},{"ordering":2,"displayName":"LIABILITY - 900: Loan","class":"LIABILITY","code":"900","name":"Loan"},{"ordering":3,"displayName":"REVENUE - 200: Sales","class":"REVENUE","code":"200","name":"Sales"},{"ordering":3,"displayName":"REVENUE - 260: Other Revenue","class":"REVENUE","code":"260","name":"Other Revenue"},{"ordering":3,"displayName":"REVENUE - 270: Interest Income","class":"REVENUE","code":"270","name":"Interest Income"},{"ordering":4,"displayName":"ASSET - 610: Accounts Receivable","class":"ASSET","code":"610","name":"Accounts Receivable"},{"ordering":4,"displayName":"ASSET - 620: Prepayments","class":"ASSET","code":"620","name":"Prepayments"},{"ordering":4,"displayName":"ASSET - 630: Inventory","class":"ASSET","code":"630","name":"Inventory"},{"ordering":4,"displayName":"ASSET - 710: Office Equipment","class":"ASSET","code":"710","name":"Office Equipment"},{"ordering":4,"displayName":"ASSET - 711: Less Accumulated Depreciation on Office Equipment","class":"ASSET","code":"711","name":"Less Accumulated Depreciation on Office Equipment"},{"ordering":4,"displayName":"ASSET - 720: Computer Equipment","class":"ASSET","code":"720","name":"Computer Equipment"},{"ordering":4,"displayName":"ASSET - 721: Less Accumulated Depreciation on Computer Equipment","class":"ASSET","code":"721","name":"Less Accumulated Depreciation on Computer Equipment"},{"ordering":5,"displayName":"EQUITY - 960: Retained Earnings","class":"EQUITY","code":"960","name":"Retained Earnings"},{"ordering":5,"displayName":"EQUITY - 970: Owner A Share Capital","class":"EQUITY","code":"970","name":"Owner A Share Capital"}]}],"logoPath":"https://s3-ap-southeast-2.amazonaws.com/testdocs.payreq.com/logos/demo_logo.jpg","tagName":"Demo Council"}

export const xeroRegistrationForm = () => (
    <CreateXeroRegistrationView channel={xeroConfig.channel}
                                xeroOrganisations={xeroConfig.xeroaccounts.map(({name, id, accounts}) => ({label: name, value: id, accounts: accounts}))}
                                serverErrors={[]}
                                logoPath={xeroConfig.logoPath}
                                billerName={xeroConfig.tagName}
                                payerId={1}
                                registeringForbillerId={1}
                                onSubmit={(values) => {alert(JSON.stringify(values))}}
    />
)
