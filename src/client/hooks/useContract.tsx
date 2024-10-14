import {
  Account,
  AccountAddress,
  AccountAuthenticator,
  Aptos,
  AptosConfig,
  Deserializer,
  Ed25519PrivateKey,
  KeylessAccount,
  Network,
  PendingTransactionResponse,
  SimpleTransaction,
  UserTransactionResponse,
} from "@aptos-labs/ts-sdk";
import { useContext, useState } from "react";
import { MODULE_ADDRESS } from "../utils/Var";
// import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { fromB64, toB64 } from "../utils/HelperFunctions";
import axios from "axios";
import AuthContext from "../contexts/AuthProvider";
import { getLocalKeylessAccount } from "../keyless";

interface useContractProps {
  functionName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  functionArgs: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess?: (result: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError?: (error: any) => void;
  onFinally?: () => void;
}

const ADMIN_PRIVATE_KEY = import.meta.env.VITE_SECRET_ADMIN_KEY;

const useContract = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const auth = useContext(AuthContext);
  const keylessAccount = getLocalKeylessAccount();
  const aptosConfig = new AptosConfig({
    network: Network.TESTNET,
  });
  const aptos = new Aptos(aptosConfig);

  const callContract = async ({
    functionName,
    functionArgs,
    onSuccess,
    onError,
    onFinally,
  }: useContractProps) => {
    if (!keylessAccount) return;

    try {
      setLoading(true);
      setError(null);

      const pendingTxResponse =
        // await keylessTxBEBuildFESubmit(message, keylessAccount);
        await keylessTxFEBuildBESubmit(
          functionName,
          functionArgs,
          keylessAccount
        );

      let executedTransaction = null;

      if (pendingTxResponse?.hash) {
        executedTransaction = await waitForTxAndUpdateResult(
          pendingTxResponse.hash
        );
      } else {
        console.log("Unable to find a tx digest to search for.");
      }

      if (onSuccess) {
        onSuccess(executedTransaction);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      if (error.status === 400) {
        window.location.reload();
      }
      setError(error.toString());
      if (onError) {
        onError(error);
      }
    } finally {
      setLoading(false);
      if (onFinally) {
        onFinally();
      }
    }
  };

  const callAdminContract = async ({
    functionName,
    functionArgs,
    onSuccess,
    onError,
    onFinally,
  }: useContractProps) => {

    const privateKey = new Ed25519PrivateKey(ADMIN_PRIVATE_KEY);
    const adminAccount = Account.fromPrivateKey({ privateKey });
    if (!adminAccount) return;
    try {
      setLoading(true);
      setError(null);
      console.log(adminAccount.accountAddress.toString());
      //create txn
      const txn = await aptos.transaction.build.simple({
        sender: adminAccount.accountAddress,
        data: {
          function: `${MODULE_ADDRESS}::gamev1::${functionName}`,
          functionArguments: functionArgs,
        },
        withFeePayer: true,
      });
      
      const adminSenderAuthenticator = await aptos.signAsFeePayer({
        signer: adminAccount,
        transaction: txn,
      });

      const pendingTransaction = await aptos.transaction.submit.simple({
        transaction: txn,
        feePayerAuthenticator: adminSenderAuthenticator,
        senderAuthenticator: adminSenderAuthenticator,
      });

      const executedTransaction = await aptos.waitForTransaction({
        transactionHash: pendingTransaction.hash,
      });

      console.log("Executed Transaction:", executedTransaction);
      if (onSuccess) {
        onSuccess(executedTransaction);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      if (error.status === 400) {
        window.location.reload();
      }
      setError(error.toString());
      if (onError) {
        onError(error);
      }
    } finally {
      setLoading(false);
      if (onFinally) {
        onFinally();
      }
    }
  };

  const keylessTxFEBuildBESubmit = async (
    functionName: string,
    functionArgs: any[],
    keylessAccount: KeylessAccount
  ): Promise<PendingTransactionResponse> => {
    // Step 1. Build a feePayer tx with the user's input
    const simpleTx = await buildSimpleMoveCallTransaction(
      keylessAccount.accountAddress,
      functionName,
      functionArgs
    );

    // Step 2. Sign the transaction with the user's KeylessAccount
    const senderSig = aptos.sign({
      signer: keylessAccount,
      transaction: simpleTx,
    });

    // Step 3. Ask the BE to sponsor and submit the transaction
    const pendingTx = await axios.post("/sponsorAndSubmitTx", {
      transaction: simpleTx.bcsToHex().toString(),
      senderAuth: senderSig.bcsToHex().toString(),
    });

    return pendingTx.data.pendingTx;
  };

  async function buildSimpleMoveCallTransaction(
    sender: AccountAddress,
    functionName: string,
    functionArgs: any[]
  ): Promise<SimpleTransaction> {
    return await aptos.transaction.build.simple({
      sender: sender,
      withFeePayer: true,
      data: {
        function: `${MODULE_ADDRESS}::gamev1::${functionName}`,
        functionArguments: functionArgs,
      },
    });
  }

  const waitForTxAndUpdateResult = async (txHash: string) => {
    console.log("transaction: ", txHash);
    const executedTransaction = (await aptos.waitForTransaction({
      transactionHash: txHash,
    })) as UserTransactionResponse;

    return executedTransaction;

    // if (executedTransaction.success) {
    //   for (var element in executedTransaction.events) {
    //     if (executedTransaction.events[element].type == EVENT_TYPE) {
    //       setLatestResult(executedTransaction.events[element].data.to_message);
    //     }
    //   }
    //   setLatestDigest(txHash);
    //   setnewSuccessfulResult(true);
    // } else {
    //   console.log("Transaction did not execute successfully.");
    // }
  };

  return { callContract, callAdminContract, loading, error };
};

export default useContract;
