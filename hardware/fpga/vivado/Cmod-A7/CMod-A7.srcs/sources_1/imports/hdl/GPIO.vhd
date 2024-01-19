----------------------------------------------------------------------------
--	GPIO_Demo.vhd -- Nexys4DDR GPIO/UART Demonstration Project
----------------------------------------------------------------------------
-- Author:  Samuel Lowe Adapted from Sam Bobrowicz
--          Copyright 2013 Digilent, Inc.
----------------------------------------------------------------------------
--
----------------------------------------------------------------------------
--	The GPIO/UART Demo project demonstrates a simple usage of the Nexys4DDR's 
--  GPIO and UART. The behavior is as follows:
--
--	      *The 16 User LEDs are tied to the 16 User Switches. While the center
--			 User button is pressed, the LEDs are instead tied to GND
--	      *The 7-Segment display counts from 0 to 9 on each of its 8
--        digits. This count is reset when the center button is pressed.
--        Also, single anodes of the 7-Segment display are blanked by
--	       holding BTNU, BTNL, BTND, or BTNR. Holding the center button 
--        blanks all the 7-Segment anodes.
--       *An introduction message is sent across the UART when the device
--        is finished being configured, and after the center User button
--        is pressed.
--       *A message is sent over UART whenever BTNU, BTNL, BTND, or BTNR is
--        pressed.
--       *The Tri-Color LEDs cycle through several colors in a ~4 second loop
--       *Data from the microphone is collected and transmitted over the mono
--        audio out port.
--       *Note that the center user button behaves as a user reset button
--        and is referred to as such in the code comments below
--        
--	All UART communication can be captured by attaching the UART port to a
-- computer running a Terminal program with 9600 Baud Rate, 8 data bits, no 
-- parity, and 1 stop bit.																
----------------------------------------------------------------------------
--
----------------------------------------------------------------------------
-- Revision History:
--  08/08/2011(SamB): Created using Xilinx Tools 13.2
--  08/27/2013(MarshallW): Modified for the Nexys4 with Xilinx ISE 14.4\
--  		--added RGB and microphone
--  12/10/2014(SamB): Ported to Nexys4DDR and updated to Vivado 2014.4
--  05/24/2016(SamL): Ported to Cmod A7 and updated to Vivado 2015.4
--          --dimmed RGBLED and added clk_wiz_o
----------------------------------------------------------------------------

library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

--The IEEE.std_logic_unsigned contains definitions that allow 
--std_logic_vector types to be used with the + operator to instantiate a 
--counter.
use IEEE.std_logic_unsigned.all;

entity GPIO_demo is
    Port ( 
           BTN 			: in  STD_LOGIC_VECTOR (1 downto 0);
           CLK 			: in  STD_LOGIC;
           LED 			: out  STD_LOGIC_VECTOR (1 downto 0);
           UART_TXD 	: out  STD_LOGIC;
           RGB0_Red		: out  STD_LOGIC;
           RGB0_Green    : out  STD_LOGIC;
           RGB0_Blue    : out  STD_LOGIC;
           oLatchTest1 : out std_logic;
           oLatchTest2 : out std_logic;
           iLatch1 : in std_logic;
           iLatch2 : in std_logic --;
           --iResetLatch1 : in std_logic;
           --iResetLatch2 : in std_logic
           
			  );
end GPIO_demo;

architecture Behavioral of GPIO_demo is



component UART_TX_CTRL
Port(
	SEND : in std_logic;
	DATA : in std_logic_vector(7 downto 0);
	CLK : in std_logic;          
	READY : out std_logic;
	UART_TX : out std_logic
	);
end component;

component COUNTER
Port(
    globalClock: in std_logic;
    iLatch1 : in std_logic;      -- signal event that latches the counter to register 1
    iLatch2 : in std_logic;      -- signal event that latches the counter to register 2
    iResetLatch1 : in std_logic; -- sent after the value in register 1 is read from (or sent to) the USB
    iResetLatch2 : in std_logic; -- sent after the value in register 2 is read from (or sent to) the USB
    o1COUNTER : out STD_LOGIC_VECTOR( 31 downto 0 );
    o1COUNTERHi : out STD_LOGIC_VECTOR( 31 downto 0 );
    o1COUNTERPhase : out STD_LOGIC_VECTOR( 31 downto 0 );
    o2COUNTER : out STD_LOGIC_VECTOR( 31 downto 0 );
    o2COUNTERHi : out STD_LOGIC_VECTOR( 31 downto 0 );
    o2COUNTERPhase : out STD_LOGIC_VECTOR( 31 downto 0 );
    oRdyCOUNTER : out std_logic;
    oRdyCOUNTER2 : out std_logic;
    oLatchTest1 : out std_logic;
    oLatchTest2 : out std_logic
  );
end component;

component debouncer
Generic(
        DEBNC_CLOCKS : integer;
        PORT_WIDTH : integer);
Port(
		SIGNAL_I : in std_logic_vector(1 downto 0);
		CLK_I : in std_logic;          
		SIGNAL_O : out std_logic_vector(1 downto 0)
		);
end component;

component RGB_controller 
Port(
	GCLK 		   : in std_logic;
	RGB_LED_1_O	   : out std_logic_vector(2 downto 0);
	RGB_LED_2_O	   : out std_logic_vector(2 downto 0)
	);
end component;

component clk_wiz_0
port(
    clk_in1         : in std_logic;
    clk_out1        : out std_logic;
    clk_out2        : out std_logic;
    reset           : in std_logic
);
end component;


--The type definition for the UART state machine type. Here is a description of what
--occurs during each state:
-- RST_REG     -- Do Nothing. This state is entered after configuration or a user reset.
--                The state is set to LD_INIT_STR.
-- LD_INIT_STR -- The Welcome String is loaded into the sendStr variable and the strIndex
--                variable is set to zero. The welcome string length is stored in the StrEnd
--                variable. The state is set to SEND_CHAR.
-- SEND_CHAR   -- uartSend is set high for a single clock cycle, signaling the character
--                data at sendStr(strIndex) to be registered by the UART_TX_CTRL at the next
--                cycle. Also, strIndex is incremented (behaves as if it were post 
--                incremented after reading the sendStr data). The state is set to RDY_LOW.
-- RDY_LOW     -- Do nothing. Wait for the READY signal from the UART_TX_CTRL to go low, 
--                indicating a send operation has begun. State is set to WAIT_RDY.
-- WAIT_RDY    -- Do nothing. Wait for the READY signal from the UART_TX_CTRL to go high, 
--                indicating a send operation has finished. If READY is high and strEnd = 
--                StrIndex then state is set to WAIT_BTN, else if READY is high and strEnd /=
--                StrIndex then state is set to SEND_CHAR.
-- WAIT_BTN    -- Do nothing. Wait for a button press on BTNU, BTNL, BTND, or BTNR. If a 
--                button press is detected, set the state to LD_BTN_STR.
-- LD_BTN_STR  -- The Button String is loaded into the sendStr variable and the strIndex
--                variable is set to zero. The button string length is stored in the StrEnd
--                variable. The state is set to SEND_CHAR.
type UART_STATE_TYPE is (RST_REG, LD_INIT_STR, SEND_CHAR, RDY_LOW, WAIT_RDY, WAIT_BTN, LD_BTN_STR, LD_COUNTER1, LD_COUNTER2 );




--The CHAR_ARRAY type is a variable length array of 8 bit std_logic_vectors. 
--Each std_logic_vector contains an ASCII value and represents a character in
--a string. The character at index 0 is meant to represent the first
--character of the string, the character at index 1 is meant to represent the
--second character of the string, and so on.
type CHAR_ARRAY is array (integer range<>) of std_logic_vector(7 downto 0);


constant TMR_CNTR_MAX : std_logic_vector(26 downto 0) := "101111101011110000100000000"; --100,000,000 = clk cycles per second
constant TMR_VAL_MAX : std_logic_vector(3 downto 0) := "1001"; --9

constant RESET_CNTR_MAX : std_logic_vector(17 downto 0) := "110000110101000000";-- 100,000,000 * 0.002 = 200,000 = clk cycles per 2 ms

constant MAX_STR_LEN : integer := 31;

constant WELCOME_STR_LEN : natural := 31;
constant BTN_STR_LEN : natural := 24;



--Welcome string definition. Note that the values stored at each index
--are the ASCII values of the indicated character.
constant WELCOME_STR : CHAR_ARRAY(0 to 30) := (X"0A",  --\n
															  X"0D",  --\r
															  X"43",  --C
															  X"4D",  --M
															  X"4F",  --O
															  X"44",  --D
															  X"20",  -- 
															  X"41",  --A
															  X"37",  --7
                                                              X"20",  -- 
                                                              X"47",  --G
                                                              X"50",  --P 
															  X"49",  --I
															  X"4F",  --O
															  X"2F",  --/
															  X"55",  --U
															  X"41",  --A
															  X"52",  --R
															  X"54",  --T
															  X"20",  -- 
															  X"44",  --D
															  X"45",  --E
															  X"4D",  --M
															  X"4F",  --O
															  X"21",  --!
															  X"20",  -- 
															  X"20",  -- 
															  X"20",  -- 
															  X"0A",  --\n
															  X"0A",  --\n
															  X"0D"); --\r
															  
--Button press string definition.
constant BTN_STR : CHAR_ARRAY(0 to 23) :=     (X"42",  --B
															  X"75",  --u
															  X"74",  --t
															  X"74",  --t
															  X"6F",  --o
															  X"6E",  --n
															  X"20",  -- 
															  X"70",  --p
															  X"72",  --r
															  X"65",  --e
															  X"73",  --s
															  X"73",  --s
															  X"20",  --
															  X"64",  --d
															  X"65",  --e
															  X"74",  --t
															  X"65",  --e
															  X"63",  --c
															  X"74",  --t
															  X"65",  --e
															  X"64",  --d
															  X"21",  --!
															  X"0A",  --\n
															  X"0D"); --\r

type MSG_BUF is record
    cmd : std_logic_vector( 7 downto 0 );
    low : std_logic_vector( 31 downto 0 );
    high : std_logic_vector( 31 downto 0 );
    phase : std_logic_vector( 31 downto 0 );
end record MSG_BUF;
signal DataBuf1 : MSG_BUF := ( cmd=>X"00", low=>X"00000000", high=>X"00000000", phase=>X"00000000" );
signal DataBuf2 : MSG_BUF := ( cmd=>X"01", low=>X"00000000", high=>X"00000000", phase=>X"00000000" );

signal oResetLatch1 : std_logic;
signal oResetLatch2 : std_logic;
 
--This is used to determine when the 7-segment display should be
--incremented
signal tmrCntr : std_logic_vector(26 downto 0) := (others => '0');

--This counter keeps track of which number is currently being displayed
--on the 7-segment.
signal tmrVal : std_logic_vector(3 downto 0) := (others => '0');

--Contains the current string being sent over uart.
signal sendStr : CHAR_ARRAY(0 to (MAX_STR_LEN - 1));

--Contains the length of the current string being sent over uart.
signal strEnd : natural;

--Contains the index of the next character to be sent over uart
--within the sendStr variable.
signal strIndex : natural;

--Used to determine when a button press has occured
signal btnReg : std_logic_vector (1 downto 0) := "00";
signal btnDetect : std_logic;
signal cnt1Detect : std_logic; -- counter1 is ready to send
signal cnt2Detect : std_logic; -- counter2 is ready to send
signal cnt1Send : std_logic; -- counter1 is ready to send
signal cnt2Send : std_logic; -- counter2 is ready to send

--UART_TX_CTRL control signals
signal uartRdy : std_logic;
signal uartSend : std_logic := '0';
signal uartData : std_logic_vector (7 downto 0):= "00000000";
signal uartTX : std_logic;

--Current uart state signal
signal uartState : UART_STATE_TYPE := RST_REG;

--Debounced btn signals used to prevent single button presses
--from being interpreted as multiple button presses.
signal btnDeBnc : std_logic_vector(1 downto 0);

signal clk_cntr_reg : std_logic_vector (4 downto 0) := (others=>'0'); 

--signal pwm_val_reg : std_logic := '0';

--this counter counts the amount of time paused in the UART reset state
signal reset_cntr : std_logic_vector (17 downto 0) := (others=>'0');

--clock signal
signal clk100 : std_logic;
signal globalClock : std_logic;
signal clkRst : std_logic := '0';
signal oRdyCOUNTER : std_logic;
signal oRdyCOUNTER2 : std_logic;

begin

----------------------------------------------------------
------                Clocking                  -------
----------------------------------------------------------

inst_clk: clk_wiz_0
    port map(
        clk_in1 => CLK,
        clk_out1 => CLK100,
        clk_out2 => globalClock,
        reset => clkRst
        
        );
----------------------------------------------------------
------                LED Control                  -------
----------------------------------------------------------


	LED <= BTN;
			 			 

----------------------------------------------------------
------              Button Control                 -------
----------------------------------------------------------
--Buttons are debounced and their rising edges are detected
--to trigger UART messages


--Debounces btn signals 
Inst_btn_debounce: debouncer 
    generic map(
        DEBNC_CLOCKS => (2**16),
        PORT_WIDTH => 2)
    port map(
		SIGNAL_I => BTN,
		CLK_I => CLK100,
		SIGNAL_O => btnDeBnc
	);

--Registers the debounced button signals, for edge detection.
btn_reg_process : process (CLK100)
begin
	if (rising_edge(CLK100)) then
		btnReg <= btnDeBnc(1 downto 0);
	end if;
end process;

--btnDetect goes high for a single clock cycle when a btn press is
--detected. This triggers a UART message to begin being sent.
btnDetect <= '1' when ((btnReg(0)='0' and btnDeBnc(0)='1') or
								(btnReg(1)='0' and btnDeBnc(1)='1')) else
				  '0';
				  
----------------------------------------------------------
------          Clock Module         ---------
----------------------------------------------------------


clock_inst : COUNTER
    port map( 
           globalClock,
           iLatch1 => iLatch1,
           iLatch2 => iLatch2,
           o1COUNTER => DataBuf1.low,
           o1COUNTERHi => DataBuf1.high,
           o1COUNTERPhase => DataBuf1.phase,
           o2COUNTER => DataBuf2.low,
           o2COUNTERHi => DataBuf2.high,
           o2COUNTERPhase => DataBuf2.phase,
           oRdyCounter => oRdyCounter, 
           oRdyCounter2 => oRdyCounter2,
           iResetLatch1 => oResetLatch1,
           iResetLatch2 => oResetLatch2,
           oLatchTest1 => oLatchTest1,
           oLatchTest2 => oLatchTest2
    );
    
counter_process : process( oRdyCounter, oRdyCounter2 )
begin
    -- once ready goes away, it's safe to remove resets...
    if( oRdyCOUNTER = '0' ) then oResetLatch1 <= '0'; end if;
    if( oRdyCOUNTER2 = '0' ) then oResetLatch2 <= '0'; end if;
    -- once we start sending, should be able to trigger reset
    -- this will probably be done sending by the time the latch signal goes away...
    if( cnt1Send = '1' ) then oResetLatch1 <= '1'; end if;
    if( cnt2Send = '1' ) then oResetLatch2 <= '1'; end if;
    if( cnt1Send = '0' ) then
        cnt1Detect <= oRdyCounter;
    end if;
    if( cnt2Send = '0' ) then
        cnt2Detect <= oRdyCounter2;
     end if;
end process;

----------------------------------------------------------
------              UART Control                   -------
----------------------------------------------------------
--Messages are sent on reset and when a button is pressed.

--This counter holds the UART state machine in reset for ~2 milliseconds. This
--will complete transmission of any byte that may have been initiated during 
--FPGA configuration due to the UART_TX line being pulled low, preventing a 
--frame shift error from occuring during the first message.
process(CLK)
begin
  if (rising_edge(CLK100)) then
    if ((reset_cntr = RESET_CNTR_MAX) or (uartState /= RST_REG)) then
      reset_cntr <= (others=>'0');
    else
      reset_cntr <= reset_cntr + 1;
    end if;
  end if;
end process;

--Next Uart state logic (states described above)
next_uartState_process : process (CLK100)
begin
	if (rising_edge(CLK100)) then
			
	   case uartState is 
			when RST_REG =>
        if (reset_cntr = RESET_CNTR_MAX) then
          uartState <= LD_INIT_STR;
        end if;
			when LD_INIT_STR =>
				uartState <= SEND_CHAR;
			when SEND_CHAR =>
				uartState <= RDY_LOW;
			when RDY_LOW =>
				uartState <= WAIT_RDY;
			when WAIT_RDY =>
				if (uartRdy = '1') then
					if (strEnd = strIndex) then
						uartState <= WAIT_BTN;
					else
						uartState <= SEND_CHAR;
					end if;
				end if;
			when WAIT_BTN =>
			     if( cnt1Send = '1' ) then
			         cnt1Send <= '0';
			     end if;
			     if( cnt2Send = '1' ) then
			         cnt2Send <= '0';
			     end if;
			     
				if (btnDetect = '1') then
					uartState <= LD_BTN_STR;
				elsif (cnt1Detect = '1' ) then
				    uartState <= LD_COUNTER1;
				elsif (cnt2Detect = '1' ) then
				    uartState <= LD_COUNTER2;
				end if;
			when LD_BTN_STR =>
				uartState <= SEND_CHAR;
			when others=> --should never be reached
				uartState <= RST_REG;
			end case;
		
	end if;
end process;

--Loads the sendStr and strEnd signals when a LD state is
--is reached.
string_load_process : process (CLK100)
begin
	if (rising_edge(CLK100)) then
		if (uartState = LD_INIT_STR) then
			sendStr <= WELCOME_STR;
			strEnd <= WELCOME_STR_LEN;
		elsif (uartState = LD_BTN_STR) then
			sendStr(0 to 23) <= BTN_STR;
			strEnd <= BTN_STR_LEN;
		elsif (uartState = LD_COUNTER1) then
		      sendStr(0) <= DataBuf1.cmd;
		      sendStr(1) <= DataBuf1.low(7 downto 0);
		      sendStr(2) <= DataBuf1.low(15 downto 8);
		      sendStr(3) <= DataBuf1.low(23 downto 16);
		      sendStr(4) <= DataBuf1.low(31 downto 24);
		      sendStr(5) <= DataBuf1.high(7 downto 0);
		      sendStr(6) <= DataBuf1.high(15 downto 8);
		      sendStr(7) <= DataBuf1.high(23 downto 16);
		      sendStr(8) <= DataBuf1.high(31 downto 24);
		      sendStr(9) <= DataBuf1.phase(7 downto 0);
		      sendStr(10) <= DataBuf1.phase(15 downto 8);
		      sendStr(11) <= DataBuf1.phase(23 downto 16);
		      sendStr(12) <= DataBuf1.phase(31 downto 24);
			strEnd <= 13;
		elsif (uartState = LD_COUNTER2) then
		      sendStr(0) <= DataBuf2.cmd;
		      sendStr(1) <= DataBuf2.low(7 downto 0);
		      sendStr(2) <= DataBuf2.low(15 downto 8);
		      sendStr(3) <= DataBuf2.low(23 downto 16);
		      sendStr(4) <= DataBuf2.low(31 downto 24);
		      sendStr(5) <= DataBuf2.high(7 downto 0);
		      sendStr(6) <= DataBuf2.high(15 downto 8);
		      sendStr(7) <= DataBuf2.high(23 downto 16);
		      sendStr(8) <= DataBuf2.high(31 downto 24);
		      sendStr(9) <= DataBuf2.phase(7 downto 0);
		      sendStr(10) <= DataBuf2.phase(15 downto 8);
		      sendStr(11) <= DataBuf2.phase(23 downto 16);
		      sendStr(12) <= DataBuf2.phase(31 downto 24);
			strEnd <= 13;
		end if;
	end if;
end process;

--Conrols the strIndex signal so that it contains the index
--of the next character that needs to be sent over uart
char_count_process : process (CLK100)
begin
	if (rising_edge(CLK100)) then
		if (uartState = LD_INIT_STR or uartState = LD_BTN_STR) then
			strIndex <= 0;
		elsif (uartState = SEND_CHAR) then
			strIndex <= strIndex + 1;
		end if;
	end if;
end process;

--Controls the UART_TX_CTRL signals
char_load_process : process (CLK100)
begin
	if (rising_edge(CLK100)) then
		if (uartState = SEND_CHAR) then
			uartSend <= '1';
			uartData <= sendStr(strIndex);
		else
			uartSend <= '0';
		end if;
	end if;
end process;

--Component used to send a byte of data over a UART line.
Inst_UART_TX_CTRL: UART_TX_CTRL port map(
		SEND => uartSend,
		DATA => uartData,
		CLK => CLK100,
		READY => uartRdy,
		UART_TX => uartTX 
	);

UART_TXD <= uartTX;

----------------------------------------------------------
------            RGB LED Control                  -------
----------------------------------------------------------



RGB_Core1: RGB_controller port map(
	GCLK => CLK100, 			
	RGB_LED_1_O(0) => RGB0_Green, 
	RGB_LED_1_O(1) => RGB0_Blue,
	RGB_LED_1_O(2) => RGB0_Red
	);








end Behavioral;
