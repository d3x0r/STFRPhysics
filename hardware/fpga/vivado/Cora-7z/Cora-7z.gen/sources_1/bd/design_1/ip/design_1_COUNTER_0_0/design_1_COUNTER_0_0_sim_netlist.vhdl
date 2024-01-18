-- Copyright 1986-2022 Xilinx, Inc. All Rights Reserved.
-- Copyright 2022-2023 Advanced Micro Devices, Inc. All Rights Reserved.
-- --------------------------------------------------------------------------------
-- Tool Version: Vivado v.2023.2 (win64) Build 4029153 Fri Oct 13 20:14:34 MDT 2023
-- Date        : Thu Jan 18 00:55:44 2024
-- Host        : tundra running 64-bit major release  (build 9200)
-- Command     : write_vhdl -force -mode funcsim
--               m:/javascript/carWars/dual-quat/STFRPhysics/hardware/fpga/vivado/Cora-7z/Cora-7z.gen/sources_1/bd/design_1/ip/design_1_COUNTER_0_0/design_1_COUNTER_0_0_sim_netlist.vhdl
-- Design      : design_1_COUNTER_0_0
-- Purpose     : This VHDL netlist is a functional simulation representation of the design and should not be modified or
--               synthesized. This netlist cannot be used for SDF annotated simulation.
-- Device      : xc7z007sclg400-1
-- --------------------------------------------------------------------------------
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
library UNISIM;
use UNISIM.VCOMPONENTS.ALL;
entity design_1_COUNTER_0_0_COUNTER is
  port (
    oRdyCOUNTER : out STD_LOGIC;
    oRdyCOUNTER2 : out STD_LOGIC;
    Q : out STD_LOGIC_VECTOR ( 63 downto 0 );
    o1COUNTERPhase : out STD_LOGIC_VECTOR ( 25 downto 0 );
    \rLatch2_reg[63]_0\ : out STD_LOGIC_VECTOR ( 63 downto 0 );
    o2COUNTERPhase : out STD_LOGIC_VECTOR ( 25 downto 0 );
    globalClock : in STD_LOGIC;
    iLatch1 : in STD_LOGIC;
    iLatch2 : in STD_LOGIC;
    iResetLatch1 : in STD_LOGIC;
    iResetLatch2 : in STD_LOGIC
  );
  attribute ORIG_REF_NAME : string;
  attribute ORIG_REF_NAME of design_1_COUNTER_0_0_COUNTER : entity is "COUNTER";
end design_1_COUNTER_0_0_COUNTER;

architecture STRUCTURE of design_1_COUNTER_0_0_COUNTER is
  signal latchLock1 : STD_LOGIC;
  attribute ALLOW_COMBINATORIAL_LOOPS : boolean;
  attribute ALLOW_COMBINATORIAL_LOOPS of latchLock1 : signal is std.standard.true;
  attribute async_reg : string;
  attribute async_reg of latchLock1 : signal is "true";
  signal latchLock1_reg0_i_1_n_0 : STD_LOGIC;
  signal latchLock2 : STD_LOGIC;
  attribute ALLOW_COMBINATORIAL_LOOPS of latchLock2 : signal is std.standard.true;
  attribute async_reg of latchLock2 : signal is "true";
  signal latchLock2_reg0_i_1_n_0 : STD_LOGIC;
  signal \rCOUNTER[0]_i_2_n_0\ : STD_LOGIC;
  signal rCOUNTER_reg : STD_LOGIC_VECTOR ( 63 downto 0 );
  signal \rCOUNTER_reg[0]_i_1_n_0\ : STD_LOGIC;
  signal \rCOUNTER_reg[0]_i_1_n_1\ : STD_LOGIC;
  signal \rCOUNTER_reg[0]_i_1_n_2\ : STD_LOGIC;
  signal \rCOUNTER_reg[0]_i_1_n_3\ : STD_LOGIC;
  signal \rCOUNTER_reg[0]_i_1_n_4\ : STD_LOGIC;
  signal \rCOUNTER_reg[0]_i_1_n_5\ : STD_LOGIC;
  signal \rCOUNTER_reg[0]_i_1_n_6\ : STD_LOGIC;
  signal \rCOUNTER_reg[0]_i_1_n_7\ : STD_LOGIC;
  signal \rCOUNTER_reg[12]_i_1_n_0\ : STD_LOGIC;
  signal \rCOUNTER_reg[12]_i_1_n_1\ : STD_LOGIC;
  signal \rCOUNTER_reg[12]_i_1_n_2\ : STD_LOGIC;
  signal \rCOUNTER_reg[12]_i_1_n_3\ : STD_LOGIC;
  signal \rCOUNTER_reg[12]_i_1_n_4\ : STD_LOGIC;
  signal \rCOUNTER_reg[12]_i_1_n_5\ : STD_LOGIC;
  signal \rCOUNTER_reg[12]_i_1_n_6\ : STD_LOGIC;
  signal \rCOUNTER_reg[12]_i_1_n_7\ : STD_LOGIC;
  signal \rCOUNTER_reg[16]_i_1_n_0\ : STD_LOGIC;
  signal \rCOUNTER_reg[16]_i_1_n_1\ : STD_LOGIC;
  signal \rCOUNTER_reg[16]_i_1_n_2\ : STD_LOGIC;
  signal \rCOUNTER_reg[16]_i_1_n_3\ : STD_LOGIC;
  signal \rCOUNTER_reg[16]_i_1_n_4\ : STD_LOGIC;
  signal \rCOUNTER_reg[16]_i_1_n_5\ : STD_LOGIC;
  signal \rCOUNTER_reg[16]_i_1_n_6\ : STD_LOGIC;
  signal \rCOUNTER_reg[16]_i_1_n_7\ : STD_LOGIC;
  signal \rCOUNTER_reg[20]_i_1_n_0\ : STD_LOGIC;
  signal \rCOUNTER_reg[20]_i_1_n_1\ : STD_LOGIC;
  signal \rCOUNTER_reg[20]_i_1_n_2\ : STD_LOGIC;
  signal \rCOUNTER_reg[20]_i_1_n_3\ : STD_LOGIC;
  signal \rCOUNTER_reg[20]_i_1_n_4\ : STD_LOGIC;
  signal \rCOUNTER_reg[20]_i_1_n_5\ : STD_LOGIC;
  signal \rCOUNTER_reg[20]_i_1_n_6\ : STD_LOGIC;
  signal \rCOUNTER_reg[20]_i_1_n_7\ : STD_LOGIC;
  signal \rCOUNTER_reg[24]_i_1_n_0\ : STD_LOGIC;
  signal \rCOUNTER_reg[24]_i_1_n_1\ : STD_LOGIC;
  signal \rCOUNTER_reg[24]_i_1_n_2\ : STD_LOGIC;
  signal \rCOUNTER_reg[24]_i_1_n_3\ : STD_LOGIC;
  signal \rCOUNTER_reg[24]_i_1_n_4\ : STD_LOGIC;
  signal \rCOUNTER_reg[24]_i_1_n_5\ : STD_LOGIC;
  signal \rCOUNTER_reg[24]_i_1_n_6\ : STD_LOGIC;
  signal \rCOUNTER_reg[24]_i_1_n_7\ : STD_LOGIC;
  signal \rCOUNTER_reg[28]_i_1_n_0\ : STD_LOGIC;
  signal \rCOUNTER_reg[28]_i_1_n_1\ : STD_LOGIC;
  signal \rCOUNTER_reg[28]_i_1_n_2\ : STD_LOGIC;
  signal \rCOUNTER_reg[28]_i_1_n_3\ : STD_LOGIC;
  signal \rCOUNTER_reg[28]_i_1_n_4\ : STD_LOGIC;
  signal \rCOUNTER_reg[28]_i_1_n_5\ : STD_LOGIC;
  signal \rCOUNTER_reg[28]_i_1_n_6\ : STD_LOGIC;
  signal \rCOUNTER_reg[28]_i_1_n_7\ : STD_LOGIC;
  signal \rCOUNTER_reg[32]_i_1_n_0\ : STD_LOGIC;
  signal \rCOUNTER_reg[32]_i_1_n_1\ : STD_LOGIC;
  signal \rCOUNTER_reg[32]_i_1_n_2\ : STD_LOGIC;
  signal \rCOUNTER_reg[32]_i_1_n_3\ : STD_LOGIC;
  signal \rCOUNTER_reg[32]_i_1_n_4\ : STD_LOGIC;
  signal \rCOUNTER_reg[32]_i_1_n_5\ : STD_LOGIC;
  signal \rCOUNTER_reg[32]_i_1_n_6\ : STD_LOGIC;
  signal \rCOUNTER_reg[32]_i_1_n_7\ : STD_LOGIC;
  signal \rCOUNTER_reg[36]_i_1_n_0\ : STD_LOGIC;
  signal \rCOUNTER_reg[36]_i_1_n_1\ : STD_LOGIC;
  signal \rCOUNTER_reg[36]_i_1_n_2\ : STD_LOGIC;
  signal \rCOUNTER_reg[36]_i_1_n_3\ : STD_LOGIC;
  signal \rCOUNTER_reg[36]_i_1_n_4\ : STD_LOGIC;
  signal \rCOUNTER_reg[36]_i_1_n_5\ : STD_LOGIC;
  signal \rCOUNTER_reg[36]_i_1_n_6\ : STD_LOGIC;
  signal \rCOUNTER_reg[36]_i_1_n_7\ : STD_LOGIC;
  signal \rCOUNTER_reg[40]_i_1_n_0\ : STD_LOGIC;
  signal \rCOUNTER_reg[40]_i_1_n_1\ : STD_LOGIC;
  signal \rCOUNTER_reg[40]_i_1_n_2\ : STD_LOGIC;
  signal \rCOUNTER_reg[40]_i_1_n_3\ : STD_LOGIC;
  signal \rCOUNTER_reg[40]_i_1_n_4\ : STD_LOGIC;
  signal \rCOUNTER_reg[40]_i_1_n_5\ : STD_LOGIC;
  signal \rCOUNTER_reg[40]_i_1_n_6\ : STD_LOGIC;
  signal \rCOUNTER_reg[40]_i_1_n_7\ : STD_LOGIC;
  signal \rCOUNTER_reg[44]_i_1_n_0\ : STD_LOGIC;
  signal \rCOUNTER_reg[44]_i_1_n_1\ : STD_LOGIC;
  signal \rCOUNTER_reg[44]_i_1_n_2\ : STD_LOGIC;
  signal \rCOUNTER_reg[44]_i_1_n_3\ : STD_LOGIC;
  signal \rCOUNTER_reg[44]_i_1_n_4\ : STD_LOGIC;
  signal \rCOUNTER_reg[44]_i_1_n_5\ : STD_LOGIC;
  signal \rCOUNTER_reg[44]_i_1_n_6\ : STD_LOGIC;
  signal \rCOUNTER_reg[44]_i_1_n_7\ : STD_LOGIC;
  signal \rCOUNTER_reg[48]_i_1_n_0\ : STD_LOGIC;
  signal \rCOUNTER_reg[48]_i_1_n_1\ : STD_LOGIC;
  signal \rCOUNTER_reg[48]_i_1_n_2\ : STD_LOGIC;
  signal \rCOUNTER_reg[48]_i_1_n_3\ : STD_LOGIC;
  signal \rCOUNTER_reg[48]_i_1_n_4\ : STD_LOGIC;
  signal \rCOUNTER_reg[48]_i_1_n_5\ : STD_LOGIC;
  signal \rCOUNTER_reg[48]_i_1_n_6\ : STD_LOGIC;
  signal \rCOUNTER_reg[48]_i_1_n_7\ : STD_LOGIC;
  signal \rCOUNTER_reg[4]_i_1_n_0\ : STD_LOGIC;
  signal \rCOUNTER_reg[4]_i_1_n_1\ : STD_LOGIC;
  signal \rCOUNTER_reg[4]_i_1_n_2\ : STD_LOGIC;
  signal \rCOUNTER_reg[4]_i_1_n_3\ : STD_LOGIC;
  signal \rCOUNTER_reg[4]_i_1_n_4\ : STD_LOGIC;
  signal \rCOUNTER_reg[4]_i_1_n_5\ : STD_LOGIC;
  signal \rCOUNTER_reg[4]_i_1_n_6\ : STD_LOGIC;
  signal \rCOUNTER_reg[4]_i_1_n_7\ : STD_LOGIC;
  signal \rCOUNTER_reg[52]_i_1_n_0\ : STD_LOGIC;
  signal \rCOUNTER_reg[52]_i_1_n_1\ : STD_LOGIC;
  signal \rCOUNTER_reg[52]_i_1_n_2\ : STD_LOGIC;
  signal \rCOUNTER_reg[52]_i_1_n_3\ : STD_LOGIC;
  signal \rCOUNTER_reg[52]_i_1_n_4\ : STD_LOGIC;
  signal \rCOUNTER_reg[52]_i_1_n_5\ : STD_LOGIC;
  signal \rCOUNTER_reg[52]_i_1_n_6\ : STD_LOGIC;
  signal \rCOUNTER_reg[52]_i_1_n_7\ : STD_LOGIC;
  signal \rCOUNTER_reg[56]_i_1_n_0\ : STD_LOGIC;
  signal \rCOUNTER_reg[56]_i_1_n_1\ : STD_LOGIC;
  signal \rCOUNTER_reg[56]_i_1_n_2\ : STD_LOGIC;
  signal \rCOUNTER_reg[56]_i_1_n_3\ : STD_LOGIC;
  signal \rCOUNTER_reg[56]_i_1_n_4\ : STD_LOGIC;
  signal \rCOUNTER_reg[56]_i_1_n_5\ : STD_LOGIC;
  signal \rCOUNTER_reg[56]_i_1_n_6\ : STD_LOGIC;
  signal \rCOUNTER_reg[56]_i_1_n_7\ : STD_LOGIC;
  signal \rCOUNTER_reg[60]_i_1_n_1\ : STD_LOGIC;
  signal \rCOUNTER_reg[60]_i_1_n_2\ : STD_LOGIC;
  signal \rCOUNTER_reg[60]_i_1_n_3\ : STD_LOGIC;
  signal \rCOUNTER_reg[60]_i_1_n_4\ : STD_LOGIC;
  signal \rCOUNTER_reg[60]_i_1_n_5\ : STD_LOGIC;
  signal \rCOUNTER_reg[60]_i_1_n_6\ : STD_LOGIC;
  signal \rCOUNTER_reg[60]_i_1_n_7\ : STD_LOGIC;
  signal \rCOUNTER_reg[8]_i_1_n_0\ : STD_LOGIC;
  signal \rCOUNTER_reg[8]_i_1_n_1\ : STD_LOGIC;
  signal \rCOUNTER_reg[8]_i_1_n_2\ : STD_LOGIC;
  signal \rCOUNTER_reg[8]_i_1_n_3\ : STD_LOGIC;
  signal \rCOUNTER_reg[8]_i_1_n_4\ : STD_LOGIC;
  signal \rCOUNTER_reg[8]_i_1_n_5\ : STD_LOGIC;
  signal \rCOUNTER_reg[8]_i_1_n_6\ : STD_LOGIC;
  signal \rCOUNTER_reg[8]_i_1_n_7\ : STD_LOGIC;
  signal wPhase : STD_LOGIC_VECTOR ( 25 downto 0 );
  attribute DONT_TOUCH : boolean;
  attribute DONT_TOUCH of wPhase : signal is std.standard.true;
  attribute RTL_KEEP : string;
  attribute RTL_KEEP of wPhase : signal is "true";
  signal \NLW_rCOUNTER_reg[60]_i_1_CO_UNCONNECTED\ : STD_LOGIC_VECTOR ( 3 to 3 );
  attribute ADDER_THRESHOLD : integer;
  attribute ADDER_THRESHOLD of \rCOUNTER_reg[0]_i_1\ : label is 11;
  attribute ADDER_THRESHOLD of \rCOUNTER_reg[12]_i_1\ : label is 11;
  attribute ADDER_THRESHOLD of \rCOUNTER_reg[16]_i_1\ : label is 11;
  attribute ADDER_THRESHOLD of \rCOUNTER_reg[20]_i_1\ : label is 11;
  attribute ADDER_THRESHOLD of \rCOUNTER_reg[24]_i_1\ : label is 11;
  attribute ADDER_THRESHOLD of \rCOUNTER_reg[28]_i_1\ : label is 11;
  attribute ADDER_THRESHOLD of \rCOUNTER_reg[32]_i_1\ : label is 11;
  attribute ADDER_THRESHOLD of \rCOUNTER_reg[36]_i_1\ : label is 11;
  attribute ADDER_THRESHOLD of \rCOUNTER_reg[40]_i_1\ : label is 11;
  attribute ADDER_THRESHOLD of \rCOUNTER_reg[44]_i_1\ : label is 11;
  attribute ADDER_THRESHOLD of \rCOUNTER_reg[48]_i_1\ : label is 11;
  attribute ADDER_THRESHOLD of \rCOUNTER_reg[4]_i_1\ : label is 11;
  attribute ADDER_THRESHOLD of \rCOUNTER_reg[52]_i_1\ : label is 11;
  attribute ADDER_THRESHOLD of \rCOUNTER_reg[56]_i_1\ : label is 11;
  attribute ADDER_THRESHOLD of \rCOUNTER_reg[60]_i_1\ : label is 11;
  attribute ADDER_THRESHOLD of \rCOUNTER_reg[8]_i_1\ : label is 11;
begin
  oRdyCOUNTER <= latchLock1;
  oRdyCOUNTER2 <= latchLock2;
  wPhase(0) <= globalClock;
latchLock1_reg0: unisim.vcomponents.LUT4
    generic map(
      INIT => X"CCCE"
    )
        port map (
      I0 => latchLock1,
      I1 => iLatch1,
      I2 => latchLock1_reg0_i_1_n_0,
      I3 => iResetLatch1,
      O => latchLock1
    );
latchLock1_reg0_i_1: unisim.vcomponents.LUT3
    generic map(
      INIT => X"A8"
    )
        port map (
      I0 => iLatch1,
      I1 => iResetLatch1,
      I2 => latchLock1_reg0_i_1_n_0,
      O => latchLock1_reg0_i_1_n_0
    );
latchLock2_reg0: unisim.vcomponents.LUT4
    generic map(
      INIT => X"CCCE"
    )
        port map (
      I0 => latchLock2,
      I1 => iLatch2,
      I2 => latchLock2_reg0_i_1_n_0,
      I3 => iResetLatch2,
      O => latchLock2
    );
latchLock2_reg0_i_1: unisim.vcomponents.LUT3
    generic map(
      INIT => X"A8"
    )
        port map (
      I0 => iLatch2,
      I1 => iResetLatch2,
      I2 => latchLock2_reg0_i_1_n_0,
      O => latchLock2_reg0_i_1_n_0
    );
\rCOUNTER[0]_i_2\: unisim.vcomponents.LUT1
    generic map(
      INIT => X"1"
    )
        port map (
      I0 => rCOUNTER_reg(0),
      O => \rCOUNTER[0]_i_2_n_0\
    );
\rCOUNTER_reg[0]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[0]_i_1_n_7\,
      Q => rCOUNTER_reg(0),
      R => '0'
    );
\rCOUNTER_reg[0]_i_1\: unisim.vcomponents.CARRY4
     port map (
      CI => '0',
      CO(3) => \rCOUNTER_reg[0]_i_1_n_0\,
      CO(2) => \rCOUNTER_reg[0]_i_1_n_1\,
      CO(1) => \rCOUNTER_reg[0]_i_1_n_2\,
      CO(0) => \rCOUNTER_reg[0]_i_1_n_3\,
      CYINIT => '0',
      DI(3 downto 0) => B"0001",
      O(3) => \rCOUNTER_reg[0]_i_1_n_4\,
      O(2) => \rCOUNTER_reg[0]_i_1_n_5\,
      O(1) => \rCOUNTER_reg[0]_i_1_n_6\,
      O(0) => \rCOUNTER_reg[0]_i_1_n_7\,
      S(3 downto 1) => rCOUNTER_reg(3 downto 1),
      S(0) => \rCOUNTER[0]_i_2_n_0\
    );
\rCOUNTER_reg[10]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[8]_i_1_n_5\,
      Q => rCOUNTER_reg(10),
      R => '0'
    );
\rCOUNTER_reg[11]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[8]_i_1_n_4\,
      Q => rCOUNTER_reg(11),
      R => '0'
    );
\rCOUNTER_reg[12]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[12]_i_1_n_7\,
      Q => rCOUNTER_reg(12),
      R => '0'
    );
\rCOUNTER_reg[12]_i_1\: unisim.vcomponents.CARRY4
     port map (
      CI => \rCOUNTER_reg[8]_i_1_n_0\,
      CO(3) => \rCOUNTER_reg[12]_i_1_n_0\,
      CO(2) => \rCOUNTER_reg[12]_i_1_n_1\,
      CO(1) => \rCOUNTER_reg[12]_i_1_n_2\,
      CO(0) => \rCOUNTER_reg[12]_i_1_n_3\,
      CYINIT => '0',
      DI(3 downto 0) => B"0000",
      O(3) => \rCOUNTER_reg[12]_i_1_n_4\,
      O(2) => \rCOUNTER_reg[12]_i_1_n_5\,
      O(1) => \rCOUNTER_reg[12]_i_1_n_6\,
      O(0) => \rCOUNTER_reg[12]_i_1_n_7\,
      S(3 downto 0) => rCOUNTER_reg(15 downto 12)
    );
\rCOUNTER_reg[13]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[12]_i_1_n_6\,
      Q => rCOUNTER_reg(13),
      R => '0'
    );
\rCOUNTER_reg[14]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[12]_i_1_n_5\,
      Q => rCOUNTER_reg(14),
      R => '0'
    );
\rCOUNTER_reg[15]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[12]_i_1_n_4\,
      Q => rCOUNTER_reg(15),
      R => '0'
    );
\rCOUNTER_reg[16]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[16]_i_1_n_7\,
      Q => rCOUNTER_reg(16),
      R => '0'
    );
\rCOUNTER_reg[16]_i_1\: unisim.vcomponents.CARRY4
     port map (
      CI => \rCOUNTER_reg[12]_i_1_n_0\,
      CO(3) => \rCOUNTER_reg[16]_i_1_n_0\,
      CO(2) => \rCOUNTER_reg[16]_i_1_n_1\,
      CO(1) => \rCOUNTER_reg[16]_i_1_n_2\,
      CO(0) => \rCOUNTER_reg[16]_i_1_n_3\,
      CYINIT => '0',
      DI(3 downto 0) => B"0000",
      O(3) => \rCOUNTER_reg[16]_i_1_n_4\,
      O(2) => \rCOUNTER_reg[16]_i_1_n_5\,
      O(1) => \rCOUNTER_reg[16]_i_1_n_6\,
      O(0) => \rCOUNTER_reg[16]_i_1_n_7\,
      S(3 downto 0) => rCOUNTER_reg(19 downto 16)
    );
\rCOUNTER_reg[17]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[16]_i_1_n_6\,
      Q => rCOUNTER_reg(17),
      R => '0'
    );
\rCOUNTER_reg[18]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[16]_i_1_n_5\,
      Q => rCOUNTER_reg(18),
      R => '0'
    );
\rCOUNTER_reg[19]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[16]_i_1_n_4\,
      Q => rCOUNTER_reg(19),
      R => '0'
    );
\rCOUNTER_reg[1]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[0]_i_1_n_6\,
      Q => rCOUNTER_reg(1),
      R => '0'
    );
\rCOUNTER_reg[20]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[20]_i_1_n_7\,
      Q => rCOUNTER_reg(20),
      R => '0'
    );
\rCOUNTER_reg[20]_i_1\: unisim.vcomponents.CARRY4
     port map (
      CI => \rCOUNTER_reg[16]_i_1_n_0\,
      CO(3) => \rCOUNTER_reg[20]_i_1_n_0\,
      CO(2) => \rCOUNTER_reg[20]_i_1_n_1\,
      CO(1) => \rCOUNTER_reg[20]_i_1_n_2\,
      CO(0) => \rCOUNTER_reg[20]_i_1_n_3\,
      CYINIT => '0',
      DI(3 downto 0) => B"0000",
      O(3) => \rCOUNTER_reg[20]_i_1_n_4\,
      O(2) => \rCOUNTER_reg[20]_i_1_n_5\,
      O(1) => \rCOUNTER_reg[20]_i_1_n_6\,
      O(0) => \rCOUNTER_reg[20]_i_1_n_7\,
      S(3 downto 0) => rCOUNTER_reg(23 downto 20)
    );
\rCOUNTER_reg[21]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[20]_i_1_n_6\,
      Q => rCOUNTER_reg(21),
      R => '0'
    );
\rCOUNTER_reg[22]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[20]_i_1_n_5\,
      Q => rCOUNTER_reg(22),
      R => '0'
    );
\rCOUNTER_reg[23]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[20]_i_1_n_4\,
      Q => rCOUNTER_reg(23),
      R => '0'
    );
\rCOUNTER_reg[24]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[24]_i_1_n_7\,
      Q => rCOUNTER_reg(24),
      R => '0'
    );
\rCOUNTER_reg[24]_i_1\: unisim.vcomponents.CARRY4
     port map (
      CI => \rCOUNTER_reg[20]_i_1_n_0\,
      CO(3) => \rCOUNTER_reg[24]_i_1_n_0\,
      CO(2) => \rCOUNTER_reg[24]_i_1_n_1\,
      CO(1) => \rCOUNTER_reg[24]_i_1_n_2\,
      CO(0) => \rCOUNTER_reg[24]_i_1_n_3\,
      CYINIT => '0',
      DI(3 downto 0) => B"0000",
      O(3) => \rCOUNTER_reg[24]_i_1_n_4\,
      O(2) => \rCOUNTER_reg[24]_i_1_n_5\,
      O(1) => \rCOUNTER_reg[24]_i_1_n_6\,
      O(0) => \rCOUNTER_reg[24]_i_1_n_7\,
      S(3 downto 0) => rCOUNTER_reg(27 downto 24)
    );
\rCOUNTER_reg[25]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[24]_i_1_n_6\,
      Q => rCOUNTER_reg(25),
      R => '0'
    );
\rCOUNTER_reg[26]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[24]_i_1_n_5\,
      Q => rCOUNTER_reg(26),
      R => '0'
    );
\rCOUNTER_reg[27]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[24]_i_1_n_4\,
      Q => rCOUNTER_reg(27),
      R => '0'
    );
\rCOUNTER_reg[28]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[28]_i_1_n_7\,
      Q => rCOUNTER_reg(28),
      R => '0'
    );
\rCOUNTER_reg[28]_i_1\: unisim.vcomponents.CARRY4
     port map (
      CI => \rCOUNTER_reg[24]_i_1_n_0\,
      CO(3) => \rCOUNTER_reg[28]_i_1_n_0\,
      CO(2) => \rCOUNTER_reg[28]_i_1_n_1\,
      CO(1) => \rCOUNTER_reg[28]_i_1_n_2\,
      CO(0) => \rCOUNTER_reg[28]_i_1_n_3\,
      CYINIT => '0',
      DI(3 downto 0) => B"0000",
      O(3) => \rCOUNTER_reg[28]_i_1_n_4\,
      O(2) => \rCOUNTER_reg[28]_i_1_n_5\,
      O(1) => \rCOUNTER_reg[28]_i_1_n_6\,
      O(0) => \rCOUNTER_reg[28]_i_1_n_7\,
      S(3 downto 0) => rCOUNTER_reg(31 downto 28)
    );
\rCOUNTER_reg[29]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[28]_i_1_n_6\,
      Q => rCOUNTER_reg(29),
      R => '0'
    );
\rCOUNTER_reg[2]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[0]_i_1_n_5\,
      Q => rCOUNTER_reg(2),
      R => '0'
    );
\rCOUNTER_reg[30]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[28]_i_1_n_5\,
      Q => rCOUNTER_reg(30),
      R => '0'
    );
\rCOUNTER_reg[31]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[28]_i_1_n_4\,
      Q => rCOUNTER_reg(31),
      R => '0'
    );
\rCOUNTER_reg[32]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[32]_i_1_n_7\,
      Q => rCOUNTER_reg(32),
      R => '0'
    );
\rCOUNTER_reg[32]_i_1\: unisim.vcomponents.CARRY4
     port map (
      CI => \rCOUNTER_reg[28]_i_1_n_0\,
      CO(3) => \rCOUNTER_reg[32]_i_1_n_0\,
      CO(2) => \rCOUNTER_reg[32]_i_1_n_1\,
      CO(1) => \rCOUNTER_reg[32]_i_1_n_2\,
      CO(0) => \rCOUNTER_reg[32]_i_1_n_3\,
      CYINIT => '0',
      DI(3 downto 0) => B"0000",
      O(3) => \rCOUNTER_reg[32]_i_1_n_4\,
      O(2) => \rCOUNTER_reg[32]_i_1_n_5\,
      O(1) => \rCOUNTER_reg[32]_i_1_n_6\,
      O(0) => \rCOUNTER_reg[32]_i_1_n_7\,
      S(3 downto 0) => rCOUNTER_reg(35 downto 32)
    );
\rCOUNTER_reg[33]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[32]_i_1_n_6\,
      Q => rCOUNTER_reg(33),
      R => '0'
    );
\rCOUNTER_reg[34]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[32]_i_1_n_5\,
      Q => rCOUNTER_reg(34),
      R => '0'
    );
\rCOUNTER_reg[35]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[32]_i_1_n_4\,
      Q => rCOUNTER_reg(35),
      R => '0'
    );
\rCOUNTER_reg[36]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[36]_i_1_n_7\,
      Q => rCOUNTER_reg(36),
      R => '0'
    );
\rCOUNTER_reg[36]_i_1\: unisim.vcomponents.CARRY4
     port map (
      CI => \rCOUNTER_reg[32]_i_1_n_0\,
      CO(3) => \rCOUNTER_reg[36]_i_1_n_0\,
      CO(2) => \rCOUNTER_reg[36]_i_1_n_1\,
      CO(1) => \rCOUNTER_reg[36]_i_1_n_2\,
      CO(0) => \rCOUNTER_reg[36]_i_1_n_3\,
      CYINIT => '0',
      DI(3 downto 0) => B"0000",
      O(3) => \rCOUNTER_reg[36]_i_1_n_4\,
      O(2) => \rCOUNTER_reg[36]_i_1_n_5\,
      O(1) => \rCOUNTER_reg[36]_i_1_n_6\,
      O(0) => \rCOUNTER_reg[36]_i_1_n_7\,
      S(3 downto 0) => rCOUNTER_reg(39 downto 36)
    );
\rCOUNTER_reg[37]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[36]_i_1_n_6\,
      Q => rCOUNTER_reg(37),
      R => '0'
    );
\rCOUNTER_reg[38]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[36]_i_1_n_5\,
      Q => rCOUNTER_reg(38),
      R => '0'
    );
\rCOUNTER_reg[39]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[36]_i_1_n_4\,
      Q => rCOUNTER_reg(39),
      R => '0'
    );
\rCOUNTER_reg[3]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[0]_i_1_n_4\,
      Q => rCOUNTER_reg(3),
      R => '0'
    );
\rCOUNTER_reg[40]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[40]_i_1_n_7\,
      Q => rCOUNTER_reg(40),
      R => '0'
    );
\rCOUNTER_reg[40]_i_1\: unisim.vcomponents.CARRY4
     port map (
      CI => \rCOUNTER_reg[36]_i_1_n_0\,
      CO(3) => \rCOUNTER_reg[40]_i_1_n_0\,
      CO(2) => \rCOUNTER_reg[40]_i_1_n_1\,
      CO(1) => \rCOUNTER_reg[40]_i_1_n_2\,
      CO(0) => \rCOUNTER_reg[40]_i_1_n_3\,
      CYINIT => '0',
      DI(3 downto 0) => B"0000",
      O(3) => \rCOUNTER_reg[40]_i_1_n_4\,
      O(2) => \rCOUNTER_reg[40]_i_1_n_5\,
      O(1) => \rCOUNTER_reg[40]_i_1_n_6\,
      O(0) => \rCOUNTER_reg[40]_i_1_n_7\,
      S(3 downto 0) => rCOUNTER_reg(43 downto 40)
    );
\rCOUNTER_reg[41]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[40]_i_1_n_6\,
      Q => rCOUNTER_reg(41),
      R => '0'
    );
\rCOUNTER_reg[42]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[40]_i_1_n_5\,
      Q => rCOUNTER_reg(42),
      R => '0'
    );
\rCOUNTER_reg[43]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[40]_i_1_n_4\,
      Q => rCOUNTER_reg(43),
      R => '0'
    );
\rCOUNTER_reg[44]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[44]_i_1_n_7\,
      Q => rCOUNTER_reg(44),
      R => '0'
    );
\rCOUNTER_reg[44]_i_1\: unisim.vcomponents.CARRY4
     port map (
      CI => \rCOUNTER_reg[40]_i_1_n_0\,
      CO(3) => \rCOUNTER_reg[44]_i_1_n_0\,
      CO(2) => \rCOUNTER_reg[44]_i_1_n_1\,
      CO(1) => \rCOUNTER_reg[44]_i_1_n_2\,
      CO(0) => \rCOUNTER_reg[44]_i_1_n_3\,
      CYINIT => '0',
      DI(3 downto 0) => B"0000",
      O(3) => \rCOUNTER_reg[44]_i_1_n_4\,
      O(2) => \rCOUNTER_reg[44]_i_1_n_5\,
      O(1) => \rCOUNTER_reg[44]_i_1_n_6\,
      O(0) => \rCOUNTER_reg[44]_i_1_n_7\,
      S(3 downto 0) => rCOUNTER_reg(47 downto 44)
    );
\rCOUNTER_reg[45]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[44]_i_1_n_6\,
      Q => rCOUNTER_reg(45),
      R => '0'
    );
\rCOUNTER_reg[46]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[44]_i_1_n_5\,
      Q => rCOUNTER_reg(46),
      R => '0'
    );
\rCOUNTER_reg[47]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[44]_i_1_n_4\,
      Q => rCOUNTER_reg(47),
      R => '0'
    );
\rCOUNTER_reg[48]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[48]_i_1_n_7\,
      Q => rCOUNTER_reg(48),
      R => '0'
    );
\rCOUNTER_reg[48]_i_1\: unisim.vcomponents.CARRY4
     port map (
      CI => \rCOUNTER_reg[44]_i_1_n_0\,
      CO(3) => \rCOUNTER_reg[48]_i_1_n_0\,
      CO(2) => \rCOUNTER_reg[48]_i_1_n_1\,
      CO(1) => \rCOUNTER_reg[48]_i_1_n_2\,
      CO(0) => \rCOUNTER_reg[48]_i_1_n_3\,
      CYINIT => '0',
      DI(3 downto 0) => B"0000",
      O(3) => \rCOUNTER_reg[48]_i_1_n_4\,
      O(2) => \rCOUNTER_reg[48]_i_1_n_5\,
      O(1) => \rCOUNTER_reg[48]_i_1_n_6\,
      O(0) => \rCOUNTER_reg[48]_i_1_n_7\,
      S(3 downto 0) => rCOUNTER_reg(51 downto 48)
    );
\rCOUNTER_reg[49]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[48]_i_1_n_6\,
      Q => rCOUNTER_reg(49),
      R => '0'
    );
\rCOUNTER_reg[4]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[4]_i_1_n_7\,
      Q => rCOUNTER_reg(4),
      R => '0'
    );
\rCOUNTER_reg[4]_i_1\: unisim.vcomponents.CARRY4
     port map (
      CI => \rCOUNTER_reg[0]_i_1_n_0\,
      CO(3) => \rCOUNTER_reg[4]_i_1_n_0\,
      CO(2) => \rCOUNTER_reg[4]_i_1_n_1\,
      CO(1) => \rCOUNTER_reg[4]_i_1_n_2\,
      CO(0) => \rCOUNTER_reg[4]_i_1_n_3\,
      CYINIT => '0',
      DI(3 downto 0) => B"0000",
      O(3) => \rCOUNTER_reg[4]_i_1_n_4\,
      O(2) => \rCOUNTER_reg[4]_i_1_n_5\,
      O(1) => \rCOUNTER_reg[4]_i_1_n_6\,
      O(0) => \rCOUNTER_reg[4]_i_1_n_7\,
      S(3 downto 0) => rCOUNTER_reg(7 downto 4)
    );
\rCOUNTER_reg[50]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[48]_i_1_n_5\,
      Q => rCOUNTER_reg(50),
      R => '0'
    );
\rCOUNTER_reg[51]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[48]_i_1_n_4\,
      Q => rCOUNTER_reg(51),
      R => '0'
    );
\rCOUNTER_reg[52]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[52]_i_1_n_7\,
      Q => rCOUNTER_reg(52),
      R => '0'
    );
\rCOUNTER_reg[52]_i_1\: unisim.vcomponents.CARRY4
     port map (
      CI => \rCOUNTER_reg[48]_i_1_n_0\,
      CO(3) => \rCOUNTER_reg[52]_i_1_n_0\,
      CO(2) => \rCOUNTER_reg[52]_i_1_n_1\,
      CO(1) => \rCOUNTER_reg[52]_i_1_n_2\,
      CO(0) => \rCOUNTER_reg[52]_i_1_n_3\,
      CYINIT => '0',
      DI(3 downto 0) => B"0000",
      O(3) => \rCOUNTER_reg[52]_i_1_n_4\,
      O(2) => \rCOUNTER_reg[52]_i_1_n_5\,
      O(1) => \rCOUNTER_reg[52]_i_1_n_6\,
      O(0) => \rCOUNTER_reg[52]_i_1_n_7\,
      S(3 downto 0) => rCOUNTER_reg(55 downto 52)
    );
\rCOUNTER_reg[53]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[52]_i_1_n_6\,
      Q => rCOUNTER_reg(53),
      R => '0'
    );
\rCOUNTER_reg[54]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[52]_i_1_n_5\,
      Q => rCOUNTER_reg(54),
      R => '0'
    );
\rCOUNTER_reg[55]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[52]_i_1_n_4\,
      Q => rCOUNTER_reg(55),
      R => '0'
    );
\rCOUNTER_reg[56]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[56]_i_1_n_7\,
      Q => rCOUNTER_reg(56),
      R => '0'
    );
\rCOUNTER_reg[56]_i_1\: unisim.vcomponents.CARRY4
     port map (
      CI => \rCOUNTER_reg[52]_i_1_n_0\,
      CO(3) => \rCOUNTER_reg[56]_i_1_n_0\,
      CO(2) => \rCOUNTER_reg[56]_i_1_n_1\,
      CO(1) => \rCOUNTER_reg[56]_i_1_n_2\,
      CO(0) => \rCOUNTER_reg[56]_i_1_n_3\,
      CYINIT => '0',
      DI(3 downto 0) => B"0000",
      O(3) => \rCOUNTER_reg[56]_i_1_n_4\,
      O(2) => \rCOUNTER_reg[56]_i_1_n_5\,
      O(1) => \rCOUNTER_reg[56]_i_1_n_6\,
      O(0) => \rCOUNTER_reg[56]_i_1_n_7\,
      S(3 downto 0) => rCOUNTER_reg(59 downto 56)
    );
\rCOUNTER_reg[57]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[56]_i_1_n_6\,
      Q => rCOUNTER_reg(57),
      R => '0'
    );
\rCOUNTER_reg[58]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[56]_i_1_n_5\,
      Q => rCOUNTER_reg(58),
      R => '0'
    );
\rCOUNTER_reg[59]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[56]_i_1_n_4\,
      Q => rCOUNTER_reg(59),
      R => '0'
    );
\rCOUNTER_reg[5]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[4]_i_1_n_6\,
      Q => rCOUNTER_reg(5),
      R => '0'
    );
\rCOUNTER_reg[60]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[60]_i_1_n_7\,
      Q => rCOUNTER_reg(60),
      R => '0'
    );
\rCOUNTER_reg[60]_i_1\: unisim.vcomponents.CARRY4
     port map (
      CI => \rCOUNTER_reg[56]_i_1_n_0\,
      CO(3) => \NLW_rCOUNTER_reg[60]_i_1_CO_UNCONNECTED\(3),
      CO(2) => \rCOUNTER_reg[60]_i_1_n_1\,
      CO(1) => \rCOUNTER_reg[60]_i_1_n_2\,
      CO(0) => \rCOUNTER_reg[60]_i_1_n_3\,
      CYINIT => '0',
      DI(3 downto 0) => B"0000",
      O(3) => \rCOUNTER_reg[60]_i_1_n_4\,
      O(2) => \rCOUNTER_reg[60]_i_1_n_5\,
      O(1) => \rCOUNTER_reg[60]_i_1_n_6\,
      O(0) => \rCOUNTER_reg[60]_i_1_n_7\,
      S(3 downto 0) => rCOUNTER_reg(63 downto 60)
    );
\rCOUNTER_reg[61]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[60]_i_1_n_6\,
      Q => rCOUNTER_reg(61),
      R => '0'
    );
\rCOUNTER_reg[62]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[60]_i_1_n_5\,
      Q => rCOUNTER_reg(62),
      R => '0'
    );
\rCOUNTER_reg[63]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[60]_i_1_n_4\,
      Q => rCOUNTER_reg(63),
      R => '0'
    );
\rCOUNTER_reg[6]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[4]_i_1_n_5\,
      Q => rCOUNTER_reg(6),
      R => '0'
    );
\rCOUNTER_reg[7]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[4]_i_1_n_4\,
      Q => rCOUNTER_reg(7),
      R => '0'
    );
\rCOUNTER_reg[8]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[8]_i_1_n_7\,
      Q => rCOUNTER_reg(8),
      R => '0'
    );
\rCOUNTER_reg[8]_i_1\: unisim.vcomponents.CARRY4
     port map (
      CI => \rCOUNTER_reg[4]_i_1_n_0\,
      CO(3) => \rCOUNTER_reg[8]_i_1_n_0\,
      CO(2) => \rCOUNTER_reg[8]_i_1_n_1\,
      CO(1) => \rCOUNTER_reg[8]_i_1_n_2\,
      CO(0) => \rCOUNTER_reg[8]_i_1_n_3\,
      CYINIT => '0',
      DI(3 downto 0) => B"0000",
      O(3) => \rCOUNTER_reg[8]_i_1_n_4\,
      O(2) => \rCOUNTER_reg[8]_i_1_n_5\,
      O(1) => \rCOUNTER_reg[8]_i_1_n_6\,
      O(0) => \rCOUNTER_reg[8]_i_1_n_7\,
      S(3 downto 0) => rCOUNTER_reg(11 downto 8)
    );
\rCOUNTER_reg[9]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => wPhase(0),
      CE => '1',
      D => \rCOUNTER_reg[8]_i_1_n_6\,
      Q => rCOUNTER_reg(9),
      R => '0'
    );
\rLatch1_reg[0]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(0),
      Q => Q(0),
      R => '0'
    );
\rLatch1_reg[10]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(10),
      Q => Q(10),
      R => '0'
    );
\rLatch1_reg[11]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(11),
      Q => Q(11),
      R => '0'
    );
\rLatch1_reg[12]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(12),
      Q => Q(12),
      R => '0'
    );
\rLatch1_reg[13]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(13),
      Q => Q(13),
      R => '0'
    );
\rLatch1_reg[14]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(14),
      Q => Q(14),
      R => '0'
    );
\rLatch1_reg[15]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(15),
      Q => Q(15),
      R => '0'
    );
\rLatch1_reg[16]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(16),
      Q => Q(16),
      R => '0'
    );
\rLatch1_reg[17]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(17),
      Q => Q(17),
      R => '0'
    );
\rLatch1_reg[18]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(18),
      Q => Q(18),
      R => '0'
    );
\rLatch1_reg[19]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(19),
      Q => Q(19),
      R => '0'
    );
\rLatch1_reg[1]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(1),
      Q => Q(1),
      R => '0'
    );
\rLatch1_reg[20]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(20),
      Q => Q(20),
      R => '0'
    );
\rLatch1_reg[21]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(21),
      Q => Q(21),
      R => '0'
    );
\rLatch1_reg[22]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(22),
      Q => Q(22),
      R => '0'
    );
\rLatch1_reg[23]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(23),
      Q => Q(23),
      R => '0'
    );
\rLatch1_reg[24]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(24),
      Q => Q(24),
      R => '0'
    );
\rLatch1_reg[25]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(25),
      Q => Q(25),
      R => '0'
    );
\rLatch1_reg[26]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(26),
      Q => Q(26),
      R => '0'
    );
\rLatch1_reg[27]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(27),
      Q => Q(27),
      R => '0'
    );
\rLatch1_reg[28]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(28),
      Q => Q(28),
      R => '0'
    );
\rLatch1_reg[29]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(29),
      Q => Q(29),
      R => '0'
    );
\rLatch1_reg[2]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(2),
      Q => Q(2),
      R => '0'
    );
\rLatch1_reg[30]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(30),
      Q => Q(30),
      R => '0'
    );
\rLatch1_reg[31]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(31),
      Q => Q(31),
      R => '0'
    );
\rLatch1_reg[32]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(32),
      Q => Q(32),
      R => '0'
    );
\rLatch1_reg[33]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(33),
      Q => Q(33),
      R => '0'
    );
\rLatch1_reg[34]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(34),
      Q => Q(34),
      R => '0'
    );
\rLatch1_reg[35]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(35),
      Q => Q(35),
      R => '0'
    );
\rLatch1_reg[36]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(36),
      Q => Q(36),
      R => '0'
    );
\rLatch1_reg[37]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(37),
      Q => Q(37),
      R => '0'
    );
\rLatch1_reg[38]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(38),
      Q => Q(38),
      R => '0'
    );
\rLatch1_reg[39]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(39),
      Q => Q(39),
      R => '0'
    );
\rLatch1_reg[3]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(3),
      Q => Q(3),
      R => '0'
    );
\rLatch1_reg[40]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(40),
      Q => Q(40),
      R => '0'
    );
\rLatch1_reg[41]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(41),
      Q => Q(41),
      R => '0'
    );
\rLatch1_reg[42]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(42),
      Q => Q(42),
      R => '0'
    );
\rLatch1_reg[43]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(43),
      Q => Q(43),
      R => '0'
    );
\rLatch1_reg[44]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(44),
      Q => Q(44),
      R => '0'
    );
\rLatch1_reg[45]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(45),
      Q => Q(45),
      R => '0'
    );
\rLatch1_reg[46]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(46),
      Q => Q(46),
      R => '0'
    );
\rLatch1_reg[47]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(47),
      Q => Q(47),
      R => '0'
    );
\rLatch1_reg[48]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(48),
      Q => Q(48),
      R => '0'
    );
\rLatch1_reg[49]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(49),
      Q => Q(49),
      R => '0'
    );
\rLatch1_reg[4]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(4),
      Q => Q(4),
      R => '0'
    );
\rLatch1_reg[50]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(50),
      Q => Q(50),
      R => '0'
    );
\rLatch1_reg[51]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(51),
      Q => Q(51),
      R => '0'
    );
\rLatch1_reg[52]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(52),
      Q => Q(52),
      R => '0'
    );
\rLatch1_reg[53]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(53),
      Q => Q(53),
      R => '0'
    );
\rLatch1_reg[54]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(54),
      Q => Q(54),
      R => '0'
    );
\rLatch1_reg[55]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(55),
      Q => Q(55),
      R => '0'
    );
\rLatch1_reg[56]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(56),
      Q => Q(56),
      R => '0'
    );
\rLatch1_reg[57]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(57),
      Q => Q(57),
      R => '0'
    );
\rLatch1_reg[58]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(58),
      Q => Q(58),
      R => '0'
    );
\rLatch1_reg[59]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(59),
      Q => Q(59),
      R => '0'
    );
\rLatch1_reg[5]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(5),
      Q => Q(5),
      R => '0'
    );
\rLatch1_reg[60]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(60),
      Q => Q(60),
      R => '0'
    );
\rLatch1_reg[61]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(61),
      Q => Q(61),
      R => '0'
    );
\rLatch1_reg[62]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(62),
      Q => Q(62),
      R => '0'
    );
\rLatch1_reg[63]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(63),
      Q => Q(63),
      R => '0'
    );
\rLatch1_reg[6]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(6),
      Q => Q(6),
      R => '0'
    );
\rLatch1_reg[7]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(7),
      Q => Q(7),
      R => '0'
    );
\rLatch1_reg[8]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(8),
      Q => Q(8),
      R => '0'
    );
\rLatch1_reg[9]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => rCOUNTER_reg(9),
      Q => Q(9),
      R => '0'
    );
\rLatch2_reg[0]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(0),
      Q => \rLatch2_reg[63]_0\(0),
      R => '0'
    );
\rLatch2_reg[10]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(10),
      Q => \rLatch2_reg[63]_0\(10),
      R => '0'
    );
\rLatch2_reg[11]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(11),
      Q => \rLatch2_reg[63]_0\(11),
      R => '0'
    );
\rLatch2_reg[12]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(12),
      Q => \rLatch2_reg[63]_0\(12),
      R => '0'
    );
\rLatch2_reg[13]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(13),
      Q => \rLatch2_reg[63]_0\(13),
      R => '0'
    );
\rLatch2_reg[14]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(14),
      Q => \rLatch2_reg[63]_0\(14),
      R => '0'
    );
\rLatch2_reg[15]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(15),
      Q => \rLatch2_reg[63]_0\(15),
      R => '0'
    );
\rLatch2_reg[16]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(16),
      Q => \rLatch2_reg[63]_0\(16),
      R => '0'
    );
\rLatch2_reg[17]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(17),
      Q => \rLatch2_reg[63]_0\(17),
      R => '0'
    );
\rLatch2_reg[18]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(18),
      Q => \rLatch2_reg[63]_0\(18),
      R => '0'
    );
\rLatch2_reg[19]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(19),
      Q => \rLatch2_reg[63]_0\(19),
      R => '0'
    );
\rLatch2_reg[1]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(1),
      Q => \rLatch2_reg[63]_0\(1),
      R => '0'
    );
\rLatch2_reg[20]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(20),
      Q => \rLatch2_reg[63]_0\(20),
      R => '0'
    );
\rLatch2_reg[21]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(21),
      Q => \rLatch2_reg[63]_0\(21),
      R => '0'
    );
\rLatch2_reg[22]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(22),
      Q => \rLatch2_reg[63]_0\(22),
      R => '0'
    );
\rLatch2_reg[23]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(23),
      Q => \rLatch2_reg[63]_0\(23),
      R => '0'
    );
\rLatch2_reg[24]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(24),
      Q => \rLatch2_reg[63]_0\(24),
      R => '0'
    );
\rLatch2_reg[25]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(25),
      Q => \rLatch2_reg[63]_0\(25),
      R => '0'
    );
\rLatch2_reg[26]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(26),
      Q => \rLatch2_reg[63]_0\(26),
      R => '0'
    );
\rLatch2_reg[27]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(27),
      Q => \rLatch2_reg[63]_0\(27),
      R => '0'
    );
\rLatch2_reg[28]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(28),
      Q => \rLatch2_reg[63]_0\(28),
      R => '0'
    );
\rLatch2_reg[29]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(29),
      Q => \rLatch2_reg[63]_0\(29),
      R => '0'
    );
\rLatch2_reg[2]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(2),
      Q => \rLatch2_reg[63]_0\(2),
      R => '0'
    );
\rLatch2_reg[30]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(30),
      Q => \rLatch2_reg[63]_0\(30),
      R => '0'
    );
\rLatch2_reg[31]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(31),
      Q => \rLatch2_reg[63]_0\(31),
      R => '0'
    );
\rLatch2_reg[32]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(32),
      Q => \rLatch2_reg[63]_0\(32),
      R => '0'
    );
\rLatch2_reg[33]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(33),
      Q => \rLatch2_reg[63]_0\(33),
      R => '0'
    );
\rLatch2_reg[34]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(34),
      Q => \rLatch2_reg[63]_0\(34),
      R => '0'
    );
\rLatch2_reg[35]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(35),
      Q => \rLatch2_reg[63]_0\(35),
      R => '0'
    );
\rLatch2_reg[36]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(36),
      Q => \rLatch2_reg[63]_0\(36),
      R => '0'
    );
\rLatch2_reg[37]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(37),
      Q => \rLatch2_reg[63]_0\(37),
      R => '0'
    );
\rLatch2_reg[38]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(38),
      Q => \rLatch2_reg[63]_0\(38),
      R => '0'
    );
\rLatch2_reg[39]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(39),
      Q => \rLatch2_reg[63]_0\(39),
      R => '0'
    );
\rLatch2_reg[3]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(3),
      Q => \rLatch2_reg[63]_0\(3),
      R => '0'
    );
\rLatch2_reg[40]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(40),
      Q => \rLatch2_reg[63]_0\(40),
      R => '0'
    );
\rLatch2_reg[41]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(41),
      Q => \rLatch2_reg[63]_0\(41),
      R => '0'
    );
\rLatch2_reg[42]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(42),
      Q => \rLatch2_reg[63]_0\(42),
      R => '0'
    );
\rLatch2_reg[43]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(43),
      Q => \rLatch2_reg[63]_0\(43),
      R => '0'
    );
\rLatch2_reg[44]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(44),
      Q => \rLatch2_reg[63]_0\(44),
      R => '0'
    );
\rLatch2_reg[45]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(45),
      Q => \rLatch2_reg[63]_0\(45),
      R => '0'
    );
\rLatch2_reg[46]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(46),
      Q => \rLatch2_reg[63]_0\(46),
      R => '0'
    );
\rLatch2_reg[47]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(47),
      Q => \rLatch2_reg[63]_0\(47),
      R => '0'
    );
\rLatch2_reg[48]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(48),
      Q => \rLatch2_reg[63]_0\(48),
      R => '0'
    );
\rLatch2_reg[49]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(49),
      Q => \rLatch2_reg[63]_0\(49),
      R => '0'
    );
\rLatch2_reg[4]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(4),
      Q => \rLatch2_reg[63]_0\(4),
      R => '0'
    );
\rLatch2_reg[50]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(50),
      Q => \rLatch2_reg[63]_0\(50),
      R => '0'
    );
\rLatch2_reg[51]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(51),
      Q => \rLatch2_reg[63]_0\(51),
      R => '0'
    );
\rLatch2_reg[52]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(52),
      Q => \rLatch2_reg[63]_0\(52),
      R => '0'
    );
\rLatch2_reg[53]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(53),
      Q => \rLatch2_reg[63]_0\(53),
      R => '0'
    );
\rLatch2_reg[54]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(54),
      Q => \rLatch2_reg[63]_0\(54),
      R => '0'
    );
\rLatch2_reg[55]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(55),
      Q => \rLatch2_reg[63]_0\(55),
      R => '0'
    );
\rLatch2_reg[56]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(56),
      Q => \rLatch2_reg[63]_0\(56),
      R => '0'
    );
\rLatch2_reg[57]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(57),
      Q => \rLatch2_reg[63]_0\(57),
      R => '0'
    );
\rLatch2_reg[58]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(58),
      Q => \rLatch2_reg[63]_0\(58),
      R => '0'
    );
\rLatch2_reg[59]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(59),
      Q => \rLatch2_reg[63]_0\(59),
      R => '0'
    );
\rLatch2_reg[5]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(5),
      Q => \rLatch2_reg[63]_0\(5),
      R => '0'
    );
\rLatch2_reg[60]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(60),
      Q => \rLatch2_reg[63]_0\(60),
      R => '0'
    );
\rLatch2_reg[61]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(61),
      Q => \rLatch2_reg[63]_0\(61),
      R => '0'
    );
\rLatch2_reg[62]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(62),
      Q => \rLatch2_reg[63]_0\(62),
      R => '0'
    );
\rLatch2_reg[63]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(63),
      Q => \rLatch2_reg[63]_0\(63),
      R => '0'
    );
\rLatch2_reg[6]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(6),
      Q => \rLatch2_reg[63]_0\(6),
      R => '0'
    );
\rLatch2_reg[7]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(7),
      Q => \rLatch2_reg[63]_0\(7),
      R => '0'
    );
\rLatch2_reg[8]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(8),
      Q => \rLatch2_reg[63]_0\(8),
      R => '0'
    );
\rLatch2_reg[9]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => rCOUNTER_reg(9),
      Q => \rLatch2_reg[63]_0\(9),
      R => '0'
    );
\rPhaseLatch1_reg[0]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => wPhase(0),
      Q => o1COUNTERPhase(0),
      R => '0'
    );
\rPhaseLatch1_reg[10]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => wPhase(10),
      Q => o1COUNTERPhase(10),
      R => '0'
    );
\rPhaseLatch1_reg[11]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => wPhase(11),
      Q => o1COUNTERPhase(11),
      R => '0'
    );
\rPhaseLatch1_reg[12]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => wPhase(12),
      Q => o1COUNTERPhase(12),
      R => '0'
    );
\rPhaseLatch1_reg[13]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => wPhase(13),
      Q => o1COUNTERPhase(13),
      R => '0'
    );
\rPhaseLatch1_reg[14]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => wPhase(14),
      Q => o1COUNTERPhase(14),
      R => '0'
    );
\rPhaseLatch1_reg[15]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => wPhase(15),
      Q => o1COUNTERPhase(15),
      R => '0'
    );
\rPhaseLatch1_reg[16]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => wPhase(16),
      Q => o1COUNTERPhase(16),
      R => '0'
    );
\rPhaseLatch1_reg[17]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => wPhase(17),
      Q => o1COUNTERPhase(17),
      R => '0'
    );
\rPhaseLatch1_reg[18]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => wPhase(18),
      Q => o1COUNTERPhase(18),
      R => '0'
    );
\rPhaseLatch1_reg[19]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => wPhase(19),
      Q => o1COUNTERPhase(19),
      R => '0'
    );
\rPhaseLatch1_reg[1]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => wPhase(1),
      Q => o1COUNTERPhase(1),
      R => '0'
    );
\rPhaseLatch1_reg[20]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => wPhase(20),
      Q => o1COUNTERPhase(20),
      R => '0'
    );
\rPhaseLatch1_reg[21]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => wPhase(21),
      Q => o1COUNTERPhase(21),
      R => '0'
    );
\rPhaseLatch1_reg[22]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => wPhase(22),
      Q => o1COUNTERPhase(22),
      R => '0'
    );
\rPhaseLatch1_reg[23]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => wPhase(23),
      Q => o1COUNTERPhase(23),
      R => '0'
    );
\rPhaseLatch1_reg[24]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => wPhase(24),
      Q => o1COUNTERPhase(24),
      R => '0'
    );
\rPhaseLatch1_reg[25]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => wPhase(25),
      Q => o1COUNTERPhase(25),
      R => '0'
    );
\rPhaseLatch1_reg[2]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => wPhase(2),
      Q => o1COUNTERPhase(2),
      R => '0'
    );
\rPhaseLatch1_reg[3]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => wPhase(3),
      Q => o1COUNTERPhase(3),
      R => '0'
    );
\rPhaseLatch1_reg[4]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => wPhase(4),
      Q => o1COUNTERPhase(4),
      R => '0'
    );
\rPhaseLatch1_reg[5]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => wPhase(5),
      Q => o1COUNTERPhase(5),
      R => '0'
    );
\rPhaseLatch1_reg[6]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => wPhase(6),
      Q => o1COUNTERPhase(6),
      R => '0'
    );
\rPhaseLatch1_reg[7]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => wPhase(7),
      Q => o1COUNTERPhase(7),
      R => '0'
    );
\rPhaseLatch1_reg[8]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => wPhase(8),
      Q => o1COUNTERPhase(8),
      R => '0'
    );
\rPhaseLatch1_reg[9]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch1,
      CE => '1',
      D => wPhase(9),
      Q => o1COUNTERPhase(9),
      R => '0'
    );
\rPhaseLatch2_reg[0]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => wPhase(0),
      Q => o2COUNTERPhase(0),
      R => '0'
    );
\rPhaseLatch2_reg[10]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => wPhase(10),
      Q => o2COUNTERPhase(10),
      R => '0'
    );
\rPhaseLatch2_reg[11]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => wPhase(11),
      Q => o2COUNTERPhase(11),
      R => '0'
    );
\rPhaseLatch2_reg[12]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => wPhase(12),
      Q => o2COUNTERPhase(12),
      R => '0'
    );
\rPhaseLatch2_reg[13]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => wPhase(13),
      Q => o2COUNTERPhase(13),
      R => '0'
    );
\rPhaseLatch2_reg[14]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => wPhase(14),
      Q => o2COUNTERPhase(14),
      R => '0'
    );
\rPhaseLatch2_reg[15]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => wPhase(15),
      Q => o2COUNTERPhase(15),
      R => '0'
    );
\rPhaseLatch2_reg[16]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => wPhase(16),
      Q => o2COUNTERPhase(16),
      R => '0'
    );
\rPhaseLatch2_reg[17]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => wPhase(17),
      Q => o2COUNTERPhase(17),
      R => '0'
    );
\rPhaseLatch2_reg[18]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => wPhase(18),
      Q => o2COUNTERPhase(18),
      R => '0'
    );
\rPhaseLatch2_reg[19]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => wPhase(19),
      Q => o2COUNTERPhase(19),
      R => '0'
    );
\rPhaseLatch2_reg[1]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => wPhase(1),
      Q => o2COUNTERPhase(1),
      R => '0'
    );
\rPhaseLatch2_reg[20]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => wPhase(20),
      Q => o2COUNTERPhase(20),
      R => '0'
    );
\rPhaseLatch2_reg[21]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => wPhase(21),
      Q => o2COUNTERPhase(21),
      R => '0'
    );
\rPhaseLatch2_reg[22]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => wPhase(22),
      Q => o2COUNTERPhase(22),
      R => '0'
    );
\rPhaseLatch2_reg[23]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => wPhase(23),
      Q => o2COUNTERPhase(23),
      R => '0'
    );
\rPhaseLatch2_reg[24]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => wPhase(24),
      Q => o2COUNTERPhase(24),
      R => '0'
    );
\rPhaseLatch2_reg[25]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => wPhase(25),
      Q => o2COUNTERPhase(25),
      R => '0'
    );
\rPhaseLatch2_reg[2]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => wPhase(2),
      Q => o2COUNTERPhase(2),
      R => '0'
    );
\rPhaseLatch2_reg[3]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => wPhase(3),
      Q => o2COUNTERPhase(3),
      R => '0'
    );
\rPhaseLatch2_reg[4]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => wPhase(4),
      Q => o2COUNTERPhase(4),
      R => '0'
    );
\rPhaseLatch2_reg[5]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => wPhase(5),
      Q => o2COUNTERPhase(5),
      R => '0'
    );
\rPhaseLatch2_reg[6]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => wPhase(6),
      Q => o2COUNTERPhase(6),
      R => '0'
    );
\rPhaseLatch2_reg[7]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => wPhase(7),
      Q => o2COUNTERPhase(7),
      R => '0'
    );
\rPhaseLatch2_reg[8]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => wPhase(8),
      Q => o2COUNTERPhase(8),
      R => '0'
    );
\rPhaseLatch2_reg[9]\: unisim.vcomponents.FDRE
    generic map(
      INIT => '0'
    )
        port map (
      C => iLatch2,
      CE => '1',
      D => wPhase(9),
      Q => o2COUNTERPhase(9),
      R => '0'
    );
wPhase_inferred_i_1: unisim.vcomponents.LUT1
    generic map(
      INIT => X"1"
    )
        port map (
      I0 => wPhase(24),
      O => wPhase(25)
    );
wPhase_inferred_i_10: unisim.vcomponents.LUT1
    generic map(
      INIT => X"1"
    )
        port map (
      I0 => wPhase(15),
      O => wPhase(16)
    );
wPhase_inferred_i_11: unisim.vcomponents.LUT1
    generic map(
      INIT => X"1"
    )
        port map (
      I0 => wPhase(14),
      O => wPhase(15)
    );
wPhase_inferred_i_12: unisim.vcomponents.LUT1
    generic map(
      INIT => X"1"
    )
        port map (
      I0 => wPhase(13),
      O => wPhase(14)
    );
wPhase_inferred_i_13: unisim.vcomponents.LUT1
    generic map(
      INIT => X"1"
    )
        port map (
      I0 => wPhase(12),
      O => wPhase(13)
    );
wPhase_inferred_i_14: unisim.vcomponents.LUT1
    generic map(
      INIT => X"1"
    )
        port map (
      I0 => wPhase(11),
      O => wPhase(12)
    );
wPhase_inferred_i_15: unisim.vcomponents.LUT1
    generic map(
      INIT => X"1"
    )
        port map (
      I0 => wPhase(10),
      O => wPhase(11)
    );
wPhase_inferred_i_16: unisim.vcomponents.LUT1
    generic map(
      INIT => X"1"
    )
        port map (
      I0 => wPhase(9),
      O => wPhase(10)
    );
wPhase_inferred_i_17: unisim.vcomponents.LUT1
    generic map(
      INIT => X"1"
    )
        port map (
      I0 => wPhase(8),
      O => wPhase(9)
    );
wPhase_inferred_i_18: unisim.vcomponents.LUT1
    generic map(
      INIT => X"1"
    )
        port map (
      I0 => wPhase(7),
      O => wPhase(8)
    );
wPhase_inferred_i_19: unisim.vcomponents.LUT1
    generic map(
      INIT => X"1"
    )
        port map (
      I0 => wPhase(6),
      O => wPhase(7)
    );
wPhase_inferred_i_2: unisim.vcomponents.LUT1
    generic map(
      INIT => X"1"
    )
        port map (
      I0 => wPhase(23),
      O => wPhase(24)
    );
wPhase_inferred_i_20: unisim.vcomponents.LUT1
    generic map(
      INIT => X"1"
    )
        port map (
      I0 => wPhase(5),
      O => wPhase(6)
    );
wPhase_inferred_i_21: unisim.vcomponents.LUT1
    generic map(
      INIT => X"1"
    )
        port map (
      I0 => wPhase(4),
      O => wPhase(5)
    );
wPhase_inferred_i_22: unisim.vcomponents.LUT1
    generic map(
      INIT => X"1"
    )
        port map (
      I0 => wPhase(3),
      O => wPhase(4)
    );
wPhase_inferred_i_23: unisim.vcomponents.LUT1
    generic map(
      INIT => X"1"
    )
        port map (
      I0 => wPhase(2),
      O => wPhase(3)
    );
wPhase_inferred_i_24: unisim.vcomponents.LUT1
    generic map(
      INIT => X"1"
    )
        port map (
      I0 => wPhase(1),
      O => wPhase(2)
    );
wPhase_inferred_i_25: unisim.vcomponents.LUT1
    generic map(
      INIT => X"1"
    )
        port map (
      I0 => wPhase(0),
      O => wPhase(1)
    );
wPhase_inferred_i_3: unisim.vcomponents.LUT1
    generic map(
      INIT => X"1"
    )
        port map (
      I0 => wPhase(22),
      O => wPhase(23)
    );
wPhase_inferred_i_4: unisim.vcomponents.LUT1
    generic map(
      INIT => X"1"
    )
        port map (
      I0 => wPhase(21),
      O => wPhase(22)
    );
wPhase_inferred_i_5: unisim.vcomponents.LUT1
    generic map(
      INIT => X"1"
    )
        port map (
      I0 => wPhase(20),
      O => wPhase(21)
    );
wPhase_inferred_i_6: unisim.vcomponents.LUT1
    generic map(
      INIT => X"1"
    )
        port map (
      I0 => wPhase(19),
      O => wPhase(20)
    );
wPhase_inferred_i_7: unisim.vcomponents.LUT1
    generic map(
      INIT => X"1"
    )
        port map (
      I0 => wPhase(18),
      O => wPhase(19)
    );
wPhase_inferred_i_8: unisim.vcomponents.LUT1
    generic map(
      INIT => X"1"
    )
        port map (
      I0 => wPhase(17),
      O => wPhase(18)
    );
wPhase_inferred_i_9: unisim.vcomponents.LUT1
    generic map(
      INIT => X"1"
    )
        port map (
      I0 => wPhase(16),
      O => wPhase(17)
    );
end STRUCTURE;
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
library UNISIM;
use UNISIM.VCOMPONENTS.ALL;
entity design_1_COUNTER_0_0 is
  port (
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
  attribute NotValidForBitStream : boolean;
  attribute NotValidForBitStream of design_1_COUNTER_0_0 : entity is true;
  attribute CHECK_LICENSE_TYPE : string;
  attribute CHECK_LICENSE_TYPE of design_1_COUNTER_0_0 : entity is "design_1_COUNTER_0_0,COUNTER,{}";
  attribute DowngradeIPIdentifiedWarnings : string;
  attribute DowngradeIPIdentifiedWarnings of design_1_COUNTER_0_0 : entity is "yes";
  attribute IP_DEFINITION_SOURCE : string;
  attribute IP_DEFINITION_SOURCE of design_1_COUNTER_0_0 : entity is "module_ref";
  attribute X_CORE_INFO : string;
  attribute X_CORE_INFO of design_1_COUNTER_0_0 : entity is "COUNTER,Vivado 2023.2";
end design_1_COUNTER_0_0;

architecture STRUCTURE of design_1_COUNTER_0_0 is
  signal \<const0>\ : STD_LOGIC;
  signal \^o1counterphase\ : STD_LOGIC_VECTOR ( 25 downto 0 );
  signal \^o2counterphase\ : STD_LOGIC_VECTOR ( 25 downto 0 );
  attribute ALLOW_COMBINATORIAL_LOOPS : string;
  attribute ALLOW_COMBINATORIAL_LOOPS of iLatch1 : signal is "true";
  attribute ALLOW_COMBINATORIAL_LOOPS of iLatch2 : signal is "true";
begin
  debug(31) <= \<const0>\;
  debug(30) <= \<const0>\;
  debug(29) <= \<const0>\;
  debug(28) <= \<const0>\;
  debug(27) <= \<const0>\;
  debug(26) <= \<const0>\;
  debug(25) <= \<const0>\;
  debug(24) <= \<const0>\;
  debug(23) <= \<const0>\;
  debug(22) <= \<const0>\;
  debug(21) <= \<const0>\;
  debug(20) <= \<const0>\;
  debug(19) <= \<const0>\;
  debug(18) <= \<const0>\;
  debug(17) <= \<const0>\;
  debug(16) <= \<const0>\;
  debug(15) <= \<const0>\;
  debug(14) <= \<const0>\;
  debug(13) <= \<const0>\;
  debug(12) <= \<const0>\;
  debug(11) <= \<const0>\;
  debug(10) <= \<const0>\;
  debug(9) <= \<const0>\;
  debug(8) <= \<const0>\;
  debug(7) <= \<const0>\;
  debug(6) <= \<const0>\;
  debug(5) <= \<const0>\;
  debug(4) <= \<const0>\;
  debug(3) <= \<const0>\;
  debug(2) <= \<const0>\;
  debug(1) <= \<const0>\;
  debug(0) <= \<const0>\;
  o1COUNTERPhase(31) <= \<const0>\;
  o1COUNTERPhase(30) <= \<const0>\;
  o1COUNTERPhase(29) <= \<const0>\;
  o1COUNTERPhase(28) <= \<const0>\;
  o1COUNTERPhase(27) <= \<const0>\;
  o1COUNTERPhase(26) <= \<const0>\;
  o1COUNTERPhase(25 downto 0) <= \^o1counterphase\(25 downto 0);
  o2COUNTERPhase(31) <= \<const0>\;
  o2COUNTERPhase(30) <= \<const0>\;
  o2COUNTERPhase(29) <= \<const0>\;
  o2COUNTERPhase(28) <= \<const0>\;
  o2COUNTERPhase(27) <= \<const0>\;
  o2COUNTERPhase(26) <= \<const0>\;
  o2COUNTERPhase(25 downto 0) <= \^o2counterphase\(25 downto 0);
  oLatchTest1 <= \<const0>\;
  oLatchTest2 <= \<const0>\;
GND: unisim.vcomponents.GND
     port map (
      G => \<const0>\
    );
inst: entity work.design_1_COUNTER_0_0_COUNTER
     port map (
      Q(63 downto 32) => o1COUNTERHi(31 downto 0),
      Q(31 downto 0) => o1COUNTER(31 downto 0),
      globalClock => globalClock,
      iLatch1 => iLatch1,
      iLatch2 => iLatch2,
      iResetLatch1 => iResetLatch1,
      iResetLatch2 => iResetLatch2,
      o1COUNTERPhase(25 downto 0) => \^o1counterphase\(25 downto 0),
      o2COUNTERPhase(25 downto 0) => \^o2counterphase\(25 downto 0),
      oRdyCOUNTER => oRdyCOUNTER,
      oRdyCOUNTER2 => oRdyCOUNTER2,
      \rLatch2_reg[63]_0\(63 downto 32) => o2COUNTERHi(31 downto 0),
      \rLatch2_reg[63]_0\(31 downto 0) => o2COUNTER(31 downto 0)
    );
end STRUCTURE;
