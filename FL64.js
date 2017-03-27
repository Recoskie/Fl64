//**********************************************************************************
//The variable force lets the algorithms complete regardless of how long it takes the calculation.
//**********************************************************************************

var force = false; function Force( v ) { force = v; }

//**********************************************************************************
//Do division one step at an time stopping at the repeat in the pattern.
//**********************************************************************************

function DivToPat( n1, n2 )
{  
  n1= Math.abs(n1); n2 = Math.abs(n2);
  var Pat = [], Re = [ n1 ];
  var El = -1, C = 0;
  
  var t = new Date().getTime();
  
  if( Re[ 0 ] === 0 ) { return( [ null ] ); }
  
  while( El === -1 )
  {
    if( !force && ( new Date().getTime() - t ) > 2700 ) { Pat.push( -1 ); return( Pat ); }
    
    for ( var Exp2 = Re[ Re.length - 1 ], i = 0; ( Exp2 - n2 ) < 0; Exp2 *= 2, i++ );
    Pat[ Pat.length ] = i; C = Exp2 - n2; Re[ Re.length ] = C;
    
    for( El = Re.length - 2; El > -1 && Re[ El ] !== C; El-- );

    if( C === 0 ) { return( [ null ] ); }
  }

  Pat = Pat.slice( El, Pat.length );
  
  return( Pat );
}

//**********************************************************************************
//Convert non-dividable bit patterns into ?/? generates the pattern.
//**********************************************************************************

function PatToDiv( Pat )
{
  //Initialize.

  var f1 = 0, f2 = 0, c1 = 0, c2 = 0, t = 0;
  
  //Calculate pattern in the limitation of 53 mantissa bit's.
  
  for( var i = 0, s = 0; s < 53 && i < Pat.length - 1; s+= Pat[ i++ ] ); for( ; i > -1; f2 += Math.pow( 2, f1 ), f1 += Pat[ i-- ] ); f1 = Math.pow( 2, f1 ) - 1; c1 = f2; c2 = f1; s = f2 / f1;
  
  //Find best matching whole fraction.
  
  while ( c1 ) { t = c1; c1 = ( c2 - ( Math.floor( c2 / c1 ) * c1 ) ); i = ( s - Math.floor( f2 / t ) / Math.floor( f1 / t ) ); ( Math.abs( i ) < Number.EPSILON ) && ( c1 = 0 ); c2 = t; }
  
  //Compute fraction.
  
  f2 = Math.floor( f2 / c2 ); f1 = Math.floor( f1 / c2 ); if( f1 === 0 ){ f1 = 1; }
  
  return( [ f2, f1 ] );
}

//**********************************************************************************
//convert the binary pattern into the repeating binary sequence in the float mantissa.
//**********************************************************************************

function PatToBin( Pat )
{
  var bin = "";
  
  for( var i1 = 0; i1 < Pat.length; i1++ )
  {
    if( Pat[i1] !== null ) { bin += "1"; } else { bin += "0"; }
    for( var i2 = 1; i2 < Pat[i1]; bin += "0", i2++ );
  }
  
  return(bin);
}

//**********************************************************************************
//convert the float mantissa into it's bit count pattern, or any binary data.
//**********************************************************************************

function BitCount( Mantissa )
{
  var data = ToBin( Mantissa, 53 ).split("1"); data.shift();
  for( var i = 0; i < data.length; data[ i ] = data[ i ].length + 1, i++ );  
  return( data );
}

//**********************************************************************************
//Convert an bit count to it's best matching division pattern.
//**********************************************************************************

function FindPatDiv( Pat )
{
  //Initialize.

  var f1 = 0, f2 = 0, c1 = 0, c2 = 0, t = 0, er = 1, m = [ 1, 1 ];
  
  while( Pat.length > 0 )
  {
    //Calculate pattern.
  
    f1 = 0; f2 = 0; for( var i = 0, s = 0; s < 53 && i < Pat.length - 1; s+= Pat[ i++ ] ); for( ; i > -1; f2 += Math.pow( 2, f1 ), f1 += Pat[ i-- ] ); f1 = Math.pow( 2, f1 ) - 1; c1 = f2; c2 = f1; s = f2 / f1;
    while ( c1 ) { t = c1; c1 = ( c2 - ( Math.floor( c2 / c1 ) * c1 ) ); i = ( s - Math.floor( f2 / t ) / Math.floor( f1 / t ) ); ( Math.abs( i ) < Number.EPSILON * Math.pow( 2, er ) ) && ( c1 = 0 ); c2 = t; }
    
    //Test pattern.
    
    if( Math.floor( f1 / c2 ) === m[1] ) { break; } else { m = [ Math.floor( f2 / c2 ), Math.floor( f1 / c2 ) ]; }
    
    //Shift the pattern and increase the cutoff range in the mantissa bits by pattern shift.
    
    er += Pat[0]; Pat.shift();
  }
  
  //Check if no pattern.
  
  if( Pat.length === 0 ) { m = [ 1, 1 ]; }
  
  //Return the division pattern.
  
  return( m );
}

//**********************************************************************************
//Convert an bit count to it's best matching pattern.
//**********************************************************************************

function FindPat( Pat ){ var n = FindPatDiv( Pat ); return( DivToPat( n[0], n[1] ) ); }

//**********************************************************************************
//Reverse float number pattern, and exponent adjust to smallest fraction.
//**********************************************************************************

function FloatToFract( Float, PatDiv )
{
  //Compute Nominator.
  
  var e = Float / ( PatDiv[0] / PatDiv[1] ); PatDiv[0] *= e;
  
  //Exponent adjust.
        
  while( ( PatDiv[0] - Math.floor( PatDiv[0] ) ) !== 0 ) { PatDiv[0] *= 2; PatDiv[1] *= 2; }
  
  //Result.
  
  return( [ Math.ceil( PatDiv[0] ), Math.ceil( PatDiv[1] ) ] );
}

//**********************************************************************************
//Decode Float 64.
//**********************************************************************************

function DecodeFloat( f )
{
  //Compute Sing.

  var Sing = 0; if( f < 0 ) { f = -f; Sing = 1; }
  
  //Compute Exponent.
    
  var Exp = Math.floor( Math.log( f ) / Math.log( 2 ) );
  
  //Adjust the number so that it is "0.Mantissa".
  
  if( -Exp >= 0x3FF ) { f /= Math.pow( 2, -0x3FD ); Exp = -0x3FF; } else { f /= Math.pow( 2, Exp + 1 ); }
  
  //Compute Mantissa.
  
  var Mantissa = f * Math.pow( 2, 53 ); if( -Exp !== 0x3FF ) { Mantissa -= Math.pow( 2, 52 ); }
  
  //Center Exponent.
  
  Exp = ( 0x3FF + Exp ) & 0x7FF;
  
  //return the decoded float.
  
  return( [ Sing, Exp, Mantissa ] );
}

//**********************************************************************************
//Decode the Mantissa including the hidden bit.
//**********************************************************************************

function DecodeMantissa( f )
{
  if( f < 0 ) { f = -f; Sing = 1; }
  
  //Compute Exponent.
    
  var Exp = Math.floor( Math.log( f ) / Math.log( 2 ) );
  
  //Adjust the number so that it is "0.Mantissa".
  
  if( -Exp >= 0x3FF ) { f /= Math.pow( 2, -0x3FD ); Exp = -0x3FF; } else{ f /= Math.pow( 2, Exp + 1 ); }
  
  //Compute Mantissa.
  
  return( f * Math.pow( 2, 53 ) );
}

//**********************************************************************************
//Convert binary to Float.
//**********************************************************************************

function ToFloat( fl )
{ 
  //Compute "0.Mantissa".

  var float = ( ( fl[1] !== 0 ? Math.pow( 2, 52 ) : 0 ) + fl[2] ) / Math.pow( 2, 52 );
  
  //Compute exponent value as positive value 1e?.
  
  var exp = Math.pow( 2, Math.abs( ( fl[1] !== 0 ? fl[1] : fl[1] + 1 ) - 0x3FF ) );
  
  //Adjust "0.Mantissa" to exponent. Multiply if positive 1e?, divide if negative 1e-?.
    
  if( fl[1] > 0x3FF ) { float = float * exp; } else { float = float / exp; }
  
  //return Float value with proper sing.
  
  return( fl[0] >= 1 ? -float : float );
}

//**********************************************************************************
//Convert to binary, and pads.
//**********************************************************************************

function ToBin( val, Pad )
{
  var s = val.toString(2);
  for(var i = s.length; i < Pad; s = "0" + s, i++ );
  return( s );
}

//**********************************************************************************
//Correct error.
//**********************************************************************************

function CErr( f )
{
  var fl64 = DecodeFloat( f );

  //Close to 0. Note "e = 10", Center "0x3FF - e", "53 - e".
  
  if( ( fl64[2] / Math.pow(2, ( 53 - 10 ) ) === ( fl64[2] / Math.pow(2, ( 53 - 10 ) ) ) & -1 ) && fl64[1] <= ( 0x3FF - 10 ) ) { return( 0 ); }
  
  //X, and Y Adjust. Note "e = 10", "e*2+3=23", "Y >= e".
  
  var X = 23, Y = 0, C = false;

  for( var b = 1; b > -1; b--)
  {
    while( X > 0 && ( ( C = ( ( fl64[2] / Math.pow( 2, X ) ) & 1 ) === b ) || Y < 10 ) ) { C ? Y++ : Y = 0; X--; }
    if( b && Y >= 10 ) { fl64[2] +=  Math.pow( 2, X + 1 ); } else if( Y >= 10 ) { fl64[2] = Math.floor( fl64[2] / Math.pow( 2, Y ) ) * Math.pow( 2, Y ); }
    X = 23; Y = 0; 
  }
  
  //Return Adjusted float.
  
  return( ToFloat( fl64 ) );
}
