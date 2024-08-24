// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import type { Address } from "viem";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";
import "@nomicfoundation/hardhat-viem/types";

export interface EnumerableSet$Type {
  "_format": "hh-sol-artifact-1",
  "contractName": "EnumerableSet",
  "sourceName": "contracts/VRFCoordinatorMock/shared/utils/EnumerableSet.sol",
  "abi": [],
  "bytecode": "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220c4125cbd741297a9f2ffe98e5c2ee37ada670121808024bf8e46b7306a22ad8364736f6c634300081a0033",
  "deployedBytecode": "0x73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220c4125cbd741297a9f2ffe98e5c2ee37ada670121808024bf8e46b7306a22ad8364736f6c634300081a0033",
  "linkReferences": {},
  "deployedLinkReferences": {}
}

declare module "@nomicfoundation/hardhat-viem/types" {
  export function deployContract(
    contractName: "EnumerableSet",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<EnumerableSet$Type["abi"]>>;
  export function deployContract(
    contractName: "contracts/VRFCoordinatorMock/shared/utils/EnumerableSet.sol:EnumerableSet",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<EnumerableSet$Type["abi"]>>;

  export function sendDeploymentTransaction(
    contractName: "EnumerableSet",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<EnumerableSet$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;
  export function sendDeploymentTransaction(
    contractName: "contracts/VRFCoordinatorMock/shared/utils/EnumerableSet.sol:EnumerableSet",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<EnumerableSet$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;

  export function getContractAt(
    contractName: "EnumerableSet",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<EnumerableSet$Type["abi"]>>;
  export function getContractAt(
    contractName: "contracts/VRFCoordinatorMock/shared/utils/EnumerableSet.sol:EnumerableSet",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<EnumerableSet$Type["abi"]>>;
}
