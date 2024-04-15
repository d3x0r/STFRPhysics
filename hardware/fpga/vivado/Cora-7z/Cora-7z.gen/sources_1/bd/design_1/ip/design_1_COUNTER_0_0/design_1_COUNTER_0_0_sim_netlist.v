// Copyright 1986-2022 Xilinx, Inc. All Rights Reserved.
// Copyright 2022-2023 Advanced Micro Devices, Inc. All Rights Reserved.
// --------------------------------------------------------------------------------
// Tool Version: Vivado v.2023.2 (win64) Build 4029153 Fri Oct 13 20:14:34 MDT 2023
// Date        : Mon Jan 22 01:58:43 2024
// Host        : tundra running 64-bit major release  (build 9200)
// Command     : write_verilog -force -mode funcsim
//               m:/javascript/carWars/dual-quat/STFRPhysics/hardware/fpga/vivado/Cora-7z/Cora-7z.gen/sources_1/bd/design_1/ip/design_1_COUNTER_0_0/design_1_COUNTER_0_0_sim_netlist.v
// Design      : design_1_COUNTER_0_0
// Purpose     : This verilog netlist is a functional simulation representation of the design and should not be modified
//               or synthesized. This netlist cannot be used for SDF annotated simulation.
// Device      : xc7z007sclg400-1
// --------------------------------------------------------------------------------
`timescale 1 ps / 1 ps

(* CHECK_LICENSE_TYPE = "design_1_COUNTER_0_0,COUNTER,{}" *) (* DowngradeIPIdentifiedWarnings = "yes" *) (* IP_DEFINITION_SOURCE = "module_ref" *) 
(* X_CORE_INFO = "COUNTER,Vivado 2023.2" *) 
(* NotValidForBitStream *)
module design_1_COUNTER_0_0
   (globalClock,
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
    debug);
  input globalClock;
  input iReset;
  (* ALLOW_COMBINATORIAL_LOOPS = "true" *) (* GATED_CLOCK *) input iLatch1;
  (* ALLOW_COMBINATORIAL_LOOPS = "true" *) (* GATED_CLOCK *) input iLatch2;
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

  wire \<const0> ;
  wire globalClock;
  wire iLatch1;
  wire iLatch2;
  wire iResetLatch1;
  wire iResetLatch2;
  wire [31:0]o1COUNTER;
  wire [31:0]o1COUNTERHi;
  wire [25:0]\^o1COUNTERPhase ;
  wire [31:0]o2COUNTER;
  wire [31:0]o2COUNTERHi;
  wire [25:0]\^o2COUNTERPhase ;
  wire oLatchTest2;
  wire oRdyCOUNTER;
  wire oRdyCOUNTER2;

  assign debug[31] = \<const0> ;
  assign debug[30] = \<const0> ;
  assign debug[29] = \<const0> ;
  assign debug[28] = \<const0> ;
  assign debug[27] = \<const0> ;
  assign debug[26] = \<const0> ;
  assign debug[25] = \<const0> ;
  assign debug[24] = \<const0> ;
  assign debug[23] = \<const0> ;
  assign debug[22] = \<const0> ;
  assign debug[21] = \<const0> ;
  assign debug[20] = \<const0> ;
  assign debug[19] = \<const0> ;
  assign debug[18] = \<const0> ;
  assign debug[17] = \<const0> ;
  assign debug[16] = \<const0> ;
  assign debug[15] = \<const0> ;
  assign debug[14] = \<const0> ;
  assign debug[13] = \<const0> ;
  assign debug[12] = \<const0> ;
  assign debug[11] = \<const0> ;
  assign debug[10] = \<const0> ;
  assign debug[9] = \<const0> ;
  assign debug[8] = \<const0> ;
  assign debug[7] = \<const0> ;
  assign debug[6] = \<const0> ;
  assign debug[5] = \<const0> ;
  assign debug[4] = \<const0> ;
  assign debug[3] = \<const0> ;
  assign debug[2] = \<const0> ;
  assign debug[1] = \<const0> ;
  assign debug[0] = \<const0> ;
  assign o1COUNTERPhase[31] = \<const0> ;
  assign o1COUNTERPhase[30] = \<const0> ;
  assign o1COUNTERPhase[29] = \<const0> ;
  assign o1COUNTERPhase[28] = \<const0> ;
  assign o1COUNTERPhase[27] = \<const0> ;
  assign o1COUNTERPhase[26] = \<const0> ;
  assign o1COUNTERPhase[25:0] = \^o1COUNTERPhase [25:0];
  assign o2COUNTERPhase[31] = \<const0> ;
  assign o2COUNTERPhase[30] = \<const0> ;
  assign o2COUNTERPhase[29] = \<const0> ;
  assign o2COUNTERPhase[28] = \<const0> ;
  assign o2COUNTERPhase[27] = \<const0> ;
  assign o2COUNTERPhase[26] = \<const0> ;
  assign o2COUNTERPhase[25:0] = \^o2COUNTERPhase [25:0];
  assign oLatchTest1 = oLatchTest2;
  GND GND
       (.G(\<const0> ));
  design_1_COUNTER_0_0_COUNTER inst
       (.Q({o1COUNTERHi,o1COUNTER}),
        .globalClock(globalClock),
        .iLatch1(iLatch1),
        .iLatch2(iLatch2),
        .iResetLatch1(iResetLatch1),
        .iResetLatch2(iResetLatch2),
        .o1COUNTERPhase(\^o1COUNTERPhase ),
        .o2COUNTERPhase(\^o2COUNTERPhase ),
        .oLatchTest2(oLatchTest2),
        .oRdyCOUNTER(oRdyCOUNTER),
        .oRdyCOUNTER2(oRdyCOUNTER2),
        .\rLatch2_reg[63]_0 ({o2COUNTERHi,o2COUNTER}));
endmodule

(* ORIG_REF_NAME = "COUNTER" *) 
module design_1_COUNTER_0_0_COUNTER
   (oRdyCOUNTER,
    oRdyCOUNTER2,
    Q,
    o1COUNTERPhase,
    \rLatch2_reg[63]_0 ,
    o2COUNTERPhase,
    oLatchTest2,
    iLatch1,
    globalClock,
    iLatch2,
    iResetLatch1,
    iResetLatch2);
  output oRdyCOUNTER;
  output oRdyCOUNTER2;
  output [63:0]Q;
  output [25:0]o1COUNTERPhase;
  output [63:0]\rLatch2_reg[63]_0 ;
  output [25:0]o2COUNTERPhase;
  output oLatchTest2;
  input iLatch1;
  input globalClock;
  input iLatch2;
  input iResetLatch1;
  input iResetLatch2;

  wire [63:0]Q;
  (* ALLOW_COMBINATORIAL_LOOPS *) (* GATED_CLOCK *) wire iLatch1;
  (* ALLOW_COMBINATORIAL_LOOPS *) (* GATED_CLOCK *) wire iLatch2;
  wire iResetLatch1;
  wire iResetLatch2;
  (* ALLOW_COMBINATORIAL_LOOPS *) (* async_reg = "true" *) wire latchLock1;
  wire latchLock1_reg0_i_1_n_0;
  (* ALLOW_COMBINATORIAL_LOOPS *) (* async_reg = "true" *) wire latchLock2;
  wire latchLock2_reg0_i_1_n_0;
  wire [25:0]o1COUNTERPhase;
  wire [25:0]o2COUNTERPhase;
  wire oLatchTest2;
  wire oLatchTest2_INST_0_i_1_n_0;
  wire [63:0]p_0_in;
  (* DONT_TOUCH *) (* RTL_KEEP = "true" *) wire [63:0]rCOUNTER;
  wire rCOUNTER_reg0_carry__0_n_0;
  wire rCOUNTER_reg0_carry__0_n_1;
  wire rCOUNTER_reg0_carry__0_n_2;
  wire rCOUNTER_reg0_carry__0_n_3;
  wire rCOUNTER_reg0_carry__10_n_0;
  wire rCOUNTER_reg0_carry__10_n_1;
  wire rCOUNTER_reg0_carry__10_n_2;
  wire rCOUNTER_reg0_carry__10_n_3;
  wire rCOUNTER_reg0_carry__11_n_0;
  wire rCOUNTER_reg0_carry__11_n_1;
  wire rCOUNTER_reg0_carry__11_n_2;
  wire rCOUNTER_reg0_carry__11_n_3;
  wire rCOUNTER_reg0_carry__12_n_0;
  wire rCOUNTER_reg0_carry__12_n_1;
  wire rCOUNTER_reg0_carry__12_n_2;
  wire rCOUNTER_reg0_carry__12_n_3;
  wire rCOUNTER_reg0_carry__13_n_0;
  wire rCOUNTER_reg0_carry__13_n_1;
  wire rCOUNTER_reg0_carry__13_n_2;
  wire rCOUNTER_reg0_carry__13_n_3;
  wire rCOUNTER_reg0_carry__14_n_2;
  wire rCOUNTER_reg0_carry__14_n_3;
  wire rCOUNTER_reg0_carry__1_n_0;
  wire rCOUNTER_reg0_carry__1_n_1;
  wire rCOUNTER_reg0_carry__1_n_2;
  wire rCOUNTER_reg0_carry__1_n_3;
  wire rCOUNTER_reg0_carry__2_n_0;
  wire rCOUNTER_reg0_carry__2_n_1;
  wire rCOUNTER_reg0_carry__2_n_2;
  wire rCOUNTER_reg0_carry__2_n_3;
  wire rCOUNTER_reg0_carry__3_n_0;
  wire rCOUNTER_reg0_carry__3_n_1;
  wire rCOUNTER_reg0_carry__3_n_2;
  wire rCOUNTER_reg0_carry__3_n_3;
  wire rCOUNTER_reg0_carry__4_n_0;
  wire rCOUNTER_reg0_carry__4_n_1;
  wire rCOUNTER_reg0_carry__4_n_2;
  wire rCOUNTER_reg0_carry__4_n_3;
  wire rCOUNTER_reg0_carry__5_n_0;
  wire rCOUNTER_reg0_carry__5_n_1;
  wire rCOUNTER_reg0_carry__5_n_2;
  wire rCOUNTER_reg0_carry__5_n_3;
  wire rCOUNTER_reg0_carry__6_n_0;
  wire rCOUNTER_reg0_carry__6_n_1;
  wire rCOUNTER_reg0_carry__6_n_2;
  wire rCOUNTER_reg0_carry__6_n_3;
  wire rCOUNTER_reg0_carry__7_n_0;
  wire rCOUNTER_reg0_carry__7_n_1;
  wire rCOUNTER_reg0_carry__7_n_2;
  wire rCOUNTER_reg0_carry__7_n_3;
  wire rCOUNTER_reg0_carry__8_n_0;
  wire rCOUNTER_reg0_carry__8_n_1;
  wire rCOUNTER_reg0_carry__8_n_2;
  wire rCOUNTER_reg0_carry__8_n_3;
  wire rCOUNTER_reg0_carry__9_n_0;
  wire rCOUNTER_reg0_carry__9_n_1;
  wire rCOUNTER_reg0_carry__9_n_2;
  wire rCOUNTER_reg0_carry__9_n_3;
  wire rCOUNTER_reg0_carry_n_0;
  wire rCOUNTER_reg0_carry_n_1;
  wire rCOUNTER_reg0_carry_n_2;
  wire rCOUNTER_reg0_carry_n_3;
  wire [63:0]\rLatch2_reg[63]_0 ;
  (* DONT_TOUCH *) (* RTL_KEEP = "true" *) wire [25:0]wPhase;
  wire [3:2]NLW_rCOUNTER_reg0_carry__14_CO_UNCONNECTED;
  wire [3:3]NLW_rCOUNTER_reg0_carry__14_O_UNCONNECTED;

  assign oRdyCOUNTER = latchLock1;
  assign oRdyCOUNTER2 = latchLock2;
  assign wPhase[0] = globalClock;
  LUT4 #(
    .INIT(16'hCCCE)) 
    latchLock1_reg0
       (.I0(latchLock1),
        .I1(iLatch1),
        .I2(latchLock1_reg0_i_1_n_0),
        .I3(iResetLatch1),
        .O(latchLock1));
  LUT3 #(
    .INIT(8'hA8)) 
    latchLock1_reg0_i_1
       (.I0(iLatch1),
        .I1(iResetLatch1),
        .I2(latchLock1_reg0_i_1_n_0),
        .O(latchLock1_reg0_i_1_n_0));
  LUT4 #(
    .INIT(16'hCCCE)) 
    latchLock2_reg0
       (.I0(latchLock2),
        .I1(iLatch2),
        .I2(latchLock2_reg0_i_1_n_0),
        .I3(iResetLatch2),
        .O(latchLock2));
  LUT3 #(
    .INIT(8'hA8)) 
    latchLock2_reg0_i_1
       (.I0(iLatch2),
        .I1(iResetLatch2),
        .I2(latchLock2_reg0_i_1_n_0),
        .O(latchLock2_reg0_i_1_n_0));
  LUT5 #(
    .INIT(32'h00000001)) 
    oLatchTest2_INST_0
       (.I0(rCOUNTER[20]),
        .I1(rCOUNTER[21]),
        .I2(rCOUNTER[22]),
        .I3(rCOUNTER[23]),
        .I4(oLatchTest2_INST_0_i_1_n_0),
        .O(oLatchTest2));
  LUT5 #(
    .INIT(32'hFFFFFF7F)) 
    oLatchTest2_INST_0_i_1
       (.I0(rCOUNTER[24]),
        .I1(rCOUNTER[26]),
        .I2(rCOUNTER[25]),
        .I3(rCOUNTER[19]),
        .I4(rCOUNTER[18]),
        .O(oLatchTest2_INST_0_i_1_n_0));
  LUT1 #(
    .INIT(2'h1)) 
    \rCOUNTER[0]_i_1 
       (.I0(rCOUNTER[0]),
        .O(p_0_in[0]));
  (* ADDER_THRESHOLD = "35" *) 
  CARRY4 rCOUNTER_reg0_carry
       (.CI(1'b0),
        .CO({rCOUNTER_reg0_carry_n_0,rCOUNTER_reg0_carry_n_1,rCOUNTER_reg0_carry_n_2,rCOUNTER_reg0_carry_n_3}),
        .CYINIT(rCOUNTER[0]),
        .DI({1'b0,1'b0,1'b0,1'b0}),
        .O(p_0_in[4:1]),
        .S(rCOUNTER[4:1]));
  (* ADDER_THRESHOLD = "35" *) 
  CARRY4 rCOUNTER_reg0_carry__0
       (.CI(rCOUNTER_reg0_carry_n_0),
        .CO({rCOUNTER_reg0_carry__0_n_0,rCOUNTER_reg0_carry__0_n_1,rCOUNTER_reg0_carry__0_n_2,rCOUNTER_reg0_carry__0_n_3}),
        .CYINIT(1'b0),
        .DI({1'b0,1'b0,1'b0,1'b0}),
        .O(p_0_in[8:5]),
        .S(rCOUNTER[8:5]));
  (* ADDER_THRESHOLD = "35" *) 
  CARRY4 rCOUNTER_reg0_carry__1
       (.CI(rCOUNTER_reg0_carry__0_n_0),
        .CO({rCOUNTER_reg0_carry__1_n_0,rCOUNTER_reg0_carry__1_n_1,rCOUNTER_reg0_carry__1_n_2,rCOUNTER_reg0_carry__1_n_3}),
        .CYINIT(1'b0),
        .DI({1'b0,1'b0,1'b0,1'b0}),
        .O(p_0_in[12:9]),
        .S(rCOUNTER[12:9]));
  (* ADDER_THRESHOLD = "35" *) 
  CARRY4 rCOUNTER_reg0_carry__10
       (.CI(rCOUNTER_reg0_carry__9_n_0),
        .CO({rCOUNTER_reg0_carry__10_n_0,rCOUNTER_reg0_carry__10_n_1,rCOUNTER_reg0_carry__10_n_2,rCOUNTER_reg0_carry__10_n_3}),
        .CYINIT(1'b0),
        .DI({1'b0,1'b0,1'b0,1'b0}),
        .O(p_0_in[48:45]),
        .S(rCOUNTER[48:45]));
  (* ADDER_THRESHOLD = "35" *) 
  CARRY4 rCOUNTER_reg0_carry__11
       (.CI(rCOUNTER_reg0_carry__10_n_0),
        .CO({rCOUNTER_reg0_carry__11_n_0,rCOUNTER_reg0_carry__11_n_1,rCOUNTER_reg0_carry__11_n_2,rCOUNTER_reg0_carry__11_n_3}),
        .CYINIT(1'b0),
        .DI({1'b0,1'b0,1'b0,1'b0}),
        .O(p_0_in[52:49]),
        .S(rCOUNTER[52:49]));
  (* ADDER_THRESHOLD = "35" *) 
  CARRY4 rCOUNTER_reg0_carry__12
       (.CI(rCOUNTER_reg0_carry__11_n_0),
        .CO({rCOUNTER_reg0_carry__12_n_0,rCOUNTER_reg0_carry__12_n_1,rCOUNTER_reg0_carry__12_n_2,rCOUNTER_reg0_carry__12_n_3}),
        .CYINIT(1'b0),
        .DI({1'b0,1'b0,1'b0,1'b0}),
        .O(p_0_in[56:53]),
        .S(rCOUNTER[56:53]));
  (* ADDER_THRESHOLD = "35" *) 
  CARRY4 rCOUNTER_reg0_carry__13
       (.CI(rCOUNTER_reg0_carry__12_n_0),
        .CO({rCOUNTER_reg0_carry__13_n_0,rCOUNTER_reg0_carry__13_n_1,rCOUNTER_reg0_carry__13_n_2,rCOUNTER_reg0_carry__13_n_3}),
        .CYINIT(1'b0),
        .DI({1'b0,1'b0,1'b0,1'b0}),
        .O(p_0_in[60:57]),
        .S(rCOUNTER[60:57]));
  (* ADDER_THRESHOLD = "35" *) 
  CARRY4 rCOUNTER_reg0_carry__14
       (.CI(rCOUNTER_reg0_carry__13_n_0),
        .CO({NLW_rCOUNTER_reg0_carry__14_CO_UNCONNECTED[3:2],rCOUNTER_reg0_carry__14_n_2,rCOUNTER_reg0_carry__14_n_3}),
        .CYINIT(1'b0),
        .DI({1'b0,1'b0,1'b0,1'b0}),
        .O({NLW_rCOUNTER_reg0_carry__14_O_UNCONNECTED[3],p_0_in[63:61]}),
        .S({1'b0,rCOUNTER[63:61]}));
  (* ADDER_THRESHOLD = "35" *) 
  CARRY4 rCOUNTER_reg0_carry__2
       (.CI(rCOUNTER_reg0_carry__1_n_0),
        .CO({rCOUNTER_reg0_carry__2_n_0,rCOUNTER_reg0_carry__2_n_1,rCOUNTER_reg0_carry__2_n_2,rCOUNTER_reg0_carry__2_n_3}),
        .CYINIT(1'b0),
        .DI({1'b0,1'b0,1'b0,1'b0}),
        .O(p_0_in[16:13]),
        .S(rCOUNTER[16:13]));
  (* ADDER_THRESHOLD = "35" *) 
  CARRY4 rCOUNTER_reg0_carry__3
       (.CI(rCOUNTER_reg0_carry__2_n_0),
        .CO({rCOUNTER_reg0_carry__3_n_0,rCOUNTER_reg0_carry__3_n_1,rCOUNTER_reg0_carry__3_n_2,rCOUNTER_reg0_carry__3_n_3}),
        .CYINIT(1'b0),
        .DI({1'b0,1'b0,1'b0,1'b0}),
        .O(p_0_in[20:17]),
        .S(rCOUNTER[20:17]));
  (* ADDER_THRESHOLD = "35" *) 
  CARRY4 rCOUNTER_reg0_carry__4
       (.CI(rCOUNTER_reg0_carry__3_n_0),
        .CO({rCOUNTER_reg0_carry__4_n_0,rCOUNTER_reg0_carry__4_n_1,rCOUNTER_reg0_carry__4_n_2,rCOUNTER_reg0_carry__4_n_3}),
        .CYINIT(1'b0),
        .DI({1'b0,1'b0,1'b0,1'b0}),
        .O(p_0_in[24:21]),
        .S(rCOUNTER[24:21]));
  (* ADDER_THRESHOLD = "35" *) 
  CARRY4 rCOUNTER_reg0_carry__5
       (.CI(rCOUNTER_reg0_carry__4_n_0),
        .CO({rCOUNTER_reg0_carry__5_n_0,rCOUNTER_reg0_carry__5_n_1,rCOUNTER_reg0_carry__5_n_2,rCOUNTER_reg0_carry__5_n_3}),
        .CYINIT(1'b0),
        .DI({1'b0,1'b0,1'b0,1'b0}),
        .O(p_0_in[28:25]),
        .S(rCOUNTER[28:25]));
  (* ADDER_THRESHOLD = "35" *) 
  CARRY4 rCOUNTER_reg0_carry__6
       (.CI(rCOUNTER_reg0_carry__5_n_0),
        .CO({rCOUNTER_reg0_carry__6_n_0,rCOUNTER_reg0_carry__6_n_1,rCOUNTER_reg0_carry__6_n_2,rCOUNTER_reg0_carry__6_n_3}),
        .CYINIT(1'b0),
        .DI({1'b0,1'b0,1'b0,1'b0}),
        .O(p_0_in[32:29]),
        .S(rCOUNTER[32:29]));
  (* ADDER_THRESHOLD = "35" *) 
  CARRY4 rCOUNTER_reg0_carry__7
       (.CI(rCOUNTER_reg0_carry__6_n_0),
        .CO({rCOUNTER_reg0_carry__7_n_0,rCOUNTER_reg0_carry__7_n_1,rCOUNTER_reg0_carry__7_n_2,rCOUNTER_reg0_carry__7_n_3}),
        .CYINIT(1'b0),
        .DI({1'b0,1'b0,1'b0,1'b0}),
        .O(p_0_in[36:33]),
        .S(rCOUNTER[36:33]));
  (* ADDER_THRESHOLD = "35" *) 
  CARRY4 rCOUNTER_reg0_carry__8
       (.CI(rCOUNTER_reg0_carry__7_n_0),
        .CO({rCOUNTER_reg0_carry__8_n_0,rCOUNTER_reg0_carry__8_n_1,rCOUNTER_reg0_carry__8_n_2,rCOUNTER_reg0_carry__8_n_3}),
        .CYINIT(1'b0),
        .DI({1'b0,1'b0,1'b0,1'b0}),
        .O(p_0_in[40:37]),
        .S(rCOUNTER[40:37]));
  (* ADDER_THRESHOLD = "35" *) 
  CARRY4 rCOUNTER_reg0_carry__9
       (.CI(rCOUNTER_reg0_carry__8_n_0),
        .CO({rCOUNTER_reg0_carry__9_n_0,rCOUNTER_reg0_carry__9_n_1,rCOUNTER_reg0_carry__9_n_2,rCOUNTER_reg0_carry__9_n_3}),
        .CYINIT(1'b0),
        .DI({1'b0,1'b0,1'b0,1'b0}),
        .O(p_0_in[44:41]),
        .S(rCOUNTER[44:41]));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[0] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[0]),
        .Q(rCOUNTER[0]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[10] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[10]),
        .Q(rCOUNTER[10]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[11] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[11]),
        .Q(rCOUNTER[11]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[12] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[12]),
        .Q(rCOUNTER[12]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[13] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[13]),
        .Q(rCOUNTER[13]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[14] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[14]),
        .Q(rCOUNTER[14]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[15] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[15]),
        .Q(rCOUNTER[15]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[16] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[16]),
        .Q(rCOUNTER[16]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[17] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[17]),
        .Q(rCOUNTER[17]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[18] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[18]),
        .Q(rCOUNTER[18]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[19] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[19]),
        .Q(rCOUNTER[19]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[1] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[1]),
        .Q(rCOUNTER[1]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[20] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[20]),
        .Q(rCOUNTER[20]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[21] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[21]),
        .Q(rCOUNTER[21]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[22] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[22]),
        .Q(rCOUNTER[22]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[23] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[23]),
        .Q(rCOUNTER[23]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[24] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[24]),
        .Q(rCOUNTER[24]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[25] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[25]),
        .Q(rCOUNTER[25]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[26] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[26]),
        .Q(rCOUNTER[26]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[27] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[27]),
        .Q(rCOUNTER[27]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[28] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[28]),
        .Q(rCOUNTER[28]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[29] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[29]),
        .Q(rCOUNTER[29]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[2] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[2]),
        .Q(rCOUNTER[2]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[30] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[30]),
        .Q(rCOUNTER[30]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[31] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[31]),
        .Q(rCOUNTER[31]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[32] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[32]),
        .Q(rCOUNTER[32]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[33] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[33]),
        .Q(rCOUNTER[33]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[34] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[34]),
        .Q(rCOUNTER[34]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[35] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[35]),
        .Q(rCOUNTER[35]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[36] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[36]),
        .Q(rCOUNTER[36]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[37] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[37]),
        .Q(rCOUNTER[37]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[38] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[38]),
        .Q(rCOUNTER[38]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[39] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[39]),
        .Q(rCOUNTER[39]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[3] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[3]),
        .Q(rCOUNTER[3]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[40] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[40]),
        .Q(rCOUNTER[40]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[41] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[41]),
        .Q(rCOUNTER[41]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[42] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[42]),
        .Q(rCOUNTER[42]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[43] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[43]),
        .Q(rCOUNTER[43]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[44] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[44]),
        .Q(rCOUNTER[44]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[45] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[45]),
        .Q(rCOUNTER[45]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[46] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[46]),
        .Q(rCOUNTER[46]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[47] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[47]),
        .Q(rCOUNTER[47]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[48] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[48]),
        .Q(rCOUNTER[48]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[49] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[49]),
        .Q(rCOUNTER[49]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[4] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[4]),
        .Q(rCOUNTER[4]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[50] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[50]),
        .Q(rCOUNTER[50]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[51] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[51]),
        .Q(rCOUNTER[51]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[52] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[52]),
        .Q(rCOUNTER[52]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[53] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[53]),
        .Q(rCOUNTER[53]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[54] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[54]),
        .Q(rCOUNTER[54]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[55] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[55]),
        .Q(rCOUNTER[55]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[56] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[56]),
        .Q(rCOUNTER[56]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[57] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[57]),
        .Q(rCOUNTER[57]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[58] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[58]),
        .Q(rCOUNTER[58]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[59] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[59]),
        .Q(rCOUNTER[59]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[5] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[5]),
        .Q(rCOUNTER[5]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[60] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[60]),
        .Q(rCOUNTER[60]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[61] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[61]),
        .Q(rCOUNTER[61]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[62] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[62]),
        .Q(rCOUNTER[62]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[63] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[63]),
        .Q(rCOUNTER[63]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[6] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[6]),
        .Q(rCOUNTER[6]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[7] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[7]),
        .Q(rCOUNTER[7]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[8] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[8]),
        .Q(rCOUNTER[8]),
        .R(1'b0));
  (* DONT_TOUCH *) 
  (* KEEP = "yes" *) 
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[9] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(p_0_in[9]),
        .Q(rCOUNTER[9]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[0] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[0]),
        .Q(Q[0]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[10] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[10]),
        .Q(Q[10]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[11] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[11]),
        .Q(Q[11]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[12] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[12]),
        .Q(Q[12]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[13] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[13]),
        .Q(Q[13]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[14] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[14]),
        .Q(Q[14]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[15] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[15]),
        .Q(Q[15]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[16] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[16]),
        .Q(Q[16]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[17] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[17]),
        .Q(Q[17]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[18] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[18]),
        .Q(Q[18]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[19] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[19]),
        .Q(Q[19]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[1] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[1]),
        .Q(Q[1]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[20] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[20]),
        .Q(Q[20]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[21] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[21]),
        .Q(Q[21]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[22] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[22]),
        .Q(Q[22]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[23] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[23]),
        .Q(Q[23]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[24] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[24]),
        .Q(Q[24]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[25] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[25]),
        .Q(Q[25]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[26] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[26]),
        .Q(Q[26]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[27] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[27]),
        .Q(Q[27]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[28] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[28]),
        .Q(Q[28]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[29] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[29]),
        .Q(Q[29]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[2] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[2]),
        .Q(Q[2]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[30] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[30]),
        .Q(Q[30]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[31] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[31]),
        .Q(Q[31]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[32] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[32]),
        .Q(Q[32]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[33] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[33]),
        .Q(Q[33]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[34] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[34]),
        .Q(Q[34]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[35] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[35]),
        .Q(Q[35]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[36] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[36]),
        .Q(Q[36]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[37] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[37]),
        .Q(Q[37]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[38] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[38]),
        .Q(Q[38]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[39] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[39]),
        .Q(Q[39]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[3] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[3]),
        .Q(Q[3]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[40] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[40]),
        .Q(Q[40]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[41] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[41]),
        .Q(Q[41]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[42] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[42]),
        .Q(Q[42]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[43] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[43]),
        .Q(Q[43]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[44] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[44]),
        .Q(Q[44]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[45] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[45]),
        .Q(Q[45]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[46] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[46]),
        .Q(Q[46]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[47] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[47]),
        .Q(Q[47]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[48] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[48]),
        .Q(Q[48]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[49] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[49]),
        .Q(Q[49]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[4] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[4]),
        .Q(Q[4]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[50] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[50]),
        .Q(Q[50]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[51] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[51]),
        .Q(Q[51]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[52] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[52]),
        .Q(Q[52]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[53] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[53]),
        .Q(Q[53]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[54] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[54]),
        .Q(Q[54]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[55] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[55]),
        .Q(Q[55]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[56] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[56]),
        .Q(Q[56]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[57] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[57]),
        .Q(Q[57]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[58] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[58]),
        .Q(Q[58]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[59] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[59]),
        .Q(Q[59]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[5] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[5]),
        .Q(Q[5]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[60] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[60]),
        .Q(Q[60]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[61] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[61]),
        .Q(Q[61]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[62] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[62]),
        .Q(Q[62]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[63] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[63]),
        .Q(Q[63]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[6] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[6]),
        .Q(Q[6]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[7] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[7]),
        .Q(Q[7]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[8] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[8]),
        .Q(Q[8]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[9] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER[9]),
        .Q(Q[9]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[0] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[0]),
        .Q(\rLatch2_reg[63]_0 [0]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[10] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[10]),
        .Q(\rLatch2_reg[63]_0 [10]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[11] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[11]),
        .Q(\rLatch2_reg[63]_0 [11]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[12] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[12]),
        .Q(\rLatch2_reg[63]_0 [12]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[13] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[13]),
        .Q(\rLatch2_reg[63]_0 [13]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[14] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[14]),
        .Q(\rLatch2_reg[63]_0 [14]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[15] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[15]),
        .Q(\rLatch2_reg[63]_0 [15]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[16] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[16]),
        .Q(\rLatch2_reg[63]_0 [16]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[17] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[17]),
        .Q(\rLatch2_reg[63]_0 [17]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[18] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[18]),
        .Q(\rLatch2_reg[63]_0 [18]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[19] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[19]),
        .Q(\rLatch2_reg[63]_0 [19]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[1] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[1]),
        .Q(\rLatch2_reg[63]_0 [1]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[20] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[20]),
        .Q(\rLatch2_reg[63]_0 [20]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[21] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[21]),
        .Q(\rLatch2_reg[63]_0 [21]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[22] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[22]),
        .Q(\rLatch2_reg[63]_0 [22]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[23] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[23]),
        .Q(\rLatch2_reg[63]_0 [23]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[24] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[24]),
        .Q(\rLatch2_reg[63]_0 [24]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[25] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[25]),
        .Q(\rLatch2_reg[63]_0 [25]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[26] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[26]),
        .Q(\rLatch2_reg[63]_0 [26]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[27] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[27]),
        .Q(\rLatch2_reg[63]_0 [27]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[28] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[28]),
        .Q(\rLatch2_reg[63]_0 [28]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[29] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[29]),
        .Q(\rLatch2_reg[63]_0 [29]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[2] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[2]),
        .Q(\rLatch2_reg[63]_0 [2]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[30] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[30]),
        .Q(\rLatch2_reg[63]_0 [30]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[31] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[31]),
        .Q(\rLatch2_reg[63]_0 [31]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[32] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[32]),
        .Q(\rLatch2_reg[63]_0 [32]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[33] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[33]),
        .Q(\rLatch2_reg[63]_0 [33]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[34] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[34]),
        .Q(\rLatch2_reg[63]_0 [34]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[35] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[35]),
        .Q(\rLatch2_reg[63]_0 [35]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[36] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[36]),
        .Q(\rLatch2_reg[63]_0 [36]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[37] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[37]),
        .Q(\rLatch2_reg[63]_0 [37]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[38] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[38]),
        .Q(\rLatch2_reg[63]_0 [38]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[39] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[39]),
        .Q(\rLatch2_reg[63]_0 [39]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[3] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[3]),
        .Q(\rLatch2_reg[63]_0 [3]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[40] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[40]),
        .Q(\rLatch2_reg[63]_0 [40]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[41] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[41]),
        .Q(\rLatch2_reg[63]_0 [41]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[42] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[42]),
        .Q(\rLatch2_reg[63]_0 [42]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[43] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[43]),
        .Q(\rLatch2_reg[63]_0 [43]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[44] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[44]),
        .Q(\rLatch2_reg[63]_0 [44]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[45] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[45]),
        .Q(\rLatch2_reg[63]_0 [45]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[46] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[46]),
        .Q(\rLatch2_reg[63]_0 [46]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[47] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[47]),
        .Q(\rLatch2_reg[63]_0 [47]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[48] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[48]),
        .Q(\rLatch2_reg[63]_0 [48]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[49] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[49]),
        .Q(\rLatch2_reg[63]_0 [49]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[4] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[4]),
        .Q(\rLatch2_reg[63]_0 [4]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[50] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[50]),
        .Q(\rLatch2_reg[63]_0 [50]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[51] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[51]),
        .Q(\rLatch2_reg[63]_0 [51]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[52] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[52]),
        .Q(\rLatch2_reg[63]_0 [52]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[53] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[53]),
        .Q(\rLatch2_reg[63]_0 [53]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[54] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[54]),
        .Q(\rLatch2_reg[63]_0 [54]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[55] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[55]),
        .Q(\rLatch2_reg[63]_0 [55]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[56] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[56]),
        .Q(\rLatch2_reg[63]_0 [56]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[57] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[57]),
        .Q(\rLatch2_reg[63]_0 [57]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[58] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[58]),
        .Q(\rLatch2_reg[63]_0 [58]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[59] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[59]),
        .Q(\rLatch2_reg[63]_0 [59]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[5] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[5]),
        .Q(\rLatch2_reg[63]_0 [5]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[60] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[60]),
        .Q(\rLatch2_reg[63]_0 [60]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[61] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[61]),
        .Q(\rLatch2_reg[63]_0 [61]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[62] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[62]),
        .Q(\rLatch2_reg[63]_0 [62]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[63] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[63]),
        .Q(\rLatch2_reg[63]_0 [63]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[6] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[6]),
        .Q(\rLatch2_reg[63]_0 [6]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[7] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[7]),
        .Q(\rLatch2_reg[63]_0 [7]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[8] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[8]),
        .Q(\rLatch2_reg[63]_0 [8]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[9] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER[9]),
        .Q(\rLatch2_reg[63]_0 [9]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch1_reg[0] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(wPhase[0]),
        .Q(o1COUNTERPhase[0]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch1_reg[10] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(wPhase[10]),
        .Q(o1COUNTERPhase[10]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch1_reg[11] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(wPhase[11]),
        .Q(o1COUNTERPhase[11]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch1_reg[12] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(wPhase[12]),
        .Q(o1COUNTERPhase[12]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch1_reg[13] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(wPhase[13]),
        .Q(o1COUNTERPhase[13]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch1_reg[14] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(wPhase[14]),
        .Q(o1COUNTERPhase[14]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch1_reg[15] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(wPhase[15]),
        .Q(o1COUNTERPhase[15]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch1_reg[16] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(wPhase[16]),
        .Q(o1COUNTERPhase[16]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch1_reg[17] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(wPhase[17]),
        .Q(o1COUNTERPhase[17]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch1_reg[18] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(wPhase[18]),
        .Q(o1COUNTERPhase[18]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch1_reg[19] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(wPhase[19]),
        .Q(o1COUNTERPhase[19]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch1_reg[1] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(wPhase[1]),
        .Q(o1COUNTERPhase[1]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch1_reg[20] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(wPhase[20]),
        .Q(o1COUNTERPhase[20]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch1_reg[21] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(wPhase[21]),
        .Q(o1COUNTERPhase[21]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch1_reg[22] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(wPhase[22]),
        .Q(o1COUNTERPhase[22]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch1_reg[23] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(wPhase[23]),
        .Q(o1COUNTERPhase[23]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch1_reg[24] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(wPhase[24]),
        .Q(o1COUNTERPhase[24]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch1_reg[25] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(wPhase[25]),
        .Q(o1COUNTERPhase[25]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch1_reg[2] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(wPhase[2]),
        .Q(o1COUNTERPhase[2]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch1_reg[3] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(wPhase[3]),
        .Q(o1COUNTERPhase[3]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch1_reg[4] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(wPhase[4]),
        .Q(o1COUNTERPhase[4]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch1_reg[5] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(wPhase[5]),
        .Q(o1COUNTERPhase[5]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch1_reg[6] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(wPhase[6]),
        .Q(o1COUNTERPhase[6]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch1_reg[7] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(wPhase[7]),
        .Q(o1COUNTERPhase[7]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch1_reg[8] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(wPhase[8]),
        .Q(o1COUNTERPhase[8]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch1_reg[9] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(wPhase[9]),
        .Q(o1COUNTERPhase[9]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch2_reg[0] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(wPhase[0]),
        .Q(o2COUNTERPhase[0]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch2_reg[10] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(wPhase[10]),
        .Q(o2COUNTERPhase[10]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch2_reg[11] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(wPhase[11]),
        .Q(o2COUNTERPhase[11]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch2_reg[12] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(wPhase[12]),
        .Q(o2COUNTERPhase[12]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch2_reg[13] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(wPhase[13]),
        .Q(o2COUNTERPhase[13]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch2_reg[14] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(wPhase[14]),
        .Q(o2COUNTERPhase[14]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch2_reg[15] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(wPhase[15]),
        .Q(o2COUNTERPhase[15]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch2_reg[16] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(wPhase[16]),
        .Q(o2COUNTERPhase[16]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch2_reg[17] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(wPhase[17]),
        .Q(o2COUNTERPhase[17]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch2_reg[18] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(wPhase[18]),
        .Q(o2COUNTERPhase[18]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch2_reg[19] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(wPhase[19]),
        .Q(o2COUNTERPhase[19]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch2_reg[1] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(wPhase[1]),
        .Q(o2COUNTERPhase[1]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch2_reg[20] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(wPhase[20]),
        .Q(o2COUNTERPhase[20]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch2_reg[21] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(wPhase[21]),
        .Q(o2COUNTERPhase[21]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch2_reg[22] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(wPhase[22]),
        .Q(o2COUNTERPhase[22]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch2_reg[23] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(wPhase[23]),
        .Q(o2COUNTERPhase[23]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch2_reg[24] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(wPhase[24]),
        .Q(o2COUNTERPhase[24]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch2_reg[25] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(wPhase[25]),
        .Q(o2COUNTERPhase[25]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch2_reg[2] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(wPhase[2]),
        .Q(o2COUNTERPhase[2]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch2_reg[3] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(wPhase[3]),
        .Q(o2COUNTERPhase[3]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch2_reg[4] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(wPhase[4]),
        .Q(o2COUNTERPhase[4]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch2_reg[5] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(wPhase[5]),
        .Q(o2COUNTERPhase[5]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch2_reg[6] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(wPhase[6]),
        .Q(o2COUNTERPhase[6]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch2_reg[7] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(wPhase[7]),
        .Q(o2COUNTERPhase[7]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch2_reg[8] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(wPhase[8]),
        .Q(o2COUNTERPhase[8]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rPhaseLatch2_reg[9] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(wPhase[9]),
        .Q(o2COUNTERPhase[9]),
        .R(1'b0));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_1
       (.I0(wPhase[24]),
        .O(wPhase[25]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_10
       (.I0(wPhase[15]),
        .O(wPhase[16]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_11
       (.I0(wPhase[14]),
        .O(wPhase[15]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_12
       (.I0(wPhase[13]),
        .O(wPhase[14]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_13
       (.I0(wPhase[12]),
        .O(wPhase[13]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_14
       (.I0(wPhase[11]),
        .O(wPhase[12]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_15
       (.I0(wPhase[10]),
        .O(wPhase[11]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_16
       (.I0(wPhase[9]),
        .O(wPhase[10]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_17
       (.I0(wPhase[8]),
        .O(wPhase[9]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_18
       (.I0(wPhase[7]),
        .O(wPhase[8]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_19
       (.I0(wPhase[6]),
        .O(wPhase[7]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_2
       (.I0(wPhase[23]),
        .O(wPhase[24]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_20
       (.I0(wPhase[5]),
        .O(wPhase[6]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_21
       (.I0(wPhase[4]),
        .O(wPhase[5]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_22
       (.I0(wPhase[3]),
        .O(wPhase[4]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_23
       (.I0(wPhase[2]),
        .O(wPhase[3]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_24
       (.I0(wPhase[1]),
        .O(wPhase[2]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_25
       (.I0(wPhase[0]),
        .O(wPhase[1]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_3
       (.I0(wPhase[22]),
        .O(wPhase[23]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_4
       (.I0(wPhase[21]),
        .O(wPhase[22]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_5
       (.I0(wPhase[20]),
        .O(wPhase[21]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_6
       (.I0(wPhase[19]),
        .O(wPhase[20]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_7
       (.I0(wPhase[18]),
        .O(wPhase[19]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_8
       (.I0(wPhase[17]),
        .O(wPhase[18]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_9
       (.I0(wPhase[16]),
        .O(wPhase[17]));
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
