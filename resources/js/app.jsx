import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const appName = import.meta.env.VITE_APP_NAME || 'Coding Time';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <>
            <App {...props} />
            <ToastContainer />
            </>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
