import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

class MyDocument extends Document {


    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;