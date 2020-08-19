"use strict";

// usage
//  var RNG = require( "salty_random_generator")( callback }
//    constructor callback is used as a source of salt to the generator
//    the callback is passed an array to which strings are expected to be added
//     ( [] )=>{ [].push( more_salt ); }
//
//    - methods on RNG
//         reset()
//                clear current random state, and restart
//
//         getBits( /* 0-31 */ )
//                return a Number that is that many bits from the random stream
//
//         getBuffer( /* 0-n */ )
//                returns a ArrayBuffer that is that many bits of randomness...
//
//         save()
//                return an object representing the current RNG state
//
//         restore( o )
//                use object to restore RNG state.
//
//          feed( buf )
//                feed a raw uint8array.
//


function MASK_TOP_MASK(length) {
	return (0xFF) >>> (8 - (length))
};

function MY_MASK_MASK(n, length) {
	return (MASK_TOP_MASK(length) << ((n) & 0x7)) & 0xFF;
}
function MY_GET_MASK(v, n, mask_size) {
	return (v[(n) >> 3] & MY_MASK_MASK(n, mask_size)) >>> (((n)) & 0x7)
}

//var exports = exports || {};

exports.SaltyRNG = function (f) {
	var shabuf = new SHA256();
	function compute(buf) {
		var h = new Array(32)
		shabuf.update(buf).finish(h).clean()
		return h;
	}
	var RNG = {
		getSalt: f,
		feed(buf) {
			if( typeof buf === "string" )
				buf = toUTF8Array( buf );
			shabuf.update(buf)
		},
		saltbuf: [],
		entropy: null,
		available: 0,
		used: 0,
		initialEntropy : "test",
		save() {
			return {
				saltbuf: this.saltbuf.slice(0),
				entropy: this.entropy?this.entropy.slice(0):null,
				available: this.available,
				used: this.used,
				state : shabuf.clone()
			}
		},
		restore(oldState) {
			this.saltbuf = oldState.saltbuf.slice(0);
			this.entropy = oldState.entropy?oldState.entropy.slice(0):null;
			this.available = oldState.available;
			this.used = oldState.used;
			shabuf = oldState.state.clone();
		},
		reset() {
			this.entropy = this.initialEntropy?compute(this.initialEntropy):null;
			this.available = 0;
			this.used = 0;
			shabuf.clean();
		},
		getBits(count, signed) {
			if( !count ) { count = 32; signed = true } 
			if (count > 32)
				throw "Use getBuffer for more than 32 bits.";
			var tmp = this.getBuffer(count);
			if( signed ) {
				var arr_u = new Uint32Array(tmp);
				var arr = new Int32Array(tmp);
				if(  arr_u[0] & ( 1 << (count-1) ) ) {
					var negone = ~0;
					negone <<= (count-1);
					//console.log( "set arr_u = ", arr_u[0].toString(16 ) , negone.toString(16 ) );
					arr_u[0] |= negone;
				}
				return arr[0];
			}
			else {
				var arr = new Uint32Array(tmp);
				return arr[0];
			}
		},
		getBuffer(bits) {
			let _bits = bits;
			let resultIndex = 0;
			let resultBits = 0;
			let resultBuffer = new ArrayBuffer(4 * ((bits + 31) >> 5));
			let result = new Uint8Array(resultBuffer);
			//console.log( "buffer is ", resultBuffer.byteLength );
			{
				let tmp;
				let partial_tmp;
				let partial_bits = 0;
				let get_bits;

				do {
					if (bits > 8)
						get_bits = 8;
					else
						get_bits = bits;
					// if there were 1-7 bits of data in partial, then can only get 8-partial max.
					if( (8-partial_bits) < get_bits )
						get_bits = (8-partial_bits);
					// if get_bits == 8
					//    but bits_used is 1-7, then it would have to pull 2 bytes to get the 8 required
					//    so truncate get_bits to 1-7 bits
					let chunk = ( 8 - ( this.used & 7) );
					if( chunk < get_bits )
						get_bits = chunk;
					// if resultBits is 1-7 offset, then would have to store up to 2 bytes of value
					//    so have to truncate to just the up to 1 bytes that will fit.
					chunk = ( 8 - ( resultBits & 7) );
					if( chunk < get_bits )
						get_bits = chunk;

					//console.log( "Get bits:", get_bits, " after", this.used, "into", resultBits );
					// only greater... if equal just grab the bits.
					if (get_bits > (this.available - this.used)) {
						if (this.available - this.used) {
							partial_bits = this.available - this.used;
							// partial can never be greater than 8; request is never greater than 8
							//if (partial_bits > 8)
							//	partial_bits = 8;
							partial_tmp = MY_GET_MASK(this.entropy, this.used, partial_bits);
						}
						needBits();
						bits -= partial_bits;
					}
					else {
						tmp = MY_GET_MASK(this.entropy, this.used, get_bits);
						this.used += get_bits;
						if (partial_bits) {
							tmp = partial_tmp | (tmp << partial_bits);
							partial_bits = 0;
						}
						
						result[resultIndex] |= tmp << (resultBits&7);
						resultBits += get_bits;
						// because of input limits, total result bits can only be 8 or less.
						if( resultBits == 8 ) {
							resultIndex++;
							resultBits = 0;
						}
						bits -= get_bits;
					}
				} while (bits);
				//console.log( "output is ", result[0].toString(16), result[1].toString(16), result[2].toString(16), result[3].toString(16) )
				return resultBuffer;
			}
		}
	}
	function needBits() {
		RNG.saltbuf.length = 0;
		if (typeof (RNG.getSalt) === 'function')
			RNG.getSalt(RNG.saltbuf);
		//console.log( "saltbuf.join = ", RNG.saltbuf.join(), RNG.saltbuf.length );
		var newbuf;
		if( RNG.saltbuf.length ) {
			if( !RNG.entropy )
				RNG.entropy = new Uint8Array(32)
			newbuf = toUTF8Array( RNG.saltbuf.join() );
			shabuf.update(newbuf).finish(RNG.entropy).clean();
			shabuf.update(RNG.entropy);
		}
		else {
			if( !RNG.entropy )
				RNG.entropy = new Uint8Array(32)
			shabuf.finish(RNG.entropy).clean();
			shabuf.update(RNG.entropy);
		}
		RNG.available = RNG.entropy.length * 8;
		RNG.used = 0;
	};
	RNG.reset();
	return RNG;
}

//------------------ SHA256 support

/* Taken from https://github.com/brillout/forge-sha256
 * which itself is taken from https://github.com/digitalbazaar/forge/tree/3b7826f7c2735c42b41b7ceaaadaad570e92d898
 */

// this is just the working bits of the above.

var K = new Uint32Array([
	0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b,
	0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01,
	0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7,
	0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
	0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152,
	0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
	0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc,
	0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
	0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819,
	0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08,
	0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f,
	0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
	0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
])

function blocks(w, v, p, pos, len) {
	var a, b, c, d, e, f, g, h, u, i, j, t1, t2
	while (len >= 64) {
		a = v[0]
		b = v[1]
		c = v[2]
		d = v[3]
		e = v[4]
		f = v[5]
		g = v[6]
		h = v[7]

		for (i = 0; i < 16; i++) {
			j = pos + i * 4
			w[i] = (((p[j] & 0xff) << 24) | ((p[j + 1] & 0xff) << 16) |
				((p[j + 2] & 0xff) << 8) | (p[j + 3] & 0xff))
		}

		for (i = 16; i < 64; i++) {
			u = w[i - 2]
			t1 = (u >>> 17 | u << (32 - 17)) ^ (u >>> 19 | u << (32 - 19)) ^ (u >>> 10)

			u = w[i - 15]
			t2 = (u >>> 7 | u << (32 - 7)) ^ (u >>> 18 | u << (32 - 18)) ^ (u >>> 3)

			w[i] = (t1 + w[i - 7] | 0) + (t2 + w[i - 16] | 0)
		}

		for (i = 0; i < 64; i++) {
			t1 = (((((e >>> 6 | e << (32 - 6)) ^ (e >>> 11 | e << (32 - 11)) ^
				(e >>> 25 | e << (32 - 25))) + ((e & f) ^ (~e & g))) | 0) +
				((h + ((K[i] + w[i]) | 0)) | 0)) | 0

			t2 = (((a >>> 2 | a << (32 - 2)) ^ (a >>> 13 | a << (32 - 13)) ^
				(a >>> 22 | a << (32 - 22))) + ((a & b) ^ (a & c) ^ (b & c))) | 0

			h = g
			g = f
			f = e
			e = (d + t1) | 0
			d = c
			c = b
			b = a
			a = (t1 + t2) | 0
		}

		v[0] += a
		v[1] += b
		v[2] += c
		v[3] += d
		v[4] += e
		v[5] += f
		v[6] += g
		v[7] += h

		pos += 64
		len -= 64
	}
	return pos
}

function SHA256() {
	this.v = new Uint32Array(8)
	this.w = new Int32Array(64)
	this.buf = new Uint8Array(128)
	this.buflen = 0
	this.len = 0
	this.reset()
}

SHA256.prototype.clone = function (){
	var x = new SHA256();
	x.v = this.v.slice(0);
	x.w = this.w.slice(0);
	x.buf = this.buf.slice(0);
	x.buflen = this.buflen;
	x.len = this.len;
	return x;
}

SHA256.prototype.reset = function () {
	this.v[0] = 0x6a09e667
	this.v[1] = 0xbb67ae85
	this.v[2] = 0x3c6ef372
	this.v[3] = 0xa54ff53a
	this.v[4] = 0x510e527f
	this.v[5] = 0x9b05688c
	this.v[6] = 0x1f83d9ab
	this.v[7] = 0x5be0cd19
	this.buflen = 0
	this.len = 0
}

SHA256.prototype.clean = function () {
	var i
	for (i = 0; i < this.buf.length; i++) this.buf[i] = 0
	for (i = 0; i < this.w.length; i++) this.w[i] = 0
	this.reset()
}

SHA256.prototype.update = function (m, len) {
	var mpos = 0, mlen = (typeof len !== 'undefined') ? len : m.length
	this.len += mlen
	if (this.buflen > 0) {
		while (this.buflen < 64 && mlen > 0) {
			this.buf[this.buflen++] = m[mpos++]
			mlen--
		}
		if (this.buflen === 64) {
			blocks(this.w, this.v, this.buf, 0, 64)
			this.buflen = 0
		}
	}
	if (mlen >= 64) {
		mpos = blocks(this.w, this.v, m, mpos, mlen)
		mlen %= 64
		for( var buf_fill = mlen; buf_fill < 64; buf_fill++ )
			this.buf[buf_fill] = m[mpos-64 + buf_fill];
	}
	while (mlen > 0) {
		this.buf[this.buflen++] = m[mpos++]
		mlen--
	}
	return this
}

SHA256.prototype.finish = function (h) {
	var mlen = this.len,
		left = this.buflen,
		bhi = (mlen / 0x20000000) | 0,
		blo = mlen << 3,
		padlen = (mlen % 64 < 56) ? 64 : 128,
		i

	this.buf[left] = 0x80
	for (i = left + 1; i < padlen - 8; i++) this.buf[i] = 0
	this.buf[padlen - 8] = (bhi >>> 24) & 0xff
	this.buf[padlen - 7] = (bhi >>> 16) & 0xff
	this.buf[padlen - 6] = (bhi >>> 8) & 0xff
	this.buf[padlen - 5] = (bhi >>> 0) & 0xff
	this.buf[padlen - 4] = (blo >>> 24) & 0xff
	this.buf[padlen - 3] = (blo >>> 16) & 0xff
	this.buf[padlen - 2] = (blo >>> 8) & 0xff
	this.buf[padlen - 1] = (blo >>> 0) & 0xff

	blocks(this.w, this.v, this.buf, 0, padlen)

	for (i = 0; i < 8; i++) {
		h[i * 4 + 0] = (this.v[i] >>> 24) & 0xff
		h[i * 4 + 1] = (this.v[i] >>> 16) & 0xff
		h[i * 4 + 2] = (this.v[i] >>> 8) & 0xff
		h[i * 4 + 3] = (this.v[i] >>> 0) & 0xff
	}
	if( false )
	{
		var str = '';
		for( i = 0; i < 32; i++ )
			str += h[i].toString(16);
		console.log( "out:", str );
	}

	return this
}

function toUTF8Array(str) {
    var utf8 = [];
    for (var i=0; i < str.length; i++) {
        var charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
            utf8.push(0xc0 | (charcode >> 6),
                      0x80 | (charcode & 0x3f));
        }
        else if (charcode < 0xd800 || charcode >= 0xe000) {
            utf8.push(0xe0 | (charcode >> 12),
                      0x80 | ((charcode>>6) & 0x3f),
                      0x80 | (charcode & 0x3f));
        }
        // surrogate pair
        else {
            i++;
            // UTF-16 encodes 0x10000-0x10FFFF by
            // subtracting 0x10000 and splitting the
            // 20 bits of 0x0-0xFFFFF into two halves
            charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                      | (str.charCodeAt(i) & 0x3ff));
            utf8.push(0xf0 | (charcode >>18),
                      0x80 | ((charcode>>12) & 0x3f),
                      0x80 | ((charcode>>6) & 0x3f),
                      0x80 | (charcode & 0x3f));
        }
    }
    return utf8;
}
