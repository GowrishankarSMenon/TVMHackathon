// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SimpleCrimeReporting {
    struct Report {
        uint256 id;
        string name;
        string description;
        string drugType;
        string activityType;
        string lastSeen;
        string additionalInfo;
        address reporter;
    }

    Report[] public reports;

    event ReportSubmitted(
        uint256 indexed reportId,
        string name,
        string description,
        string drugType,
        string activityType,
        string lastSeen,
        string additionalInfo
    );

    function submitReport(
        string memory _name,
        string memory _description,
        string memory _drugType,
        string memory _activityType,
        string memory _lastSeen,
        string memory _additionalInfo
    ) public {
        reports.push(
            Report(
                reports.length + 1,
                _name,
                _description,
                _drugType,
                _activityType,
                _lastSeen,
                _additionalInfo,
                msg.sender
            )
        );

        emit ReportSubmitted(
            reports.length,
            _name,
            _description,
            _drugType,
            _activityType,
            _lastSeen,
            _additionalInfo
        );
    }

    function getAllReports() public view returns (Report[] memory) {
        return reports;
    }

    function getReportById(uint256 _reportId) public view returns (Report memory) {
        require(_reportId > 0 && _reportId <= reports.length, "Invalid report ID");
        return reports[_reportId - 1];
    }
}
