pragma solidity ^0.4.24;

contract bidding {
    string highestTitle;
    string highestfName;
    string highestlName;
    uint highestBid;
    uint amount;
    
    constructor() public {
        highestTitle = "Empty";
        highestfName = "Empty";
        highestlName = "Empty";
        highestBid = 0;
    }
    
    event recentVoter(
        string rtitle,
        string rfName,
        string rlName,
        uint ramount
    );
    
    event highestVoter(
        string htitle,
        string hfName,
        string hlName,
        uint hamount
    );
    
    function voting(string _title, string _fName, string _lName, uint _amount) public {
        if (_amount > highestBid) {
            highestTitle = _title;
            highestfName = _fName;
            highestlName = _lName;
            highestBid = _amount;
            
            emit highestVoter(_title, _fName, _lName, _amount);
        }
        amount = _amount;
        emit recentVoter(_title, _fName, _lName, _amount);
    }
    
    function getVoter() public view returns(string, string, string, uint) {
        return (highestTitle, highestfName, highestlName, highestBid);
    }
}