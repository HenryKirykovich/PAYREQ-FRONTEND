import {PageHeading, RegularText} from "../common";
import React, {useEffect, useState, useCallback} from "react";
import axios from "axios";
import {useAppState} from "../../state";
import Loading from "../Loading";
import JobsButtons from './JobsButtons';
import JobsTable from './JobsTable';
import JobsPageLinks from './JobsPageLinks';
import RunJobModal from "./RunJobModal";

const getJobs = (billerId, setIsLoadingJobs, setJobs, setMeta, n=1) => {
    setIsLoadingJobs(true);
    axios.get("/data/jobs",
        {params: {billerId: billerId,
                  pageNumber: n}})
        .then(({data}) => {
            setJobs(data.jobs);
            setMeta(data.meta);
        }).finally(() => {
            setIsLoadingJobs(false);
        });
};

const getExternalWorkflows = (billerId, setIsLoadingWorkflows, setWorkflows) => {
    setIsLoadingWorkflows(true);
    axios.get("/data/external-workflows",
             {params: {billerId: billerId}})
        .then(({data}) => {
          setWorkflows(data.externalWorkflows.map(value => ({key: `${value.id}`,
                                                             value: value.id,
                                                             label: value.displayDescription,
                                                             configuration: value.configuration})))
        }).finally(() => {
          setIsLoadingWorkflows(false);
        });
};

const showPage = (billerId, setIsLoading, setJobs, setMeta) => {
  return function (n) {
    getJobs(billerId, setIsLoading, setJobs, setMeta, n);
  };
};

const jobsPerPage = 10;

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [meta, setMeta] = useState({});
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [workflows, setWorkflows] = useState([]);
  const [isLoadingWorkflows, setIsLoadingWorkflows] = useState(true);
  const [showRunJobModal, setShowRunJobModal] = useState(false);

  const [{biller}] = useAppState();

  useEffect(() => getJobs(biller.id, setIsLoadingJobs, setJobs, setMeta), [biller.id]);
  useEffect(() => getExternalWorkflows(biller.id, setIsLoadingWorkflows, setWorkflows), [biller.id]);

  const doRefresh = useCallback(() => getJobs(biller.id, setIsLoadingJobs, setJobs, setMeta), [biller.id]);
  const doShowRunModal = useCallback(() => setShowRunJobModal(true), []);
  const doHideRunModal = useCallback(() => setShowRunJobModal(false), []);

  if (isLoadingJobs || isLoadingWorkflows) return <Loading/>;

  const canRunJob = (!isLoadingWorkflows && workflows && workflows.length > 0);
  const canShowJobs = jobs && jobs.length > 0;
  const canShowPageLinks = meta && meta.showing && meta.showing.length === 2;

    return (
         <React.Fragment>

            <PageHeading text="jobs.pageHeading"/>

            <RunJobModal biller={biller}
                         show={showRunJobModal}
                         workflowOptions={workflows}
                         onCancel={doHideRunModal}/>

             <JobsButtons doRefresh={doRefresh}
                          doRunJob={canRunJob && doShowRunModal}/>

            {canShowJobs ?
                <JobsTable jobs={jobs} /> :
                <RegularText text="jobs.noResults"/>}

            {canShowPageLinks &&
             <JobsPageLinks meta={meta} itemsPerPage={jobsPerPage} showPage={showPage(biller.id, setIsLoadingJobs, setJobs, setMeta)} />}

        </React.Fragment>
    );
};

export default Jobs;
