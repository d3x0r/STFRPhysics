
function wc(n) {
console.log( 
`create_clock -name {MyDesign:MyDesign_inst|COUNTER:inst6|iCLK_ff_n[${n}]} -period 10.000 -waveform { ${((n+1)*0.200).toFixed(3)} ${(5+(n+2)*0.200).toFixed(3)} } [get_nets {MyDesign_inst|inst6|iCLK_ff[${n}]}]` );
}

for( let i = 0; i < 25; i++ ) {
wc(i);
}