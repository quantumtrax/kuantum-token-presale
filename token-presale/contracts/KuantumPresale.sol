// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract KuantumPresale {
    address public owner;
    uint256 public tokenPrice = 0.001 ether; // 1 KTK = 0.001 ETH
    uint256 public totalRaised;
    uint256 public maxGoal = 5 ether; // 5 ETH goal (smaller for testing)
    bool public presaleActive = true;
    
    mapping(address => uint256) public contributions;
    mapping(address => uint256) public tokenBalances;
    
    event TokensPurchased(address indexed buyer, uint256 ethAmount, uint256 tokenAmount);
    event PresaleEnded();
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
    
    modifier presaleIsActive() {
        require(presaleActive, "Presale is not active");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    function buyTokens() external payable presaleIsActive {
        require(msg.value > 0, "ETH amount must be greater than 0");
        require(totalRaised + msg.value <= maxGoal, "Exceeds max goal");
        
        uint256 tokenAmount = (msg.value * 1000) / tokenPrice;
        
        contributions[msg.sender] += msg.value;
        tokenBalances[msg.sender] += tokenAmount;
        totalRaised += msg.value;
        
        emit TokensPurchased(msg.sender, msg.value, tokenAmount);
    }
    
    function getTokenBalance(address user) external view returns (uint256) {
        return tokenBalances[user];
    }
    
    function getContribution(address user) external view returns (uint256) {
        return contributions[user];
    }
    
    function getPresaleProgress() external view returns (uint256, uint256) {
        return (totalRaised, maxGoal);
    }
    
    function endPresale() external onlyOwner {
        presaleActive = false;
        emit PresaleEnded();
    }
    
    function withdrawFunds() external onlyOwner {
        require(!presaleActive, "Presale is still active");
        payable(owner).transfer(address(this).balance);
    }
    
    function emergencyWithdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
    
    function updateTokenPrice(uint256 newPrice) external onlyOwner {
        tokenPrice = newPrice;
    }
    
    receive() external payable {
        buyTokens();
    }
}