// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "./BEP20/IBEP20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./BEP20/SafeBEP20.sol";

contract AccountLimit is Ownable {
    using SafeBEP20 for IBEP20;

    mapping(address => bool) public activeAccounts;

    IBEP20 private _usdt;
    event ActivateAccount(address account);

    constructor(IBEP20 usdt_) {
        _usdt = usdt_;
        activeAccounts[msg.sender] = true;
    }

    modifier isActive() {
        require(activeAccounts[msg.sender], "Account is not active.");
        _;
    }

    function activateAccount() internal virtual returns (bool) {
        require (!activeAccounts[msg.sender], "This account already active.");
        _usdt.safeTransferFrom(msg.sender, owner(), 50 * 10 ** _usdt.decimals());
        activeAccounts[msg.sender] = true;
        emit ActivateAccount(msg.sender);
        return true;
    }
}