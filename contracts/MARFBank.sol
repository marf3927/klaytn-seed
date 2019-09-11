pragma solidity ^0.5.6;

import '@openzeppelin/contracts/ownership/Ownable.sol';

contract MARFBank is Ownable {
	mapping(address => uint256) private balance;
	bool private bankOpen = true;

	modifier bankOpened() {

	}

	function setBankState(bool _bankOpen) external onlyOwner {
	}

	function deposit(uint256 _amount) external payable bankOpened {
	}

	function withdraw(uint256 _amount) external bankOpened {
	}

	function transfer(address _to, uint256 _amount) external bankOpened {

	}

	function getBalance(address _user) external view bankOpened returns (uint256) {
		return balance[_user];
	}
}
