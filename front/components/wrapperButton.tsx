import React, { FC, useState } from "react";
import Button from "./button";

export type TLogs = {
  title: string;
  dateTime: string;
  response?: string;
};

type WrapperButtonProps = {
  withInput?: boolean;
  placeholder?: string;
  setMyLogs: (fc: (e: TLogs[]) => TLogs[]) => any;
  onClick: (value: any) => Promise<any>;
  children: string | React.ReactNode;
};

const WrapperButton: FC<WrapperButtonProps> = ({
  withInput = false,
  placeholder,
  setMyLogs,
  onClick,
  children,
}) => {
  const [result, setResult] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handlerCall = (callName: string, response?: string) => {
    setMyLogs((e) => {
      const array = e.concat({
        title: callName,
        dateTime: new Date().toLocaleString("ru"),
        response,
      });
      try {
        localStorage.setItem("logs", JSON.stringify(array));
      } catch {}
      return array;
    });
  };

  const onClickButton = async () => {
    const res = await onClick(inputValue);
    setResult(`${res}`);
    if (typeof children === "string") handlerCall(children, `${res}`);
  };

  return (
    <div className={"grid grid-cols-3 items-center gap-5"}>
      <div className={"col-span-2 grid grid-cols-2 gap-5"}>
        {withInput && (
          <input
            type="text"
            value={inputValue}
            placeholder={placeholder}
            className={"border border-solid border-black rounded-xl px-2"}
            onChange={(e) => setInputValue(e.target.value)}
          />
        )}
        <Button onClick={onClickButton} className={"col-start-2"}>
          {children}
        </Button>
      </div>
      <div>{result}</div>
    </div>
  );
};

export default WrapperButton;
