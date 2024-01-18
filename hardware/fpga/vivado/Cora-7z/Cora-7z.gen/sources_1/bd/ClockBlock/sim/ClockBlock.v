//Copyright 1986-2022 Xilinx, Inc. All Rights Reserved.
//Copyright 2022-2023 Advanced Micro Devices, Inc. All Rights Reserved.
//--------------------------------------------------------------------------------
//Tool Version: Vivado v.2023.2 (win64) Build 4029153 Fri Oct 13 20:14:34 MDT 2023
//Date        : Fri Jan 12 21:54:37 2024
//Host        : tundra running 64-bit major release  (build 9200)
//Command     : generate_target ClockBlock.bd
//Design      : ClockBlock
//Purpose     : IP block netlist
//--------------------------------------------------------------------------------
`timescale 1 ps / 1 ps

(* CORE_GENERATION_INFO = "ClockBlock,IP_Integrator,{x_ipVendor=xilinx.com,x_ipLibrary=BlockDiagram,x_ipName=ClockBlock,x_ipVersion=1.00.a,x_ipLanguage=VERILOG,numBlks=8,numReposBlks=8,numNonXlnxBlks=5,numHierBlks=0,maxHierDepth=0,numSysgenBlks=0,numHlsBlks=0,numHdlrefBlks=1,numPkgbdBlks=0,bdsource=USER,synth_mode=Hierarchical}" *) (* HW_HANDOFF = "ClockBlock.hwdef" *) 
module ClockBlock
   (S00_AXI_araddr,
    S00_AXI_arprot,
    S00_AXI_arready,
    S00_AXI_arvalid,
    S00_AXI_awaddr,
    S00_AXI_awprot,
    S00_AXI_awready,
    S00_AXI_awvalid,
    S00_AXI_bready,
    S00_AXI_bresp,
    S00_AXI_bvalid,
    S00_AXI_rdata,
    S00_AXI_rready,
    S00_AXI_rresp,
    S00_AXI_rvalid,
    S00_AXI_wdata,
    S00_AXI_wready,
    S00_AXI_wstrb,
    S00_AXI_wvalid,
    globalClock,
    s00_axi_aclk,
    s00_axi_aresetn,
    shield_11_8,
    shield_13_12);
  (* X_INTERFACE_INFO = "xilinx.com:interface:aximm:1.0 S00_AXI ARADDR" *) (* X_INTERFACE_PARAMETER = "XIL_INTERFACENAME S00_AXI, ADDR_WIDTH 31, ARUSER_WIDTH 0, AWUSER_WIDTH 0, BUSER_WIDTH 0, CLK_DOMAIN design_1_processing_system7_0_0_FCLK_CLK0, DATA_WIDTH 32, HAS_BRESP 1, HAS_BURST 0, HAS_CACHE 0, HAS_LOCK 0, HAS_PROT 1, HAS_QOS 0, HAS_REGION 0, HAS_RRESP 1, HAS_WSTRB 1, ID_WIDTH 0, INSERT_VIP 0, MAX_BURST_LENGTH 1, NUM_READ_OUTSTANDING 1, NUM_READ_THREADS 1, NUM_WRITE_OUTSTANDING 1, NUM_WRITE_THREADS 1, PHASE 0.0, PROTOCOL AXI4LITE, READ_WRITE_MODE READ_WRITE, RUSER_BITS_PER_BYTE 0, RUSER_WIDTH 0, SUPPORTS_NARROW_BURST 0, WUSER_BITS_PER_BYTE 0, WUSER_WIDTH 0" *) input [7:0]S00_AXI_araddr;
  (* X_INTERFACE_INFO = "xilinx.com:interface:aximm:1.0 S00_AXI ARPROT" *) input [2:0]S00_AXI_arprot;
  (* X_INTERFACE_INFO = "xilinx.com:interface:aximm:1.0 S00_AXI ARREADY" *) output S00_AXI_arready;
  (* X_INTERFACE_INFO = "xilinx.com:interface:aximm:1.0 S00_AXI ARVALID" *) input S00_AXI_arvalid;
  (* X_INTERFACE_INFO = "xilinx.com:interface:aximm:1.0 S00_AXI AWADDR" *) input [7:0]S00_AXI_awaddr;
  (* X_INTERFACE_INFO = "xilinx.com:interface:aximm:1.0 S00_AXI AWPROT" *) input [2:0]S00_AXI_awprot;
  (* X_INTERFACE_INFO = "xilinx.com:interface:aximm:1.0 S00_AXI AWREADY" *) output S00_AXI_awready;
  (* X_INTERFACE_INFO = "xilinx.com:interface:aximm:1.0 S00_AXI AWVALID" *) input S00_AXI_awvalid;
  (* X_INTERFACE_INFO = "xilinx.com:interface:aximm:1.0 S00_AXI BREADY" *) input S00_AXI_bready;
  (* X_INTERFACE_INFO = "xilinx.com:interface:aximm:1.0 S00_AXI BRESP" *) output [1:0]S00_AXI_bresp;
  (* X_INTERFACE_INFO = "xilinx.com:interface:aximm:1.0 S00_AXI BVALID" *) output S00_AXI_bvalid;
  (* X_INTERFACE_INFO = "xilinx.com:interface:aximm:1.0 S00_AXI RDATA" *) output [31:0]S00_AXI_rdata;
  (* X_INTERFACE_INFO = "xilinx.com:interface:aximm:1.0 S00_AXI RREADY" *) input S00_AXI_rready;
  (* X_INTERFACE_INFO = "xilinx.com:interface:aximm:1.0 S00_AXI RRESP" *) output [1:0]S00_AXI_rresp;
  (* X_INTERFACE_INFO = "xilinx.com:interface:aximm:1.0 S00_AXI RVALID" *) output S00_AXI_rvalid;
  (* X_INTERFACE_INFO = "xilinx.com:interface:aximm:1.0 S00_AXI WDATA" *) input [31:0]S00_AXI_wdata;
  (* X_INTERFACE_INFO = "xilinx.com:interface:aximm:1.0 S00_AXI WREADY" *) output S00_AXI_wready;
  (* X_INTERFACE_INFO = "xilinx.com:interface:aximm:1.0 S00_AXI WSTRB" *) input [3:0]S00_AXI_wstrb;
  (* X_INTERFACE_INFO = "xilinx.com:interface:aximm:1.0 S00_AXI WVALID" *) input S00_AXI_wvalid;
  input globalClock;
  (* X_INTERFACE_INFO = "xilinx.com:signal:clock:1.0 CLK.S00_AXI_ACLK CLK" *) (* X_INTERFACE_PARAMETER = "XIL_INTERFACENAME CLK.S00_AXI_ACLK, ASSOCIATED_BUSIF S00_AXI, ASSOCIATED_RESET s00_axi_aresetn, CLK_DOMAIN design_1_processing_system7_0_0_FCLK_CLK0, FREQ_TOLERANCE_HZ -1, INSERT_VIP 0, PHASE 0.0" *) input s00_axi_aclk;
  (* X_INTERFACE_INFO = "xilinx.com:signal:reset:1.0 RST.S00_AXI_ARESETN RST" *) (* X_INTERFACE_PARAMETER = "XIL_INTERFACENAME RST.S00_AXI_ARESETN, INSERT_VIP 0, POLARITY ACTIVE_LOW" *) input s00_axi_aresetn;
  output [3:0]shield_11_8;
  input [1:0]shield_13_12;

  wire [31:0]AXIHeader16_0_oDATA00;
  wire [31:0]COUNTER_0_debug;
  wire [31:0]COUNTER_0_o1COUNTER;
  wire [31:0]COUNTER_0_o1COUNTERHi;
  wire [31:0]COUNTER_0_o1COUNTERPhase;
  wire [31:0]COUNTER_0_o2COUNTER;
  wire [31:0]COUNTER_0_o2COUNTERHi;
  wire [31:0]COUNTER_0_o2COUNTERPhase;
  wire COUNTER_0_oLatchTest1;
  wire COUNTER_0_oLatchTest2;
  wire COUNTER_0_oRdyCOUNTER;
  wire COUNTER_0_oRdyCOUNTER2;
  wire [7:0]Conn1_ARADDR;
  wire [2:0]Conn1_ARPROT;
  wire Conn1_ARREADY;
  wire Conn1_ARVALID;
  wire [7:0]Conn1_AWADDR;
  wire [2:0]Conn1_AWPROT;
  wire Conn1_AWREADY;
  wire Conn1_AWVALID;
  wire Conn1_BREADY;
  wire [1:0]Conn1_BRESP;
  wire Conn1_BVALID;
  wire [31:0]Conn1_RDATA;
  wire Conn1_RREADY;
  wire [1:0]Conn1_RRESP;
  wire Conn1_RVALID;
  wire [31:0]Conn1_WDATA;
  wire Conn1_WREADY;
  wire [3:0]Conn1_WSTRB;
  wire Conn1_WVALID;
  wire [31:0]InputMerge_0_outBus;
  wire [3:0]InputMerge_1_outBus;
  wire [0:0]OutputSplitter_0_o0;
  wire [0:0]OutputSplitter_0_o1;
  wire [0:0]OutputSplitter_0_o2;
  wire [0:0]OutputSplitter_0_o3;
  wire [0:0]OutputSplitter_1_o0;
  wire [0:0]OutputSplitter_1_o1;
  wire globalClock_1;
  wire s00_axi_aclk_1;
  wire s00_axi_aresetn_1;
  wire [1:0]shield_13_12_1;
  wire [0:0]util_vector_logic_0_Res;
  wire [0:0]util_vector_logic_1_Res;

  assign Conn1_ARADDR = S00_AXI_araddr[7:0];
  assign Conn1_ARPROT = S00_AXI_arprot[2:0];
  assign Conn1_ARVALID = S00_AXI_arvalid;
  assign Conn1_AWADDR = S00_AXI_awaddr[7:0];
  assign Conn1_AWPROT = S00_AXI_awprot[2:0];
  assign Conn1_AWVALID = S00_AXI_awvalid;
  assign Conn1_BREADY = S00_AXI_bready;
  assign Conn1_RREADY = S00_AXI_rready;
  assign Conn1_WDATA = S00_AXI_wdata[31:0];
  assign Conn1_WSTRB = S00_AXI_wstrb[3:0];
  assign Conn1_WVALID = S00_AXI_wvalid;
  assign S00_AXI_arready = Conn1_ARREADY;
  assign S00_AXI_awready = Conn1_AWREADY;
  assign S00_AXI_bresp[1:0] = Conn1_BRESP;
  assign S00_AXI_bvalid = Conn1_BVALID;
  assign S00_AXI_rdata[31:0] = Conn1_RDATA;
  assign S00_AXI_rresp[1:0] = Conn1_RRESP;
  assign S00_AXI_rvalid = Conn1_RVALID;
  assign S00_AXI_wready = Conn1_WREADY;
  assign globalClock_1 = globalClock;
  assign s00_axi_aclk_1 = s00_axi_aclk;
  assign s00_axi_aresetn_1 = s00_axi_aresetn;
  assign shield_11_8[3:0] = InputMerge_1_outBus;
  assign shield_13_12_1 = shield_13_12[1:0];
  ClockBlock_CLOCK_INTERFACE_0 CLOCK_INTERFACE
       (.iDATA00(COUNTER_0_o1COUNTER),
        .iDATA01(COUNTER_0_o1COUNTERHi),
        .iDATA02(COUNTER_0_o1COUNTERPhase),
        .iDATA03(COUNTER_0_o2COUNTER),
        .iDATA04(COUNTER_0_o2COUNTERHi),
        .iDATA05(COUNTER_0_o2COUNTERPhase),
        .iDATA06(InputMerge_0_outBus),
        .iDATA07({1'b0,1'b0,1'b0,1'b0,1'b0,1'b0,1'b0,1'b0,1'b0,1'b0,1'b0,1'b0,1'b0,1'b0,1'b0,1'b0,1'b0,1'b0,1'b0,1'b0,1'b0,1'b0,1'b0,1'b0,1'b0,1'b0,1'b0,1'b0,1'b0,1'b0,1'b0,1'b0}),
        .iDATA08(COUNTER_0_debug),
        .oDATA00(AXIHeader16_0_oDATA00),
        .s00_axi_aclk(s00_axi_aclk_1),
        .s00_axi_araddr(Conn1_ARADDR),
        .s00_axi_aresetn(s00_axi_aresetn_1),
        .s00_axi_arprot(Conn1_ARPROT),
        .s00_axi_arready(Conn1_ARREADY),
        .s00_axi_arvalid(Conn1_ARVALID),
        .s00_axi_awaddr(Conn1_AWADDR),
        .s00_axi_awprot(Conn1_AWPROT),
        .s00_axi_awready(Conn1_AWREADY),
        .s00_axi_awvalid(Conn1_AWVALID),
        .s00_axi_bready(Conn1_BREADY),
        .s00_axi_bresp(Conn1_BRESP),
        .s00_axi_bvalid(Conn1_BVALID),
        .s00_axi_rdata(Conn1_RDATA),
        .s00_axi_rready(Conn1_RREADY),
        .s00_axi_rresp(Conn1_RRESP),
        .s00_axi_rvalid(Conn1_RVALID),
        .s00_axi_wdata(Conn1_WDATA),
        .s00_axi_wready(Conn1_WREADY),
        .s00_axi_wstrb(Conn1_WSTRB),
        .s00_axi_wvalid(Conn1_WVALID));
  ClockBlock_COUNTER_0_0 COUNTER_0
       (.debug(COUNTER_0_debug),
        .globalClock(globalClock_1),
        .iLatch1(util_vector_logic_0_Res),
        .iLatch2(util_vector_logic_1_Res),
        .iReset(s00_axi_aresetn_1),
        .iResetLatch1(OutputSplitter_0_o2),
        .iResetLatch2(OutputSplitter_0_o3),
        .o1COUNTER(COUNTER_0_o1COUNTER),
        .o1COUNTERHi(COUNTER_0_o1COUNTERHi),
        .o1COUNTERPhase(COUNTER_0_o1COUNTERPhase),
        .o2COUNTER(COUNTER_0_o2COUNTER),
        .o2COUNTERHi(COUNTER_0_o2COUNTERHi),
        .o2COUNTERPhase(COUNTER_0_o2COUNTERPhase),
        .oLatchTest1(COUNTER_0_oLatchTest1),
        .oLatchTest2(COUNTER_0_oLatchTest2),
        .oRdyCOUNTER(COUNTER_0_oRdyCOUNTER),
        .oRdyCOUNTER2(COUNTER_0_oRdyCOUNTER2));
  ClockBlock_InputMerge_0_0 InputMerge_0
       (.i0(COUNTER_0_oRdyCOUNTER),
        .i1(COUNTER_0_oRdyCOUNTER2),
        .i2(COUNTER_0_oLatchTest1),
        .i3(COUNTER_0_oLatchTest2),
        .outBus(InputMerge_0_outBus));
  ClockBlock_InputMerge_1_0 InputMerge_1
       (.i0(COUNTER_0_oRdyCOUNTER),
        .i1(COUNTER_0_oRdyCOUNTER2),
        .i2(COUNTER_0_oLatchTest1),
        .i3(COUNTER_0_oLatchTest2),
        .outBus(InputMerge_1_outBus));
  ClockBlock_OutputSplitter_0_0 OutputSplitter_0
       (.inBus(AXIHeader16_0_oDATA00),
        .o0(OutputSplitter_0_o0),
        .o1(OutputSplitter_0_o1),
        .o2(OutputSplitter_0_o2),
        .o3(OutputSplitter_0_o3));
  ClockBlock_OutputSplitter_1_0 OutputSplitter_1
       (.inBus(shield_13_12_1),
        .o0(OutputSplitter_1_o0),
        .o1(OutputSplitter_1_o1));
  ClockBlock_util_vector_logic_0_0 util_vector_logic_0
       (.Op1(OutputSplitter_0_o0),
        .Op2(OutputSplitter_1_o0),
        .Res(util_vector_logic_0_Res));
  ClockBlock_util_vector_logic_1_0 util_vector_logic_1
       (.Op1(OutputSplitter_0_o1),
        .Op2(OutputSplitter_1_o1),
        .Res(util_vector_logic_1_Res));
endmodule
