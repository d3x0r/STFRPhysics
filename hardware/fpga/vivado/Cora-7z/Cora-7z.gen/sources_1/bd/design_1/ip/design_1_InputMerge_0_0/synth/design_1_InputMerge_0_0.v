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


// IP VLNV: d3x0r:user:InputMerge:1.0
// IP Revision: 14

(* X_CORE_INFO = "InputMerge,Vivado 2023.2" *)
(* CHECK_LICENSE_TYPE = "design_1_InputMerge_0_0,InputMerge,{}" *)
(* IP_DEFINITION_SOURCE = "package_project" *)
(* DowngradeIPIdentifiedWarnings = "yes" *)
module design_1_InputMerge_0_0 (
  i0,
  i1,
  i2,
  i3,
  outBus
);

input wire [0 : 0] i0;
input wire [0 : 0] i1;
input wire [0 : 0] i2;
input wire [0 : 0] i3;
output wire [31 : 0] outBus;

  InputMerge #(
    .inWidth0(1),
    .inWidth1(1),
    .inWidth2(1),
    .inWidth3(1),
    .inWidth4(0),
    .inWidth5(0),
    .inWidth6(0),
    .inWidth7(0),
    .inWidth8(0),
    .inWidth9(0),
    .inWidth10(0),
    .inWidth11(0),
    .inWidth12(0),
    .inWidth13(0),
    .inWidth14(0),
    .inWidth15(0),
    .inWidth16(0),
    .inWidth17(0),
    .inWidth18(0),
    .inWidth19(0),
    .inWidth20(0),
    .inWidth21(0),
    .inWidth22(0),
    .inWidth23(0),
    .inWidth24(0),
    .inWidth25(0),
    .inWidth26(0),
    .inWidth27(0),
    .inWidth28(0),
    .inWidth29(0),
    .inWidth30(0),
    .inWidth31(0),
    .outWidth(32)
  ) inst (
    .i0(i0),
    .i1(i1),
    .i2(i2),
    .i3(i3),
    .i4(1'B0),
    .i5(1'B0),
    .i6(1'B0),
    .i7(1'B0),
    .i8(1'B0),
    .i9(1'B0),
    .i10(1'B0),
    .i11(1'B0),
    .i12(1'B0),
    .i13(1'B0),
    .i14(1'B0),
    .i15(1'B0),
    .i16(1'B0),
    .i17(1'B0),
    .i18(1'B0),
    .i19(1'B0),
    .i20(1'B0),
    .i21(1'B0),
    .i22(1'B0),
    .i23(1'B0),
    .i24(1'B0),
    .i25(1'B0),
    .i26(1'B0),
    .i27(1'B0),
    .i28(1'B0),
    .i29(1'B0),
    .i30(1'B0),
    .i31(1'B0),
    .outBus(outBus)
  );
endmodule
