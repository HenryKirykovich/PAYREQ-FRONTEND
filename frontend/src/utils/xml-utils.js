export function parse(s) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(s, "application/xml");
    const errorNode = doc.querySelector("parsererror");
    if (errorNode) {
        console.error("Error parsing XML:", errorNode);
        return null;
    } else {
        console.log("Parsed XML document:", doc.documentElement.nodeName);
    }
    return doc;
}

const XML_NSES = {
    "cac": "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2",
    "cbc": "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2",
    "ubl-credit-note-2": "urn:oasis:names:specification:ubl:schema:xsd:CreditNote-2",
    "ubl-invoice-2": "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2",
    "sbdh": "http://www.unece.org/cefact/namespaces/StandardBusinessDocumentHeader",
};

function nsResolver(alias) {
    return XML_NSES[alias] || null;
}

export function q(contextNode, xpathExpression, resultType = XPathResult.ANY_TYPE) {
    const doc = contextNode.ownerDocument || contextNode;
    return doc.evaluate(
        xpathExpression,
        contextNode,
        nsResolver,
        resultType,
        null
    );
}

export function node(contextNode, xpathExpression) {
    return q(contextNode, xpathExpression, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
}

export function nodes(contextNode, xpathExpression) {
    let result = [];
    let iter = q(contextNode, xpathExpression, XPathResult.ORDERED_NODE_ITERATOR_TYPE);
    let item = iter.iterateNext();
    while (item) {
        result.push(item);
        item = iter.iterateNext();
    }    
    return result;
}

export function text(contextNode, xpathExpression) {
    return q(contextNode, xpathExpression, XPathResult.STRING_TYPE).stringValue;
}

export function number(contextNode, xpathExpression) {
    return q(contextNode, xpathExpression, XPathResult.NUMBER_TYPE).numberValue;
}
