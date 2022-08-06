//**********************************************************************************
//Simple function for if value is an number.
//**********************************************************************************

Object.prototype.isNum = function () { if (isNaN(this)) { throw new TypeError("Expected Number;"); } }

//**********************************************************************************
//Construct the new fraction data type.
//**********************************************************************************

var Fract = function (X, Y)
{
  var n = new Number( X / Y ); for( k in this ){ n[k] = this[k]; }
  n.reduce = n.getFract;
  
  n.x = X; n.y = Y;

  if (n.x > 3.99168061906944e+292 || n.y > 3.99168061906944e+292)
  {
    n.x /= 1.7726622920963562e+277; n.y /= 1.7726622920963562e+277;
  }

  return (n);
};

//**********************************************************************************
//Teach compiler how to display fraction data type, or to combine it as code.
//**********************************************************************************

var Oporators = [
  "*", "*=", "/", "/=", "+", "+=", "-", "-=", "%", "%=", "**", "**=",
  "&", "&=", "|", "|=", "~", "~", "^", "^=", "<<", "<<=", ">>", ">>=", ">>>", ">>>=",
  "<", "<=", ">", ">=", "==", "===", "!=", "!==", "&&", "&&=", "||", "||=", "!", "!=", "", "="
];

Fract.prototype.toString = function (op, s)
{
  //Check if operator is valid.

  if (op != undefined && (op = Oporators.indexOf(op)) < 0) { throw (new Error("Operator is not supported.")); }

  //Is the value of the fraction negative or positive. Note if "s" is true force absolute value.

  var sing = (this.x ^ this.y) < 0 && !s;

  //absolute value numerator, denominator, remainder, and sum.

  var out = "", numerator = Math.floor(Math.abs(Math.round(this.x)), denominator = Math.abs(Math.round(this.y)));

  var sum = Math.floor(numerator / denominator);

  //subtract sum amount leaving the remainder of the fractional part.

  numerator = numerator - (denominator * sum);

  //If has fractional part.

  if (numerator !== 0 && !(op > 11 && op < 26))
  {
    if (sing) { out += "-"; sing = ~sing; }

    //Multiply, and Divide flip if it is 1 divided by.

    if ((numerator === 1 && sum === 0) && (op < 4)) { numerator = 0; op += op < 2 ? 2 : -2; }

    //Else Regular fraction amount.

    else { out += numerator + (op != undefined ? " / " : "\xF7"); }

    //Divided by.

    out += denominator;
  }

  //Sum amount.

  if (sum !== 0) { out += !sing ? (out == "" ? "" : " + ") : " - "; out += sum; }

  //If fraction and sum is combined with operation must be put in parenthesis.

  if (op != undefined && numerator !== 0 && sum !== 0 && ((op & 1) == 0 && op < 12)) { out = "( " + out + " )"; }

  //Return value.

  if ((out === "1" || out === "") && (op < 4)) { return (""); } //Divide multiply by one is no operation.

  if (Oporators[op]) { out = Oporators[op] + " " + out; } else { out = out.replace(/ /g, ""); }

  return (out !== "" ? out : "0");
};

//**********************************************************************************
//Teach the compiler how to read the value of an fraction.
//**********************************************************************************

Fract.prototype.valueOf = function() { return( this.x / this.y ); }

Fract.prototype.reValue = function () { return ((isNaN(this.r[this.length]) ? this : this.r[this.length].valueOf().getFract()).toString()); };

//**********************************************************************************
//factorial number.
//**********************************************************************************

FNumber = function( v )
{
  var n = new Number( v ); for( k in this ){ n[k] = this[k]; }
  n.abLim = n.reFact = true;
  
  n.r = [Math.abs( v )];
  n.val = [0]; n.sing = v < 0 ? -1 : 1;
  
  return (n);
};

Number.prototype.sing = 1;

FNumber.prototype.valueOf = function () { return ( this.r[this.length] * this.sing ); };

FNumber.prototype.reValue = function () { return ( this.r[this.length] ); };

FNumber.prototype.toString = function( pos )
{
  var o = "", e = this.length, pos = pos ? Math.max(0, pos) : Math.max( 0, e - 20 );

  pos = Math.min( pos, e - 1 ); e = Math.min( pos + 20, e );

  for( var i = pos; i < e; i++ )
  {
    o += "X" + i + " = " + this.a[i] + " / " + this.b[i] + "\r\n";
  }
  
  return( o );
};

//**********************************************************************************
//Transcendental number.
//**********************************************************************************

function TNumber( v )
{
  var n = new Number(v); for( k in this ){ n[k] = this[k]; }
  n.abLim = n.reFact = true;
    
  if( v )
  {
    n.r = [v.primitive()]; n.val = [0];
    
    n.sing = v < 0 ? -1 : 1;
    
    return(n);
  }
  
  n.r = [NaN]; n.val = [0];
  
  return( n );
};

TNumber.prototype.valueOf = function() { return( this.r[this.length] ); };

TNumber.prototype.reValue = function () { return ( this.r[this.length] ); };

TNumber.prototype.toString = function( pos )
{
  var o = "", e = this.length, pos = pos ? Math.max(0, pos) : Math.max( 0, e - 20 );

  pos = Math.min( pos, e - 1 ); e = Math.min( pos + 20, e );

  for( var i = pos; i < e; i++ )
  {
    o += "X" + i + " = " + this.a[i] + " / " + this.b[i] + "\r\n";
  }
  
  return( o );
};

//**********************************************************************************
//Last binary digit of accuracy in an float 64 number.
//This value is not predefined in older script engines.
//**********************************************************************************

Number.EPSILON = 1 / Math.pow(2, 52);

//**********************************************************************************
//Number of parts number, or fraction is split into.
//**********************************************************************************

Number.prototype.length = 0;

//*****************************************************************************************************
//Each part as we split number, or fraction apart.
//*****************************************************************************************************

Number.prototype.a = [undefined];
Number.prototype.b = [undefined];
Number.prototype.r = [undefined];

//*****************************************************************************************************
//Parts are added up by these values to compute the remaining value.
//*****************************************************************************************************

Number.prototype.tx = [0]; Number.prototype.fx = [1]; Number.prototype.ty = [1]; Number.prototype.fy = [0];

//*****************************************************************************************************
//Remaining value.
//*****************************************************************************************************

Number.prototype.val = [undefined];

//**********************************************************************************
//Anything past the last binary digit of accuracy is inaccurate.
//It can be set to a different cut off limit via the limit function.
//**********************************************************************************

Number.prototype.ac = Number.EPSILON;

//**********************************************************************************
//The cut off range has to be calculated once for each number, or can be set using limit.
//**********************************************************************************

Number.prototype.init_ac = false;

//**********************************************************************************
//The FL64 UI tool needs to know which number types need to refactor after one factor changes.
//**********************************************************************************

Number.prototype.reFact = false;

//*****************************************************************************************************
//Split a number, or Fraction and return the object.
//*****************************************************************************************************

Number.prototype.rA = false; Number.prototype.rB = false;

function cfAdj( A, B )
{
  Number.prototype.rA = A;
  Number.prototype.rB = B;
  Number.prototype.abLim = Number.prototype.reFact = A || B;
}

Number.prototype.split = function (a, b)
{
  if (this.r[this.length] === 0) { return (this); }

  //On first split override the to string operation to show the remaining part, and value of to return the remaining value.

  if (!this.init_ac) { this.init_ac = true; this.ac = Math.pow(2, (Math.round(Math.log(Math.abs(this.primitive())) / 0.6931471805599453))) * Number.EPSILON; }

  if (this.length === 0)
  {
    var n = this.primitive(), s1 = n < 0 ? -1 : 1;

    a = isNaN(a) ? Math.floor(n * s1) * s1 : a; b = b || 1;
    
    if( !isNaN(n) && this.rA )
    {
      var r = a/(1/(n-a)), s2 = r < 0 ? -1 : 1;
    
      r = Math.ceil( r * s2 ) * s2;
    
      //Allow the value for B to be adjusted higher than r.
    
      if( b * s2 < r * s2 ) { b = r; }
    }

    this.tx = [0]; this.ty = [1];
    this.fx = [1]; this.fy = [0];

    this.fx[0] = this.tx[0] + (this.tx[0] = this.fx[0] * b) * a / b;
    this.fy[0] = this.ty[0] + (this.ty[0] = this.fy[0] * b) * a / b;

    this.a = [a]; this.b = [b];

    this.r = [n, (1 / (this.val[0] = n - a)) * b];

    if (this.r[1] == Infinity) { this.r[1] = 0; }

    if( this instanceof Number )
    {
      this.val = [n, Math.abs(this.r[0] - (this.fx[0] / this.fy[0]))];
    }
    else
    {
      this.r = [ new Fract(this.x, this.y), new Fract(this.y * b, this.x - (this.y * a)) ];
      this.toString = function ()
      {
        var s = "";
  
        for (var i = 0; i < this.length; s += "a=" + this.a[i] + ", b=" + this.b[i] + "\r\n", i++);
  
        return (s + this.valueOf().getFract().toString());
      };
    }

    this.valueOf = function () { return (this.val[this.length]); };

    this.length += 1; return (this);
  }

  //Split value a by b. Or by default scale a=int, b=1.

  var n = this.r[this.length], s1 = n < 0 ? -1 : 1;

  //Split value a by b. Default is a=int, b=1.

  a = isNaN(a) ? Math.floor(n * s1) * s1 : a; b = b || 1;
  
  //If rA is active adjust the value for B so that the next value for A is as close to the previous value for A.
        
  if( this.rA )
  {
    var r = a/(1/(n-a)), s = r < 0 ? -1 : 1;
    
    r = Math.ceil( r * s ) * s;
    
    //Allow the value for B to be adjusted higher than r.
    
    if( b * s < r * s ) { b = r; }
  }
  
  //Force b >= b.
  
  if( this.rB )
  {
    var s = this.b[this.length-1] < 0 ? -1 : 1;
    
    if( b * s < this.b[this.length-1] * s )
    {
      b = this.b[this.length-1];
    }
  }
  
  //The value for b should never be zero.
  
  b = b == 0 ? 1 : b;

  //Add a by b point.

  this.a[this.length] = a; this.b[this.length] = b;

  //Write remaining value. used by each next split.

  if( this instanceof Number ) { this.r[this.length + 1] = (1 / (n - a)) * b; }
  else { this.r[this.length + 1] = new Fract(n.y * b, n.x - (n.y * a)); }

  //Add up each split into fx, fy per split

  this.fx[this.length] = this.tx[this.length - 1] + (this.tx[this.length] = this.fx[this.length - 1] * b) * a / b;
  this.fy[this.length] = this.ty[this.length - 1] + (this.ty[this.length] = this.fy[this.length - 1] * b) * a / b;

  //Only re-factor FX, FY, TX, TY when values get to the end of the exponent.
  //For the time being we will just move the exponent.
  //Note to self. Max is 2^1023, so 2^(1023-51)=3.99168061906944e+292. Thus 2^(1023-51*2)=1.7726622920963562e+277

  if (this.fx[this.length] > 3.99168061906944e+292 || this.fy[this.length] > 3.99168061906944e+292)
  {
    this.fx[this.length] /= 1.7726622920963562e+277; this.fy[this.length] /= 1.7726622920963562e+277;
    this.tx[this.length] /= 1.7726622920963562e+277; this.ty[this.length] /= 1.7726622920963562e+277;
  }

  //Val is automatically 0 at cut off range.

  if ((this.val[this.length+1] = Math.abs(this.r[0] - (this.fx[this.length] / this.fy[this.length]))) < this.ac)
  {
    this.val[this.length + 1] = 0; this.r[this.length + 1] = 0;
  }
  this.length += 1; return (this);
};

//*****************************************************************************************************
//Split a number and return the factorial number object.
//*****************************************************************************************************

FNumber.prototype.split = function (a, b)
{
  if (this.r[this.length] === 0) { return (this); }

  //On first split override the to string operation to show the remaining part, and value of to return the remaining value.

  if (!this.init_ac) { this.init_ac = true; this.ac = Math.pow(2, (Math.round(Math.log(Math.abs(this.r[0])) / 0.6931471805599453))) * Number.EPSILON; }

  //Split a number as spaced apart factorial expansion.

  if( this.length > 0 )
  {
    //Denominator can not be made smaller once it is incremented in a number expansion.

    a = ((a = ( a || 1 )) < this.a[this.length - 1] ? this.a[this.length - 1] : a);

    //New factor must expand past at least +1 past current factor.
    
    mx = this.b[this.length - 1]; b = b || 0; b = b === mx ? mx + 1 : b < mx ? mx : b;
    
    //The min factor is exactly Denominator +1 in order for each factor to be an expansion from the last.

    mn = !isNaN(this.reValue()) ? Math.round( ( a + 1 ) / this.reValue() ) : mx * ( this.a[this.length - 1] + 1 );

    //The factor limit.
    
    b = ( b || 0 ) < mn ? mn : b;
    
    //Create the new factor.

    this.a[this.length] = a; this.b[this.length] = b;

    this.val[this.length + 1] = this.val[this.length] + ( a / b );

    this.r[this.length + 1] = this.r[this.length] - ( a / b );

    this.length += 1;
  }

  //First time we split a number.

  else
  {
    if( a && b ) { if( ( a / b ) > this.r[0] ){ a = null; b = null; } }
    
    //Zero can not be used.
    
    if( (this.a = [a || Math.floor( this.r[0] )])[0] == 0 )
    {
      this.a = [1]; this.b = [Math.round( 2 / this.r[0] )];
    }
    else{ this.b = [b || 1]; }

    this.val[1] = this.a[0] / this.b[0];

    this.r[1] = this.r[0] - (this.a[0] / this.b[0]);

    this.length += 1;
  }

  //Check number at accuracy set limit.

  if( this.reValue() < this.ac ) { this.r[this.length] = 0; }

  return (this);
};

//*****************************************************************************************************
//Split a Transcendental number and return the Transcendental number object.
//*****************************************************************************************************

TNumber.prototype.getMaxB = function()
{
  return( Math.floor( Math.abs( this.a[this.length] / this.r[this.length] ) ) );
};

TNumber.prototype.getMinB = function()
{
  return( Math.round( Math.sqrt( Math.abs( this.a[this.length] / this.r[this.length] ) ) ) );
};

TNumber.prototype.split = function( a, b )
{
  if( this.r[this.length] == 0 ){ return(this); }
  
  if (!this.init_ac) { this.init_ac = true; this.ac = Math.pow(2, (Math.round(Math.log(Math.abs(this.v / 0.6931471805599453))))) * Number.EPSILON; }
  
  var s = ( this.length % 2 == 0 ) ? this.sing : -this.sing;
  
  a = a || Math.ceil( isNaN(this.r[0]) ? 1 : Math.abs( this.r[0] ) ); if( a < this.a[this.length - 1] )
  {
    a = this.a[this.length - 1];
  }
  
  this.a[this.length] = a;
  
  if( !isNaN(b) && b < 0 ) { b = -b; }
  
  if(!isNaN(this.r[this.length]))
  {
    max = this.getMaxB(); min = this.getMinB();
    
    if ( isNaN(b) ) { b = max; } else if( b > max ) { b = max; } else if( b < min ) { b = min; }
  }
  
  if( b <= this.b[this.length - 1] * -s )
  {
    b = ( this.b[this.length - 1] * -s ) + 1;
  }
  
  this.b[this.length] = b * s;
  
  this.r[this.length+1] = this.r[this.length] - this.a[this.length] / this.b[this.length];
  this.val[this.length+1] = this.val[this.length] + this.a[this.length] / this.b[this.length];
  
  this.length += 1; if( Math.abs(this.r[this.length]) < this.ac ){ this.r[this.length] = 0; }
  
  return( this );
};

//*****************************************************************************************************
//Split a number into all parts.
//*****************************************************************************************************

Number.prototype.splitAll = function ()
{
  while( this.split() != 0 ); return (this);
};

//**********************************************************************************
//Remove a factor.
//**********************************************************************************

Number.prototype.remove = function (el)
{
  var n = this;

  var End = n.length - 1, ba = n.a, bb = n.b; n.length = el;

  while (n.length < End) { el += 1; n = n.split(ba[el], bb[el]); }

  return (n);
};

//**********************************************************************************
//set the A, or B factors.
//**********************************************************************************

Number.prototype.setA = function (el, v)
{
  var n = this, End = n.length, ba = n.a, bb = n.b; n.length = el;

  n = n.split(v, bb[el]); while (el < End) { el += 1; n = n.split(ba[el], bb[el]); }
  
  while( End < this.length ) { this.length -= 1; n.a.pop(); n.b.pop(); }

  return(n);
};

Number.prototype.setB = function (el, v)
{
  //The value cant be set 0 so it is set -1 or +1 based on direction.
  
  if (v === 0) { v = this.b[el] > v ? -1 : 1; }

  //Continue with function.

  var n = this, End = n.length, ba = n.a, bb = n.b; n.length = el;

  n = n.split(ba[el], v); while (el < End) { el += 1; n = n.split(ba[el], bb[el]); }
  
  while( End < this.length ) { this.length -= 1; n.a.pop(); n.b.pop(); }

  return (n);
};

//*****************************************************************************************************
//Directly calculate parts to a floating point number.
//*****************************************************************************************************

Number.prototype.calc = function (Start, End)
{
  if (this.length == 0) { return (0); }

  var Start = Start || 0; if (typeof (End) === "undefined") { End = this.length - 1; }

  //If start position is unaltered and is 0. Then each added split from 0 is prerecorded.

  if (Start === 0) { return (this.fx[End] / this.fy[End]); }

  //Else calculate the value.

  for (var i = End - 1, f = this.a[End] / this.b[End]; i >= Start; i--) { f = this.a[i] + (this.b[i] / f); }

  return (f);
};

FNumber.prototype.calc = function (Start, End)
{
  if (this.length == 0) { return ( 0 ); }

  var Start = Start || 0, End = End || this.length - 1;

  Start = Math.max( Start, 0 ); End = Math.max( End, 0 );
  
  if (typeof (End) === "undefined") { End = this.length - 1; }

  //If start position is unaltered and is 0. Then each added split from 0 is prerecorded.

  if (Start === 0) { return ( this.val[End + 1] * this.sing ); }

  //Else calculate the value.

  for (var i = End - 1, f = this.a[End] / this.b[End]; i >= Start; i--) { f += this.a[i] / this.b[i]; }

  return ( f * this.sing );
};

TNumber.prototype.calc = function (Start, End)
{
  if (this.length == 0) { return ( 0 ); }

  var Start = Start || 0, End = End || this.length - 1;

  Start = Math.max( Start, 0 ); End = Math.max( End, 0 );
  
  if (typeof (End) === "undefined") { End = this.length - 1; }

  //If start position is unaltered and is 0. Then each added split from 0 is prerecorded.

  if (Start === 0) { return ( this.val[End + 1] ); }

  //Else calculate the value.

  for (var i = End - 1, f = this.a[End] / this.b[End]; i >= Start; i--) { f += this.a[i] / this.b[i]; }

  return ( f );
};

//**********************************************************************************
//Combine Start to end parts as a whole fraction.
//**********************************************************************************

Number.prototype.calcF = function (Start, End)
{
  var Start = Start || 0; if (typeof (End) === "undefined") { End = this.length - 1; }

  //If start position is unaltered and is 0. Then each added split from 0 is prerecorded.

  if (Start === 0) { return (new Fract(this.fx[End], this.fy[End])); }

  //Else calculate the value.

  var x1 = 1, x2 = 0, y1 = 0, y2 = 1;

  for (var i = Start; i <= End; i++)
  {
    x1 = x2 + (x2 = x1 * this.b[i]) * this.a[i] / this.b[i];
    y1 = y2 + (y2 = y1 * this.b[i]) * this.a[i] / this.b[i];
  }

  return (new Fract(x1, y1));
};

FNumber.prototype.calcF = function (Start, End)
{
  if (this.length == 0) { return (new Fract(0, 1)); }

  var Start = Start || 0; if (typeof (End) === "undefined") { End = this.length - 1; }

  //If start position is unaltered and is 0. Then each added split from 0 is prerecorded.

  if (Start === 0) { return ( ( this.val[End + 1] * this.sing ).getFract() ); }

  //Else calculate the value.

  for (var i = End - 1, f = this.a[End] / this.b[End]; i >= Start; i--) { f += this.a[i] / this.b[i]; }

  return ( ( f * this.sing ).getFract() );
};

TNumber.prototype.calcF = function (Start, End)
{
  if (this.length == 0) { return (new Fract(0, 1)); }

  var Start = Start || 0; if (typeof (End) === "undefined") { End = this.length - 1; }

  //If start position is unaltered and is 0. Then each added split from 0 is prerecorded.

  if (Start === 0) { return (new TNumber( this.val[End + 1].getFract() ) ); }

  //Else calculate the value.

  for (var i = End - 1, f = this.a[End] / this.b[End]; i >= Start; i--) { f += this.a[i] / this.b[i]; }

  return ( f.getFract() );
};

//**********************************************************************************
//Transform All factors by two functions.
//**********************************************************************************

Number.prototype.abLim = false;

Number.prototype.Trans = function (x, fa, fb)
{
  if (isNaN(fa(1)) || isNaN(fb(1))) { return (this); }

  var sing = ( this.primitive() || 0 ) < 0, a = Math.round(fa(1)), b = Math.round(fb(1)), i = 1;

  if (isNaN(this)) { while (this.length < x) { this.split(1,1); }; }

  else { while (this.length < x) { this.split(); }; }

  this.length = x;

  //If we are transforming a number that is NaN.

  if (isNaN(this))
  {
    if(this.abLim)
    {
      while (x < 10000)
      {
        x += 1; i += 1; this.split(a, b);
    
        if( a == this.a[this.length-1] && b == Math.abs( this.b[this.length-1] ) ) { a = Math.round(fa(i)); b = Math.round(fb(i)); }
        else { x = 10000; this.length -= 1; break; }
      }
    }
    else
    {
      while (x < 10000) { x += 1; i += 1; this.split(a, b); a = Math.round(fa(i)); b = Math.round(fb(i)); }
    }
  }

  //Transform as many factors as possible. In range of each split.

  else if( this.abLim )
  {
    while (this.r[this.length] != 0 )
    {
      x += 1; i += 1; this.split(a, b);
    
      if( a == this.a[this.length-1] && b == Math.abs( this.b[this.length-1] ) ) { a = Math.round(fa(i)); b = Math.round(fb(i)); }
      else { this.length -= 1; break; }
    }
  }
  else
  {
    if( !sing ) { while (this.r[this.length] > 0) { x += 1; i += 1; this.split(a, b); a = Math.round(fa(i)); b = Math.round(fb(i)); } }
    else { while (this.r[this.length] < 0) { x += 1; i += 1; this.split(a, b); a = Math.round(fa(i)); b = Math.round(fb(i)); } }
  }

  return (this);
};

//**********************************************************************************
//Remove factors that are past a set accuracy limit.
//**********************************************************************************

Number.prototype.limit = function (ac)
{
  //Set accuracy limit.

  this.init_ac = true; this.ac = Math.pow(2, (Math.round(Math.log(Math.abs(this.primitive())) / 0.6931471805599453))) * (ac || Number.EPSILON);

  //Set length to accuracy limit.

  for (; this.val[this.length - 2] < this.ac; this.length--);

  if (this.length > 0) { this.length -= 1; this.split(this.a[this.length], this.b[this.length]); }

  return (this);
};

//*****************************************************************************************************
//Split and add number to smallest fraction. Works for reducing a fraction as well.
//*****************************************************************************************************

Number.prototype.getFract = function ()
{
  if (!this.init_ac) { this.init_ac = true; this.ac = Math.pow(2, (Math.round(Math.log(Math.abs(this.primitive())) / 0.6931471805599453))) * Number.EPSILON; }

  var v = (n = this.primitive()), r = 0;

  this.fx = 1; this.fy=0; this.tx = 0; this.ty=1;

  while ((Math.abs(v - (this.fx / this.fy))) > this.ac)
  {
    r = Math.floor(n); n = 1 / (n - r);

    //Add up each split into fx, fy per split

    this.fx = this.tx + (this.tx = this.fx) * r;
    this.fy = this.ty + (this.ty = this.fy) * r;
  }

  return (new Fract(this.fx, this.fy));
};

//**********************************************************************************
//Directly translate an float to it's average matching integer parts.
//**********************************************************************************

Number.prototype.avgFract = function ()
{
  for (var i = 0, o = 0, n = this.splitAll(); i < n.length; o += n.a[i++]); o = Math.round(o / i);

  i = 0; while (n.a[i] <= o) { i += 1; }; i -= 1; return (new Fract(n.fx[i], n.fy[i]));
};

//**********************************************************************************
//Error correct an number.
//**********************************************************************************

Number.prototype.err = function ()
{
  for (var i = 0, o = 0, n = this.splitAll(); i < n.length; o += n.a[i], i++); o = Math.round(o / i);

  //Remove a factor bigger than the average integer parts from the end of the number.

  while( i > 0 )
  {
    if( n.a[i] >= o )
    {
      return(new Fract(n.fx[i-1], n.fy[i-1]));
    }
    
    i-=1;
  }
  
  return( new Fract( n.fx[n.lenght-1], n.fy[n.length-1] ) );
};

//**********************************************************************************
//Show different stats about Numbers.
//**********************************************************************************

Number.prototype.stats = function()
{
	for (var i = 0, o = 0, n = this.splitAll(); i < n.length; o += n.a[i], i++); o = Math.round(o / i);
	
	console.log("A = " + n.a.toString());
	console.log("B = " + n.b.toString());
	console.log("Avg Int = " + o);
	
	//calculate convergence.
	
	var r = Math.round(Math.log(n.val[0])/Math.log(2))+1, c = [];
	
	for( var i = 0; i < n.length; i++ )
	{
	  c[i]=Math.abs(Math.round(Math.log(n.val[i])/Math.log(2))-r);
	}
	
	c.pop(); console.log("Converge Speed (2^52)+1.\r\n" + c.toString().replace(/,/g, "\r\n"));
	
	//Average converge speed.
	
  for (var i = 0, o = 0; i < c.length; i++) { o += c[i]; }; o /= i;

  console.log("Avg converge speed (2^52)+1.\r\n" + o + "");
	
	//the Size between each per factor jump.
	
  for (var i = 0; i < c.length; i++) { c[i] = c[i + 1] - c[i]; }; c.pop();
	
	console.log("Converge Speed Dif.\r\n" + c.toString().replace(/,/g, "\r\n"));
	
	//Average converge speed dif.
	
  for (var i = 0, o = 0; i < c.length; i++) { o += c[i]; }; o/=i;
	
	console.log("Avg converge speed Dif.\r\n" + o + "");
	
	//Value at different accuracy levels.
	
	for(var i = 0, ac = []; i < n.length; i++)
	{
	  ac[i] = n.fx[i]+"/"+n.fy[i]+"\r\n"+(n.fx[i]/n.fy[i])+"\r\n-----------------------";
	}
	
	console.log("Accuracy levels, and factors.\r\n" + ac.toString().replace(/,/g, "\r\n"));
};

//**********************************************************************************
//The pattern data type is used for numbers that do not divide thus the pattern can be stored separably as an data type.
//**********************************************************************************

var Pattern = function (str, base)
{
  base = base || 2; base.isNum(); this.base = base; this.pat = []; str = str || ""; str = str.replace("\u221E", "").toUpperCase();

  //Check if invalid base setting.

  if (base < 2 || base > 36) { throw new RangeError("radix must be an integer at least 2 and no greater than 36"); }

  //Parse the pattern. Return undefined if improper format.

  for (var i = 0; i < str.length; i++)
  {
    this.pat[i] = str.charCodeAt(i) < 0x40 ? str.charCodeAt(i) - 0x30 : str.charCodeAt(i) - 0x37;
    if (this.pat[i] >= base || this.pat[i] < 0) { this.pat = [Infinity]; return; };
  }

  //Return the pattern data.

  return (this);
};

//**********************************************************************************
//Do division one step at an time stopping at the pattern in the division.
//Default base is binary, however base can be set 2 to 36.
//**********************************************************************************

Fract.prototype.divP = function (base)
{
  //Pattern data type.

  var pat = new Pattern(); pat.base = base || 2; pat.base.isNum();

  //Fraction to divide.

  n1 = Math.round(Math.abs(this.x)), n2 = Math.round(Math.abs(this.y));

  //Data of the divide operation.

  pat.data = [n1];

  //El (Element), and C (Current element), and whether to force computation.

  var El = -1, C = 0;

  //Get time. This is set for if the calculation takes longer than 7 seconds.

  var t = new Date().getTime();

  //If divide by 0.

  if (pat.data[0] === 0) { pat.pat = [0]; pat.data = null; return (pat); }

  //While the Element is not equal to the divide going in and coming out.

  while (El === -1)
  {
    if ((new Date().getTime() - t) > 7000) { var err = new RangeError("Time out"); err.data = pat.data; throw(err); }

    for (var Exp = pat.data[pat.data.length - 1], i = 0; (Exp - n2) < 0; Exp *= pat.base, i++)
    {
      if (i >= 1)
      {
        pat.pat[pat.pat.length] = 0; pat.data[pat.data.length] = null;
      }
    }

    i = ((Exp / n2) & -1); pat.pat[pat.pat.length] = i; C = Exp - (n2 * i); pat.data[pat.data.length] = C;

    for (El = pat.data.length - 2; El > -1 && pat.data[El] !== C; El--);

    if (C === 0) { pat.pat = [0]; pat.data = null; return (pat); }
  }

  //return the pattern at the first matching element to current element.

  pat.data = null; pat.pat = pat.pat.slice(El, pat.pat.length); return (pat);
};

//**********************************************************************************
//Convert patterns into an fraction that generates the division pattern.
//**********************************************************************************

Pattern.prototype.getFract = function ()
{
  //Initialize.

  var f1 = 1, f2 = 0;

  //Calculate pattern in the limitation of 53 mantissa bit's.

  for (var i = Math.min(this.pat.length - 1, (36.7368005696771 / Math.log(this.base) + 0.5) & -1); i > -1; f2 += this.pat[i--] * f1, f1 *= this.base); f1 -= 1;

  //return the fraction.

  return (new Fract(f2, f1).limit(3.552713678800501e-15).reduce());
};

//**********************************************************************************
//This method is broken after the updates.
//**********************************************************************************

Pattern.prototype.avgFract = function ()
{
  //Initialize.

  var len = 3, c = this.getFract(), m = new Fract(0, 0);

  while (this.pat.length > 0 && len < 2251799813685248 && c.y !== m.y)
  {
    //Shift the pattern.

    m = c; len *= this.base; this.pat.shift();

    //Calculate pattern.

    c = this.getFract().limit(1/len).reduce();
  }

  //Check if no pattern.

  if (this.pat.length === 0) { m = new Fract(0, 0); }

  //Return the division pattern.

  return (m);
};

//**********************************************************************************
//Teach the compiler how to display patterns into the repeating binary sequence.
//**********************************************************************************

Pattern.prototype.toString = function ()
{
  var out = ""; if (this.pat[0] && this.pat[0] === Infinity) { return (""); }

  for (var i = 0; i < this.pat.length; out += String.fromCharCode(this.pat[i] < 10 ? 0x30 + this.pat[i] : 0x37 + this.pat[i]), i++);

  return (out + "\u221E");
};

//**********************************************************************************
//Reverse float number pattern, and exponent adjust to smallest fraction.
//**********************************************************************************

Pattern.prototype.toFract = function (Float)
{
  //Convert pattern to fraction.

  Float.isNum(); var fr = this.getFract();

  //Compute Nominator.

  var e = Float ? Float / fr : fr; fr.x *= e;

  //Exponent adjust.

  while (Math.abs(Float - (Math.round(fr.x) / Math.round(fr.y))) > Number.EPSILON && fr.x !== Infinity) { fr.x *= this.base; fr.y *= this.base; }

  //Result.

  fr.x = Math.round(fr.x); fr.y = Math.round(fr.y); return (fr);
};

//**********************************************************************************
//Adjust Float64 binary into sections extending from number.
//**********************************************************************************

Number.prototype.bits = function ()
{
  if (this.bm) { return (this); }; var f = this;

  //Construct new number.

  var o = new Number(this); o.bm = true;

  //Is NaN.

  if (isNaN(f)) { this.sing = 0; this.exp = 2047; this.mantissa = 4503599627370495; return (this); }

  //Infinity.

  if (!isFinite(f)) { this.sing = (f < 0) & 1; this.exp = 2047; this.mantissa = 0; return (this); }

  //Compute Sing.

  o.sing = 0; if (f < 0) { f = -f; o.sing = 1; }

  //Compute Exponent.

  o.exp = Math.floor(Math.log(f) / Math.log(2));

  //Adjust the number so that it is "0.Mantissa".

  if (-o.exp >= 0x3FF) { f /= Math.pow(2, -0x3FD); o.exp = -0x3FF; } else { f /= Math.pow(2, o.exp + 1); }

  //Compute Mantissa.

  o.mantissa = f * Math.pow(2, 53); if (-o.exp !== 0x3FF) { o.mantissa -= Math.pow(2, 52); }

  //Center Exponent.

  o.exp = (0x3FF + o.exp) & 0x7FF;

  //return the decoded float.

  if (o.mantissa > 4503599627370495) { o.exp++; o.mantissa -= Math.floor(o.mantissa / 4503599627370496) * 4503599627370496; }

  return (o);
};

//**********************************************************************************
//Logical Bitwise "and" float64 binary values.
//**********************************************************************************

Number.prototype.bitAnd = function (fl2)
{
  fl2.isNum(); var fl1 = new Number(this).bits(), fl2 = fl2.bits();

  var f = fl1.mantissa & fl2.mantissa; if (f < 0) { f += 0x100000000; }

  f += ((fl1.mantissa / 0x100000000) & (fl2.mantissa / 0x100000000)) * 0x100000000;

  fl1.mantissa = f; fl1.exp &= fl2.exp; fl1.sing &= fl2.sing; return (fl1);
};

//**********************************************************************************
//Logical Bitwise "or" float64 binary values.
//**********************************************************************************

Number.prototype.bitOr = function (fl2)
{
  fl2.isNum(); var fl1 = new Number(this).bits(), fl2 = fl2.bits();

  var f = fl1.mantissa | fl2.mantissa; if (f < 0) { f += 0x100000000; }

  f += ((fl1.mantissa / 0x100000000) | (fl2.mantissa / 0x100000000)) * 0x100000000;

  fl1.mantissa = f; fl1.exp |= fl2.exp; fl1.sing |= fl2.sing; return (fl1);
};

//**********************************************************************************
//Logical Bitwise "xor" float64 binary values.
//**********************************************************************************

Number.prototype.bitXor = function (fl2)
{
  fl2.isNum(); var fl1 = new Number(this).bits(), fl2 = fl2.bits();

  var f = fl1.mantissa ^ fl2.mantissa; if (f < 0) { f += 0x100000000; }

  f += ((fl1.mantissa / 0x100000000) ^ (fl2.mantissa / 0x100000000)) * 0x100000000;

  fl1.mantissa = f; fl1.exp ^= fl2.exp; fl1.sing ^= fl2.sing; return (fl1);
};

//**********************************************************************************
//Logical Bitwise "not" float64 binary values.
//**********************************************************************************

Number.prototype.bitNot = function ()
{
  var fl1 = new Number(this).bits();

  f = ~fl1.mantissa; if (f < 0) { f += 0x100000000; } f += ((~(fl1.mantissa / 0x100000000)) & 0xFFFFF) * 0x100000000;

  fl1.mantissa = f; fl1.exp = (~fl1.exp) & 0x7FF; fl1.sing = (fl1.sing === 0) & 1; return (fl1);
};

//**********************************************************************************
//Right shift float64 binary values.
//**********************************************************************************

Number.prototype.bitRsh = function (s1)
{
  s1.isNum(); var o = new Number(this), f = this.bits(), s1 = s1 % 64, s2 = 0; (s1 >= 32) && (s1 -= (s2 = s1 - 32));

  f = [(((f.sing << 31 | f.exp << 20)) | Math.floor(f.mantissa / 0x100000000)), f.mantissa & 0xFFFFFFFF];

  var r = s1 === 32 ? f[0] : (f[0] & ((1 << s1) - 1)); if (s1 === 32) { f[0] = 0; f[1] = 0; }

  r <<= 32 - s1; f[0] >>>= s1; f[1] = (r >>> s2) | (f[1] >>> s1);

  if (f[0] < 0) { f[0] += 0x100000000; } if (f[1] < 0) { f[1] += 0x100000000; }

  o.bm = true; o.sing = (f[0] >> 31) & 1; o.exp = (f[0] >> 20) & 0x7FF; o.mantissa = ((f[0] & 0xFFFFF) * 0x100000000) + f[1];

  return (o);
};

//**********************************************************************************
//Left shift float64 binary values.
//**********************************************************************************

Number.prototype.bitLsh = function (s1)
{
  s1.isNum(); var o = new Number(this), f = o.bits(), s1 = s1 % 64, s2 = 0; (s1 >= 32) && (s1 -= (s2 = s1 - 32));

  f = [(((f.sing << 31 | f.exp << 20)) | Math.floor(f.mantissa / 0x100000000)), f.mantissa & 0xFFFFFFFF];

  var r = f[1] & (-1 << (32 - s1)); if (s1 === 32) { f[1] = 0; f[0] = 0; }

  r >>>= (32 - s1); f[1] <<= s1; f[0] = (r << s2) | (f[0] << s1);

  if (f[0] < 0) { f[0] += 0x100000000; } if (f[1] < 0) { f[1] += 0x100000000; }

  o.bm = true; o.sing = (f[0] >> 31) & 1; o.exp = (f[0] >> 20) & 0x7FF; o.mantissa = ((f[0] & 0xFFFFF) * 0x100000000) + f[1];

  return (o);
};

//**********************************************************************************
//Convert number to an pattern. Default base is binary, but as an bit of extra fun any base is possible.
//**********************************************************************************

Number.prototype.toPattern = function (base)
{
  var pat = new Pattern(); base = base || 2; base.isNum();

  //Compute data.

  var d = (this * Math.pow(base, (Math.ceil(36.04365338911715 / Math.log(base)) - Math.floor(Math.log(this) / Math.log(base))))).toString(base, true);
  d = d.replace(".", "").split("e")[0];

  //Create the pattern.

  for (var i = 0; i < d.length; pat.pat[i] = parseInt(d.charAt(i++), base));

  //Return the pattern data.

  return (pat);
};

//**********************************************************************************
//Create the new toString function to give the full number format.
//**********************************************************************************

Number.prototype.toString = function (base, MostAcurate)
{
  for (var i = 0, parts = ""; i < this.length; parts += "X" + i + " = a:" + this.a[i] + ", b:" + this.b[i] + "\r\n", i++);

  //If base is an string then it is an operation.

  if (typeof base === 'string')
  {
    //Output and select operator.

    var out = this, op = Oporators.indexOf(base);

    //Check if operator is valid.

    if (op != undefined && op < 0) { throw (new Error("Operator is not supported.")); }

    //Adjust for absolute value.

    if (MostAcurate && out < 0) { out = -out; }

    //Not all operators are fractional some are integer operations.

    if (op > 11 && op < 26) { out = out & -1; }

    //Return output.

    return ((Oporators[op] !== "" ? Oporators[op] + " " : "") + out + "");
  }

  //Else Check if invalid base setting.

  base = (base & -1) || (this.bm ? 2 : 10); if (base < 2 || base > 36) { throw new RangeError("radix must be an integer at least 2 and no greater than 36"); }

  //The string representing the character output of the number value.

  var str = "";
  var c = 0, sec = 0, nexp = 0, rexp = 0, out = [0, 0, 0, 0];

  //If number is in bits mode.

  if (this.bm)
  {
    out = [((((this.sing & 1) << 31 | (this.exp & 0x7FF) << 20)) | ((this.mantissa / 0x100000000) & 0xFFFFF)), this.mantissa & 0xFFFFFFFF, 0, 0];
    if (out[0] < 0) { out[0] += 0x100000000; }; if (out[1] < 0) { out[1] += 0x100000000; }
  }

  //Else Decode the number into it's bits and float value.

  else
  {
    var fl = this.bits();

    if (fl.exp === 0 && fl.mantissa === 0) { return (parts + "0"); } else if (fl.exp >= 2047) { if (fl.mantissa > 0) { return ("NaN"); } else { return (fl.sing ? "-Infinity" : "Infinity"); } }

    //Load four 52bit mantissa values in appropriate number base rounding off at the last digit of accuracy.

    var val = [sec = Math.pow(base, rexp = (Math.floor(Math.log(Math.pow(2, 52)) / Math.log(base)) - 1)), 0, 0, 0];

    //Calculate the exponents distance from center.

    fl.exp -= 0x3FF;

    //Shortcut for computing number bases.

    if (base === 2 || base === 4 || base === 8 || base === 16 || base === 32) { var s = Math.log(base) / Math.log(2); nexp = (fl.exp / s) & -1; fl.exp %= s; MostAcurate = true; }

    //IF exponent is zero the first bit in the mantissa is the exponent position from center.

    if (fl.exp === -0x3FF) { fl.exp -= ((c = 52 - Math.floor(Math.log(fl.mantissa) / Math.log(2)))) - 1; fl.mantissa *= Math.pow(2, c); } else { fl.mantissa += Math.pow(2, 52); }

    //Add the number together in select number base.

    while (fl.mantissa > 0)
    {
      //If exponent is zero shift down the value as each bit value in mantissa bit's and add them.

      if (fl.exp === 0)
      {
        if ((fl.mantissa - 4503599627370496) >= 0)
        {
          fl.mantissa -= 4503599627370496;
          out[0] += val[0]; out[1] += val[1]; out[2] += val[2]; out[3] += val[3];
          out[2] += c = Math.floor(out[3] / sec); out[3] -= c * sec;
          out[1] += c = Math.floor(out[2] / sec); out[2] -= c * sec;
          out[0] += c = Math.floor(out[1] / sec); out[1] -= c * sec;
        }

        //Shift value down.

        fl.exp--; fl.mantissa *= 2;
      }

      //Do not let the whole values go outside of the accuracy range limit.

      else
      {
        if (val[0] < sec)
        {
          val[3] *= base; val[2] *= base; val[1] *= base; val[0] *= base;
          val[2] += c = Math.floor(val[3] / sec); val[3] -= c * sec;
          val[1] += c = Math.floor(val[2] / sec); val[2] -= c * sec;
          val[0] += c = Math.floor(val[1] / sec); val[1] -= c * sec;
          nexp--;
        }

        if (val[0] > sec)
        {
          c = val[0] - ((val[0] = Math.floor(val[0] / base)) * base);
          c = ((c * sec) + val[1]) - ((val[1] = Math.floor(((c * sec) + val[1]) / base)) * base);
          c = ((c * sec) + val[2]) - ((val[2] = Math.floor(((c * sec) + val[2]) / base)) * base);
          val[3] = Math.floor(((c * sec) + val[3]) / base);
          nexp++;
        }
      }

      //Adjust the base value by an binary exponent.

      if (fl.exp < 0)
      {
        c = val[0] - ((val[0] = Math.floor(val[0] / 2)) * 2);
        c = ((c * sec) + val[1]) - ((val[1] = Math.floor(((c * sec) + val[1]) / 2)) * 2);
        c = ((c * sec) + val[2]) - ((val[2] = Math.floor(((c * sec) + val[2]) / 2)) * 2);
        val[3] = Math.floor(((c * sec) + val[3]) / 2);
        fl.exp++;
      }
      else if (fl.exp > 0) {
        val[3] *= 2; val[2] *= 2; val[1] *= 2; val[0] *= 2;
        val[2] += c = Math.floor(val[3] / sec); val[3] -= c * sec;
        val[1] += c = Math.floor(val[2] / sec); val[2] -= c * sec;
        val[0] += c = Math.floor(val[1] / sec); val[1] -= c * sec;
        fl.exp--;
      }
    }

    //if Most accurate is not set round off the value.

    if (!MostAcurate)
    {
      out[1] = Math.round(out[1] / (sec / base)) * (sec / base);
      out[0] += c = Math.floor(out[1] / sec); out[1] -= c * sec;
      out[3] = 0; out[2] = 0;
    }

    //Else round off the last digit of accuracy.

    else
    {
      out[3] = Math.round(out[3] / (base * base * base)) * (base * base * base);
      out[2] += c = Math.floor(out[3] / sec); out[3] -= c * sec;
      out[1] += c = Math.floor(out[2] / sec); out[2] -= c * sec;
      out[0] += c = Math.floor(out[1] / sec); out[1] -= c * sec;
    }
  }

  //Divide the sections into parts of 2 for binary, or 10 as decimal, or as 16 as hexadecimal, or any range in between, or higher.

  if (!this.bm)
  {
    str = ["", "", "", ""];

    for (var DigitV = 0, i = 0, rd = false; Math.floor(sec) !== 0; i++)
    {
      //Divide.

      DigitV = (out[i] / sec) & -1; out[i] -= DigitV * sec;

      //Digit 0 through 9, and A to Z by unit size per column.

      DigitV = DigitV < 10 ? 0x30 + DigitV : 0x37 + DigitV;

      //Write char to string.

      str[i] += String.fromCharCode(DigitV);

      //Switch to next digit.

      if (i > 2 || !rd) { sec /= base; i = -1; rd = true; }
    }

    //combine the sections together.

    nexp -= (str[0].length - (str[0] = str[0].replace(/^0+/, "")).length);
    str = (str[0] + str[1] + str[2] + str[3]).replace(/0+$/, "");

    //Exponent if not in bit representation mode.

    if (Math.abs(nexp) > rexp)
    {
      str = str.charAt(0) + (str.length > 1 ? "." : "") + str.slice(1, str.length) + "e" + (nexp > 0 ? "+" : "-");
      nexp = Math.abs(nexp); out[1] = nexp;
    }
    else if (nexp < str.length && nexp >= 0)
    {
      str = str.slice(0, nexp + 1) + (nexp !== (str.length - 1) ? "." : "") + str.slice(nexp + 1, str.length); nexp = 0;
    }
    else
    {
      if(nexp > 0) { nexp -= str.length - 1; }
      
      while (nexp > 0) { str += "0"; nexp--; }
      
      if (nexp < 0) { nexp++; while (nexp < 0) { str = "0" + str; nexp++; } str = "." + str; }
    }

    if (str.charAt(0) === ".") { str = "0" + str; }

    str = (fl.sing ? "-" : "") + str;
  }

  //Decode the exponent to characters, or all 64 bit's of an float number if bit's mode.

  var end = nexp > 0 ? Math.ceil(Math.log(nexp) / Math.log(base)) : Math.ceil(44.3614195558365 / Math.log(base));

  //Divide the number into parts of 2 for binary, or 10 as decimal, or as 16 as hexadecimal, or any range in between, or higher.

  if (Math.max(out[0], out[1]) > 0 || this.bm)
  {
    var t = "";

    for (var i = 0, DigitV = 0; i < end; i++)
    {
      //Divide higher 32 bits, and floor off the number store floored value in Digit.

      DigitV = out[0] - ((out[0] = Math.floor(out[0] / base)) * base);

      //Divide lower 32 bit's including the floored off value in the higher 32 bit's.

      out[1] = ((DigitV * 0x100000000) + out[1]) / base;

      //Round off the remainder and store the digit value that is between the number base into Digit.

      DigitV = Math.round((out[1] - Math.floor(out[1])) * base); out[1] = Math.floor(out[1]);

      //Digit 0 through 9, and A to Z by unit size per column.

      DigitV = DigitV < 10 ? 0x30 + DigitV : 0x37 + DigitV;

      //Write char to string.

      t = String.fromCharCode(DigitV) + t;
    }

    str = str + t; t = null;
  }

  //Return the String representation of the float numbers value, or bit's.

  return (parts + str);
};

//**********************************************************************************
//Convert the float number to value when adding, or doing integer logic operations.
//**********************************************************************************

Number.prototype.primitive = Number.prototype.valueOf; Number.prototype.valueOf = function ()
{
  if (!this.bm) { return (this.primitive()); }

  //Remove overflow.

  this.sing = this.sing & 1; this.exp = this.exp & 0x7FF; if (this.mantissa < 0) { this.mantissa = (-this.mantissa) - 1; }
  if (this.mantissa > 4503599627370495) { this.mantissa -= Math.floor(this.mantissa / 4503599627370496) * 4503599627370496; }

  //Compute "0.Mantissa".

  var float = ((this.exp !== 0 ? Math.pow(2, 52) : 0) + this.mantissa) / Math.pow(2, 52);

  //Compute exponent value as positive value 1e?.

  var exp = Math.pow(2, Math.abs((this.exp !== 0 ? this.exp : this.exp + 1) - 0x3FF));

  //Adjust "0.Mantissa" to exponent. Multiply if positive 1e?, divide if negative 1e-?.

  if (this.exp > 0x3FF) { float = float * exp; } else { float = float / exp; }

  //Nan.

  if (!isFinite(float) && this.mantissa > 0) { float = NaN; }

  //return Float value with proper sing.

  return (this.sing >= 1 ? -float : float);
};

Number.prototype.reValue = function () { return ((isNaN(this.r[this.length]) ? this : this.r[this.length]).valueOf()); };

//**********************************************************************************
//Update the parse float function to be more accurate, and to support all number bases.
//**********************************************************************************

function parseFloat(str, base)
{
  //Check if invalid base setting.

  base = (base & -1) || 10; if (base < 2 || base > 36) { throw new RangeError("radix must be an integer at least 2 and no greater than 36"); }

  //The decoded value.

  var o = new Number(0), m = [0, 0]; o.bm = true; o.sing = 0; o.exp = 0; o.mantissa = 0;

  //Sing bit.

  if (str.charAt(0) === "-") { o.sing = 1; str = str.slice(1, str.length); }

  //Infinity.

  if (str === "Infinity") { o.exp = 2047; return (o.valueOf()); }

  //The string value and exponent that is in the numbers base format.

  var bexp = 0, t = str.split("e"); if (t[1]) { bexp = parseInt(t[1], base); str = t[0]; } t = str.split("."); bexp += t[0].length; str = str.replace(".", ""); t = null;

  //Each 52 bit section must be able to store at least one multiple more of the number base to allow carry.

  var sec = Math.pow(2, 52 - (Math.log(base) / Math.log(2)) & -1);

  //decode charterers.

  for (var i = 0, Digit = 0; i < str.length && m[0] < sec; i++)
  {
    Digit = str.charCodeAt(i); Digit = Digit < 0x40 ? Digit - 0x30 : Digit - 0x37;

    //Put digit into value.

    if (Digit < base && Digit >= 0) { m[1] = (m[1] * base) + Digit; m[0] *= base; m[0] += c = Math.floor(m[1] / sec); m[1] -= c * sec; bexp--; }

    //Else return "NaN" as it is not an number.

    else { return (NaN); }
  }

  //If value is 0.

  if (m[0] === 0 && m[1] === 0) { return (0); }

  //Calculate exponent.

  var x = (m[0] * sec) + m[1]; for (var i = 0; i > bexp; i--) { x /= base; } for (var i = 0; i < bexp; i++) { x *= base; }

  if (!isFinite(x)) { o.exp = 0x7FF; return (o.valueOf()); } if (x === 0) { return (0); }

  o.exp = 0x3FF + (Math.floor(Math.log(x) / Math.log(2))); x = null;

  //Each section is an max of 52 mantissa bits.

  for (var i = 0; i < bexp; i++)
  {
    //do not let the multiples of the number base go outside 52 bit accuracy limit, so divide by 2.

    while (m[0] > sec) { c = m[0] - ((m[0] = Math.floor(m[0] / 2)) * 2); m[1] = Math.floor(((c * sec) + m[1]) / 2); }

    //Multiply value by base.

    m[1] *= base; m[0] *= base; m[0] += c = Math.floor(m[1] / sec); m[1] -= c * sec;
  }

  for (var i = 0; i > bexp; i--)
  {
    //If number is below 52 bit range multiply by 2.

    while (m[0] < sec) { m[1] *= 2; m[0] *= 2; m[0] += c = Math.floor(m[1] / sec); m[1] -= c * sec; }

    //Divide by base.

    c = m[0] - ((m[0] = Math.floor(m[0] / base)) * base); m[1] = Math.floor(((c * sec) + m[1]) / base);
  }

  //Convert to 52 bit mantissa.

  while (m[0] < 4503599627370495) { m[1] *= 2; m[0] *= 2; m[0] += c = Math.floor(m[1] / sec); m[1] -= c * sec; } if ((m[1] * 2) > sec) { m[0] += 1; }
  if (o.exp > 0) { o.mantissa = m[0] - 4503599627370496; o.exp &= 0x7FF; } else { o.mantissa = Math.floor(m[0] / Math.pow(2, (-o.exp) + 1)); o.exp = 0; }

  //Return the decoded value.

  return (o.valueOf());
};

//**********************************************************************************
//Create the new parse to Number function.
//**********************************************************************************

var parseNumber = function (str, base)
{
  //Check if invalid base setting.

  var e = str.length; base = base || 2; base &= -1; base.isNum();

  if (base < 2 || base > 36) { throw new RangeError("radix must be an integer at least 2 and no greater than 36"); }

  //Contains the decoded bit's of the Float64 value.

  for (var i = 0, Digit = 0, f = [0, 0]; i < e; i++)
  {
    Digit = str.charCodeAt(i); Digit = Digit < 0x40 ? Digit - 0x30 : Digit - 0x37;

    //Check if number is valid.

    if (Digit < base && Digit >= 0) { f[1] = (f[1] * base) + Digit; f[0] = (f[0] * base) + (Digit = Math.floor(f[1] / 0x100000000)); f[1] -= Digit * 0x100000000; }

    //Else return undefined as it is not an number.

    else { return; }
  }

  //Put number together.

  var fl = new Number(0); fl.bm = true; fl.sing = (f[0] >> 31) & 1; fl.exp = (f[0] >> 20) & 0x7FF; fl.mantissa = ((f[0] & 0xFFFFF) * 0x100000000) + f[1]; return (fl);
};

//**********************************************************************************
//Allow Arrays to do float number operations on all numbers in array. Similar to vector.
//**********************************************************************************

for (var i = 0, a = ["divP", "reduce", "valueOf", "getFract", "avgFract", "bits", "bitAnd", "bitOr", "bitXor", "bitNot", "bitRsh", "bitLsh", "toPattern", "err"], c = ""; i < a.length; i++)
{
  c += "Array.prototype." + a[i] + " = function( a ) { for( var i1 = 0, i2 = 0, l = this.length, o = []; i1 < l; i1++ ) { ";
  c += "if( this[i1] ) { if( this[i1]." + a[i] + " ) { o[i2++] = this[i1]." + a[i] + "( a ); } else if( ( this[i1] + 0 )." + a[i] + " ) { o[i2++] = ( this[i1] + 0 )." + a[i] + "( a ); } }";
  c += " } return( o ); }\r\n";
}

eval(c); c = undefined; i = undefined; a = undefined;