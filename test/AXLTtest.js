const { expect } = require("chai");
const { ethers, network } = require("hardhat");
const { BigNumber, utils } = require("ethers");
const {
    BN,
    constants,
    expectEvent,
    expectRevert,
    time,
} = require('@openzeppelin/test-helpers')

describe("AXLT contract test", function () {
    before(async function () {
        [owner, other, user2, ...accounts] = await ethers.getSigners();

        // console.log(accounts);

        usdtFactory = await ethers.getContractFactory('contracts/USDT.sol:USDT');
        usdtContract = await usdtFactory.deploy();
        console.log("USDT deployed at: ", await usdtContract.getAddress());

        axltFactory = await ethers.getContractFactory('contracts/AXLT.sol:AXLT');
        axltContract = await axltFactory.deploy(await usdtContract.getAddress());
        console.log("AXLT deployed at: ", await axltContract.getAddress());

        await usdtContract.transfer(user2.address, '100000000000000000000000');
        await usdtContract.transfer(accounts[0].address, '100000000000000000000000');
        

        await usdtContract.approve(await axltContract.getAddress(), '100000000000000000000000');
        await usdtContract.connect(user2).approve(await axltContract.getAddress(), '100000000000000000000000');
        await usdtContract.connect(accounts[0]).approve(await axltContract.getAddress(), '100000000000000000000000');
    });
    describe("referral program", function() {
        it("activate and bind sponsor", async function() {
            tx = await axltContract.connect(accounts[0]).activateAndBindSponsor(owner.address);
            expect(tx).to.emit('ActivateAccount')
            .withArgs(accounts[0].address);
            tx2 = await axltContract.connect(user2).activateAndBindSponsor(accounts[0].address);
            expect(tx2).to.emit('ActivateAccount')
            .withArgs(user2.address);
        });

        it("buy line", async function() {
            await axltContract.connect(owner).buyLine();
            await axltContract.connect(owner).buyLine();
            let balanceOfOwner = new BN(await usdtContract.balanceOf(owner.address));
            let bonuses = new BN('15000000000000000000'); 
            await axltContract.connect(accounts[0]).buyLine();
            const tx = new BN(await usdtContract.balanceOf(owner.address)); 
            expect(tx).to.be.equal(balanceOfOwner.add(bonuses)); // ownerFee + sponsorBonuse
        });

        it("buy token", async function() {
            differenceOfSponsorBalance = new BN("100000000000000000000");
            balanceOfSponsorBefore = new BN(await usdtContract.balanceOf(accounts[0].address));
            expectValue = new BN(await axltContract.getTokenForUsdt('100000000000000000000'));

            tx = await axltContract.connect(user2).buyToken('100000000000000000000');

            expect(tx).to.emit('BuyToken')
            .withArgs(user2.address, expectValue);

            expect(await axltContract.balanceOf(user2))
            .to.be.equal(expectValue.sub(new BN('10000000000000000000')));

            console.log(typeof(balanceOfSponsorBefore));
        });

        it("withdraw token", async function() {
            let beforeWithdraw = new BN(await usdtContract.balanceOf(user2.address));
            let tx = await axltContract.connect(user2).withdrawTokens();
            
            // let difference = beforeWithdraw
            let afterWithdraw = new BN(await usdtContract.balanceOf(user2.address));
            expect(afterWithdraw).to.be.equal(beforeWithdraw.add(new BN('81000000000000000000'))); // -10%
            expect(tx).to.emit("Withdrawn")
            .withArgs(user2.address, "90000000000000000000")
        })

        it("profit greater then 50%", async function() {
            console.log("waiting to 1k transaction is over...")
            await axltContract.connect(user2).buyToken('100000000000000000000');
            let balancebeforeWithdraw = await usdtContract.balanceOf(user2.address);
            await usdtContract.connect(owner).approve(await axltContract.getAddress(), '170000000000000000000000');
            for (let i = 0; i < 1005; i++){
                await axltContract.buyToken('100000000000000000000');
                await axltContract.withdrawTokens();
            };
            console.log(await axltContract.profitCalculation(user2));
            await axltContract.connect(user2).withdrawTokens();
            let balanceAfterWithdraw = await usdtContract.balanceOf(user2.address);
            expect(new BN(balanceAfterWithdraw)).to.be.equal(new BN(balancebeforeWithdraw).add(new BN('121499999999999999998')));
        });
    });
});