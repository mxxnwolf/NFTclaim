/**
 *Submitted for verification at polygonscan.com on 2021-11-18
*/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract whitelisting {

    mapping(address=>bool) public whitelist;
    address private admin;

    constructor() {
        admin = msg.sender;
    }

    function changeadmin(address add) public Owner {
        admin = add;
    }

    modifier Owner() {
        require(admin == msg.sender,"You are not admin");
        _;
    }

    function whitelist(address _add) external{
        whitelist[_add] = true;
    }


    function verifyUser(address _whitelistedAddress) public view returns(bool) {
    bool userIsWhitelisted = whitelist[_whitelistedAddress];
    return userIsWhitelisted;
}

}