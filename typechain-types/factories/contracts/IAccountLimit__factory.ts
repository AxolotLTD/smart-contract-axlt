/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IAccountLimit,
  IAccountLimitInterface,
} from "../../contracts/IAccountLimit";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "activateAccount",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "getActivateAccount",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IAccountLimit__factory {
  static readonly abi = _abi;
  static createInterface(): IAccountLimitInterface {
    return new Interface(_abi) as IAccountLimitInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IAccountLimit {
    return new Contract(address, _abi, runner) as unknown as IAccountLimit;
  }
}