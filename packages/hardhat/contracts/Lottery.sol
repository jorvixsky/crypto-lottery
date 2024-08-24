// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {VRFConsumerBaseV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";

contract Lottery is Pausable, VRFConsumerBaseV2Plus {
    // @notice The Chainlink VRF configuration
    // @dev Subscription ID, VRF Coordinator and Key Hash are required, the rest have default values
    // @dev Default values are Chainlink VRF example values, but can be changed with the proper setter functions
    uint256 public s_subscriptionId;
    bytes32 public keyHash;
    bool public nativePayment = true;
    uint32 public callbackGasLimit = 100000;
    uint16 public requestConfirmations = 3;
    uint32 public numWords = 2;

    // @notice Storage of requests and their respective statuses
    struct RequestStatus {
        bool fulfilled;
        bool exists;
        uint256[] randomWords;
        bytes32 lotteryId;
    }
    mapping(uint256 => RequestStatus) public s_requests;
    uint256[] public requestIds;
    uint256 public lastRequestId;

    struct LotteryInfo {
        bool exists;
        uint256 amount;
        bool isFulfilled;
        uint256[] randomWords;
        address[] winners;
    }
    bool public isLotteryActive = false;

    // @notice Storage of lottery IDs and their status
    mapping(bytes32 => LotteryInfo) public lotteries;

    // @notice The list of participants for each lottery
    mapping(bytes32 => address[]) public participants;

    // @notice Events to be emitted related to the lottery
    event LotteryCreated(uint256 amount, bytes32 lotteryId);
    event WinnersSelected(bytes32 lotteryId, address[] winners);

    // @notice Events to be emitted when the Chainlink VRF configuration is changed
    event ChainlinkVRFConfigurationSet(
        uint256 subscriptionId,
        bytes32 keyHash,
        uint32 callbackGasLimit,
        uint16 requestConfirmations,
        uint32 numWords
    );
    event ChainlinkVRFSubscriptionIdSet(uint256 subscriptionId);
    event ChainlinkVRFKeyHashSet(bytes32 keyHash);
    event ChainlinkVRFNativePaymentSet(bool nativePayment);
    event ChainlinkVRFCallbackGasLimitSet(uint32 callbackGasLimit);
    event ChainlinkVRFRequestConfirmationsSet(uint16 requestConfirmations);
    event ChainlinkVRFNumWordsSet(uint32 numWords);

    // @notice Events to be emitted when a request is sent and fulfilled
    event RequestSent(uint256 requestId, uint32 numWords);
    event RequestFulfilled(uint256 requestId, uint256[] randomWords);

    // @notice Sets the owner of the contract to the address that deployed the contract, plus a the minimal configuration for the Chainlink VRF with defaulted values
    // @dev If the defaults for callback gas limit, request confirmations and/or number of words are not OK, use the proper setter functions to change those
    // @param _s_subscriptionId The Chainlink VRF subscription ID
    // @param _s_vrfCoordinator The Chainlink VRF coordinator address
    // @param _keyHash The Chainlink VRF key hash
    constructor(
        uint256 _s_subscriptionId,
        address _s_vrfCoordinator,
        bytes32 _keyHash
    ) VRFConsumerBaseV2Plus(_s_vrfCoordinator) {
        s_subscriptionId = _s_subscriptionId;
        keyHash = _keyHash;
        emit ChainlinkVRFConfigurationSet(
            _s_subscriptionId,
            _keyHash,
            callbackGasLimit,
            requestConfirmations,
            numWords
        );
    }

    // @notice Enables depositing native tokens to the contract to be used as gas
    // @dev Should NOT be used to deposit the tokens for the lottery, use the createLottery function instead
    function deposit() public payable onlyOwner {}

    function withdraw() public onlyOwner {
        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        require(success, "Failed withdraw");
    }

    // @notice Creates a new lottery
    // @param _participants The addresses of the participants
    function createLottery(
        uint256 _amount
    ) public payable onlyOwner returns (bytes32) {
        require(_amount > 0, "Amount must be greater than 0");
        require(
            msg.value == _amount,
            "Amount must be equal to the value sent to be paid"
        );
        bytes32 lotteryId = keccak256(
            abi.encodePacked(block.timestamp, msg.sender, _amount)
        );
        lotteries[lotteryId] = LotteryInfo({
            exists: true,
            amount: _amount,
            isFulfilled: false,
            randomWords: new uint256[](0),
            winners: new address[](0)
        });
        isLotteryActive = true;
        emit LotteryCreated(_amount, lotteryId);
        return lotteryId;
    }

    // @notice Adds bulk participants to the lottery
    // @param _participants The addresses of the participants
    function addParticipants(
        address[] memory _participants,
        bytes32 _lotteryId
    ) public onlyOwner {
        require(lotteries[_lotteryId].exists, "Lottery does not exist");
        require(
            !lotteries[_lotteryId].isFulfilled,
            "Lottery is already fulfilled"
        );
        for (uint256 i = 0; i < _participants.length; i++) {
            participants[_lotteryId].push(_participants[i]);
        }
    }

    // @notice Sets the Chainlink VRF subscription ID
    // @param _subscriptionId The Chainlink VRF subscription ID
    function setSubscriptionId(uint256 _subscriptionId) public onlyOwner {
        require(_subscriptionId > 0, "Invalid subscription ID");
        s_subscriptionId = _subscriptionId;
        emit ChainlinkVRFSubscriptionIdSet(_subscriptionId);
    }

    // @notice Sets the Chainlink VRF key hash
    // @param _keyHash The Chainlink VRF key hash
    function setKeyHash(bytes32 _keyHash) public onlyOwner {
        require(_keyHash != bytes32(0), "Invalid key hash");
        keyHash = _keyHash;
        emit ChainlinkVRFKeyHashSet(_keyHash);
    }

    // @notice Sets the native payment flag
    // @param _nativePayment Set to `true` to enable payment in native tokens, or `false` to pay in LINK
    function setNativePayment(bool _nativePayment) public onlyOwner {
        nativePayment = _nativePayment;
        emit ChainlinkVRFNativePaymentSet(_nativePayment);
    }

    // @notice Sets the Chainlink VRF callback gas limit
    // @param _callbackGasLimit The Chainlink VRF callback gas limit
    function setCallbackGasLimit(uint32 _callbackGasLimit) public onlyOwner {
        require(_callbackGasLimit > 0, "Invalid callback gas limit");
        callbackGasLimit = _callbackGasLimit;
        emit ChainlinkVRFCallbackGasLimitSet(_callbackGasLimit);
    }

    // @notice Sets the Chainlink VRF request confirmations
    // @param _requestConfirmations The Chainlink VRF request confirmations
    function setRequestConfirmations(
        uint16 _requestConfirmations
    ) public onlyOwner {
        require(_requestConfirmations > 0, "Invalid request confirmations");
        requestConfirmations = _requestConfirmations;
        emit ChainlinkVRFRequestConfirmationsSet(_requestConfirmations);
    }

    // @notice Sets the Chainlink VRF number of words
    // @param _numWords The Chainlink VRF number of words
    function setNumWords(uint32 _numWords) public onlyOwner {
        require(_numWords > 0, "Invalid number of words");
        numWords = _numWords;
        emit ChainlinkVRFNumWordsSet(_numWords);
    }

    // @notice Changes the Chainlink VRF configuration
    // @dev Use only this function to change all values at once, if not, use each set function separately
    // @param _subscriptionId The Chainlink VRF subscription ID
    // @param _vrfCoordinator The Chainlink VRF coordinator address
    // @param _keyHash The Chainlink VRF key hash
    // @param _callbackGasLimit The Chainlink VRF callback gas limit
    // @param _requestConfirmations The Chainlink VRF request confirmations
    // @param _numWords The Chainlink VRF number of words
    function setVRFConfiguration(
        uint256 _subscriptionId,
        bytes32 _keyHash,
        uint32 _callbackGasLimit,
        uint16 _requestConfirmations,
        uint32 _numWords
    ) public onlyOwner {
        require(_subscriptionId > 0, "Invalid subscription ID");
        require(_keyHash != bytes32(0), "Invalid key hash");
        require(_callbackGasLimit > 0, "Invalid callback gas limit");
        require(_requestConfirmations > 0, "Invalid request confirmations");
        require(_numWords > 0, "Invalid number of words");

        s_subscriptionId = _subscriptionId;
        keyHash = _keyHash;
        callbackGasLimit = _callbackGasLimit;
        requestConfirmations = _requestConfirmations;
        numWords = _numWords;

        emit ChainlinkVRFConfigurationSet(
            _subscriptionId,
            _keyHash,
            _callbackGasLimit,
            _requestConfirmations,
            _numWords
        );
    }

    // @notice Requests random words from the Chainlink VRF
    // @dev It will revert if the subscription is not set and funded
    // @param _winners The number of winners to be selected, if set to 0, the number of words will take the default value from the contract
    function requestRandomWords(
        uint32 _winners,
        bytes32 _lotteryId
    ) external onlyOwner returns (uint256 requestId) {
        require(lotteries[_lotteryId].exists, "Lottery does not exist");
        require(
            !lotteries[_lotteryId].isFulfilled,
            "Lottery is already fulfilled"
        );
        require(
            participants[_lotteryId].length > 0,
            "No participants in the lottery"
        );
        uint32 _numWords = numWords;
        if (_winners > 1) {
            _numWords = _winners;
        }
        requestId = s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: keyHash,
                subId: s_subscriptionId,
                requestConfirmations: requestConfirmations,
                callbackGasLimit: callbackGasLimit,
                numWords: _numWords,
                extraArgs: VRFV2PlusClient._argsToBytes(
                    VRFV2PlusClient.ExtraArgsV1({nativePayment: nativePayment})
                )
            })
        );
        s_requests[requestId] = RequestStatus({
            randomWords: new uint256[](0),
            exists: true,
            fulfilled: false,
            lotteryId: _lotteryId
        });
        requestIds.push(requestId);
        lastRequestId = requestId;
        emit RequestSent(requestId, numWords);
        return requestId;
    }

    // @notice Fulfill the Chainlink VRF request
    // @dev This function is called by the Chainlink VRF coordinator when the request is fulfilled
    // @param _requestId The request ID
    // @param _randomWords The random words
    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] calldata _randomWords
    ) internal override {
        require(s_requests[_requestId].exists, "Request not found");
        require(
            !lotteries[s_requests[_requestId].lotteryId].isFulfilled,
            "Lottery is already fulfilled"
        );
        s_requests[_requestId].fulfilled = true;
        s_requests[_requestId].randomWords = _randomWords;
        lotteries[s_requests[_requestId].lotteryId].isFulfilled = true;
        lotteries[s_requests[_requestId].lotteryId].randomWords = _randomWords;
        emit RequestFulfilled(_requestId, _randomWords);
    }

    // @notice Selects the winners of the lottery
    // @param _lotteryId The lottery ID
    function selectWinners(bytes32 _lotteryId) private {
        require(lotteries[_lotteryId].exists, "Lottery does not exist");
        require(
            !lotteries[_lotteryId].isFulfilled,
            "Lottery is already fulfilled"
        );
        require(
            participants[_lotteryId].length > 0,
            "No participants in the lottery"
        );
        uint256[] memory _randomWords = lotteries[_lotteryId].randomWords;
        for (uint256 i = 0; i < _randomWords.length; i++) {
            uint256 randomIndex = _randomWords[i] %
                participants[_lotteryId].length;
            lotteries[_lotteryId].winners.push(
                participants[_lotteryId][randomIndex]
            );
        }
        isLotteryActive = false;
        emit WinnersSelected(_lotteryId, lotteries[_lotteryId].winners);
        payWinners(_lotteryId);
    }

    // @notice Pays the winners of the lottery
    // @param _lotteryId The lottery ID
    function payWinners(bytes32 _lotteryId) private {
        for (uint256 i = 0; i < lotteries[_lotteryId].winners.length; i++) {
            address winner = lotteries[_lotteryId].winners[i];
            (bool success, ) = winner.call{
                value: lotteries[_lotteryId].amount /
                    lotteries[_lotteryId].winners.length
            }("");
            require(success, "Payment to winner failed");
        }
        lotteries[_lotteryId].isFulfilled = true;
    }

    // @notice Gets the status of a request
    // @param _requestId The request ID
    function getRequestStatus(
        uint256 _requestId
    ) external view returns (bool fulfilled, uint256[] memory randomWords) {
        require(s_requests[_requestId].exists, "Request not found");
        RequestStatus memory request = s_requests[_requestId];
        return (request.fulfilled, request.randomWords);
    }

    // @notice Uses the Pausable contract from OpenZeppelin to pause the contract in case of emergency
    function pause() public onlyOwner {
        _pause();
    }

    // @notice Uses the Pausable contract from OpenZeppelin to unpause the contract
    function unpause() public onlyOwner {
        _unpause();
    }
}
