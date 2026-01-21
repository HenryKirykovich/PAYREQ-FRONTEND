import React from 'react';
import {AccountSelectionView} from "../components/AccountSelection/AccountSelectionView";
import PaymentHistory from "../components/paymentHistory";


export default {
    title: 'Payment History',
};


export const paymentHisotry = () => {
    return <React.Fragment>
        <PaymentHistory/>
    </React.Fragment>
}
