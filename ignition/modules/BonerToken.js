const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("BonerTokenModule", (m) => {
    const initialOwner = m.getAccount(0);
    const initialSupply = 1000000;

    const bonerToken = m.contract("BonerToken", [initialOwner, initialSupply], { from: initialOwner });

    return { bonerToken };
})