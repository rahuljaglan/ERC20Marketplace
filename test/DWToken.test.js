// const { ethers } = require('hardhat');
// const { assert, expect } = require('chai');
// const { DWToken } = require('../contracts/DWToken.sol');

// describe('DWToken', function () {
//   let dwToken = DWToken;
//   const totalSupply = 1000;

//   beforeEach(async () => {
//     const DWToken = await ethers.getContractFactory('DWToken');
//     let dwToken = await DWToken.deploy();
//     await dwToken.deployed();
//   });

//   describe('Deployment', () => {
//     it('Should set the correct name, symbol and decimals', async () => {
//       expect(await dwToken.name()).to.equal('DWToken');
//       expect(await dwToken.symbol()).to.equal('DW');
//       expect(await dwToken.decimals()).to.equal(1);
//     });

//     it('Should set the total supply to 1000', async () => {
//       const expectedTotalSupply = ethers.utils.parseUnits(
//         totalSupply.toString(),
//         1
//       );
//       expect(await dwToken.totalSupply()).to.equal(expectedTotalSupply);
//     });

//     it('Should allocate the total supply to the contract deployer', async () => {
//       const expectedBalance = ethers.utils.parseUnits(
//         totalSupply.toString(),
//         1
//       );
//       expect(
//         await dwToken.balanceOf(await ethers.provider.getSigner(0).getAddress())
//       ).to.equal(expectedBalance);
//     });
//   });

//   describe('transfer', () => {
//     it('Should transfer tokens between accounts', async () => {
//       const initialSenderBalance = await dwToken.balanceOf(
//         await ethers.provider.getSigner(0).getAddress()
//       );
//       const recipient = await ethers.provider.getSigner(1).getAddress();

//       await dwToken.transfer(recipient, 100);

//       expect(
//         await dwToken.balanceOf(await ethers.provider.getSigner(0).getAddress())
//       ).to.equal(initialSenderBalance - 100);
//       expect(await dwToken.balanceOf(recipient)).to.equal(100);
//     });

//     it('Should fail if the sender has an insufficient balance', async () => {
//       const initialSenderBalance = await dwToken.balanceOf(
//         await ethers.provider.getSigner(0).getAddress()
//       );
//       const recipient = await ethers.provider.getSigner(1).getAddress();

//       await expect(
//         dwToken.transfer(recipient, initialSenderBalance + 1)
//       ).to.be.revertedWith('Insufficient balance');

//       expect(
//         await dwToken.balanceOf(await ethers.provider.getSigner(0).getAddress())
//       ).to.equal(initialSenderBalance);
//       expect(await dwToken.balanceOf(recipient)).to.equal(0);
//     });
//   });

//   describe("approve", () => {
//     it("Should approve tokens for delegated transfer", async () => {
//       const initialSenderAllowance = await dwToken.allowance(
//         await ethers.provider.getSigner(0).getAddress(),
//         await ethers.provider.getSigner(1).getAddress()
//       );

//       await dwToken.approve(await ethers.provider.getSigner(1).getAddress(), 100);

//       expect(await dwToken.allowance(
//         await ethers.provider.getSigner(0).getAddress(),
//         await ethers.provider.getSigner(1).getAddress()
//       )).to.equal(initialSenderAllowance.add(100));
//     });
//   });

//   describe("transferFrom", () => {
//     it("Should transfer tokens between accounts", async () => {
//       const initialSenderBalance = await dwToken.balanceOf(await ethers.provider.getSigner(0).getAddress());
//       const recipient = await ethers.provider.getSigner(1).getAddress();
//       const delegate = await ethers.provider
// });
