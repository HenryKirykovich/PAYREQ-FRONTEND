import React from "react";
import {injectIntl} from "react-intl";
import PropTypes from "prop-types";


const TableContent = ({headerLabels, headerLabelValues, rows, footer, intl}) => (
    <React.Fragment>
        <thead>
        <tr>
            {headerLabels.map(label => <th key={label}>{intl.formatMessage({id: label}, headerLabelValues)}</th>)}
        </tr>
        </thead>
        <tbody>
        {rows.map((cells, idx) =>
            <tr key={idx}>
                {cells.map(cell => <td key={cell}>{cell}</td>)}
            </tr>)}
        </tbody>

        {footer && <tfoot>
        <tr>
            {footer.map((cell, idx) => <th key={idx}>{cell}</th>)}
        </tr>
        </tfoot>}
    </React.Fragment>
);

const Table = ({headerLabels, headerLabelValues, rows, footer, intl, children}) => (
    <table className="table table-hover">
        {children ? children : <TableContent headerLabels={headerLabels}
                                             headerLabelValues={headerLabelValues}
                                             rows={rows}
                                             footer={footer}
                                             intl={intl}/>}

    </table>
);

Table.propTypes = {
    headerLabels: PropTypes.array,
    rows: PropTypes.array
};

export default injectIntl(Table);