import React from "react";
import {Col, Row} from "react-bootstrap";

const VerticalLayout = ({half, children}) => {
    const columnSize = half ? 6 : 12;
    return React.Children.map(children, (child, _) =>
        <Row>
            <Col sm={columnSize}>
                {child}
            </Col>
        </Row>
    )
};

export default VerticalLayout;