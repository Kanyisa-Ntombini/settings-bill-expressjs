module.exports = function SettingsBill() {
    var theCallCost = 0;
    var theSmsCost = 0;
    var theWarningLevel = 0;
    var theCriticalLevel = 0;

    //OUTPUTS
    var totalCallCost = 0;
    var totalSmsCost = 0;

    //SETTERS 
    function setCallCost(callCost) {
        theCallCost = parseFloat(callCost);
    }

    function setSmsCost(smsCost) {
        theSmsCost = parseFloat(smsCost);
    }

    function setWarningLevel(warningLevel) {
        theWarningLevel = warningLevel;
    }

    function setCriticalLevel(criticalLevel) {
        theCriticalLevel = criticalLevel;
    }

    //GETTERS
    function getSmsCost() {
        return theSmsCost;
    }

    function getCallCost() {
        return theCallCost;
    }

    function getWarningLevel() {
        return theWarningLevel;
    }

    function getCriticalLevel() {
        return theCriticalLevel;
    }

    //USING CODE
    function makeCall() {
        if (!criticalLevelReached()) {
            totalCallCost += theCallCost;
        }
    }

    function sendSms() {
        if (!criticalLevelReached()) {
            totalSmsCost += theSmsCost;
        }
    }

    //GET TOTAL COSTS
    function getTotalCallCost() {
        return totalCallCost;
    }

    function getTotalSmsCost() {
        return totalSmsCost;
    }

    function getTotalCost() {
        return totalSmsCost + totalCallCost;
    }

    //WARNING AND CRITICAL LEVEL
    function criticalLevelReached () {
        return getTotalCost() >= getCriticalLevel();
    }

    function getClassTotal() {
        if (criticalLevelReached()) {
            return 'danger';
        }

        if (getTotalCost() > getWarningLevel()) {
            return 'warning';
        }
    }

    return {
        setCallCost,
        getCallCost,
        setSmsCost,
        getSmsCost,
        setWarningLevel,
        getWarningLevel,
        setCriticalLevel,
        getCriticalLevel,
        makeCall,
        getTotalCallCost,
        sendSms,
        getTotalSmsCost,
        getTotalCost,
        getClassTotal,
        criticalLevelReached
    }
}