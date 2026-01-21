
export const PERMISSIONS = {
    mailUpload: "bills.upload.multi",
    mailApprove: "bills.review-by-biller.approve",
    mailReject: "bills.review-by-biller.reject"
}

export const hasPermission = (biller, permission) => {
    return biller.permissions.includes(permission);
}
