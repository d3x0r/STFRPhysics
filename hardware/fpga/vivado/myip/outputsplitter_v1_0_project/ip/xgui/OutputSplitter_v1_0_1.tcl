# Definitional proc to organize widgets for parameters.
proc init_gui { IPINST } {
  ipgui::add_param $IPINST -name "Component_Name"
  set inWidth [ipgui::add_param $IPINST -name "inWidth"]
  set_property tooltip {Width of th input BUS} ${inWidth}
  #Adding Page
  set Output_0-15_Enable [ipgui::add_page $IPINST -name "Output 0-15 Enable"]
  ipgui::add_param $IPINST -name "enable00" -parent ${Output_0-15_Enable}
  ipgui::add_param $IPINST -name "enable01" -parent ${Output_0-15_Enable}
  ipgui::add_param $IPINST -name "enable02" -parent ${Output_0-15_Enable}
  ipgui::add_param $IPINST -name "enable03" -parent ${Output_0-15_Enable}
  ipgui::add_param $IPINST -name "enable04" -parent ${Output_0-15_Enable}
  ipgui::add_param $IPINST -name "enable05" -parent ${Output_0-15_Enable}
  ipgui::add_param $IPINST -name "enable06" -parent ${Output_0-15_Enable}
  ipgui::add_param $IPINST -name "enable07" -parent ${Output_0-15_Enable}
  ipgui::add_param $IPINST -name "enable08" -parent ${Output_0-15_Enable}
  ipgui::add_param $IPINST -name "enable09" -parent ${Output_0-15_Enable}
  ipgui::add_param $IPINST -name "enable10" -parent ${Output_0-15_Enable}
  ipgui::add_param $IPINST -name "enable11" -parent ${Output_0-15_Enable}
  ipgui::add_param $IPINST -name "enable12" -parent ${Output_0-15_Enable}
  ipgui::add_param $IPINST -name "enable13" -parent ${Output_0-15_Enable}
  ipgui::add_param $IPINST -name "enable14" -parent ${Output_0-15_Enable}
  ipgui::add_param $IPINST -name "enable15" -parent ${Output_0-15_Enable}

  #Adding Page
  set Output_16-31_Enable [ipgui::add_page $IPINST -name "Output 16-31 Enable"]
  set_property tooltip {Toggles to enable the port} ${Output_16-31_Enable}
  ipgui::add_param $IPINST -name "enable16" -parent ${Output_16-31_Enable}
  ipgui::add_param $IPINST -name "enable17" -parent ${Output_16-31_Enable}
  ipgui::add_param $IPINST -name "enable18" -parent ${Output_16-31_Enable}
  ipgui::add_param $IPINST -name "enable19" -parent ${Output_16-31_Enable}
  ipgui::add_param $IPINST -name "enable20" -parent ${Output_16-31_Enable}
  ipgui::add_param $IPINST -name "enable21" -parent ${Output_16-31_Enable}
  ipgui::add_param $IPINST -name "enable22" -parent ${Output_16-31_Enable}
  ipgui::add_param $IPINST -name "enable23" -parent ${Output_16-31_Enable}
  ipgui::add_param $IPINST -name "enable24" -parent ${Output_16-31_Enable}
  ipgui::add_param $IPINST -name "enable25" -parent ${Output_16-31_Enable}
  ipgui::add_param $IPINST -name "enable26" -parent ${Output_16-31_Enable}
  ipgui::add_param $IPINST -name "enable27" -parent ${Output_16-31_Enable}
  ipgui::add_param $IPINST -name "enable28" -parent ${Output_16-31_Enable}
  ipgui::add_param $IPINST -name "enable29" -parent ${Output_16-31_Enable}
  ipgui::add_param $IPINST -name "enable30" -parent ${Output_16-31_Enable}
  ipgui::add_param $IPINST -name "enable31" -parent ${Output_16-31_Enable}

  #Adding Page
  set Page_0 [ipgui::add_page $IPINST -name "Page 0" -display_name {Output 0-15 Widths}]
  set_property tooltip {First page of output signal widths} ${Page_0}
  ipgui::add_param $IPINST -name "outWidth0" -parent ${Page_0}
  ipgui::add_param $IPINST -name "outWidth1" -parent ${Page_0}
  ipgui::add_param $IPINST -name "outWidth2" -parent ${Page_0}
  ipgui::add_param $IPINST -name "outWidth3" -parent ${Page_0}
  ipgui::add_param $IPINST -name "outWidth4" -parent ${Page_0}
  ipgui::add_param $IPINST -name "outWidth5" -parent ${Page_0}
  ipgui::add_param $IPINST -name "outWidth6" -parent ${Page_0}
  ipgui::add_param $IPINST -name "outWidth7" -parent ${Page_0}
  ipgui::add_param $IPINST -name "outWidth8" -parent ${Page_0}
  ipgui::add_param $IPINST -name "outWidth9" -parent ${Page_0}
  ipgui::add_param $IPINST -name "outWidth10" -parent ${Page_0}
  ipgui::add_param $IPINST -name "outWidth11" -parent ${Page_0}
  ipgui::add_param $IPINST -name "outWidth12" -parent ${Page_0}
  ipgui::add_param $IPINST -name "outWidth13" -parent ${Page_0}
  ipgui::add_param $IPINST -name "outWidth14" -parent ${Page_0}
  ipgui::add_param $IPINST -name "outWidth15" -parent ${Page_0}

  #Adding Page
  set Output_16-31 [ipgui::add_page $IPINST -name "Output 16-31" -display_name {Output 16-31 Widths}]
  set_property tooltip {Second page of output signals} ${Output_16-31}
  ipgui::add_param $IPINST -name "outWidth16" -parent ${Output_16-31}
  ipgui::add_param $IPINST -name "outWidth17" -parent ${Output_16-31}
  ipgui::add_param $IPINST -name "outWidth18" -parent ${Output_16-31}
  ipgui::add_param $IPINST -name "outWidth19" -parent ${Output_16-31}
  ipgui::add_param $IPINST -name "outWidth20" -parent ${Output_16-31}
  ipgui::add_param $IPINST -name "outWidth21" -parent ${Output_16-31}
  ipgui::add_param $IPINST -name "outWidth22" -parent ${Output_16-31}
  ipgui::add_param $IPINST -name "outWidth23" -parent ${Output_16-31}
  ipgui::add_param $IPINST -name "outWidth24" -parent ${Output_16-31}
  ipgui::add_param $IPINST -name "outWidth25" -parent ${Output_16-31}
  ipgui::add_param $IPINST -name "outWidth26" -parent ${Output_16-31}
  ipgui::add_param $IPINST -name "outWidth27" -parent ${Output_16-31}
  ipgui::add_param $IPINST -name "outWidth28" -parent ${Output_16-31}
  ipgui::add_param $IPINST -name "outWidth29" -parent ${Output_16-31}
  ipgui::add_param $IPINST -name "outWidth30" -parent ${Output_16-31}
  ipgui::add_param $IPINST -name "outWidth31" -parent ${Output_16-31}


}

proc update_PARAM_VALUE.enable00 { PARAM_VALUE.enable00 } {
	# Procedure called to update enable00 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.enable00 { PARAM_VALUE.enable00 } {
	# Procedure called to validate enable00
	return true
}

proc update_PARAM_VALUE.enable01 { PARAM_VALUE.enable01 } {
	# Procedure called to update enable01 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.enable01 { PARAM_VALUE.enable01 } {
	# Procedure called to validate enable01
	return true
}

proc update_PARAM_VALUE.enable02 { PARAM_VALUE.enable02 } {
	# Procedure called to update enable02 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.enable02 { PARAM_VALUE.enable02 } {
	# Procedure called to validate enable02
	return true
}

proc update_PARAM_VALUE.enable03 { PARAM_VALUE.enable03 } {
	# Procedure called to update enable03 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.enable03 { PARAM_VALUE.enable03 } {
	# Procedure called to validate enable03
	return true
}

proc update_PARAM_VALUE.enable04 { PARAM_VALUE.enable04 } {
	# Procedure called to update enable04 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.enable04 { PARAM_VALUE.enable04 } {
	# Procedure called to validate enable04
	return true
}

proc update_PARAM_VALUE.enable05 { PARAM_VALUE.enable05 } {
	# Procedure called to update enable05 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.enable05 { PARAM_VALUE.enable05 } {
	# Procedure called to validate enable05
	return true
}

proc update_PARAM_VALUE.enable06 { PARAM_VALUE.enable06 } {
	# Procedure called to update enable06 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.enable06 { PARAM_VALUE.enable06 } {
	# Procedure called to validate enable06
	return true
}

proc update_PARAM_VALUE.enable07 { PARAM_VALUE.enable07 } {
	# Procedure called to update enable07 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.enable07 { PARAM_VALUE.enable07 } {
	# Procedure called to validate enable07
	return true
}

proc update_PARAM_VALUE.enable08 { PARAM_VALUE.enable08 } {
	# Procedure called to update enable08 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.enable08 { PARAM_VALUE.enable08 } {
	# Procedure called to validate enable08
	return true
}

proc update_PARAM_VALUE.enable09 { PARAM_VALUE.enable09 } {
	# Procedure called to update enable09 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.enable09 { PARAM_VALUE.enable09 } {
	# Procedure called to validate enable09
	return true
}

proc update_PARAM_VALUE.enable10 { PARAM_VALUE.enable10 } {
	# Procedure called to update enable10 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.enable10 { PARAM_VALUE.enable10 } {
	# Procedure called to validate enable10
	return true
}

proc update_PARAM_VALUE.enable11 { PARAM_VALUE.enable11 } {
	# Procedure called to update enable11 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.enable11 { PARAM_VALUE.enable11 } {
	# Procedure called to validate enable11
	return true
}

proc update_PARAM_VALUE.enable12 { PARAM_VALUE.enable12 } {
	# Procedure called to update enable12 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.enable12 { PARAM_VALUE.enable12 } {
	# Procedure called to validate enable12
	return true
}

proc update_PARAM_VALUE.enable13 { PARAM_VALUE.enable13 } {
	# Procedure called to update enable13 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.enable13 { PARAM_VALUE.enable13 } {
	# Procedure called to validate enable13
	return true
}

proc update_PARAM_VALUE.enable14 { PARAM_VALUE.enable14 } {
	# Procedure called to update enable14 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.enable14 { PARAM_VALUE.enable14 } {
	# Procedure called to validate enable14
	return true
}

proc update_PARAM_VALUE.enable15 { PARAM_VALUE.enable15 } {
	# Procedure called to update enable15 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.enable15 { PARAM_VALUE.enable15 } {
	# Procedure called to validate enable15
	return true
}

proc update_PARAM_VALUE.enable16 { PARAM_VALUE.enable16 } {
	# Procedure called to update enable16 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.enable16 { PARAM_VALUE.enable16 } {
	# Procedure called to validate enable16
	return true
}

proc update_PARAM_VALUE.enable17 { PARAM_VALUE.enable17 } {
	# Procedure called to update enable17 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.enable17 { PARAM_VALUE.enable17 } {
	# Procedure called to validate enable17
	return true
}

proc update_PARAM_VALUE.enable18 { PARAM_VALUE.enable18 } {
	# Procedure called to update enable18 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.enable18 { PARAM_VALUE.enable18 } {
	# Procedure called to validate enable18
	return true
}

proc update_PARAM_VALUE.enable19 { PARAM_VALUE.enable19 } {
	# Procedure called to update enable19 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.enable19 { PARAM_VALUE.enable19 } {
	# Procedure called to validate enable19
	return true
}

proc update_PARAM_VALUE.enable20 { PARAM_VALUE.enable20 } {
	# Procedure called to update enable20 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.enable20 { PARAM_VALUE.enable20 } {
	# Procedure called to validate enable20
	return true
}

proc update_PARAM_VALUE.enable21 { PARAM_VALUE.enable21 } {
	# Procedure called to update enable21 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.enable21 { PARAM_VALUE.enable21 } {
	# Procedure called to validate enable21
	return true
}

proc update_PARAM_VALUE.enable22 { PARAM_VALUE.enable22 } {
	# Procedure called to update enable22 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.enable22 { PARAM_VALUE.enable22 } {
	# Procedure called to validate enable22
	return true
}

proc update_PARAM_VALUE.enable23 { PARAM_VALUE.enable23 } {
	# Procedure called to update enable23 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.enable23 { PARAM_VALUE.enable23 } {
	# Procedure called to validate enable23
	return true
}

proc update_PARAM_VALUE.enable24 { PARAM_VALUE.enable24 } {
	# Procedure called to update enable24 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.enable24 { PARAM_VALUE.enable24 } {
	# Procedure called to validate enable24
	return true
}

proc update_PARAM_VALUE.enable25 { PARAM_VALUE.enable25 } {
	# Procedure called to update enable25 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.enable25 { PARAM_VALUE.enable25 } {
	# Procedure called to validate enable25
	return true
}

proc update_PARAM_VALUE.enable26 { PARAM_VALUE.enable26 } {
	# Procedure called to update enable26 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.enable26 { PARAM_VALUE.enable26 } {
	# Procedure called to validate enable26
	return true
}

proc update_PARAM_VALUE.enable27 { PARAM_VALUE.enable27 } {
	# Procedure called to update enable27 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.enable27 { PARAM_VALUE.enable27 } {
	# Procedure called to validate enable27
	return true
}

proc update_PARAM_VALUE.enable28 { PARAM_VALUE.enable28 } {
	# Procedure called to update enable28 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.enable28 { PARAM_VALUE.enable28 } {
	# Procedure called to validate enable28
	return true
}

proc update_PARAM_VALUE.enable29 { PARAM_VALUE.enable29 } {
	# Procedure called to update enable29 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.enable29 { PARAM_VALUE.enable29 } {
	# Procedure called to validate enable29
	return true
}

proc update_PARAM_VALUE.enable30 { PARAM_VALUE.enable30 } {
	# Procedure called to update enable30 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.enable30 { PARAM_VALUE.enable30 } {
	# Procedure called to validate enable30
	return true
}

proc update_PARAM_VALUE.enable31 { PARAM_VALUE.enable31 } {
	# Procedure called to update enable31 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.enable31 { PARAM_VALUE.enable31 } {
	# Procedure called to validate enable31
	return true
}

proc update_PARAM_VALUE.inWidth { PARAM_VALUE.inWidth } {
	# Procedure called to update inWidth when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.inWidth { PARAM_VALUE.inWidth } {
	# Procedure called to validate inWidth
	return true
}

proc update_PARAM_VALUE.outWidth0 { PARAM_VALUE.outWidth0 } {
	# Procedure called to update outWidth0 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth0 { PARAM_VALUE.outWidth0 } {
	# Procedure called to validate outWidth0
	return true
}

proc update_PARAM_VALUE.outWidth1 { PARAM_VALUE.outWidth1 } {
	# Procedure called to update outWidth1 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth1 { PARAM_VALUE.outWidth1 } {
	# Procedure called to validate outWidth1
	return true
}

proc update_PARAM_VALUE.outWidth10 { PARAM_VALUE.outWidth10 } {
	# Procedure called to update outWidth10 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth10 { PARAM_VALUE.outWidth10 } {
	# Procedure called to validate outWidth10
	return true
}

proc update_PARAM_VALUE.outWidth11 { PARAM_VALUE.outWidth11 } {
	# Procedure called to update outWidth11 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth11 { PARAM_VALUE.outWidth11 } {
	# Procedure called to validate outWidth11
	return true
}

proc update_PARAM_VALUE.outWidth12 { PARAM_VALUE.outWidth12 } {
	# Procedure called to update outWidth12 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth12 { PARAM_VALUE.outWidth12 } {
	# Procedure called to validate outWidth12
	return true
}

proc update_PARAM_VALUE.outWidth13 { PARAM_VALUE.outWidth13 } {
	# Procedure called to update outWidth13 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth13 { PARAM_VALUE.outWidth13 } {
	# Procedure called to validate outWidth13
	return true
}

proc update_PARAM_VALUE.outWidth14 { PARAM_VALUE.outWidth14 } {
	# Procedure called to update outWidth14 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth14 { PARAM_VALUE.outWidth14 } {
	# Procedure called to validate outWidth14
	return true
}

proc update_PARAM_VALUE.outWidth15 { PARAM_VALUE.outWidth15 } {
	# Procedure called to update outWidth15 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth15 { PARAM_VALUE.outWidth15 } {
	# Procedure called to validate outWidth15
	return true
}

proc update_PARAM_VALUE.outWidth16 { PARAM_VALUE.outWidth16 } {
	# Procedure called to update outWidth16 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth16 { PARAM_VALUE.outWidth16 } {
	# Procedure called to validate outWidth16
	return true
}

proc update_PARAM_VALUE.outWidth17 { PARAM_VALUE.outWidth17 } {
	# Procedure called to update outWidth17 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth17 { PARAM_VALUE.outWidth17 } {
	# Procedure called to validate outWidth17
	return true
}

proc update_PARAM_VALUE.outWidth18 { PARAM_VALUE.outWidth18 } {
	# Procedure called to update outWidth18 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth18 { PARAM_VALUE.outWidth18 } {
	# Procedure called to validate outWidth18
	return true
}

proc update_PARAM_VALUE.outWidth19 { PARAM_VALUE.outWidth19 } {
	# Procedure called to update outWidth19 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth19 { PARAM_VALUE.outWidth19 } {
	# Procedure called to validate outWidth19
	return true
}

proc update_PARAM_VALUE.outWidth2 { PARAM_VALUE.outWidth2 } {
	# Procedure called to update outWidth2 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth2 { PARAM_VALUE.outWidth2 } {
	# Procedure called to validate outWidth2
	return true
}

proc update_PARAM_VALUE.outWidth20 { PARAM_VALUE.outWidth20 } {
	# Procedure called to update outWidth20 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth20 { PARAM_VALUE.outWidth20 } {
	# Procedure called to validate outWidth20
	return true
}

proc update_PARAM_VALUE.outWidth21 { PARAM_VALUE.outWidth21 } {
	# Procedure called to update outWidth21 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth21 { PARAM_VALUE.outWidth21 } {
	# Procedure called to validate outWidth21
	return true
}

proc update_PARAM_VALUE.outWidth22 { PARAM_VALUE.outWidth22 } {
	# Procedure called to update outWidth22 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth22 { PARAM_VALUE.outWidth22 } {
	# Procedure called to validate outWidth22
	return true
}

proc update_PARAM_VALUE.outWidth23 { PARAM_VALUE.outWidth23 } {
	# Procedure called to update outWidth23 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth23 { PARAM_VALUE.outWidth23 } {
	# Procedure called to validate outWidth23
	return true
}

proc update_PARAM_VALUE.outWidth24 { PARAM_VALUE.outWidth24 } {
	# Procedure called to update outWidth24 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth24 { PARAM_VALUE.outWidth24 } {
	# Procedure called to validate outWidth24
	return true
}

proc update_PARAM_VALUE.outWidth25 { PARAM_VALUE.outWidth25 } {
	# Procedure called to update outWidth25 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth25 { PARAM_VALUE.outWidth25 } {
	# Procedure called to validate outWidth25
	return true
}

proc update_PARAM_VALUE.outWidth26 { PARAM_VALUE.outWidth26 } {
	# Procedure called to update outWidth26 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth26 { PARAM_VALUE.outWidth26 } {
	# Procedure called to validate outWidth26
	return true
}

proc update_PARAM_VALUE.outWidth27 { PARAM_VALUE.outWidth27 } {
	# Procedure called to update outWidth27 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth27 { PARAM_VALUE.outWidth27 } {
	# Procedure called to validate outWidth27
	return true
}

proc update_PARAM_VALUE.outWidth28 { PARAM_VALUE.outWidth28 } {
	# Procedure called to update outWidth28 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth28 { PARAM_VALUE.outWidth28 } {
	# Procedure called to validate outWidth28
	return true
}

proc update_PARAM_VALUE.outWidth29 { PARAM_VALUE.outWidth29 } {
	# Procedure called to update outWidth29 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth29 { PARAM_VALUE.outWidth29 } {
	# Procedure called to validate outWidth29
	return true
}

proc update_PARAM_VALUE.outWidth3 { PARAM_VALUE.outWidth3 } {
	# Procedure called to update outWidth3 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth3 { PARAM_VALUE.outWidth3 } {
	# Procedure called to validate outWidth3
	return true
}

proc update_PARAM_VALUE.outWidth30 { PARAM_VALUE.outWidth30 } {
	# Procedure called to update outWidth30 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth30 { PARAM_VALUE.outWidth30 } {
	# Procedure called to validate outWidth30
	return true
}

proc update_PARAM_VALUE.outWidth31 { PARAM_VALUE.outWidth31 } {
	# Procedure called to update outWidth31 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth31 { PARAM_VALUE.outWidth31 } {
	# Procedure called to validate outWidth31
	return true
}

proc update_PARAM_VALUE.outWidth4 { PARAM_VALUE.outWidth4 } {
	# Procedure called to update outWidth4 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth4 { PARAM_VALUE.outWidth4 } {
	# Procedure called to validate outWidth4
	return true
}

proc update_PARAM_VALUE.outWidth5 { PARAM_VALUE.outWidth5 } {
	# Procedure called to update outWidth5 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth5 { PARAM_VALUE.outWidth5 } {
	# Procedure called to validate outWidth5
	return true
}

proc update_PARAM_VALUE.outWidth6 { PARAM_VALUE.outWidth6 } {
	# Procedure called to update outWidth6 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth6 { PARAM_VALUE.outWidth6 } {
	# Procedure called to validate outWidth6
	return true
}

proc update_PARAM_VALUE.outWidth7 { PARAM_VALUE.outWidth7 } {
	# Procedure called to update outWidth7 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth7 { PARAM_VALUE.outWidth7 } {
	# Procedure called to validate outWidth7
	return true
}

proc update_PARAM_VALUE.outWidth8 { PARAM_VALUE.outWidth8 } {
	# Procedure called to update outWidth8 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth8 { PARAM_VALUE.outWidth8 } {
	# Procedure called to validate outWidth8
	return true
}

proc update_PARAM_VALUE.outWidth9 { PARAM_VALUE.outWidth9 } {
	# Procedure called to update outWidth9 when any of the dependent parameters in the arguments change
}

proc validate_PARAM_VALUE.outWidth9 { PARAM_VALUE.outWidth9 } {
	# Procedure called to validate outWidth9
	return true
}


proc update_MODELPARAM_VALUE.inWidth { MODELPARAM_VALUE.inWidth PARAM_VALUE.inWidth } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.inWidth}] ${MODELPARAM_VALUE.inWidth}
}

proc update_MODELPARAM_VALUE.outWidth0 { MODELPARAM_VALUE.outWidth0 PARAM_VALUE.outWidth0 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth0}] ${MODELPARAM_VALUE.outWidth0}
}

proc update_MODELPARAM_VALUE.outWidth1 { MODELPARAM_VALUE.outWidth1 PARAM_VALUE.outWidth1 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth1}] ${MODELPARAM_VALUE.outWidth1}
}

proc update_MODELPARAM_VALUE.outWidth2 { MODELPARAM_VALUE.outWidth2 PARAM_VALUE.outWidth2 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth2}] ${MODELPARAM_VALUE.outWidth2}
}

proc update_MODELPARAM_VALUE.outWidth3 { MODELPARAM_VALUE.outWidth3 PARAM_VALUE.outWidth3 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth3}] ${MODELPARAM_VALUE.outWidth3}
}

proc update_MODELPARAM_VALUE.outWidth4 { MODELPARAM_VALUE.outWidth4 PARAM_VALUE.outWidth4 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth4}] ${MODELPARAM_VALUE.outWidth4}
}

proc update_MODELPARAM_VALUE.outWidth5 { MODELPARAM_VALUE.outWidth5 PARAM_VALUE.outWidth5 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth5}] ${MODELPARAM_VALUE.outWidth5}
}

proc update_MODELPARAM_VALUE.outWidth6 { MODELPARAM_VALUE.outWidth6 PARAM_VALUE.outWidth6 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth6}] ${MODELPARAM_VALUE.outWidth6}
}

proc update_MODELPARAM_VALUE.outWidth7 { MODELPARAM_VALUE.outWidth7 PARAM_VALUE.outWidth7 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth7}] ${MODELPARAM_VALUE.outWidth7}
}

proc update_MODELPARAM_VALUE.outWidth8 { MODELPARAM_VALUE.outWidth8 PARAM_VALUE.outWidth8 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth8}] ${MODELPARAM_VALUE.outWidth8}
}

proc update_MODELPARAM_VALUE.outWidth9 { MODELPARAM_VALUE.outWidth9 PARAM_VALUE.outWidth9 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth9}] ${MODELPARAM_VALUE.outWidth9}
}

proc update_MODELPARAM_VALUE.outWidth10 { MODELPARAM_VALUE.outWidth10 PARAM_VALUE.outWidth10 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth10}] ${MODELPARAM_VALUE.outWidth10}
}

proc update_MODELPARAM_VALUE.outWidth11 { MODELPARAM_VALUE.outWidth11 PARAM_VALUE.outWidth11 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth11}] ${MODELPARAM_VALUE.outWidth11}
}

proc update_MODELPARAM_VALUE.outWidth12 { MODELPARAM_VALUE.outWidth12 PARAM_VALUE.outWidth12 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth12}] ${MODELPARAM_VALUE.outWidth12}
}

proc update_MODELPARAM_VALUE.outWidth13 { MODELPARAM_VALUE.outWidth13 PARAM_VALUE.outWidth13 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth13}] ${MODELPARAM_VALUE.outWidth13}
}

proc update_MODELPARAM_VALUE.outWidth14 { MODELPARAM_VALUE.outWidth14 PARAM_VALUE.outWidth14 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth14}] ${MODELPARAM_VALUE.outWidth14}
}

proc update_MODELPARAM_VALUE.outWidth15 { MODELPARAM_VALUE.outWidth15 PARAM_VALUE.outWidth15 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth15}] ${MODELPARAM_VALUE.outWidth15}
}

proc update_MODELPARAM_VALUE.outWidth16 { MODELPARAM_VALUE.outWidth16 PARAM_VALUE.outWidth16 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth16}] ${MODELPARAM_VALUE.outWidth16}
}

proc update_MODELPARAM_VALUE.outWidth17 { MODELPARAM_VALUE.outWidth17 PARAM_VALUE.outWidth17 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth17}] ${MODELPARAM_VALUE.outWidth17}
}

proc update_MODELPARAM_VALUE.outWidth18 { MODELPARAM_VALUE.outWidth18 PARAM_VALUE.outWidth18 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth18}] ${MODELPARAM_VALUE.outWidth18}
}

proc update_MODELPARAM_VALUE.outWidth19 { MODELPARAM_VALUE.outWidth19 PARAM_VALUE.outWidth19 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth19}] ${MODELPARAM_VALUE.outWidth19}
}

proc update_MODELPARAM_VALUE.outWidth20 { MODELPARAM_VALUE.outWidth20 PARAM_VALUE.outWidth20 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth20}] ${MODELPARAM_VALUE.outWidth20}
}

proc update_MODELPARAM_VALUE.outWidth21 { MODELPARAM_VALUE.outWidth21 PARAM_VALUE.outWidth21 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth21}] ${MODELPARAM_VALUE.outWidth21}
}

proc update_MODELPARAM_VALUE.outWidth22 { MODELPARAM_VALUE.outWidth22 PARAM_VALUE.outWidth22 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth22}] ${MODELPARAM_VALUE.outWidth22}
}

proc update_MODELPARAM_VALUE.outWidth23 { MODELPARAM_VALUE.outWidth23 PARAM_VALUE.outWidth23 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth23}] ${MODELPARAM_VALUE.outWidth23}
}

proc update_MODELPARAM_VALUE.outWidth24 { MODELPARAM_VALUE.outWidth24 PARAM_VALUE.outWidth24 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth24}] ${MODELPARAM_VALUE.outWidth24}
}

proc update_MODELPARAM_VALUE.outWidth25 { MODELPARAM_VALUE.outWidth25 PARAM_VALUE.outWidth25 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth25}] ${MODELPARAM_VALUE.outWidth25}
}

proc update_MODELPARAM_VALUE.outWidth26 { MODELPARAM_VALUE.outWidth26 PARAM_VALUE.outWidth26 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth26}] ${MODELPARAM_VALUE.outWidth26}
}

proc update_MODELPARAM_VALUE.outWidth27 { MODELPARAM_VALUE.outWidth27 PARAM_VALUE.outWidth27 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth27}] ${MODELPARAM_VALUE.outWidth27}
}

proc update_MODELPARAM_VALUE.outWidth28 { MODELPARAM_VALUE.outWidth28 PARAM_VALUE.outWidth28 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth28}] ${MODELPARAM_VALUE.outWidth28}
}

proc update_MODELPARAM_VALUE.outWidth29 { MODELPARAM_VALUE.outWidth29 PARAM_VALUE.outWidth29 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth29}] ${MODELPARAM_VALUE.outWidth29}
}

proc update_MODELPARAM_VALUE.outWidth30 { MODELPARAM_VALUE.outWidth30 PARAM_VALUE.outWidth30 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth30}] ${MODELPARAM_VALUE.outWidth30}
}

proc update_MODELPARAM_VALUE.outWidth31 { MODELPARAM_VALUE.outWidth31 PARAM_VALUE.outWidth31 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.outWidth31}] ${MODELPARAM_VALUE.outWidth31}
}

proc update_MODELPARAM_VALUE.enable00 { MODELPARAM_VALUE.enable00 PARAM_VALUE.enable00 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.enable00}] ${MODELPARAM_VALUE.enable00}
}

proc update_MODELPARAM_VALUE.enable01 { MODELPARAM_VALUE.enable01 PARAM_VALUE.enable01 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.enable01}] ${MODELPARAM_VALUE.enable01}
}

proc update_MODELPARAM_VALUE.enable02 { MODELPARAM_VALUE.enable02 PARAM_VALUE.enable02 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.enable02}] ${MODELPARAM_VALUE.enable02}
}

proc update_MODELPARAM_VALUE.enable03 { MODELPARAM_VALUE.enable03 PARAM_VALUE.enable03 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.enable03}] ${MODELPARAM_VALUE.enable03}
}

proc update_MODELPARAM_VALUE.enable04 { MODELPARAM_VALUE.enable04 PARAM_VALUE.enable04 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.enable04}] ${MODELPARAM_VALUE.enable04}
}

proc update_MODELPARAM_VALUE.enable05 { MODELPARAM_VALUE.enable05 PARAM_VALUE.enable05 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.enable05}] ${MODELPARAM_VALUE.enable05}
}

proc update_MODELPARAM_VALUE.enable06 { MODELPARAM_VALUE.enable06 PARAM_VALUE.enable06 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.enable06}] ${MODELPARAM_VALUE.enable06}
}

proc update_MODELPARAM_VALUE.enable07 { MODELPARAM_VALUE.enable07 PARAM_VALUE.enable07 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.enable07}] ${MODELPARAM_VALUE.enable07}
}

proc update_MODELPARAM_VALUE.enable08 { MODELPARAM_VALUE.enable08 PARAM_VALUE.enable08 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.enable08}] ${MODELPARAM_VALUE.enable08}
}

proc update_MODELPARAM_VALUE.enable09 { MODELPARAM_VALUE.enable09 PARAM_VALUE.enable09 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.enable09}] ${MODELPARAM_VALUE.enable09}
}

proc update_MODELPARAM_VALUE.enable10 { MODELPARAM_VALUE.enable10 PARAM_VALUE.enable10 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.enable10}] ${MODELPARAM_VALUE.enable10}
}

proc update_MODELPARAM_VALUE.enable11 { MODELPARAM_VALUE.enable11 PARAM_VALUE.enable11 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.enable11}] ${MODELPARAM_VALUE.enable11}
}

proc update_MODELPARAM_VALUE.enable12 { MODELPARAM_VALUE.enable12 PARAM_VALUE.enable12 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.enable12}] ${MODELPARAM_VALUE.enable12}
}

proc update_MODELPARAM_VALUE.enable13 { MODELPARAM_VALUE.enable13 PARAM_VALUE.enable13 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.enable13}] ${MODELPARAM_VALUE.enable13}
}

proc update_MODELPARAM_VALUE.enable14 { MODELPARAM_VALUE.enable14 PARAM_VALUE.enable14 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.enable14}] ${MODELPARAM_VALUE.enable14}
}

proc update_MODELPARAM_VALUE.enable15 { MODELPARAM_VALUE.enable15 PARAM_VALUE.enable15 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.enable15}] ${MODELPARAM_VALUE.enable15}
}

proc update_MODELPARAM_VALUE.enable16 { MODELPARAM_VALUE.enable16 PARAM_VALUE.enable16 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.enable16}] ${MODELPARAM_VALUE.enable16}
}

proc update_MODELPARAM_VALUE.enable17 { MODELPARAM_VALUE.enable17 PARAM_VALUE.enable17 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.enable17}] ${MODELPARAM_VALUE.enable17}
}

proc update_MODELPARAM_VALUE.enable18 { MODELPARAM_VALUE.enable18 PARAM_VALUE.enable18 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.enable18}] ${MODELPARAM_VALUE.enable18}
}

proc update_MODELPARAM_VALUE.enable19 { MODELPARAM_VALUE.enable19 PARAM_VALUE.enable19 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.enable19}] ${MODELPARAM_VALUE.enable19}
}

proc update_MODELPARAM_VALUE.enable20 { MODELPARAM_VALUE.enable20 PARAM_VALUE.enable20 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.enable20}] ${MODELPARAM_VALUE.enable20}
}

proc update_MODELPARAM_VALUE.enable21 { MODELPARAM_VALUE.enable21 PARAM_VALUE.enable21 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.enable21}] ${MODELPARAM_VALUE.enable21}
}

proc update_MODELPARAM_VALUE.enable22 { MODELPARAM_VALUE.enable22 PARAM_VALUE.enable22 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.enable22}] ${MODELPARAM_VALUE.enable22}
}

proc update_MODELPARAM_VALUE.enable23 { MODELPARAM_VALUE.enable23 PARAM_VALUE.enable23 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.enable23}] ${MODELPARAM_VALUE.enable23}
}

proc update_MODELPARAM_VALUE.enable24 { MODELPARAM_VALUE.enable24 PARAM_VALUE.enable24 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.enable24}] ${MODELPARAM_VALUE.enable24}
}

proc update_MODELPARAM_VALUE.enable25 { MODELPARAM_VALUE.enable25 PARAM_VALUE.enable25 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.enable25}] ${MODELPARAM_VALUE.enable25}
}

proc update_MODELPARAM_VALUE.enable26 { MODELPARAM_VALUE.enable26 PARAM_VALUE.enable26 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.enable26}] ${MODELPARAM_VALUE.enable26}
}

proc update_MODELPARAM_VALUE.enable27 { MODELPARAM_VALUE.enable27 PARAM_VALUE.enable27 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.enable27}] ${MODELPARAM_VALUE.enable27}
}

proc update_MODELPARAM_VALUE.enable28 { MODELPARAM_VALUE.enable28 PARAM_VALUE.enable28 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.enable28}] ${MODELPARAM_VALUE.enable28}
}

proc update_MODELPARAM_VALUE.enable29 { MODELPARAM_VALUE.enable29 PARAM_VALUE.enable29 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.enable29}] ${MODELPARAM_VALUE.enable29}
}

proc update_MODELPARAM_VALUE.enable30 { MODELPARAM_VALUE.enable30 PARAM_VALUE.enable30 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.enable30}] ${MODELPARAM_VALUE.enable30}
}

proc update_MODELPARAM_VALUE.enable31 { MODELPARAM_VALUE.enable31 PARAM_VALUE.enable31 } {
	# Procedure called to set VHDL generic/Verilog parameter value(s) based on TCL parameter value
	set_property value [get_property value ${PARAM_VALUE.enable31}] ${MODELPARAM_VALUE.enable31}
}

