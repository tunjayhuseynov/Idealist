import Layout from "components/Layout";
import Head from "next/head";
import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import "dist/main.css";
import ErrorBoundary from "components/ErrorBoundary";

const MyApp = ({ Component, pageProps }: any) => (
    <>
        <Head>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
            />
        </Head>
        <ErrorBoundary>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ErrorBoundary>
        <ToastContainer />
    </>
);

export default MyApp;