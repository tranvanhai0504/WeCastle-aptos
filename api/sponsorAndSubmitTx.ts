import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GasStationClient } from "@shinami/clients/aptos";
import dotenvFlow from "dotenv-flow";
import {
  SimpleTransaction,
  Deserializer,
  Hex,
  AccountAuthenticator,
} from "@aptos-labs/ts-sdk";

dotenvFlow.config();
const GAS_STATION_PLUS_NODE_TESTNET_ACCESS_KEY =
  process.env.GAS_STATION_PLUS_NODE_TESTNET_ACCESS_KEY;

if (!GAS_STATION_PLUS_NODE_TESTNET_ACCESS_KEY) {
  throw Error(
    "GAS_STATION_PLUS_NODE_TESTNET_ACCESS_KEY .env.local variable not set"
  );
}

// Create Shinami clients for sponsoring transactions and for our Invisible Wallet operations.
const gasClient = new GasStationClient(
  GAS_STATION_PLUS_NODE_TESTNET_ACCESS_KEY
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Step 1: Sponsor and submit the transaction
    //          First, deserialize the SimpleTransaction and sender AccountAuthenticator sent from the FE
    const simpleTx = SimpleTransaction.deserialize(
      new Deserializer(Hex.fromHexString(req.body.transaction).toUint8Array())
    );
    const senderSig = AccountAuthenticator.deserialize(
      new Deserializer(Hex.fromHexString(req.body.senderAuth).toUint8Array())
    );
    const pendingTransaction =
      await gasClient.sponsorAndSubmitSignedTransaction(simpleTx, senderSig);

    // Step 2: Send the PendingTransactionResponse back to the FE
    res.json({
      pendingTx: pendingTransaction,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "error",
    });
  }
}
