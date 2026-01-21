import React from "react";
import * as QueryString from "query-string"

export function withProps(Component, props) {
    return function (matchProps) {
        return <Component {...props} {...matchProps} />
    }
}
export function buildEmberHref(emberLink, billerId) {
    const path = emberLink.replace("biller.", "").replace(/\./g, "/");
    return `/customer#/biller/${billerId}/${path}`
};

export const isBiller = biller => biller.systemId !== "incoming-invoice";

export const isPayer = biller => biller.systemId === "incoming-invoice";

export const isMyPayer = biller => isBiller(biller) && biller.masterId;

export const getQueryParams = location => QueryString.parse(location.search);