//**********************************************************************************
//Construct the new fraction data type.
//**********************************************************************************

var Fract = function( X, Y )
{
  if( arguments.length > 1 )
  {
    this.x = Math.round( X ); this.y = Math.round( Y );
  }
  else { this.x = 0; this.y = 0; }
}

//**********************************************************************************
//Do division one step at an time stopping at the pattern in the division.
//Default base is binary, however base can be set 2 though 36.
//**********************************************************************************

Fract.prototype.divP = function( base )
{
  //Pattern data type.
	
  var pat = new Pattern(); pat.base = base || 2;
  
  //Fraction to divide.
  
  n1 = Math.abs( this.x ), n2 = Math.abs( this.y );
  
  //Data of the divide operation.
  
  pat.data = [ n1 ];
  
  //El (Element), and C (Current element), and whether to force computation.
  
  var El = -1, C = 0;
  
  //Get time. This is set for if the calculation takes longer than 7 seconds.
  
  var t = new Date().getTime();
  
  //If divide by 0.
  
  if( pat.data[ 0 ] === 0 ) { pat.pat = [0]; pat.data = null; return( pat ); }
  
  //While the Element is not equal to the divide going in and coming out.
  
  while( El === -1 ) { if( ( new Date().getTime() - t ) > 7000 ) { pat.pat = [ Infinity ]; return( pat ); }
    
    for ( var Exp = pat.data[ pat.data.length - 1 ], i = 0; ( Exp - n2 ) < 0; Exp *= pat.base, i++ ) { if( i >= 1 ) { pat.pat[ pat.pat.length ] = 0; pat.data[ pat.data.length ] = null; } }
    
    i = ( ( Exp / n2 ) & -1 ); pat.pat[ pat.pat.length ] = i; C = Exp - ( n2 * i ); pat.data[ pat.data.length ] = C;
    
    for( El = pat.data.length - 2; El > -1 && pat.data[ El ] !== C; El-- ); if( C === 0 ) { pat.pat = [0]; pat.data = null; return( pat ); }
  }
  
  //return the pattern at the first matching element to current element.

  pat.data = null; pat.pat = pat.pat.slice( El, pat.pat.length ); return ( pat );
}

//**********************************************************************************
//Reduce fraction to lowest possible whole value.
//**********************************************************************************

Fract.prototype.reduce = function( err )
{
  //Fraction.
  
  var c = new Fract( this.x, this.y );
  
  //Epsilon error.
  
  var t = 0, e1 = 0, e2 = Number.EPSILON * ( err || 1 );
  
  //Reduce as small as possible.
  
  while ( c.x )
  {
	t = c.x; c.x = ( c.y - ( Math.floor( c.y / c.x ) * c.x ) );
	
	e1 = ( this - Math.floor( this.x / t ) / Math.floor( this.y / t ) );
	
	( Math.abs( e1 ) < e2 ) && ( c.x = 0 ); c.y = t;
  }
  
  //Return result.
  
  c.x = Math.floor( this.x / c.y ); c.y = Math.floor( this.y / c.y ); return( c );
}

//**********************************************************************************
//Teach compiler how to display fraction data type.
//**********************************************************************************

Fract.prototype.toString = function()
{
  var out = "", sum = Math.floor( Math.abs( this.x ) / Math.abs( this.y ) );
  
  if( ( this.x < 0 ) == !( this.y < 0 ) ) { sum = -sum; }
  
  var re = Math.abs( Math.abs( this.x ) - ( Math.abs( this.y ) * Math.abs( sum ) ) );
  
  if( re !== 0 ) { if( sum < 0 ) { out += "-"; }; out += re + "\xF7" + Math.abs( this.y ); if( sum > 0 ) { out += "+"; } }
  
  if( sum !== 0 ) { out += sum; }; return( out );
}

//**********************************************************************************
//Fraction as code that can be multiplied to variable.
//**********************************************************************************

Fract.prototype.toCode = function()
{
  var out = " ", sum = Math.floor( Math.abs( this.x ) / Math.abs( this.y ) );
  
  if( ( this.x < 0 ) == !( this.y < 0 ) ) { sum = -sum; }
  
  var re = Math.abs( Math.abs( this.x ) - ( Math.abs( this.y ) * Math.abs( sum ) ) );
  
  if( re !== 0 ) { if( sum < 0 ) { out += "-"; }; out += re + " / " + Math.abs( this.y );
  if( sum > 0 ) { out += " + "; } else if( sum < 0 ) { out += " - "; sum = -sum; } }
  
  if( sum !== 0 ) { out += sum; }; return( out );
}

//**********************************************************************************
//Teach the compiler how to read the value of an fraction.
//**********************************************************************************

Fract.prototype.valueOf = function() { return( this.x / this.y ); }

//**********************************************************************************
//The pattern data type is used for numbers that do not divide thus the pattern can be stored separably as an data type.
//**********************************************************************************

var Pattern = function()
{
  if( arguments.length > 0 )
  {
    //Initialize the pattern data type with an array.

    if( arguments[0].constructor === Array ) { this.pat = arguments[0]; }
  
    //Else initialize pattern by arguments.
  
    else { this.pat = [].slice.call( arguments ); }
  
    //Check for errors.
  
    for( var i = 0; i < this.pat.length; this.pat[i] = Math.abs( parseInt( this.pat[i++] ) ) )
    { if( isNaN( this.pat[i] ) ){ this.pat = null; throw new Error("Patterns Must only be an set of digits."); } }
  }
  else{ this.pat = []; }
}

//**********************************************************************************
//Convert patterns into an fraction that generates the division pattern.
//**********************************************************************************

Pattern.prototype.getFract = function( err )
{
  //Initialize.

  var f1 = 1, f2 = 0, c1 = 0, c2 = 0, t = 0, e = Number.EPSILON * ( err || 1 );
  
  //Calculate pattern in the limitation of 53 mantissa bit's.
  
  for( var i = Math.min( this.pat.length - 1, ( 36.7368005696771 / Math.log( this.base ) + 0.5 ) & -1 ); i > -1; f2 += this.pat[ i-- ] * f1, f1 *= this.base );
  
  f1 -= 1; c1 = f2; c2 = f1; s = f2 / f1;
  
  //Find best matching whole fraction.
  
  while ( c1 ) { t = c1; c1 = ( c2 - ( Math.floor( c2 / c1 ) * c1 ) ); i = ( s - Math.floor( f2 / t ) / Math.floor( f1 / t ) ); ( Math.abs( i ) < e ) && ( c1 = 0 ); c2 = t; }
  
  //Compute fraction.
  
  f2 = Math.floor( f2 / c2 ); f1 = Math.floor( f1 / c2 ); if( f1 === 0 ){ f1 = 1; }
  
  //return the fraction.
  
  return( new Fract( f2, f1 ) );
}

//**********************************************************************************
//Convert an bit pattern, or data to it's best matching average division pattern.
//**********************************************************************************

Pattern.prototype.avgFract = function()
{
  //Initialize.
  
  var len = 3, c = this.getFract(), m = new Fract( 0, 0 );
  
  while( this.pat.length > 0 && len < 2251799813685248 && c.y !== m.y )
  {
    //Shift the pattern.
    
    m = c; len *= this.base; this.pat.shift();
    
    //Calculate pattern.
    
    c = this.getFract( len );
  }
  
  //Check if no pattern.
  
  if( this.pat.length === 0 ) { m = new Fract( 0, 0 ); }
  
  //Return the division pattern.
  
  return( m );
}

//**********************************************************************************
//Teach the compiler how to display patterns into the repeating binary sequence.
//**********************************************************************************

Pattern.prototype.toString = function()
{
  var out = ""; if( this.pat[0] && this.pat[0] === Infinity ) { return(""); }
  
  for( var i = 0; i < this.pat.length; out += String.fromCharCode( this.pat[i] < 10 ? 0x30 + this.pat[i] : 0x37 + this.pat[i] ), i++ );
  
  return( out + "\u221E" );
}

//**********************************************************************************
//Reverse float number pattern, and exponent adjust to smallest fraction.
//**********************************************************************************

Pattern.prototype.toFract = function( Float )
{
  //Convert pattern to fraction.
  
  var fr = this.getFract();
 
  //Compute Nominator.
  
  var e = Float ? Float / fr : fr; fr.x *= e;
  
  //Exponent adjust.
  
  while( Math.abs( Float - (  Math.round( fr.x ) / Math.round( fr.y ) ) ) > Number.EPSILON && fr.x !== Infinity ) { fr.x *= this.base; fr.y *= this.base; }
  
  //Result.
  
  fr.x = Math.round( fr.x ); fr.y = Math.round( fr.y ); return( fr );
}

//**********************************************************************************
//Adjust Float64 binary into sections extending from number.
//**********************************************************************************

Number.prototype.bits = function()
{
  if( this.b ) { return( this ); }; var f = this;
  
  //Is NaN.
  
  if( isNaN( f ) ) { this.sing = 0; this.exp = 2047; this.mantissa = 4503599627370495; return( this ); }

  //Infinity.
  
  if( !isFinite( f ) ) { this.exp = 2047; this.mantissa = 0; return( this ); }
  
  var o = new Number( this );
  
  //Compute Sing.

  o.sing = 0; if( f < 0 ) { f = -f; o.sing = 1; }
  
  //Compute Exponent.
    
  o.exp = Math.floor( Math.log( f ) / Math.log( 2 ) );
  
  //Adjust the number so that it is "0.Mantissa".
  
  if( -o.exp >= 0x3FF ) { f /= Math.pow( 2, -0x3FD ); o.exp = -0x3FF; } else { f /= Math.pow( 2, o.exp + 1 ); }
  
  //Compute Mantissa.
  
  o.mantissa = f * Math.pow( 2, 53 ); if( -o.exp !== 0x3FF ) { o.mantissa -= Math.pow( 2, 52 ); }
  
  //Center Exponent.
  
  o.exp = ( 0x3FF + o.exp ) & 0x7FF;
  
  //return the decoded float.
  
  o.b = true; return( o );
}

//**********************************************************************************
//Logical Bitwise and float64 binary values.
//**********************************************************************************

Number.prototype.and = function( fl2 ) { var fl1 = this.bits(), fl2 = fl2.bits();
  
  var f = fl1.mantissa & fl2.mantissa; if( f < 0 ) { f += 0x100000000; }
  
  f += ( ( fl1.mantissa / 0x100000000 ) & ( fl2.mantissa / 0x100000000 ) ) * 0x100000000;
  
  fl1.mantissa = f; fl1.exp &= fl2.exp; fl1.sing &= fl2.sing; return( fl1 ); }

//**********************************************************************************
//Logical Bitwise or float64 binary values.
//**********************************************************************************

Number.prototype.or = function( fl2 ) { var fl1 = this.bits(), fl2 = fl2.bits();
  
  var f = fl1.mantissa | fl2.mantissa; if( f < 0 ) { f += 0x100000000; }
  
  f += ( ( fl1.mantissa / 0x100000000 ) | ( fl2.mantissa / 0x100000000 ) ) * 0x100000000;
  
  fl1.mantissa = f; fl1.exp |= fl2.exp; fl1.sing |= fl2.sing; return( fl1 ); }

//**********************************************************************************
//Logical Bitwise xor float64 binary values.
//**********************************************************************************

Number.prototype.xor = function( fl2 ) { var fl1 = this.bits(), fl2 = fl2.bits();
  
  var f = fl1.mantissa ^ fl2.mantissa; if( f < 0 ) { f += 0x100000000; }
  
  f += ( ( fl1.mantissa / 0x100000000 ) ^ ( fl2.mantissa / 0x100000000 ) ) * 0x100000000;
 
  fl1.mantissa = f; fl1.exp ^= fl2.exp; fl1.sing ^= fl2.sing; return( fl1 ); }

//**********************************************************************************
//Logical Bitwise not float64 binary values.
//**********************************************************************************

Number.prototype.not = function() { var fl1 = this.bits();
  
  f = ~fl1.mantissa; if( f < 0 ) { f += 0x100000000; } f += ( ( ~( fl1.mantissa / 0x100000000 ) ) & 0xFFFFF ) * 0x100000000;
  
  fl1.mantissa = f; fl1.exp = ( ~fl1.exp ) & 0x7FF; fl1.sing = ( fl1.sing === 0 ) & 1; return( fl1 ); }

//**********************************************************************************
//Right shift float64 binary values.
//**********************************************************************************

Number.prototype.rsh = function( s1 )
{
  var f = this.bits(), s1 = s1 % 64, s2 = 0; ( s1 >= 32 ) && ( s1 -= ( s2 = s1 - 32 ) );
  
  f = [ ( ( ( f.sing << 31 | f.exp << 20 ) ) | Math.floor( f.mantissa / 0x100000000 ) ), f.mantissa & 0xFFFFFFFF ];
  
  var r = s1 === 32 ? f[0] : ( f[0] & ( ( 1 << s1 ) - 1 ) ); if( s1 === 32 ) { f[0] = 0; f[1] = 0; }
  
  r <<= 32 - s1; f[0] >>>= s1; f[1] = ( r >>> s2 ) | ( f[1] >>> s1 );
  
  if ( f[0] < 0 ) { f[0] += 0x100000000; } if ( f[1] < 0 ) { f[1] += 0x100000000; }
  
  this.sing = ( f[0] >> 31 ) & 1; this.exp = ( f[0] >> 20 ) & 0x7FF; this.mantissa = ( ( f[0] & 0xFFFFF ) * 0x100000000 ) + f[1];
  
  return( this );
}

//**********************************************************************************
//Left shift float64 binary values.
//**********************************************************************************

Number.prototype.lsh = function( s1 )
{
  var f = this.bits(), s1 = s1 % 64, s2 = 0; ( s1 >= 32 ) && ( s1 -= ( s2 = s1 - 32 ) );
  
  f = [ ( ( ( f.sing << 31 | f.exp << 20 ) ) | Math.floor( f.mantissa / 0x100000000 ) ), f.mantissa & 0xFFFFFFFF ];

  var r = f[1] & ( -1 << ( 32 - s1 ) ); if( s1 === 32 ){ f[1] = 0; f[0] = 0; }
  
  r >>>= ( 32 - s1 ); f[1] <<= s1; f[0] = ( r << s2 ) | ( f[0] << s1 );
  
  if ( f[0] < 0 ) { f[0] += 0x100000000; } if ( f[1] < 0 ) { f[1] += 0x100000000; }
  
  this.sing = ( f[0] >> 31 ) & 1; this.exp = ( f[0] >> 20 ) & 0x7FF; this.mantissa = ( ( f[0] & 0xFFFFF ) * 0x100000000 ) + f[1];
  
  return( this );
}

//**********************************************************************************
//Directly translate an float to fract matching denominator, and numerator.
//**********************************************************************************

Number.prototype.getFract = function( err )
{
  var v = this, s = this < 0; if( s ) { v = -v; }
  
  var f1 = new Fract( 1, 0 ), f2 = new Fract( 0, 1 );
  
  var er = ( v * ( Number.EPSILON * ( err || 0 ) ) );
  
  var r2 = v, r1 = 0, t = 0;

  //Continue till Denominator, and Numerator Divide exactly to float value minus "er" (Error).
  
  while ( Math.abs( v - f1 ) > er )
  {
    //Whole value.
    
    r1 = Math.floor( r2 );
    
    //Adjust denominator, and Numerator.
    
    t = f1.x; f1.x = r1 * f1.x + f2.x; f2.x = t;
    t = f1.y; f1.y = r1 * f1.y + f2.y; f2.y = t;
    
    //Remainder.
    
    r2 = 1 / ( r2 - r1 );
  }
  
  if( s ) { f1.x = -f1.x; }
  
  //Return fraction.
    
  return ( f1 );
}

//**********************************************************************************
//Directly translate an float to fract to it's best matching denominator, and numerator.
//**********************************************************************************

Number.prototype.avgFract = function()
{
  var Times = 0, OTimes = 0, Temp = new Fract( 0, 0 ), Cmp = new Fract( 0, 0 ), out = new Fract( 0, 0 );
  
  for( var i = 53; i > 0; Temp = this.getFract( Math.pow( 2, i-- ) ) )
  { 
    if( ( Temp + "" ) == ( Cmp + "" ) ) { Times++; } else { Cmp = Temp; OTimes = Times; Times = 0; }
    if( Times > OTimes ){ out = Temp; }
  }
  
  return( out );
}

//**********************************************************************************
//Convert number to an pattern. Default base is binary, but as an bit of extra fun any base is possible.
//**********************************************************************************

Number.prototype.toPattern = function( base )
{
  var pat = new Pattern(); base = base || 2;
  
  //Compute data.
  
  var d = ( this * Math.pow( base, ( Math.ceil( 36.04365338911715 / Math.log( base ) ) - Math.floor(Math.log( this ) / Math.log( base ) ) ) ) ).toString( base );
  
  //Create the pattern.
  
  for( var i = 0; i < d.length; pat.pat[ i ] = parseInt( d.charAt(i++), base ) ); pat.base = base;
  
  //Return the pattern data.
  
  return( pat );
}

//**********************************************************************************
//Create the new toString function to give the full number format.
//**********************************************************************************

var toString = Number.prototype.toString; Number.prototype.toString = function( base )
{
  //Regular to string if no bit's are defined.
 
  if( !this.b )
  {
	base = base || 10; this.t = toString; s = this.t( base );
	var n = s.charAt(0) === "-"; if( n ) { s = s.slice( 1, s.length ); }
    
    //If not base 10 then "0" count and add appropriate exponent.
    
    if( base != 10 )
    {
	  s = s.toUpperCase();
      var s2 = s.split("."), exp = 0, lim = ( Math.floor( Math.log( 4503599627370496 ) / Math.log( base ) ) + 1 ); 	
      
      //Compute the exponent.
      
      if( s2.length > 1 && s2[1].length > s2[0].length ) { exp = -s2[1].length; s2 = s2[1]; } else { exp = s2[0].length - 1; s2 = s2[0]; }
      s2 = s2.replace(/^0+|0+$/g, ""); if( exp < 0 ) { exp += s2.length - 1; }
      
      //If the length is outside of the 53 bit limitation of an float add the exponentiation.
      
      if( Math.abs( exp ) > lim ) { s = s2.charAt(0) + "." + s2.slice( 1, s2.length ) + "e" + exp.toString( base ).toUpperCase(); }
    }
    
	this.t = undefined; return( ( n ? "-" : "" ) + s );
  }
  
  //Check if invalid base setting.
  
  if( !base ){ base = 2; }; if( base < 2 || base > 36 ){ throw new Error( "RangeError: radix must be an integer at least 2 and no greater than 36" ); }
  
  //Number of digits End of 64 bit number.
  
  var str = "", e = Math.ceil( 44.3614195558365 / Math.log( base ) );
  
  //Convert the 64 bit number into two 32 bit unsigned integer numbers.
  
  var f = [ ( ( ( ( this.sing & 1 ) << 31 | ( this.exp & 0x7FF ) << 20 ) ) | ( ( this.mantissa / 0x100000000 ) & 0xFFFFF ) ), this.mantissa & 0xFFFFFFFF ];
  
  //Adjust to unsigned.
  
  if ( f[0] < 0 ) { f[0] += 0x100000000; }; if ( f[1] < 0 ) { f[1] += 0x100000000; }
  
  //Divide the number into parts of 2 for binary, or 10 as decimal, or as 16 as hexadecimal, or any range in between, or higher.
  
  for( var i = 0, DigitV = 0; i < e; i++ )
  {
    //Divide higher 32 bits, and floor off the number store floored value in Digit.
 
    DigitV = f[ 0 ] - ( ( f[ 0 ] = Math.floor( f[ 0 ] / base ) ) * base );
    
    //Divide lower 32 bit's including the floored off value in the higher 32 bit's.
    
    f[ 1 ] = ( ( DigitV * 0x100000000 ) + f[ 1 ] ) / base;
    
    //Round off the remainder and store the digit value that is between the number base into Digit.
    
    DigitV = Math.round( ( f[1] - Math.floor( f[1] ) ) * base ); f[ 1 ] = Math.floor( f[ 1 ] );
 
    //Digit 0 through 9, and A to Z by unit size per column.
    
    DigitV = DigitV < 10 ? 0x30 + DigitV : 0x37 + DigitV;
    
    //Write char to string.
    
    str = String.fromCharCode( DigitV ) + str;
  }
  
  //Return the String representation of the float numbers bit's.
  
  return( str );
}

//**********************************************************************************
//Convert the float number to value when adding, or doing integer logic operations.
//**********************************************************************************

Number.prototype.valueOf = function()
{
  if( !this.b ){ return( this ); }
  
  //Remove overflow.
  
  this.sing = this.sing & 1; this.exp = this.exp & 0x7FF; if( this.mantissa < 0 ){ this.mantissa = ( -this.mantissa ) - 1; }
  if( this.mantissa > 4503599627370495 ){ this.mantissa -= Math.floor( this.mantissa / 4503599627370496 ) * 4503599627370496; }

  //Compute "0.Mantissa".

  var float = ( ( this.exp !== 0 ? Math.pow( 2, 52 ) : 0 ) + this.mantissa ) / Math.pow( 2, 52 );
  
  //Compute exponent value as positive value 1e?.
  
  var exp = Math.pow( 2, Math.abs( ( this.exp !== 0 ? this.exp : this.exp + 1 ) - 0x3FF ) );
  
  //Adjust "0.Mantissa" to exponent. Multiply if positive 1e?, divide if negative 1e-?.
    
  if( this.exp > 0x3FF ) { float = float * exp; } else { float = float / exp; }
  
  //Nan.

  if( !isFinite( float ) && this.mantissa > 0 ) { float = NaN; }

  //return Float value with proper sing.
  
  return( this.sing >= 1 ? -float : float );
}

//**********************************************************************************
//Update the parse float function to be more accurate, and to support all number bases.
//**********************************************************************************

function parseFloat( str, base )
{
  function RoundOff( v, str, base )
  {
    str = str.replace(".",""); str = str.split("e")[0]; v = v.bits();
    
    for( var i = 0, o = v.mantissa; i < base; i++ )
    {
	  v.mantissa -= i; cmp = v.valueOf().toString(base); cmp = cmp.replace(".",""); cmp = cmp.split("e")[0];
	  if( ( str.indexOf(cmp) - ( str.length - cmp.length ) ) === 0 && str.indexOf(cmp) >= 0 ) { return( v.valueOf() ); } v.mantissa = o;
      v.mantissa += i; cmp = v.valueOf().toString(base); cmp = cmp.replace(".",""); cmp = cmp.split("e")[0];
	  if( ( str.indexOf(cmp) - ( str.length - cmp.length ) ) === 0 && str.indexOf(cmp) >= 0 ) { return( v.valueOf() ); } v.mantissa = o;
    }
    
    return( v.valueOf() );
  }
  
  //If no base setting parse float as an base 10 number.

  base = base || 10;
  
  //Check base range.
  
  if( base < 2 || base > 36 ){ throw new Error( "RangeError: radix must be an integer at least 2 and no greater than 36" ); }
  
  //The center point of an number meaning "7.25" is the ".".

  var center = 0;
  
  //The sing if negative or positive.
  
  var sing = false;
  
  //Iterate though the character values in the string building the number.

  for( var i = 0, Digit = 0, f = 0; i < str.length; i++ )
  {
    Digit = str.charCodeAt( i ); Digit = Digit < 0x40 ? Digit - 0x30 : Digit - 0x37;

    //Put digit into value.

    if( Digit < base && Digit >= 0 ) { f = center ? f + ( Digit / ( center *= base ) ) : ( f * base ) + Digit; }

    //Center "." Point.

    else if( Digit === -2 && !center ){ center = 1; }
    
    //Signified adjust.

    else if( Digit === -3 && !sing ){ sing = true; }
    
    //Exponent adjustment.

    else if( Digit === 46 ){ f *= Math.pow( base, parseInt( str.slice( i + 1, str.length ), base ) ); f = RoundOff( f, str, base ); return( sing ? -f : f ); }

    //Else return "NaN" as it is not an number.

    else { return( NaN ); }
  }
  
  f = RoundOff( f, str, base ); return( ( sing ? -f : f ).valueOf() );
}

//**********************************************************************************
//Create the new parse to Number function.
//**********************************************************************************

var parseNumber = function( str, base )
{ 
  //Check if invalid base setting.
  
  var e = str.length; base = base || 2; base &= -1;
  if( base < 2 || base > 36 ){ throw new Error( "RangeError: radix must be an integer at least 2 and no greater than 36" ); }
    
  //Contains the decoded bit's of the Float64 value.

  for( var i = 0, Digit = 0, f = [ 0, 0 ]; i < e; i++ )
  {
    Digit = str.charCodeAt( i ); Digit = Digit < 0x40 ? Digit - 0x30 : Digit - 0x37;

    //Check if number is valid.

    if( Digit < base && Digit >= 0 )
    {
      f[1] = ( f[1] * base ) + Digit; f[0] = ( f[0] * base ) + ( Digit = Math.floor( f[1] / 0x100000000 ) ); f[1] -= Digit * 0x100000000;
    }

    //Else return undefined as it is not an number.

    else { return; }
  }

  //Put number together.
  
  var fl = new Number(0); fl.b = true; fl.sing = ( f[0] >> 31 ) & 1; fl.exp = ( f[0] >> 20 ) & 0x7FF; fl.mantissa = ( ( f[0] & 0xFFFFF ) * 0x100000000 ) + f[1]; return( fl );
}

//**********************************************************************************
//Create the new parse to Pattern type function.
//**********************************************************************************

var parsePattern = function( str, base )
{
  var pat = new Pattern(); base = base || 2; pat.base = base; str = str.replace( "\u221E", "" ).toUpperCase();
  
  //Check if invalid base setting.
  
  if( base < 2 || base > 36 ){ throw new Error( "RangeError: radix must be an integer at least 2 and no greater than 36" ); }
  
  //Parse the pattern return undefined if improper format.
  
  for( var i = 0; i < str.length; i++ )
  {
	pat.pat[ i ] = str.charCodeAt( i ) < 0x40 ? str.charCodeAt( i ) - 0x30 : str.charCodeAt( i ) - 0x37;
    if( pat.pat[ i ] >= base || pat.pat[ i ] < 0 ) { return; };
  }
  
  //Return the pattern data.
  
  return( pat );
}

//**********************************************************************************
//Error correct an number.
//**********************************************************************************

Number.prototype.err = function(){ return( this.avgFract().valueOf() ); }
