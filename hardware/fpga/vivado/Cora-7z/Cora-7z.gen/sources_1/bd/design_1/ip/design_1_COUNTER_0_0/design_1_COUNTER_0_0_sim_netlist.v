// Copyright 1986-2022 Xilinx, Inc. All Rights Reserved.
// Copyright 2022-2023 Advanced Micro Devices, Inc. All Rights Reserved.
// --------------------------------------------------------------------------------
// Tool Version: Vivado v.2023.2 (win64) Build 4029153 Fri Oct 13 20:14:34 MDT 2023
// Date        : Wed Jan 17 22:36:30 2024
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
  (* ALLOW_COMBINATORIAL_LOOPS = "true" *) input iLatch1;
  (* ALLOW_COMBINATORIAL_LOOPS = "true" *) input iLatch2;
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
  wire [7:6]\^debug ;
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
  assign debug[9] = oRdyCOUNTER2;
  assign debug[8] = oRdyCOUNTER;
  assign debug[7:6] = \^debug [7:6];
  assign debug[5] = iResetLatch2;
  assign debug[4] = iResetLatch1;
  assign debug[3] = oRdyCOUNTER2;
  assign debug[2] = oRdyCOUNTER;
  assign debug[1] = iLatch2;
  assign debug[0] = iLatch1;
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
  assign oLatchTest1 = \<const0> ;
  assign oLatchTest2 = \<const0> ;
  GND GND
       (.G(\<const0> ));
  design_1_COUNTER_0_0_COUNTER inst
       (.Q({o1COUNTERHi,o1COUNTER}),
        .debug({oRdyCOUNTER2,oRdyCOUNTER,\^debug }),
        .\debug[7] ({iResetLatch2,iResetLatch1}),
        .globalClock(globalClock),
        .iLatch1(iLatch1),
        .iLatch2(iLatch2),
        .o1COUNTERPhase(\^o1COUNTERPhase ),
        .o2COUNTERPhase(\^o2COUNTERPhase ),
        .\rLatch2_reg[63]_0 ({o2COUNTERHi,o2COUNTER}));
endmodule

(* ORIG_REF_NAME = "COUNTER" *) 
module design_1_COUNTER_0_0_COUNTER
   (debug,
    Q,
    o1COUNTERPhase,
    \rLatch2_reg[63]_0 ,
    o2COUNTERPhase,
    globalClock,
    iLatch1,
    iLatch2,
    \debug[7] );
  output [3:0]debug;
  output [63:0]Q;
  output [25:0]o1COUNTERPhase;
  output [63:0]\rLatch2_reg[63]_0 ;
  output [25:0]o2COUNTERPhase;
  input globalClock;
  input iLatch1;
  input iLatch2;
  input [1:0]\debug[7] ;

  wire [63:0]Q;
  wire [1:0]\^debug ;
  wire [1:0]\debug[7] ;
  wire iLatch1;
  wire iLatch2;
  (* ALLOW_COMBINATORIAL_LOOPS *) (* async_reg = "true" *) wire latchLock1;
  (* ALLOW_COMBINATORIAL_LOOPS *) (* async_reg = "true" *) wire latchLock2;
  wire [25:0]o1COUNTERPhase;
  wire [25:0]o2COUNTERPhase;
  wire \rCOUNTER[0]_i_2_n_0 ;
  wire [63:0]rCOUNTER_reg;
  wire \rCOUNTER_reg[0]_i_1_n_0 ;
  wire \rCOUNTER_reg[0]_i_1_n_1 ;
  wire \rCOUNTER_reg[0]_i_1_n_2 ;
  wire \rCOUNTER_reg[0]_i_1_n_3 ;
  wire \rCOUNTER_reg[0]_i_1_n_4 ;
  wire \rCOUNTER_reg[0]_i_1_n_5 ;
  wire \rCOUNTER_reg[0]_i_1_n_6 ;
  wire \rCOUNTER_reg[0]_i_1_n_7 ;
  wire \rCOUNTER_reg[12]_i_1_n_0 ;
  wire \rCOUNTER_reg[12]_i_1_n_1 ;
  wire \rCOUNTER_reg[12]_i_1_n_2 ;
  wire \rCOUNTER_reg[12]_i_1_n_3 ;
  wire \rCOUNTER_reg[12]_i_1_n_4 ;
  wire \rCOUNTER_reg[12]_i_1_n_5 ;
  wire \rCOUNTER_reg[12]_i_1_n_6 ;
  wire \rCOUNTER_reg[12]_i_1_n_7 ;
  wire \rCOUNTER_reg[16]_i_1_n_0 ;
  wire \rCOUNTER_reg[16]_i_1_n_1 ;
  wire \rCOUNTER_reg[16]_i_1_n_2 ;
  wire \rCOUNTER_reg[16]_i_1_n_3 ;
  wire \rCOUNTER_reg[16]_i_1_n_4 ;
  wire \rCOUNTER_reg[16]_i_1_n_5 ;
  wire \rCOUNTER_reg[16]_i_1_n_6 ;
  wire \rCOUNTER_reg[16]_i_1_n_7 ;
  wire \rCOUNTER_reg[20]_i_1_n_0 ;
  wire \rCOUNTER_reg[20]_i_1_n_1 ;
  wire \rCOUNTER_reg[20]_i_1_n_2 ;
  wire \rCOUNTER_reg[20]_i_1_n_3 ;
  wire \rCOUNTER_reg[20]_i_1_n_4 ;
  wire \rCOUNTER_reg[20]_i_1_n_5 ;
  wire \rCOUNTER_reg[20]_i_1_n_6 ;
  wire \rCOUNTER_reg[20]_i_1_n_7 ;
  wire \rCOUNTER_reg[24]_i_1_n_0 ;
  wire \rCOUNTER_reg[24]_i_1_n_1 ;
  wire \rCOUNTER_reg[24]_i_1_n_2 ;
  wire \rCOUNTER_reg[24]_i_1_n_3 ;
  wire \rCOUNTER_reg[24]_i_1_n_4 ;
  wire \rCOUNTER_reg[24]_i_1_n_5 ;
  wire \rCOUNTER_reg[24]_i_1_n_6 ;
  wire \rCOUNTER_reg[24]_i_1_n_7 ;
  wire \rCOUNTER_reg[28]_i_1_n_0 ;
  wire \rCOUNTER_reg[28]_i_1_n_1 ;
  wire \rCOUNTER_reg[28]_i_1_n_2 ;
  wire \rCOUNTER_reg[28]_i_1_n_3 ;
  wire \rCOUNTER_reg[28]_i_1_n_4 ;
  wire \rCOUNTER_reg[28]_i_1_n_5 ;
  wire \rCOUNTER_reg[28]_i_1_n_6 ;
  wire \rCOUNTER_reg[28]_i_1_n_7 ;
  wire \rCOUNTER_reg[32]_i_1_n_0 ;
  wire \rCOUNTER_reg[32]_i_1_n_1 ;
  wire \rCOUNTER_reg[32]_i_1_n_2 ;
  wire \rCOUNTER_reg[32]_i_1_n_3 ;
  wire \rCOUNTER_reg[32]_i_1_n_4 ;
  wire \rCOUNTER_reg[32]_i_1_n_5 ;
  wire \rCOUNTER_reg[32]_i_1_n_6 ;
  wire \rCOUNTER_reg[32]_i_1_n_7 ;
  wire \rCOUNTER_reg[36]_i_1_n_0 ;
  wire \rCOUNTER_reg[36]_i_1_n_1 ;
  wire \rCOUNTER_reg[36]_i_1_n_2 ;
  wire \rCOUNTER_reg[36]_i_1_n_3 ;
  wire \rCOUNTER_reg[36]_i_1_n_4 ;
  wire \rCOUNTER_reg[36]_i_1_n_5 ;
  wire \rCOUNTER_reg[36]_i_1_n_6 ;
  wire \rCOUNTER_reg[36]_i_1_n_7 ;
  wire \rCOUNTER_reg[40]_i_1_n_0 ;
  wire \rCOUNTER_reg[40]_i_1_n_1 ;
  wire \rCOUNTER_reg[40]_i_1_n_2 ;
  wire \rCOUNTER_reg[40]_i_1_n_3 ;
  wire \rCOUNTER_reg[40]_i_1_n_4 ;
  wire \rCOUNTER_reg[40]_i_1_n_5 ;
  wire \rCOUNTER_reg[40]_i_1_n_6 ;
  wire \rCOUNTER_reg[40]_i_1_n_7 ;
  wire \rCOUNTER_reg[44]_i_1_n_0 ;
  wire \rCOUNTER_reg[44]_i_1_n_1 ;
  wire \rCOUNTER_reg[44]_i_1_n_2 ;
  wire \rCOUNTER_reg[44]_i_1_n_3 ;
  wire \rCOUNTER_reg[44]_i_1_n_4 ;
  wire \rCOUNTER_reg[44]_i_1_n_5 ;
  wire \rCOUNTER_reg[44]_i_1_n_6 ;
  wire \rCOUNTER_reg[44]_i_1_n_7 ;
  wire \rCOUNTER_reg[48]_i_1_n_0 ;
  wire \rCOUNTER_reg[48]_i_1_n_1 ;
  wire \rCOUNTER_reg[48]_i_1_n_2 ;
  wire \rCOUNTER_reg[48]_i_1_n_3 ;
  wire \rCOUNTER_reg[48]_i_1_n_4 ;
  wire \rCOUNTER_reg[48]_i_1_n_5 ;
  wire \rCOUNTER_reg[48]_i_1_n_6 ;
  wire \rCOUNTER_reg[48]_i_1_n_7 ;
  wire \rCOUNTER_reg[4]_i_1_n_0 ;
  wire \rCOUNTER_reg[4]_i_1_n_1 ;
  wire \rCOUNTER_reg[4]_i_1_n_2 ;
  wire \rCOUNTER_reg[4]_i_1_n_3 ;
  wire \rCOUNTER_reg[4]_i_1_n_4 ;
  wire \rCOUNTER_reg[4]_i_1_n_5 ;
  wire \rCOUNTER_reg[4]_i_1_n_6 ;
  wire \rCOUNTER_reg[4]_i_1_n_7 ;
  wire \rCOUNTER_reg[52]_i_1_n_0 ;
  wire \rCOUNTER_reg[52]_i_1_n_1 ;
  wire \rCOUNTER_reg[52]_i_1_n_2 ;
  wire \rCOUNTER_reg[52]_i_1_n_3 ;
  wire \rCOUNTER_reg[52]_i_1_n_4 ;
  wire \rCOUNTER_reg[52]_i_1_n_5 ;
  wire \rCOUNTER_reg[52]_i_1_n_6 ;
  wire \rCOUNTER_reg[52]_i_1_n_7 ;
  wire \rCOUNTER_reg[56]_i_1_n_0 ;
  wire \rCOUNTER_reg[56]_i_1_n_1 ;
  wire \rCOUNTER_reg[56]_i_1_n_2 ;
  wire \rCOUNTER_reg[56]_i_1_n_3 ;
  wire \rCOUNTER_reg[56]_i_1_n_4 ;
  wire \rCOUNTER_reg[56]_i_1_n_5 ;
  wire \rCOUNTER_reg[56]_i_1_n_6 ;
  wire \rCOUNTER_reg[56]_i_1_n_7 ;
  wire \rCOUNTER_reg[60]_i_1_n_1 ;
  wire \rCOUNTER_reg[60]_i_1_n_2 ;
  wire \rCOUNTER_reg[60]_i_1_n_3 ;
  wire \rCOUNTER_reg[60]_i_1_n_4 ;
  wire \rCOUNTER_reg[60]_i_1_n_5 ;
  wire \rCOUNTER_reg[60]_i_1_n_6 ;
  wire \rCOUNTER_reg[60]_i_1_n_7 ;
  wire \rCOUNTER_reg[8]_i_1_n_0 ;
  wire \rCOUNTER_reg[8]_i_1_n_1 ;
  wire \rCOUNTER_reg[8]_i_1_n_2 ;
  wire \rCOUNTER_reg[8]_i_1_n_3 ;
  wire \rCOUNTER_reg[8]_i_1_n_4 ;
  wire \rCOUNTER_reg[8]_i_1_n_5 ;
  wire \rCOUNTER_reg[8]_i_1_n_6 ;
  wire \rCOUNTER_reg[8]_i_1_n_7 ;
  wire [63:0]\rLatch2_reg[63]_0 ;
  (* DONT_TOUCH *) wire [25:0]wPhase;
  (* DONT_TOUCH *) wire [24:0]wPhase_n;
  wire [3:3]\NLW_rCOUNTER_reg[60]_i_1_CO_UNCONNECTED ;

  assign debug[3] = latchLock2;
  assign debug[2] = latchLock1;
  assign debug[1:0] = \^debug [1:0];
  assign wPhase[0] = globalClock;
  LUT3 #(
    .INIT(8'hA8)) 
    \debug[6]_INST_0 
       (.I0(iLatch1),
        .I1(\debug[7] [0]),
        .I2(\^debug [0]),
        .O(\^debug [0]));
  LUT3 #(
    .INIT(8'hA8)) 
    \debug[7]_INST_0 
       (.I0(iLatch2),
        .I1(\debug[7] [1]),
        .I2(\^debug [1]),
        .O(\^debug [1]));
  LUT4 #(
    .INIT(16'hCCCE)) 
    latchLock1_reg0
       (.I0(latchLock1),
        .I1(iLatch1),
        .I2(\^debug [0]),
        .I3(\debug[7] [0]),
        .O(latchLock1));
  LUT4 #(
    .INIT(16'hCCCE)) 
    latchLock2_reg0
       (.I0(latchLock2),
        .I1(iLatch2),
        .I2(\^debug [1]),
        .I3(\debug[7] [1]),
        .O(latchLock2));
  LUT1 #(
    .INIT(2'h1)) 
    \rCOUNTER[0]_i_2 
       (.I0(rCOUNTER_reg[0]),
        .O(\rCOUNTER[0]_i_2_n_0 ));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[0] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[0]_i_1_n_7 ),
        .Q(rCOUNTER_reg[0]),
        .R(1'b0));
  (* ADDER_THRESHOLD = "11" *) 
  CARRY4 \rCOUNTER_reg[0]_i_1 
       (.CI(1'b0),
        .CO({\rCOUNTER_reg[0]_i_1_n_0 ,\rCOUNTER_reg[0]_i_1_n_1 ,\rCOUNTER_reg[0]_i_1_n_2 ,\rCOUNTER_reg[0]_i_1_n_3 }),
        .CYINIT(1'b0),
        .DI({1'b0,1'b0,1'b0,1'b1}),
        .O({\rCOUNTER_reg[0]_i_1_n_4 ,\rCOUNTER_reg[0]_i_1_n_5 ,\rCOUNTER_reg[0]_i_1_n_6 ,\rCOUNTER_reg[0]_i_1_n_7 }),
        .S({rCOUNTER_reg[3:1],\rCOUNTER[0]_i_2_n_0 }));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[10] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[8]_i_1_n_5 ),
        .Q(rCOUNTER_reg[10]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[11] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[8]_i_1_n_4 ),
        .Q(rCOUNTER_reg[11]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[12] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[12]_i_1_n_7 ),
        .Q(rCOUNTER_reg[12]),
        .R(1'b0));
  (* ADDER_THRESHOLD = "11" *) 
  CARRY4 \rCOUNTER_reg[12]_i_1 
       (.CI(\rCOUNTER_reg[8]_i_1_n_0 ),
        .CO({\rCOUNTER_reg[12]_i_1_n_0 ,\rCOUNTER_reg[12]_i_1_n_1 ,\rCOUNTER_reg[12]_i_1_n_2 ,\rCOUNTER_reg[12]_i_1_n_3 }),
        .CYINIT(1'b0),
        .DI({1'b0,1'b0,1'b0,1'b0}),
        .O({\rCOUNTER_reg[12]_i_1_n_4 ,\rCOUNTER_reg[12]_i_1_n_5 ,\rCOUNTER_reg[12]_i_1_n_6 ,\rCOUNTER_reg[12]_i_1_n_7 }),
        .S(rCOUNTER_reg[15:12]));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[13] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[12]_i_1_n_6 ),
        .Q(rCOUNTER_reg[13]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[14] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[12]_i_1_n_5 ),
        .Q(rCOUNTER_reg[14]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[15] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[12]_i_1_n_4 ),
        .Q(rCOUNTER_reg[15]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[16] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[16]_i_1_n_7 ),
        .Q(rCOUNTER_reg[16]),
        .R(1'b0));
  (* ADDER_THRESHOLD = "11" *) 
  CARRY4 \rCOUNTER_reg[16]_i_1 
       (.CI(\rCOUNTER_reg[12]_i_1_n_0 ),
        .CO({\rCOUNTER_reg[16]_i_1_n_0 ,\rCOUNTER_reg[16]_i_1_n_1 ,\rCOUNTER_reg[16]_i_1_n_2 ,\rCOUNTER_reg[16]_i_1_n_3 }),
        .CYINIT(1'b0),
        .DI({1'b0,1'b0,1'b0,1'b0}),
        .O({\rCOUNTER_reg[16]_i_1_n_4 ,\rCOUNTER_reg[16]_i_1_n_5 ,\rCOUNTER_reg[16]_i_1_n_6 ,\rCOUNTER_reg[16]_i_1_n_7 }),
        .S(rCOUNTER_reg[19:16]));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[17] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[16]_i_1_n_6 ),
        .Q(rCOUNTER_reg[17]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[18] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[16]_i_1_n_5 ),
        .Q(rCOUNTER_reg[18]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[19] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[16]_i_1_n_4 ),
        .Q(rCOUNTER_reg[19]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[1] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[0]_i_1_n_6 ),
        .Q(rCOUNTER_reg[1]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[20] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[20]_i_1_n_7 ),
        .Q(rCOUNTER_reg[20]),
        .R(1'b0));
  (* ADDER_THRESHOLD = "11" *) 
  CARRY4 \rCOUNTER_reg[20]_i_1 
       (.CI(\rCOUNTER_reg[16]_i_1_n_0 ),
        .CO({\rCOUNTER_reg[20]_i_1_n_0 ,\rCOUNTER_reg[20]_i_1_n_1 ,\rCOUNTER_reg[20]_i_1_n_2 ,\rCOUNTER_reg[20]_i_1_n_3 }),
        .CYINIT(1'b0),
        .DI({1'b0,1'b0,1'b0,1'b0}),
        .O({\rCOUNTER_reg[20]_i_1_n_4 ,\rCOUNTER_reg[20]_i_1_n_5 ,\rCOUNTER_reg[20]_i_1_n_6 ,\rCOUNTER_reg[20]_i_1_n_7 }),
        .S(rCOUNTER_reg[23:20]));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[21] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[20]_i_1_n_6 ),
        .Q(rCOUNTER_reg[21]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[22] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[20]_i_1_n_5 ),
        .Q(rCOUNTER_reg[22]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[23] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[20]_i_1_n_4 ),
        .Q(rCOUNTER_reg[23]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[24] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[24]_i_1_n_7 ),
        .Q(rCOUNTER_reg[24]),
        .R(1'b0));
  (* ADDER_THRESHOLD = "11" *) 
  CARRY4 \rCOUNTER_reg[24]_i_1 
       (.CI(\rCOUNTER_reg[20]_i_1_n_0 ),
        .CO({\rCOUNTER_reg[24]_i_1_n_0 ,\rCOUNTER_reg[24]_i_1_n_1 ,\rCOUNTER_reg[24]_i_1_n_2 ,\rCOUNTER_reg[24]_i_1_n_3 }),
        .CYINIT(1'b0),
        .DI({1'b0,1'b0,1'b0,1'b0}),
        .O({\rCOUNTER_reg[24]_i_1_n_4 ,\rCOUNTER_reg[24]_i_1_n_5 ,\rCOUNTER_reg[24]_i_1_n_6 ,\rCOUNTER_reg[24]_i_1_n_7 }),
        .S(rCOUNTER_reg[27:24]));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[25] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[24]_i_1_n_6 ),
        .Q(rCOUNTER_reg[25]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[26] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[24]_i_1_n_5 ),
        .Q(rCOUNTER_reg[26]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[27] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[24]_i_1_n_4 ),
        .Q(rCOUNTER_reg[27]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[28] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[28]_i_1_n_7 ),
        .Q(rCOUNTER_reg[28]),
        .R(1'b0));
  (* ADDER_THRESHOLD = "11" *) 
  CARRY4 \rCOUNTER_reg[28]_i_1 
       (.CI(\rCOUNTER_reg[24]_i_1_n_0 ),
        .CO({\rCOUNTER_reg[28]_i_1_n_0 ,\rCOUNTER_reg[28]_i_1_n_1 ,\rCOUNTER_reg[28]_i_1_n_2 ,\rCOUNTER_reg[28]_i_1_n_3 }),
        .CYINIT(1'b0),
        .DI({1'b0,1'b0,1'b0,1'b0}),
        .O({\rCOUNTER_reg[28]_i_1_n_4 ,\rCOUNTER_reg[28]_i_1_n_5 ,\rCOUNTER_reg[28]_i_1_n_6 ,\rCOUNTER_reg[28]_i_1_n_7 }),
        .S(rCOUNTER_reg[31:28]));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[29] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[28]_i_1_n_6 ),
        .Q(rCOUNTER_reg[29]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[2] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[0]_i_1_n_5 ),
        .Q(rCOUNTER_reg[2]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[30] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[28]_i_1_n_5 ),
        .Q(rCOUNTER_reg[30]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[31] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[28]_i_1_n_4 ),
        .Q(rCOUNTER_reg[31]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[32] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[32]_i_1_n_7 ),
        .Q(rCOUNTER_reg[32]),
        .R(1'b0));
  (* ADDER_THRESHOLD = "11" *) 
  CARRY4 \rCOUNTER_reg[32]_i_1 
       (.CI(\rCOUNTER_reg[28]_i_1_n_0 ),
        .CO({\rCOUNTER_reg[32]_i_1_n_0 ,\rCOUNTER_reg[32]_i_1_n_1 ,\rCOUNTER_reg[32]_i_1_n_2 ,\rCOUNTER_reg[32]_i_1_n_3 }),
        .CYINIT(1'b0),
        .DI({1'b0,1'b0,1'b0,1'b0}),
        .O({\rCOUNTER_reg[32]_i_1_n_4 ,\rCOUNTER_reg[32]_i_1_n_5 ,\rCOUNTER_reg[32]_i_1_n_6 ,\rCOUNTER_reg[32]_i_1_n_7 }),
        .S(rCOUNTER_reg[35:32]));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[33] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[32]_i_1_n_6 ),
        .Q(rCOUNTER_reg[33]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[34] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[32]_i_1_n_5 ),
        .Q(rCOUNTER_reg[34]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[35] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[32]_i_1_n_4 ),
        .Q(rCOUNTER_reg[35]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[36] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[36]_i_1_n_7 ),
        .Q(rCOUNTER_reg[36]),
        .R(1'b0));
  (* ADDER_THRESHOLD = "11" *) 
  CARRY4 \rCOUNTER_reg[36]_i_1 
       (.CI(\rCOUNTER_reg[32]_i_1_n_0 ),
        .CO({\rCOUNTER_reg[36]_i_1_n_0 ,\rCOUNTER_reg[36]_i_1_n_1 ,\rCOUNTER_reg[36]_i_1_n_2 ,\rCOUNTER_reg[36]_i_1_n_3 }),
        .CYINIT(1'b0),
        .DI({1'b0,1'b0,1'b0,1'b0}),
        .O({\rCOUNTER_reg[36]_i_1_n_4 ,\rCOUNTER_reg[36]_i_1_n_5 ,\rCOUNTER_reg[36]_i_1_n_6 ,\rCOUNTER_reg[36]_i_1_n_7 }),
        .S(rCOUNTER_reg[39:36]));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[37] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[36]_i_1_n_6 ),
        .Q(rCOUNTER_reg[37]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[38] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[36]_i_1_n_5 ),
        .Q(rCOUNTER_reg[38]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[39] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[36]_i_1_n_4 ),
        .Q(rCOUNTER_reg[39]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[3] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[0]_i_1_n_4 ),
        .Q(rCOUNTER_reg[3]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[40] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[40]_i_1_n_7 ),
        .Q(rCOUNTER_reg[40]),
        .R(1'b0));
  (* ADDER_THRESHOLD = "11" *) 
  CARRY4 \rCOUNTER_reg[40]_i_1 
       (.CI(\rCOUNTER_reg[36]_i_1_n_0 ),
        .CO({\rCOUNTER_reg[40]_i_1_n_0 ,\rCOUNTER_reg[40]_i_1_n_1 ,\rCOUNTER_reg[40]_i_1_n_2 ,\rCOUNTER_reg[40]_i_1_n_3 }),
        .CYINIT(1'b0),
        .DI({1'b0,1'b0,1'b0,1'b0}),
        .O({\rCOUNTER_reg[40]_i_1_n_4 ,\rCOUNTER_reg[40]_i_1_n_5 ,\rCOUNTER_reg[40]_i_1_n_6 ,\rCOUNTER_reg[40]_i_1_n_7 }),
        .S(rCOUNTER_reg[43:40]));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[41] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[40]_i_1_n_6 ),
        .Q(rCOUNTER_reg[41]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[42] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[40]_i_1_n_5 ),
        .Q(rCOUNTER_reg[42]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[43] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[40]_i_1_n_4 ),
        .Q(rCOUNTER_reg[43]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[44] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[44]_i_1_n_7 ),
        .Q(rCOUNTER_reg[44]),
        .R(1'b0));
  (* ADDER_THRESHOLD = "11" *) 
  CARRY4 \rCOUNTER_reg[44]_i_1 
       (.CI(\rCOUNTER_reg[40]_i_1_n_0 ),
        .CO({\rCOUNTER_reg[44]_i_1_n_0 ,\rCOUNTER_reg[44]_i_1_n_1 ,\rCOUNTER_reg[44]_i_1_n_2 ,\rCOUNTER_reg[44]_i_1_n_3 }),
        .CYINIT(1'b0),
        .DI({1'b0,1'b0,1'b0,1'b0}),
        .O({\rCOUNTER_reg[44]_i_1_n_4 ,\rCOUNTER_reg[44]_i_1_n_5 ,\rCOUNTER_reg[44]_i_1_n_6 ,\rCOUNTER_reg[44]_i_1_n_7 }),
        .S(rCOUNTER_reg[47:44]));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[45] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[44]_i_1_n_6 ),
        .Q(rCOUNTER_reg[45]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[46] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[44]_i_1_n_5 ),
        .Q(rCOUNTER_reg[46]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[47] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[44]_i_1_n_4 ),
        .Q(rCOUNTER_reg[47]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[48] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[48]_i_1_n_7 ),
        .Q(rCOUNTER_reg[48]),
        .R(1'b0));
  (* ADDER_THRESHOLD = "11" *) 
  CARRY4 \rCOUNTER_reg[48]_i_1 
       (.CI(\rCOUNTER_reg[44]_i_1_n_0 ),
        .CO({\rCOUNTER_reg[48]_i_1_n_0 ,\rCOUNTER_reg[48]_i_1_n_1 ,\rCOUNTER_reg[48]_i_1_n_2 ,\rCOUNTER_reg[48]_i_1_n_3 }),
        .CYINIT(1'b0),
        .DI({1'b0,1'b0,1'b0,1'b0}),
        .O({\rCOUNTER_reg[48]_i_1_n_4 ,\rCOUNTER_reg[48]_i_1_n_5 ,\rCOUNTER_reg[48]_i_1_n_6 ,\rCOUNTER_reg[48]_i_1_n_7 }),
        .S(rCOUNTER_reg[51:48]));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[49] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[48]_i_1_n_6 ),
        .Q(rCOUNTER_reg[49]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[4] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[4]_i_1_n_7 ),
        .Q(rCOUNTER_reg[4]),
        .R(1'b0));
  (* ADDER_THRESHOLD = "11" *) 
  CARRY4 \rCOUNTER_reg[4]_i_1 
       (.CI(\rCOUNTER_reg[0]_i_1_n_0 ),
        .CO({\rCOUNTER_reg[4]_i_1_n_0 ,\rCOUNTER_reg[4]_i_1_n_1 ,\rCOUNTER_reg[4]_i_1_n_2 ,\rCOUNTER_reg[4]_i_1_n_3 }),
        .CYINIT(1'b0),
        .DI({1'b0,1'b0,1'b0,1'b0}),
        .O({\rCOUNTER_reg[4]_i_1_n_4 ,\rCOUNTER_reg[4]_i_1_n_5 ,\rCOUNTER_reg[4]_i_1_n_6 ,\rCOUNTER_reg[4]_i_1_n_7 }),
        .S(rCOUNTER_reg[7:4]));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[50] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[48]_i_1_n_5 ),
        .Q(rCOUNTER_reg[50]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[51] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[48]_i_1_n_4 ),
        .Q(rCOUNTER_reg[51]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[52] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[52]_i_1_n_7 ),
        .Q(rCOUNTER_reg[52]),
        .R(1'b0));
  (* ADDER_THRESHOLD = "11" *) 
  CARRY4 \rCOUNTER_reg[52]_i_1 
       (.CI(\rCOUNTER_reg[48]_i_1_n_0 ),
        .CO({\rCOUNTER_reg[52]_i_1_n_0 ,\rCOUNTER_reg[52]_i_1_n_1 ,\rCOUNTER_reg[52]_i_1_n_2 ,\rCOUNTER_reg[52]_i_1_n_3 }),
        .CYINIT(1'b0),
        .DI({1'b0,1'b0,1'b0,1'b0}),
        .O({\rCOUNTER_reg[52]_i_1_n_4 ,\rCOUNTER_reg[52]_i_1_n_5 ,\rCOUNTER_reg[52]_i_1_n_6 ,\rCOUNTER_reg[52]_i_1_n_7 }),
        .S(rCOUNTER_reg[55:52]));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[53] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[52]_i_1_n_6 ),
        .Q(rCOUNTER_reg[53]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[54] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[52]_i_1_n_5 ),
        .Q(rCOUNTER_reg[54]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[55] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[52]_i_1_n_4 ),
        .Q(rCOUNTER_reg[55]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[56] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[56]_i_1_n_7 ),
        .Q(rCOUNTER_reg[56]),
        .R(1'b0));
  (* ADDER_THRESHOLD = "11" *) 
  CARRY4 \rCOUNTER_reg[56]_i_1 
       (.CI(\rCOUNTER_reg[52]_i_1_n_0 ),
        .CO({\rCOUNTER_reg[56]_i_1_n_0 ,\rCOUNTER_reg[56]_i_1_n_1 ,\rCOUNTER_reg[56]_i_1_n_2 ,\rCOUNTER_reg[56]_i_1_n_3 }),
        .CYINIT(1'b0),
        .DI({1'b0,1'b0,1'b0,1'b0}),
        .O({\rCOUNTER_reg[56]_i_1_n_4 ,\rCOUNTER_reg[56]_i_1_n_5 ,\rCOUNTER_reg[56]_i_1_n_6 ,\rCOUNTER_reg[56]_i_1_n_7 }),
        .S(rCOUNTER_reg[59:56]));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[57] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[56]_i_1_n_6 ),
        .Q(rCOUNTER_reg[57]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[58] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[56]_i_1_n_5 ),
        .Q(rCOUNTER_reg[58]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[59] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[56]_i_1_n_4 ),
        .Q(rCOUNTER_reg[59]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[5] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[4]_i_1_n_6 ),
        .Q(rCOUNTER_reg[5]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[60] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[60]_i_1_n_7 ),
        .Q(rCOUNTER_reg[60]),
        .R(1'b0));
  (* ADDER_THRESHOLD = "11" *) 
  CARRY4 \rCOUNTER_reg[60]_i_1 
       (.CI(\rCOUNTER_reg[56]_i_1_n_0 ),
        .CO({\NLW_rCOUNTER_reg[60]_i_1_CO_UNCONNECTED [3],\rCOUNTER_reg[60]_i_1_n_1 ,\rCOUNTER_reg[60]_i_1_n_2 ,\rCOUNTER_reg[60]_i_1_n_3 }),
        .CYINIT(1'b0),
        .DI({1'b0,1'b0,1'b0,1'b0}),
        .O({\rCOUNTER_reg[60]_i_1_n_4 ,\rCOUNTER_reg[60]_i_1_n_5 ,\rCOUNTER_reg[60]_i_1_n_6 ,\rCOUNTER_reg[60]_i_1_n_7 }),
        .S(rCOUNTER_reg[63:60]));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[61] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[60]_i_1_n_6 ),
        .Q(rCOUNTER_reg[61]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[62] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[60]_i_1_n_5 ),
        .Q(rCOUNTER_reg[62]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[63] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[60]_i_1_n_4 ),
        .Q(rCOUNTER_reg[63]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[6] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[4]_i_1_n_5 ),
        .Q(rCOUNTER_reg[6]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[7] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[4]_i_1_n_4 ),
        .Q(rCOUNTER_reg[7]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[8] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[8]_i_1_n_7 ),
        .Q(rCOUNTER_reg[8]),
        .R(1'b0));
  (* ADDER_THRESHOLD = "11" *) 
  CARRY4 \rCOUNTER_reg[8]_i_1 
       (.CI(\rCOUNTER_reg[4]_i_1_n_0 ),
        .CO({\rCOUNTER_reg[8]_i_1_n_0 ,\rCOUNTER_reg[8]_i_1_n_1 ,\rCOUNTER_reg[8]_i_1_n_2 ,\rCOUNTER_reg[8]_i_1_n_3 }),
        .CYINIT(1'b0),
        .DI({1'b0,1'b0,1'b0,1'b0}),
        .O({\rCOUNTER_reg[8]_i_1_n_4 ,\rCOUNTER_reg[8]_i_1_n_5 ,\rCOUNTER_reg[8]_i_1_n_6 ,\rCOUNTER_reg[8]_i_1_n_7 }),
        .S(rCOUNTER_reg[11:8]));
  FDRE #(
    .INIT(1'b0)) 
    \rCOUNTER_reg[9] 
       (.C(wPhase[0]),
        .CE(1'b1),
        .D(\rCOUNTER_reg[8]_i_1_n_6 ),
        .Q(rCOUNTER_reg[9]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[0] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[0]),
        .Q(Q[0]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[10] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[10]),
        .Q(Q[10]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[11] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[11]),
        .Q(Q[11]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[12] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[12]),
        .Q(Q[12]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[13] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[13]),
        .Q(Q[13]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[14] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[14]),
        .Q(Q[14]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[15] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[15]),
        .Q(Q[15]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[16] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[16]),
        .Q(Q[16]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[17] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[17]),
        .Q(Q[17]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[18] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[18]),
        .Q(Q[18]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[19] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[19]),
        .Q(Q[19]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[1] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[1]),
        .Q(Q[1]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[20] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[20]),
        .Q(Q[20]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[21] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[21]),
        .Q(Q[21]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[22] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[22]),
        .Q(Q[22]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[23] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[23]),
        .Q(Q[23]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[24] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[24]),
        .Q(Q[24]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[25] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[25]),
        .Q(Q[25]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[26] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[26]),
        .Q(Q[26]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[27] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[27]),
        .Q(Q[27]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[28] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[28]),
        .Q(Q[28]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[29] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[29]),
        .Q(Q[29]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[2] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[2]),
        .Q(Q[2]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[30] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[30]),
        .Q(Q[30]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[31] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[31]),
        .Q(Q[31]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[32] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[32]),
        .Q(Q[32]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[33] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[33]),
        .Q(Q[33]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[34] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[34]),
        .Q(Q[34]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[35] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[35]),
        .Q(Q[35]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[36] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[36]),
        .Q(Q[36]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[37] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[37]),
        .Q(Q[37]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[38] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[38]),
        .Q(Q[38]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[39] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[39]),
        .Q(Q[39]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[3] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[3]),
        .Q(Q[3]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[40] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[40]),
        .Q(Q[40]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[41] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[41]),
        .Q(Q[41]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[42] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[42]),
        .Q(Q[42]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[43] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[43]),
        .Q(Q[43]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[44] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[44]),
        .Q(Q[44]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[45] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[45]),
        .Q(Q[45]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[46] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[46]),
        .Q(Q[46]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[47] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[47]),
        .Q(Q[47]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[48] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[48]),
        .Q(Q[48]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[49] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[49]),
        .Q(Q[49]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[4] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[4]),
        .Q(Q[4]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[50] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[50]),
        .Q(Q[50]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[51] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[51]),
        .Q(Q[51]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[52] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[52]),
        .Q(Q[52]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[53] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[53]),
        .Q(Q[53]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[54] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[54]),
        .Q(Q[54]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[55] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[55]),
        .Q(Q[55]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[56] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[56]),
        .Q(Q[56]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[57] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[57]),
        .Q(Q[57]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[58] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[58]),
        .Q(Q[58]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[59] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[59]),
        .Q(Q[59]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[5] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[5]),
        .Q(Q[5]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[60] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[60]),
        .Q(Q[60]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[61] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[61]),
        .Q(Q[61]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[62] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[62]),
        .Q(Q[62]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[63] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[63]),
        .Q(Q[63]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[6] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[6]),
        .Q(Q[6]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[7] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[7]),
        .Q(Q[7]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[8] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[8]),
        .Q(Q[8]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch1_reg[9] 
       (.C(iLatch1),
        .CE(1'b1),
        .D(rCOUNTER_reg[9]),
        .Q(Q[9]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[0] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[0]),
        .Q(\rLatch2_reg[63]_0 [0]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[10] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[10]),
        .Q(\rLatch2_reg[63]_0 [10]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[11] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[11]),
        .Q(\rLatch2_reg[63]_0 [11]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[12] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[12]),
        .Q(\rLatch2_reg[63]_0 [12]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[13] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[13]),
        .Q(\rLatch2_reg[63]_0 [13]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[14] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[14]),
        .Q(\rLatch2_reg[63]_0 [14]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[15] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[15]),
        .Q(\rLatch2_reg[63]_0 [15]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[16] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[16]),
        .Q(\rLatch2_reg[63]_0 [16]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[17] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[17]),
        .Q(\rLatch2_reg[63]_0 [17]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[18] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[18]),
        .Q(\rLatch2_reg[63]_0 [18]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[19] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[19]),
        .Q(\rLatch2_reg[63]_0 [19]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[1] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[1]),
        .Q(\rLatch2_reg[63]_0 [1]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[20] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[20]),
        .Q(\rLatch2_reg[63]_0 [20]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[21] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[21]),
        .Q(\rLatch2_reg[63]_0 [21]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[22] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[22]),
        .Q(\rLatch2_reg[63]_0 [22]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[23] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[23]),
        .Q(\rLatch2_reg[63]_0 [23]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[24] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[24]),
        .Q(\rLatch2_reg[63]_0 [24]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[25] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[25]),
        .Q(\rLatch2_reg[63]_0 [25]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[26] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[26]),
        .Q(\rLatch2_reg[63]_0 [26]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[27] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[27]),
        .Q(\rLatch2_reg[63]_0 [27]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[28] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[28]),
        .Q(\rLatch2_reg[63]_0 [28]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[29] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[29]),
        .Q(\rLatch2_reg[63]_0 [29]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[2] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[2]),
        .Q(\rLatch2_reg[63]_0 [2]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[30] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[30]),
        .Q(\rLatch2_reg[63]_0 [30]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[31] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[31]),
        .Q(\rLatch2_reg[63]_0 [31]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[32] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[32]),
        .Q(\rLatch2_reg[63]_0 [32]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[33] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[33]),
        .Q(\rLatch2_reg[63]_0 [33]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[34] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[34]),
        .Q(\rLatch2_reg[63]_0 [34]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[35] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[35]),
        .Q(\rLatch2_reg[63]_0 [35]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[36] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[36]),
        .Q(\rLatch2_reg[63]_0 [36]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[37] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[37]),
        .Q(\rLatch2_reg[63]_0 [37]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[38] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[38]),
        .Q(\rLatch2_reg[63]_0 [38]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[39] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[39]),
        .Q(\rLatch2_reg[63]_0 [39]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[3] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[3]),
        .Q(\rLatch2_reg[63]_0 [3]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[40] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[40]),
        .Q(\rLatch2_reg[63]_0 [40]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[41] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[41]),
        .Q(\rLatch2_reg[63]_0 [41]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[42] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[42]),
        .Q(\rLatch2_reg[63]_0 [42]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[43] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[43]),
        .Q(\rLatch2_reg[63]_0 [43]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[44] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[44]),
        .Q(\rLatch2_reg[63]_0 [44]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[45] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[45]),
        .Q(\rLatch2_reg[63]_0 [45]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[46] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[46]),
        .Q(\rLatch2_reg[63]_0 [46]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[47] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[47]),
        .Q(\rLatch2_reg[63]_0 [47]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[48] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[48]),
        .Q(\rLatch2_reg[63]_0 [48]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[49] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[49]),
        .Q(\rLatch2_reg[63]_0 [49]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[4] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[4]),
        .Q(\rLatch2_reg[63]_0 [4]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[50] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[50]),
        .Q(\rLatch2_reg[63]_0 [50]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[51] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[51]),
        .Q(\rLatch2_reg[63]_0 [51]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[52] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[52]),
        .Q(\rLatch2_reg[63]_0 [52]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[53] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[53]),
        .Q(\rLatch2_reg[63]_0 [53]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[54] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[54]),
        .Q(\rLatch2_reg[63]_0 [54]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[55] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[55]),
        .Q(\rLatch2_reg[63]_0 [55]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[56] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[56]),
        .Q(\rLatch2_reg[63]_0 [56]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[57] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[57]),
        .Q(\rLatch2_reg[63]_0 [57]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[58] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[58]),
        .Q(\rLatch2_reg[63]_0 [58]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[59] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[59]),
        .Q(\rLatch2_reg[63]_0 [59]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[5] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[5]),
        .Q(\rLatch2_reg[63]_0 [5]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[60] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[60]),
        .Q(\rLatch2_reg[63]_0 [60]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[61] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[61]),
        .Q(\rLatch2_reg[63]_0 [61]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[62] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[62]),
        .Q(\rLatch2_reg[63]_0 [62]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[63] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[63]),
        .Q(\rLatch2_reg[63]_0 [63]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[6] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[6]),
        .Q(\rLatch2_reg[63]_0 [6]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[7] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[7]),
        .Q(\rLatch2_reg[63]_0 [7]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[8] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[8]),
        .Q(\rLatch2_reg[63]_0 [8]),
        .R(1'b0));
  FDRE #(
    .INIT(1'b0)) 
    \rLatch2_reg[9] 
       (.C(iLatch2),
        .CE(1'b1),
        .D(rCOUNTER_reg[9]),
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
       (.I0(wPhase_n[24]),
        .O(wPhase[25]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_10
       (.I0(wPhase_n[15]),
        .O(wPhase[16]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_11
       (.I0(wPhase_n[14]),
        .O(wPhase[15]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_12
       (.I0(wPhase_n[13]),
        .O(wPhase[14]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_13
       (.I0(wPhase_n[12]),
        .O(wPhase[13]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_14
       (.I0(wPhase_n[11]),
        .O(wPhase[12]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_15
       (.I0(wPhase_n[10]),
        .O(wPhase[11]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_16
       (.I0(wPhase_n[9]),
        .O(wPhase[10]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_17
       (.I0(wPhase_n[8]),
        .O(wPhase[9]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_18
       (.I0(wPhase_n[7]),
        .O(wPhase[8]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_19
       (.I0(wPhase_n[6]),
        .O(wPhase[7]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_2
       (.I0(wPhase_n[23]),
        .O(wPhase[24]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_20
       (.I0(wPhase_n[5]),
        .O(wPhase[6]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_21
       (.I0(wPhase_n[4]),
        .O(wPhase[5]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_22
       (.I0(wPhase_n[3]),
        .O(wPhase[4]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_23
       (.I0(wPhase_n[2]),
        .O(wPhase[3]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_24
       (.I0(wPhase_n[1]),
        .O(wPhase[2]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_25
       (.I0(wPhase_n[0]),
        .O(wPhase[1]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_3
       (.I0(wPhase_n[22]),
        .O(wPhase[23]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_4
       (.I0(wPhase_n[21]),
        .O(wPhase[22]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_5
       (.I0(wPhase_n[20]),
        .O(wPhase[21]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_6
       (.I0(wPhase_n[19]),
        .O(wPhase[20]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_7
       (.I0(wPhase_n[18]),
        .O(wPhase[19]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_8
       (.I0(wPhase_n[17]),
        .O(wPhase[18]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_inferred_i_9
       (.I0(wPhase_n[16]),
        .O(wPhase[17]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_n_inferred_i_1
       (.I0(wPhase[24]),
        .O(wPhase_n[24]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_n_inferred_i_10
       (.I0(wPhase[15]),
        .O(wPhase_n[15]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_n_inferred_i_11
       (.I0(wPhase[14]),
        .O(wPhase_n[14]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_n_inferred_i_12
       (.I0(wPhase[13]),
        .O(wPhase_n[13]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_n_inferred_i_13
       (.I0(wPhase[12]),
        .O(wPhase_n[12]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_n_inferred_i_14
       (.I0(wPhase[11]),
        .O(wPhase_n[11]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_n_inferred_i_15
       (.I0(wPhase[10]),
        .O(wPhase_n[10]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_n_inferred_i_16
       (.I0(wPhase[9]),
        .O(wPhase_n[9]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_n_inferred_i_17
       (.I0(wPhase[8]),
        .O(wPhase_n[8]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_n_inferred_i_18
       (.I0(wPhase[7]),
        .O(wPhase_n[7]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_n_inferred_i_19
       (.I0(wPhase[6]),
        .O(wPhase_n[6]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_n_inferred_i_2
       (.I0(wPhase[23]),
        .O(wPhase_n[23]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_n_inferred_i_20
       (.I0(wPhase[5]),
        .O(wPhase_n[5]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_n_inferred_i_21
       (.I0(wPhase[4]),
        .O(wPhase_n[4]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_n_inferred_i_22
       (.I0(wPhase[3]),
        .O(wPhase_n[3]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_n_inferred_i_23
       (.I0(wPhase[2]),
        .O(wPhase_n[2]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_n_inferred_i_24
       (.I0(wPhase[1]),
        .O(wPhase_n[1]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_n_inferred_i_25
       (.I0(wPhase[0]),
        .O(wPhase_n[0]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_n_inferred_i_3
       (.I0(wPhase[22]),
        .O(wPhase_n[22]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_n_inferred_i_4
       (.I0(wPhase[21]),
        .O(wPhase_n[21]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_n_inferred_i_5
       (.I0(wPhase[20]),
        .O(wPhase_n[20]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_n_inferred_i_6
       (.I0(wPhase[19]),
        .O(wPhase_n[19]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_n_inferred_i_7
       (.I0(wPhase[18]),
        .O(wPhase_n[18]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_n_inferred_i_8
       (.I0(wPhase[17]),
        .O(wPhase_n[17]));
  LUT1 #(
    .INIT(2'h1)) 
    wPhase_n_inferred_i_9
       (.I0(wPhase[16]),
        .O(wPhase_n[16]));
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
