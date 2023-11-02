// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract ExchangeRate is Ownable {
    using SafeMath for uint;

    uint private _exchangeRate = 1000000000000000000;
    uint private _startRate = 1000000000000000000;
    
    uint public rateIncrement = 500000;
    mapping(uint => uint) public rateIncrementMap;

    constructor() {
        rateIncrementMap[1] = 500000;
        rateIncrementMap[1001] = 250000;
        rateIncrementMap[3001] = 187500;
        rateIncrementMap[6001] = 140625;
        rateIncrementMap[14001] = 125000;
    }

    function getExchangeRate() public view virtual returns (uint) {
        return _exchangeRate;
    }

    function incrementRate(uint countTransaction) internal virtual {
        if (rateIncrementMap[countTransaction] != 0) {
            rateIncrement = rateIncrementMap[countTransaction];
        }

        _exchangeRate = _exchangeRate.add(_startRate.mul(rateIncrement).div(1000000000));

        countTransaction += 1;

    }
}