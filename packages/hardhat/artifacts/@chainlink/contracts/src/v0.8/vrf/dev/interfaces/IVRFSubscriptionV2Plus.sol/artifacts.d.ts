// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import "hardhat/types/artifacts";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";

import { IVRFSubscriptionV2Plus$Type } from "./IVRFSubscriptionV2Plus";

declare module "hardhat/types/artifacts" {
  interface ArtifactsMap {
    ["IVRFSubscriptionV2Plus"]: IVRFSubscriptionV2Plus$Type;
    ["@chainlink/contracts/src/v0.8/vrf/dev/interfaces/IVRFSubscriptionV2Plus.sol:IVRFSubscriptionV2Plus"]: IVRFSubscriptionV2Plus$Type;
  }

  interface ContractTypesMap {
    ["IVRFSubscriptionV2Plus"]: GetContractReturnType<IVRFSubscriptionV2Plus$Type["abi"]>;
    ["@chainlink/contracts/src/v0.8/vrf/dev/interfaces/IVRFSubscriptionV2Plus.sol:IVRFSubscriptionV2Plus"]: GetContractReturnType<IVRFSubscriptionV2Plus$Type["abi"]>;
  }
}
