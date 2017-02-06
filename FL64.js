//**********************************************************************************
//Do division one step at an time stopping at the repeat in the pattern.
//**********************************************************************************

function DivToPat( n1, n2 )
{  
  n1= Math.abs(n1); n2 = Math.abs(n2);
  var Pat = [], Re = [ n1 ];
  var El = -1, C = 0;
  
  if( Re[ 0 ] === 0 ) { return( [ null ] ); }
  
  while( El === -1 )
  {
    for ( var Exp2 = Re[ Re.length - 1 ], i = 0; ( Exp2 - n2 ) < 0; Exp2 *= 2, i++ );
    Pat[ Pat.length ] = i; C = Exp2 - n2; Re[ Re.length ] = C;
    
    for( El = Re.length - 2; El > -1 && Re[ El ] !== C; El-- );

    if( C === 0 ) { return( [ null ] ); }
  }

  Pat = Pat.slice( El, Pat.length );
  
  return( Pat );
}

//**********************************************************************************
//Convert undividable numbers to the repeat back into ?/? generates the pattern.
//**********************************************************************************

function PatToDiv( Pat )
{
  //the fraction in f1, and f2.

  var f1 = 1, f2 = 0;

  //Compute the shift of the division in pows of 2 (f1), and the remainders totals (f2).

  for( var i = 0, n = 0; i < Pat.length; n = Math.pow( 2, Pat[ i++ ] ), f1 = f1 * n, f2 = f2 * n - 1 );

  //Compute the Beginning, and end to match the division remainder.
  //Convert to whole fraction.
  
  var f4 = 0, f3 = 0.1;

  if( f1 !== Infinity || f2 !== -Infinity )
  {
    for( ; Math.abs( f3 - Math.floor(f3) ) > ( Number.EPSILON / 2 ); f3 = ( (++f4) / -f2 ) * ( f1 - 1 ) );
  }
  
  return( [ f4, Math.round( f3 ) ] );
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
//convert the float mantissa into it's bit count pattern.
//**********************************************************************************

function BitCount( Mantissa )
{
  var data = ToBin( Mantissa, 53 ).split("1"); data.shift();
  for( var i = 0; i < data.length; data[ i ] = data[ i ].length + 1, i++ );  
  return( data );
}

//**********************************************************************************
//Decode only the mantissa bit's.
//**********************************************************************************

function DecodeMantissa( f )
{
  if( f <= 0 ) { f = -f; }
  
  //The Exponent is in powers of two in an float 64 number.
    
  var Exp2 = Math.floor( Math.log( f ) / Math.log( 2 ) );
  
  //The Mantissa.
  
  var mantissa = 0;
  
  //Compute the 53 bit's of the mantissa in the float64 number.
  
  for( var i1 = -1, i2 = 53; i1 < 53; i1++, i2-- )
  {
    //Does bit subtract from float, and it's balanced Mantissa to exponent in prows of 2.

    if( ( f - Math.pow( 2, Exp2 - i1 ) ) >= 0 )
    {
      //Remove Mantissa bit from float.
          
      f -= Math.pow( 2, Exp2 - i1 );
          
      //Add bit to mantissa number.
          
      mantissa += Math.pow( 2, i2 );
    }
  }
  
  //return the mantissa.
  
  return( mantissa );
}

//**********************************************************************************
//Decode The exponent bit's.
//**********************************************************************************

function DecodeExp( f )
{
  //The Exponent is in powers of two in an float 64 number.
    
  var Exp2 = Math.floor( Math.log( f ) / Math.log( 2 ) );

  //Center the exponent on the integer number line.
  
  return( ( 0x3FF + ( Exp2 ) ) & 0x7FF );
}

//**********************************************************************************
//Decode Float 64.
//**********************************************************************************

function DecodeFloat( f )
{
  //Sing is 0 for positive.
    
  var Sing = 0; if( f <= 0 ) { Sing = 1; f = -f; }
  
  //Put number together.

  var number = [ Sing, DecodeExp( f ), DecodeMantissa( f ) ];
    
  //Remove Mantissa exponent bias.
  
  number[2] -= Math.pow( 2, Math.floor( Math.log( number[2] ) / Math.log( 2 ) ) );
  
  //return the Sing, exponent bits center balance, And mantissa balanced to exponent.
  
  return( number );
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
//Correct epsilon error using min, max values in base 10.
//**********************************************************************************

function CErr( f )
{
  var Exp10 = 0, Point = 0, RoundDigit = 0, MinMax = "", NLen = 0;
  
  f = f.toString(); //Float to Base 10 string.
  
  //Calculate exponent.
  
  if( f.indexOf("e") !== -1 )
  {
    Exp10 += parseInt( ( ( f.split("e") )[1] ), 10 );
    f = ( f.split("e") )[0];
  }

  Point = f.indexOf("."); f = f.replace(".","");
  
  //If no decimal point it is imaginary, and is at the end of the number.
  
  if( Point < 0 ) { Point = f.length; }
  
  //If starts with zeros after the exponent then adjust the number.
  
  if( f.charAt( f.length - 1 ) === "0" )
  {
    for( var i = f.length - 1; f.charAt(i) === "0"; i--, Exp10++ );
    f = f.slice( 0, i );
  }
  
  //Number of 0 (Min), or 9 (Max) is fractional error though an base 10 representation of an float number.
  
  for( var i = f.length; i > -1; i-- )
  {
    //Check for min, or max value fractional error along base 10 string.
      
    if( MinMax === "" && ( f.charAt(i) === "9" || f.charAt(i) === "0" ) )
    { MinMax = f.charAt(i); NLen++; }
    
    //Number of matches to 0 or 9.
    
    else if ( f.charAt( i ) === MinMax ) { NLen++; }
    
    //Else end of fractional error bit's.
    
    else if( MinMax !== "" || i === 0 )
    {
      //Number of matches must be at least bigger than 2.
      
      if( NLen > 2 )
      {
        //The next digit up that is to be corrected after fractional error is removed.
        
        RoundDigit = parseInt( f.charAt( i ), 10 );
        
        if( Exp10 >= 0 ){ Exp10 += f.length - i; }
        if( Exp10 < 0 ){ Exp10 += f.length - i; }
        
        //Remove digits that are fractionally off between min, max.
        
        f = f.slice( 0, i );
        
        //If fractional error is one binary digit off we round up to the next digit.
        
        if( MinMax === "9" ) { RoundDigit += 1; }
      }
      
      //End the error check.
      
      i = 0; break;
    }
  }
  
  //Create new fractionally corrected number.
  
  if( Exp10 >= 0 && MinMax !== "" )
  {
    f += RoundDigit + ""; MinMax !== "";
  }
  
  for( ; f.length < Point; f += "0" );
  f += ".";
  
  if( Exp10 < 0 && MinMax !== "" )
  {
    f += RoundDigit + ""; MinMax !== "";
  }
  
  if( Point < f.length && Point > 0 )
  {
    f = f.substring( 0, Point ) + "." + f.substring( Point, f.length );
  }
  
  f += "e" + Exp10 + "";
  
  //Compile fixed number.
  
  return( parseFloat( f, 10 ) );
}
