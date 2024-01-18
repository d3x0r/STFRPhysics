// Copyright 1986-2022 Xilinx, Inc. All Rights Reserved.
// Copyright 2022-2023 Advanced Micro Devices, Inc. All Rights Reserved.
// --------------------------------------------------------------------------------
// Tool Version: Vivado v.2023.2 (win64) Build 4029153 Fri Oct 13 20:14:34 MDT 2023
// Date        : Thu Jan 18 00:55:44 2024
// Host        : tundra running 64-bit major release  (build 9200)
// Command     : write_verilog -force -mode synth_stub
//               m:/javascript/carWars/dual-quat/STFRPhysics/hardware/fpga/vivado/Cora-7z/Cora-7z.gen/sources_1/bd/design_1/ip/design_1_COUNTER_0_0/design_1_COUNTER_0_0_stub.v
// Design      : design_1_COUNTER_0_0
// Purpose     : Stub declaration of top-level module interface
// Device      : xc7z007sclg400-1
// --------------------------------------------------------------------------------

// This empty module with port declaration file causes synthesis tools to infer a black box for IP.
// The synthesis directives are for Synopsys Synplify support to prevent IO buffer insertion.
// Please paste the declaration into a Verilog source file or add the file as an additional source.
(* X_CORE_INFO = "COUNTER,Vivado 2023.2" *)
module design_1_COUNTER_0_0(globalClock, iReset, iLatch1, iLatch2, 
  iResetLatch1, iResetLatch2, o1COUNTER, o1COUNTERHi, o1COUNTERPhase, o2COUNTER, o2COUNTERHi, 
  o2COUNTERPhase, oRdyCOUNTER, oRdyCOUNTER2, oLatchTest1, oLatchTest2, debug)
/* synthesis syn_black_box black_box_pad_pin="iReset,iResetLatch1,iResetLatch2,o1COUNTER[31:0],o1COUNTERHi[31:0],o1COUNTERPhase[31:0],o2COUNTER[31:0],o2COUNTERHi[31:0],o2COUNTERPhase[31:0],oRdyCOUNTER,oRdyCOUNTER2,oLatchTest1,oLatchTest2,debug[31:0]" */
/* synthesis syn_force_seq_prim="globalClock" */
/* synthesis syn_force_seq_prim="iLatch1" */
/* synthesis syn_force_seq_prim="iLatch2" */;
  input globalClock /* synthesis syn_isclock = 1 */;
  input iReset;
  input iLatch1 /* synthesis syn_isclock = 1 */;
  input iLatch2 /* synthesis syn_isclock = 1 */;
  input iResetLatch1;
  input iResetLatch2;
  output [31:0]o1COUNTER;
  output [31:0]o1COUNTERHi;
  output [31:0]o1COUNTERPhase;
  output [31:0]o2COUNTER;
  output [31:0]o2COUNTERHi;
  output [31:0]o2COUNTERPhase;
  output oRdyCOUNTER;
  output oRdyCOUNTER2;
  output oLatchTest1;
  output oLatchTest2;
  output [31:0]debug;
endmodule
