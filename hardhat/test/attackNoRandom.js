const { expect } = require("chai");
const hre = require("hardhat");

describe("AttackRandom", () => {
    it("Should be able to guess the exact number", async () => {
        // Deploy the Game Contract
        const gameContract = await hre.ethers.deployContract("Game", [], {
            value: hre.ethers.parseEther("0.1"),
        });

        await gameContract.waitForDeployment();

        // Deploy the AttackRandom Contract
        const attackContract = await hre.ethers.deployContract("AttackRandom", [
            gameContract.target,
        ]);

        await attackContract.waitForDeployment();

        // AttackRandom the Game Contract
        const txn = await attackContract.attack();
        await txn.wait();

        // Balance of the Game Contract should be equal 0
        expect(await gameContract.getBalance()).to.equal(BigInt("0"));
    });
});