-- Copyright 1986-2022 Xilinx, Inc. All Rights Reserved.
-- Copyright 2022-2023 Advanced Micro Devices, Inc. All Rights Reserved.
-- --------------------------------------------------------------------------------
-- Tool Version: Vivado v.2023.2 (win64) Build 4029153 Fri Oct 13 20:14:34 MDT 2023
-- Date        : Sun Jan 14 12:39:01 2024
-- Host        : tundra running 64-bit major release  (build 9200)
-- Command     : write_vhdl -force -mode synth_stub
--               m:/FPGA/vivado/highSpeedClock/Cora2/Cora2.gen/sources_1/bd/design_1/ip/design_1_AXIHeader16_0_0/design_1_AXIHeader16_0_0_stub.vhdl
-- Design      : design_1_AXIHeader16_0_0
-- Purpose     : Stub declaration of top-level module interface
-- Device      : xc7z007sclg400-1
-- --------------------------------------------------------------------------------
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity design_1_AXIHeader16_0_0 is
  Port ( 
    iDATA00 : in STD_LOGIC_VECTOR ( 31 downto 0 );
    iDATA01 : in STD_LOGIC_VECTOR ( 31 downto 0 );
    iDATA02 : in STD_LOGIC_VECTOR ( 31 downto 0 );
    iDATA03 : in STD_LOGIC_VECTOR ( 31 downto 0 );
    iDATA04 : in STD_LOGIC_VECTOR ( 31 downto 0 );
    iDATA05 : in STD_LOGIC_VECTOR ( 31 downto 0 );
    iDATA06 : in STD_LOGIC_VECTOR ( 31 downto 0 );
    iDATA07 : in STD_LOGIC_VECTOR ( 31 downto 0 );
    iDATA08 : in STD_LOGIC_VECTOR ( 31 downto 0 );
    oDATA00 : out STD_LOGIC_VECTOR ( 31 downto 0 );
    s00_axi_aclk : in STD_LOGIC;
    s00_axi_aresetn : in STD_LOGIC;
    s00_axi_awaddr : in STD_LOGIC_VECTOR ( 7 downto 0 );
    s00_axi_awprot : in STD_LOGIC_VECTOR ( 2 downto 0 );
    s00_axi_awvalid : in STD_LOGIC;
    s00_axi_awready : out STD_LOGIC;
    s00_axi_wdata : in STD_LOGIC_VECTOR ( 31 downto 0 );
    s00_axi_wstrb : in STD_LOGIC_VECTOR ( 3 downto 0 );
    s00_axi_wvalid : in STD_LOGIC;
    s00_axi_wready : out STD_LOGIC;
    s00_axi_bresp : out STD_LOGIC_VECTOR ( 1 downto 0 );
    s00_axi_bvalid : out STD_LOGIC;
    s00_axi_bready : in STD_LOGIC;
    s00_axi_araddr : in STD_LOGIC_VECTOR ( 7 downto 0 );
    s00_axi_arprot : in STD_LOGIC_VECTOR ( 2 downto 0 );
    s00_axi_arvalid : in STD_LOGIC;
    s00_axi_arready : out STD_LOGIC;
    s00_axi_rdata : out STD_LOGIC_VECTOR ( 31 downto 0 );
    s00_axi_rresp : out STD_LOGIC_VECTOR ( 1 downto 0 );
    s00_axi_rvalid : out STD_LOGIC;
    s00_axi_rready : in STD_LOGIC
  );

end design_1_AXIHeader16_0_0;

architecture stub of design_1_AXIHeader16_0_0 is
attribute syn_black_box : boolean;
attribute black_box_pad_pin : string;
attribute syn_black_box of stub : architecture is true;
attribute black_box_pad_pin of stub : architecture is "iDATA00[31:0],iDATA01[31:0],iDATA02[31:0],iDATA03[31:0],iDATA04[31:0],iDATA05[31:0],iDATA06[31:0],iDATA07[31:0],iDATA08[31:0],oDATA00[31:0],s00_axi_aclk,s00_axi_aresetn,s00_axi_awaddr[7:0],s00_axi_awprot[2:0],s00_axi_awvalid,s00_axi_awready,s00_axi_wdata[31:0],s00_axi_wstrb[3:0],s00_axi_wvalid,s00_axi_wready,s00_axi_bresp[1:0],s00_axi_bvalid,s00_axi_bready,s00_axi_araddr[7:0],s00_axi_arprot[2:0],s00_axi_arvalid,s00_axi_arready,s00_axi_rdata[31:0],s00_axi_rresp[1:0],s00_axi_rvalid,s00_axi_rready";
attribute X_CORE_INFO : string;
attribute X_CORE_INFO of stub : architecture is "AXIHeader16_v1_0,Vivado 2023.2";
begin
end;
