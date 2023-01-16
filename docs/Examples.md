---
layout: default
image:
  path: https://repository-images.githubusercontent.com/81086272/73a9ee80-65f9-11ea-9cd9-3c14b7503cff
---

<html>
<body onload="setup(); updateT();">
  <style type="text/css">
    <!--
    input[type=button]
    {
      width: 100%;
      height: 48px;
      clear: both;
    }
    
    textarea.c
    {
      resize: none;
      width: 100%;
      max-height: 40%;
      float: left;
    }

    textarea.o 
    {
      resize: none;
      width: 100%;
      max-height: 20%;
      float: left;
    }

    .cmd:target
    {
      display: block;
      height: 4rem; margin-top: -4rem;
      visibility: hidden;
    }
    -->
  </style>
  <script src="../FL64.js" type="text/javascript"></script>
  <script type="text/javascript">
    var output = "";

    function setup() {
      var list = document.getElementsByTagName("code");

      var html = "", lines = 0, spaces = 0;

      for (var i1 = 0; i1 < list.length; i1++)
      {
        html = list[i1].innerHTML;

        var t = html.split("\n"); lines = t.length - 1; spaces = html.search(/\S|$/) - 1;

        for (var i2 = 0, html = ""; i2 < lines; i2++) { html += t[i2].slice(spaces, t[i2].length) + "\n"; }

        lines = list[i1].getAttribute("rows") || lines;

        list[i1].innerHTML = "<textarea class=\"c\" rows=\"" + lines + "\" id=\"e" + i1 + "\">" + html + "</textarea></textarea><textarea class=\"o\" rows=\"" + ( ( lines > 16 ) ? 16 : lines ) + "\" id=\"e" + i1 + "o\" readonly>Console output.</textarea><input type=\"button\" onclick=\"runExamp('e" + i1 + "');\" value=\"Run code.\" />";
      }
    }

    function runExamp(id)
    {
      var code = document.getElementById(id).value;

      try { eval(code); } catch (e) { console.log(e.toString()); }

      document.getElementById(id + "o").value = output; output = "";
    }

    console.log = function (msg) { output += msg + "\r\n"; }

    var base = 3, pos = 1;

    function updateT()
    {
      if (pos < 1) { pos = 1; }

      var d = Math.pow(base, Math.floor(Math.log(pos) / Math.log(base)) + 1) - 1;

      var n1 = [], n2 = [];

      for (var i = 0, n = pos; i < 12; i++, n++)
      {
        //D can not match pattern part.

        if (d == n) { d = ((d + 1) * base) - 1; n += 1; }

        n1[i] = n; n2[i] = d;
      }

      document.getElementById("t1").innerHTML = "<table border=\"1\" style=\"font-size: 0.6vw;\">\
        <tr>\
        <td rowspan=\"15\"><input type=\"button\" style=\"height:256px;" + ((base === 2) ? "display:none;" : "") + "\" value=\"&#8592;\" onclick=\"base--;updateT();\" /></td>\
        <td colspan=\"5\"><input type=\"button\" style=\"width:100%;" + ((pos === 1) ? "display:none;" : "") + "\" value=\"&#8593;\" onclick=\"pos-=11;updateT();\" /></td>\
        <td rowspan=\"15\"><input type=\"button\" style=\"height:256px;" + ((base === 36) ? "display: none; " : "") + "\" value=\"&#8594;\" onclick=\"base++;updateT();\" /></td>\
        </tr>\
        <tr><td>Decimal Fraction.</td><td>Decimal Value.</td><td>Base " + base + " Fraction.</td><td>Base " + base + " Value.</td><td>Pattern.</td></tr>\
        <tr><td>" + n1[0] + "&divide;" + n2[0] + "</td><td>" + (n1[0] / n2[0]) + "</td><td>" + n1[0].toString(base) + "&divide;" + n2[0].toString(base) + "</td><td>" + (n1[0] / n2[0]).toString(base) + "</td><td>" + new Fract(n1[0], n2[0]).divP(base) + "</td></tr>\
        <tr><td>" + n1[1] + "&divide;" + n2[1] + "</td><td>" + (n1[1] / n2[1]) + "</td><td>" + n1[1].toString(base) + "&divide;" + n2[1].toString(base) + "</td><td>" + (n1[1] / n2[1]).toString(base) + "</td><td>" + new Fract(n1[1], n2[1]).divP(base) + "</td></tr>\
        <tr><td>" + n1[2] + "&divide;" + n2[2] + "</td><td>" + (n1[2] / n2[2]) + "</td><td>" + n1[2].toString(base) + "&divide;" + n2[2].toString(base) + "</td><td>" + (n1[2] / n2[2]).toString(base) + "</td><td>" + new Fract(n1[2], n2[2]).divP(base) + "</td></tr>\
        <tr><td>" + n1[3] + "&divide;" + n2[3] + "</td><td>" + (n1[3] / n2[3]) + "</td><td>" + n1[3].toString(base) + "&divide;" + n2[3].toString(base) + "</td><td>" + (n1[3] / n2[3]).toString(base) + "</td><td>" + new Fract(n1[3], n2[3]).divP(base) + "</td></tr>\
        <tr><td>" + n1[4] + "&divide;" + n2[4] + "</td><td>" + (n1[4] / n2[4]) + "</td><td>" + n1[4].toString(base) + "&divide;" + n2[4].toString(base) + "</td><td>" + (n1[4] / n2[4]).toString(base) + "</td><td>" + new Fract(n1[4], n2[4]).divP(base) + "</td></tr>\
        <tr><td>" + n1[5] + "&divide;" + n2[5] + "</td><td>" + (n1[5] / n2[5]) + "</td><td>" + n1[5].toString(base) + "&divide;" + n2[5].toString(base) + "</td><td>" + (n1[5] / n2[5]).toString(base) + "</td><td>" + new Fract(n1[5], n2[5]).divP(base) + "</td></tr>\
        <tr><td>" + n1[6] + "&divide;" + n2[6] + "</td><td>" + (n1[6] / n2[6]) + "</td><td>" + n1[6].toString(base) + "&divide;" + n2[6].toString(base) + "</td><td>" + (n1[6] / n2[6]).toString(base) + "</td><td>" + new Fract(n1[6], n2[6]).divP(base) + "</td></tr>\
        <tr><td>" + n1[7] + "&divide;" + n2[7] + "</td><td>" + (n1[7] / n2[7]) + "</td><td>" + n1[7].toString(base) + "&divide;" + n2[7].toString(base) + "</td><td>" + (n1[7] / n2[7]).toString(base) + "</td><td>" + new Fract(n1[7], n2[7]).divP(base) + "</td></tr>\
        <tr><td>" + n1[8] + "&divide;" + n2[8] + "</td><td>" + (n1[8] / n2[8]) + "</td><td>" + n1[8].toString(base) + "&divide;" + n2[8].toString(base) + "</td><td>" + (n1[8] / n2[8]).toString(base) + "</td><td>" + new Fract(n1[8], n2[8]).divP(base) + "</td></tr>\
        <tr><td>" + n1[9] + "&divide;" + n2[9] + "</td><td>" + (n1[9] / n2[9]) + "</td><td>" + n1[9].toString(base) + "&divide;" + n2[9].toString(base) + "</td><td>" + (n1[9] / n2[9]).toString(base) + "</td><td>" + new Fract(n1[9], n2[9]).divP(base) + "</td></tr>\
        <tr><td>" + n1[10] + "&divide;" + n2[10] + "</td><td>" + (n1[10] / n2[10]) + "</td><td>" + n1[10].toString(base) + "&divide;" + n2[10].toString(base) + "</td><td>" + (n1[10] / n2[10]).toString(base) + "</td><td>" + new Fract(n1[10], n2[10]).divP(base) + "</td></tr>\
        <tr><td>" + n1[11] + "&divide;" + n2[11] + "</td><td>" + (n1[11] / n2[11]) + "</td><td>" + n1[11].toString(base) + "&divide;" + n2[11].toString(base) + "</td><td>" + (n1[11] / n2[11]).toString(base) + "</td><td>" + new Fract(n1[11], n2[11]).divP(base) + "</td></tr>\
        <tr>\
          <td colspan=\"5\"><input type=\"button\" style=\"width:100%;\" value=\"&#8595;\" onclick=\"pos+=11;updateT();\" /></td>\
        </tr>\
      </table>";
    }
  </script>

  <h1>Indexed contents.</h1>

<table border="1">
    <tr><td>Number in Parts: <a href="#parts">Link</a></td><td rowspan="4">Basic functions.</td></tr>
    <tr><td>Adding parts back together: <a href="#calc">Link</a></td></tr>
    <tr><td>Manipulating parts: <a href="#mparts">Link</a></td></tr>
    <tr><td>Creating a number in Parts: <a href="#cparts">Link</a></td></tr>
    <tr><td>Irrational numbers: <a href="#irrational">Link</a></td><td rowspan="3">Analyzing Numbers, and how it works.</td></tr>
    <tr><td>The secret structure to all numbers (No such thing as random numbers): <a href="#s">Link</a></td></tr>
    <tr><td>Periodic Recurring/number patterns: <a href="#dpat">Link</a></td></tr>
    <tr><td>Fraction Data type: <a href="#fract">Link</a></td><td rowspan="2">Error correction.</td></tr>
    <tr><td>Error Correction: <a href="#er">Link</a></td></tr>
    <tr><td>Binary translation operations: <a href="#bits">Link</a></td><td rowspan="3">Binary, and bitwise operations.</td></tr>
    <tr><td>Direct Binary bitwise operations: <a href="#bwise">Link</a></td></tr>
    <tr><td>Vector and Array operation: <a href="#v">Link</a></td></tr>
  </table>

  <br /><br />

  <a id="parts" class="cmd"></a><h1>Number in Parts.</h1>

  1. Numbers can be split into parts.<br />
  2. Numbers have a length, for numbers of parts split into.
  
  <br /><br />

  <strong>Using the split method.</strong>

  <br /><br />

  <code>
    var pi = 3.1415;

    pi = pi.split();

    console.log(pi);

    pi = pi.split();

    console.log(pi);
  </code>

  <br /><br />

  As you can see the more we split the value. The closer we get to 0. You can also view each part by calling the <strong>toString</strong> method.

  <br /><br />

  <code>
    var pi = 3.1415;

    pi = pi.split();

    console.log(pi.toString());

    pi = pi.split();

    console.log(pi.toString());
  </code>

  <br /><br />

  Each "a" is a part taken out of the number.<br />
  Each "b" is the scale used.

  <br /><br />

  Generally all b=1 is as high as it goes going to the next part in the number.

  <br /><br />

  If b is set 2, or -2. Then we are going half to the next value. Does not matter which direction -/+.

  <br /><br />

  If b is 3 then it is a third in scale to the next part across the number, and so on.

  <br /><br />

  The method <strong>reValue</strong> displays the next part after each split.

  <br /><br />

  <code>
    var pi = 3.1415;

    console.log(pi.reValue());

    pi = pi.split();

    console.log(pi.reValue());

    pi = pi.split();

    console.log(pi.toString());
  </code>

  <br /><br />

  Each <strong>reValue</strong> is what each next "a" part is at maximum value that can be taken out of the number in the next split.

  <br /><br />

  You can change the A, and B part to what ever you like per split.

  <br /><br />

  Also the larger you set "b", then the bigger "a" becomes in the next part, because of the scale size.

  <br /><br />

  <code>
    var pi = 3.1415;

    pi = pi.split(7,9);

    pi = pi.split(3,5);

    console.log(pi.toString());
  </code>

  <br /><br />

  In this example we split by different values per part. In the next example we will continue to split till value is 0.

  <br /><br />

  <code>
    var pi = 3.1415;

    pi = pi.split(7,9);

    pi = pi.split(3,5);

    while( pi > 0 ) { pi = pi.split(); }

    console.log(pi.toString());
  </code>

  <br /><br />

  Instead of using <strong>split</strong> in a loop till 0 when you want to <strong>split</strong> a number into all remaining parts. You are best off using the method <strong>splitAll</strong>.

  <br /><br />

  <code>
    var pi = 3.1415;

    pi = pi.split(7,9);

    pi = pi.split(3,5);

    pi = pi.splitAll();

    console.log(pi.toString());
  </code>

  <br /><br />

  <a id="calc" class="cmd"></a><h1>Adding parts back together.</h1>

  <code>
    var pi = 3.1415;

    pi = pi.splitAll();

    var fract = pi.calcF();

    var Number = pi.calc();

    console.log(pi.toString());

    console.log(fract.toString());

    console.log(Number.toString());
  </code>

  <br /><br />

  Methods <strong>calcF</strong>, and <strong>calc</strong> add the parts together.

  <br /><br />

  <strong>calcF</strong> adds start to End parts to a fraction.

  <br /><br />

  <strong>calcF</strong>, and <strong>calc</strong> can also add from start to end parts.

  <br /><br />

  In the next example we will start at part 2, and add up parts till part 5.

  <br /><br />

  <code>
    var pi = 3.1415;

    pi = pi.splitAll();

    var fract = pi.calcF(2, 5);

    var Number = pi.calc(2, 5);

    console.log(pi.toString());

    console.log(fract.toString());

    console.log(Number.toString());
  </code>

  <br /><br />

  You can also use the length to stop at one part less before the end. This is useful for rounding off the part at the end of a number such as filtering out error.

  <br /><br />

  <code>
    var pi = 3.1415;

    pi = pi.splitAll();

    var fract = pi.calcF(0, pi.length - 2);

    var Number = pi.calc(0, pi.length - 2);

    console.log(pi.toString());

    console.log(fract.toString());

    console.log(Number.toString());
  </code>

  <br /><br />

  Each time you split a number the length gets bigger by one. The length is the number of parts a number has been split into. When adding parts together the last part is -1 of length. In the above example we subtract the length by 2 which is one part less before the end of the number. When we add the parts into a fraction or number we are adding one part less before the end.

  <br /><br />

  <a id="mparts" class="cmd"></a><h1>Manipulating parts</h1>

  The parts a number is split into can also be manipulated.

  <br /><br />

  <code rows="21">
    var pi = 3.1415;

    pi = pi.splitAll();

    console.log(pi.toString());

    pi = pi.remove(4);
    pi = pi.splitAll();

    console.log(pi.toString());
  </code>

  <br /><br />

  In this example part 4 is removed.

  <br /><br />

  Which is a=8, b=1.

  <br /><br />

  As you can see part 4 is gone when we display the set after the remove operation.

  <br /><br />

  Pay attention to where the end with 0 remaining value is. To see the separation between before, and after.

  <br /><br />

  Because we changed the parts the value is no longer 0, so method <strong>splitAll</strong> is used to split to all remaining parts before displaying the result again.

  <br /><br />

  <code rows="23">
    var pi = 3.1415;

    pi = pi.splitAll();

    console.log(pi.toString());

    pi = pi.setA(4, 3);
    pi = pi.setB(4, 4);

    pi = pi.splitAll();

    console.log(pi.toString());
  </code>

  <br /><br />

  Instead of removing the 4th part we modify the 4th part to be a=3, b=4.

  <br /><br />

  Methods <strong>setA</strong>, and <strong>setB</strong> Use the first value for which part then the second value for which number you wish to set it to.

  <br /><br />

  <h2>Transforming parts.</h2>

  Lets say you want to modify a whole bunch of parts at one time.

  <br /><br />

  <code rows="40">
    var val = 1.3922111911773327;

    function A(x)
    {
      return(x);
    }

    function B(x)
    {
      return(x);
    }

    val = val.splitAll();

    console.log(val.toString());

    val = val.Trans(0,A,B);

    console.log(val.toString());
  </code>

  <br /><br />

  This is one of the most useful operations you will be using.

  <br /><br />

  The first set of parts are the arraignment of parts that are at max value per part using method <strong>splitAll</strong>.

  <br /><br />

  The second set is the output from the transform method. The transform method terminates if a value is out of range -/+, or if you hit 0.

  <br /><br />

  The transform method needs two functions as inputs. Both functions take a single input which is part number.

  <br /><br />

  The input to the functions A, and B is 1,2,3,4,5,6 by part number.

  <br /><br />

  It is up to you what you want to return as a value from the two functions. In the example I return the value <strong>x</strong> which goes 1,2,3,4,5,6 and so on by part number.

  <br /><br />

  Each 1,2,3,4,5,6 can even be used as a array index if you wish to transform by specific values, or you can calculate each value per value.

  <br /><br />

  <strong>Some modifications you can make to see what happens is changing "val = val.Trans(0,A,B);" to "val = val.Trans(1,A,B);".</strong>

  <br /><br />

  This changes the start position in the parts you wish to transform. Also take note that the transform method will terminate sooner, because the parts will most likely be out of range -/+.

  <br /><br />

  You can change the starting position to what ever you like to see the effect for your self. Set it 3, or even 5.

  <br /><br />

  <a id="cparts" class="cmd"></a><h1>Creating A number in parts.</h1>

  In order to create a number you start with a value that is <strong>NaN</strong>. Which stands for <strong>Not a Number</strong>.

  <br /><br />

  You then can do all manipulation operations, or <strong>split</strong> by "a", and "b".

  <br /><br />

  In order to get a fraction, or number back you add the parts back together using methods <strong>calc</strong>, or <strong>calcF</strong>

  <br /><br />

  <code>
    var val = NaN;

    val = val.split(1,1);
    val = val.split(2,1);
    val = val.split(2,1);
    val = val.split(2,1);
    val = val.split(2,1);
    val = val.split(2,1);
    val = val.split(2,1);
    val = val.split(2,1);
    val = val.split(2,1);
    val = val.split(2,1);

    val = val.calc();

    console.log(val.toString());
  </code>

  <br /><br />

  We can create the square root of 2 using this split sequence.

  <br /><br />

  You can split into any number you like per part.

  <br /><br />

  Now lets say you wish to continue this splitting sequence to the end. Instead of doing a bunch of split operations. You are best to use the transform operation.

  <br /><br />

  <code>
    var val = NaN;

    function A(x)
    {
      return(2);
    }

    function B(x)
    {
      return(1);
    }

    val = val.split(1,1);
    val = val.Trans(1,A,B);

    val = val.calc();

    console.log(val.toString());
  </code>

  <br /><br />

  In this example we split the first part as a=1, b=1.

  <br /><br />

  Then we transform the rest of the parts as a=2, b=1 using function A and B.

  <br /><br />

  Then we add it together with the <strong>calc</strong> Method.

  <br /><br />

  This makes the square root of 2.

  <br /><br />

  You can change this, however you like. You can create any number you like using this.

  <br /><br />

  <a id="irrational" class="cmd"></a><h1>Irrational Numbers.</h1>

  An irrational number is a value that can never be solved to it's exact value.

  <br /><br />

  An irrational number is a number like this: 1.101001000100001.

  <br /><br />

  Which we can clearly see what the pattern is. As it is 1 followed by one more zero per place value.

  <br /><br />

  Because of this pattern. We can make the number bigger forever without any repeating digits.

  <br /><br />

  <code>
    var val = NaN;

    function A(x)
    {
      return( Math.pow( 10, x + 1 ) + 1 );
    }

    function B(x)
    {
      return( -Math.pow( 10, x + 1 ) );
    }

    val = val.split(1,1);
    val = val.split(10,-10);

    val = val.Trans(2, A, B);

    val = val.calc(0,9);

    console.log(val);
  </code>

  <br /><br />

  In the above code we calculate the number by adding parts together. In which each A to B is as follows.

  <br /><br />

  <table border="1">
    <tr><td colspan="2">Pattern.</td></tr>
    <tr><td>A</td><td>B</td></tr>
    <tr><td>1</td><td>1</td></tr>
    <tr><td>10</td><td>-10</td></tr>
    <tr><td>101</td><td>-100</td></tr>
    <tr><td>1001</td><td>-1000</td></tr>
    <tr><td>10001</td><td>-10000</td></tr>
    <tr><td>100001</td><td>-100000</td></tr>
    <tr><td>1000001</td><td>-1000000</td></tr>
    <tr><td>10000001</td><td>-10000000</td></tr>
    <tr><td>100000001</td><td>-100000000</td></tr>
  </table>

  <br /><br />

  Each A part is 10 times bigger plus 1, and each B part 10 times bigger, for scale.

  <br /><br />

  You can split irrational numbers into smaller parts. You can also add together irrational numbers using per smaller parts.

  <br /><br />

  However, the digits in the number will never repeat. For, example PI to a billion digits: <a href="https://stuff.mit.edu/afs/sipb/contrib/pi/pi-billion.txt" target="_blank">Link</a>.

  <br /><br />

  Irrational numbers can also be created when you measure something that gets a tiny bit bigger in ratio to another distance.

  <br /><br />

  The most basic example is a circle. The circles outside distance gets slightly bigger than the distance across per bigger circle.

  <br /><br />

  This means you are going to get a different number each time you make the circle bigger. The pattern continues farther down the decimal place per bigger circle. AS the two lengths change in ratio as you go bigger down the decimal place.

  <br /><br />

  <code>
    var val = NaN;

    function A(x)
    {
      return( 6 );
    }

    function B(x)
    {
      return( 1 + (x * 4) + (x * x * 4) );
    }

    val = val.split(3,1);
    val = val.Trans(1,A,B);

    val = val.calc();

    console.log(val.toString());
  </code>

  <br /><br />

  The above example calculates the number PI per additional part.

  <br /><br />

  This is much different than the physical measurement. As we add per part together to create the number.

  <br /><br />

  <h2>The golden ratio.</h2>

  The golden ratio is a very fascinating irrational number as each part is as small as it possibly can be per part.

  <br /><br />

  All parts are exactly a=1, b=1. It is considered the most irrational number because of this.

  <br /><br />

  <code>
    var val = NaN;

    function A(x)
    {
      return(1);
    }

    function B(x)
    {
      return(1);
    }

    val = val.Trans(0,A,B);

    val = val.calc();

    console.log(val.toString());
  </code>

  <br /><br />

  <a id="square" class="cmd"></a><h2>Square roots.</h2>

  Every square root is related to the golden ratio. Here is a table of every square root.

  <br /><br />

  <div style="width:100%;overflow:auto;">
    <table border="1">
      <tr><td colspan="2">&radic;1</td><td>_</td><td colspan="2">&radic;2</td><td>_</td><td colspan="2">&radic;3</td><td>_</td><td colspan="2">&radic;4</td><td>_</td><td colspan="2">&radic;5</td><td>_</td><td colspan="2">&radic;6</td><td>_</td><td colspan="2">&radic;7</td><td>_</td><td colspan="2">&radic;8</td><td>_</td><td colspan="2">&radic;9</td><td>_</td><td colspan="2">&radic;10</td><td>_</td><td colspan="2">&radic;11</td><td>_</td><td colspan="2">&radic;12</td><td>_</td><td colspan="2">&radic;13</td><td>_</td><td colspan="2">&radic;14</td><td>_</td><td colspan="2">&radic;15</td><td>_</td><td colspan="2">&radic;16</td><td>_</td><td colspan="2">&radic;17</td><td>_</td><td colspan="2">&radic;18</td><td>_</td><td colspan="2">&radic;19</td><td>_</td><td colspan="2">&radic;20</td><td>_</td><td colspan="2">&radic;21</td><td>_</td><td colspan="2">&radic;22</td><td>_</td><td colspan="2">&radic;23</td><td>_</td><td colspan="2">&radic;24</td></tr>
      <tr><td>A</td><td>B</td><td>_</td><td>A</td><td>B</td><td>_</td><td>A</td><td>B</td><td>_</td><td>A</td><td>B</td><td>_</td><td>A</td><td>B</td><td>_</td><td>A</td><td>B</td><td>_</td><td>A</td><td>B</td><td>_</td><td>A</td><td>B</td><td>_</td><td>A</td><td>B</td><td>_</td><td>A</td><td>B</td><td>_</td><td>A</td><td>B</td><td>_</td><td>A</td><td>B</td><td>_</td><td>A</td><td>B</td><td>_</td><td>A</td><td>B</td><td>_</td><td>A</td><td>B</td><td>_</td><td>A</td><td>B</td><td>_</td><td>A</td><td>B</td><td>_</td><td>A</td><td>B</td><td>_</td><td>A</td><td>B</td><td>_</td><td>A</td><td>B</td><td>_</td><td>A</td><td>B</td><td>_</td><td>A</td><td>B</td><td>_</td><td>A</td><td>B</td><td>_</td><td>A</td><td>B</td></tr>
      <tr><td>1</td><td>0</td><td>_</td><td>1</td><td>1</td><td>_</td><td>1</td><td>2</td><td>_</td><td>2</td><td>0</td><td>_</td><td>2</td><td>1</td><td>_</td><td>2</td><td>2</td><td>_</td><td>2</td><td>3</td><td>_</td><td>2</td><td>4</td><td>_</td><td>3</td><td>0</td><td>_</td><td>3</td><td>1</td><td>_</td><td>3</td><td>2</td><td>_</td><td>3</td><td>3</td><td>_</td><td>3</td><td>4</td><td>_</td><td>3</td><td>5</td><td>_</td><td>3</td><td>6</td><td>_</td><td>4</td><td>0</td><td>_</td><td>4</td><td>1</td><td>_</td><td>4</td><td>2</td><td>_</td><td>4</td><td>3</td><td>_</td><td>4</td><td>4</td><td>_</td><td>4</td><td>5</td><td>_</td><td>4</td><td>6</td><td>_</td><td>4</td><td>7</td><td>_</td><td>4</td><td>8</td></tr>
      <tr><td>0</td><td>0</td><td>_</td><td>2</td><td>1</td><td>_</td><td>2</td><td>2</td><td>_</td><td>0</td><td>0</td><td>_</td><td>4</td><td>1</td><td>_</td><td>4</td><td>2</td><td>_</td><td>4</td><td>3</td><td>_</td><td>4</td><td>4</td><td>_</td><td>0</td><td>0</td><td>_</td><td>6</td><td>1</td><td>_</td><td>6</td><td>2</td><td>_</td><td>6</td><td>3</td><td>_</td><td>6</td><td>4</td><td>_</td><td>6</td><td>5</td><td>_</td><td>6</td><td>6</td><td>_</td><td>0</td><td>0</td><td>_</td><td>8</td><td>1</td><td>_</td><td>8</td><td>2</td><td>_</td><td>8</td><td>3</td><td>_</td><td>8</td><td>4</td><td>_</td><td>8</td><td>5</td><td>_</td><td>8</td><td>6</td><td>_</td><td>8</td><td>7</td><td>_</td><td>8</td><td>8</td></tr>
      <tr><td>0</td><td>0</td><td>_</td><td>2</td><td>1</td><td>_</td><td>2</td><td>2</td><td>_</td><td>0</td><td>0</td><td>_</td><td>4</td><td>1</td><td>_</td><td>4</td><td>2</td><td>_</td><td>4</td><td>3</td><td>_</td><td>4</td><td>4</td><td>_</td><td>0</td><td>0</td><td>_</td><td>6</td><td>1</td><td>_</td><td>6</td><td>2</td><td>_</td><td>6</td><td>3</td><td>_</td><td>6</td><td>4</td><td>_</td><td>6</td><td>5</td><td>_</td><td>6</td><td>6</td><td>_</td><td>0</td><td>0</td><td>_</td><td>8</td><td>1</td><td>_</td><td>8</td><td>2</td><td>_</td><td>8</td><td>3</td><td>_</td><td>8</td><td>4</td><td>_</td><td>8</td><td>5</td><td>_</td><td>8</td><td>6</td><td>_</td><td>8</td><td>7</td><td>_</td><td>8</td><td>8</td></tr>
      <tr><td>0</td><td>0</td><td>_</td><td>2</td><td>1</td><td>_</td><td>2</td><td>2</td><td>_</td><td>0</td><td>0</td><td>_</td><td>4</td><td>1</td><td>_</td><td>4</td><td>2</td><td>_</td><td>4</td><td>3</td><td>_</td><td>4</td><td>4</td><td>_</td><td>0</td><td>0</td><td>_</td><td>6</td><td>1</td><td>_</td><td>6</td><td>2</td><td>_</td><td>6</td><td>3</td><td>_</td><td>6</td><td>4</td><td>_</td><td>6</td><td>5</td><td>_</td><td>6</td><td>6</td><td>_</td><td>0</td><td>0</td><td>_</td><td>8</td><td>1</td><td>_</td><td>8</td><td>2</td><td>_</td><td>8</td><td>3</td><td>_</td><td>8</td><td>4</td><td>_</td><td>8</td><td>5</td><td>_</td><td>8</td><td>6</td><td>_</td><td>8</td><td>7</td><td>_</td><td>8</td><td>8</td></tr>
      <tr><td>0</td><td>0</td><td>_</td><td>2</td><td>1</td><td>_</td><td>2</td><td>2</td><td>_</td><td>0</td><td>0</td><td>_</td><td>4</td><td>1</td><td>_</td><td>4</td><td>2</td><td>_</td><td>4</td><td>3</td><td>_</td><td>4</td><td>4</td><td>_</td><td>0</td><td>0</td><td>_</td><td>6</td><td>1</td><td>_</td><td>6</td><td>2</td><td>_</td><td>6</td><td>3</td><td>_</td><td>6</td><td>4</td><td>_</td><td>6</td><td>5</td><td>_</td><td>6</td><td>6</td><td>_</td><td>0</td><td>0</td><td>_</td><td>8</td><td>1</td><td>_</td><td>8</td><td>2</td><td>_</td><td>8</td><td>3</td><td>_</td><td>8</td><td>4</td><td>_</td><td>8</td><td>5</td><td>_</td><td>8</td><td>6</td><td>_</td><td>8</td><td>7</td><td>_</td><td>8</td><td>8</td></tr>
      <tr><td>0</td><td>0</td><td>_</td><td>2</td><td>1</td><td>_</td><td>2</td><td>2</td><td>_</td><td>0</td><td>0</td><td>_</td><td>4</td><td>1</td><td>_</td><td>4</td><td>2</td><td>_</td><td>4</td><td>3</td><td>_</td><td>4</td><td>4</td><td>_</td><td>0</td><td>0</td><td>_</td><td>6</td><td>1</td><td>_</td><td>6</td><td>2</td><td>_</td><td>6</td><td>3</td><td>_</td><td>6</td><td>4</td><td>_</td><td>6</td><td>5</td><td>_</td><td>6</td><td>6</td><td>_</td><td>0</td><td>0</td><td>_</td><td>8</td><td>1</td><td>_</td><td>8</td><td>2</td><td>_</td><td>8</td><td>3</td><td>_</td><td>8</td><td>4</td><td>_</td><td>8</td><td>5</td><td>_</td><td>8</td><td>6</td><td>_</td><td>8</td><td>7</td><td>_</td><td>8</td><td>8</td></tr>
      <tr><td>0</td><td>0</td><td>_</td><td>2</td><td>1</td><td>_</td><td>2</td><td>2</td><td>_</td><td>0</td><td>0</td><td>_</td><td>4</td><td>1</td><td>_</td><td>4</td><td>2</td><td>_</td><td>4</td><td>3</td><td>_</td><td>4</td><td>4</td><td>_</td><td>0</td><td>0</td><td>_</td><td>6</td><td>1</td><td>_</td><td>6</td><td>2</td><td>_</td><td>6</td><td>3</td><td>_</td><td>6</td><td>4</td><td>_</td><td>6</td><td>5</td><td>_</td><td>6</td><td>6</td><td>_</td><td>0</td><td>0</td><td>_</td><td>8</td><td>1</td><td>_</td><td>8</td><td>2</td><td>_</td><td>8</td><td>3</td><td>_</td><td>8</td><td>4</td><td>_</td><td>8</td><td>5</td><td>_</td><td>8</td><td>6</td><td>_</td><td>8</td><td>7</td><td>_</td><td>8</td><td>8</td></tr>
      <tr><td>0</td><td>0</td><td>_</td><td>2</td><td>1</td><td>_</td><td>2</td><td>2</td><td>_</td><td>0</td><td>0</td><td>_</td><td>4</td><td>1</td><td>_</td><td>4</td><td>2</td><td>_</td><td>4</td><td>3</td><td>_</td><td>4</td><td>4</td><td>_</td><td>0</td><td>0</td><td>_</td><td>6</td><td>1</td><td>_</td><td>6</td><td>2</td><td>_</td><td>6</td><td>3</td><td>_</td><td>6</td><td>4</td><td>_</td><td>6</td><td>5</td><td>_</td><td>6</td><td>6</td><td>_</td><td>0</td><td>0</td><td>_</td><td>8</td><td>1</td><td>_</td><td>8</td><td>2</td><td>_</td><td>8</td><td>3</td><td>_</td><td>8</td><td>4</td><td>_</td><td>8</td><td>5</td><td>_</td><td>8</td><td>6</td><td>_</td><td>8</td><td>7</td><td>_</td><td>8</td><td>8</td></tr>
      <tr><td>0</td><td>0</td><td>_</td><td>2</td><td>1</td><td>_</td><td>2</td><td>2</td><td>_</td><td>0</td><td>0</td><td>_</td><td>4</td><td>1</td><td>_</td><td>4</td><td>2</td><td>_</td><td>4</td><td>3</td><td>_</td><td>4</td><td>4</td><td>_</td><td>0</td><td>0</td><td>_</td><td>6</td><td>1</td><td>_</td><td>6</td><td>2</td><td>_</td><td>6</td><td>3</td><td>_</td><td>6</td><td>4</td><td>_</td><td>6</td><td>5</td><td>_</td><td>6</td><td>6</td><td>_</td><td>0</td><td>0</td><td>_</td><td>8</td><td>1</td><td>_</td><td>8</td><td>2</td><td>_</td><td>8</td><td>3</td><td>_</td><td>8</td><td>4</td><td>_</td><td>8</td><td>5</td><td>_</td><td>8</td><td>6</td><td>_</td><td>8</td><td>7</td><td>_</td><td>8</td><td>8</td></tr>
      <tr><td>0</td><td>0</td><td>_</td><td>2</td><td>1</td><td>_</td><td>2</td><td>2</td><td>_</td><td>0</td><td>0</td><td>_</td><td>4</td><td>1</td><td>_</td><td>4</td><td>2</td><td>_</td><td>4</td><td>3</td><td>_</td><td>4</td><td>4</td><td>_</td><td>0</td><td>0</td><td>_</td><td>6</td><td>1</td><td>_</td><td>6</td><td>2</td><td>_</td><td>6</td><td>3</td><td>_</td><td>6</td><td>4</td><td>_</td><td>6</td><td>5</td><td>_</td><td>6</td><td>6</td><td>_</td><td>0</td><td>0</td><td>_</td><td>7</td><td>1</td><td>_</td><td>8</td><td>2</td><td>_</td><td>8</td><td>3</td><td>_</td><td>8</td><td>4</td><td>_</td><td>8</td><td>5</td><td>_</td><td>8</td><td>6</td><td>_</td><td>8</td><td>7</td><td>_</td><td>8</td><td>8</td></tr>
    </table>
  </div>

  <br /><br />

  <code>
    var val = NaN;

    function A(x)
    {
      return(8);
    }

    function B(x)
    {
      return(7);
    }

    val = val.split(4,7);
    val = val.Trans(1,A,B);

    val = val.calc();

    console.log(val.toString());
  </code>

  <br /><br />

  In this example we calculate the square root of 23.
  
  <br /><br />
  
  You can also use square root to calculate a number in which All A and B parts are the same using:

  <br /><br />
  
  <strong>(A&div;2) + &radic;(A<sup>2</sup>&div;4+B)</strong>

  <br /><br />
  
  Replace A and B with what you want each part to be.
  
  <br /><br />

  We then can calculate the golden ratio as (1&div;2) + &radic;(1<sup>2</sup>&div;4+1).
  
  <br /><br />
  
  We go 1<sup>2</sup>&div;4 = 0.25 then add the + 1 = 1.25 is the square root, and 1&div;2 is 0.5 which is added to the square root.
  
  <br /><br />
 
  Which makes the square root of <strong>0.5+&radic;1.25=1.618033988749895</strong>.
  
  <br /><br />
  
  The example code below uses what you set A and B then uses the calculation to generate the value. The calculated value is then split apart by what you set, A and B equally till 0 remainder. Which proves the calculation.
  
  <br /><br />
  
  <code>
    var a = 71, b = -11;

    var v = a/2 + Math.sqrt(a*a/4 + b);

    console.log( "Calculated value = " + v + "" );

    while( v != 0 ){ v=v.split(a,b); }

    console.log( "Value split in A by B\r\n" + v.toString() );
  </code>
  
  <br /><br />
  
  Set <strong>a = 71, b = -11;</strong> to whatever you like, and it will calculate a different number using the math calculation and should always split apart equally in A by B.

  <br /><br />

  There is a method in which you square the remaining part to find the best A to B part.

  <br /><br />

  Doing this allows you to solve the patterns to all irrational numbers no matter how they are generated per part.

  <br /><br />

  This includes <strong>sine, cosine, tangent, x to y root, logarithms, and even PI</strong>.

  <br /><br />

  Even numbers you create per digit such as 1.101001000100001. Which the pattern is obvious.
  
  <br />

  <h2>The Natural logarithm.</h2>

  <table border="1">
    <tr><td colspan="2">Natural log.</td></tr>
    <tr><td>A</td><td>B</td></tr>
    <tr><td>2</td><td>1</td></tr>
    <tr><td>1</td><td>1</td></tr>
    <tr><td>2</td><td>2</td></tr>
    <tr><td>3</td><td>3</td></tr>
    <tr><td>4</td><td>4</td></tr>
    <tr><td>5</td><td>5</td></tr>
    <tr><td>6</td><td>6</td></tr>
    <tr><td>7</td><td>7</td></tr>
    <tr><td>8</td><td>8</td></tr>
    <tr><td>9</td><td>9</td></tr>
  </table>

  <br /><br />

  <code>
    var val = NaN;

    function A(x)
    {
      return( x );
    }

    function B(x)
    {
      return( x );
    }

    val = val.split(2,1);
    val = val.Trans(1,A,B);

    val = val.calc();

    console.log(val.toString());
  </code>

  <br /><br />

  The natural log is another good example. As you can see this is similar to that of our square roots, and the golden ratio. With one slight difference. Each part is +1 from before.

  <br /><br />

  <a id="s" class="cmd"></a><strong>Each number relates to each other. Think of this as the golden ratio to the square, and then to natural log, and PI as a spiral stir case squared.</strong>

  <br /><br />

  <div style="background-color:#808080;">
    <br /><br />

    If you really do understand, and really work out the A to B part square ratio. Then you can line up any number to it's pattern.

    <br /><br />

    Then you can use the quantum matrix to convert all parts into the exact number pattern <a href="https://recoskie.github.io/AI-Matrix/docs/Examples.html" target="_blank">Link</a>.

    <br /><br />

    If you are interested in the geometric space of all number patterns. Then you can go here <a href="https://recoskie.github.io/AI-Matrix/docs/Matrix%20Structure.html" target="_blank">Link</a>.

    <br /><br />
  </div>

  <br /><br />

  <h2>At the smallest scale (how it works).</h2>

  The Golden ratio is the smallest distance possible per part across a number. It can be added together by adding previous number to the next number creating a set called the Fibonacci sequence.

  <br /><br />

  <img src="bg\fig1.jpg" />

  <br /><br />

  Fibonacci = 0,1,1,2,3,5,8,13,21,34,55,89,144,233,377

  <br /><br />

  Each Fibonacci number divided by a prior Fibonacci number forums the golden ratio 377&divide;233=1.618025 per a=1, b=1 part. In perfect equilibrium.

  <br /><br />

  If you pick 8 and do 8&divide;5=1.6. You will find 1.6 splits in A=1, and B=1 the same number of times as it took to add to the Fibonacci number 8.

  <br /><br />
  
  This is because each prior value divides one time evenly, and as we add the previous value to the next value, we end up with a remainder that divides evenly one time again that includes the previous remainder. If we start with 0, 1 and multiply by 2 as we add the next value, we would end up with a value that divides evenly twice per part.
  
  <br /><br />
  
  If we wish to split the fraction 8&divide;5 going backwards. The value for each A-part is how many times 5 divides into 8. It divides once, so the value for A-part is 1. We are left with 8-5=3 going backwards.
  
  <br /><br />
  
  We divide the remainder 3 by the value we wish to use for B-part. In this example we will choose not to scale the remainder smaller going into next part so we will keep B=1.
  
  <br /><br />
  
  We take our remainder and divide it by the number we previously divided by which was 5. We go 5&divide;3. We end up with it dividing once, making A=1 with a remainder of 2. We can do this same process two more times going backwards before we have 0 remaining.

  <br /><br />
  
  Splitting a number into parts is the same process. The number before the decimal point is each A-part. The value 1.6 is A=1 so we take the part away leaving 0.6 remainder.
  
  <br /><br />
  
  We divide the remaining value 0.6 by B-part scale. In this example we will leave B=1 (no Scaling).
  
  <br /><br />
  
  We divide 0.6 into 1 to find the next part. We go 1&divide;0.6=1.6666666666666. We do the Same A to B process till 0.
  
  <br /><br />
  
  Both ways end up with the same results. When we divide the number into 1 we are basically asking how many times does the value go evenly the same as we did with the fraction till zero going backwards. This gives us an way to add the value back into a fraction.

  <br /><br />

  By adding the previous number to the next number, starting with 0, 1, and multiplying by each A-part creates the numerator. Doing the same thing, starting with 1, 0 with B-part creates the denominator. Which adds to the fraction. We can get the information for each A=? part by dividing the number into 1 to find the next evenly dividable value per part.

  <br /><br />

  We only include B-part when sizing up the parts into a calculation to calculate an number per part. To learn how to use the B-part to line up numbers, see the previous section on the square calculation: <a href="#square">Link</a>.

  <br /><br />

  All fractions and numbers can be split into parts, and then added back to their smallest fraction this way. As the number of times A-part goes into numerator will always match even if the fraction is larger than it should be. As 30 by 20 is still the same as 3 by 2 as it divides the same number of times till 0 even if both numbers are larger. Taking the number of times the value divided evenly till zero and adding them back into a numerator, and denominator forums the smallest fraction 3 by 2 even if we used 30 by 20.
  
  <br /><br />

  The Fibonacci sequence relates to adding per smaller part at the smallest scale without multiplying by an bigger value than A=1. The golden ratio is a direct 1:1 relation to the whole structure.

  <br /><br />

  The golden ratio is also a perfect rectangle called the golden rectangle.

  <br /><br />

  You can also create the golden rectangle with the Fibonacci sequence by using square tiles of each length of each Fibonacci number and placing them in front of each other as in the diagram.

  <br /><br />

  By measuring the bottom, and measuring the right side. Then dividing the two lengths. You get the golden ratio per part as well per square tile you added. The bigger the rectangle the more accurate the number is.

  <br /><br />

  The same rule applies to a circles outside distance divided by its distance across, which is why the number PI is a construction of parts that go on forever per bigger circle and is the very nature of what irrational numbers are. The golden ratio is the only number in which each part is exactly as small as can be per part as all A=1, B=1.

  <br /><br />

  The Fibonacci sequence and golden ratio is a spiral in nature when you connect the values together in the placement of its shape per square tile part, as seen in the diagram.

  <br /><br />

  All numbers have a place along the spiral. Rational numbers are a finite point. While irrational numbers go forever along the spiral. There is also no such thing as a random number.

  <br /><br />

  You can create a geometric space of all numbers if you like. You can also give them meaning to the natural world, or just have them represent them selves.

  <br /><br />

  It also exists in the formation of galaxies. Spanning from 0 as 0,1,1,2,3,5,8,13,21,34,55,89,144,233,377.

  <br /><br />

  <img src="https://cs.astronomy.com/cfs-file.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-00-51-JCP_5F00_blog/3835.Whirlpool-Golden-ratio.jpg" />

  <br /><br />

  You can also calculate the golden ratio as the pentagram.

  <br /><br />
  
  <img style="width:600px;height:303px;" src="https://1.bp.blogspot.com/-Od04RSUVFrc/XTxqy0DtOpI/AAAAAAAAcUA/P4DsYx381x4AEAEIDQ5BoSYDT_14fDNyACLcBGAs/s1600/EAfbbb6UwAAjwby.jpeg" />

  <br /><br />

  The golden ratio is the most irrational number as each part across the number per smaller part is exactly 1 away per A=1, and B=1.

  <br /><br />

  You may also find the following article fun as it describes different numbers and their relationship to reality.

  <a href="https://cs.astronomy.com/asy/b/astronomy/archive/2018/03/12/go-figure-nature-39-s-numbers-are-the-keys-to-the-cosmos.aspx" target="_blank">Nature numbers are the keys to the cosmos</a>.

  <br /><br />

  <h2>Rational Vs Irrational.</h2>

  In theory, if we could store an infinite number of digits.

  <br /><br />

  All rational numbers can be split to 0 parts remain across the number. Then added back to smallest fraction using <strong>calcF</strong>.

  <br /><br />

  Irrational numbers can be split forever into smaller parts, and will never hit 0.

  <br /><br />

  Computers have a limit for the number of digits we can store. So making the determination between the Rational/Irrational is hard. However, it is possible.

  <br /><br />

  We can say a number is irrational if the final split before 0 is at the end of the accuracy of a floating point number in the computer.

  <br /><br />

  The other method is calculating A to B ratio square. Finding both A and B. Then solving the number pattern with the quantum matrix: <a href="https://recoskie.github.io/AI-Matrix/docs/Examples.html" target="_blank">Link</a>

  <br /><br />

  It is possible to determine one from the other even with limited digits. However, it requires you to solve the squaring of B to A parts. Then using the matrix to solve the pattern.

  <br /><br />

  <a id="dpat" class="cmd"></a><h1>Periodic number patterns.</h1>

  Periodic number patterns happen when you divide a number that does not divide evenly out of the number of digits you are using to count before you carry to the next column.

  <br /><br />

  Many people use to think that the number PI would eventually repeat. When a number repeats, this means it can be represented as a "finite value = single fraction".

  <br /><br />

  The next place value is 10 after 9. When we divide any number by 9, it will create a remainder that is the same across the number forever.

  <br /><br />

  <table border="1">
    <tr><td>1&divide;9</td><td>0.111111111111111</td></tr>
    <tr><td>2&divide;9</td><td>0.222222222222222</td></tr>
    <tr><td>3&divide;9</td><td>0.333333333333333</td></tr>
    <tr><td>4&divide;9</td><td>0.444444444444444</td></tr>
    <tr><td>5&divide;9</td><td>0.555555555555555</td></tr>
    <tr><td>6&divide;9</td><td>0.666666666666666</td></tr>
    <tr><td>7&divide;9</td><td>0.777777777777777</td></tr>
    <tr><td>8&divide;9</td><td>0.888888888888888</td></tr>
  </table>

  <br /><br />

  You can make the fractions smaller. You can change 3&divide;9 to 1&divide;3. Which is the same fraction.

  <br /><br />

  Anything divided by the last digit creates a indivisible remainder that is the same across the number forever.

  <br /><br />

  The next place value is 100, so 100-1=99. Any two digits divided by 99 will repeat forever across the number as it is indivisible.

  <br /><br />

  23&divide;99=0.23232323232323

  <br /><br />

  The next place value is 100*10=1000, so 1000-1 is 999. Thus any three digits divided by 999 will be indivisible.

  <br /><br />

  719&divide;999=0.719719719719719

  <br /><br />

  You can make any number you like that is indivisible. Thus creates a number pattern using division. That is recurring, and periodic.

  <br /><br />

  <code>
    var val = 3 / 9;

    console.log(val);
  </code>

  <br /><br />

  In this example you can try it out your self. You can also change the 3&divide;9 (3 / 9) with every value you come up with that is indivisible.
  
  <br /><br />
  
  The pattern does not have to start right away as we can offset the pattern by adding a starting value. Say we want to do a pattern of 73. We need 73&divide;99. Adding an zero to 99 will offset the pattern by one place value 73&divide;990 = 0.073737373. Adding another zero will offset it by another place value 73&divide;9900 = 0.0073737373 and so on. Using 9900 we can set two place values after the decimal point to whatever we like. Using the calculation (73+r*9900)&divide;9900 in which r is our chosen digits. We multiply 9900 by 97.16 as our chosen digits 9900x97.16=961884 we then add our patten 73 making 961884 + 73 = 961957. Lastly 961957&divide;9900 = 97.16737373737373.

  <br /><br />

  Periodic number patterns relate to the number of digits you are using to display your value in divisible place values.

  <br /><br />

  <code>
    var val = 3 / 9;

    console.log(val.toString(3));
  </code>

  <br /><br />

  In this example the fraction 3&divide;9 works out as 0.1. This is, because we are dividing the number up in place values of 3. Which is what <strong>toString(3)</strong> does.

  <br /><br />

  This is called changing the number base from base 10 to base 3. Instead of each place value being in 10 per place value. It is in place values of 3.

  <br /><br />

  This means we have three digits instead of ten. Thus in three digits 1&divide;3 is perfectly dividable as one third = 0.1.

  <br /><br />

  Changing the number of digits we use in a number system changes what is divisible between the number of digits. In base three we count till 2 and carry to 10 which is 3 in value. This means the last value before the next place value is 2 and anything divided by 2 will not divide. Also anything divided by 22, or 222 in base three will not divide and will repeat across the number forever.

  <br /><br />

  <div id="t1"></div>

  <br /><br />

  Use the left and right arrows to change the number base. Use the up and down arrows to navigate through all number pattern combinations. You might have to zoom in if you are on a small display, or cell phone to use it.

  <br /><br />

  For example half of something can never be dividable out of thirds per place value. However half of ten digits is evenly 5, so a half out of ten units is 0.5.

  <br /><br />

  So it does not matter what the number of digits you use are. You get the same problem. You end up with 50% divisible numbers, and 50% indivisible periodic numbers. Even if you used base 60 numbers.

  <br /><br />

  But, don't worry so much about divisibility of place values in a number system. Since you can split these types of numbers into parts. Then add the parts together into smallest fraction with <strong>calcF</strong>.

  <br /><br />

  <code>
    var val = 3 / 9;

    val = val.splitAll();
    val = val.calcF();

    console.log(val.toString());
  </code>

  <br /><br />

  This way you do not have to worry about these messed up types of numbers.

  <br /><br />

  Using this knowledge we can use division characteristics to achieve some interesting algorithms.

  <br /><br />

  1. Such as algorithms that find, and translate recurring (periodic) patterns quickly in data with a single calculation.

  <br /><br />

  2. Generating fun random looking sequences that repeat infinitely periodically.

  <br /><br />

  <h2>Creating a division pattern.</h2>

  To create a new division pattern you use the <strong>Pattern</strong> data type.

  <br /><br />

  <code>
    var pat = new Pattern("31415",10);

    console.log(pat);

    var fract = pat.getFract();

    console.log(fract.toString());
  </code>

  <br /><br />

  We chose the pattern 31415, using out of ten digits. Thus we use the method <strong>getFract</strong> to get the smallest fraction.

  <br /><br />

  We can get more complex than this if we like.

  <br /><br />

  <code>
    var pat = new Pattern("DAMIAN",24);

    console.log(pat);

    var fract = pat.getFract();

    var val = fract.valueOf();

    console.log(fract.toString());

    console.log(val.toString(24));
  </code>

  <br /><br />

  In this example I encode my name into a division pattern. AS you can see the pattern is displayed first. Then fraction. Then value in base 24.

  <br /><br />

  You can encode things like this if you like. When I display the value my name is 0.DAMIAN<div style="display:inline-block;color:#FF0000;">DAMID</div>.

  <br /><br />

  It gets cut off at DAMID the second time. The last digit should be an A, but it is cut off as it is the last partial digit of accuracy in the floating point value.

  <br /><br />

  IF you do not specify the number base. The pattern data type will default to binary. Since numbers are binary in the computer by default.

  <br /><br />

  <code>
    var pat = new Pattern("1011");

    console.log(pat);

    var fract = pat.getFract();

    var val = fract.valueOf();

    console.log(fract.toString());

    console.log(val.toString(2));
  </code>

  <br /><br />

  It is fun working with numbers in different divisible parts.

  <br /><br />

  However you have to remind yourself that it is all in binary place values. Even though we can round stuff off, and divide by different place values.

  <br /><br />

  <h2>Finding the division pattern.</h2>

  Lets say you wish to find what the periodic pattern of a fraction, or number is.

  <br /><br />

  <code>
    var f = new Fract(711,911);

    var val = f.valueOf();

    console.log(val.toString(2));

    console.log(f.toString());

    var pat = f.divP();

    console.log(pat.toString());
  </code>

  <br /><br />

  You start by creating a fraction. You then call the operation <strong>divP</strong>. Which divides the value in binary. It finds the two points that equal the same remainder. Then creates the pattern.

  <br /><br />

  In the example code. The first output is the value of the fraction in binary. The second output is the fraction. Then last output is the division pattern before any recurrence.

  <br /><br />

  Assuming you wish to find the division pattern of a value. You then get the fraction of the value then call <strong>divP</strong>.

  <br /><br />

  <code>
    var val = 711 / 911;

    console.log(val.toString(2));

    var f = val.getFract();

    var pat = f.divP();

    console.log(pat.toString());
  </code>

  <br /><br />

  Now all of this is done in binary by default. You can actually pass the number base you want to <strong>divP</strong>.

  <br /><br />

  This will then force division pattern in other number bases like base 10.

  <br /><br />

  <code>
    var f = new Fract(711,911);

    var val = f.valueOf();

    console.log(val.toString());

    console.log(f.toString());

    var pat = f.divP(10);

    console.log(pat.toString());
  </code>

  <br /><br />

  And lets say you wish to convert to a base 10 pattern from just the number value.

  <br /><br />

  <code>
    var val = 711 / 911;

    console.log(val.toString());

    var f = val.getFract();

    var pat = f.divP(10);

    console.log(pat.toString());
  </code>

  <br /><br />

  <a id="fract" class="cmd"></a><h1>Fraction data type.</h1>

  Fractions are useful for values that are periodic. See the section on Periodic number patterns: <a href="#dpat">Link</a>.

  <br /><br />

  Such values should be avoided if possible by storing the fraction instead, or splitting such numbers into parts. Then adding the parts back to a fraction.

  <br /><br />

  However the fraction data type is not useful for numbers that are a infinite pattern of parts. This is because such values can never be a finite value. See the section Irrational numbers:  <a href="#irrational">Link</a>.

  <br /><br />

  In binary. Lots of decimal values become un-dividable in place values of two. See the following documentation: <a href="https://docs.python.org/3/tutorial/floatingpoint.html" target="_blank">Link</a>.

  <br /><br />

  Such values can be converted into two floating point values that divide to the value without error. Which is what the fraction data type does.

  <br /><br />

  The reason it works is that we can store numbers as whole numbers in binary without error. Then add them. Then divide to the exact number.

  <br /><br />

  <code>
    var f1 = new Fract(1,10);
    var f2 = new Fract(2,10);

    //Add the two fractions.

    f1.x += f2.x;

    //Display the result.

    console.log(f1);
  </code>

  <br /><br />

  Now normally adding 0.1 with 0.2 would create a floating point error. However it does not this time. Because we are using whole number values that can be represented in binary perfectly.

  <br /><br />

  You can multiply, add, and subtract. Such values without any errors as the fraction data type.

  <br /><br />

  Each fraction has a <strong>x</strong>, and <strong>y</strong>.

  <br /><br />

  <strong>x</strong> is the numerator floating point value.

  <br /><br />

  <strong>y</strong> is the denominator floating point number.

  <br /><br />

  This form of arithmetic is preferred in applications that require extremely high accuracy with very little impact on performance.

  <br /><br />

  Now adding 0.1, and 0.2 regularly as follows will result in error.

  <br /><br />

  <code>
    var f1 = 0.1;
    var f2 = 0.2;

    //Add the two numbers.

    f1 += f2;

    //Display the result.

    console.log(f1);
  </code>

  <br /><br />

  The <strong>reduce</strong> method splits the fraction into parts then adds the parts back into the smallest fraction.

  <br /><br />

  <code>
    var f = new Fract(31415,10000);

    //Display fraction.

    console.log(f.toString());

    //Smallest fraction.

    f = f.reduce();

    //Display the result.

    console.log(f.toString());
  </code>

  <br /><br />

  The Fraction data type lets you use the <strong>divP</strong> method to find what the indivisible pattern is.

  <br /><br />

  <code>
    var f = new Fract(2,10);

    //Indivisible part in binary base 2.

    var pat = f.divP(2);

    //Display the indivisible pattern.

    console.log(pat);
  </code>

  <br /><br />

  So 0.2 ends up having the recurring pattern <strong>0011&infin;</strong> forever. You can change the <strong>divP(2)</strong> to other number bases if you wish to find if the fraction is dividable in other number bases other than binary.

  <br /><br />

  For example if you change base 2 to base 10 with <strong>divP(10)</strong>. Then you will get the output <strong>0&infin;</strong>. This means there is no reminder. Which means it divides in base 10, but not as a base 2 binary number.

  <br /><br />

  You can only use <strong>divP</strong> with the fraction data type.

  <br /><br />

  The method <strong>getFract</strong> gives back a fraction from numbers, and patterns. By splitting to all parts then adding all parts back to a fraction.

  <br /><br />

  It is methods <strong>splitAll</strong>, and <strong>calcF</strong> combined.

  <br /><br />

  Also Method <strong>calcF</strong> gives back the fraction data type. Which also would allow you to use <strong>divP</strong> with added up parts.

  <br /><br />

  It is important for you to know this so you do not use a method like <strong>divP</strong>, or even <strong>reduce</strong>. Unless you convert to a fraction data type first.

  <br /><br />

  <a id="er" class="cmd"></a><h1>Error Correction.</h1>

  Generally error correction is not rally necessary. If you write your code, and algorithms using the fraction data type: <a href="#fract">Link</a>.

  <br /><br />

  In that section. I explain floating point error, and how to overcome it. With as little performance loss as possible.

  <br /><br />

  Errors happen at the last place value in a number. When you add values together that do not divide evenly into a binary number.

  <br /><br />

  When a number is split into parts. The last part is usually where the error is accumulated.

  <br /><br />

  However removing the last part. Is not possible. If there is no error. As it will create a less accurate number when added back together. Resulting in error.

  <br /><br />

  What we can do. Is that the part ends up being rally big in size compared to the other A, B parts. So we average the parts. Then remove the parts at the end of the number that are bigger than average.

  <br /><br />

  So here is an example where we introduce error into a floating point value. Then error correct it.

  <br /><br />

  <code>
    var n = 3.147547;

    var er = 2; //Number Of binary digits.

    //The exponent position using log 2.

    var pos = Math.round(Math.log(n)/Math.log(2));

    //The last binary digit.

    var er = 2**(pos-(53-er)); er -= 2**(pos-53);

    //Show the error that is being introduced.

    console.log( "Value before error is introduced.\r\n\r\n" + n.toString(2) + "\r\n\r\n" );

    console.log( "Value that is going to be added to Number as error.\r\n\r\n" + er.toString(2) + "\r\n\r\n" );

    n += er;

    console.log( "Value After error is introduced.\r\n\r\n" + n.toString(2) + "\r\n\r\n" );

    //Show various stats about the number in question.

    n.stats();

    //Call the error correction method on the number.

    console.log( "\r\n\r\nError corrected value = " + n.err() );
  </code>

  <br /><br />

  In this example I use the method <strong>stats</strong>. It displays everything about any number you use it with.

  <br /><br />

  As you can see there is a big jump at the last part.

  <br /><br />

  Generally we only need to remove the part at the end of the number. Going backwards that is higher than average.

  <br /><br />

  When the method <strong>err</strong> is used on a number. It gives back the number value error corrected.

  <br /><br />

  There is a lot you can change in this example code if you like. You can change the number used which is variable "n". You can make the error bigger by change the "er = 2" to say "er = 5".

  <br /><br />

  <h1>To Average fraction.</h1>

  There are also other forums of error correction such as translating to a average fraction.

  <br /><br />

  Rather than calling <strong>getFract</strong> on numbers, or using <strong>getFract</strong> on the pattern data type. Instead you can use <strong>avgFract</strong>.

  <br /><br />

  <code>
    var n = 3.147547;

    var er = 2; //Number Of binary digits.

    //The exponent position using log 2.

    var pos = Math.round(Math.log(n)/Math.log(2));

    //The last binary digit.

    var er = 2**(pos-(53-er)); er -= 2**(pos-53);

    //Show the error that is being introduced.

    console.log( "Value before error is introduced.\r\n\r\n" + n.toString(2) + "\r\n\r\n" );

    console.log( "Value that is going to be added to Number as error.\r\n\r\n" + er.toString(2) + "\r\n\r\n" );

    n += er;

    console.log( "Value After error is introduced.\r\n\r\n" + n.toString(2) + "\r\n\r\n" );

    //Show various stats about the number in question.

    n.stats();

    //Call the error correction method on the number.

    console.log( "\r\n\r\nError corrected value = " + n.avgFract().toString() );
  </code>

  <br /><br />

  This time when error correcting the value. We convert to a fraction that is the average of all "a" parts.

  <br /><br />

  This is very useful if you wish to receive number inputs from a septate method, or routine. That you know may have error.

  <br /><br />

  You then can translate to a fraction. Then you can do arithmetic with fraction data types. To have less error overall.

  <br /><br />

  <h1>Setting a limit.</h1>

  The last forum of error correction is setting a cut off range. Normally the cut off range is the last digit in a floating point number.

  <br /><br />

  The last floating point digit is 53 away in place values of 2. So 2^52=4503599627370496 as a number. Which has a move-able exponent.

  <br /><br />

  We then divide this large number into one to get a value at which the number is cut off at.

  <br /><br />

  In which 1&divide;4503599627370496=2.22044604925031-16 is the default cut off range when spiting a number into parts.

  <br /><br />

  The methods <strong>split</strong>, <strong>splitAll</strong> use this value to find when all parts are split out of the number.

  <br /><br />

  The methods <strong>getFract</strong>, <strong>avgFract</strong> use this value as well to convert to fraction. As they split to the last part of the number.

  <br /><br />

  The method <strong>Trans</strong>, Stops transforming all parts at the cut off range.

  <br /><br />

  <code>
    var pi = Math.PI;

    pi = pi.splitAll();

    console.log(pi.toString());

    //Set the limit.

    pi.limit( 1 / Math.pow(2, 26 ) );

    console.log(pi.toString());
  </code>

  <br /><br />

  AS you can see. The first time we split to all parts. We split right to the end. After we set the limit to half of 52, which is 26. We then have over 50% of the number gone.

  <br /><br />

  The value is set 0 at cut off range. In this next example the limit is set back to normal.

  <br /><br />

  <code>
    var pi = Math.PI;

    pi = pi.splitAll();

    console.log(pi.toString());

    //Set the limit.

    pi.limit( 1 / Math.pow(2, 26 ) );

    console.log(pi.toString());

    //Set limit back to normal.

    pi.limit( 1 / Math.pow(2, 52 ) );

    //Split to all parts again.

    pi = pi.splitAll();

    console.log(pi.toString());
  </code>

  <br /><br />

  You can change the limit how ever you like without losing the value of the number. It just sets the 0 point.

  <br /><br />

  Also if you do not like the limit as a positional number in place values. You can convert to out of 52 place values into a percentage of 0% to 100%.

  <br /><br />

  <code>
    var ac = 50;

    var pi = Math.PI.limit( 1 / ( Math.pow( 2, 52 / ( 100 / ac ) ) ) );

    var fract = pi.getFract();

    console.log(fract.toString());
  </code>

  <br /><br />

  You can go by percent, or number of places.

  <br /><br />

  Setting the cut off point is good, for error correcting a value. If you know the number of adds, multiply, basically arithmetic operations that occurred.

  <br /><br />

  You then can add up the max possible error into number of place values. This is called dynamic error correction.

  <br /><br />

  <a id="bits" class="cmd"></a><h1>Binary translation operations.</h1>

  You can convert the number into pure binary using the <strong>bits</strong> operation. Once the number is in binary. You can manipulate the exponent, mantissa, and even the sing bit.

  <br /><br />

  <code>
    var val = 27.34;

    val = val.bits();

    console.log(val.toString());

    val.sing = 1;
    val.exp += 1;
    val.mantissa += 1;

    console.log(val.toString());
  </code>

  <br /><br />

  In this example we convert the number to it's 64 bit binary value using <strong>toString</strong>. We set the sing bit one at the start of the number that can be a 0, or 1. We move the exponent one place value. Which the exponent is the next 11 binary digits after the sing. Then we add our 52 binary digits of our number by one.

  <br /><br />

  As you can see the binary value from before then after. You can make any floating point number manipulation you like using this.

  <br /><br />

  If <strong>toString</strong> is not used the floating point value is used.

  <br /><br />

  <code>
    var val = 27.34;

    val = val.bits();

    console.log(val);

    val.sing = 1;
    val.exp += 1;
    val.mantissa += 1;

    console.log(val);
  </code>

  <br /><br />

  However doing any math operation with the binary number will convert the number back to a regular number.

  <br /><br />

  <code>
    var val = 27.34;

    val = val.bits();

    val = val + 0;

    console.log(val);

    val.sing = 1;
    val.exp += 1;
    val.mantissa += 1;

    console.log(val);
  </code>

  <br /><br />

  It will convert back to a number. So if you want to do binary operations on it's sing, exponent, mantissa. You have to convert it back to binary with the <strong>bits</strong> method.

  <br /><br />

  You can also change the 64 bit binary representation into any number base from 2 to 36 per place value.

  <br /><br />

  <code>
    var val = 27.34;

    val = val.bits();

    console.log(val.toString(10));
  </code>

  <br /><br />

  You can also convert any 64 bit binary representation of a number back into a number with the new <strong>parseNumber</strong> method.

  <br /><br />

  <code>
    var val = parseNumber("04628388743545398231", 10);

    console.log(val);
  </code>

  <br /><br />

  Normally this method translates 64 binary digits to a floating point number if you leave out the ", 10".

  <br /><br />

  <code>
    var val = parseNumber("0100000000111011010101110000101000111101011100001010001111010111");

    console.log(val);
  </code>

  <br /><br />

  This time just the 64 bit binary value is used by default. If no number base is specified.

  <br /><br />

  Also the <strong>parseFloat</strong> operation has been updated to Handel changing floating point numbers in different bases back to a number value.

  <br /><br />

  For example the number PI in base 36.

  <br /><br />

  <code>
    var val = Math.PI;

    console.log(val.toString(36));
  </code>

  <br /><br />

  Now with the updated <strong>parseFloat</strong>. We can convert the value back to it's exact number by specifying base 36.

  <br /><br />

  <code>
    var val = parseFloat("3.53I5AB8P5F", 36);

    console.log(val);
  </code>

  <br /><br />

  Working with number bases like this with perfect accuracy was not possible before. If you remove ", 36". Then the default is base 10.

  <br /><br />

  <code>
    var val = parseFloat("3.141592653589793");

    console.log(val);
  </code>

  <br /><br />

  The round off point is calculated in multiples relative to the rounding off point in binary. This ensures there is no loss when changing numbers between different number bases.

  <br /><br />

  However you can view what the real value looks like in full. Because 0.1 is indivisible as a binary number. So it is rounded off at 0.1 in decimal relative to the last multiple of 10 that is accurate in binary place values.

  <br /><br />

  <code>
    var val = 0.1;

    console.log( val.toString( 10, true ) );
  </code>

  <br /><br />

  This gives us the decimal value 0.10000000000000000555111512312578270211815834045410156. Which is rounded off to 0.1. Almost all decimal values do not divide evenly as a binary number.

  <br /><br />

  See the following documentation on why: <a href="https://docs.python.org/3/tutorial/floatingpoint.html" target="_blank">Link</a>.

  <br /><br />

  Using ", true" forces the true representation of a floating point value, without any rounding off in any number base, from 2 to 36.

  <br /><br />

  <code>
    var val = Math.PI;

    console.log( val.toString( 10, true ) );
  </code>

  <br /><br />

  The best representation of PI without any rounding off as a 64 bit floating point number is exactly 3.141592653589793115997963468544185161590576171875.

  <br /><br />

  It is rounded off at 3.141592653589793. As that is the only places that are truly accurate to number of binary digits in a floating point number.

  <br /><br />

  <code>
    var val = Math.PI;

    console.log( val.toString( 36, true ) );
  </code>

  <br /><br />

  The real representation of PI in base 36. Without any rounding off as a 64 bit floating point number is exactly 3.53I5AB8P5FC5VAYQTER60F6R.

  <br /><br />

  <a id="bwise" class="cmd"></a><h1>Bitwise Operations.</h1>

  You can now do logical operations on all 64 binary digits of a floating point number.

  <br /><br />

  Doing any bitwise operation on a floating point number changes the number into a binary number. See the section on binary translation: <a href="#bits">Link</a>.

  <br /><br />

  Before javascript would convert to a 32 bit number during logical operations. Then back to a floating point number.

  <br /><br />

  Lets start with one of the basics such as a left shift.

  <br /><br />

  <code>
    var n = Math.PI;

    for( var i = 0; i < 64; i++ )
    {
      n = n.bitLsh(1);

      console.log(n.toString());
    }
  </code>

  <br /><br />

  In this example we left shift the number 64 times by 1. What this does it move all the binary digits to the left by one.

  <br /><br />

  The number gets converted to a binary number as soon as you do any logical bitwise operation on the floating point number.

  <br /><br />

  You can also display the decoded float value if you remove the <strong>toString</strong> method. Which is the regular behavior for a binary number.

  <br /><br />

  <code>
    var n = Math.PI;

    for( var i = 0; i < 64; i++ )
    {
      n = n.bitLsh(1);

      console.log(n);
    }
  </code>

  <br /><br />

  This differs greatly as it rally does let you do 64 bit bitwise arithmetic operations as a floating point value.

  <br /><br />

  <code>
    var n = Math.PI;

    for( var i = 0; i < 64; i++ )
    {
      n = n.bitRsh(1);
      
      console.log(n.toString());
      console.log(n);
    }
  </code>

  <br /><br />

  Also <strong>bitRsh</strong> is right shift. It is the same as left shift. Except it moves the binary digits to the right. Number of places. Instead of to the left.

  <br /><br />

  You can change the number of places from 1 at a time to 2 at a time to the right or more if you like.

  <br /><br />

  You can also do operations like the logical "NOT" operation which converts all ones to zeros, and all zeros to ones. It inverts the binary number.

  <br /><br />

  <code>
    var n = Math.PI;

    n = n.bits();

    console.log(n);
    console.log(n.toString());

    n = n.bitNot();

    console.log(n);
    console.log(n.toString());
  </code>

  <br /><br />

  This time I convert the number to it's binary using the bit's operation, so I can show the binary value before the bits based operation "NOT".

  <br /><br />

  As you can see the two numbers are opposite to each other. Inverting a floating point number is very inserting. For example you can change <strong>var n = Math.PI;</strong> to <strong>var n = 7;</strong>. Change the value to what ever you like.

  <br /><br />

  Then we have operations like "XOR", "AND", "OR".

  <br /><br />

  <code>
    var n = Math.PI;

    n = n.bits();

    console.log(n);
    console.log(n.toString());

    n = n.bitAnd(2.1);

    console.log(n);
    console.log(n.toString());
  </code>

  <br /><br />

  In this example we do a logical "AND" against the number PI with the 64 bit floating point value "2.1".

  <br /><br />

  The value 2.1 in binary is 0100000000000000110011001100110011001100110011001100110011001101

  <br /><br />

  The number PI is 0100000000001001001000011111101101010100010001000010110100011000

  <br /><br />

  The logical "AND" operations only outputs a one if the two binary digits are a 1 in the same place values. This creates a very interesting operation when it comes to floating point numbers.

  <br /><br />

  <code>
    var n = Math.PI;

    n = n.bits();

    console.log(n);
    console.log(n.toString());

    n = n.bitOr(2.1);

    console.log(n);
    console.log(n.toString());
  </code>

  <br /><br />

  This time we do a logical "OR" with the same values we did with the logical "AND" operation.

  <br /><br />

  The logic operation "OR" outputs a 1 if aether place values from both numbers are a 1. So it sets the place value a one if it is a one in aether number merging the place values. Except place values that are both 0 in both numbers.

  <br /><br />

  This also has some interesting effects on floating point numbers when comparing them just as logical "AND" does.

  <br /><br />

  <code>
    var n = Math.PI;

    n = n.bits();

    console.log(n);
    console.log(n.toString());

    n = n.bitXor(2.1);

    console.log(n);
    console.log(n.toString());
  </code>

  <br /><br />

  The logical XOR operation only outputs a 1 if both place values are different. If both place are the same output is 0.

  <br /><br />

  Doing a XOR with the same number will result in 0 all across the number since the binary digits are the same. Thus you only get a one output if digits do not match.

  <br /><br />

  Also you do not have to use just <strong>2.1</strong> as the value you do a "XOR", "AND", "OR", operation with. You can also change <strong>Math.PI</strong> to any number you like.

  <br /><br />

  <a id="v" class="cmd"></a><h1>Vector and array operations.</h1>

  We can also do all the floating point operations on a group of numbers rather than one number at a time.

  <br /><br />

  <code>
    var array = [7, 7.7, 9.11, 3.11, 723];

    array = array.bits();

    console.log(array.join("\r\n"));
  </code>

  <br /><br />

  As you can see all numbers in the array are converted to binary numbers with the <strong>bits</strong> operation.

  <br /><br />

  Thus <strong>join</strong> is an array operation. It converts all numbers in the array <strong>toString</strong> using the <strong>toString</strong> operation on all numbers in the array.

  <br /><br />

  The input "\r\n" is what we wish to use as a separator between each thing in the array. Thus "\r\n" is the code for a new line.

  <br /><br />

  <code>
    var array = [7, 7.7, 9.11, 3.11, 723];

    array = array.getFract();

    console.log(array.join("\r\n"));
  </code>

  <br /><br />

  Call the method <strong>getFract</strong> on all numbers in the array. Basically all operations. You would use on a single number. Is usable with array.

  <br /><br />

  This makes a big shortcut, for writing algorithms, and code to also error correct all numbers with a single <strong>err</strong> on an array.

  <br /><br />

  <code>
    var array = [7, 7.7, 9.11, 3.11, 723];

    array = array.bitRsh(1);

    console.log(array.join("\r\n"));
  </code>

  <br /><br />

  Right shift all numbers by one. All number operations can be used with a group of numbers in an array.
</body>
</html>
