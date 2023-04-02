import Layout from "components/Layout";
import Head from "next/head";
import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import "dist/main.css";

const MyApp = ({ Component, pageProps }: any) => (
    <>
        <Head>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
            />
        </Head>
        <Layout>
            <Component {...pageProps} />
        </Layout>
        <ToastContainer />
    </>
);

export default MyApp;