// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./BEP20/IBEP20.sol";
import "./LiquidityPool.sol";
import "./AccountLimit.sol";
using SafeBEP20 for IBEP20;

contract ReferalProgram is LiquidityPool, AccountLimit {
    using SafeBEP20 for IBEP20;

    event BuyLine(address recipient, uint lineLevel);
    event BindSponsor(address child, address sponsor);

    mapping(address=>address) public sponsorMap;
    mapping(uint=>uint) private linesPrices;
    mapping(address=>uint) public userLine;

    IBEP20 private _usdt;
    address private _axltContractAddress;

    constructor(IBEP20 usdt_, address axltContractAddress_) LiquidityPool(usdt_, axltContractAddress_) AccountLimit(usdt_) {
        _usdt = usdt_;
        _axltContractAddress = axltContractAddress_;
        linesPrices[1] = 75000000000000000000;
        linesPrices[2] = 250000000000000000000;
        linesPrices[3] = 350000000000000000000;
        linesPrices[4] = 450000000000000000000;
        linesPrices[5] = 550000000000000000000;
    }

    function activateAndBindSponsor(address sponsor) external {
        require(sponsor != address(0), "Sponsor cannot be the zero address.");
        require(sponsor != msg.sender, "A user cannot be his own sponsor.");
        require(activeAccounts[sponsor], "The sponsor is not in the referral system.");
        activateAccount();
        sponsorMap[msg.sender] = sponsor;
        emit BindSponsor(msg.sender, sponsor);
    }

    function buyLine() external isActive virtual returns (bool) {
        require(userLine[msg.sender] < 5, "You have reached the maximum line level.");
        uint price = linesPrices[userLine[msg.sender] + 1];
        _buyLine(price, msg.sender);
        userLine[msg.sender] += 1;
        emit BuyLine(msg.sender, userLine[msg.sender]);
        return true;
    }

    function _buyLine(uint price, address recipient) private returns (bool) {
        require(recipient != address(0), "Recipient cannot be the zero address.");
        _usdt.transferFrom(recipient, address(this), price);
        _usdt.transfer(owner(), (price * 10) / 100);
        transferToPayable((price * 90) / 100);
        _paymentsToPartnersFromBuyLine(msg.sender, price);
        return true;
    }
    
    function getPriceLine(uint lineNumber) public view returns(uint) {
        return linesPrices[lineNumber];
    }

    function _paymentsToPartnersFromTradeTokens(address recipient, uint price) internal {
        require(recipient != address(0), "Recipient cannot be the zero address.");
        for (uint i = 1; i < 6; i++) {
                if (i <= userLine[sponsorMap[recipient]]) {
                    _usdt.transfer(sponsorMap[recipient], (price * _getTradeTokenFees(i)) / 100000);
                    nonPayableBalance -= (price * _getTradeTokenFees(i)) / 100000;
                }
                recipient = sponsorMap[recipient];
                if (recipient == address(0)) {
                    return;
                }
        }
    }

    function _paymentsToPartnersFromBuyLine(address recipient, uint price) internal {
        require(recipient != address(0), "Recipient cannot be the zero address.");
        for (uint i = 1; i < 6; i++) {
                if (i <= userLine[sponsorMap[recipient]]) {
                    _usdt.safeTransfer(sponsorMap[recipient], (price * _getBuyLinesFee(i)) / 100);
                    withdrawPayable((price * _getBuyLinesFee(i)) / 100);
                }
                recipient = sponsorMap[recipient];
                if (recipient == address(0)) {
                    return;
                }
            }
    }

    function _getTradeTokenFees(uint level) private pure returns(uint) {
        if (level == 1) {
            return 2000;
        }
        else if (level == 2) {
            return 1500;
        }
        else if (level == 3) {
            return 750;
        }
        else if (level == 4) {
            return 500;
        }
        else if (level == 5) {
            return 250;
        }
        return 0;
    }

    function _getBuyLinesFee(uint level) private pure returns(uint) {
        if (level == 1) {
            return 10;
        }
        else if (level == 2) {
            return 5;
        }
        else if (level == 3) {
            return 6;
        }
        else if (level == 4) {
            return 9;
        }
        else if (level == 5) {
            return 10;
        }
        return 0;
    }

}