import { usePresentation } from "../state";

export default function BrowserUI({ children }) {
    const { isMobileApp } = usePresentation();
    if (isMobileApp) {
        return null;
    }
    return children;
}
