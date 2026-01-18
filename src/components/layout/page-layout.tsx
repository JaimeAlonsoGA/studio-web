import React from "react";
import { Outlet } from "react-router-dom";
import { PageContent } from "./page-content";
import Header from "./header";

const PageLayout = () => {
    return (
        <React.Fragment>
            <Header />
            <PageContent>
                <Outlet />
            </PageContent>
        </React.Fragment>
    );
};

export default PageLayout;