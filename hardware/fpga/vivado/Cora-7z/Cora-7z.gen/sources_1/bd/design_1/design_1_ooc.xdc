################################################################################

# This XDC is used only for OOC mode of synthesis, implementation
# This constraints file contains default clock frequencies to be used during
# out-of-context flows such as OOC Synthesis and Hierarchical Designs.
# This constraints file is not used in normal top-down synthesis (default flow
# of Vivado)
################################################################################
create_clock -name iCLK -period 10 [get_ports iCLK]
create_clock -name CPU_Block_processing_system7_0_FCLK_CLK0 -period 20 [get_pins CPU_Block/processing_system7_0/FCLK_CLK0]
create_clock -name CPU_Block_processing_system7_0_FCLK_CLK1 -period 4 [get_pins CPU_Block/processing_system7_0/FCLK_CLK1]

################################################################################