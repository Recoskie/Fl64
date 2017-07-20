# Float numbers conversion library.

The routines in this library are made to work with unrepresentative numbers back into fractions which then can be added, subtracted, divided, and multiplied through algorithms without error. The library also allow the translation of repeating digits in binary numbers that do not divide causing epsilon error. The algorithms can be tested using the "AnalyzeFl64.html".

The library is designed to work closely with the float number format without reducing performance, for algorithms that may benefit from this library.

Warning library is still in beta. Warning the methods in this readme  are now outdated. This readme will be updated soon to reflect the new methods and data types.

------------------------------------------------------------------------------
## CErr( f );

Removes error through the number.

```javascript
//Randomized Repetition error.

var n = 1 / ( 1 << ( ( Math.random() * 21 ) + 1 ) ); //Random fraction.

for( var i = 0, c = 7, s = 1; i < 1000; c = ( ( Math.random() * 100 ) + 1 ) & -1, i++ )
{
  n -= ( ( ( ( c * 4 ) / 1000 ) + ( ( c * 3 ) / 1000 ) ) / ( ( ( c * 7 ) / 1000 ) ) ) - 1; //Random error.
  if ( ( Math.random() * 2 ) & -1 ) { n = -n; } // random Sing switch.
}

var output = "Randomized Fractional Repetition Error.\r\n";
output += "Float Value: " + n + ", Fract 1/" + 1 / n +"\r\n";

n = CErr(n);

output += "Corrected Float Value: " + n + ", Fract 1/" + 1 / n + "";

alert( output );
```

Another example is when one tries to compare to equality, or to 0.

```javascript
var n = ( ( 0.3 + 0.6 ) / 0.9 ) - 1; //Theoretically 0.

var output = "( ( 0.3 + 0.6 ) / 0.9 ) - 1 = 0.\r\n";
output += "Float Value: " + n + "\r\n"; //0.9999999999999999
output += "Corrected Float Value: " + CErr(n) + ""; //0

alert( output );
```

------------------------------------------------------------------------------
## DivToPat( f1, f2 );

Divide, and ends as soon as a pattern is detected to, for undividable number. Since numbers can divide using the same subtractions in a loop to infinity it ends right at the repeat of the subtraction well dividing numbers which becomes the repeating digits in the division.

Basically 1÷3 is 0.3333333333 in which 3 will repeat forever. Thus the pattern starts at 3 and is 3. However in binary numbers the relationship is different (Pat = [2]).

```javascript
alert(DivToPat( 314, 171 )); //314/171 = 1,1,2,2,1,5,2,3,1
```
Returns -1 at last array element if the calculation takes longer than 2.7 seconds. To enable the full computation of large patterns.

```javascript
//Force calculations.

Force( true );

//Compute pattern.

alert(DivToPat( 314, 171 ));
```

------------------------------------------------------------------------------
## PatToDiv( Pat );

Converts the repeating pattern of digits in binary back into the smallest whole fraction that divides into the pattern of digits only.

If the fraction, or value was something like ( 7 + ( 1 ÷ 3 ) ) = 7.33333333333333 then the pattern would be 3, thus the smallest fraction is 1÷3, so it does not take in account the plus 7.

```javascript
alert(PatToDiv([1,1,2,2,1,5,2,3,1])); //1,1,2,2,1,5,2,3,1 = 143/171
```
------------------------------------------------------------------------------
## PatToFract( Float, DivPat );

Calculates the smallest fraction by reversing the infinite pattern of numbers, and exponentially adjusting the number to whole fraction value.

```javascript
var n1 = 2198, n2 = 1197;

//2198 divided by 1197 to pat.

var pat = DivToPat( n1, n2 );

//What divided by what is the division pattern.

var PatDiv = PatToDiv( pat );

//Divide 1197 into 2198 giving the float value.

var FloatValue = n1 / n2;

//Convert float value, and bit pattern back to smallest fraction.

var Fract = PatToFract( FloatValue, PatDiv );

//Smallest fraction 314/171.

alert( Fract );
```

------------------------------------------------------------------------------
## FloatToFract( Float, er );

Calculates the smallest fraction of an float number.

```javascript
var n1 = 2198, n2 = 1197, CutOff = 1;
var Float = n1 / n2;

//2198 divided by 1197 to smalest fraction.

var Fract = FloatToFract( Float );

//Smallest fraction 314/171.

alert( Fract );
```
The above will calculate the best possible fraction for the entire float number, but the next example will cut off "10" at the very end of the, of an float value to where it gets rounded off in the computer at max representable value.

```javascript
var Float = 0.7777777777777778; //Closest value of 7/9.

//gives 7/9.

var Fract = FloatToFract( Float );

//Show fraction.

alert( Fract[0] + "/" + Fract[1] + " = " + ( Fract[0] / Fract[1] ) );

var Float = 0.7777777777777773; //Closest value of 7/9, but is one digit off at maximum representable digits.

//Gives 187649984473773/241264265751994 which is correct if the value rally is 0.7777777777777773.

var Fract = FloatToFract( Float );

//Show fraction.

alert( Fract[0] + "/" + Fract[1] + " = " + ( Fract[0] / Fract[1] ) );

//Recalculate fraction with an cut off of 10 right near where an float gets rounded off in hardware.

var Fract = FloatToFract( Float, 10 ); //Now it gives 7/9.

//Show fraction.

alert( Fract[0] + "/" + Fract[1] + " = " + ( Fract[0] / Fract[1] ) + " Recalculated with an cut off of 10 at the last representable place value." );

```

The "CutOff" in the above code will cut off the last representable binary digits in an float number by 10 this can be set larger. The cut off range will not cut off all values by 10 it only cuts off the last binary digits in the floats mantissa removing error. Only do this if the value is expected to have "X" amount of error close to EPSILON after repetitive arithmetic in an loop, thus we can cut the error off at the very end of the last representable binary digits in an floats binary data. Basically 3.1415 will still translate to the correct fraction even with the cut off of 10 as the number is not large enough to be near the maximum round off point of an float number.

------------------------------------------------------------------------------
## DecodeFloat( f );

Decode the Sing, Exponent, and Mantissa of a JavaScript Float64 (Double precision) number.

```javascript
var fl64 = DecodeFloat( 3.1415926535 );

//Display Sing, Exponent, Mantissa value.

alert( fl64[0] + ", " + fl64[1] + ", " + fl64[2] + "" );
```

The decoded float value is stored as three integer numbers in an array.
The number values can be converted to binary using ".toString(2)" with a radix of 2, or to hex using a radix of 16.
In order for the number to be display properly in binary you have to zero pad the left of the binary number to quantity of digits in memory.

------------------------------------------------------------------------------
## ToBin( val, Pad );

Convert Val to a binary number, and then zero pad the left of the binary number to quantity of digits in memory.

```javascript
var fl64 = DecodeFloat( 3.1415926535 );

var output = "";

//Sing to bin. Sing is one binary digit big.

output = "Sing = " + ToBin( fl64[0], 1 ) + "\r\n";

//Exponent to bin.

output += "Exponent = " + ToBin( fl64[1], 11 ) + "\r\n";

//Mantissa to bin.

output += "Mantissa = " + ToBin( fl64[2], 52 );

//Display output.

alert( output );
```

------------------------------------------------------------------------------
## ToFloat( f );

Convert a decoded float number back into it's float value.

```javascript
var fl64 = DecodeFloat( 3.1415926535 );

//Display Sing, Exponent, Mantissa value.

alert( fl64[0] + ", " + fl64[1] + ", " + fl64[2] + "" );

//Convert back to float value.

alert( ToFloat( fl64 ) + "" );

//Add exponent and mantissa by one.

fl64[1] += 1;
fl64[2] += 1;

//Decode modified float.

alert( ToFloat( fl64 ) + "" );
```
By converting back, and forth this way it becomes possible to do float bit hacks which is originally impossible in JavaScript.
Or you can simply convert float values back and fourth between float value, hex representation, binary representation.

------------------------------------------------------------------------------
## DecodeMantissa( f );

Decode the Float mantissa bit's of an Float64 (Double precision) number. Includes the Bias bit.

------------------------------------------------------------------------------
## BitCount( Mantissa );

Convert an float number into it's bit count.

```javascript
var value = parseInt( "10110101001", 2 );

var pat = BitCount( value ); //2,1,2,2,3,1

alert( PatToBin( pat ) ); //10110101001
```
It can be the mantissa bit's of a float, or a integer binary value.

------------------------------------------------------------------------------
## FindPat( Pat );

Convert the Bit counts into the best matching division pattern array.

------------------------------------------------------------------------------
## FindPatDiv( Pat );

Convert the Bit counts into the best matching division pattern.

------------------------------------------------------------------------------
## PatToBin( Pat );

Gives back a binary string of the repeating binary digits, for the pattern of the binary digits.

```javascript
var pat = DivToPat( 314, 171 ); //314/171 = 1,1,2,2,1,5,2,3,1
alert( PatToBin( pat ) ); //111010110000101001
```
