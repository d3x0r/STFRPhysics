-- Copyright 1986-2022 Xilinx, Inc. All Rights Reserved.
-- Copyright 2022-2023 Advanced Micro Devices, Inc. All Rights Reserved.
-- --------------------------------------------------------------------------------
-- Tool Version: Vivado v.2023.2 (win64) Build 4029153 Fri Oct 13 20:14:34 MDT 2023
-- Date        : Fri Jan 12 19:57:45 2024
-- Host        : tundra running 64-bit major release  (build 9200)
-- Command     : write_vhdl -force -mode funcsim
--               m:/FPGA/vivado/highSpeedClock/Cora2/Cora2.gen/sources_1/bd/design_1/ip/design_1_InputMerge_0_0/design_1_InputMerge_0_0_sim_netlist.vhdl
-- Design      : design_1_InputMerge_0_0
-- Purpose     : This VHDL netlist is a functional simulation representation of the design and should not be modified or
--               synthesized. This netlist cannot be used for SDF annotated simulation.
-- Device      : xc7z007sclg400-1
-- --------------------------------------------------------------------------------
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
library UNISIM;
use UNISIM.VCOMPONENTS.ALL;
entity design_1_InputMerge_0_0 is
  port (
    i0 : in STD_LOGIC_VECTOR ( 0 to 0 );
    i1 : in STD_LOGIC_VECTOR ( 0 to 0 );
    i2 : in STD_LOGIC_VECTOR ( 0 to 0 );
    i3 : in STD_LOGIC_VECTOR ( 0 to 0 );
    outBus : out STD_LOGIC_VECTOR ( 31 downto 0 )
  );
  attribute NotValidForBitStream : boolean;
  attribute NotValidForBitStream of design_1_InputMerge_0_0 : entity is true;
  attribute CHECK_LICENSE_TYPE : string;
  attribute CHECK_LICENSE_TYPE of design_1_InputMerge_0_0 : entity is "design_1_InputMerge_0_0,InputMerge,{}";
  attribute DowngradeIPIdentifiedWarnings : string;
  attribute DowngradeIPIdentifiedWarnings of design_1_InputMerge_0_0 : entity is "yes";
  attribute IP_DEFINITION_SOURCE : string;
  attribute IP_DEFINITION_SOURCE of design_1_InputMerge_0_0 : entity is "package_project";
  attribute X_CORE_INFO : string;
  attribute X_CORE_INFO of design_1_InputMerge_0_0 : entity is "InputMerge,Vivado 2023.2";
end design_1_InputMerge_0_0;

architecture STRUCTURE of design_1_InputMerge_0_0 is
  signal \<const0>\ : STD_LOGIC;
  signal \^i0\ : STD_LOGIC_VECTOR ( 0 to 0 );
  signal \^i1\ : STD_LOGIC_VECTOR ( 0 to 0 );
  signal \^i2\ : STD_LOGIC_VECTOR ( 0 to 0 );
  signal \^i3\ : STD_LOGIC_VECTOR ( 0 to 0 );
begin
  \^i0\(0) <= i0(0);
  \^i1\(0) <= i1(0);
  \^i2\(0) <= i2(0);
  \^i3\(0) <= i3(0);
  outBus(31) <= \<const0>\;
  outBus(30) <= \<const0>\;
  outBus(29) <= \<const0>\;
  outBus(28) <= \<const0>\;
  outBus(27) <= \<const0>\;
  outBus(26) <= \<const0>\;
  outBus(25) <= \<const0>\;
  outBus(24) <= \<const0>\;
  outBus(23) <= \<const0>\;
  outBus(22) <= \<const0>\;
  outBus(21) <= \<const0>\;
  outBus(20) <= \<const0>\;
  outBus(19) <= \<const0>\;
  outBus(18) <= \<const0>\;
  outBus(17) <= \<const0>\;
  outBus(16) <= \<const0>\;
  outBus(15) <= \<const0>\;
  outBus(14) <= \<const0>\;
  outBus(13) <= \<const0>\;
  outBus(12) <= \<const0>\;
  outBus(11) <= \<const0>\;
  outBus(10) <= \<const0>\;
  outBus(9) <= \<const0>\;
  outBus(8) <= \<const0>\;
  outBus(7) <= \<const0>\;
  outBus(6) <= \<const0>\;
  outBus(5) <= \<const0>\;
  outBus(4) <= \<const0>\;
  outBus(3) <= \^i3\(0);
  outBus(2) <= \^i2\(0);
  outBus(1) <= \^i1\(0);
  outBus(0) <= \^i0\(0);
GND: unisim.vcomponents.GND
     port map (
      G => \<const0>\
    );
end STRUCTURE;
