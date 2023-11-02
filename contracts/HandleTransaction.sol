// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "./DepositLimit.sol";
import "./ExchangeRate.sol";

contract HandleTransaction is ExchangeRate, DepositLimit {

    uint public countTransaction = 1;
    
    function handleTransaction() internal {
        incrementRate(countTransaction);
        incrementLimit(countTransaction);

        countTransaction += 1;
    }

    function getCountTransaction() public view virtual returns (uint) {
        return countTransaction;
    }
}