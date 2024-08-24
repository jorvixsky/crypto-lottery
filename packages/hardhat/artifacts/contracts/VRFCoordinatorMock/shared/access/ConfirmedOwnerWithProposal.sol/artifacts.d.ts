// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import "hardhat/types/artifacts";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";

import { ConfirmedOwnerWithProposal$Type } from "./ConfirmedOwnerWithProposal";

declare module "hardhat/types/artifacts" {
  interface ArtifactsMap {
    ["ConfirmedOwnerWithProposal"]: ConfirmedOwnerWithProposal$Type;
    ["contracts/VRFCoordinatorMock/shared/access/ConfirmedOwnerWithProposal.sol:ConfirmedOwnerWithProposal"]: ConfirmedOwnerWithProposal$Type;
  }

  interface ContractTypesMap {
    ["ConfirmedOwnerWithProposal"]: GetContractReturnType<ConfirmedOwnerWithProposal$Type["abi"]>;
    ["contracts/VRFCoordinatorMock/shared/access/ConfirmedOwnerWithProposal.sol:ConfirmedOwnerWithProposal"]: GetContractReturnType<ConfirmedOwnerWithProposal$Type["abi"]>;
  }
}
