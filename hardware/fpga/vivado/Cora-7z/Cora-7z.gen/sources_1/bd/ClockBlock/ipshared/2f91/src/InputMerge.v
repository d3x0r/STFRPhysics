`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 01/02/2024 12:29:46 PM
// Design Name: 
// Module Name: InputMerge
// Project Name: 
// Target Devices: 
// Tool Versions: 
// Description: 
// 
// Dependencies: 
// 
// Revision:
// Revision 0.01 - File Created
// Additional Comments:
// 
//////////////////////////////////////////////////////////////////////////////////


module InputMerge #(
    inWidth0=1, 
    inWidth1=1, 
    inWidth2=1, 
    inWidth3=1, 
    inWidth4=1, 
    inWidth5=1, 
    inWidth6=1, 
    inWidth7=1, 
    inWidth8=1, 
    inWidth9=1, 
    inWidth10=1, 
    inWidth11=1, 
    inWidth12=1, 
    inWidth13=1, 
    inWidth14=1, 
    inWidth15=1, 
    inWidth16=1, 
    inWidth17=1, 
    inWidth18=1, 
    inWidth19=1, 
    inWidth20=1, 
    inWidth21=1, 
    inWidth22=1, 
    inWidth23=1, 
    inWidth24=1, 
    inWidth25=1, 
    inWidth26=1, 
    inWidth27=1, 
    inWidth28=1, 
    inWidth29=1, 
    inWidth30=1, 
    inWidth31=1,
    outWidth = 32 
 )
 (
    input [inWidth0-1:0] i0,
    input [inWidth1-1:0] i1,
    input [inWidth2-1:0] i2,
    input [inWidth3-1:0] i3,
    input [inWidth4-1:0] i4,
    input [inWidth5-1:0] i5,
    input [inWidth6-1:0] i6,
    input [inWidth7-1:0] i7,
    input [inWidth8-1:0] i8,
    input [inWidth9-1:0] i9,
    input [inWidth10-1:0] i10,
    input [inWidth11-1:0] i11,
    input [inWidth12-1:0] i12,
    input [inWidth13-1:0] i13,
    input [inWidth14-1:0] i14,
    input [inWidth15-1:0] i15,
    input [inWidth16-1:0] i16,
    input [inWidth17-1:0] i17,
    input [inWidth18-1:0] i18,
    input [inWidth19-1:0] i19,
    input [inWidth20-1:0] i20,
    input [inWidth21-1:0] i21,
    input [inWidth22-1:0] i22,
    input [inWidth23-1:0] i23,
    input [inWidth24-1:0] i24,
    input [inWidth25-1:0] i25,
    input [inWidth26-1:0] i26,
    input [inWidth27-1:0] i27,
    input [inWidth28-1:0] i28,
    input [inWidth29-1:0] i29,
    input [inWidth30-1:0] i30,
    input [inWidth31-1:0] i31,
    output [outWidth-1:0] outBus
    );
    
generate if( inWidth0 > 0 )
	assign outBus[inWidth0-1:0]=i0[inWidth0-1:0];
endgenerate
generate if( inWidth1 > 0 )
	assign outBus[inWidth1+inWidth0-1:inWidth0]=i1[inWidth1-1:0];
endgenerate
generate if( inWidth2 > 0 )
	assign outBus[inWidth2+inWidth1+inWidth0-1:inWidth1+inWidth0]=i2[inWidth2-1:0];
endgenerate
generate if( inWidth3 > 0 )
	assign outBus[inWidth3+inWidth2+inWidth1+inWidth0-1:inWidth2+inWidth1+inWidth0]=i3[inWidth3-1:0];
endgenerate
generate if( inWidth4 > 0 )
	assign outBus[inWidth4+inWidth3+inWidth2+inWidth1+inWidth0-1:inWidth3+inWidth2+inWidth1+inWidth0]=i4[inWidth4-1:0];
endgenerate
generate if( inWidth5 > 0 )
	assign outBus[inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0-1:inWidth4+inWidth3+inWidth2+inWidth1+inWidth0]=i5[inWidth5-1:0];
endgenerate
generate if( inWidth6 > 0 )
	assign outBus[inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0-1:inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0]=i6[inWidth6-1:0];
endgenerate
generate if( inWidth7 > 0 )
	assign outBus[inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0-1:inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0]=i7[inWidth7-1:0];
endgenerate
generate if( inWidth8 > 0 )
	assign outBus[inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0-1:inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0]=i8[inWidth8-1:0];
endgenerate
generate if( inWidth9 > 0 )
	assign outBus[inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0-1:inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0]=i9[inWidth9-1:0];
endgenerate
generate if( inWidth10 > 0 )
	assign outBus[inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0-1:inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0]=i10[inWidth10-1:0];
endgenerate
generate if( inWidth11 > 0 )
	assign outBus[inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0-1:inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0]=i11[inWidth11-1:0];
endgenerate
generate if( inWidth12 > 0 )
	assign outBus[inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0-1:inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0]=i12[inWidth12-1:0];
endgenerate
generate if( inWidth13 > 0 )
	assign outBus[inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0-1:inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0]=i13[inWidth13-1:0];
endgenerate
generate if( inWidth14 > 0 )
	assign outBus[inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0-1:inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0]=i14[inWidth14-1:0];
endgenerate
generate if( inWidth15 > 0 )
	assign outBus[inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0-1:inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0]=i15[inWidth15-1:0];
endgenerate
generate if( inWidth16 > 0 )
	assign outBus[inWidth16+inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0-1:inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0]=i16[inWidth16-1:0];
endgenerate
generate if( inWidth17 > 0 )
	assign outBus[inWidth17+inWidth16+inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0-1:inWidth16+inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0]=i17[inWidth17-1:0];
endgenerate
generate if( inWidth18 > 0 )
	assign outBus[inWidth18+inWidth17+inWidth16+inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0-1:inWidth17+inWidth16+inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0]=i18[inWidth18-1:0];
endgenerate
generate if( inWidth19 > 0 )
	assign outBus[inWidth19+inWidth18+inWidth17+inWidth16+inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0-1:inWidth18+inWidth17+inWidth16+inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0]=i19[inWidth19-1:0];
endgenerate
generate if( inWidth20 > 0 )
	assign outBus[inWidth20+inWidth19+inWidth18+inWidth17+inWidth16+inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0-1:inWidth19+inWidth18+inWidth17+inWidth16+inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0]=i20[inWidth20-1:0];
endgenerate
generate if( inWidth21 > 0 )
	assign outBus[inWidth21+inWidth20+inWidth19+inWidth18+inWidth17+inWidth16+inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0-1:inWidth20+inWidth19+inWidth18+inWidth17+inWidth16+inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0]=i21[inWidth21-1:0];
endgenerate
generate if( inWidth22 > 0 )
	assign outBus[inWidth22+inWidth21+inWidth20+inWidth19+inWidth18+inWidth17+inWidth16+inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0-1:inWidth21+inWidth20+inWidth19+inWidth18+inWidth17+inWidth16+inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0]=i22[inWidth22-1:0];
endgenerate
generate if( inWidth23 > 0 )
	assign outBus[inWidth23+inWidth22+inWidth21+inWidth20+inWidth19+inWidth18+inWidth17+inWidth16+inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0-1:inWidth22+inWidth21+inWidth20+inWidth19+inWidth18+inWidth17+inWidth16+inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0]=i23[inWidth23-1:0];
endgenerate
generate if( inWidth24 > 0 )
	assign outBus[inWidth24+inWidth23+inWidth22+inWidth21+inWidth20+inWidth19+inWidth18+inWidth17+inWidth16+inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0-1:inWidth23+inWidth22+inWidth21+inWidth20+inWidth19+inWidth18+inWidth17+inWidth16+inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0]=i24[inWidth24-1:0];
endgenerate
generate if( inWidth25 > 0 )
	assign outBus[inWidth25+inWidth24+inWidth23+inWidth22+inWidth21+inWidth20+inWidth19+inWidth18+inWidth17+inWidth16+inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0-1:inWidth24+inWidth23+inWidth22+inWidth21+inWidth20+inWidth19+inWidth18+inWidth17+inWidth16+inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0]=i25[inWidth25-1:0];
endgenerate
generate if( inWidth26 > 0 )
	assign outBus[inWidth26+inWidth25+inWidth24+inWidth23+inWidth22+inWidth21+inWidth20+inWidth19+inWidth18+inWidth17+inWidth16+inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0-1:inWidth25+inWidth24+inWidth23+inWidth22+inWidth21+inWidth20+inWidth19+inWidth18+inWidth17+inWidth16+inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0]=i26[inWidth26-1:0];
endgenerate
generate if( inWidth27 > 0 )
	assign outBus[inWidth27+inWidth26+inWidth25+inWidth24+inWidth23+inWidth22+inWidth21+inWidth20+inWidth19+inWidth18+inWidth17+inWidth16+inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0-1:inWidth26+inWidth25+inWidth24+inWidth23+inWidth22+inWidth21+inWidth20+inWidth19+inWidth18+inWidth17+inWidth16+inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0]=i27[inWidth27-1:0];
endgenerate
generate if( inWidth28 > 0 )
	assign outBus[inWidth28+inWidth27+inWidth26+inWidth25+inWidth24+inWidth23+inWidth22+inWidth21+inWidth20+inWidth19+inWidth18+inWidth17+inWidth16+inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0-1:inWidth27+inWidth26+inWidth25+inWidth24+inWidth23+inWidth22+inWidth21+inWidth20+inWidth19+inWidth18+inWidth17+inWidth16+inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0]=i28[inWidth28-1:0];
endgenerate
generate if( inWidth29 > 0 )
	assign outBus[inWidth29+inWidth28+inWidth27+inWidth26+inWidth25+inWidth24+inWidth23+inWidth22+inWidth21+inWidth20+inWidth19+inWidth18+inWidth17+inWidth16+inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0-1:inWidth28+inWidth27+inWidth26+inWidth25+inWidth24+inWidth23+inWidth22+inWidth21+inWidth20+inWidth19+inWidth18+inWidth17+inWidth16+inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0]=i29[inWidth29-1:0];
endgenerate
generate if( inWidth30 > 0 )
	assign outBus[inWidth30+inWidth29+inWidth28+inWidth27+inWidth26+inWidth25+inWidth24+inWidth23+inWidth22+inWidth21+inWidth20+inWidth19+inWidth18+inWidth17+inWidth16+inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0-1:inWidth29+inWidth28+inWidth27+inWidth26+inWidth25+inWidth24+inWidth23+inWidth22+inWidth21+inWidth20+inWidth19+inWidth18+inWidth17+inWidth16+inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0]=i30[inWidth30-1:0];
endgenerate
generate if( inWidth31 > 0 )
	assign outBus[inWidth31+inWidth30+inWidth29+inWidth28+inWidth27+inWidth26+inWidth25+inWidth24+inWidth23+inWidth22+inWidth21+inWidth20+inWidth19+inWidth18+inWidth17+inWidth16+inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0-1:inWidth30+inWidth29+inWidth28+inWidth27+inWidth26+inWidth25+inWidth24+inWidth23+inWidth22+inWidth21+inWidth20+inWidth19+inWidth18+inWidth17+inWidth16+inWidth15+inWidth14+inWidth13+inWidth12+inWidth11+inWidth10+inWidth9+inWidth8+inWidth7+inWidth6+inWidth5+inWidth4+inWidth3+inWidth2+inWidth1+inWidth0]=i31[inWidth31-1:0];
endgenerate
    
    
endmodule
