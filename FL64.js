//**********************************************************************************
//Simple function for if value is an number.
//**********************************************************************************

Object.prototype.isNum = function() { if ( isNaN( this ) ) { throw new TypeError( "Expected Number;" ); } }

//**********************************************************************************
//Construct the new fraction data type.
//**********************************************************************************

var Fract = function( X, Y )
{
  if ( arguments.length > 1 )
  {
    //check if fraction is valid.
    
    X.isNum(); Y.isNum(); this.x = Math.round( X ); this.y = Math.round( Y );
  }
  
  //Else default fraction.
  
  else { this.x = 0; this.y = 0; }
  
  return( this );
}

//**********************************************************************************
//Do division one step at an time stopping at the pattern in the division.
//Default base is binary, however base can be set 2 though 36.
//**********************************************************************************

Fract.prototype.divP = function( base )
{
  //Pattern data type.
  
  var pat = new Pattern(); pat.base = base || 2; pat.base.isNum();
  
  //Fraction to divide.
  
  n1 = Math.abs( this.x ), n2 = Math.abs( this.y );
  
  //Data of the divide operation.
  
  pat.data = [ n1 ];
  
  //El (Element), and C (Current element), and whether to force computation.
  
  var El = -1, C = 0;
  
  //Get time. This is set for if the calculation takes longer than 7 seconds.
  
  var t = new Date().getTime();
  
  //If divide by 0.
  
  if ( pat.data[ 0 ] === 0 ) { pat.pat = [ 0 ]; pat.data = null; return ( pat ); }
  
  //While the Element is not equal to the divide going in and coming out.
  
  while ( El === -1 )
  {
    if ( ( new Date().getTime() - t ) > 7000 ) { pat.pat = [ Infinity ]; return ( pat ); }
    
    for ( var Exp = pat.data[ pat.data.length - 1 ], i = 0; ( Exp - n2 ) < 0; Exp *= pat.base, i++ )
    {
      if ( i >= 1 )
      {
        pat.pat[ pat.pat.length ] = 0; pat.data[ pat.data.length ] = null;
      }
    }
    
    i = ( ( Exp / n2 ) & -1 ); pat.pat[ pat.pat.length ] = i; C = Exp - ( n2 * i ); pat.data[ pat.data.length ] = C;
    
    for ( El = pat.data.length - 2; El > -1 && pat.data[ El ] !== C; El-- );
    
    if ( C === 0 ) { pat.pat = [ 0 ]; pat.data = null; return ( pat ); }
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
  
  var t = 0, e1 = 0, e2 = Number.EPSILON * ( err || 1 ); e2.isNum();
  
  //Reduce as small as possible.
  
  while ( c.x )
  {
    t = c.x; c.x = ( c.y - ( Math.floor( c.y / c.x ) * c.x) );
    
    e1 = ( this - Math.floor( this.x / t ) / Math.floor( this.y / t ) );
    
    ( Math.abs( e1 ) < e2 ) && ( c.x = 0 ); c.y = t;
  }
  
  //Return result.
  
  c.x = Math.floor( this.x / c.y ); c.y = Math.floor( this.y / c.y ); return ( c );
}

//**********************************************************************************
//Teach compiler how to display fraction data type, or to combine it as code.
//**********************************************************************************

var Oporators = [
  "*", "*=", "/", "/=", "+", "+=", "-", "-=", "%", "%=", "**", "**=",
  "&", "&=", "|", "|=", "~", "~", "^", "^=", "<<", "<<=", ">>", ">>=", ">>>", ">>>=",
  "<", "<=", ">", ">=", "==", "===", "!=", "!==", "&&", "&&=", "||", "||=", "!", "!=", "", "="
];

Fract.prototype.toString = function( op, s )
{
  var out = "", sum = Math.floor( Math.abs( Math.round( this.x ) ) / Math.abs( Math.round( this.y ) ) );
  
  //Check if operator is valid.
  
  if( op != undefined && ( op = Oporators.indexOf(op) ) < 0 ) { throw ( new Error( "Operator is not supported." ) ); }
  
  //Is the value of the fraction negative or positive. Note if "s" is true force absolute value.
  
  var sing = ( this.x ^ this.y ) < 0;
  
  if( s ) { sing = false; }
  
  //subtract sum amount leaving the remainder of the fractional part.
  
  var re = Math.abs( Math.abs( this.x ) - ( Math.abs( this.y ) * Math.abs( sum ) ) );
  
  //If has fractional part.
  
  if ( re !== 0 && !( op > 11 && op < 26 ) )
  {
    if ( sing ) { out += "-"; sing = ~sing; }
	
    //Multiply, and Divide flip if it is 1 divided by.
    
    if( ( re === 1 && sum === 0 ) && ( op < 4 ) ) { op += op < 2 ? 2 : -2; }
    
    //Else Regular fraction amount.
    
    else { out += re + ( op != undefined ? " / " : "\xF7" ); }
    
    //Divided by.
    
    out += Math.abs( this.y );
  }
  
  //Sum amount.
  
  if ( sum !== 0 ) {  out += !sing ? ( out == "" ? "" : " + " ) : " - "; out += sum; }
  
  //If fraction and sum is combined with operation must be put in parenthesis.
  
  if( op != undefined && re !== 0 && sum !== 0 && ( ( op & 1 ) == 0 && op < 12 ) ) { out = "( " + out + " )"; }
  
  //Return value.
  
  if( Oporators[ op ] ) { out = Oporators[ op ] + " " + out; } else { out = out.replace( / /g, "" ); }
  
  return ( out !== "" ? out : "0" );
}

//**********************************************************************************
//Teach the compiler how to read the value of an fraction.
//**********************************************************************************

Fract.prototype.valueOf = function() { return ( this.x / this.y ); }

//**********************************************************************************
//The pattern data type is used for numbers that do not divide thus the pattern can be stored separably as an data type.
//**********************************************************************************

var Pattern = function( str, base )
{
  base = base || 2; base.isNum(); this.base = base; this.pat = []; str = str || ""; str = str.replace( "\u221E", "" ).toUpperCase();
  
  //Check if invalid base setting.
  
  if ( base < 2 || base > 36 ) { throw new Error( "RangeError: radix must be an integer at least 2 and no greater than 36" ); }
  
  //Parse the pattern return undefined if improper format.
  
  for ( var i = 0; i < str.length; i++ )
  {
    this.pat[i] = str.charCodeAt( i ) < 0x40 ? str.charCodeAt( i ) - 0x30 : str.charCodeAt( i ) - 0x37;
    if ( this.pat[ i ] >= base || this.pat[ i ] < 0 ) { this.pat = [ Infinity ]; return; };
  }
  
  //Return the pattern data.
  
  return ( this );
}

//**********************************************************************************
//Convert patterns into an fraction that generates the division pattern.
//**********************************************************************************

Pattern.prototype.getFract = function( err )
{
  //Initialize.
  
  var f1 = 1, f2 = 0, c1 = 0, c2 = 0, t = 0, e = Number.EPSILON * ( err || 1 ); e.isNum();
  
  //Calculate pattern in the limitation of 53 mantissa bit's.
  
  for ( var i = Math.min( this.pat.length - 1, ( 36.7368005696771 / Math.log( this.base ) + 0.5 ) & -1 ); i > -1; f2 += this.pat[ i-- ] * f1, f1 *= this.base );
  
  f1 -= 1; c1 = f2; c2 = f1; s = f2 / f1;
  
  //Find best matching whole fraction.
  
  while ( c1 ) { t = c1; c1 = ( c2 - ( Math.floor( c2 / c1 ) * c1 ) ); i = ( s - Math.floor( f2 / t ) / Math.floor( f1 / t ) ); ( Math.abs( i ) < e ) && ( c1 = 0 ); c2 = t; }
  
  //Compute fraction.
  
  f2 = Math.floor( f2 / c2 ); f1 = Math.floor( f1 / c2 ); if ( f1 === 0 ) { f1 = 1; }
  
  //return the fraction.
  
  return ( new Fract( f2, f1 ) );
}

//**********************************************************************************
//Convert an bit pattern, or data to it's best matching average division pattern.
//**********************************************************************************

Pattern.prototype.avgFract = function()
{
  //Initialize.
  
  var len = 3, c = this.getFract(), m = new Fract( 0, 0 );
  
  while ( this.pat.length > 0 && len < 2251799813685248 && c.y !== m.y )
  {
    //Shift the pattern.
    
    m = c; len *= this.base; this.pat.shift();
    
    //Calculate pattern.
    
    c = this.getFract( len );
  }
  
  //Check if no pattern.
  
  if (this.pat.length === 0) { m = new Fract( 0, 0 ); }
  
  //Return the division pattern.
  
  return ( m );
}

//**********************************************************************************
//Teach the compiler how to display patterns into the repeating binary sequence.
//**********************************************************************************

Pattern.prototype.toString = function()
{
  var out = ""; if ( this.pat[0] && this.pat[0] === Infinity ) { return ( "" ); }
  
  for (var i = 0; i < this.pat.length; out += String.fromCharCode( this.pat[ i ] < 10 ? 0x30 + this.pat[ i ] : 0x37 + this.pat[ i ] ), i++ );
  
  return ( out + "\u221E" );
}

//**********************************************************************************
//Reverse float number pattern, and exponent adjust to smallest fraction.
//**********************************************************************************

Pattern.prototype.toFract = function( Float )
{
  //Convert pattern to fraction.
  
  Float.isNum(); var fr = this.getFract();
  
  //Compute Nominator.
  
  var e = Float ? Float / fr : fr; fr.x *= e;
  
  //Exponent adjust.
  
  while ( Math.abs( Float - ( Math.round( fr.x ) / Math.round( fr.y ) ) ) > Number.EPSILON && fr.x !== Infinity ) { fr.x *= this.base; fr.y *= this.base; }
  
  //Result.
  
  fr.x = Math.round( fr.x ); fr.y = Math.round( fr.y ); return ( fr );
}

//**********************************************************************************
//Last binary digit of acuracy in an float 64 number.
//**********************************************************************************

Number.EPSILON = 1 / Math.pow( 2, 52 );

//**********************************************************************************
//Adjust Float64 binary into sections extending from number.
//**********************************************************************************

Number.prototype.bits = function()
{
  if ( this.b ) { return ( this ); }; var f = this;
  
  //Construct new number.
  
  var o = new Number( this ); o.b = true;
  
  //Is NaN.
  
  if ( isNaN( f ) ) { this.sing = 0; this.exp = 2047; this.mantissa = 4503599627370495; return ( this ); }
  
  //Infinity.
  
  if ( !isFinite( f ) ) { this.sing = ( f < 0 ) & 1; this.exp = 2047; this.mantissa = 0; return ( this ); }
  
  //Compute Sing.
  
  o.sing = 0; if ( f < 0 ) { f = -f; o.sing = 1; }
  
  //Compute Exponent.
  
  o.exp = Math.floor( Math.log( f ) / Math.log( 2 ) );
  
  //Adjust the number so that it is "0.Mantissa".
  
  if ( -o.exp >= 0x3FF ) { f /= Math.pow( 2, -0x3FD ); o.exp = -0x3FF; } else { f /= Math.pow( 2, o.exp + 1 ); }
  
  //Compute Mantissa.
  
  o.mantissa = f * Math.pow( 2, 53 ); if ( -o.exp !== 0x3FF ) { o.mantissa -= Math.pow( 2, 52 ); }
  
  //Center Exponent.
  
  o.exp = (0x3FF + o.exp) & 0x7FF;
  
  //return the decoded float.
  
  if ( o.mantissa > 4503599627370495 ) { o.exp++; o.mantissa -= Math.floor( o.mantissa / 4503599627370496 ) * 4503599627370496; }
  
  return ( o );
}

//**********************************************************************************
//Logical Bitwise and float64 binary values.
//**********************************************************************************

Number.prototype.bitAnd = function( fl2 ) { fl2.isNum(); var fl1 = new Number( this ).bits(), fl2 = fl2.bits();
  
  var f = fl1.mantissa & fl2.mantissa; if ( f < 0 ) { f += 0x100000000; }
  
  f += ( ( fl1.mantissa / 0x100000000 ) & ( fl2.mantissa / 0x100000000 ) ) * 0x100000000;
  
  fl1.mantissa = f; fl1.exp &= fl2.exp; fl1.sing &= fl2.sing; return ( fl1 ); }

//**********************************************************************************
//Logical Bitwise or float64 binary values.
//**********************************************************************************

Number.prototype.bitOr = function( fl2 ) { fl2.isNum(); var fl1 = new Number( this ).bits(), fl2 = fl2.bits();
  
  var f = fl1.mantissa | fl2.mantissa; if ( f < 0 ) { f += 0x100000000; }
  
  f += ( ( fl1.mantissa / 0x100000000 ) | ( fl2.mantissa / 0x100000000 ) ) * 0x100000000;
  
  fl1.mantissa = f; fl1.exp |= fl2.exp; fl1.sing |= fl2.sing; return ( fl1 ); }

//**********************************************************************************
//Logical Bitwise xor float64 binary values.
//**********************************************************************************

Number.prototype.bitXor = function( fl2 ) { fl2.isNum(); var fl1 = new Number( this ).bits(), fl2 = fl2.bits();
  
  var f = fl1.mantissa ^ fl2.mantissa; if ( f < 0 ) { f += 0x100000000; }
  
  f += ( ( fl1.mantissa / 0x100000000 ) ^ ( fl2.mantissa / 0x100000000 ) ) * 0x100000000;
  
  fl1.mantissa = f; fl1.exp ^= fl2.exp; fl1.sing ^= fl2.sing; return ( fl1 ); }

//**********************************************************************************
//Logical Bitwise not float64 binary values.
//**********************************************************************************

Number.prototype.bitNot = function() { var fl1 = new Number( this ).bits();
  
  f = ~fl1.mantissa; if ( f < 0 ) { f += 0x100000000; } f += ( ( ~( fl1.mantissa / 0x100000000 ) ) & 0xFFFFF ) * 0x100000000;
  
  fl1.mantissa = f; fl1.exp = ( ~fl1.exp ) & 0x7FF; fl1.sing = ( fl1.sing === 0 ) & 1; return ( fl1 ); }

//**********************************************************************************
//Right shift float64 binary values.
//**********************************************************************************

Number.prototype.bitRsh = function( s1 )
{
  s1.isNum(); var o = new Number( this ), f = this.bits(), s1 = s1 % 64, s2 = 0; ( s1 >= 32 ) && ( s1 -= ( s2 = s1 - 32 ) );
  
  f = [ ( ( ( f.sing << 31 | f.exp << 20 ) ) | Math.floor( f.mantissa / 0x100000000 ) ), f.mantissa & 0xFFFFFFFF ];
  
  var r = s1 === 32 ? f[ 0 ] : ( f[ 0 ] & ( ( 1 << s1 ) - 1 ) ); if ( s1 === 32 ) { f[ 0 ] = 0; f[ 1 ] = 0; }
  
  r <<= 32 - s1; f[ 0 ] >>>= s1; f[ 1 ] = ( r >>> s2 ) | ( f[ 1 ] >>> s1 );
  
  if ( f[ 0 ] < 0 ) { f[ 0 ] += 0x100000000; } if ( f[ 1 ] < 0 ) { f[ 1 ] += 0x100000000; }
  
  o.b = true; o.sing = ( f[ 0 ] >> 31 ) & 1; o.exp = ( f[ 0 ] >> 20 ) & 0x7FF; o.mantissa = ( ( f[ 0 ] & 0xFFFFF ) * 0x100000000 ) + f[ 1 ];
  
  return ( o );
}

//**********************************************************************************
//Left shift float64 binary values.
//**********************************************************************************

Number.prototype.bitLsh = function( s1 )
{
  s1.isNum(); var o = new Number( this ), f = o.bits(), s1 = s1 % 64, s2 = 0; ( s1 >= 32 ) && ( s1 -= ( s2 = s1 - 32 ) );
  
  f = [ ( ( ( f.sing << 31 | f.exp << 20 ) ) | Math.floor( f.mantissa / 0x100000000 ) ), f.mantissa & 0xFFFFFFFF ];
  
  var r = f[ 1 ] & ( -1 << ( 32 - s1 ) ); if ( s1 === 32 ) { f[ 1 ] = 0; f[ 0 ] = 0; }
  
  r >>>= ( 32 - s1 ); f[ 1 ] <<= s1; f[ 0 ] = ( r << s2 ) | ( f[ 0 ] << s1 );
  
  if ( f[ 0 ] < 0 ) { f[ 0 ] += 0x100000000; } if ( f[ 1 ] < 0 ) { f[ 1 ] += 0x100000000; }
  
  o.b = true; o.sing = ( f[ 0 ] >> 31 ) & 1; o.exp = ( f[ 0 ] >> 20 ) & 0x7FF; o.mantissa = ( ( f[ 0 ] & 0xFFFFF ) * 0x100000000 ) + f[ 1 ];
  
  return ( o );
}

//**********************************************************************************
//Directly translate an float to fract matching denominator, and numerator.
//**********************************************************************************

Number.prototype.getFract = function( err )
{
  var v = this, s = this < 0; if ( s ) { v = -v; }
  
  var f1 = new Fract( 1, 0 ), f2 = new Fract( 0, 1 );
  
  var er = ( v * ( Number.EPSILON * ( err || 0 ) ) ); er.isNum(); 
  
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
  
  if ( s ) { f1.x = -f1.x; }
  
  //Return fraction.
  
  return ( f1 );
}

//**********************************************************************************
//Directly translate an float to fract to it's best matching denominator, and numerator.
//**********************************************************************************

Number.prototype.avgFract = function()
{
  var Times = 0, OTimes = 0, Temp = new Fract( 0, 0 ), Cmp = new Fract( 0, 0 ), out = new Fract( 0, 0 );
  
  for ( var i = 53; i > 0; Temp = this.getFract( Math.pow( 2, i-- ) ) )
  {
    if ( ( Temp + "" ) == ( Cmp + "" ) ) { Times++; } else { Cmp = Temp; OTimes = Times; Times = 0; }
    if ( Times > OTimes ) { out = Temp; }
  }
  
  return ( out );
}

//**********************************************************************************
//Convert number to an pattern. Default base is binary, but as an bit of extra fun any base is possible.
//**********************************************************************************

Number.prototype.toPattern = function( base )
{
  var pat = new Pattern(); base = base || 2; base.isNum(); 
  
  //Compute data.
  
  var d = ( this * Math.pow( base, ( Math.ceil( 36.04365338911715 / Math.log(base) ) - Math.floor( Math.log( this ) / Math.log( base ) ) ) ) ).toString( base, true );
  d = d.replace(".", "").split("e")[ 0 ];
  
  //Create the pattern.
  
  for ( var i = 0; i < d.length; pat.pat[ i ] = parseInt( d.charAt( i++ ), base ) );
  
  //Return the pattern data.
  
  return ( pat );
}

//**********************************************************************************
//Create the new toString function to give the full number format.
//**********************************************************************************

Number.prototype.toString = function( base, MostAcurate )
{
  //If base is an string then it is an operation.

  if( typeof base === 'string' )
  {
    //Output and select operator.

    var out = this, op = Oporators.indexOf( base );

    //Check if operator is valid.
  
    if( op != undefined && op < 0 ) { throw ( new Error( "Operator is not supported." ) ); }

    //Adjust for absolute value.

    if ( MostAcurate && out < 0 ) { out = -out; }

    //Not all operators are fractional some are integer operations.

    if( op > 11 && op < 26 ){ out = out & -1; }

    //Return output.

    return ( ( Oporators[op] !== "" ? Oporators[op] + " " : "" ) + out + "" );
  }
  
  //Else Check if invalid base setting.
  
  base = ( base & -1 ) || ( this.b ? 2 : 10 ); if ( base < 2 || base > 36 ) { throw new Error("RangeError: radix must be an integer at least 2 and no greater than 36"); }
  
  //The string representing the character output of the number value.
  
  var str = "";
  var c = 0, sec = 0, nexp = 0, rexp = 0, out = [ 0, 0, 0, 0 ];
  
  //If number is in bits mode.
  
  if ( this.b )
  {
    out = [ ( ( ( ( this.sing & 1 ) << 31 | ( this.exp & 0x7FF ) << 20 ) ) | ( ( this.mantissa / 0x100000000 ) & 0xFFFFF ) ), this.mantissa & 0xFFFFFFFF, 0, 0 ];
    if ( out[ 0 ] < 0 ) { out[ 0 ] += 0x100000000; }; if ( out[ 1 ] < 0 ) { out[ 1 ] += 0x100000000; }
  }
  
  //Else Decode the number into it's bits and float value.
  
  else
  {
    var fl = this.bits();
    
    if ( fl.exp === 0 && fl.mantissa === 0 ) { return ( "0" ); } else if ( fl.exp >= 2047 ) { if ( fl.mantissa > 0 ) { return ( "NaN" ); } else { return ( fl.sing ? "-Infinity" : "Infinity" ); } }
    
    //Load four 52bit mantissa values in appropriate number base rounding off at the last digit of accuracy.
    
    var val = [ sec = Math.pow( base, rexp = ( Math.floor( Math.log( Math.pow( 2, 52 ) ) / Math.log( base ) ) - 1 ) ), 0, 0, 0 ];
    
    //Calculate the exponents distance from center.
    
    fl.exp -= 0x3FF;
    
    //Shortcut for computing number bases.
    
    if ( base === 2 || base === 4 || base === 8 || base === 16 || base === 32 ) { var s = Math.log( base ) / Math.log( 2 ); nexp = ( fl.exp / s ) & -1; fl.exp %= s; MostAcurate = true; }
    
    //IF exponent is zero the first bit in the mantissa is the exponent position from center.
    
    if ( fl.exp === -0x3FF ) { fl.exp -= ( ( c = 52 - Math.floor( Math.log( fl.mantissa ) / Math.log( 2 ) ) ) ) - 1; fl.mantissa *= Math.pow( 2, c ); } else { fl.mantissa += Math.pow( 2, 52 ); }
    
    //Add the number together in select number base.
    
    while ( fl.mantissa > 0 )
    {
      //If exponent is zero shift down the value as each bit value in mantissa bit's and add them.
      
      if ( fl.exp === 0 )
      {
        if ( ( fl.mantissa - 4503599627370496 ) >= 0 )
        {
          fl.mantissa -= 4503599627370496;
          out[ 0 ] += val[ 0 ]; out[ 1 ] += val[ 1 ]; out[ 2 ] += val[ 2 ]; out[ 3 ] += val[ 3 ];
          out[ 2 ] += c = Math.floor( out[ 3 ] / sec ); out[ 3 ] -= c * sec;
          out[ 1 ] += c = Math.floor( out[ 2 ] / sec ); out[ 2 ] -= c * sec;
          out[ 0 ] += c = Math.floor( out[ 1 ] / sec ); out[ 1 ] -= c * sec;
        }
        
        //Shift value down.
        
        fl.exp--; fl.mantissa *= 2;
      }
      
      //Do not let the whole values go outside of the accuracy range limit.
      
      else
      {
        if ( val[ 0 ] < sec )
        {
          val[ 3 ] *= base; val[ 2 ] *= base; val[ 1 ] *= base; val[ 0 ] *= base;
          val[ 2 ] += c = Math.floor( val[ 3 ] / sec ); val[ 3 ] -= c * sec;
          val[ 1 ] += c = Math.floor( val[ 2 ] / sec ); val[ 2 ] -= c * sec;
          val[ 0 ] += c = Math.floor( val[ 1 ] / sec ); val[ 1 ] -= c * sec;
          nexp--;
        }
        
        if ( val[ 0 ] > sec )
        {
          c = val[ 0 ] - ( ( val[ 0 ] = Math.floor( val[ 0 ] / base ) ) * base );
          c = ( ( c * sec ) + val[ 1 ] ) - ( ( val[ 1 ] = Math.floor( ( ( c * sec ) + val[ 1 ] ) / base ) ) * base );
          c = ( ( c * sec ) + val[ 2 ] ) - ( ( val[ 2 ] = Math.floor( ( ( c * sec ) + val[ 2 ] ) / base ) ) * base );
          val[ 3 ] = Math.floor( ( ( c * sec ) + val[ 3 ] ) / base );
          nexp++;
        }
      }
      
      //Adjust the base value by an binary exponent.
      
      if ( fl.exp < 0 )
      {
        c = val[ 0 ] - ( ( val[ 0 ] = Math.floor( val[ 0 ] / 2 ) ) * 2 );
        c = ( ( c * sec ) + val[ 1 ] ) - ( ( val[ 1 ] = Math.floor( ( ( c * sec ) + val[ 1 ] ) / 2 ) ) * 2 );
        c = ( ( c * sec ) + val[ 2 ] ) - ( ( val[ 2 ] = Math.floor( ( ( c * sec ) + val[ 2 ] ) / 2 ) ) * 2 );
        val[ 3 ] = Math.floor( ( ( c * sec ) + val[ 3 ] ) / 2 );
        fl.exp++;
      }
      else if ( fl.exp > 0 )
      {
        val[ 3 ] *= 2; val[ 2 ] *= 2; val[ 1 ] *= 2; val[ 0 ] *= 2;
        val[ 2 ] += c = Math.floor( val[ 3 ] / sec ); val[ 3 ] -= c * sec;
        val[ 1 ] += c = Math.floor( val[ 2 ] / sec ); val[ 2 ] -= c * sec;
        val[ 0 ] += c = Math.floor( val[ 1 ] / sec); val[ 1 ] -= c * sec;
        fl.exp--;
      }
    }
    
    //if Most accurate is not set round off the value.
    
    if ( !MostAcurate )
    {
      out[ 1 ] = Math.round( out[ 1 ] / ( sec / base ) ) * ( sec / base );
      out[ 0 ] += c = Math.floor( out[ 1 ] / sec ); out[ 1 ] -= c * sec;
      out[ 3 ] = 0; out[ 2 ] = 0;
    }
    
    //Else round off the last digit of accuracy.
    
    else
    {
      out[ 3 ] = Math.round( out[ 3 ] / ( base * base * base ) ) * ( base * base * base );
      out[ 2 ] += c = Math.floor( out[ 3 ] / sec ); out[ 3 ] -= c * sec;
      out[ 1 ] += c = Math.floor( out[ 2 ] / sec ); out[ 2 ] -= c * sec;
      out[ 0 ] += c = Math.floor( out[ 1 ] / sec ); out[ 1 ] -= c * sec;
    }
  }
  
  //Divide the sections into parts of 2 for binary, or 10 as decimal, or as 16 as hexadecimal, or any range in between, or higher.
  
  if ( !this.b )
  {
    str = [ "", "", "", "" ];
    
    for ( var DigitV = 0, i = 0, rd = false; Math.floor( sec ) !== 0; i++ )
    {
      //Divide.
      
      DigitV = ( out[ i ] / sec ) & -1; out[ i ] -= DigitV * sec;
      
      //Digit 0 through 9, and A to Z by unit size per column.
      
      DigitV = DigitV < 10 ? 0x30 + DigitV : 0x37 + DigitV;
      
      //Write char to string.
      
      str[ i ] += String.fromCharCode( DigitV );
      
      //Switch to next digit.
      
      if ( i > 2 || !rd ) { sec /= base; i = -1; rd = true; }
    }
    
    //combine the sections together.
    
    nexp -= ( str[ 0 ].length - ( str[ 0 ] = str[ 0 ].replace( /^0+/, "" ) ).length );
    str = ( str[ 0 ] + str[ 1 ] + str[ 2 ] + str[ 3 ]).replace( /0+$/, "" );
    
    //Exponent if not in bit representation mode.
    
    if ( Math.abs( nexp ) > rexp )
    {
      str = str.charAt( 0 ) + ( str.length > 1 ? "." : "" ) + str.slice( 1, str.length ) + "e" + ( nexp > 0 ? "+" : "-" );
      nexp = Math.abs( nexp ); out[ 1 ] = nexp;
    }
    else if ( nexp < str.length && nexp >= 0 )
    {
      str = str.slice( 0, nexp + 1 ) + ( nexp !== ( str.length - 1 ) ? "." : "" ) + str.slice( nexp + 1, str.length ); nexp = 0;
    }
    else
    {
      while ( nexp > 0 ) { str += "0"; nexp--; }
      if ( nexp < 0 ) { nexp++; while ( nexp < 0 ) { str = "0" + str; nexp++; } str = "." + str; }
    }
    
    if ( str.charAt( 0 ) === "." ) { str = "0" + str; }
    
    str = ( fl.sing ? "-" : "" ) + str;
  }
  
  //Decode the exponent to characters, or all 64 bit's of an float number if bit's mode.
  
  var end = nexp > 0 ? Math.ceil( Math.log( nexp ) / Math.log( base ) ) : Math.ceil( 44.3614195558365 / Math.log( base ) );
  
  //Divide the number into parts of 2 for binary, or 10 as decimal, or as 16 as hexadecimal, or any range in between, or higher.
  
  if ( Math.max( out[ 0 ], out[ 1 ] ) > 0 || this.b )
  {
    var t = "";
    
    for ( var i = 0, DigitV = 0; i < end; i++ )
    {
      //Divide higher 32 bits, and floor off the number store floored value in Digit.
      
      DigitV = out[ 0 ] - ( ( out[ 0 ] = Math.floor( out[ 0 ] / base ) ) * base );
      
      //Divide lower 32 bit's including the floored off value in the higher 32 bit's.
      
      out[ 1 ] = ( ( DigitV * 0x100000000 ) + out[ 1 ] ) / base;
      
      //Round off the remainder and store the digit value that is between the number base into Digit.
      
      DigitV = Math.round( ( out[ 1 ] - Math.floor( out[ 1 ] ) ) * base ); out[ 1 ] = Math.floor( out[ 1 ] );
      
      //Digit 0 through 9, and A to Z by unit size per column.
      
      DigitV = DigitV < 10 ? 0x30 + DigitV : 0x37 + DigitV;
      
      //Write char to string.
      
      t = String.fromCharCode( DigitV ) + t;
    }
    
    str = str + t; t = null;
  }
  
  //Return the String representation of the float numbers value, or bit's.
  
  return ( str );
}

//**********************************************************************************
//Convert the float number to value when adding, or doing integer logic operations.
//**********************************************************************************

Number.prototype.primitive = Number.prototype.valueOf; Number.prototype.valueOf = function()
{
  if ( !this.b ) { return ( this.primitive() ); }
  
  //Remove overflow.
  
  this.sing = this.sing & 1; this.exp = this.exp & 0x7FF; if ( this.mantissa < 0 ) { this.mantissa = ( -this.mantissa ) - 1; }
  if ( this.mantissa > 4503599627370495 ) { this.mantissa -= Math.floor( this.mantissa / 4503599627370496 ) * 4503599627370496; }
  
  //Compute "0.Mantissa".
  
  var float = ( ( this.exp !== 0 ? Math.pow( 2, 52 ) : 0 ) + this.mantissa ) / Math.pow( 2, 52 );
  
  //Compute exponent value as positive value 1e?.
  
  var exp = Math.pow( 2, Math.abs( ( this.exp !== 0 ? this.exp : this.exp + 1 ) - 0x3FF ) );
  
  //Adjust "0.Mantissa" to exponent. Multiply if positive 1e?, divide if negative 1e-?.
  
  if ( this.exp > 0x3FF ) { float = float * exp; } else { float = float / exp; }
  
  //Nan.
  
  if ( !isFinite( float ) && this.mantissa > 0 ) { float = NaN; }
  
  //return Float value with proper sing.
  
  return ( this.sing >= 1 ? -float : float );
}

//**********************************************************************************
//Update the parse float function to be more accurate, and to support all number bases.
//**********************************************************************************

function parseFloat( str, base )
{
  //Check if invalid base setting.
  
  base = ( base & -1 ) || 10; if ( base < 2 || base > 36 ) { throw new Error( "RangeError: radix must be an integer at least 2 and no greater than 36" ); }
  
  //The decoded value.
  
  var o = new Number( 0 ), m = [ 0, 0 ]; o.b = true; o.sing = 0; o.exp = 0; o.mantissa = 0;
  
  //Sing bit.
  
  if( str.charAt( 0 ) === "-" ) { o.sing = 1; str = str.slice( 1, str.length ); }
  
  //Infinity.
  
  if( str === "Infinity" ) { o.exp = 2047; return( o.valueOf() ); }
  
  //The string value and exponent that is in the numbers base format.
  
  var bexp = 0, t = str.split( "e" ); if( t[ 1 ] ) { bexp = parseInt( t[ 1 ], base ); str = t[ 0 ]; } t = str.split( "." ); bexp += t[ 0 ].length; str = str.replace( ".", "" ); t = null;
  
  //Each 52 bit section must be able to store at least one multiple more of the number base to allow carry.
  
  var sec = Math.pow( 2, 52 - ( Math.log( base ) / Math.log( 2 ) ) & -1 );
  
  //decode charterers.
  
  for ( var i = 0, Digit = 0; i < str.length && m[ 0 ] < sec; i++ )
  {
    Digit = str.charCodeAt( i ); Digit = Digit < 0x40 ? Digit - 0x30 : Digit - 0x37;
    
    //Put digit into value.
    
    if ( Digit < base && Digit >= 0 ) { m[ 1 ] = ( m[ 1 ] * base ) + Digit; m[ 0 ] *= base; m[ 0 ] += c = Math.floor( m[ 1 ] / sec ); m[ 1 ] -= c * sec; bexp--; }
    
    //Else return "NaN" as it is not an number.
    
    else { return ( NaN ); }
  }
  
  //If value is 0.
  
  if( m[ 0 ] === 0 && m[ 1 ] === 0 ) { return( 0 ); }
  
  //Calculate exponent.
  
  var x = ( m[ 0 ] * sec ) + m[ 1 ]; for( var i = 0; i > bexp; i-- ) { x /= base; } for( var i = 0; i < bexp; i++ ) { x *= base; }
  
  if( !isFinite( x ) ) { o.exp = 0x7FF; return( o.valueOf() ); } if( x === 0 ) { return( 0 ); }
  
  o.exp = 0x3FF + ( Math.floor( Math.log( x ) / Math.log( 2 ) ) ); x = null;
  
  //Each section is an max of 52 mantissa bits.
  
  for( var i = 0; i < bexp; i++ )
  {
    //do not let the multiples of the number base go outside 52 bit accuracy limit, so divide by 2.
    
    while( m[ 0 ] > sec ) { c = m[ 0 ] - ( ( m[ 0 ] = Math.floor( m[ 0 ] / 2 ) ) * 2 ); m[ 1 ] = Math.floor( ( ( c * sec ) + m[ 1 ] ) / 2 ); }
    
    //Multiply value by base.
    
    m[ 1 ] *= base; m[ 0 ] *= base; m[ 0 ] += c = Math.floor( m[ 1 ] / sec ); m[ 1 ] -= c * sec;
  }
  
  for( var i = 0; i > bexp; i-- )
  {
    //If number is below 52 bit range multiply by 2.
    
    while( m[ 0 ] < sec ) { m[ 1 ] *= 2; m[ 0 ] *= 2; m[ 0 ] += c = Math.floor( m[ 1 ] / sec ); m[ 1 ] -= c * sec; }
    
    //Divide by base.
    
    c = m[ 0 ] - ( ( m[ 0 ] = Math.floor( m[ 0 ] / base ) ) * base ); m[ 1 ] = Math.floor( ( ( c * sec ) + m[ 1 ] ) / base ); 
  }
  
  //Convert to 52 bit mantissa.
  
  while( m[ 0 ] < 4503599627370495 ) { m[ 1 ] *= 2; m[ 0 ] *= 2; m[ 0 ] += c = Math.floor( m[ 1 ] / sec ); m[ 1 ] -= c * sec; } if( ( m[ 1 ] * 2 ) > sec ) { m[ 0 ] += 1; }
  if( o.exp > 0 ){ o.mantissa = m[ 0 ] - 4503599627370496; o.exp &= 0x7FF; } else { o.mantissa = Math.floor( m[ 0 ] / Math.pow( 2, ( -o.exp ) + 1 ) ); o.exp = 0; }
  
  //Return the decoded value.
  
  return( o.valueOf() );
}

//**********************************************************************************
//Create the new parse to Number function.
//**********************************************************************************

var parseNumber = function( str, base )
{
  //Check if invalid base setting.
  
  var e = str.length; base = base || 2; base &= -1; base.isNum();
  
  if ( base < 2 || base > 36 ) { throw new Error( "RangeError: radix must be an integer at least 2 and no greater than 36" ); }
  
  //Contains the decoded bit's of the Float64 value.
  
  for ( var i = 0, Digit = 0, f = [ 0, 0 ]; i < e; i++ )
  {
    Digit = str.charCodeAt(i); Digit = Digit < 0x40 ? Digit - 0x30 : Digit - 0x37;
    
    //Check if number is valid.
    
    if ( Digit < base && Digit >= 0 ) { f[ 1 ] = ( f[ 1 ] * base ) + Digit; f[ 0 ] = ( f[ 0 ] * base ) + ( Digit = Math.floor( f[ 1 ] / 0x100000000 ) ); f[ 1 ] -= Digit * 0x100000000; }
    
    //Else return undefined as it is not an number.
    
    else { return; }
  }
  
  //Put number together.
  
  var fl = new Number( 0 ); fl.b = true; fl.sing = ( f[ 0 ] >> 31 ) & 1; fl.exp = ( f[ 0 ] >> 20 ) & 0x7FF; fl.mantissa = ( ( f[ 0 ] & 0xFFFFF ) * 0x100000000 ) + f[ 1 ]; return ( fl );
}

//**********************************************************************************
//Error correct an number.
//**********************************************************************************

Number.prototype.err = function() { return ( this.avgFract().valueOf() ); }

//**********************************************************************************
//Allow Arrays to do float number operations on all numbers in array. Similar to vector.
//**********************************************************************************

for( var i = 0, a = [ "divP", "reduce", "valueOf", "getFract", "avgFract", "bits", "bitAnd", "bitOr", "bitXor", "bitNot", "bitRsh", "bitLsh", "toPattern", "err" ], c = ""; i < a.length; i++ )
{
  c += "Array.prototype." + a[i] + " = function( a ) { for( var i1 = 0, i2 = 0, l = this.length, o = []; i1 < l; i1++ ) { ";
  c += "if( this[i1]." + a[i] + " ) { o[i2++] = this[i1]." + a[i] + "( a ); } else if( ( this[i1] + 0 )." + a[i] + " ) { o[i2++] = ( this[i1] + 0 )." + a[i] + "( a ); }";
  c += " } return( o ); }\r\n";
}

eval( c ); i = undefined; c = undefined; a = undefined;
