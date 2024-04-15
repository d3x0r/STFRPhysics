-- Copyright 1986-2022 Xilinx, Inc. All Rights Reserved.
-- Copyright 2022-2023 Advanced Micro Devices, Inc. All Rights Reserved.
-- --------------------------------------------------------------------------------
-- Tool Version: Vivado v.2023.2 (win64) Build 4029153 Fri Oct 13 20:14:34 MDT 2023
-- Date        : Sun Jan 21 18:41:36 2024
-- Host        : tundra running 64-bit major release  (build 9200)
-- Command     : write_vhdl -force -mode funcsim
--               m:/javascript/carWars/dual-quat/STFRPhysics/hardware/fpga/vivado/Cora-7z/Cora-7z.gen/sources_1/bd/design_1/ip/design_1_OutputSplitter_0_0/design_1_OutputSplitter_0_0_sim_netlist.vhdl
-- Design      : design_1_OutputSplitter_0_0
-- Purpose     : This VHDL netlist is a functional simulation representation of the design and should not be modified or
--               synthesized. This netlist cannot be used for SDF annotated simulation.
-- Device      : xc7z007sclg400-1
-- --------------------------------------------------------------------------------
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
library UNISIM;
use UNISIM.VCOMPONENTS.ALL;
entity design_1_OutputSplitter_0_0 is
  port (
    inBus : in STD_LOGIC_VECTOR ( 31 downto 0 );
    o0 : out STD_LOGIC_VECTOR ( 0 to 0 );
    o1 : out STD_LOGIC_VECTOR ( 0 to 0 )
  );
  attribute NotValidForBitStream : boolean;
  attribute NotValidForBitStream of design_1_OutputSplitter_0_0 : entity is true;
  attribute CHECK_LICENSE_TYPE : string;
  attribute CHECK_LICENSE_TYPE of design_1_OutputSplitter_0_0 : entity is "design_1_OutputSplitter_0_0,OutputSplitter,{}";
  attribute DowngradeIPIdentifiedWarnings : string;
  attribute DowngradeIPIdentifiedWarnings of design_1_OutputSplitter_0_0 : entity is "yes";
  attribute IP_DEFINITION_SOURCE : string;
  attribute IP_DEFINITION_SOURCE of design_1_OutputSplitter_0_0 : entity is "package_project";
  attribute X_CORE_INFO : string;
  attribute X_CORE_INFO of design_1_OutputSplitter_0_0 : entity is "OutputSplitter,Vivado 2023.2";
end design_1_OutputSplitter_0_0;

architecture STRUCTURE of design_1_OutputSplitter_0_0 is
  signal \^inbus\ : STD_LOGIC_VECTOR ( 31 downto 0 );
begin
  \^inbus\(1 downto 0) <= inBus(1 downto 0);
  o0(0) <= \^inbus\(0);
  o1(0) <= \^inbus\(1);
end STRUCTURE;
