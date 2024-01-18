// (c) Copyright 1986-2022 Xilinx, Inc. All Rights Reserved.
// (c) Copyright 2022-2024 Advanced Micro Devices, Inc. All rights reserved.
// 
// This file contains confidential and proprietary information
// of AMD and is protected under U.S. and international copyright
// and other intellectual property laws.
// 
// DISCLAIMER
// This disclaimer is not a license and does not grant any
// rights to the materials distributed herewith. Except as
// otherwise provided in a valid license issued to you by
// AMD, and to the maximum extent permitted by applicable
// law: (1) THESE MATERIALS ARE MADE AVAILABLE "AS IS" AND
// WITH ALL FAULTS, AND AMD HEREBY DISCLAIMS ALL WARRANTIES
// AND CONDITIONS, EXPRESS, IMPLIED, OR STATUTORY, INCLUDING
// BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, NON-
// INFRINGEMENT, OR FITNESS FOR ANY PARTICULAR PURPOSE; and
// (2) AMD shall not be liable (whether in contract or tort,
// including negligence, or under any other theory of
// liability) for any loss or damage of any kind or nature
// related to, arising under or in connection with these
// materials, including for any direct, or any indirect,
// special, incidental, or consequential loss or damage
// (including loss of data, profits, goodwill, or any type of
// loss or damage suffered as a result of any action brought
// by a third party) even if such damage or loss was
// reasonably foreseeable or AMD had been advised of the
// possibility of the same.
// 
// CRITICAL APPLICATIONS
// AMD products are not designed or intended to be fail-
// safe, or for use in any application requiring fail-safe
// performance, such as life-support or safety devices or
// systems, Class III medical devices, nuclear facilities,
// applications related to the deployment of airbags, or any
// other applications that could lead to death, personal
// injury, or severe property or environmental damage
// (individually and collectively, "Critical
// Applications"). Customer assumes the sole risk and
// liability of any use of AMD products in Critical
// Applications, subject only to applicable laws and
// regulations governing limitations on product liability.
// 
// THIS COPYRIGHT NOTICE AND DISCLAIMER MUST BE RETAINED AS
// PART OF THIS FILE AT ALL TIMES.
// 
// DO NOT MODIFY THIS FILE.


// IP VLNV: xilinx.com:module_ref:COUNTER:1.0
// IP Revision: 1

`timescale 1ns/1ps

(* IP_DEFINITION_SOURCE = "module_ref" *)
(* DowngradeIPIdentifiedWarnings = "yes" *)
module design_1_COUNTER_0_0 (
  globalClock,
  iReset,
  iLatch1,
  iLatch2,
  iResetLatch1,
  iResetLatch2,
  o1COUNTER,
  o1COUNTERHi,
  o1COUNTERPhase,
  o2COUNTER,
  o2COUNTERHi,
  o2COUNTERPhase,
  oRdyCOUNTER,
  oRdyCOUNTER2,
  oLatchTest1,
  oLatchTest2,
  debug
);

input wire globalClock;
input wire iReset;
input wire iLatch1;
input wire iLatch2;
input wire iResetLatch1;
input wire iResetLatch2;
output wire [31 : 0] o1COUNTER;
output wire [31 : 0] o1COUNTERHi;
output wire [31 : 0] o1COUNTERPhase;
output wire [31 : 0] o2COUNTER;
output wire [31 : 0] o2COUNTERHi;
output wire [31 : 0] o2COUNTERPhase;
output wire oRdyCOUNTER;
output wire oRdyCOUNTER2;
output wire oLatchTest1;
output wire oLatchTest2;
output wire [31 : 0] debug;

  COUNTER #(
    .pWIDTH(64),
    .PHASE_SIZE(26)
  ) inst (
    .globalClock(globalClock),
    .iReset(iReset),
    .iLatch1(iLatch1),
    .iLatch2(iLatch2),
    .iResetLatch1(iResetLatch1),
    .iResetLatch2(iResetLatch2),
    .o1COUNTER(o1COUNTER),
    .o1COUNTERHi(o1COUNTERHi),
    .o1COUNTERPhase(o1COUNTERPhase),
    .o2COUNTER(o2COUNTER),
    .o2COUNTERHi(o2COUNTERHi),
    .o2COUNTERPhase(o2COUNTERPhase),
    .oRdyCOUNTER(oRdyCOUNTER),
    .oRdyCOUNTER2(oRdyCOUNTER2),
    .oLatchTest1(oLatchTest1),
    .oLatchTest2(oLatchTest2),
    .debug(debug)
  );
endmodule
