import React, {useState} from "react";
import {Modal, Button, FormControl, InputGroup} from "react-bootstrap";

const ReferBusinessModal = ({show, onClose, referralCode, masterBillerName}) => {
    const [copied, setCopied] = useState(false);

    const handleCopyCode = () => {
        const input = document.getElementById("uniqueCode");
        if (input) {
            input.select();
            document.execCommand("copy");
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const referralMessage = masterBillerName 
        ? `Refer a business to ${masterBillerName} and receive a referral credit when they go live. Your referral code is <strong>${referralCode}</strong>. The business must use this unique code when signing up with ${masterBillerName}.`
        : `Your referral code is <strong>${referralCode}</strong>.`;

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Refer a Business</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div dangerouslySetInnerHTML={{__html: referralMessage}}/>
                
                <InputGroup style={{marginTop: '20px'}}>
                    <FormControl
                        id="uniqueCode"
                        type="text"
                        className="input-lg primary-border"
                        placeholder="Click the button to copy"
                        value={referralCode || ""}
                        disabled
                    />
                    <InputGroup.Button>
                        <Button bsStyle="primary" bsSize="large" onClick={handleCopyCode}>
                            {copied ? "Copied!" : "Copy to Clipboard"}
                        </Button>
                    </InputGroup.Button>
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ReferBusinessModal;
