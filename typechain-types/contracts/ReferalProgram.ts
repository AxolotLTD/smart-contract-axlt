/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export interface ReferalProgramInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "activateAndBindSponsor"
      | "activeAccounts"
      | "additionToLiquidity"
      | "axltContractAddress"
      | "balanceOfNonPayable"
      | "balanceOfPayable"
      | "buyLine"
      | "getPriceLine"
      | "nonPayableBalance"
      | "owner"
      | "payableBalance"
      | "renounceOwnership"
      | "sponsorMap"
      | "totalLiquidity"
      | "transferOwnership"
      | "userLine"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "ActivateAccount"
      | "AddToLiquidity"
      | "BindSponsor"
      | "BuyLine"
      | "OwnershipTransferred"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "activateAndBindSponsor",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "activeAccounts",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "additionToLiquidity",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "axltContractAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOfNonPayable",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOfPayable",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "buyLine", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getPriceLine",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "nonPayableBalance",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "payableBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "sponsorMap",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "totalLiquidity",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "userLine",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "activateAndBindSponsor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "activeAccounts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "additionToLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "axltContractAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "balanceOfNonPayable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "balanceOfPayable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "buyLine", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getPriceLine",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "nonPayableBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "payableBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "sponsorMap", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "userLine", data: BytesLike): Result;
}

export namespace ActivateAccountEvent {
  export type InputTuple = [account: AddressLike];
  export type OutputTuple = [account: string];
  export interface OutputObject {
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace AddToLiquidityEvent {
  export type InputTuple = [recipient: AddressLike, amount: BigNumberish];
  export type OutputTuple = [recipient: string, amount: bigint];
  export interface OutputObject {
    recipient: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace BindSponsorEvent {
  export type InputTuple = [child: AddressLike, sponsor: AddressLike];
  export type OutputTuple = [child: string, sponsor: string];
  export interface OutputObject {
    child: string;
    sponsor: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace BuyLineEvent {
  export type InputTuple = [recipient: AddressLike, lineLevel: BigNumberish];
  export type OutputTuple = [recipient: string, lineLevel: bigint];
  export interface OutputObject {
    recipient: string;
    lineLevel: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface ReferalProgram extends BaseContract {
  connect(runner?: ContractRunner | null): ReferalProgram;
  waitForDeployment(): Promise<this>;

  interface: ReferalProgramInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  activateAndBindSponsor: TypedContractMethod<
    [sponsor: AddressLike],
    [void],
    "nonpayable"
  >;

  activeAccounts: TypedContractMethod<[arg0: AddressLike], [boolean], "view">;

  additionToLiquidity: TypedContractMethod<
    [amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  axltContractAddress: TypedContractMethod<[], [string], "view">;

  balanceOfNonPayable: TypedContractMethod<[], [bigint], "view">;

  balanceOfPayable: TypedContractMethod<[], [bigint], "view">;

  buyLine: TypedContractMethod<[], [boolean], "nonpayable">;

  getPriceLine: TypedContractMethod<
    [lineNumber: BigNumberish],
    [bigint],
    "view"
  >;

  nonPayableBalance: TypedContractMethod<[], [bigint], "view">;

  owner: TypedContractMethod<[], [string], "view">;

  payableBalance: TypedContractMethod<[], [bigint], "view">;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  sponsorMap: TypedContractMethod<[arg0: AddressLike], [string], "view">;

  totalLiquidity: TypedContractMethod<[], [bigint], "view">;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  userLine: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "activateAndBindSponsor"
  ): TypedContractMethod<[sponsor: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "activeAccounts"
  ): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "additionToLiquidity"
  ): TypedContractMethod<[amount: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "axltContractAddress"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "balanceOfNonPayable"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "balanceOfPayable"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "buyLine"
  ): TypedContractMethod<[], [boolean], "nonpayable">;
  getFunction(
    nameOrSignature: "getPriceLine"
  ): TypedContractMethod<[lineNumber: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "nonPayableBalance"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "payableBalance"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "sponsorMap"
  ): TypedContractMethod<[arg0: AddressLike], [string], "view">;
  getFunction(
    nameOrSignature: "totalLiquidity"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "userLine"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  getEvent(
    key: "ActivateAccount"
  ): TypedContractEvent<
    ActivateAccountEvent.InputTuple,
    ActivateAccountEvent.OutputTuple,
    ActivateAccountEvent.OutputObject
  >;
  getEvent(
    key: "AddToLiquidity"
  ): TypedContractEvent<
    AddToLiquidityEvent.InputTuple,
    AddToLiquidityEvent.OutputTuple,
    AddToLiquidityEvent.OutputObject
  >;
  getEvent(
    key: "BindSponsor"
  ): TypedContractEvent<
    BindSponsorEvent.InputTuple,
    BindSponsorEvent.OutputTuple,
    BindSponsorEvent.OutputObject
  >;
  getEvent(
    key: "BuyLine"
  ): TypedContractEvent<
    BuyLineEvent.InputTuple,
    BuyLineEvent.OutputTuple,
    BuyLineEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;

  filters: {
    "ActivateAccount(address)": TypedContractEvent<
      ActivateAccountEvent.InputTuple,
      ActivateAccountEvent.OutputTuple,
      ActivateAccountEvent.OutputObject
    >;
    ActivateAccount: TypedContractEvent<
      ActivateAccountEvent.InputTuple,
      ActivateAccountEvent.OutputTuple,
      ActivateAccountEvent.OutputObject
    >;

    "AddToLiquidity(address,uint256)": TypedContractEvent<
      AddToLiquidityEvent.InputTuple,
      AddToLiquidityEvent.OutputTuple,
      AddToLiquidityEvent.OutputObject
    >;
    AddToLiquidity: TypedContractEvent<
      AddToLiquidityEvent.InputTuple,
      AddToLiquidityEvent.OutputTuple,
      AddToLiquidityEvent.OutputObject
    >;

    "BindSponsor(address,address)": TypedContractEvent<
      BindSponsorEvent.InputTuple,
      BindSponsorEvent.OutputTuple,
      BindSponsorEvent.OutputObject
    >;
    BindSponsor: TypedContractEvent<
      BindSponsorEvent.InputTuple,
      BindSponsorEvent.OutputTuple,
      BindSponsorEvent.OutputObject
    >;

    "BuyLine(address,uint256)": TypedContractEvent<
      BuyLineEvent.InputTuple,
      BuyLineEvent.OutputTuple,
      BuyLineEvent.OutputObject
    >;
    BuyLine: TypedContractEvent<
      BuyLineEvent.InputTuple,
      BuyLineEvent.OutputTuple,
      BuyLineEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
  };
}
