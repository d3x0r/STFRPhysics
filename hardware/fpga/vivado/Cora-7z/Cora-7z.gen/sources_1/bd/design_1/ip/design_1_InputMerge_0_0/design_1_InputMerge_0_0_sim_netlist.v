// Copyright 1986-2022 Xilinx, Inc. All Rights Reserved.
// Copyright 2022-2023 Advanced Micro Devices, Inc. All Rights Reserved.
// --------------------------------------------------------------------------------
// Tool Version: Vivado v.2023.2 (win64) Build 4029153 Fri Oct 13 20:14:34 MDT 2023
// Date        : Fri Jan 12 19:57:45 2024
// Host        : tundra running 64-bit major release  (build 9200)
// Command     : write_verilog -force -mode funcsim
//               m:/FPGA/vivado/highSpeedClock/Cora2/Cora2.gen/sources_1/bd/design_1/ip/design_1_InputMerge_0_0/design_1_InputMerge_0_0_sim_netlist.v
// Design      : design_1_InputMerge_0_0
// Purpose     : This verilog netlist is a functional simulation representation of the design and should not be modified
//               or synthesized. This netlist cannot be used for SDF annotated simulation.
// Device      : xc7z007sclg400-1
// --------------------------------------------------------------------------------
`timescale 1 ps / 1 ps

(* CHECK_LICENSE_TYPE = "design_1_InputMerge_0_0,InputMerge,{}" *) (* DowngradeIPIdentifiedWarnings = "yes" *) (* IP_DEFINITION_SOURCE = "package_project" *) 
(* X_CORE_INFO = "InputMerge,Vivado 2023.2" *) 
(* NotValidForBitStream *)
module design_1_InputMerge_0_0
   (i0,
    i1,
    i2,
    i3,
    outBus);
  input [0:0]i0;
  input [0:0]i1;
  input [0:0]i2;
  input [0:0]i3;
  output [31:0]outBus;

  wire \<const0> ;
  wire [0:0]i0;
  wire [0:0]i1;
  wire [0:0]i2;
  wire [0:0]i3;

  assign outBus[31] = \<const0> ;
  assign outBus[30] = \<const0> ;
  assign outBus[29] = \<const0> ;
  assign outBus[28] = \<const0> ;
  assign outBus[27] = \<const0> ;
  assign outBus[26] = \<const0> ;
  assign outBus[25] = \<const0> ;
  assign outBus[24] = \<const0> ;
  assign outBus[23] = \<const0> ;
  assign outBus[22] = \<const0> ;
  assign outBus[21] = \<const0> ;
  assign outBus[20] = \<const0> ;
  assign outBus[19] = \<const0> ;
  assign outBus[18] = \<const0> ;
  assign outBus[17] = \<const0> ;
  assign outBus[16] = \<const0> ;
  assign outBus[15] = \<const0> ;
  assign outBus[14] = \<const0> ;
  assign outBus[13] = \<const0> ;
  assign outBus[12] = \<const0> ;
  assign outBus[11] = \<const0> ;
  assign outBus[10] = \<const0> ;
  assign outBus[9] = \<const0> ;
  assign outBus[8] = \<const0> ;
  assign outBus[7] = \<const0> ;
  assign outBus[6] = \<const0> ;
  assign outBus[5] = \<const0> ;
  assign outBus[4] = \<const0> ;
  assign outBus[3] = i3;
  assign outBus[2] = i2;
  assign outBus[1] = i1;
  assign outBus[0] = i0;
  GND GND
       (.G(\<const0> ));
endmodule
`ifndef GLBL
`define GLBL
`timescale  1 ps / 1 ps

module glbl ();

    parameter ROC_WIDTH = 100000;
    parameter TOC_WIDTH = 0;
    parameter GRES_WIDTH = 10000;
    parameter GRES_START = 10000;

//--------   STARTUP Globals --------------
    wire GSR;
    wire GTS;
    wire GWE;
    wire PRLD;
    wire GRESTORE;
    tri1 p_up_tmp;
    tri (weak1, strong0) PLL_LOCKG = p_up_tmp;

    wire PROGB_GLBL;
    wire CCLKO_GLBL;
    wire FCSBO_GLBL;
    wire [3:0] DO_GLBL;
    wire [3:0] DI_GLBL;
   
    reg GSR_int;
    reg GTS_int;
    reg PRLD_int;
    reg GRESTORE_int;

//--------   JTAG Globals --------------
    wire JTAG_TDO_GLBL;
    wire JTAG_TCK_GLBL;
    wire JTAG_TDI_GLBL;
    wire JTAG_TMS_GLBL;
    wire JTAG_TRST_GLBL;

    reg JTAG_CAPTURE_GLBL;
    reg JTAG_RESET_GLBL;
    reg JTAG_SHIFT_GLBL;
    reg JTAG_UPDATE_GLBL;
    reg JTAG_RUNTEST_GLBL;

    reg JTAG_SEL1_GLBL = 0;
    reg JTAG_SEL2_GLBL = 0 ;
    reg JTAG_SEL3_GLBL = 0;
    reg JTAG_SEL4_GLBL = 0;

    reg JTAG_USER_TDO1_GLBL = 1'bz;
    reg JTAG_USER_TDO2_GLBL = 1'bz;
    reg JTAG_USER_TDO3_GLBL = 1'bz;
    reg JTAG_USER_TDO4_GLBL = 1'bz;

    assign (strong1, weak0) GSR = GSR_int;
    assign (strong1, weak0) GTS = GTS_int;
    assign (weak1, weak0) PRLD = PRLD_int;
    assign (strong1, weak0) GRESTORE = GRESTORE_int;

    initial begin
	GSR_int = 1'b1;
	PRLD_int = 1'b1;
	#(ROC_WIDTH)
	GSR_int = 1'b0;
	PRLD_int = 1'b0;
    end

    initial begin
	GTS_int = 1'b1;
	#(TOC_WIDTH)
	GTS_int = 1'b0;
    end

    initial begin 
	GRESTORE_int = 1'b0;
	#(GRES_START);
	GRESTORE_int = 1'b1;
	#(GRES_WIDTH);
	GRESTORE_int = 1'b0;
    end

endmodule
`endif
