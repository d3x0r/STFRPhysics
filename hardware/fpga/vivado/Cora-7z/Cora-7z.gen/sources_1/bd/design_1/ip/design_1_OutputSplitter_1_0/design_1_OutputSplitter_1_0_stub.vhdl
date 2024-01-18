-- Copyright 1986-2022 Xilinx, Inc. All Rights Reserved.
-- Copyright 2022-2023 Advanced Micro Devices, Inc. All Rights Reserved.
-- --------------------------------------------------------------------------------
-- Tool Version: Vivado v.2023.2 (win64) Build 4029153 Fri Oct 13 20:14:34 MDT 2023
-- Date        : Fri Jan 12 19:57:44 2024
-- Host        : tundra running 64-bit major release  (build 9200)
-- Command     : write_vhdl -force -mode synth_stub
--               m:/FPGA/vivado/highSpeedClock/Cora2/Cora2.gen/sources_1/bd/design_1/ip/design_1_OutputSplitter_1_0/design_1_OutputSplitter_1_0_stub.vhdl
-- Design      : design_1_OutputSplitter_1_0
-- Purpose     : Stub declaration of top-level module interface
-- Device      : xc7z007sclg400-1
-- --------------------------------------------------------------------------------
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity design_1_OutputSplitter_1_0 is
  Port ( 
    inBus : in STD_LOGIC_VECTOR ( 1 downto 0 );
    o0 : out STD_LOGIC_VECTOR ( 0 to 0 );
    o1 : out STD_LOGIC_VECTOR ( 0 to 0 )
  );

end design_1_OutputSplitter_1_0;

architecture stub of design_1_OutputSplitter_1_0 is
attribute syn_black_box : boolean;
attribute black_box_pad_pin : string;
attribute syn_black_box of stub : architecture is true;
attribute black_box_pad_pin of stub : architecture is "inBus[1:0],o0[0:0],o1[0:0]";
attribute X_CORE_INFO : string;
attribute X_CORE_INFO of stub : architecture is "OutputSplitter,Vivado 2023.2";
begin
end;
