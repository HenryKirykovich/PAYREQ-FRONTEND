import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { HtmlWidget } from "@paydock/client-sdk/widget";
import { LinkButton, SubmitButton, AlertDanger } from "../common";
import PayDockCardDetails from "../PaydockCardDetails";
import { setWidgetDefaults } from "../../utils/payment-utils";
import Loading from "../Loading";
import styles from "./AddCard.module.scss";
import { CARD_SCHEME_LABELS } from "../payments/payment-constants";
import { injectIntl } from "react-intl";

const ErrorMessage = ({errorId, intl}) => (
  <div className={styles.formErrors}>
    <AlertDanger>
      {intl.formatMessage({id: errorId})}
    </AlertDanger>
  </div>
);

const onCardCaptureComplete = (iframeResponse, setOneTimeToken, billerId) => {
  const isExpectedToken = parseInt(iframeResponse.ref_id) === billerId;
  if (isExpectedToken) {
    setOneTimeToken(iframeResponse.payment_source);
  }
};

const SavingCard = withRouter(({billerId, oneTimeToken, history, pathOnSuccess, setError}) => {
  useEffect(() => {
    axios.post(
      `/data/cards/${billerId}`,
      { oneTimeToken })
         .then(({data}) => {
           if (!data.success) {
             setError(data.error);
           } else {
             history.push({
               pathname: pathOnSuccess ? pathOnSuccess.pathname : "./card-saved",
               state: {data: data, ...pathOnSuccess ? pathOnSuccess.state : {}}
             })
           }});
  }, [billerId, oneTimeToken, history, pathOnSuccess]);

  return <Loading text="cards.addCard.saving"/>;
});

const PaydockCapture = ({billerId, location, gatewayConfig, intl}) => {
  const [hasWidgetLoaded, setHasWidgetLoaded] = useState(false);
  const [isWidgetSubmitting, setIsWidgetSubmitting] = useState(false);
  const [oneTimeToken, setOneTimeToken] = useState();
  const [error, setError] = useState(null);
  const { publicKey, mode, cardEntryGatewayId } = gatewayConfig || {};

  useEffect(() => {
    if (!publicKey || !cardEntryGatewayId) return;

    // Configure the Paydock widget
    let widget = new HtmlWidget("#widget", publicKey, cardEntryGatewayId);
    setWidgetDefaults(
      widget,
      mode,
      billerId,
      Object.keys(CARD_SCHEME_LABELS),
      "#cardEntryForm",
      () => setHasWidgetLoaded(true),
      () => setIsWidgetSubmitting(true),
      () => setIsWidgetSubmitting(false),
      null,
      iframeResponse => onCardCaptureComplete(
        iframeResponse,
        setOneTimeToken,
        billerId
      )
    );
    widget.load();
  }, [billerId, publicKey, mode, cardEntryGatewayId]);

  return (
    <div className={styles.container}>
      {!hasWidgetLoaded && <Loading/>}
      {hasWidgetLoaded && oneTimeToken && !error && (
        <SavingCard
          billerId={billerId}
          oneTimeToken={oneTimeToken}
          pathOnSuccess={location.state && location.state.pathOnSuccess ? {pathname: location.state.pathOnSuccess, state: location.state} : null}
          setError={setError}
        />
      )}
      {hasWidgetLoaded && oneTimeToken && error &&
       <ErrorMessage errorId={error} intl={intl}/>}
      {!oneTimeToken &&
        <form id="cardEntryForm" className={styles.cardEntryForm} onSubmit={(e) => e.preventDefault()}>
          <PayDockCardDetails id="widget"/>

          {hasWidgetLoaded && (
            <div className={styles.actionButtonsContainer}>
              <SubmitButton
                id="card-save-button"
                label="forms.generic.save.button"
                disabled={isWidgetSubmitting}
              />
              <LinkButton
                label="forms.generic.cancel.button"
                linkTo={location.state ? location.state.cancelPath : "../cards"}
              />
            </div>
          )}
        </form>
      }
    </div>
  );
};

export default injectIntl(PaydockCapture);
