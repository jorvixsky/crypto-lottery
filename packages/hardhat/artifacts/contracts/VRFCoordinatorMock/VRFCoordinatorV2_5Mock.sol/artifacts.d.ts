// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import "hardhat/types/artifacts";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";

import { VRFCoordinatorV2_5Mock$Type } from "./VRFCoordinatorV2_5Mock";

declare module "hardhat/types/artifacts" {
  interface ArtifactsMap {
    ["VRFCoordinatorV2_5Mock"]: VRFCoordinatorV2_5Mock$Type;
    ["contracts/VRFCoordinatorMock/VRFCoordinatorV2_5Mock.sol:VRFCoordinatorV2_5Mock"]: VRFCoordinatorV2_5Mock$Type;
  }

  interface ContractTypesMap {
    ["VRFCoordinatorV2_5Mock"]: GetContractReturnType<VRFCoordinatorV2_5Mock$Type["abi"]>;
    ["contracts/VRFCoordinatorMock/VRFCoordinatorV2_5Mock.sol:VRFCoordinatorV2_5Mock"]: GetContractReturnType<VRFCoordinatorV2_5Mock$Type["abi"]>;
  }
}
