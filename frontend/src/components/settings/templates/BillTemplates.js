import React, {useEffect, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {Button} from "react-bootstrap";
import Loading from "../../Loading";
import {getDateAsUTCFormatted} from "../../../utils/date-utils";
import {BillTemplateUploadModal} from "../../modals";
import {useAppState} from "../../../state";
import {SET_ALERT} from "../../../state/reducers/alertReducer";

const DOWNLOAD_BASE_URL = "/download/billTemplate/download?";

const BillTemplates = ({billerId, intl}) => {
    const [, dispatch] = useAppState();
    const [templates, setTemplates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);

    const fetchTemplates = () => {
        return axios.get("/data/billTemplates", {params: {billerId}})
            .then(({data}) => {
                setTemplates(data.templates || []);
            });
    };

    useEffect(() => {
        if (billerId) {
            fetchTemplates()
                .catch(() => setLoadError(true))
                .finally(() => setIsLoading(false));
        }
    }, [billerId]);

    const handleUploadComplete = () => {
        fetchTemplates().catch(() => {});
        dispatch({type: SET_ALERT, alert: {level: "success", text: "settings.templates.successUpload"}});
    };

    const handleDownload = (templateId) => {
        axios.get("/data/billTemplates/download", {params: {billerId, id: templateId}})
            .then(({data}) => {
                window.location.assign(DOWNLOAD_BASE_URL + "downloadFileId" + data.downloadFileId);
            })
            .catch(() => {
                dispatch({type: SET_ALERT, alert: {level: "danger", text: "settings.templates.downloadFail"}});
            });
    };

    if (isLoading) {
        return <Loading/>;
    }

    return (
        <div>
            <div className="row actions-row">
                <div className="actions btn-group col-sm-4">
                    <Button onClick={() => setShowUploadModal(true)}>
                        <span className="glyphicon glyphicon-upload"></span>
                        {" "}{intl.formatMessage({id: "settings.templates.uploadButton"})}
                    </Button>
                </div>
            </div>

            {loadError && (
                <div className="alert alert-danger">
                    {intl.formatMessage({id: "settings.templates.genericFail"})}
                </div>
            )}

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

            <BillTemplateUploadModal
                show={showUploadModal}
                onClose={() => setShowUploadModal(false)}
                onUploadComplete={handleUploadComplete}
                billerId={billerId}
            />
        </div>
    );
};

export default injectIntl(BillTemplates);
