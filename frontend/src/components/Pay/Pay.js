import React, {useEffect, useState} from "react";
import PayForm from "./PayForm";
import Loading from "../Loading";
import axios from "axios/index";
import { PageHeading, RegularText } from "../common";
import VerticalLayout from "../common/layout/VerticalLayout";
import styles from "./Pay.module.scss"

export const getPayBiller = (payKey, setBiller, setError) => {
    const language = localStorage.getItem("language");
    axios.get(`/p/${payKey}`, {params: {language: language}, localErrorHandling: true})
        .then(({data}) => {
            if (data.success) {
                setBiller(data.biller);
            } else {
                setError("Failed to load biller information");
            }
        })
        .catch(error => {
            console.error("Error fetching biller info:", error);
            setError("Failed to load biller information");
        });
};

const Pay = ({payKey}) => {
    const [biller, setBiller] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPayBiller(
            payKey, 
            (billerData) => {
                setBiller(billerData);
                setLoading(false);
            },
            (errorMsg) => {
                setError(errorMsg);
                setLoading(false);
            }
        );
    }, [payKey]);

    if (loading) return <Loading/>;
    
    if (error) {
        return (
            <div className="alert alert-danger">
                {error}
            </div>
        );
    }

  return <div className={styles.container}>
           <VerticalLayout>
             <img className={styles.logo} src={biller.logoPath} alt={biller.tagName}/>
             <PageHeading text={biller.payHeading || "pay.heading"} values={{tagName: biller.tagName}}/>
             {biller.paySubHeading && <RegularText text={biller.paySubHeading} data-testid="pay-subheading"/>}
             <div className={styles.wrapper}>
               <PayForm biller={biller} />
             </div>
           </VerticalLayout>
         </div>;
};

export default Pay;
