const { ethers } = require('hardhat');
const { assert } = require('chai');
const { expect } = require('chai');

// const { DWToken } = require('../contracts/DWToken.sol');
// const { ERC20Marketplace } = require('../contracts/ERC20Marketplace.sol');

describe('ERC20Marketplace', function () {
  let dwToken;
  let marketplace;
  const totalSupply = 1000;

  beforeEach(async () => {
    const DWToken = await ethers.getContractFactory('DWToken');
    dwToken = await DWToken.deploy();
    await dwToken.deployed();
    const ERC20Marketplace = await ethers.getContractFactory(
      'ERC20Marketplace'
    );
    marketplace = await ERC20Marketplace.deploy(dwToken.address);
    await marketplace.deployed();
  });

  describe('ERC20Marketplace Deployment', function () {
    it('Should set the correct token contract', async function () {
      const [owner] = await ethers.getSigners();

      const DWToken = await ethers.getContractFactory('DWToken');
      const tokenContract = await DWToken.deploy();

      const ERC20Marketplace = await ethers.getContractFactory(
        'ERC20Marketplace'
      );
      const marketplace = await ERC20Marketplace.deploy(tokenContract.address);

      expect(await marketplace.tokenContract()).to.equal(tokenContract.address);
    });

    it('Should set the correct token price', async () => {
      expect(await marketplace.tokenPrice()).to.equal(
        ethers.utils.parseEther('0.005')
      );
    });
  });

  describe('buyTokens', () => {
    it('Should allow users to buy tokens', async () => {
      const numberOfTokens = 10;
      const expectedTokenAmount = ethers.utils.parseUnits(
        numberOfTokens.toString(),
        1
      );
      const expectedEtherAmount = ethers.utils.parseEther('0.05');
      const initialBuyerBalance = await ethers.provider.getBalance(
        await ethers.provider.getSigner(1).getAddress()
      );

      await marketplace
        .connect(await ethers.provider.getSigner(1))
        .buyTokens(numberOfTokens, { value: expectedEtherAmount });

      expect(
        await dwToken.balanceOf(await ethers.provider.getSigner(1).getAddress())
      ).to.equal(expectedTokenAmount);
      expect(
        await ethers.provider.getBalance(
          await ethers.provider.getSigner(1).getAddress()
        )
      ).to.be.lt(initialBuyerBalance.sub(expectedEtherAmount));
    });

    it('Should fail if incorrect amount of ETH is sent', async () => {
      await expect(
        marketplace
          .connect(await ethers.provider.getSigner(1))
          .buyTokens(10, { value: ethers.utils.parseEther('0.01') })
      ).to.be.revertedWith('Incorrect amount of ETH sent.');
    });

    it('Should fail if there are not enough tokens in contract', async () => {
      await expect(
        marketplace
          .connect(await ethers.provider.getSigner(1))
          .buyTokens(totalSupply + 1, { value: ethers.utils.parseEther('0.5') })
      ).to.be.revertedWith('Not enough tokens in contract.');
    });
  });
});
