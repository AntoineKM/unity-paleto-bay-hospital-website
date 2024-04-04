import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

import { env } from "../../../env.mjs";

export const serviceAccountAuth = new JWT({
  email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: env.GOOGLE_PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export const membersDoc = new GoogleSpreadsheet(
  "1MQYvEMPmfVaBVVEFkeMjj8mv2T7SWnDhBjsZ6mBqB1o",
  serviceAccountAuth,
);
