import {switchLanguage} from "./language-utils";

export const goToLoginPath = (context) => {
    switchLanguage(context.language);

    //When there is a previous path go there as long as the path doesn't end with undefined
    //Weirdly the perviousPath is set to customer#undefined when an emberjs screen times out
    const previousPath = sessionStorage.getItem('previousPath');
    if (previousPath && !previousPath.endsWith('undefined')){
        sessionStorage.removeItem('previousPath');
        window.location.href = previousPath;
        return  null;
    }

    //when one account take the the starting path for that account
    if (context.accountId && context.accountIsMybills){
        window.location.href = '/portal/customer/biller/'+ context.accountId +'/dashboard';
        return  null;
    }

    if (context.accountId && !context.accountIsMybills){
        window.location.href =  '/portal/customer/biller/'+ context.accountId +'/admin-dashboard';
        return null;
    }

    //let the user select their account
    window.location.href =  '/portal/customer/profile/accounts';
    //must return null or while the window location is updating, you'll set the URL path render by the react component
    return null;
}
