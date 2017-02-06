# Float numbers Correction library.

The routines in this libary are made to work with unrepresentable numbers back into fractions which then can be added, subtracted, divided, and multiplied through algorithms without error. The library also allow the translation of repeating digits in a binary number that do not divide causing epsilon error. The algorithms can be tested using the "AnalyzeFl64.html".

The library is designed to work closely with the float number format without reducing performance.

Warning library is still in beta.

------------------------------------------------------------------------------
CErr( f );
------------------------------------------------------------------------------

Removes epsilon error by using min, and max values through the number.

------------------------------------------------------------------------------
DivToPat( f1, f2 );
------------------------------------------------------------------------------

Use Undividable numbers.

Divide, and ends as soon as a pattern is detected to an undividable number. Since numbers can divide using the same subtractions in a loop to infinity it ends right at the repeat of the subtraction well dividing numbers which becomes the repeating digits in the division.

Basically 1÷3 is 0.3333333333 in which 3 will repeat forever. Thus the pattern starts at 3 and is 3. However in binary numbers the relationship is different (Pat = [2]).

------------------------------------------------------------------------------
PatToDiv( Pat );
------------------------------------------------------------------------------

Use Convert the reapting pattern of digits back into the correct fraction.

Converts the repeating pattern of digits in binary back into the smallest whole fraction that divides into the pattern of digit only.

If the fraction, or value was something like ( 7 + ( 1 ÷ 3 ) ) = 7.33333333333333 then the pattern would be 3, thus the smallest fraction is 1÷3, so it does not take in account the plus 7.

------------------------------------------------------------------------------
DecodeFloat( f );
------------------------------------------------------------------------------

Use extracting information from Float64 (Double precision) numbers.

Decode the Sing, Exponent, and Mantissa of an JavaScript Float64 (Double precision) number.

------------------------------------------------------------------------------
ToBin( val, Pad );
------------------------------------------------------------------------------

Convert Val to a binary number, and then zero pad the left of the binary number to quantity of digits in memory.

------------------------------------------------------------------------------
DecodeExp( f );
------------------------------------------------------------------------------

Decode only the exponent of an Float64 (Double precision) number.

------------------------------------------------------------------------------
DecodeMantissa( f );
------------------------------------------------------------------------------

Decode the Float mantissa bit's of an Float64 (Double precision) number.

------------------------------------------------------------------------------
BitCount( Mantissa );
------------------------------------------------------------------------------

Convert an float number into it's bit count.

------------------------------------------------------------------------------
~~CountToPat( Data );~~
------------------------------------------------------------------------------

~~Convert the Bit count back into division pattern array.~~

------------------------------------------------------------------------------
PatToBin( Pat );
------------------------------------------------------------------------------

Gives back a binary string of the repeating binary digits, for the pattern of the binary digits.

------------------------------------------------------------------------------
Notes.
------------------------------------------------------------------------------

The routines are made to convert unrepresentable numbers back into whole number fractions which then can be added, subtracted, divided, and multiplied though algorithms. Then the final results are the division of the two number fractions. These algorithms are also designed to ignore epsilon errors while calculating.

If one wants to they can rewrite the Sine, and cosine, and tangent functions to be more accurate with small performance impact.

Allows for an better faster way to convert float values back into there fraction.
