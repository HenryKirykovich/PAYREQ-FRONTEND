import React, {useEffect, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {Button} from "react-bootstrap";
import Loading from "../../Loading";
import {getDateAsUTCFormatted} from "../../../utils/date-utils";

const BillTemplates = ({billerId, intl}) => {
    const [templates, setTemplates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (billerId) {
            axios.get("/data/bill-templates", {params: {billerId}})
                .then(({data}) => {
                    setTemplates(data.templates || []);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching templates:", error);
                    setIsLoading(false);
                });
        }
    }, [billerId]);

    const handleUpload = () => {
        // TODO: Implement upload modal
        alert("Bill template upload to be implemented");
    };

    const handleDownload = (templateId) => {
        window.open(`/data/bill-templates/${templateId}/download?billerId=${billerId}`, "_blank");
    };

    if (isLoading) {
        return <Loading/>;
    }

    return (
        <div>
            <div className="row actions-row">
                <div className="actions btn-group col-sm-4">
                    <Button onClick={handleUpload}>
                        <span className="glyphicon glyphicon-upload"></span> 
                        {" "}{intl.formatMessage({id: "settings.templates.uploadButton"})}
                    </Button>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <form className="form-horizontal" role="form">
                        <div className="row">
                            <div className="col-md-12">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>{intl.formatMessage({id: "settings.templates.name"})}</th>
                                            <th>{intl.formatMessage({id: "settings.templates.filename"})}</th>
                                            <th>{intl.formatMessage({id: "settings.templates.createdOn"})}</th>
                                            <th>{intl.formatMessage({id: "settings.templates.createdBy"})}</th>
                                            <th>{intl.formatMessage({id: "settings.templates.action"})}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {templates.length === 0 ? (
                                            <tr>
                                                <td colSpan="5">
                                                    {intl.formatMessage({id: "settings.templates.noTemplatesFound"})}
                                                </td>
                                            </tr>
                                        ) : (
                                            templates.map(template => (
                                                <tr key={template.id}>
                                                    <td>{template.name}</td>
                                                    <td>{template.fileName}</td>
                                                    <td>{getDateAsUTCFormatted(template.createdOn)}</td>
                                                    <td>{template.createdBy}</td>
                                                    <td>
                                                        <a 
                                                            href="#"
                                                            className="btn btn-xs" 
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleDownload(template.id);
                                                            }}
                                                        >
                                                            <span className="glyphicon glyphicon-file"></span>
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default injectIntl(BillTemplates);
