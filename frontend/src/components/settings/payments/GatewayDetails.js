import React, {useState} from "react";
import {injectIntl} from "react-intl";
import {Button, Modal} from "react-bootstrap";
import {Icon, LargeText, RegularText, SecondaryHeading, PrimaryButton} from "../../common";
import {CARD_SCHEME_LABELS, GATEWAY_DETAILS} from "../../payments/payment-constants";
import GatewayUpdateForm from "./GatewayUpdateForm";
import styles from "./GatewayDetails.module.scss";

const gatewayType = gateway => {
  if (gateway.processorId === "paydock") {
    return gateway.processorGatewayType;
  }
  return gateway.processorId;
};

const isBpointGateway = gateway => {
  return gateway.processorGatewayType === "bpoint";
};

const hasEncryptedConfig = gateway => {
  return gateway.encryptedConfig != null;
};

const gatewayRequiresUpdate = gateway => {
  return isBpointGateway(gateway) && !hasEncryptedConfig(gateway);
};

const GatewayName = injectIntl(
  ({ intl, gateway }) => {
    const type = gatewayType(gateway);
    const label = GATEWAY_DETAILS[type].label;
    const intlLabel = GATEWAY_DETAILS[type].intlLabel;
    const resolvedLabel = intlLabel
          ? intl.formatMessage({ id: intlLabel }, {})
          : label;
    return (
      <b style={{ marginRight: "0px" }}>{resolvedLabel}</b>
    );
  });

const CardDetails = ({ billerPaymentSources }) => (
  <table className={styles.cards}>
    <thead>
      <tr>
        <th><RegularText className={styles.cardsHeading} text="settings.gateway.cardScheme" /></th>
        <th><RegularText className={styles.cardsHeading} text="settings.gateway.surcharge" /></th>
      </tr>
    </thead>
    <tbody>
      {billerPaymentSources.map(billerPaymentSource => (
        <tr key={billerPaymentSource.providerName}>
          <td>{CARD_SCHEME_LABELS[billerPaymentSource.providerName]}</td>
          <td>{billerPaymentSource.surchargePercentage}%</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const InActiveView = ({gateway}) => {
  const [isModalOpen, setIsModalOpen] = useState();
  return (
    <React.Fragment>
      <div className={styles.summaryLine}>
        <LargeText text="settings.gateway.configured"
                   values={{gatewayName: <GatewayName key={gateway.type} gateway={gateway}/>}}/>
      </div>
      <PrimaryButton label="settings.gateway.activate" onClick={() => setIsModalOpen(true)}/>
      <Modal show={isModalOpen}>
        <Modal.Body>
          <LargeText text="settings.gateway.activate.instructions"/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setIsModalOpen(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  )
};

const ActiveView = ({gateway}) => (
  <div className={styles.summaryLine}>
    <Icon name="ok" large/>
    <LargeText text="settings.gateway.activated"
               values={{gatewayName: <GatewayName key={gateway.type} gateway={gateway}/>}}/>
  </div>
);

const RequiresUpdateView = ({gateway}) => (
  <div className={styles.summaryLine}>
    <Icon name="wrench" large/>
    <LargeText text="settings.gateway.requiresUpdate"
               values={{gatewayName: <GatewayName key={gateway.type} gateway={gateway}/>}}/>
  </div>
);

const GatewayDetails = ({gateway, billerId}) => {
  const [requiresUpdate, setRequiresUpdate] = useState(gatewayRequiresUpdate(gateway));
  const GatewayStatusView = gateway.status === "active" ? (requiresUpdate ? RequiresUpdateView : ActiveView) : InActiveView;
  return (
    <React.Fragment>
      <div className={styles.section}>
        <GatewayStatusView gateway={gateway}/>
        { requiresUpdate &&
          <GatewayUpdateForm gateway={gateway} billerId={billerId} setRequiresUpdate={setRequiresUpdate}/> }
      </div>

      <div className={styles.section}>
        <SecondaryHeading text="payments.accepted.cards.label"/>
        <CardDetails billerPaymentSources={gateway.billerPaymentSource}/>
      </div>
    </React.Fragment>
  )
};

export default GatewayDetails;
