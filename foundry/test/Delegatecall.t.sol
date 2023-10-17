// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import "forge-std/console.sol";
import {Good, Attack, Helper} from "../src/Delegatecall.sol";

contract GoodTest is Test {
    Good public good;
    Attack public attack;
    Helper public helper;
    address owner;

    function setUp() public {
        helper = new Helper();
        good = new Good(address(helper));
        attack = new Attack(good);
        owner = good.owner();
    }

    function test_Attack() public {
        console.log(owner);
        assertEq(good.owner(), owner);
        attack.attack();
        assertEq(good.owner(), address(attack));
    }
}
