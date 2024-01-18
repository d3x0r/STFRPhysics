// Copyright 1986-2022 Xilinx, Inc. All Rights Reserved.
// Copyright 2022-2023 Advanced Micro Devices, Inc. All Rights Reserved.
// --------------------------------------------------------------------------------
// Tool Version: Vivado v.2023.2 (win64) Build 4029153 Fri Oct 13 20:14:34 MDT 2023
// Date        : Fri Jan 12 19:57:45 2024
// Host        : tundra running 64-bit major release  (build 9200)
// Command     : write_verilog -force -mode synth_stub
//               m:/FPGA/vivado/highSpeedClock/Cora2/Cora2.gen/sources_1/bd/design_1/ip/design_1_InputMerge_0_0/design_1_InputMerge_0_0_stub.v
// Design      : design_1_InputMerge_0_0
// Purpose     : Stub declaration of top-level module interface
// Device      : xc7z007sclg400-1
// --------------------------------------------------------------------------------

// This empty module with port declaration file causes synthesis tools to infer a black box for IP.
// The synthesis directives are for Synopsys Synplify support to prevent IO buffer insertion.
// Please paste the declaration into a Verilog source file or add the file as an additional source.
(* X_CORE_INFO = "InputMerge,Vivado 2023.2" *)
module design_1_InputMerge_0_0(i0, i1, i2, i3, outBus)
/* synthesis syn_black_box black_box_pad_pin="i0[0:0],i1[0:0],i2[0:0],i3[0:0],outBus[31:0]" */;
  input [0:0]i0;
  input [0:0]i1;
  input [0:0]i2;
  input [0:0]i3;
  output [31:0]outBus;
endmodule
