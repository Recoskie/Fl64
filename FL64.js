//**********************************************************************************
//The variable force lets the algorithms complete regardless of how long it takes the calculation.
//**********************************************************************************

var force = false;

function Force( v )
{
  if ( v && confirm("Warning setting forced calculation can lead to freezing the page as some calculations take an long time.") == true ) { force = v; }
  else if( !v ) { v = false; }
}

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
//Convert undividable numbers to the repeat back into ?/? generates the pattern.
//**********************************************************************************

function PatToDiv( Pat1 )
{
  //Check if pattern is valid.
  
  if( Pat1[0] === null ) { return( [ 1, 1 ] ); }
  
  //The fraction in f1, and f2, and c is the scale of the pattern into the whole.
  
  var f1 = 0, f2 = 0, c = 0;
  
  //Rebuild the pattern into what divided into the whole is the pattern.
  //Used to find the smallest whole fraction.
  
  function Beggining( d )
  {
    for(var i = 0, m = 0, el = 0; i < d.length; ( d[i] > m ) && ( el = i, m = d[i] ), i++ );
    for(var i = d.length - el; i > 0; d.unshift(d.pop()), i-- ); return(d);
  }
  
  //The pattern into the whole, and the given pattern.
  
  var Pat2 = Beggining( Pat1.slice(0) ); Pat2.reverse(); Pat1.reverse();
  
  //Compute the division into the whole.
  
  for( var i = 0; i < Pat2.length; f2 += Math.pow( 2, f1 ), f1 += Pat2[i++] ); c = ( Math.pow( 2, f1 ) - 1 ) / f2;  
  for( var i = 1; Math.abs( ( c * i ) - Math.floor( c * i ) ) > ( Number.EPSILON / 2 ); i++ ); c *= i;
  
  //Compute ?/?.
  
  f1 = 0; f2 = 0;
  
  for( var i = 0; i < Pat1.length; f2 += Math.pow( 2, f1 ), f1 += Pat1[i++] ); f1 = Math.pow( 2, f1 ) - 1;
  
  if( f1 === Infinity ) { return( [ null, null ] ); }
  
  //Compute the smallest whole fraction.
  
  c = c / f1; return( [ Math.floor( f2 * c ), Math.floor( f1 * c ) ] );
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
//Reverse float number pattern, and exponet adjust to smalest fraction.
//**********************************************************************************

function FloatToFract( Float, PatDiv )
{
  //Compute Nominator.
  
  var e = Float / ( PatDiv[0] / PatDiv[1] ); PatDiv[0] *= e;
  
  //Exponent adjust.
        
  while( Math.floor( ( 1 / ( PatDiv[0] - Math.floor( PatDiv[0] ) ) ) | 1 ) !== 1 ) { PatDiv[0] *= 2; PatDiv[1] *= 2; }
  
  //Result.
  
  return( [ Math.round( PatDiv[0] ), Math.round( PatDiv[1] ) ] );
}

//**********************************************************************************
//Convert Bit count into Bit pattern.
//**********************************************************************************

function CountToPat( Data )
{
  var Max = 0, End = 0, Start = 0, Sets = [];
  
  //Compute every possible set.
      
  while( Data.length > 1 )
  {
    Max = 0; End = 0; Start = 0;
    
    //Find the max length in data in each iteration this can become different as different sets are computed though the shift.
        
    for( var i = 0; i < Data.length; i++ )
    {
      if( Max < Data[i] ) { Max = Data[i]; End = i + 1; }
    }
    
    //Store an temporary sequence to compare the sequence to it's repeat.
      
    var temp = Data.slice( Start, End );
      
    //Remove elements from the start of the sequence till it matches preceding digits after the pasterns end.
      
    for( var i2 = 0; ( i2 + Start ) < End; i2++ )
    {
      if( temp[ Start + i2 ] !== Data[ End + i2 ] ) { Start++; }  
    }
        
    //Recode Pat.
        
    Sets[ Sets.length ] = Data.slice( Start, End );
        
    //Shift Bit count.
        
    Data.shift();
  }
      
  //The longest Set is the best matching bit pattern.
      
  for( var i = Sets.length; i > 0; i-- )
  {
    if( Sets[i] && Sets[i].length > Max )
    {
      Max = Sets[i].length; Start = i;
    }
  }
  
  //Return Patten, and Upper value remainder.
  
  return( Sets[ Start ] );
}

//**********************************************************************************
//Decode Float 64.
//**********************************************************************************

function DecodeFloat( f )
{
  //Compute Sing.

  var Sing = 0; if( f <= 0 ) { f = -f; Sing = 1; }
  
  //Compute Exponent.
    
  var Exp = Math.floor( Math.log( f ) / Math.log( 2 ) );
  
  //Adjust the number so that it is "0.Mantissa".
  
  if( -Exp >= 0x3FF ) { f /= Math.pow( 2, -0x3FD ); Exp = -0x3FF; } else{ f /= Math.pow( 2, Exp + 1 ); }
  
  //Compute Mantissa.
  
  var Mantissa = f * Math.pow( 2, 53 ); if( -Exp !== 0x3FF ) { Mantissa -= Math.pow( 2, 52 ); }
  
  //Center Exponet.
  
  Exp = ( 0x3FF + Exp ) & 0x7FF;
  
  //return the decoded float.
  
  return( [ Sing, Exp, Mantissa ] );
}

//**********************************************************************************
//Decode Only the Mantissa.
//**********************************************************************************

function DecodeMantissa( f )
{
  if( f <= 0 ) { f = -f; Sing = 1; }
  
  //Compute Exponent.
    
  var Exp = Math.floor( Math.log( f ) / Math.log( 2 ) );
  
  //Adjust the number so that it is "0.Mantissa".
  
  if( -Exp >= 0x3FF ) { f /= Math.pow( 2, -0x3FD ); Exp = -0x3FF; } else{ f /= Math.pow( 2, Exp + 1 ); }
  
  //Compute Mantissa.
  
  return( f * Math.pow( 2, 53 ) );
  
  //Center Exponet.
  
  Exp = ( 0x3FF + Exp ) & 0x7FF;
  
  //return the decoded float.
  
  return( Mantissa );
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
