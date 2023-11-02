// SPDX-License-Identifier: MIT
pragma solidity >0.4.0 <= 0.9.0;

import {HandleTransaction} from "./HandleTransaction.sol";
import {LiquidityPool} from "./LiquidityPool.sol";
import {AccountLimit} from "./AccountLimit.sol";
import {ReferalProgram} from  "./ReferalProgram.sol";
import "./BEP20/SafeBEP20.sol";

contract AXLT is IBEP20, HandleTransaction, LiquidityPool, AccountLimit, ReferalProgram{
  using SafeBEP20 for IBEP20;

  bool public isTransferable = false;
  mapping(address => uint) private initialExchangeRate;

  event Withdrawn(address recipient, uint amount);
  event BuyToken(address recipient, uint amount);

  IBEP20 private _usdt;
    
  uint256 public ownerFeeForToken = 5;

  using SafeMath for uint256;

  mapping (address => uint256) private _balances;

  mapping (address => mapping (address => uint256)) private _allowances;

  uint256 private _totalSupply;
  uint8 private _decimals;
  string private _symbol;
  string private _name;

  constructor(IBEP20 usdt_) ReferalProgram(usdt_, address(this)){
    _name = "AXLT Token";
    _symbol = "AXLT";
    _decimals = 18;
    _usdt = usdt_;
  }

  function buyToken(uint usdtAmount) external isActive() virtual {
        require (usdtAmount > 0, "Amount can not be less then zero.");
        require (depositLimitMap[usdtAmount], "This amount is not available.");
        require (balanceOf(msg.sender) == 0, "First you need to withdraw funds.");
        initialExchangeRate[msg.sender] = getExchangeRate();

        _usdt.safeTransferFrom(msg.sender, address(this), usdtAmount);
        _usdt.safeTransfer(owner(), (usdtAmount * ownerFeeForToken) / 100);

        transferToNonPayable(usdtAmount - (usdtAmount * ownerFeeForToken) / 100);
        _paymentsToPartnersFromTradeTokens(msg.sender, usdtAmount);
        uint tokenAmount = getTokenForUsdt(usdtAmount - (usdtAmount * 10) / 100);
        _mint(msg.sender, tokenAmount);
        
        handleTransaction();

        emit BuyToken(_msgSender(), tokenAmount);
    }

    function getTokenForUsdt(uint amount) public virtual view returns (uint256) {
        uint exchangeRate = getExchangeRate();
        return uint256(amount * 10 ** 18 / exchangeRate);
    }

    function withdrawTokens() external isActive virtual {
        uint amount = balanceOf(_msgSender());
        require (amount > 0, "Amount can not be less then zero.");
        
        uint differenceOfProfit = profitCalculation(msg.sender);
        uint tokenToTransfer;
        if (differenceOfProfit < 5000000000) {
            tokenToTransfer =
                (initialExchangeRate[msg.sender] * amount) / (10**18);
        } else {
            uint exchangeRateToTransfer = initialExchangeRate[msg.sender] + (initialExchangeRate[msg.sender] / 100) *
                50;
            tokenToTransfer =
                (exchangeRateToTransfer * amount) / (10**18);
        }

        _usdt.safeTransfer(owner(), (tokenToTransfer * 5) / 100);
        _paymentsToPartnersFromTradeTokens(msg.sender, tokenToTransfer);
        uint newTokenToTransfer = SafeMath.mul(tokenToTransfer, 90);
        newTokenToTransfer = SafeMath.div(newTokenToTransfer, 100);
        _usdt.safeTransfer(msg.sender, newTokenToTransfer);
        _burn(msg.sender, amount);

        nonPayableBalance -= newTokenToTransfer;

        initialExchangeRate[msg.sender] = 0;
        handleTransaction(); 

        emit Withdrawn(_msgSender(), amount);
    }

    function profitCalculation(address _owner) public view virtual returns (uint) {
        require(initialExchangeRate[_owner] > 0, "Your initial exchange rate is zero");
        uint exchangeRate = getExchangeRate();
        return ((exchangeRate - initialExchangeRate[_owner]) * 100000000) / initialExchangeRate[_owner] * 100;
    }

    function transferContractsOwnership(address newOwner) public virtual onlyOwner {
        transferOwnership(newOwner);
    }

    function withdrawUsdt(address currency, uint amount) external virtual onlyOwner {
        require(balanceOfPayable() >= amount, "The amount exceeds the balance.");
        _usdt.safeTransfer(currency, amount);
        withdrawPayable(amount);
    }

    function getInitialExchangeRate(address _owner) external view returns (uint) {
        return initialExchangeRate[_owner];
    }

  /**
   * @dev Returns the bep token owner.
   */
  function getOwner() external view returns (address) {
    return owner();
  }

  /**
   * @dev Returns the token decimals.
   */
  function decimals() external view returns (uint8) {
    return _decimals;
  }

  /**
   * @dev Returns the token symbol.
   */
  function symbol() external view returns (string memory) {
    return _symbol;
  }

  /**
  * @dev Returns the token name.
  */
  function name() external view returns (string memory) {
    return _name;
  }

  /**
   * @dev See {BEP20-totalSupply}.
   */
  function totalSupply() external view returns (uint256) {
    return _totalSupply;
  }

  /**
   * @dev See {BEP20-balanceOf}.
   */
  function balanceOf(address account) public view returns (uint256) {
    return _balances[account];
  }

  /**
   * @dev See {BEP20-transfer}.
   *
   * Requirements:
   *
   * - `recipient` cannot be the zero address.
   * - the caller must have a balance of at least `amount`.
   */
  function transfer(address recipient, uint256 amount) external returns (bool) {
    require(isTransferable, "Transfer is not available.");
    require(recipient != address(0), "Cannot send the funds to the zero address.");
    _transfer(_msgSender(), recipient, amount);
    return true;
  }

  /**
   * @dev See {BEP20-allowance}.
   */
  function allowance(address owner, address spender) external view returns (uint256) {
    return _allowances[owner][spender];
  }

  /**
   * @dev See {BEP20-approve}.
   *
   * Requirements:
   *
   * - `spender` cannot be the zero address.
   */
  function approve(address spender, uint256 amount) external returns (bool) {
    _approve(_msgSender(), spender, amount);
    return true;
  }

  /**
   * @dev See {BEP20-transferFrom}.
   *
   * Emits an {Approval} event indicating the updated allowance. This is not
   * required by the EIP. See the note at the beginning of {BEP20};
   *
   * Requirements:
   * - `sender` and `recipient` cannot be the zero address.
   * - `sender` must have a balance of at least `amount`.
   * - the caller must have allowance for `sender`'s tokens of at least
   * `amount`.
   */
  function transferFrom(address sender, address recipient, uint256 amount) public returns (bool) {
    require(isTransferable, "Transfer is not available.");
    require(recipient != address(0), "Cannot send the funds to the zero address.");
    _transfer(sender, recipient, amount);
    _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "BEP20: transfer amount exceeds allowance"));
    return true;
  }

  /**
   * @dev Atomically increases the allowance granted to `spender` by the caller.
   *
   * This is an alternative to {approve} that can be used as a mitigation for
   * problems described in {BEP20-approve}.
   *
   * Emits an {Approval} event indicating the updated allowance.
   *
   * Requirements:
   *
   * - `spender` cannot be the zero address.
   */
  function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
    _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
    return true;
  }

  /**
   * @dev Atomically decreases the allowance granted to `spender` by the caller.
   *
   * This is an alternative to {approve} that can be used as a mitigation for
   * problems described in {BEP20-approve}.
   *
   * Emits an {Approval} event indicating the updated allowance.
   *
   * Requirements:
   *
   * - `spender` cannot be the zero address.
   * - `spender` must have allowance for the caller of at least
   * `subtractedValue`.
   */
  function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
    _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue, "BEP20: decreased allowance below zero"));
    return true;
  }

  /**
   * @dev Creates `amount` tokens and assigns them to `msg.sender`, increasing
   * the total supply.
   *
   * Requirements
   *
   * - `msg.sender` must be the token owner
   */
  function mint(uint256 amount) public onlyOwner returns (bool) {
    _mint(_msgSender(), amount);
    return true;
  }

  /**
   * @dev Moves tokens `amount` from `sender` to `recipient`.
   *
   * This is internal function is equivalent to {transfer}, and can be used to
   * e.g. implement automatic token fees, slashing mechanisms, etc.
   *
   * Emits a {Transfer} event.
   *
   * Requirements:
   *
   * - `sender` cannot be the zero address.
   * - `recipient` cannot be the zero address.
   * - `sender` must have a balance of at least `amount`.
   */
  function _transfer(address sender, address recipient, uint256 amount) internal {
    require(sender != address(0), "BEP20: transfer from the zero address");
    require(recipient != address(0), "BEP20: transfer to the zero address");

    _balances[sender] = _balances[sender].sub(amount, "BEP20: transfer amount exceeds balance");
    _balances[recipient] = _balances[recipient].add(amount);
    emit Transfer(sender, recipient, amount);
  }

  /** @dev Creates `amount` tokens and assigns them to `account`, increasing
   * the total supply.
   *
   * Emits a {Transfer} event with `from` set to the zero address.
   *
   * Requirements
   *
   * - `to` cannot be the zero address.
   */
  function _mint(address account, uint256 amount) internal {
    require(account != address(0), "BEP20: mint to the zero address");

    _totalSupply = _totalSupply.add(amount);
    _balances[account] = _balances[account].add(amount);
    emit Transfer(address(0), account, amount);
  }

  /**
   * @dev Destroys `amount` tokens from `account`, reducing the
   * total supply.
   *
   * Emits a {Transfer} event with `to` set to the zero address.
   *
   * Requirements
   *
   * - `account` cannot be the zero address.
   * - `account` must have at least `amount` tokens.
   */
  function _burn(address account, uint256 amount) internal {
    require(account != address(0), "BEP20: burn from the zero address");

    _balances[account] = _balances[account].sub(amount, "BEP20: burn amount exceeds balance");
    _totalSupply = _totalSupply.sub(amount);
    emit Transfer(account, address(0), amount);
  }

  /**
   * @dev Sets `amount` as the allowance of `spender` over the `owner`s tokens.
   *
   * This is internal function is equivalent to `approve`, and can be used to
   * e.g. set automatic allowances for certain subsystems, etc.
   *
   * Emits an {Approval} event.
   *
   * Requirements:
   *
   * - `owner` cannot be the zero address.
   * - `spender` cannot be the zero address.
   */
  function _approve(address owner, address spender, uint256 amount) internal {
    require(owner != address(0), "BEP20: approve from the zero address");
    require(spender != address(0), "BEP20: approve to the zero address");

    _allowances[owner][spender] = amount;
    emit Approval(owner, spender, amount);
  }

  
  function _burnFrom(address account, uint256 amount) internal {
    _burn(account, amount);
    _approve(account, _msgSender(), _allowances[account][_msgSender()].sub(amount, "BEP20: burn amount exceeds allowance"));
  }
}
