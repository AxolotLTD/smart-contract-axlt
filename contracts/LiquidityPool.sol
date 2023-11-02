// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "./BEP20/IBEP20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./BEP20/SafeBEP20.sol";

contract LiquidityPool is Ownable {
    using SafeBEP20 for IBEP20;

    event AddToLiquidity(address recipient, uint amount);

    uint256 public totalLiquidity;
    
    uint public payableBalance;
    uint public nonPayableBalance;

    IBEP20 private _usdt;
    address public axltContractAddress;

    constructor(IBEP20 usdt_, address axltContractAddress_) {
        require(axltContractAddress_ != address(0), "AXLT contract address cannot be the zero address.");
        _usdt = usdt_;
        axltContractAddress = axltContractAddress_;
    }
    
    function transferToPayable(uint amount) internal {
        require(amount > 0, "Amount can't be less then zero.");
        payableBalance += amount;
    }

    function transferToNonPayable(uint amount) internal {
        require(amount > 0, "Amount can't be less then zero.");
        nonPayableBalance += amount;
    }

    function withdrawPayable(uint amount) internal {
        require(amount > 0, "Amount can't be less then zero.");
        payableBalance -= amount;
    }

    function balanceOfPayable() public virtual view returns (uint) {
        return payableBalance;
    }

    function balanceOfNonPayable() public virtual view returns (uint) {
        return nonPayableBalance;
    }

    function additionToLiquidity(uint amount) external {
        require(amount > 0, "Amount can't be less then zero.");
        require(axltContractAddress != address(0), "Cannot send the funds to the zero address.");
        nonPayableBalance += amount;
        _usdt.safeTransferFrom(msg.sender, axltContractAddress, amount);
        emit AddToLiquidity(msg.sender, amount);
    }
}