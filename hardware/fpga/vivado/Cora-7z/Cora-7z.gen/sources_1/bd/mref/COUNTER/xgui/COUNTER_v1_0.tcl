# Definitional proc to organize widgets for parameters.
proc init_gui { IPINST } {
  ipgui::add_param $IPINST -name "Component_Name"
  #Adding Page
  set Page_0 [ipgui::add_page $IPINST -name "Page 0"]
  ipgui::add_param $IPINST -name "PHASE_SIZE" -parent ${Page_0}
  ipgui::add_param $IPINST -name "pWIDTH" -parent ${Page_0}


}

proc update_PARAM_VALUE.PHASE_SIZE { PARAM_VALUE.PHASE_SIZE } {
	# Procedure called to update PHASE_SIZE when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.PHASE_SIZE { PARAM_VALUE.PHASE_SIZE } {
	# Procedure called to validate PHASE_SIZE
	return true
}

proc update_PARAM_VALUE.pWIDTH { PARAM_VALUE.pWIDTH } {
	# Procedure called to update pWIDTH when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.pWIDTH { PARAM_VALUE.pWIDTH } {
	# Procedure called to validate pWIDTH
	return true
}


proc update_MODELPARAM_VALUE.pWIDTH { MODELPARAM_VALUE.pWIDTH PARAM_VALUE.pWIDTH } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.pWIDTH}] ${MODELPARAM_VALUE.pWIDTH}
}

proc update_MODELPARAM_VALUE.PHASE_SIZE { MODELPARAM_VALUE.PHASE_SIZE PARAM_VALUE.PHASE_SIZE } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.PHASE_SIZE}] ${MODELPARAM_VALUE.PHASE_SIZE}
}

