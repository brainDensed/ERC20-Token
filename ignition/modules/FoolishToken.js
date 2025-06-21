const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("FoolishTokenModule", (m) => {
    const initialOwner = m.getAccount(0);
    const initialSupply = 1000000;

    const foolishToken = m.contract("FoolishToken", [initialOwner, initialSupply], { from: initialOwner });

    return { foolishToken };
})