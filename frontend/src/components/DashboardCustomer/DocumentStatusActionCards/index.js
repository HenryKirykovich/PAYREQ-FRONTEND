import React, {useEffect, useState} from "react";
import axios from "axios";

import UndeliveredDocumentsCardView from "./UndeliveredDocumentsCardView";
import ErrorDocumentsCardView from "./ErrorDocumentsCardView";
import ReviewDocumentsCardView from "./ReviewDocumentsCardView";

const getDocumentStateCounts = (setIsLoading, setCounts, billerId) => {
    axios.get("/data/bills/counts", {params: {billerId: billerId}})
        .then(({data}) => {
            const billStatusCounts = data.counts;
            if (billStatusCounts){
                setCounts(billStatusCounts);
            }
            setIsLoading(false);
        });
};

const DocumentStatusActionCards = ({billerId, setIsLoading}) => {
    const [counts, setCounts] = useState();

    useEffect(() => {
        getDocumentStateCounts(setIsLoading, setCounts, billerId);
    }, [setIsLoading, setCounts, billerId]);

    //undelivered documents
    const undeliveredDocuments = (counts && (counts.undelivered || 0));
    const hasUndeliveredDocuments = (undeliveredDocuments > 0);

    //error documents
    const errorDocuments = (counts && (counts.error || 0));
    const hasErrorDocuments = (errorDocuments > 0);

    //awaiting review
    const documentToReview = (counts && (counts.reviewByBiller || 0))
    const hasDocumentsToReview = (documentToReview > 0)

    const hasDocumentCardsToShow = hasUndeliveredDocuments || hasErrorDocuments || hasDocumentsToReview;

    if (hasDocumentCardsToShow)
        return (
        <React.Fragment>
            {hasUndeliveredDocuments && <UndeliveredDocumentsCardView billerId={billerId} count={undeliveredDocuments}/>}
            {hasErrorDocuments && <ErrorDocumentsCardView billerId={billerId} count={errorDocuments}/> }
            {hasDocumentsToReview && <ReviewDocumentsCardView billerId={billerId} count={documentToReview}/>}
        </React.Fragment>
    );

    return null;
};

export default DocumentStatusActionCards;
