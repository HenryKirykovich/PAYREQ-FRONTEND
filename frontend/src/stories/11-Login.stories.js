import React from 'react';

import LoginView from "../components/Login/LoginView";
import VerifyDeviceView from "../components/Login/VerifyDevice/VerifyDeviceView";
import MfaSetupView from "../components/Login/MfaSetup/MfaSetupView";
import MfaView from "../components/Login/Mfa/MfaView";
import VerifyAccountView from "../components/VerifyAccount/VerifyAccountView";
import ForgotPassword from "../components/Login/ForgotPassword/ForgotPassword";
import ForgotPasswordSuccess from "../components/Login/ForgotPassword/ForgotPasswordSuccess";


export default {
    title: 'Login',
};

/*nothing submitted to form*/
export const loginOptions = () => <LoginView serverErrors={[]}/>

const newUser = {"success": true, "userexists": false}

const checkUserStatus = (status) => {
    return status === false ? true : false
}
export const createAccount = () => {
    return <LoginView showCreateAccountMessage={checkUserStatus(newUser.userexists)} serverErrors={[]}/>
}

const currentUser = {"success": true, "userexists": true}

export const verifyPassword = () => {
    return <LoginView username={"anna.nguyen@payreq.com"}
                      showCreateAccountMessage={checkUserStatus(currentUser.userexists)} serverErrors={[]}/>
}

const verifyEmail = {"username":"thitest123+123@yahoo.com","companyId":118750};

export const verifyAccountView = () => <VerifyAccountView username={verifyEmail.username} showResent={false}
                                                    showMaxResends={false}/>

const resentEmail = {"success":true};

export const resendVerificationEmailSuccess = () => <VerifyAccountView username={verifyEmail.username} showResent={resentEmail.success}/>

const maxResendEmail = {"success":false,"error":"Maximum number of re-sends have been reached. Please contact Payreq Support."}

const checkError = (error) =>{
    return !error ? false : true;
}

export const resendVerificationEmailMaxed = () => <VerifyAccountView username={verifyEmail.username} showResent={false}
                                                          showMaxResends={checkError(maxResendEmail.error)}/>

export const verifyDevice = () => <VerifyDeviceView username={"anna.nguyen@payreq.com"} serverError={[]}/>

const AuthenticatorApp = {
    "success": true,
    "qrcode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6AQAAAACgl2eQAAACLElEQVR42u2ZMY6DQBAEBzkg5An8BD6GhCU+hn+yTyDcwGKuu5fTeWXrgksY6SDAayhLHtTT016b/36sdgEXcAH/GjAcvTXbLbV7t6Q82MRLcyigdX8C4Gnonn0et6l334IBq019u3aeWIq3O95iFRBAAfc+NyhAp5gAXu/WPjazbBYRoB7wgG9eShnx9l0wJwPqLBQw/Zw+tN7JgA72k6G9Fl6dP5jYyYCNm/W+d1xjBaPylKsyAwC5IXUY6dNgpFKGhwJoSobTnAx6FZD0oVhAR+WiAHz3BW6A9mofwQA1fWmqvYNRURSHcgMBxqfcOCg4U7IB9zihQgFOU6KbGjx0STD/udZDBAD3EI7oUThhuNPowwGuyEHRFj2sePb5dW5GAGiarAJNb/RQtddrZ0UA9LVRyo1ZTm51w4QKBqizfJVR4Z6aivWEArICeyOPAvIdQ+ZQAHNHclfnl7k50/w9FJDl9lgkf2huQrnta0yKAByPFUafGTS1qqqIAbjsCVlTHkXzr+ZmCGDFPaNHsZ6kmFRXEQCgChg5MJIoX2WlOttHAFY4kyuwc7g7s5y/tn8EQCNTV7BSqqN2K6c9H/AjhnCu06M41230WIB+80IKKkXK5e5BMKDsaHEfC4HYykOvUnEIoGwWcRCx8516qOZmGEBZjqI17cPUsTkMMHCDVe0vt/dogPRgJb8zi+BHhr8L5lzg2NEqOzITfL8TP4cCrj84LuACLuAvwBfGVAuKvWfJvQAAAABJRU5ErkJggg==",
    "code": "XXXXXXXX"
}
export const mfaSetup = () => <MfaSetupView mfaCodeData={AuthenticatorApp}/>

export const mfa = () => <MfaView serverError={[]}/>

export const forgotPassword = () => <ForgotPassword/>

export const forgotPasswordSuccess = () => <ForgotPasswordSuccess/>
