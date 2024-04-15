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


// IP VLNV: d3x0r:user:OutputSplitter:1.0.1
// IP Revision: 9

(* X_CORE_INFO = "OutputSplitter,Vivado 2023.2" *)
(* CHECK_LICENSE_TYPE = "design_1_OutputSplitter_0_0,OutputSplitter,{}" *)
(* IP_DEFINITION_SOURCE = "package_project" *)
(* DowngradeIPIdentifiedWarnings = "yes" *)
module design_1_OutputSplitter_0_0 (
  inBus,
  o0,
  o1
);

input wire [31 : 0] inBus;
output wire [0 : 0] o0;
output wire [0 : 0] o1;

  OutputSplitter #(
    .inWidth(32),
    .outWidth0(1),
    .outWidth1(1),
    .outWidth2(1),
    .outWidth3(1),
    .outWidth4(1),
    .outWidth5(1),
    .outWidth6(1),
    .outWidth7(1),
    .outWidth8(1),
    .outWidth9(1),
    .outWidth10(1),
    .outWidth11(1),
    .outWidth12(1),
    .outWidth13(1),
    .outWidth14(1),
    .outWidth15(1),
    .outWidth16(1),
    .outWidth17(1),
    .outWidth18(1),
    .outWidth19(1),
    .outWidth20(1),
    .outWidth21(1),
    .outWidth22(1),
    .outWidth23(1),
    .outWidth24(1),
    .outWidth25(1),
    .outWidth26(1),
    .outWidth27(1),
    .outWidth28(1),
    .outWidth29(1),
    .outWidth30(1),
    .outWidth31(1),
    .enable00(1'B1),
    .enable01(1'B1),
    .enable02(1'B0),
    .enable03(1'B0),
    .enable04(1'B0),
    .enable05(1'B0),
    .enable06(1'B0),
    .enable07(1'B0),
    .enable08(1'B0),
    .enable09(1'B0),
    .enable10(1'B0),
    .enable11(1'B0),
    .enable12(1'B0),
    .enable13(1'B0),
    .enable14(1'B0),
    .enable15(1'B0),
    .enable16(1'B0),
    .enable17(1'B0),
    .enable18(1'B0),
    .enable19(1'B0),
    .enable20(1'B0),
    .enable21(1'B0),
    .enable22(1'B0),
    .enable23(1'B0),
    .enable24(1'B0),
    .enable25(1'B0),
    .enable26(1'B0),
    .enable27(1'B0),
    .enable28(1'B0),
    .enable29(1'B0),
    .enable30(1'B0),
    .enable31(1'B0)
  ) inst (
    .inBus(inBus),
    .o0(o0),
    .o1(o1),
    .o2(),
    .o3(),
    .o4(),
    .o5(),
    .o6(),
    .o7(),
    .o8(),
    .o9(),
    .o10(),
    .o11(),
    .o12(),
    .o13(),
    .o14(),
    .o15(),
    .o16(),
    .o17(),
    .o18(),
    .o19(),
    .o20(),
    .o21(),
    .o22(),
    .o23(),
    .o24(),
    .o25(),
    .o26(),
    .o27(),
    .o28(),
    .o29(),
    .o30(),
    .o31()
  );
endmodule
