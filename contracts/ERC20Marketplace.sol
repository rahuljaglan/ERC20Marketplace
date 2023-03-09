// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./DWToken.sol";

contract ERC20Marketplace is Ownable {
    DWToken private tokenContract;
    uint256 private tokenPrice = 0.005 ether;

    constructor(DWToken _tokenContract) {
        tokenContract = _tokenContract;
    }

    function buyTokens(uint256 _numberOfTokens) public payable {
        require(
            msg.value == _numberOfTokens * tokenPrice,
            "Incorrect amount of ETH sent."
        );
        require(
            tokenContract.balanceOf(address(this)) >= _numberOfTokens,
            "Not enough tokens in contract."
        );

        tokenContract.transfer(msg.sender, _numberOfTokens);
    }
}
