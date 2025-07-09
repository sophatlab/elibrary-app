import '../style/main.css';
import { Navigation } from "./navigation.js";
import { Sidebar } from "./sidebar.js";

export const initializeLayout = () => {

    // Initialize navigation
    new Navigation();

    // Initialize sidebar
    new Sidebar()
}