const serviceAccountProduction = require("../../firebase-production.json");
const serviceAccountDevelop = require("../../firebase-develop.json");
const serviceAccountStaging = require("../../firebase-staging.json");
const serviceAccountQa = require("../../firebase-qa.json");

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getCertFirebase = (environment: string) => {
  switch (environment) {
    case "development":
      return serviceAccountDevelop;
    case "qa":
      return serviceAccountQa;
    case "staging":
      return serviceAccountStaging;
    case "production":
      return serviceAccountProduction;
    default:
      return serviceAccountDevelop;
  }
};