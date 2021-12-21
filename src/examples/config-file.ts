import path from "path";
import wallet from "../../fixtures/config/wallet/wallet.json";
import { getForms } from "../utils/utils";

const dirFormsV2 = path.join(__dirname, "../../fixtures/config/forms/v2");
const documentFormsV2 = getForms(dirFormsV2);
const dirFormsV3 = path.join(__dirname, "../../fixtures/config/forms/v3");
const documentFormsV3 = getForms(dirFormsV3);

const walletConfig = {
  type: "ENCRYPTED_JSON",
  encryptedJson: JSON.stringify(wallet),
};

export const configFileV2 = {
  network: "ropsten",
  wallet: walletConfig,
  documentStorage: {
    apiKey: "randomKey",
    url: "https://api-ropsten.tradetrust.io/storage",
  },
  forms: [...documentFormsV2],
};

export const configFileV3 = {
  network: "ropsten",
  wallet: walletConfig,
  documentStorage: {
    apiKey: "randomKey",
    url: "https://api-ropsten.tradetrust.io/storage",
  },
  forms: [...documentFormsV3],
};

export const ConfigMinimumExampleV2 = {
  network: "ropsten",
  wallet: walletConfig,
  forms: [
    {
      name: "Foobar",
      type: "VERIFIABLE_DOCUMENT",
      defaults: {
        $template: {
          type: "EMBEDDED_RENDERER",
          name: "INVOICE",
          url: "https://example.com",
        },
        issuers: [
          {
            name: "Hello world",
            documentStore: "0x123",
            identityProof: {
              type: "DNS-TXT",
              location: "foobar.xyz",
            },
          },
        ],
      },
      schema: {},
      uiSchema: {},
    },
  ],
};

export const ConfigMinimumExampleV3 = {
  network: "ropsten",
  wallet: walletConfig,
  forms: [
    {
      name: "Foobar",
      type: "VERIFIABLE_DOCUMENT",
      defaults: {
        version: "https://example.com/3.0/schema.json",
        "@context": [
          "https://www.w3.org/2018/credentials/v1",
          "https://schemata.openattestation.com/com/openattestation/1.0/OpenAttestation.v3.json",
          "https://example.com/1.0/foobar.json",
        ],
        type: ["VerifiableCredential", "OpenAttestationCredential"],
        issuanceDate: "2010-01-01T19:23:24Z",
        openAttestationMetadata: {
          template: {
            type: "EMBEDDED_RENDERER",
            name: "INVOICE",
            url: "https://example.com",
          },
          proof: {
            type: "OpenAttestationProofMethod",
            method: "DOCUMENT_STORE",
            value: "123",
          },
          identityProof: {
            type: "DNS-TXT",
            identifier: "foobar.xyz",
          },
        },
        credentialSubject: {},
      },
      schema: {},
      uiSchema: {},
    },
  ],
};

export const ErrorNoWallet = {
  ...ConfigMinimumExampleV2,
  wallet: "",
};

export const ErrorUri = {
  ...ConfigMinimumExampleV2,
  documentStorage: {
    apiKey: "randomKey",
    url: "123", // handles "format": "uri"
  },
};

export const ErrorHostname = {
  ...ConfigMinimumExampleV2,
  forms: [
    {
      ...ConfigMinimumExampleV2.forms[0],
      defaults: {
        ...ConfigMinimumExampleV2.forms[0].defaults,
        issuers: [
          {
            ...ConfigMinimumExampleV2.forms[0].defaults.issuers[0],
            identityProof: {
              type: "DNS-TXT",
              location: "https://example.com", // handles "format": "hostname"
            },
          },
        ],
      },
    },
  ],
};
