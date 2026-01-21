import React from "react";
import {Formik} from "formik";
import axios from "axios";
import {withRouter} from "react-router-dom";

import {SET_ALERT} from "../../state/reducers/alertReducer";
import {useAppState} from "../../state";
import {Modal, PrimaryButton, Select, TextInput} from "../common";
import * as Yup from "yup";


const updateExpiry = (billerId, id, values, history, dispatch) => {
    axios.put(`/data/cards/${billerId}/${id}`,
        values)
        .then(({data}) => {
            if (data.success) {
                dispatch({type: SET_ALERT, alert: {level: "success", text: "cards.updateExpiry.success"}});
                history.push("../cards");
            }
        });
};

const schema = Yup.object().shape({
    expireYear: Yup.number()
        .required("forms.generic.required.label")
        .typeError("forms.generic.number.validation.label")
        .min(new Date().getFullYear(), "cards.updateExpiry.year.futureYearValidation")
        .integer(),
});

const MONTH_DROPDOWN_VALUES = [
    {value: "1", label: "1"},
    {value: "2", label: "2"},
    {value: "3", label: "3"},
    {value: "4", label: "4"},
    {value: "5", label: "5"},
    {value: "6", label: "6"},
    {value: "7", label: "7"},
    {value: "8", label: "8"},
    {value: "9", label: "9"},
    {value: "10", label: "10"},
    {value: "11", label: "11"},
    {value: "12", label: "12"}
];

const UpdateExpiryModal =
    ({billerId, show, onCancel, card, history}) => {
        const [, dispatch] = useAppState();
        if (!show) {
            return null;
        }
        return (
            <Formik
                initialValues={{
                    expireMonth: "" + card.expireMonth,
                    expireYear: "" + card.expireYear
                }}
                validationSchema={schema}
                onSubmit={(values) => updateExpiry(billerId, card.id, values, history, dispatch)}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleSubmit
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <Modal show={show}
                               title="cards.updateExpiry.heading"
                               buttonLabel="forms.generic.save.button"
                               onCancel={onCancel}
                               onPrimaryAction={handleSubmit}
                               PrimaryButtonComponent={PrimaryButton}
                        >
                            <Select name="expireMonth"
                                    label="cards.updateExpiry.month"
                                    placeholder="cards.updateExpiry.month"
                                    options={MONTH_DROPDOWN_VALUES}
                                    value={values.expireMonth}
                                    onChange={handleChange}
                                    error={errors.expireMonth}
                                    touched={touched.expireMonth}
                            />
                            <TextInput name="expireYear"
                                       label="cards.updateExpiry.year"
                                       type="number"
                                       value={values.expireYear}
                                       onChange={handleChange}
                                       error={errors.expireYear}
                                       touched={touched.expireYear}
                            />

                        </Modal>
                    </form>
                )}
            </Formik>

        )
    };

export default withRouter(UpdateExpiryModal);