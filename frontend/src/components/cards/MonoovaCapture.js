import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Primer } from '@primer-io/checkout-web';
import { LinkButton, SubmitButton, Checkbox, AlertDanger } from "../common";
import Loading from "../Loading";
import styles from "./AddCard.module.scss";
import {injectIntl} from "react-intl";

const ErrorMessage = ({errorId, intl}) => (
  <div className={styles.formErrors}>
    <AlertDanger>
      {intl.formatMessage({id: errorId})}
    </AlertDanger>
  </div>
);

const setupPrimerWidget = async (gatewayConfig, setHasWidgetLoaded, setCheckout, setPrimerTransactionId, setIsButtonDisabled, intl, setError, onError) => {
  try {
    const widgetContainer = document.getElementById('widget');
    if (!widgetContainer) return;

    widgetContainer.innerHTML = '';

    // Set up a ResizeObserver to detect when the widget content is loaded
    const widgetResizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { contentRect } = entry;
        const height = contentRect.height;

        if (height > 50) {
          setHasWidgetLoaded(true);
          widgetResizeObserver.disconnect();
        }
      }
    });

    // Start observing the widget container
    widgetResizeObserver.observe(widgetContainer);

    const locale = localStorage.getItem("language") || 'en';

    const primerCheckout = await Primer.showUniversalCheckout(gatewayConfig.clientToken, {
      container: '#widget',
      locale: locale,
      apiVersion: '2.4',
      clientSessionCachingEnabled: true,
      submitButton: {
        useBuiltInButton: false,
        onDisable: (isDisabled) => {
          setIsButtonDisabled(isDisabled);
        }
      },
      vault: {
        visible: false,
        deletionDisabled: true
      },
      style: {
        loadingScreen: {
          color: '#FFFFFF'
        },
        inputErrorText: {
          fontFamily: 'Arial',
          textAlign: 'left',
          color: '#e70909',
          fontSize: '1.4rem',
        },
        input: {
          base: {
            fontFamily: 'Arial',
            color: '#333',
            height: '40px',
            paddingHorizontal: '12px',
            background: '#FFFFFF',
            borderRadius: '4px',
            borderStyle: 'solid',
            borderColor: '#CCCCCC',
            borderWidth: '1px',
          },
          hover: {
            borderColor: '#888888'
          },
          focus: {
            borderColor: '#0066CC'
          },
          error: {
            borderColor: '#FF0000'
          }
        },
        inputLabel: {
          fontFamily: 'Arial',
          color: '#595959',
          fontSize: '1.6rem',
        },
      },
      successScreen: false,
      paymentMethods: ["card"],
      onCheckoutComplete: (r) => {
        if (r.payment) {
          setPrimerTransactionId(r.payment.id);
        }
      },
      onCheckoutFail(error, { payment }, handler) {
        console.error("Checkout failed", error, payment);
        if (!handler) {
          return;
        }
        const errorMessage = intl.formatMessage({id: "pay.validation.error.checkoutFail"});
        if (errorMessage) {
          return handler.showErrorMessage(errorMessage);
        }
        return handler.showErrorMessage();
      },
    });
    setCheckout(primerCheckout);
  } catch (error) {
    console.error("Error setting up Primer widget:", error);
    setError(error);
    if (onError) {
      onError(error);
    }
  }
};

// Processing component to handle API calls
const ProcessingHandler = withRouter(({
  billerId,
  location,
  primerTransactionId,
  customerId,
  clientPaymentTokenUniqueReference,
  saveCard,
  onSuccess,
  setError,
  onError
}) => {
  useEffect(() => {
    onSuccess({
      primerTransactionId,
      customerId,
      clientPaymentTokenUniqueReference,
      location,
      saveCard,
      setError,
    });
  }, [
    location,
    billerId,
    primerTransactionId,
    customerId,
    clientPaymentTokenUniqueReference,
    onSuccess,
    setError,
    onError,
    saveCard
  ]);

  return <Loading text="cards.addCard.saving"/>;
});

// Main component
const MonoovaCapture = ({
  // Required props
  billerId,
  location,
  gatewayConfig,

  // Callback handlers
  onSuccess,
  onError,
  onCancel,

  // UI customization
  submitLabel = "forms.generic.save.button",
  cancelLabel = "forms.generic.cancel.button",
  showCancelButton = true,
  className,

  // save card checkbox
  saveCardOption,

  // intl
  intl
}) => {
  // Component state - MUST be declared before any conditional returns
  const [hasWidgetLoaded, setHasWidgetLoaded] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [primerTransactionId, setPrimerTransactionId] = useState();
  const [checkout, setCheckout] = useState(null);
  const [error, setError] = useState(null);
  const [saveCard, setSaveCard] = useState(false);

  // Initialize Primer widget - useEffect must be before any conditional returns
  useEffect(() => {
    // Skip effect if no client token
    if (!gatewayConfig?.clientToken) return;
    setupPrimerWidget(gatewayConfig, setHasWidgetLoaded, setCheckout, setPrimerTransactionId, setIsButtonDisabled, intl, setError, onError);
  }, [billerId, gatewayConfig, onError, intl]);

  // Extract gateway config
  const { customerId, clientPaymentTokenUniqueReference } = gatewayConfig || {};

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkout) {
      checkout.submit();
    }
  };

  // Cancel handler
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className={`${styles.container} ${className || ''}`}>
      {/* Loading state */}
      {!hasWidgetLoaded && <Loading/>}

      {/* Processing state */}
      {hasWidgetLoaded && primerTransactionId && !error && (
        <ProcessingHandler
          billerId={billerId}
          location={location}
          primerTransactionId={primerTransactionId}
          customerId={customerId}
          clientPaymentTokenUniqueReference={clientPaymentTokenUniqueReference}
          saveCard={saveCard}
          onSuccess={onSuccess}
          setError={setError}
          onError={onError}
        />
      )}

      {/* Card entry form */}
      {!error && !primerTransactionId &&
        <form id="cardEntryForm" className={styles.cardEntryForm} onSubmit={e => e.preventDefault()}>
          {/* Widget container */}
          <div id="widget" className={styles.primerContainer}>
            <script src="https://sdk.primer.io/web/v2.45.8/Primer.min.js" crossOrigin="anonymous" />
            <link rel="stylesheet" href="https://sdk.primer.io/web/v2.45.8/Checkout.css" />
          </div>

          {/* Render saveCard checkbox if option is passed */}
          {hasWidgetLoaded && saveCardOption &&
           <Checkbox name="saveCard"
                     label="payments.paymentForm.saveCardCheckbox"
                     defaultValue={saveCard}
                     onChange={e => setSaveCard(e.target.checked)}
                     disabled={isButtonDisabled} /> }

          {/* Action buttons */}
          {hasWidgetLoaded && (
            <div className={styles.actionButtonsContainer}>
              {/* Submit button */}
              <SubmitButton
                data-testid="card-action-button"
                className="card-action-button"
                label={submitLabel}
                disabled={isButtonDisabled}
                onClick={handleSubmit}
              />

              {/* Cancel button (optional) */}
              {showCancelButton && (
                <LinkButton
                  label={cancelLabel}
                  onClick={handleCancel}
                />
              )}
            </div>
          )}

        </form>
      }

      {/* Error state */}
      {error && !onError && (
        <ErrorMessage errorId={error} intl={intl}/>
      )}
    </div>
  );
};

export default injectIntl(MonoovaCapture);
