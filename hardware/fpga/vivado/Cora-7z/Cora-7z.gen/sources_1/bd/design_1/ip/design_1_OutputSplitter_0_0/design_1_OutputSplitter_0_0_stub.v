// Copyright 1986-2022 Xilinx, Inc. All Rights Reserved.
// Copyright 2022-2023 Advanced Micro Devices, Inc. All Rights Reserved.
// --------------------------------------------------------------------------------
// Tool Version: Vivado v.2023.2 (win64) Build 4029153 Fri Oct 13 20:14:34 MDT 2023
// Date        : Sun Jan 21 18:41:36 2024
// Host        : tundra running 64-bit major release  (build 9200)
// Command     : write_verilog -force -mode synth_stub
//               m:/javascript/carWars/dual-quat/STFRPhysics/hardware/fpga/vivado/Cora-7z/Cora-7z.gen/sources_1/bd/design_1/ip/design_1_OutputSplitter_0_0/design_1_OutputSplitter_0_0_stub.v
// Design      : design_1_OutputSplitter_0_0
// Purpose     : Stub declaration of top-level module interface
// Device      : xc7z007sclg400-1
// --------------------------------------------------------------------------------

// This empty module with port declaration file causes synthesis tools to infer a black box for IP.
// The synthesis directives are for Synopsys Synplify support to prevent IO buffer insertion.
// Please paste the declaration into a Verilog source file or add the file as an additional source.
(* X_CORE_INFO = "OutputSplitter,Vivado 2023.2" *)
module design_1_OutputSplitter_0_0(inBus, o0, o1)
/* synthesis syn_black_box black_box_pad_pin="inBus[31:0],o0[0:0],o1[0:0]" */;
  input [31:0]inBus;
  output [0:0]o0;
  output [0:0]o1;
endmodule
