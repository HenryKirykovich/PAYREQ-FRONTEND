import { usePresentation } from "../state";

export default function MobileAppUI({ children }) {
    const { isMobileApp } = usePresentation();
    if (!isMobileApp) {
        return null;
    }
    return children;
}
