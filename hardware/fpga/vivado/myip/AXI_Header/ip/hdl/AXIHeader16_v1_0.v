
`timescale 1 ns / 1 ps

	module AXIHeader16_v1_0 #
	(
		// Users to add parameters here

		// User parameters ends
		// Do not modify the parameters beyond this line


		// Parameters of Axi Slave Bus Interface S00_AXI
		parameter integer C_S00_AXI_DATA_WIDTH	= 32,
		parameter integer C_S00_AXI_ADDR_WIDTH	= 8,
		parameter integer INPUTS	= 16,
		parameter integer OUTPUTS	= 16

	)
	(
		// Users to add ports here
        input [C_S00_AXI_DATA_WIDTH-1:0] iDATA00,
        input [C_S00_AXI_DATA_WIDTH-1:0] iDATA01,
        input [C_S00_AXI_DATA_WIDTH-1:0] iDATA02,
        input [C_S00_AXI_DATA_WIDTH-1:0] iDATA03,
        input [C_S00_AXI_DATA_WIDTH-1:0] iDATA04,
        input [C_S00_AXI_DATA_WIDTH-1:0] iDATA05,
        input [C_S00_AXI_DATA_WIDTH-1:0] iDATA06,
        input [C_S00_AXI_DATA_WIDTH-1:0] iDATA07,
        input [C_S00_AXI_DATA_WIDTH-1:0] iDATA08,
        input [C_S00_AXI_DATA_WIDTH-1:0] iDATA09,
        input [C_S00_AXI_DATA_WIDTH-1:0] iDATA10,
        input [C_S00_AXI_DATA_WIDTH-1:0] iDATA11,
        input [C_S00_AXI_DATA_WIDTH-1:0] iDATA12,
        input [C_S00_AXI_DATA_WIDTH-1:0] iDATA13,
        input [C_S00_AXI_DATA_WIDTH-1:0] iDATA14,
        input [C_S00_AXI_DATA_WIDTH-1:0] iDATA15,
        output [C_S00_AXI_DATA_WIDTH-1:0] oDATA00,
        output [C_S00_AXI_DATA_WIDTH-1:0] oDATA01,
        output [C_S00_AXI_DATA_WIDTH-1:0] oDATA02,
        output [C_S00_AXI_DATA_WIDTH-1:0] oDATA03,
        output [C_S00_AXI_DATA_WIDTH-1:0] oDATA04,
        output [C_S00_AXI_DATA_WIDTH-1:0] oDATA05,
        output [C_S00_AXI_DATA_WIDTH-1:0] oDATA06,
        output [C_S00_AXI_DATA_WIDTH-1:0] oDATA07,
        output [C_S00_AXI_DATA_WIDTH-1:0] oDATA08,
        output [C_S00_AXI_DATA_WIDTH-1:0] oDATA09,
        output [C_S00_AXI_DATA_WIDTH-1:0] oDATA10,
        output [C_S00_AXI_DATA_WIDTH-1:0] oDATA11,
        output [C_S00_AXI_DATA_WIDTH-1:0] oDATA12,
        output [C_S00_AXI_DATA_WIDTH-1:0] oDATA13,
        output [C_S00_AXI_DATA_WIDTH-1:0] oDATA14,
        output [C_S00_AXI_DATA_WIDTH-1:0] oDATA15,
		// User ports ends
		// Do not modify the ports beyond this line


		// Ports of Axi Slave Bus Interface S00_AXI
		input wire  s00_axi_aclk,
		input wire  s00_axi_aresetn,
		input wire [C_S00_AXI_ADDR_WIDTH-1 : 0] s00_axi_awaddr,
		input wire [2 : 0] s00_axi_awprot,
		input wire  s00_axi_awvalid,
		output wire  s00_axi_awready,
		input wire [C_S00_AXI_DATA_WIDTH-1 : 0] s00_axi_wdata,
		input wire [(C_S00_AXI_DATA_WIDTH/8)-1 : 0] s00_axi_wstrb,
		input wire  s00_axi_wvalid,
		output wire  s00_axi_wready,
		output wire [1 : 0] s00_axi_bresp,
		output wire  s00_axi_bvalid,
		input wire  s00_axi_bready,
		input wire [C_S00_AXI_ADDR_WIDTH-1 : 0] s00_axi_araddr,
		input wire [2 : 0] s00_axi_arprot,
		input wire  s00_axi_arvalid,
		output wire  s00_axi_arready,
		output wire [C_S00_AXI_DATA_WIDTH-1 : 0] s00_axi_rdata,
		output wire [1 : 0] s00_axi_rresp,
		output wire  s00_axi_rvalid,
		input wire  s00_axi_rready
	);
// Instantiation of Axi Bus Interface S00_AXI
	AXIHeader16_v1_0_S00_AXI # ( 
		.C_S_AXI_DATA_WIDTH(C_S00_AXI_DATA_WIDTH),
		.C_S_AXI_ADDR_WIDTH(C_S00_AXI_ADDR_WIDTH),
		.INPUTS(INPUTS),
		.OUTPUTS(OUTPUTS)
	) AXIHeader16_v1_0_S00_AXI_inst (
	    .iDATA00(iDATA00),
	    .iDATA01(iDATA01),
	    .iDATA02(iDATA02),
	    .iDATA03(iDATA03),
	    .iDATA04(iDATA04),
	    .iDATA05(iDATA05),
	    .iDATA06(iDATA06),
	    .iDATA07(iDATA07),
	    .iDATA08(iDATA08),
	    .iDATA09(iDATA09),
	    .iDATA10(iDATA10),
	    .iDATA11(iDATA11),
	    .iDATA12(iDATA12),
	    .iDATA13(iDATA13),
	    .iDATA14(iDATA14),
	    .iDATA15(iDATA15),
	    .oDATA00(oDATA00),
	    .oDATA01(oDATA01),
	    .oDATA02(oDATA02),
	    .oDATA03(oDATA03),
	    .oDATA04(oDATA04),
	    .oDATA05(oDATA05),
	    .oDATA06(oDATA06),
	    .oDATA07(oDATA07),
	    .oDATA08(oDATA08),
	    .oDATA09(oDATA09),
	    .oDATA10(oDATA10),
	    .oDATA11(oDATA11),
	    .oDATA12(oDATA12),
	    .oDATA13(oDATA13),
	    .oDATA14(oDATA14),
	    .oDATA15(oDATA15),
	    .S_AXI_ACLK(s00_axi_aclk),
		.S_AXI_ARESETN(s00_axi_aresetn),
		.S_AXI_AWADDR(s00_axi_awaddr),
		.S_AXI_AWPROT(s00_axi_awprot),
		.S_AXI_AWVALID(s00_axi_awvalid),
		.S_AXI_AWREADY(s00_axi_awready),
		.S_AXI_WDATA(s00_axi_wdata),
		.S_AXI_WSTRB(s00_axi_wstrb),
		.S_AXI_WVALID(s00_axi_wvalid),
		.S_AXI_WREADY(s00_axi_wready),
		.S_AXI_BRESP(s00_axi_bresp),
		.S_AXI_BVALID(s00_axi_bvalid),
		.S_AXI_BREADY(s00_axi_bready),
		.S_AXI_ARADDR(s00_axi_araddr),
		.S_AXI_ARPROT(s00_axi_arprot),
		.S_AXI_ARVALID(s00_axi_arvalid),
		.S_AXI_ARREADY(s00_axi_arready),
		.S_AXI_RDATA(s00_axi_rdata),
		.S_AXI_RRESP(s00_axi_rresp),
		.S_AXI_RVALID(s00_axi_rvalid),
		.S_AXI_RREADY(s00_axi_rready)
	);

	// Add user logic here

	// User logic ends

	endmodule
