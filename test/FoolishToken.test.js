const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("FoolishToken", function () {
  async function deployFoolishTokenFixture() {
    const [owner, user] = await ethers.getSigners();

    const Foolish = await ethers.getContractFactory("FoolishToken");
    const foolish = await Foolish.deploy(owner.address, 1000000);

    return { foolish, owner, user };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { foolish, owner } = await loadFixture(deployFoolishTokenFixture);

      expect(await foolish.owner()).to.equal(owner.address);
    });

    it("Should mint initial supply to owner", async function () {
      const { foolish, owner } = await loadFixture(deployFoolishTokenFixture);

      const expected = ethers.parseUnits("1000000", 18);

      expect(await foolish.balanceOf(owner.address)).to.equal(expected);
    });
  });

  describe("Minting", function () {
    it("should allow only owner to mint", async function () {
      const { foolish, owner, user } = await loadFixture(deployFoolishTokenFixture);

      const amount = ethers.parseUnits("1000", 18);

      await expect(
        foolish.connect(user).mint(user.address, amount)
      ).to.be.revertedWithCustomError(foolish, "OwnableUnauthorizedAccount");
      await expect(foolish.connect(owner).mint(user.address, amount))
        .to.emit(foolish, "Transfer")
        .withArgs(ethers.ZeroAddress, user.address, amount);
    });
  });

  describe("Burning", function () {
    it("should allow users to burn their tokens", async function () {
      const { foolish, owner } = await loadFixture(deployFoolishTokenFixture);
      const amount = ethers.parseUnits("100", 18);

      await expect(foolish.connect(owner).burn(amount))
        .to.emit(foolish, "Transfer")
        .withArgs(owner.address, ethers.ZeroAddress, amount);
    });
  });

  describe("Pausing", function () {
    it("should not allow transfers when paused", async function () {
      const { foolish, owner, user } = await loadFixture(deployFoolishTokenFixture);
      const amount = ethers.parseUnits("100", 18);

      await foolish.mint(user.address, amount);

      await foolish.pause();

      await expect(
        foolish.connect(user).transfer(owner.address, amount)
      ).to.be.revertedWithCustomError(foolish, "EnforcedPause");
      await foolish.unpause();
      await foolish.connect(user).transfer(owner.address, amount);
      expect(await foolish.balanceOf(owner.address)).to.equal(
        ethers.parseUnits("1000100", 18)
      );
    });
  });
});
