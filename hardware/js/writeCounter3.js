

/*
(* ALLOW_COMBINATORIAL_LOOPS="true" *) wire [2:0] state0;
assign state0[2] = rCOUNTER[0];
assign state0[1] = rCOUNTER_n[0];
assign state0[0] = rCOUNTER[1];

always begin
    case(state0)
    3'b000, 3'b010: begin
        rCOUNTER_n[0] = 0;
        rCOUNTER[1] = 0;
    end
    
    3'b001, 3'b011: begin
        rCOUNTER_n[0] = 0;
        rCOUNTER[1] = 1;
    end

    3'b100, 3'b111: begin
        rCOUNTER_n[0] = 1;
        rCOUNTER[1] = 1;
    end

    3'b101, 3'b110: begin
        rCOUNTER_n[0] = 1;
        rCOUNTER[1] = 0;
    end
    endcase
end    
*/

console.log( "always @(posedge iCLK) #1 rCOUNTER[0] = !rCOUNTER[0];" );

for( let i = 0; i < 63; i++ ) {
	console.log( '(* ALLOW_COMBINATORIAL_LOOPS="true" *) wire [2:0] state%d;', i );
	console.log( "assign state%d[2] = rCOUNTER[%d];", i, i );
	console.log( "assign state%d[1] = rCOUNTER_n[%d];", i, i );
	console.log( "assign state%d[0] = rCOUNTER[%d];", i, i+1 );


	console.log( "always begin #1 " );
	console.log( "    case(state%d)", i );
	console.log( "    3'b000, 3'b011: begin" );
	console.log( "        rCOUNTER_n[%d] = 0;", i );
	console.log( "        rCOUNTER[%d] = 0;", i+1 );
	console.log( "    end" );
	console.log( "    " );
	console.log( "    3'b001, 3'b010: begin" );
	console.log( "        rCOUNTER_n[%d] = 0;", i );
	console.log( "        rCOUNTER[%d] = 1;", i+1 );
	console.log( "    end" );
	console.log( "    3'b100, 3'b110: begin" );
	console.log( "        rCOUNTER_n[%d] = 1;", i );
	console.log( "        rCOUNTER[%d] = 0;", i+1 );
	console.log( "    end" );
	console.log( "    3'b101, 3'b111: begin" );
	console.log( "        rCOUNTER_n[%d] = 1;", i );
	console.log( "        rCOUNTER[%d] = 1;", i+1 );
	console.log( "    end" );
	console.log( "    endcase" );
	console.log( "end" );

}
