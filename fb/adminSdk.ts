import admin from "firebase-admin";

let obj = {
  type: process.env.type,
  project_id: process.env.project_id,
  private_key_id: process.env.private_key_id,
  private_key: (process.env.private_key as string).replace(/\\n/g, "\n"),
  client_email: process.env.client_email,
  client_id: process.env.client_id,
  auth_uri: process.env.auth_uri,
  token_uri: process.env.token_uri,
  auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.client_x509_cert_url,
};

export const adminApp =
  admin.apps.length === 0
    ? admin.initializeApp(
        {
          credential: admin.credential.cert(obj as admin.ServiceAccount),
          databaseURL: "https://idealist-c65b6.firebaseio.com",
        },
        "admin"
      )
    : admin.app("admin");
