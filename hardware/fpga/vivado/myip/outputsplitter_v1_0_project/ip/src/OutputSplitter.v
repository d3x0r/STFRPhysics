`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 01/02/2024 04:02:56 PM
// Design Name: 
// Module Name: OutputSplitter
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


module OutputSplitter #(
    inWidth=32, 
    outWidth0=1, 
    outWidth1=1, 
    outWidth2=1, 
    outWidth3=1, 
    outWidth4=1, 
    outWidth5=1, 
    outWidth6=1, 
    outWidth7=1, 
    outWidth8=1, 
    outWidth9=1, 
    outWidth10=1, 
    outWidth11=1, 
    outWidth12=1, 
    outWidth13=1, 
    outWidth14=1, 
    outWidth15=1, 
    outWidth16=1, 
    outWidth17=1, 
    outWidth18=1, 
    outWidth19=1, 
    outWidth20=1, 
    outWidth21=1, 
    outWidth22=1, 
    outWidth23=1, 
    outWidth24=1, 
    outWidth25=1, 
    outWidth26=1, 
    outWidth27=1, 
    outWidth28=1, 
    outWidth29=1, 
    outWidth30=1, 
    outWidth31=1,
    enable00=1,
    enable01=1,
    enable02=1,
    enable03=1,
    enable04=1,
    enable05=1,
    enable06=1,
    enable07=1,
    enable08=1,
    enable09=1,
    enable10=1,
    enable11=1,
    enable12=1,
    enable13=1,
    enable14=1,
    enable15=1,
    enable16=1,
    enable17=1,
    enable18=1,
    enable19=1,
    enable20=1,
    enable21=1,
    enable22=1,
    enable23=1,
    enable24=1,
    enable25=1,
    enable26=1,
    enable27=1,
    enable28=1,
    enable29=1,
    enable30=1,
    enable31=1
    )(
    input [inWidth-1:0] inBus,
    output [outWidth0-1:0] o0,
    output [outWidth1-1:0] o1,
    output [outWidth2-1:0] o2,
    output [outWidth3-1:0] o3,
    output [outWidth4-1:0] o4,
    output [outWidth5-1:0] o5,
    output [outWidth6-1:0] o6,
    output [outWidth7-1:0] o7,
    output [outWidth8-1:0] o8,
    output [outWidth9-1:0] o9,
    output [outWidth10-1:0] o10,
    output [outWidth11-1:0] o11,
    output [outWidth12-1:0] o12,
    output [outWidth13-1:0] o13,
    output [outWidth14-1:0] o14,
    output [outWidth15-1:0] o15,
    output [outWidth16-1:0] o16,
    output [outWidth17-1:0] o17,
    output [outWidth18-1:0] o18,
    output [outWidth19-1:0] o19,
    output [outWidth20-1:0] o20,
    output [outWidth21-1:0] o21,
    output [outWidth22-1:0] o22,
    output [outWidth23-1:0] o23,
    output [outWidth24-1:0] o24,
    output [outWidth25-1:0] o25,
    output [outWidth26-1:0] o26,
    output [outWidth27-1:0] o27,
    output [outWidth28-1:0] o28,
    output [outWidth29-1:0] o29,
    output [outWidth30-1:0] o30,
    output [outWidth31-1:0] o31
    );
    
generate if( 0 < inWidth && outWidth0 > 0 && enable00 )
	assign o0[outWidth0-1:0]=inBus[outWidth0-1:0];
endgenerate
generate if( 1 < inWidth && outWidth1 > 0 && enable01 )
	assign o1[outWidth1-1:0]=inBus[outWidth1+outWidth0-1:outWidth0];
endgenerate
generate if( 2 < inWidth && outWidth2 > 0 && enable02 )
	assign o2[outWidth2-1:0]=inBus[outWidth2+outWidth1+outWidth0-1:outWidth1+outWidth0];
endgenerate
generate if( 3 < inWidth && outWidth3 > 0 && enable03 )
	assign o3[outWidth3-1:0]=inBus[outWidth3+outWidth2+outWidth1+outWidth0-1:outWidth2+outWidth1+outWidth0];
endgenerate
generate if( 4 < inWidth && outWidth4 > 0 && enable04 )
	assign o4[outWidth4-1:0]=inBus[outWidth4+outWidth3+outWidth2+outWidth1+outWidth0-1:outWidth3+outWidth2+outWidth1+outWidth0];
endgenerate
generate if( 5 < inWidth && outWidth5 > 0 && enable05 )
	assign o5[outWidth5-1:0]=inBus[outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0-1:outWidth4+outWidth3+outWidth2+outWidth1+outWidth0];
endgenerate
generate if( 6 < inWidth && outWidth6 > 0 && enable06 )
	assign o6[outWidth6-1:0]=inBus[outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0-1:outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0];
endgenerate
generate if( 7 < inWidth && outWidth7 > 0 && enable07 )
	assign o7[outWidth7-1:0]=inBus[outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0-1:outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0];
endgenerate
generate if( 8 < inWidth && outWidth8 > 0 && enable08 )
	assign o8[outWidth8-1:0]=inBus[outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0-1:outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0];
endgenerate
generate if( 9 < inWidth && outWidth9 > 0 && enable09 )
	assign o9[outWidth9-1:0]=inBus[outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0-1:outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0];
endgenerate
generate if( 10 < inWidth && outWidth10 > 0 && enable10 )
	assign o10[outWidth10-1:0]=inBus[outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0-1:outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0];
endgenerate
generate if( 11 < inWidth && outWidth11 > 0 && enable11 )
	assign o11[outWidth11-1:0]=inBus[outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0-1:outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0];
endgenerate
generate if( 12 < inWidth && outWidth12 > 0 && enable12 )
	assign o12[outWidth12-1:0]=inBus[outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0-1:outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0];
endgenerate
generate if( 13 < inWidth && outWidth13 > 0 && enable13 )
	assign o13[outWidth13-1:0]=inBus[outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0-1:outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0];
endgenerate
generate if( 14 < inWidth && outWidth14 > 0 && enable14 )
	assign o14[outWidth14-1:0]=inBus[outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0-1:outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0];
endgenerate
generate if( 15 < inWidth && outWidth15 > 0 && enable15 )
	assign o15[outWidth15-1:0]=inBus[outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0-1:outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0];
endgenerate
generate if( 16 < inWidth && outWidth16 > 0 && enable16 )
	assign o16[outWidth16-1:0]=inBus[outWidth16+outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0-1:outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0];
endgenerate
generate if( 17 < inWidth && outWidth17 > 0 && enable17 )
	assign o17[outWidth17-1:0]=inBus[outWidth17+outWidth16+outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0-1:outWidth16+outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0];
endgenerate
generate if( 18 < inWidth && outWidth18 > 0 && enable18 )
	assign o18[outWidth18-1:0]=inBus[outWidth18+outWidth17+outWidth16+outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0-1:outWidth17+outWidth16+outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0];
endgenerate
generate if( 19 < inWidth && outWidth19 > 0 && enable19 )
	assign o19[outWidth19-1:0]=inBus[outWidth19+outWidth18+outWidth17+outWidth16+outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0-1:outWidth18+outWidth17+outWidth16+outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0];
endgenerate
generate if( 20 < inWidth && outWidth20 > 0 && enable20 )
	assign o20[outWidth20-1:0]=inBus[outWidth20+outWidth19+outWidth18+outWidth17+outWidth16+outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0-1:outWidth19+outWidth18+outWidth17+outWidth16+outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0];
endgenerate
generate if( 21 < inWidth && outWidth21 > 0 && enable21 )
	assign o21[outWidth21-1:0]=inBus[outWidth21+outWidth20+outWidth19+outWidth18+outWidth17+outWidth16+outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0-1:outWidth20+outWidth19+outWidth18+outWidth17+outWidth16+outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0];
endgenerate
generate if( 22 < inWidth && outWidth22 > 0 && enable22 )
	assign o22[outWidth22-1:0]=inBus[outWidth22+outWidth21+outWidth20+outWidth19+outWidth18+outWidth17+outWidth16+outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0-1:outWidth21+outWidth20+outWidth19+outWidth18+outWidth17+outWidth16+outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0];
endgenerate
generate if( 23 < inWidth && outWidth23 > 0 && enable23 )
	assign o23[outWidth23-1:0]=inBus[outWidth23+outWidth22+outWidth21+outWidth20+outWidth19+outWidth18+outWidth17+outWidth16+outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0-1:outWidth22+outWidth21+outWidth20+outWidth19+outWidth18+outWidth17+outWidth16+outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0];
endgenerate
generate if( 24 < inWidth && outWidth24 > 0 && enable24 )
	assign o24[outWidth24-1:0]=inBus[outWidth24+outWidth23+outWidth22+outWidth21+outWidth20+outWidth19+outWidth18+outWidth17+outWidth16+outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0-1:outWidth23+outWidth22+outWidth21+outWidth20+outWidth19+outWidth18+outWidth17+outWidth16+outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0];
endgenerate
generate if( 25 < inWidth && outWidth25 > 0 && enable25 )
	assign o25[outWidth25-1:0]=inBus[outWidth25+outWidth24+outWidth23+outWidth22+outWidth21+outWidth20+outWidth19+outWidth18+outWidth17+outWidth16+outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0-1:outWidth24+outWidth23+outWidth22+outWidth21+outWidth20+outWidth19+outWidth18+outWidth17+outWidth16+outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0];
endgenerate
generate if( 26 < inWidth && outWidth26 > 0 && enable26 )
	assign o26[outWidth26-1:0]=inBus[outWidth26+outWidth25+outWidth24+outWidth23+outWidth22+outWidth21+outWidth20+outWidth19+outWidth18+outWidth17+outWidth16+outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0-1:outWidth25+outWidth24+outWidth23+outWidth22+outWidth21+outWidth20+outWidth19+outWidth18+outWidth17+outWidth16+outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0];
endgenerate
generate if( 27 < inWidth && outWidth27 > 0 && enable27 )
	assign o27[outWidth27-1:0]=inBus[outWidth27+outWidth26+outWidth25+outWidth24+outWidth23+outWidth22+outWidth21+outWidth20+outWidth19+outWidth18+outWidth17+outWidth16+outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0-1:outWidth26+outWidth25+outWidth24+outWidth23+outWidth22+outWidth21+outWidth20+outWidth19+outWidth18+outWidth17+outWidth16+outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0];
endgenerate
generate if( 28 < inWidth && outWidth28 > 0 && enable28 )
	assign o28[outWidth28-1:0]=inBus[outWidth28+outWidth27+outWidth26+outWidth25+outWidth24+outWidth23+outWidth22+outWidth21+outWidth20+outWidth19+outWidth18+outWidth17+outWidth16+outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0-1:outWidth27+outWidth26+outWidth25+outWidth24+outWidth23+outWidth22+outWidth21+outWidth20+outWidth19+outWidth18+outWidth17+outWidth16+outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0];
endgenerate
generate if( 29 < inWidth && outWidth29 > 0 && enable29 )
	assign o29[outWidth29-1:0]=inBus[outWidth29+outWidth28+outWidth27+outWidth26+outWidth25+outWidth24+outWidth23+outWidth22+outWidth21+outWidth20+outWidth19+outWidth18+outWidth17+outWidth16+outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0-1:outWidth28+outWidth27+outWidth26+outWidth25+outWidth24+outWidth23+outWidth22+outWidth21+outWidth20+outWidth19+outWidth18+outWidth17+outWidth16+outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0];
endgenerate
generate if( 30 < inWidth && outWidth30 > 0 && enable30 )
	assign o30[outWidth30-1:0]=inBus[outWidth30+outWidth29+outWidth28+outWidth27+outWidth26+outWidth25+outWidth24+outWidth23+outWidth22+outWidth21+outWidth20+outWidth19+outWidth18+outWidth17+outWidth16+outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0-1:outWidth29+outWidth28+outWidth27+outWidth26+outWidth25+outWidth24+outWidth23+outWidth22+outWidth21+outWidth20+outWidth19+outWidth18+outWidth17+outWidth16+outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0];
endgenerate
generate if( 31 < inWidth && outWidth31 > 0 && enable31 )
	assign o31[outWidth31-1:0]=inBus[outWidth31+outWidth30+outWidth29+outWidth28+outWidth27+outWidth26+outWidth25+outWidth24+outWidth23+outWidth22+outWidth21+outWidth20+outWidth19+outWidth18+outWidth17+outWidth16+outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0-1:outWidth30+outWidth29+outWidth28+outWidth27+outWidth26+outWidth25+outWidth24+outWidth23+outWidth22+outWidth21+outWidth20+outWidth19+outWidth18+outWidth17+outWidth16+outWidth15+outWidth14+outWidth13+outWidth12+outWidth11+outWidth10+outWidth9+outWidth8+outWidth7+outWidth6+outWidth5+outWidth4+outWidth3+outWidth2+outWidth1+outWidth0];
endgenerate
 
endmodule
