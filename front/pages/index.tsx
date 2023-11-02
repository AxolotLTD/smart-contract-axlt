import { useEffect, useState } from "react";
import WrapperButton, { TLogs } from "../components/wrapperButton";
import { ChainEnum } from "../services/wallets/blockchainProvider";
import { MetamaskAdapter } from "../services/wallets/metamaskAdapter";
import { axltMethods } from "../utils/axltMethods";

export default function Home() {
  const metamaskWallet = new MetamaskAdapter();
  const [myLogs, setMyLogs] = useState<TLogs[]>([]);
  const [walletAddress, setWalletAddress] = useState<string>("");

  const getWalletAddress = async () => {
    const address = await metamaskWallet.getAddress();
    setWalletAddress(address);
  };

  const connectMetamask = async () => {
    await metamaskWallet.connect(ChainEnum.Ethereum);
    await getWalletAddress();
  };

  useEffect(() => {
    getWalletAddress();
  }, []);

  const {
    getIsActiveAccount,
    getUserLine,
    getRateIncrement,
    getProfitCalculation,
    // tokenForUsdt,
    priceLine,
    exchangeRate,
    countTransaction,
    getDepositLimitMap,
    getBalanceOfPayable,
    getBalanceOfNonPayable,
    getWithdrawUsdt,
    getWithdrawTokens,
    getTransferContractsOwnership,
    getBuyToken,
    getBuyLine,
    getAdditionToLiquidity,
    getActivateAndBindSponsor,
    getBalanceAxlt,
  } = new axltMethods();

  return (
    <main className={"py-10 mx-auto max-w-5xl flex flex-col gap-5"}>
      <div className={"grid grid-cols-3 text-center"}>
        <p className={"border border-solid border-black py-2"}>Input</p>
        <p className={"border border-solid border-black py-2"}>Button</p>
        <p className={"border border-solid border-black py-2"}>Result</p>
      </div>
      <WrapperButton setMyLogs={setMyLogs} onClick={connectMetamask}>
        сonnect metamask
      </WrapperButton>
      <hr />
      <WrapperButton
        setMyLogs={setMyLogs}
        withInput={true}
        placeholder="Адрес спонсора"
        onClick={(sponsorAddress) => getActivateAndBindSponsor(sponsorAddress)}
      >
        Активация аккаунта
      </WrapperButton>
      <WrapperButton
        setMyLogs={setMyLogs}
        onClick={() => getIsActiveAccount(walletAddress)}
      >
        Активирован ли аккаунт
      </WrapperButton>
      <hr />
      <WrapperButton setMyLogs={setMyLogs} onClick={() => getBuyLine()}>
        Купить линию
      </WrapperButton>
      <WrapperButton
        setMyLogs={setMyLogs}
        onClick={() => getUserLine(walletAddress)}
      >
        Моя текущая линиця
      </WrapperButton>
      <WrapperButton
        setMyLogs={setMyLogs}
        withInput={true}
        placeholder="Номер линии от 1|2|3|4|5"
        onClick={(rateLine) => priceLine(rateLine)}
      >
        Получить цену за линию
      </WrapperButton>
      <hr />
      <WrapperButton
        setMyLogs={setMyLogs}
        withInput={true}
        placeholder="amount usdt"
        onClick={(amountUsdt) => getDepositLimitMap(amountUsdt)}
      >
        Проверить разрешена покупка токенов за эту сумму USDT
      </WrapperButton>
      <WrapperButton
        setMyLogs={setMyLogs}
        withInput={true}
        placeholder="100 BUSD | 150 BUSD | 225 | 337,5 | 500"
        onClick={(amountUsdt) => getBuyToken(amountUsdt)}
      >
        Купить токенов AXLT
      </WrapperButton>
      <WrapperButton setMyLogs={setMyLogs} onClick={() => getWithdrawTokens()}>
        Вывести токены AXLT
      </WrapperButton>
      <WrapperButton setMyLogs={setMyLogs} onClick={() => getBalanceAxlt()}>
        Получить мой баланс в AXLT
      </WrapperButton>
      <hr />
      <WrapperButton setMyLogs={setMyLogs} onClick={() => countTransaction()}>
        Получить текущие количество транзакций
      </WrapperButton>
      <WrapperButton setMyLogs={setMyLogs} onClick={() => exchangeRate()}>
        Получить текущий exchange rate
      </WrapperButton>
      <WrapperButton
        setMyLogs={setMyLogs}
        onClick={() => getProfitCalculation(walletAddress)}
      >
        Получить мой профит
      </WrapperButton>
      <WrapperButton setMyLogs={setMyLogs} onClick={getRateIncrement}>
        Насколько изменяется rate при каждой транзакции
      </WrapperButton>
      <hr />
      <h1>Admin functools</h1>
      <WrapperButton
        setMyLogs={setMyLogs}
        withInput={true}
        placeholder="wallet address"
        onClick={(walletAddress) =>
          getTransferContractsOwnership(walletAddress)
        }
      >
        Назначить нового адрес владельцем контакта
      </WrapperButton>
      <WrapperButton
        setMyLogs={setMyLogs}
        withInput={true}
        placeholder="amount usdt"
        onClick={(amountUsdt) => getWithdrawUsdt(amountUsdt)}
      >
        Вывести USDT с пула ликвидности
      </WrapperButton>
      <WrapperButton
        setMyLogs={setMyLogs}
        withInput={true}
        placeholder="amount usdt"
        onClick={(amountUsdt) => getAdditionToLiquidity(amountUsdt)}
      >
        Начислить USDT в пул ликвидности
      </WrapperButton>
      <WrapperButton
        setMyLogs={setMyLogs}
        onClick={() => getBalanceOfNonPayable()}
      >
        Баланс пула ликвидности который не можем снять
      </WrapperButton>
      <WrapperButton
        setMyLogs={setMyLogs}
        onClick={() => getBalanceOfPayable()}
      >
        Баланс пола ликвидности который можем снять
      </WrapperButton>
      {/* <WrapperButton setMyLogs={setMyLogs}
        withInput={true}
        placeholder="amount axlt"
        onClick={(amountAxlt) => tokenForUsdt(amountAxlt)}
      >
        getTokenForUsdt
      </WrapperButton> */}
      <hr />
      <h1>Трассировка вызовов функций</h1>
      {myLogs.map((e, i) => (
        <span key={i}>{`${e.dateTime} ${e.title}:${e.response} `}</span>
      ))}
    </main>
  );
}
