import React, {useState, useEffect} from "react";
import {Panel, FormControl, Button, FormGroup, ControlLabel} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";

const InvoiceBiller = () => {
    const {billerId} = useParams();
    const [biller, setBiller] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [tagName, setTagName] = useState("");

    useEffect(() => {
        axios.get(`/data/invoices/biller/${billerId}`)
            .then(({data}) => {
                setBiller(data.biller);
                setTagName(data.biller.tagName);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error loading biller:", error);
                setIsLoading(false);
            });
    }, [billerId]);

    const handleUpdate = () => {
        axios.post(`/data/invoices/biller/${billerId}/update`, {tagName})
            .then(() => {
                alert("Mailer updated successfully");
                setBiller({...biller, tagName});
            })
            .catch(error => {
                console.error("Error updating biller:", error);
                alert("Failed to update mailer");
            });
    };

    if (isLoading) return <Loading/>;

    if (!biller) {
        return <div className="alert alert-danger">Failed to load biller information</div>;
    }

    return (
        <div id="view-invoice-biller">
            <div className="row">
                <div className="col-md-12">
                    <h4>
                        Biller {biller.tagName}
                        {' '}<small>{biller.id}</small>
                    </h4>
                </div>
            </div>
            <div className="row actions-row" role="toolbar">
                <div className="actions btn-group col-sm-3">
                    <Link to={`/customer/biller/${billerId}/invoices`} className="btn btn-default">
                        <span className="glyphicon glyphicon-arrow-left"></span> Back to mails
                    </Link>
                </div>
            </div>

            <form className="form-horizontal" role="form">
                <div className="row">
                    <div className="col-md-12">
                        <Panel>
                            <Panel.Heading>
                                <h4 className="panel-title">Mailer Details</h4>
                            </Panel.Heading>
                            <Panel.Body>
                                <FormGroup>
                                    <ControlLabel className="col-md-2">Name</ControlLabel>
                                    <div className="col-md-10">
                                        <FormControl
                                            type="text"
                                            value={tagName}
                                            onChange={(e) => setTagName(e.target.value)}
                                        />
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel className="col-md-2">Email</ControlLabel>
                                    <div className="col-md-10">
                                        <p className="form-control-static">{biller.email}</p>
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <div className="col-md-10 pull-right">
                                        <Button bsStyle="primary" type="button" onClick={handleUpdate}>
                                            Update mailer
                                        </Button>
                                    </div>
                                </FormGroup>
                            </Panel.Body>
                        </Panel>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default InvoiceBiller;
