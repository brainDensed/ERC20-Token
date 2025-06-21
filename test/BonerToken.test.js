const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("BonerToken", function () {
  async function deployBonerTokenFixture() {
    const [owner, user] = await ethers.getSigners();

    const Boner = await ethers.getContractFactory("BonerToken");
    const boner = await Boner.deploy(owner.address, 1000000);

    return { boner, owner, user };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { boner, owner } = await loadFixture(deployBonerTokenFixture);

      expect(await boner.owner()).to.equal(owner.address);
    });

    it("Should mint initial supply to owner", async function () {
      const { boner, owner } = await loadFixture(deployBonerTokenFixture);

      const expected = ethers.parseUnits("1000000", 18);

      expect(await boner.balanceOf(owner.address)).to.equal(expected);
    });
  });

  describe("Minting", function () {
    it("should allow only owner to mint", async function () {
      const { boner, owner, user } = await loadFixture(deployBonerTokenFixture);

      const amount = ethers.parseUnits("1000", 18);

      await expect(
        boner.connect(user).mint(user.address, amount)
      ).to.be.revertedWithCustomError(boner, "OwnableUnauthorizedAccount");
      await expect(boner.connect(owner).mint(user.address, amount))
        .to.emit(boner, "Transfer")
        .withArgs(ethers.ZeroAddress, user.address, amount);
    });
  });

  describe("Burning", function () {
    it("should allow users to burn their tokens", async function () {
      const { boner, owner } = await loadFixture(deployBonerTokenFixture);
      const amount = ethers.parseUnits("100", 18);

      await expect(boner.connect(owner).burn(amount))
        .to.emit(boner, "Transfer")
        .withArgs(owner.address, ethers.ZeroAddress, amount);
    });
  });

  describe("Pausing", function () {
    it("should not allow transfers when paused", async function () {
      const { boner, owner, user } = await loadFixture(deployBonerTokenFixture);
      const amount = ethers.parseUnits("100", 18);

      await boner.mint(user.address, amount);

      await boner.pause();

      await expect(
        boner.connect(user).transfer(owner.address, amount)
      ).to.be.revertedWithCustomError(boner, "EnforcedPause");
      await boner.unpause();
      await boner.connect(user).transfer(owner.address, amount);
      expect(await boner.balanceOf(owner.address)).to.equal(
        ethers.parseUnits("1000100", 18)
      );
    });
  });
});
