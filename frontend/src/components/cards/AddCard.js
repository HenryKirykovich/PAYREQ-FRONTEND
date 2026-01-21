import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";
import { PageHeading, AlertDanger, DefaultButton } from "../common";
import MonoovaCapture from "./MonoovaCapture";
import { injectIntl } from "react-intl";
import styles from "./AddCard.module.scss";

const getPathOnSuccess = (location) => {
  if(location.state && location.state.pathOnSuccess) {
    return {
      pathname: location.state.pathOnSuccess,
      state: location.state
    };
  }
  return null;
};

const getCard = (handleResponse, billerId, cardId) => {
  axios.get(`/data/cards/${billerId}/${cardId}`, {
    localErrorHandling: true
  })
       .then(({data: {card}}) => handleResponse(card));
};

const maxWaitTimeActiveCard = 10 * 1000; // 10s

const checkCardStatus = (billerId, cardId) => {
  return new Promise((resolve) => {
    getCard(card => resolve(card.status === 'active'), billerId, cardId);
  });
};

const notifyCardNotActive = (billerId, cardId) => {
  // fire and forget
  axios.post(`/data/cards/${billerId}/notify-not-active/${cardId}`);
};

const AddCard = ({billerId, location, history, intl}) => {
  const [gatewayConfig, setGatewayConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch gateway configuration from backend
  useEffect(() => {
    const fetchGatewayConfig = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/data/settings/payment-gateway/${billerId}/create-card-config`);
        if (response.data.success) {
          setGatewayConfig(response.data);
        } else {
          setError(response.data.error);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching payment gateway configuration:", error);
        setIsLoading(false);
      }
    };

    fetchGatewayConfig();
  }, [billerId]);

  return <>
           <PageHeading text="cards.listScreen.addButtonLabel" showInWebview={true}/>
           {error ? (
             <div>
               <AlertDanger>
                 {intl.formatMessage({id: error})}
               </AlertDanger>
               <DefaultButton
                 label="cards.viewCard.back.button"
                 icon="menu-left"
                 linkTo="../cards"
                 className={styles.backButton}
               />
             </div>
           )
            :
            ( isLoading ?
              <Loading />
              :
              (!error && gatewayConfig.clientToken &&
               <MonoovaCapture
                 billerId={billerId}
                 gatewayConfig={gatewayConfig}
                 onSuccess={async ({
                   primerTransactionId,
                   clientPaymentTokenUniqueReference,
                   location,
                   setError
                 }) => {
                   axios.post(
                     `/data/cards/${billerId}`, {
                       primerTransactionId,
                       clientPaymentTokenUniqueReference
                     })
                        .then(async ({data}) => {
                          if (!data.success) {
                            setError(data.error);
                          } else {
                            const cardId = data.card.id;
                            let t = 0;
                            let wait = 250;
                            let cardActive = await checkCardStatus(billerId, cardId);
                            while (!cardActive && t < maxWaitTimeActiveCard) {
                              await new Promise(r => setTimeout(r, wait));
                              t += wait;
                              cardActive = await checkCardStatus(billerId, cardId);
                              wait *= 1.2;
                            };
                            if (!cardActive) {
                              notifyCardNotActive(billerId, cardId);
                              setError("payments.paymentForm.saveCardError");
                              return; // Don't navigate if card activation failed
                            }
                            const pathOnSuccess= getPathOnSuccess(location);
                            history.push({
                              pathname: pathOnSuccess ? pathOnSuccess.pathname : "./card-saved",
                              state: {
                                data: data,
                                ...pathOnSuccess ? pathOnSuccess.state : {}
                              }
                            });
                          }})
                 }}
                 onCancel={() => {
                   const cancelPath = location?.state?.cancelPath || '../cards';
                   history.push(cancelPath);
                 }}
                 submitLabel="forms.generic.save.button"
               />
              )
            )
           }
         </>;
};

export default injectIntl(withRouter(AddCard));
