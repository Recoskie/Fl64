# JavaScript double precision library.
------------------------------------------------------------------------------
FL64 is an libary alowing javascript to have.<br />

* Complete access to the 64 bits of an double precision number.<br />

* All 64 bit's of double percision numbers to do 64 bitwise arithmetic.<br />

* Numbers have number properties **num.sing**, **num.exp**, **num.mantissa** which can be manipulated with math operations, and bitwise which changes the number value.<br />

* Error correction.<br />

* Pattern detection.<br />

* Nicely format double precision numbers as proper fractions.<br />
------------------------------------------------------------------------------
FL64_App is an sample web application using this library which allows you. <br />

* To analyze patterns in bases 2 through 36. <br />

* To convert fractional decimal Numbers to 64 bit binary as IEEE-754 double precision, and back again.<br />
  Also supports fractional numbers in bases 2 through 36 not just decimal back to IEEE-754 double precision binary.<br />
  Also IEEE-754 double precision binary can be set to hexadecimal instead of binary, or any base 2 through 36. <br />

* To generate rally long randomized patterns in different number bases and convert them back, and fourth between fractions that produce the pattern in division.<br />
Base36 pat: 0SNENI0UC2T49D277JC14G3QTOHEXM1S1HXGZRKN7WTEDDZWMNORIYJR75UNVI7L0PA2C9JSVU0A40XPF4CQEIG0DHD8XW5SZ7CLCHZ5NX6VQMXSSGNYVJW96BIL2DY7YI2J08FCS36LMM03DCB8H1G8SU5C4HSEZAPXNQG745ZPVZ2AKVN9LHJZMIMR23U7∞ <br /> Converts to fraction 17÷769, and the division pattern of 17÷769 produces the pattern sequence in base36.

------------------------------------------------------------------------------
1. ### Adds the following to double precision numbers:
    1. Method **num.err()**
        > ##### Error correction for double precision numbers.
    2. Methods **num.bitLsh( shift )**, **num.bitRsh( shift )**.
        > ##### Right shift, and left shift all 64 of double precision numbers.
        > ##### Return number as an bitNumber.
    3. Methods **num1.bitOr( num2 )**, **num1.bitAnd( num2 )**, **num1.bitXor( num2 )**, **num1.bitNot()**.
        > ##### Do 64 bitwise using all 64 bits of both double precision numbers.
        > ##### Return number as an bitNumber.
    4. Method **num.bits()**.
        > ##### Return number as an bitNumber.
    5. Method **num.toString()** Enhanced:
        > #### num.toString( base, true )
        >> ##### If Exstend true display the float value past round off point in bases 2 through 36.
        >> The exact value of the number PI as an double precision number in decimal (base 10) is 3.141592653589793115997963468544185161590576171875, but is rounded off at 3.141592653589793.
        > #### num.toString( base )
        >> ##### Display the regular toString value in radix 2 through 36.
        > #### num.toString()
        >> ##### Double percision number to decimal string.
    6. Method **parseFloat()** Enhanced:
        > #### parseFloat( str, base )
        >> ##### Convert string radix 2 through 36 to an float value.
        > #### parseFloat( str )
        >> ##### Converts decimal string to double precision number.
    7. Method **num.getFract()**
        > #### Returns number as an Fraction data type.
    8. Method **num.avgFract()**
        > #### Returns number as best matching fraction across the mantissa as an Fraction data type.
    9. Method **num.toPattern()**
        > #### num.toPattern().
        >> ##### Converts the bits in the mantissa to an pattern data type.
        > #### num.toPattern( base ).
        >> ##### Converts the bits in the mantissa to an different base then pattern data type.
------------------------------------------------------------------------------
2. ### Bit Number Data type.
    1. Bit Numbers act as an regular number with three new properties **num.sing**, **num.exp**, **num.mantissa** which can be manipulated, or read.
        ```javascript
        var num = ( 3.14 ).bits();
        
        alert( num );  //The number is displayed as 64 bits in binary as it is in the computer memory.
        
        alert( "Value = " + num ); //3.14 when added to String.
        
        alert( num.exp );  //The number value of the double precision exponent.
        
        alert( num.exp.toString(2) );  //The number value of the double precision exponent in binary.
        
        //Right shift the double precision exponent by one, and subtract 1.
        
        num.exp = ( num.exp >> 1 ) -1;
        
        alert( num );  //The number is displayed as 64 bits in binary as it is in the computer memory.
        
        alert( "Value = " + num ); //The new manipulated number value.
        
        alert( num.exp );  //The new number value of the double precision exponent.
        
        alert( num.exp.toString(2) );  //The number value of the double precision exponent in binary.
        ```
    2. Bit Numbers convert to Number during any Math, or Arithmetic/Logic operation.
        ```javascript
        var num = ( 3.14 ).bits();

        //Any Number operation that does not return "bitNumber" will convert back to "Number".

        num = ( ( num + 9 ) * 7 ) << 2;

        alert( "Add 9, multiply by 7, Left Shift 2 = " + num );
        
        alert( "Exponet = " + num.exp + "" ); //No "bitNumber" exponent.
        
        alert( "Exponet = " + num.bits().exp + "" ); //To "bitNumber" then exponent.
        
        alert( "Exponet = " + num.bitLsh(1).exp + "" ); //Or do "bitLsh()" gives "bitNumber".
        ```
    3. Method **parseNumber()**:
        > #### parseNumber( str, base )
        ```javascript
        //The number PI in IEEE-754 double precision binary format.
        
        var num = parseNumber( "0100000000001001001000011111101101010010111011001001010000101010" );
        
        alert( num ); //Displays "3.141592643589793".
        
        //The number PI in IEEE-754 double precision hex format 0x400921FB52EC942A.
        
        var num2 = parseNumber( "400921FB52EC942A", 16 );
        
        alert( num2 ); //Displays "3.141592643589793".
        
        //Convert Number to Bit Number.
        
        var num = ( 79.6771716761117 ).bits();
        
        //Display Number in base 36 IEEE-754 double precision, and parse back to an Number.
        
        var str36 = num.toString(36);
        
        alert( str36 + " = " + parseNumber( str36, 36 ) );
        ```
------------------------------------------------------------------------------
3. ### Fraction Data type.
     1. Fractions are displayed in proper fraction format.
        ```javascript
        var f = new Fract( 314, 100 );
        
        alert( f );  //The Fraction "14÷100+3" is displayed.
        
        alert( "Value = " + f );  //3.14 is displayed when added to an string.
        
        alert( "Value = " + f.toString() );  //The Fraction "14÷100+3" is displayed.
        ```
    2. Fractions convert to Number during any Math, or Arithmetic/Logic operation.
        ```javascript
        var f1 = new Fract( 9, 17 ), f2 = new Fract( 99, 10 );

        //Any Number operation, or arithmetic operation will convert back to "Number".
        //This includes adding fractions, or multiplying.
        
        f1 = f1 + 71;
        
        alert( f1 );  //The number "71.52941176470588" is displayed.
        
        //Ask the number to be an fraction again.

        f1 = f1.getFract();

        alert( f1 );  //9÷17+71 is displayed.

        //Multiply fractions.

        f1 = f1 * f2;

        alert( f1 );  //The number "708.1411764705882" is displayed.

        //Ask the number to be an fraction again.

        f1 = f1.getFract();

        alert( f1 );  //The fraction "12÷85+708" is displayed.

        //Convert Fraction to number then to bit number.

        f2 = ( f2 + 0 ).bits();

        //Add the Bit number to fraction. Both convert to Number during Math operation.

        f1 = f1 + f2;

        alert( f1 );  //The Number "718.0411764705882" is displayed.
        ```
    3. Method **Fract.divP()**:
        > Divides the fraction in select number base 2 through 36 returns the repeating Pattern.<br />
        For Example 1÷7 = 0.142857142857 will repeat digits "142857" over and over to infinity.<br />
        However 1÷7 divides evenly in (base 7), but not out of per 10 digits.<br />
        ```javascript
        var Pat = new Fract( 1, 7 ).divP(); //Divide 1 into 7 in binary.
        
        alert( Pat ); //The repeating pattern in an double precision numbers mantissa bits is "001∞".
        
        Pat = new Fract( 1, 7 ).divP( 10 ); //Divide 1 into 7 in decimal (base 10).
        
        alert( Pat ); //The repeating pattern in decimal is "142857∞".
        ```
    4. Method **Fract.Reduce()**:
        > Reduce fraction to lowest possible whole value. <br />
        Returns Fraction data type.
    5. Method **Fract.toString()**:
        > Returns an string of the fraction as a proper fraction.
    6. Method **Fract.toCode()**:
        > Returns an string of the fraction as script code. <br />
        Main use is self building code that then can be compiled using **eval()** to evaluate the code.
        ```javascript
        var x = 1;
        
        var f = ( Math.random() * 1000 ).getFract();
        
        var code = "";
        
        for( var i = 0; i < 7; i++ )
        {
          code += "x *= " + f.toCode() + ";\r\n";
          f = ( Math.random() * 1000 ).getFract();
        }
        
        //Put the code into an function.
        
        code = "var MyFunc = function( x ) {\r\n" + code + "return( x ); };"
        
        //Display the Self generated function.
        
        alert( "Self generated code =\r\n" + code );
        
        //Compile the function.
        
        eval(code);
        
        //Pass random values to the function.
        
        x = Math.random();
        alert( x + " = " + MyFunc( x ) + "" );
        
        x = Math.random();
        alert( x + " = " + MyFunc( x ) + "" );
        
        x = Math.random();
        alert( x + " = " + MyFunc( x ) + "" );
        ```
        > Note if one wants to you can create an array of random functions with this and link them together. <br />
        Or one can combine this with an algorithm to generate an function based on an data set.
------------------------------------------------------------------------------
4. ### Pattern Data type.
     1. Method **parsePattern( str, base )**:
        ```javascript
        var Pat = parsePattern( "142857", 10 );
        
        alert( Pat ); //Displays "142857∞"
        
        var Fract = Pat.getFract();
        
        alert( "Fraction = " + Fract.toString() ); //Displays Fraction "1÷7".
        
        //The value of the fraction.
        
        alert( "Value = " + Fract ); //Displays "0.14285714285714285" In which digits "142857" repeats.
        ```
        > If no base is specified binary is amused.
        ```javascript
        var Pat = parsePattern( "001" );
        
        alert( Pat ); //Displays "001∞"
        
        var Fract = Pat.getFract();
        
        alert( "Fraction = " + Fract.toString() ); //Displays Fraction "1÷7".
        
        //The value of the fraction.
        
        alert( "Value = " + Fract ); //Displays "0.14285714285714285" In which digits "142857" repeats.

        alert( "Value = " + (Fract + 0).toString(2) ); //Displays "0.001001001001001001001001001001001001001001001001001001" In which digits "001∞" repeats.
        ```
      2. Method **Pat.getFract()**:
          > Returns the fraction that produces the repeating pattern.
      3. Method **Pat.avgFract()**:
          > Returns the fraction that produces the best matching repeating pattern.
      4. Method **Pat.toFract( num )**:
          > Removes the pattern component of an float number then compute the Fraction.
          ```javascript
          var Pat = parsePattern( "142857", 10 ); //The Pattern of "1÷7".
          
          var num = ( 1 / 7 ) * 3; //The fraction "(1÷7)x3".
          
          alert( Pat.toFract( num ) ); //Gives the fraction "3÷7".
          ```
      5. Method **Pat.toString()**:
          > The infinet repeating patern to an string.
