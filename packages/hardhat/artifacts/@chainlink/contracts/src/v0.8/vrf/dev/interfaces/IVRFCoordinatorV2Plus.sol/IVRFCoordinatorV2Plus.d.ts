// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import type { Address } from "viem";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";
import "@nomicfoundation/hardhat-viem/types";

export interface IVRFCoordinatorV2Plus$Type {
  "_format": "hh-sol-artifact-1",
  "contractName": "IVRFCoordinatorV2Plus",
  "sourceName": "@chainlink/contracts/src/v0.8/vrf/dev/interfaces/IVRFCoordinatorV2Plus.sol",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "subId",
          "type": "uint256"
        }
      ],
      "name": "acceptSubscriptionOwnerTransfer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "subId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "consumer",
          "type": "address"
        }
      ],
      "name": "addConsumer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "subId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "cancelSubscription",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "createSubscription",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "subId",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "subId",
          "type": "uint256"
        }
      ],
      "name": "fundSubscriptionWithNative",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "startIndex",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "maxCount",
          "type": "uint256"
        }
      ],
      "name": "getActiveSubscriptionIds",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "subId",
          "type": "uint256"
        }
      ],
      "name": "getSubscription",
      "outputs": [
        {
          "internalType": "uint96",
          "name": "balance",
          "type": "uint96"
        },
        {
          "internalType": "uint96",
          "name": "nativeBalance",
          "type": "uint96"
        },
        {
          "internalType": "uint64",
          "name": "reqCount",
          "type": "uint64"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address[]",
          "name": "consumers",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "subId",
          "type": "uint256"
        }
      ],
      "name": "pendingRequestExists",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "subId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "consumer",
          "type": "address"
        }
      ],
      "name": "removeConsumer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "keyHash",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "subId",
              "type": "uint256"
            },
            {
              "internalType": "uint16",
              "name": "requestConfirmations",
              "type": "uint16"
            },
            {
              "internalType": "uint32",
              "name": "callbackGasLimit",
              "type": "uint32"
            },
            {
              "internalType": "uint32",
              "name": "numWords",
              "type": "uint32"
            },
            {
              "internalType": "bytes",
              "name": "extraArgs",
              "type": "bytes"
            }
          ],
          "internalType": "struct VRFV2PlusClient.RandomWordsRequest",
          "name": "req",
          "type": "tuple"
        }
      ],
      "name": "requestRandomWords",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "requestId",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "subId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "requestSubscriptionOwnerTransfer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "linkReferences": {},
  "deployedLinkReferences": {}
}

declare module "@nomicfoundation/hardhat-viem/types" {
  export function deployContract(
    contractName: "@chainlink/contracts/src/v0.8/vrf/dev/interfaces/IVRFCoordinatorV2Plus.sol:IVRFCoordinatorV2Plus",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<IVRFCoordinatorV2Plus$Type["abi"]>>;

  export function sendDeploymentTransaction(
    contractName: "@chainlink/contracts/src/v0.8/vrf/dev/interfaces/IVRFCoordinatorV2Plus.sol:IVRFCoordinatorV2Plus",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<IVRFCoordinatorV2Plus$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;

  export function getContractAt(
    contractName: "@chainlink/contracts/src/v0.8/vrf/dev/interfaces/IVRFCoordinatorV2Plus.sol:IVRFCoordinatorV2Plus",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<IVRFCoordinatorV2Plus$Type["abi"]>>;
}
