import React from "react";
import styles from './JobsPageLinks.module.scss'

const PageLink = ({isActive, n, showPage, label=n, ...otherProps}) => {
    return <li className={`${styles.link} ${isActive ? "active" : ""}`} {...otherProps}>
               <span onClick={() => showPage(n)}>{label}</span>
           </li>
};

const JobsPageLinks = ({meta, itemsPerPage, showPage}) => {
    const {total, showing} = meta;
    const activePage = Math.floor((showing[0] / itemsPerPage) + 1);
    const nPages = Math.floor((total / itemsPerPage) + 1);
    // We want to show
    // - at most 2 pages before the active one
    // - at most 5 pages after the active one
    const showNPages = Math.min(nPages, activePage + 5) - Math.max(1, activePage - 2) + 1;
    const pages = [...Array(showNPages).keys()].map(i => i + Math.max(1, activePage - 2));

    if (nPages > 1)
        return <ul className="pagination pagination-sm" style={{"margin": "0.5rem 0"}}>
                   <PageLink isActive={activePage === 1} n={1} showPage={showPage} label="<<"/>
                   { activePage > 1 &&
                     <PageLink isActive={false} n={Math.max(1, activePage - 1)} showPage={showPage} label="<"/> }
                   { pages.map(p =>
                       <PageLink isActive={activePage === p} n={p} showPage={showPage} key={p}/> ) }
                   { activePage < nPages &&
                     <PageLink isActive={false} n={Math.min(nPages, activePage + 1)} showPage={showPage} label=">"/> }
                   <PageLink isActive={activePage === nPages} n={nPages} showPage={showPage} label=">>"/>
               </ul>
    return '';
};

export default JobsPageLinks;
