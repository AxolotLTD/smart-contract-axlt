// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract DepositLimit is Ownable {
    using SafeMath for uint;

    uint public depositLimit;
    
    mapping(uint => bool) public depositLimitMap;

    constructor() {
        depositLimitMap[100000000000000000000] = true;
        depositLimit = 100000000000000000000;
    }

    function getDepositLimit() public view virtual returns (uint) {
        return depositLimit;
    }

    function incrementLimit(uint _countTransaction) internal virtual {
        if (_countTransaction == 1001) {
            depositLimitMap[150000000000000000000] = true;
            depositLimit = 150000000000000000000;
        }
        else if (_countTransaction == 3001) {
            depositLimitMap[225000000000000000000] = true;
            depositLimit = 225000000000000000000;
        }
        else if (_countTransaction == 6001) {
            depositLimitMap[337500000000000000000] = true;
            depositLimit = 337500000000000000000;
        }
        else if (_countTransaction == 14001) {
            depositLimitMap[500000000000000000000] = true;
            depositLimit = 500000000000000000000;
        }
        else if (_countTransaction == 24001) {
            depositLimitMap[750000000000000000000] = true;
            depositLimit = 750000000000000000000;
        }
    }
}