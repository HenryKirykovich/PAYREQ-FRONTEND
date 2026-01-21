import React from 'react';
import {
    PrimaryButton,
    SecondaryButton,
    LinkButton,
    RegularText,
    LargeText,
    PageHeading,
    SecondaryHeading,
    DangerButton,
    DefaultButton
} from "../components/common";
import Loading from "../components/Loading";
import FieldGroup from "../components/common/FieldGroup";

export default {
    title: "Common",
};

export const primaryButton = () => (
    <div>
        <PrimaryButton label="Button" onClick={() => alert("Clicked")}/>
        <br/>
        <br/>
        <PrimaryButton icon="plus" label="With icon" onClick={() => alert("Clicked")}/>
        <br/>
        <br/>
        <PrimaryButton label="Button submitting" isSubmitting={true}/>
        <br/>
        <br/>
        <PrimaryButton label="Button disabled" disabled={true}/>
    </div>
);

export const secondaryButton = () => (
    <div>
        <SecondaryButton label="Button" onClick={() => alert("Clicked")}/>
        <br/>
        <br/>
        <SecondaryButton icon="menu-left" label="Button with icon" onClick={() => alert("Clicked")}/>
        <br/>
        <br/>
        <SecondaryButton label="Button disabled" disabled={true}/>
    </div>
);

export const dangerButton = () => (
    <div>
        <DangerButton label="Button"/>
        <br/>
        <br/>
        <DangerButton icon="trash" label="Button with icon" onClick={() => alert("Clicked")}/>
        <br/>
        <br/>
        <DangerButton label="Button disabled" disabled={true}/>
        <br/>
        <br/>
        <DangerButton label="Button submitting" isSubmitting={true}/>
    </div>
);

export const defaultButton = () => (
    <div>
        <DefaultButton label="Button"/>
        <br/>
        <br/>
        <DefaultButton icon="menu-left" label="Button with icon" onClick={() => alert("Clicked")}/>
        <br/>
        <br/>
        <DefaultButton label="Button disabled" disabled={true}/>
    </div>
);

export const linkButton = () => (
    <div>
        <LinkButton label="Link Button" onClick={() => alert("Clicked")}/>
        <LinkButton icon="plus" label="Link Button with icon" onClick={() => alert("Clicked")}/>
    </div>
);

export const Text = () => (
    <div>
        <RegularText text="Regular Text"/>
        <LargeText text="Large Text"/>
    </div>
);

export const Headings = () => (
    <div>
        <PageHeading text="Page Heading"/>
        <SecondaryHeading text="Secondary Heading"/>
    </div>
);

export const loading = () => <Loading />;


export const fieldGroup = () => (
    <FieldGroup fields={[
        {label: "Invoice", value: "ABC123123123"},
        {label: "From", value: "Demo Council"},
        {label: "Amount", value: "$300.00"}
    ]}/>
);
