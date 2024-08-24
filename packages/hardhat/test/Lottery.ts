import hre from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { Lottery$Type } from "../artifacts/contracts/Lottery.sol/Lottery";

describe("Lottery", function () {
  let subscriptionId: bigint | undefined;
  // @ts-expect-error: contract is not properly typed
  let vfrMockContract: VRFCoordinatorV2_5Mock;
  // @ts-expect-error: contract is not properly typed
  let lotteryContract: Lottery;
  let lotteryId: `0x${string}` | undefined;

  it("Should deploy VRFMock Contract", async function () {
    const vrfMock = await hre.viem.deployContract(
      // @ts-expect-error: contract is not properly typed
      "VRFCoordinatorV2_5Mock",
      [100000000000000000, 1000000000, 4366465593472593]
    );
    expect(vrfMock.address).to.not.be.undefined;
    vfrMockContract = vrfMock;
  });

  it("Should be able to create a subscription and fund it", async function () {
    const publicClient = await hre.viem.getPublicClient();
    const txResponse = await vfrMockContract.write.createSubscription();

    const txReceipt = await publicClient.getTransactionReceipt({
      hash: txResponse,
    });

    subscriptionId = BigInt(txReceipt.logs[0].topics[1] as string);

    expect(subscriptionId).to.not.be.undefined;
  });

  it("Should be able to fund a subscription", async function () {
    await vfrMockContract.write.fundSubscription([
      subscriptionId,
      100000000000000000n,
    ]);

    const subscription = await vfrMockContract.read.getSubscription([
      subscriptionId,
    ]);

    const balance = subscription[0];

    expect(balance).to.be.equal(100000000000000000n);
  });

  it("Should deploy Lottery contract", async function () {
    const lottery = await hre.viem.deployContract("Lottery", [
      subscriptionId!,
      vfrMockContract.address,
      "0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae",
    ]);
    expect(lottery.address).to.not.be.undefined;
    lotteryContract = lottery;
  });

  it("Should be able to create a lottery", async function () {
    const publicClient = await hre.viem.getPublicClient();
    const isActive = await lotteryContract.read.isLotteryActive();
    expect(isActive).to.be.false;
    const txResponse = await lotteryContract.write.createLottery(
      [100000000000000000n],
      {
        value: 100000000000000000n,
      }
    );

    const txReceipt = await publicClient.getTransactionReceipt({
      hash: txResponse,
    });

    lotteryId = txReceipt.logs[0].topics[0] as `0x${string}`;

    expect(lotteryId).to.not.be.undefined;
  });

  it("Should be able to verify that the lottery is active", async function () {
    const isActive = await lotteryContract.read.isLotteryActive();
    expect(isActive).to.be.true;
  });
});
