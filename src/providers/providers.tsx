import React from 'react';
import { BrowserRouter } from 'react-router';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    );
}