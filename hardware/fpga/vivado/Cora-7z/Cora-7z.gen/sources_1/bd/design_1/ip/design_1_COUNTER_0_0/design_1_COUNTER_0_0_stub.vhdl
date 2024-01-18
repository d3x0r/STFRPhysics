-- Copyright 1986-2022 Xilinx, Inc. All Rights Reserved.
-- Copyright 2022-2023 Advanced Micro Devices, Inc. All Rights Reserved.
-- --------------------------------------------------------------------------------
-- Tool Version: Vivado v.2023.2 (win64) Build 4029153 Fri Oct 13 20:14:34 MDT 2023
-- Date        : Thu Jan 18 00:55:44 2024
-- Host        : tundra running 64-bit major release  (build 9200)
-- Command     : write_vhdl -force -mode synth_stub
--               m:/javascript/carWars/dual-quat/STFRPhysics/hardware/fpga/vivado/Cora-7z/Cora-7z.gen/sources_1/bd/design_1/ip/design_1_COUNTER_0_0/design_1_COUNTER_0_0_stub.vhdl
-- Design      : design_1_COUNTER_0_0
-- Purpose     : Stub declaration of top-level module interface
-- Device      : xc7z007sclg400-1
-- --------------------------------------------------------------------------------
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity design_1_COUNTER_0_0 is
  Port ( 
    globalClock : in STD_LOGIC;
    iReset : in STD_LOGIC;
    iLatch1 : in STD_LOGIC;
    iLatch2 : in STD_LOGIC;
    iResetLatch1 : in STD_LOGIC;
    iResetLatch2 : in STD_LOGIC;
    o1COUNTER : out STD_LOGIC_VECTOR ( 31 downto 0 );
    o1COUNTERHi : out STD_LOGIC_VECTOR ( 31 downto 0 );
    o1COUNTERPhase : out STD_LOGIC_VECTOR ( 31 downto 0 );
    o2COUNTER : out STD_LOGIC_VECTOR ( 31 downto 0 );
    o2COUNTERHi : out STD_LOGIC_VECTOR ( 31 downto 0 );
    o2COUNTERPhase : out STD_LOGIC_VECTOR ( 31 downto 0 );
    oRdyCOUNTER : out STD_LOGIC;
    oRdyCOUNTER2 : out STD_LOGIC;
    oLatchTest1 : out STD_LOGIC;
    oLatchTest2 : out STD_LOGIC;
    debug : out STD_LOGIC_VECTOR ( 31 downto 0 )
  );

end design_1_COUNTER_0_0;

architecture stub of design_1_COUNTER_0_0 is
attribute syn_black_box : boolean;
attribute black_box_pad_pin : string;
attribute syn_black_box of stub : architecture is true;
attribute black_box_pad_pin of stub : architecture is "globalClock,iReset,iLatch1,iLatch2,iResetLatch1,iResetLatch2,o1COUNTER[31:0],o1COUNTERHi[31:0],o1COUNTERPhase[31:0],o2COUNTER[31:0],o2COUNTERHi[31:0],o2COUNTERPhase[31:0],oRdyCOUNTER,oRdyCOUNTER2,oLatchTest1,oLatchTest2,debug[31:0]";
attribute X_CORE_INFO : string;
attribute X_CORE_INFO of stub : architecture is "COUNTER,Vivado 2023.2";
begin
end;
