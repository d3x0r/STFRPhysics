# Definitional proc to organize widgets for parameters.
proc init_gui { IPINST } {
  ipgui::add_param $IPINST -name "Component_Name"
  ipgui::add_param $IPINST -name "outWidth"
  #Adding Page
  set Page_1 [ipgui::add_page $IPINST -name "Page 1" -display_name {Inputs 0-15}]
  set_property tooltip {First 15 input widths.} ${Page_1}
  ipgui::add_param $IPINST -name "inWidth0" -parent ${Page_1}
  ipgui::add_param $IPINST -name "inWidth1" -parent ${Page_1}
  ipgui::add_param $IPINST -name "inWidth2" -parent ${Page_1}
  ipgui::add_param $IPINST -name "inWidth3" -parent ${Page_1}
  ipgui::add_param $IPINST -name "inWidth4" -parent ${Page_1}
  ipgui::add_param $IPINST -name "inWidth5" -parent ${Page_1}
  ipgui::add_param $IPINST -name "inWidth6" -parent ${Page_1}
  ipgui::add_param $IPINST -name "inWidth7" -parent ${Page_1}
  ipgui::add_param $IPINST -name "inWidth8" -parent ${Page_1}
  ipgui::add_param $IPINST -name "inWidth9" -parent ${Page_1}
  ipgui::add_param $IPINST -name "inWidth10" -parent ${Page_1}
  ipgui::add_param $IPINST -name "inWidth11" -parent ${Page_1}
  ipgui::add_param $IPINST -name "inWidth12" -parent ${Page_1}
  ipgui::add_param $IPINST -name "inWidth13" -parent ${Page_1}
  ipgui::add_param $IPINST -name "inWidth14" -parent ${Page_1}
  ipgui::add_param $IPINST -name "inWidth15" -parent ${Page_1}

  #Adding Page
  set Page2 [ipgui::add_page $IPINST -name "Page2" -display_name {Inputs 16-31}]
  set_property tooltip {Second inputs width page.} ${Page2}
  ipgui::add_param $IPINST -name "inWidth16" -parent ${Page2}
  ipgui::add_param $IPINST -name "inWidth17" -parent ${Page2}
  ipgui::add_param $IPINST -name "inWidth18" -parent ${Page2}
  ipgui::add_param $IPINST -name "inWidth19" -parent ${Page2}
  ipgui::add_param $IPINST -name "inWidth20" -parent ${Page2}
  ipgui::add_param $IPINST -name "inWidth21" -parent ${Page2}
  ipgui::add_param $IPINST -name "inWidth22" -parent ${Page2}
  ipgui::add_param $IPINST -name "inWidth23" -parent ${Page2}
  ipgui::add_param $IPINST -name "inWidth24" -parent ${Page2}
  ipgui::add_param $IPINST -name "inWidth25" -parent ${Page2}
  ipgui::add_param $IPINST -name "inWidth26" -parent ${Page2}
  ipgui::add_param $IPINST -name "inWidth27" -parent ${Page2}
  ipgui::add_param $IPINST -name "inWidth28" -parent ${Page2}
  ipgui::add_param $IPINST -name "inWidth29" -parent ${Page2}
  ipgui::add_param $IPINST -name "inWidth30" -parent ${Page2}
  ipgui::add_param $IPINST -name "inWidth31" -parent ${Page2}


}

proc update_PARAM_VALUE.inWidth0 { PARAM_VALUE.inWidth0 } {
	# Procedure called to update inWidth0 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth0 { PARAM_VALUE.inWidth0 } {
	# Procedure called to validate inWidth0
	return true
}

proc update_PARAM_VALUE.inWidth1 { PARAM_VALUE.inWidth1 } {
	# Procedure called to update inWidth1 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth1 { PARAM_VALUE.inWidth1 } {
	# Procedure called to validate inWidth1
	return true
}

proc update_PARAM_VALUE.inWidth10 { PARAM_VALUE.inWidth10 } {
	# Procedure called to update inWidth10 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth10 { PARAM_VALUE.inWidth10 } {
	# Procedure called to validate inWidth10
	return true
}

proc update_PARAM_VALUE.inWidth11 { PARAM_VALUE.inWidth11 } {
	# Procedure called to update inWidth11 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth11 { PARAM_VALUE.inWidth11 } {
	# Procedure called to validate inWidth11
	return true
}

proc update_PARAM_VALUE.inWidth12 { PARAM_VALUE.inWidth12 } {
	# Procedure called to update inWidth12 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth12 { PARAM_VALUE.inWidth12 } {
	# Procedure called to validate inWidth12
	return true
}

proc update_PARAM_VALUE.inWidth13 { PARAM_VALUE.inWidth13 } {
	# Procedure called to update inWidth13 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth13 { PARAM_VALUE.inWidth13 } {
	# Procedure called to validate inWidth13
	return true
}

proc update_PARAM_VALUE.inWidth14 { PARAM_VALUE.inWidth14 } {
	# Procedure called to update inWidth14 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth14 { PARAM_VALUE.inWidth14 } {
	# Procedure called to validate inWidth14
	return true
}

proc update_PARAM_VALUE.inWidth15 { PARAM_VALUE.inWidth15 } {
	# Procedure called to update inWidth15 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth15 { PARAM_VALUE.inWidth15 } {
	# Procedure called to validate inWidth15
	return true
}

proc update_PARAM_VALUE.inWidth16 { PARAM_VALUE.inWidth16 } {
	# Procedure called to update inWidth16 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth16 { PARAM_VALUE.inWidth16 } {
	# Procedure called to validate inWidth16
	return true
}

proc update_PARAM_VALUE.inWidth17 { PARAM_VALUE.inWidth17 } {
	# Procedure called to update inWidth17 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth17 { PARAM_VALUE.inWidth17 } {
	# Procedure called to validate inWidth17
	return true
}

proc update_PARAM_VALUE.inWidth18 { PARAM_VALUE.inWidth18 } {
	# Procedure called to update inWidth18 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth18 { PARAM_VALUE.inWidth18 } {
	# Procedure called to validate inWidth18
	return true
}

proc update_PARAM_VALUE.inWidth19 { PARAM_VALUE.inWidth19 } {
	# Procedure called to update inWidth19 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth19 { PARAM_VALUE.inWidth19 } {
	# Procedure called to validate inWidth19
	return true
}

proc update_PARAM_VALUE.inWidth2 { PARAM_VALUE.inWidth2 } {
	# Procedure called to update inWidth2 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth2 { PARAM_VALUE.inWidth2 } {
	# Procedure called to validate inWidth2
	return true
}

proc update_PARAM_VALUE.inWidth20 { PARAM_VALUE.inWidth20 } {
	# Procedure called to update inWidth20 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth20 { PARAM_VALUE.inWidth20 } {
	# Procedure called to validate inWidth20
	return true
}

proc update_PARAM_VALUE.inWidth21 { PARAM_VALUE.inWidth21 } {
	# Procedure called to update inWidth21 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth21 { PARAM_VALUE.inWidth21 } {
	# Procedure called to validate inWidth21
	return true
}

proc update_PARAM_VALUE.inWidth22 { PARAM_VALUE.inWidth22 } {
	# Procedure called to update inWidth22 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth22 { PARAM_VALUE.inWidth22 } {
	# Procedure called to validate inWidth22
	return true
}

proc update_PARAM_VALUE.inWidth23 { PARAM_VALUE.inWidth23 } {
	# Procedure called to update inWidth23 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth23 { PARAM_VALUE.inWidth23 } {
	# Procedure called to validate inWidth23
	return true
}

proc update_PARAM_VALUE.inWidth24 { PARAM_VALUE.inWidth24 } {
	# Procedure called to update inWidth24 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth24 { PARAM_VALUE.inWidth24 } {
	# Procedure called to validate inWidth24
	return true
}

proc update_PARAM_VALUE.inWidth25 { PARAM_VALUE.inWidth25 } {
	# Procedure called to update inWidth25 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth25 { PARAM_VALUE.inWidth25 } {
	# Procedure called to validate inWidth25
	return true
}

proc update_PARAM_VALUE.inWidth26 { PARAM_VALUE.inWidth26 } {
	# Procedure called to update inWidth26 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth26 { PARAM_VALUE.inWidth26 } {
	# Procedure called to validate inWidth26
	return true
}

proc update_PARAM_VALUE.inWidth27 { PARAM_VALUE.inWidth27 } {
	# Procedure called to update inWidth27 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth27 { PARAM_VALUE.inWidth27 } {
	# Procedure called to validate inWidth27
	return true
}

proc update_PARAM_VALUE.inWidth28 { PARAM_VALUE.inWidth28 } {
	# Procedure called to update inWidth28 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth28 { PARAM_VALUE.inWidth28 } {
	# Procedure called to validate inWidth28
	return true
}

proc update_PARAM_VALUE.inWidth29 { PARAM_VALUE.inWidth29 } {
	# Procedure called to update inWidth29 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth29 { PARAM_VALUE.inWidth29 } {
	# Procedure called to validate inWidth29
	return true
}

proc update_PARAM_VALUE.inWidth3 { PARAM_VALUE.inWidth3 } {
	# Procedure called to update inWidth3 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth3 { PARAM_VALUE.inWidth3 } {
	# Procedure called to validate inWidth3
	return true
}

proc update_PARAM_VALUE.inWidth30 { PARAM_VALUE.inWidth30 } {
	# Procedure called to update inWidth30 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth30 { PARAM_VALUE.inWidth30 } {
	# Procedure called to validate inWidth30
	return true
}

proc update_PARAM_VALUE.inWidth31 { PARAM_VALUE.inWidth31 } {
	# Procedure called to update inWidth31 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth31 { PARAM_VALUE.inWidth31 } {
	# Procedure called to validate inWidth31
	return true
}

proc update_PARAM_VALUE.inWidth4 { PARAM_VALUE.inWidth4 } {
	# Procedure called to update inWidth4 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth4 { PARAM_VALUE.inWidth4 } {
	# Procedure called to validate inWidth4
	return true
}

proc update_PARAM_VALUE.inWidth5 { PARAM_VALUE.inWidth5 } {
	# Procedure called to update inWidth5 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth5 { PARAM_VALUE.inWidth5 } {
	# Procedure called to validate inWidth5
	return true
}

proc update_PARAM_VALUE.inWidth6 { PARAM_VALUE.inWidth6 } {
	# Procedure called to update inWidth6 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth6 { PARAM_VALUE.inWidth6 } {
	# Procedure called to validate inWidth6
	return true
}

proc update_PARAM_VALUE.inWidth7 { PARAM_VALUE.inWidth7 } {
	# Procedure called to update inWidth7 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth7 { PARAM_VALUE.inWidth7 } {
	# Procedure called to validate inWidth7
	return true
}

proc update_PARAM_VALUE.inWidth8 { PARAM_VALUE.inWidth8 } {
	# Procedure called to update inWidth8 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth8 { PARAM_VALUE.inWidth8 } {
	# Procedure called to validate inWidth8
	return true
}

proc update_PARAM_VALUE.inWidth9 { PARAM_VALUE.inWidth9 } {
	# Procedure called to update inWidth9 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth9 { PARAM_VALUE.inWidth9 } {
	# Procedure called to validate inWidth9
	return true
}

proc update_PARAM_VALUE.outWidth { PARAM_VALUE.outWidth } {
	# Procedure called to update outWidth when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth { PARAM_VALUE.outWidth } {
	# Procedure called to validate outWidth
	return true
}


proc update_MODELPARAM_VALUE.inWidth0 { MODELPARAM_VALUE.inWidth0 PARAM_VALUE.inWidth0 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth0}] ${MODELPARAM_VALUE.inWidth0}
}

proc update_MODELPARAM_VALUE.inWidth1 { MODELPARAM_VALUE.inWidth1 PARAM_VALUE.inWidth1 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth1}] ${MODELPARAM_VALUE.inWidth1}
}

proc update_MODELPARAM_VALUE.inWidth2 { MODELPARAM_VALUE.inWidth2 PARAM_VALUE.inWidth2 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth2}] ${MODELPARAM_VALUE.inWidth2}
}

proc update_MODELPARAM_VALUE.inWidth3 { MODELPARAM_VALUE.inWidth3 PARAM_VALUE.inWidth3 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth3}] ${MODELPARAM_VALUE.inWidth3}
}

proc update_MODELPARAM_VALUE.inWidth4 { MODELPARAM_VALUE.inWidth4 PARAM_VALUE.inWidth4 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth4}] ${MODELPARAM_VALUE.inWidth4}
}

proc update_MODELPARAM_VALUE.inWidth5 { MODELPARAM_VALUE.inWidth5 PARAM_VALUE.inWidth5 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth5}] ${MODELPARAM_VALUE.inWidth5}
}

proc update_MODELPARAM_VALUE.inWidth6 { MODELPARAM_VALUE.inWidth6 PARAM_VALUE.inWidth6 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth6}] ${MODELPARAM_VALUE.inWidth6}
}

proc update_MODELPARAM_VALUE.inWidth7 { MODELPARAM_VALUE.inWidth7 PARAM_VALUE.inWidth7 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth7}] ${MODELPARAM_VALUE.inWidth7}
}

proc update_MODELPARAM_VALUE.inWidth8 { MODELPARAM_VALUE.inWidth8 PARAM_VALUE.inWidth8 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth8}] ${MODELPARAM_VALUE.inWidth8}
}

proc update_MODELPARAM_VALUE.inWidth9 { MODELPARAM_VALUE.inWidth9 PARAM_VALUE.inWidth9 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth9}] ${MODELPARAM_VALUE.inWidth9}
}

proc update_MODELPARAM_VALUE.inWidth10 { MODELPARAM_VALUE.inWidth10 PARAM_VALUE.inWidth10 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth10}] ${MODELPARAM_VALUE.inWidth10}
}

proc update_MODELPARAM_VALUE.inWidth11 { MODELPARAM_VALUE.inWidth11 PARAM_VALUE.inWidth11 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth11}] ${MODELPARAM_VALUE.inWidth11}
}

proc update_MODELPARAM_VALUE.inWidth12 { MODELPARAM_VALUE.inWidth12 PARAM_VALUE.inWidth12 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth12}] ${MODELPARAM_VALUE.inWidth12}
}

proc update_MODELPARAM_VALUE.inWidth13 { MODELPARAM_VALUE.inWidth13 PARAM_VALUE.inWidth13 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth13}] ${MODELPARAM_VALUE.inWidth13}
}

proc update_MODELPARAM_VALUE.inWidth14 { MODELPARAM_VALUE.inWidth14 PARAM_VALUE.inWidth14 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth14}] ${MODELPARAM_VALUE.inWidth14}
}

proc update_MODELPARAM_VALUE.inWidth15 { MODELPARAM_VALUE.inWidth15 PARAM_VALUE.inWidth15 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth15}] ${MODELPARAM_VALUE.inWidth15}
}

proc update_MODELPARAM_VALUE.inWidth16 { MODELPARAM_VALUE.inWidth16 PARAM_VALUE.inWidth16 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth16}] ${MODELPARAM_VALUE.inWidth16}
}

proc update_MODELPARAM_VALUE.inWidth17 { MODELPARAM_VALUE.inWidth17 PARAM_VALUE.inWidth17 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth17}] ${MODELPARAM_VALUE.inWidth17}
}

proc update_MODELPARAM_VALUE.inWidth18 { MODELPARAM_VALUE.inWidth18 PARAM_VALUE.inWidth18 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth18}] ${MODELPARAM_VALUE.inWidth18}
}

proc update_MODELPARAM_VALUE.inWidth19 { MODELPARAM_VALUE.inWidth19 PARAM_VALUE.inWidth19 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth19}] ${MODELPARAM_VALUE.inWidth19}
}

proc update_MODELPARAM_VALUE.inWidth20 { MODELPARAM_VALUE.inWidth20 PARAM_VALUE.inWidth20 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth20}] ${MODELPARAM_VALUE.inWidth20}
}

proc update_MODELPARAM_VALUE.inWidth21 { MODELPARAM_VALUE.inWidth21 PARAM_VALUE.inWidth21 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth21}] ${MODELPARAM_VALUE.inWidth21}
}

proc update_MODELPARAM_VALUE.inWidth22 { MODELPARAM_VALUE.inWidth22 PARAM_VALUE.inWidth22 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth22}] ${MODELPARAM_VALUE.inWidth22}
}

proc update_MODELPARAM_VALUE.inWidth23 { MODELPARAM_VALUE.inWidth23 PARAM_VALUE.inWidth23 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth23}] ${MODELPARAM_VALUE.inWidth23}
}

proc update_MODELPARAM_VALUE.inWidth24 { MODELPARAM_VALUE.inWidth24 PARAM_VALUE.inWidth24 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth24}] ${MODELPARAM_VALUE.inWidth24}
}

proc update_MODELPARAM_VALUE.inWidth25 { MODELPARAM_VALUE.inWidth25 PARAM_VALUE.inWidth25 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth25}] ${MODELPARAM_VALUE.inWidth25}
}

proc update_MODELPARAM_VALUE.inWidth26 { MODELPARAM_VALUE.inWidth26 PARAM_VALUE.inWidth26 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth26}] ${MODELPARAM_VALUE.inWidth26}
}

proc update_MODELPARAM_VALUE.inWidth27 { MODELPARAM_VALUE.inWidth27 PARAM_VALUE.inWidth27 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth27}] ${MODELPARAM_VALUE.inWidth27}
}

proc update_MODELPARAM_VALUE.inWidth28 { MODELPARAM_VALUE.inWidth28 PARAM_VALUE.inWidth28 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth28}] ${MODELPARAM_VALUE.inWidth28}
}

proc update_MODELPARAM_VALUE.inWidth29 { MODELPARAM_VALUE.inWidth29 PARAM_VALUE.inWidth29 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth29}] ${MODELPARAM_VALUE.inWidth29}
}

proc update_MODELPARAM_VALUE.inWidth30 { MODELPARAM_VALUE.inWidth30 PARAM_VALUE.inWidth30 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth30}] ${MODELPARAM_VALUE.inWidth30}
}

proc update_MODELPARAM_VALUE.inWidth31 { MODELPARAM_VALUE.inWidth31 PARAM_VALUE.inWidth31 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth31}] ${MODELPARAM_VALUE.inWidth31}
}

proc update_MODELPARAM_VALUE.outWidth { MODELPARAM_VALUE.outWidth PARAM_VALUE.outWidth } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth}] ${MODELPARAM_VALUE.outWidth}
}

