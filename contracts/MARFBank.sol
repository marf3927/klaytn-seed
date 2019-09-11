pragma solidity ^0.5.6;

import '@openzeppelin/contracts/ownership/Ownable.sol';

contract MARFBank is Ownable {
	modifier bankOpened {
		_;
	}

	function setBankState(bool bankOpen) public {

	}

	function deposit(uint256 amount) public {

	}

	function withdraw(uint256 amount) public {

	}

	function transfer(address to, address from, address amount) public {

	}

	function getBalace(address user) public return (uint256){
		return 0;
	}


}
