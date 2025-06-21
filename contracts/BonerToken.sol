//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {ERC20Pausable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract BonerToken is ERC20, ERC20Burnable, ERC20Pausable, Ownable {
    constructor(address initialOwner, uint initialSupply) ERC20("BonerToken", "BONER") Ownable(initialOwner) {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }
    function pause() public onlyOwner {
        _pause();
    }
    function unpause() public onlyOwner{
        _unpause();
    }
    function mint(address to, uint amount) public onlyOwner {
        _mint(to, amount);
    }
    function _update(address from, address to, uint value) internal override(ERC20, ERC20Pausable) {
        super._update(from, to, value);
    }
}