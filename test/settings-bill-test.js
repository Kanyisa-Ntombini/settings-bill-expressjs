const assert = require('assert');
const SettingsBill = require('../settings-bill');

describe('The SettingsBill function',
    function () {
        it('should check if set and get functions work for the call costs',
            function () {
                let settingsBill = SettingsBill();
                settingsBill.setCallCost(2);
                settingsBill.setWarningLevel(5);
                settingsBill.setCriticalLevel(10);
                assert.deepEqual(2, settingsBill.getCallCost());

                let settingsBill2 = SettingsBill();
                settingsBill2.setCallCost(3);
                settingsBill2.setWarningLevel(5);
                settingsBill2.setCriticalLevel(10);
                assert.deepEqual(3, settingsBill2.getCallCost());
            }
        );

        it('should check if set and get functions work for the sms costs',
            function () {
                let settingsBill = SettingsBill();
                settingsBill.setSmsCost(0.55);
                settingsBill.setWarningLevel(5);
                settingsBill.setCriticalLevel(10);
                assert.deepEqual(0.55, settingsBill.getSmsCost());

                let settingsBill2 = SettingsBill();
                settingsBill2.setSmsCost(1.25);
                settingsBill2.setWarningLevel(5);
                settingsBill2.setCriticalLevel(10);
                assert.deepEqual(1.25, settingsBill2.getSmsCost());
            }
        );

        it('should check if set and get functions work for the warning levels',
            function () {
                let settingsBill = SettingsBill();
                settingsBill.setWarningLevel(25);
                settingsBill.setCriticalLevel(50);
                assert.deepEqual(25, settingsBill.getWarningLevel());

                let settingsBill2 = SettingsBill();
                settingsBill2.setWarningLevel(15);
                assert.deepEqual(15, settingsBill2.getWarningLevel());
            }
        );

        it('should check if set and get functions work for the critical levels',
            function () {
                let settingsBill = SettingsBill();
                settingsBill.setCriticalLevel(35);
                settingsBill.setWarningLevel(5);
                assert.deepEqual(35, settingsBill.getCriticalLevel());

                let settingsBill2 = SettingsBill();
                settingsBill2.setCriticalLevel(50);
                settingsBill2.setWarningLevel(5);
                assert.deepEqual(50, settingsBill2.getCriticalLevel());
            }
        );

        it('should calculate the total call cost for 2 calls at R2.10 each',
            function () {
                let settingsBill = SettingsBill();
                settingsBill.setCallCost(2.10);
                settingsBill.setWarningLevel(5);
                settingsBill.setCriticalLevel(10);

                settingsBill.makeCall();
                settingsBill.makeCall();

                assert.deepEqual(4.20, settingsBill.getTotalCallCost());
                assert.deepEqual(0.00, settingsBill.getTotalSmsCost());
                assert.deepEqual(4.20, settingsBill.getTotalCost());
            }
        );

        it('should calculate the total cost for 4 smses at R0.95 each',
            function () {
                let settingsBill = SettingsBill();
                settingsBill.setSmsCost(0.95);
                settingsBill.setWarningLevel(5);
                settingsBill.setCriticalLevel(10);

                settingsBill.sendSms();
                settingsBill.sendSms();
                settingsBill.sendSms();
                settingsBill.sendSms();

                assert.deepEqual(3.80, settingsBill.getTotalSmsCost());
                assert.deepEqual(0.00, settingsBill.getTotalCallCost());
                assert.deepEqual(3.80, settingsBill.getTotalCost());
            }
        );

        it('should calculate the total cost for 1 sms (R1.50 each) and 3 calls (R3.35 each)',
            function () {
                let settingsBill = SettingsBill();
                settingsBill.setSmsCost(0.95);
                settingsBill.setCallCost(3.35);
                settingsBill.setWarningLevel(5);
                settingsBill.setCriticalLevel(10);

                settingsBill.sendSms();
                settingsBill.makeCall();
                settingsBill.makeCall();
                settingsBill.makeCall();

                assert.deepEqual(0.95, settingsBill.getTotalSmsCost());
                assert.deepEqual(10.05, settingsBill.getTotalCallCost());
                assert.deepEqual(11.00, settingsBill.getTotalCost());
            }
        );

        it('should if the warning level has been reached',
            function () {
                let settingsBill = SettingsBill();
                settingsBill.setSmsCost(0.95);
                settingsBill.setCallCost(3.35);
                settingsBill.setWarningLevel(5);
                settingsBill.setCriticalLevel(10);

                settingsBill.sendSms();
                settingsBill.sendSms();
                settingsBill.sendSms();
                settingsBill.makeCall();
                settingsBill.makeCall();

                assert.deepEqual('warning', settingsBill.getClassTotal());
            }
        );

        it('should if the danger level has been reached',
            function () {
                let settingsBill = SettingsBill();
                settingsBill.setSmsCost(0.95);
                settingsBill.setCallCost(3.35);
                settingsBill.setWarningLevel(5);
                settingsBill.setCriticalLevel(10);

                settingsBill.makeCall();
                settingsBill.sendSms();
                settingsBill.sendSms();
                settingsBill.sendSms();
                settingsBill.sendSms();
                settingsBill.sendSms();
                settingsBill.makeCall();
                settingsBill.makeCall();

                assert.deepEqual('danger', settingsBill.getClassTotal());
            }
        );

        it('the total amount should stop updating when the danger level is reached',
            function () {
                let settingsBill = SettingsBill();
                settingsBill.setSmsCost(1);
                settingsBill.setCallCost(2);
                settingsBill.setWarningLevel(5);
                settingsBill.setCriticalLevel(10);

                settingsBill.makeCall();
                settingsBill.sendSms();
                settingsBill.sendSms();
                settingsBill.sendSms();
                settingsBill.sendSms();
                settingsBill.sendSms();
                settingsBill.makeCall();
                settingsBill.makeCall();
                settingsBill.makeCall();
                settingsBill.makeCall();

                assert.deepEqual(11,settingsBill.getTotalCost());
                assert.deepEqual('danger', settingsBill.getClassTotal());
            }
        );

        it('it should allow for the critical level to be updated',
            function () {
                let settingsBill = SettingsBill();
                settingsBill.setSmsCost(1.25);
                settingsBill.setCallCost(3.35);
                settingsBill.setWarningLevel(5);
                settingsBill.setCriticalLevel(10);

                settingsBill.makeCall();
                settingsBill.sendSms();
                settingsBill.sendSms();
                settingsBill.makeCall();
                settingsBill.makeCall();
                settingsBill.sendSms();

                assert.deepEqual(12.55,settingsBill.getTotalCost());
                assert.deepEqual('danger', settingsBill.getClassTotal());

                settingsBill.setCriticalLevel(15);
                settingsBill.makeCall();
                settingsBill.sendSms();
                settingsBill.sendSms();

                assert.deepEqual(15.9,settingsBill.getTotalCost());
                assert.deepEqual('danger', settingsBill.getClassTotal());
            }
        );
    }
)
