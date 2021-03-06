/***********************************************************************
Basic embedded CSS for basic layout.
***********************************************************************/

document.body.innerHTML = "<style type='text/css'>\
<!--\
.FBarV {\
  text-align: center;\
  min-height:100%;\
  table-layout:fixed;\
}\
.FBarH {\
  text-align: center;\
  min-width:100%;\
  table-layout:fixed;\
}\
.CBarV {\
  text-align: center;\
  min-height:100%;\
  table-layout:fixed;\
}\
.CBarH {\
  text-align: center;\
  min-width:100%;\
  table-layout:fixed;\
}\
.TBar {\
  text-align: center;\
}\
-->\
</style>" + document.body.innerHTML;

/***********************************************************************
This is a bar for modifying a number and viewing a number after manipulation operations.
Or when number is added to another number this will update as it is linked to the number in memory.
***********************************************************************/

function FBar( el, Num )
{
  //Check if FL64 is loaded. This is a must.

  Num = Num || NaN; if (!Number.prototype.bits) { throw new Error("FL64 is not loaded!"); }

  //Reference the memory location of the variable given to this bar.

  this.n = SFBar.Ref.length; SFBar.Ref[this.n] = Num; SFBar.ID[this.n] = el; SFBar.Bars[this.n] = this;

  //The bars html. This can not be shared between bars as it is specific to bar reference.

  this.X = []; this.A = []; this.B = []; this.R = [];

  //Create bar to init size.

  SFBar.pos[this.n] = Math.min(0, Num.length - 6); this.setMax( 6 );
}

SFBar = {
  /***********************************************************************
  Basic constructor for rows and columns with bar. The "#" is bar number, and "*" col number.
  Shared between FBar to save memory. This may eventually be string only when decided on best format and layout.
  ***********************************************************************/

  X: ["<td>X<sup><div style='display: inline;' id='f", "#", "x", "*", "'></div></sup></td>"
  ],
  A: ["<td>\
  <input type='button' style='float:left;' value='&#x2191;' onclick='SFBar.adjA(","#",",","*",",1);' />\
  <div style='display: inline;' id='f", "#", "a", "*","'></div>\
  <input type='button' style='float:right;' value='&#x2193;' onclick='SFBar.adjA(" , "#" , "," , "*" , ",-1);' />\
  </td>"
  ],
  B: ["<td>\
  <input type='button' style='float:left;' value='&#x2191;' onclick='SFBar.adjB(", "#", ",", "*", ",1);' />\
  <div style='display: inline;' id='f", "#", "b", "*", "'></div>\
  <input type='button' style='float:right;' value = '&#x2193;' onclick='SFBar.adjB(" , "#", ",", "*", ",-1);' />\
  </td>"
  ],
  AB: ["<td>\
  <input type='button' value='Set A' onclick='SFBar.setA(","#",",","*",");' />\
  <input type='button' value='Set B' onclick='SFBar.setB(","#",",","*",");' />\
  </td>"
  ],
  R: ["<td>\
  <input type='button' style='min-width:100%;' value='Remove' onclick='SFBar.remove(" , "#" , ",", "*", ");' />\
  </td>"
  ],

  /***********************************************************************
  Shared properties in order for each bar to work properly on page.
  ***********************************************************************/

  ID: [],
  Ref: [],
  pos: [],

  /***********************************************************************
  The bars methods. For methods that have to invoke, for example the update method after a change.
  ***********************************************************************/

  Bars: [],

  /***********************************************************************
  Passes bar number, and element across.
  ***********************************************************************/

  adjA: function (bar,el,v)
  {
    this.Ref[bar].setA(this.pos[bar] + el, this.Ref[bar].a[this.pos[bar] + el] + v);

    document.getElementById("f" + bar + "a" + el).innerHTML = this.Ref[bar].a[this.pos[bar] + el];

    if (!isNaN(this.Ref[bar].primitive())) { document.getElementById("f" + bar + "re").innerHTML = this.Ref[bar].reValue(); }

    this.Bars[bar].onChange(this.Ref[bar].calc(0, this.Ref[bar].length - 1));
  },

  /***********************************************************************
  Passes bar number, and element across.
  ***********************************************************************/

  adjB: function (bar, el,v)
  {
    this.Ref[bar].setB(this.pos[bar] + el, this.Ref[bar].b[this.pos[bar] + el] + v);

    document.getElementById("f" + bar + "b" + el).innerHTML = this.Ref[bar].b[this.pos[bar] + el];

    if (!isNaN(this.Ref[bar].primitive())) { document.getElementById("f" + bar + "re").innerHTML = this.Ref[bar].reValue(); }

    this.Bars[bar].onChange(this.Ref[bar].calc(0, this.Ref[bar].length - 1));
  },

  /***********************************************************************
  Passes bar number, and element across.
  ***********************************************************************/

  clear: function (bar)
  {
    this.Ref[bar].length = 0; this.Bars[bar].update();

    this.Bars[bar].onChange(this.Ref[bar].calc(0, this.Ref[bar].length - 1));
  },

  /***********************************************************************
  Passes bar number, and element across.
  ***********************************************************************/

  remove: function (bar, el)
  {
    this.Ref[bar].remove(this.pos[bar] + el); this.Bars[bar].update();

    this.Bars[bar].onChange(this.Ref[bar].calc(0, this.Ref[bar].length - 1));
  },

  /***********************************************************************
  Passes bar number, and element across.
  ***********************************************************************/

  split: function (bar)
  {
    if (isNaN(this.Ref[bar].primitive()))
    {
      this.Ref[bar] = this.Ref[bar].split(1, 1);
    }
    else { this.Ref[bar].split(); }

    this.pos[bar] = this.Ref[bar].length - this.Bars[bar].max; this.Bars[bar].update();

    this.Bars[bar].onChange(this.Ref[bar].calc(0, this.Ref[bar].length - 1));
  },

  /***********************************************************************
  Creates a Number with current factors if number is NaN.
  ***********************************************************************/

  create: function (bar)
  {
    this.Ref[bar] = this.Ref[bar].calc().splitAll();

    this.pos[bar] = this.Ref[bar].length - this.Bars[bar].max;

    this.Bars[bar].onCreate(this.Ref[bar]); this.Bars[bar].onChange(this.Ref[bar].primitive());

    this.Bars[bar].update();
  },
  
  /***********************************************************************
  Set A, or B to a value.
  ***********************************************************************/
  
  setA: function(bar, el)
  {
    if( v = prompt("Enter the Value you want to set A.") )
    {
      if( isNaN( v = parseInt(v, 10) ) ) { alert("Please enter an valid Number!"); return; }
      
      this.Ref[bar].setA(this.pos[bar] + el, v);

      document.getElementById("f" + bar + "a" + el).innerHTML = this.Ref[bar].a[this.pos[bar] + el];

      if (!isNaN(this.Ref[bar].primitive())) { document.getElementById("f" + bar + "re").innerHTML = this.Ref[bar].reValue(); }

      this.Bars[bar].onChange(this.Ref[bar].calc(0, this.Ref[bar].length - 1));
    }
  },
  
  setB: function(bar, el)
  {
    if( v = prompt("Enter the Value you want to set B.") )
    {
      if( isNaN( v = parseInt(v, 10) ) ) { alert("Please enter an valid Number!"); return; }
    
      this.Ref[bar].setB(this.pos[bar] + el, v);

      document.getElementById("f" + bar + "b" + el).innerHTML = this.Ref[bar].b[this.pos[bar] + el];

      if (!isNaN(this.Ref[bar].primitive())) { document.getElementById("f" + bar + "re").innerHTML = this.Ref[bar].reValue(); }

      this.Bars[bar].onChange(this.Ref[bar].calc(0, this.Ref[bar].length - 1));
    }
  },

  /***********************************************************************
  Navigate to the left.
  ***********************************************************************/

  left: function (bar) { this.pos[bar] -= this.Bars[bar].max - 1; this.Bars[bar].update(); },

  /***********************************************************************
  Navigate to the right.
  ***********************************************************************/

  right: function (bar) { this.pos[bar] += this.Bars[bar].max - 1; this.Bars[bar].update(); }
};

/***********************************************************************
Pre constructed lines to nth element, for fast bar html creation.
Only necessary when changing orientation.
***********************************************************************/

FBar.prototype.X = []; //X-n.
FBar.prototype.A = []; //A-n.
FBar.prototype.B = []; //B-n.
FBar.prototype.AB = [] //Edit A, or B.
FBar.prototype.R = []; //Remove/Edit.

/***********************************************************************
Create bar cols to max set size.
***********************************************************************/

FBar.prototype.omax = FBar.prototype.max = 0; FBar.prototype.setMax = function (n)
{
  this.max = this.X.length;

  for (var i = 0, s = ""; this.max <= n; this.max++)
  {
    //Iterate the constructors and add a sting together using reference number.

    for (; i < SFBar.X.length; s += SFBar.X[i] + (SFBar.X[i + 1] ? (SFBar.X[i + 1] == "#" ? this.n : this.max) : ""), i += 2); this.X[this.max] = s; i = 0; s = "";
    for (; i < SFBar.A.length; s += SFBar.A[i] + (SFBar.A[i + 1] ? (SFBar.A[i + 1] == "#" ? this.n : this.max) : ""), i += 2); this.A[this.max] = s; i = 0; s = "";
    for (; i < SFBar.B.length; s += SFBar.B[i] + (SFBar.B[i + 1] ? (SFBar.B[i + 1] == "#" ? this.n : this.max) : ""), i += 2); this.B[this.max] = s; i = 0; s = "";
    for (; i < SFBar.AB.length; s += SFBar.AB[i] + (SFBar.AB[i + 1] ? (SFBar.AB[i + 1] == "#" ? this.n : this.max) : ""), i += 2); this.AB[this.max] = s; i = 0; s = "";
    for (; i < SFBar.R.length; s += SFBar.R[i] + (SFBar.R[i + 1] ? (SFBar.R[i + 1] == "#" ? this.n : this.max) : ""), i += 2); this.R[this.max] = s; i = 0; s = "";
  }

  this.max = n;
}

/***********************************************************************
Horizontal, or vertical. Changing orientation means recreating the bar.
***********************************************************************/

FBar.prototype.V = FBar.prototype.Vertical = false;

/***********************************************************************
FBar reference number. The element specific to this FBar in shared Ref, and ID.
***********************************************************************/

FBar.prototype.n = 0;

/***********************************************************************
Set the number, or fraction used with this bar.
***********************************************************************/

FBar.prototype.set = function (v)
{
  SFBar.Ref[this.n] = v; this.update();

  this.onChange(v.calc(0, v.length - 1));
}

/***********************************************************************
Get the number, or fraction used with this bar.
***********************************************************************/

FBar.prototype.get = function () { return (SFBar.Ref[this.n]); }

/***********************************************************************
Event that is trigged on creating a new number.
***********************************************************************/

FBar.prototype.onCreate = function () { }

/***********************************************************************
When user makes changes to a number or fraction.
***********************************************************************/

FBar.prototype.onChange = function () { }

/***********************************************************************
Auto adjust for best layout on resize event.
***********************************************************************/

FBar.prototype.auto = function ()
{
  //Vertical or horizontal best fits the screen,

  var w = document.getElementById(SFBar.ID[this.n]).offsetWidth, h = document.getElementById(SFBar.ID[this.n]).offsetHeight;

  this.Vertical = h > w;

  //Number of rows best fit.

  if (this.Vertical) { this.setMax(Math.floor(h / 32) - 5); } else { this.setMax(Math.floor(w / 120) - 3); }

  //If number is NaN. Then automatically split to number of rows, or cols on display.

  if (isNaN(SFBar.Ref[this.n]))
  {
    for (var i = SFBar.Ref[this.n].length; i < this.max; i++) { SFBar.Ref[this.n] = SFBar.Ref[this.n].split(1, 1); }
  }

  //Update.

  this.update();
}

/***********************************************************************
keep track of enabled rows and cols.
***********************************************************************/

FBar.prototype.enabled = 0;

/***********************************************************************
Update the component to page element.
Calling this function is only necessary when making changes to a number,
or fraction with custom code, or methods.
***********************************************************************/

FBar.prototype.update = function (force)
{
  //Adjust position within boundaries.

  SFBar.pos[this.n] = Math.max(0, Math.min(SFBar.pos[this.n], SFBar.Ref[this.n].length - SFBar.Bars[this.n].max));

  //re-Create bar if necessary.

  if (force || this.V != this.Vertical || this.omax != this.max )
  {
    this.V = this.Vertical; this.omax = this.max; this.enabled = this.max;

    //Create bar html body.

    var html = "<table class='" + (this.V ? "FBarV" : "FBarH") + "' id='f" + this.n + "' border='1px;'>";

    //Across and down by row.

    if (this.Vertical)
    {
      //Columns X, A, B.

      html += "<tr><td>X</td><td>A</td><td>B</td>";
      
      //Set A, or B to a value.
      
      html += "<td>Set A, or B</td>"

      //Remove all factors column with button "X".

      html += "<td><input style='min-width:100%;' type='button' value='X' onclick='SFBar.clear(" + this.n + ");' /></td></tr>";

      //Move Up.

      html += "<tr><td id='f" + this.n + "l' colspan='5'><input style='min-width:100%;' type='button' value='&#x2191;' onclick='SFBar.left(" + this.n + ");' /></td></tr>";

      //Put each row together in X, A, B, R. In which R is the button to remove a individual factor.

      for (var i = 0; i < this.max; i++)
      {
        html += "<tr>" + this.X[i] + this.A[i] + this.B[i] + this.AB[i] + this.R[i] + "</tr>";
      }

      //Move Down.

      html += "<tr><td id='f" + this.n + "r' colspan='5'><input style='min-width:100%;' type='button' value='&#x2193;' onclick='SFBar.right(" + this.n + ");' /></td></tr>";

      //The split button at the bottom across all 4 all columns.

      html += "<tr><td colspan='5'><input type='button' style='min-width:100%;' value='Split(B=1)' onclick='SFBar.split(" + this.n + ");' /></td></tr>";

      //The remainder on it own row across all columns.

      html += "<tr><td id='f" + this.n + "re' colspan='5'></td></tr>";
    }

    //by Col.

    else
    {
      html += "<tr><td>X=</td>";

      //Move to the Left. 

      html += "<td id='f" + this.n + "l' rowspan='5'><input type='button' style='width:100%;height:102px;' value='<' onclick='SFBar.left(" + this.n + ");' /></td>";

      for (var i = 0; i < this.max; i++) { html += this.X[i]; }

      //Move to the Right.

      html += "<td id='f" + this.n + "r' rowspan='5'><input type='button' style='width:100%;height:102px;' value='>' onclick='SFBar.right(" + this.n + ");' /></td>";

      //The reminder as id="f#re" spans -1 col so the split button fits on the last col.

      html += "<td id='f" + this.n + "re' rowspan='4'></td></tr>";

      //Create row "A=".

      html += "<tr><td>A=</td>"; i = 0; for (; i < this.max; i++) { html += this.A[i]; }

      //Create row "B=".

      html += "</tr><tr><td>B=</td>"; i = 0; for (; i < this.max; i++) { html += this.B[i]; }
      
      //Create row "AB".

      html += "</tr><tr><td>Adj</td>"; i = 0; for (; i < this.max; i++) { html += this.AB[i]; }
      
      //Create row "X" clear factors button.

      html += "</tr><tr><td><input style='min-width:100%;' type='button' value='X' onclick='SFBar.clear(" + this.n + ");' /></td>";

      //Individual remove factors.

      i = 0; for (; i < this.max; i++) { html += this.R[i]; }

      //The split button at the end of the fourth column. Fits right under the reminder that spans 3 rows.

      html += "<td><input type='button' style='min-width:100%;' value='Split' onclick='SFBar.split(" + this.n + ");' /></td></tr>";
    }

    //Create body.

    document.getElementById(SFBar.ID[this.n]).innerHTML = html + "</table>";
  }

  //Enable and disable left and right bar navigation.

  if (SFBar.pos[this.n] > 0) { document.getElementById("f" + this.n + "l").style.display = ""; }
  else { document.getElementById("f" + this.n + "l").style.display = "none"; }

  if ((SFBar.pos[this.n] + this.max) >= SFBar.Ref[this.n].length) { document.getElementById("f" + this.n + "r").style.display = "none"; }
  else { document.getElementById("f" + this.n + "r").style.display = ""; }

  //Update Elements. From start to end if defined. Otherwise update all elements.

  var e = Math.min(SFBar.Ref[this.n].length, this.max);

  for (var i = 0; i < e; i++)
  {
    document.getElementById("f" + this.n + "x" + i + "").innerHTML = SFBar.pos[this.n] + i;
    document.getElementById("f" + this.n + "a" + i + "").innerHTML = SFBar.Ref[this.n].a[SFBar.pos[this.n] + i];
    document.getElementById("f" + this.n + "b" + i + "").innerHTML = SFBar.Ref[this.n].b[SFBar.pos[this.n] + i];
  }

  //Enable row and cols. This improves performance as the table body is not reconstructed for the data to display.

  for (; this.enabled < e; this.enabled++)
  {
    if (this.Vertical)
    {
      document.getElementById("f" + this.n + "a" + this.enabled + "").parentElement.parentElement.style.visibility = "";
    }
    else
    {
      var r = document.getElementById("f" + this.n + "").rows;

      r[4].cells[this.enabled + 1].style.visibility = "";
      r[3].cells[this.enabled + 1].style.visibility = "";
      r[2].cells[this.enabled + 1].style.visibility = "";
      r[1].cells[this.enabled + 1].style.visibility = "";
      r[0].cells[this.enabled + 2].style.visibility = "";
    }
  }

  //Disable rows or cols. This improves performance as the table body is not reconstructed for the data to display.

  for (; e < this.enabled; i++, this.enabled--)
  {
    if (this.Vertical)
    {
      document.getElementById("f" + this.n + "a" + i + "").parentElement.parentElement.style.visibility = "hidden";
    }
    else
    {
      var r = document.getElementById("f" + this.n + "").rows;

      r[4].cells[i + 1].style.visibility = "hidden";
      r[3].cells[i + 1].style.visibility = "hidden";
      r[2].cells[i + 1].style.visibility = "hidden";
      r[1].cells[i + 1].style.visibility = "hidden";
      r[0].cells[i + 2].style.visibility = "hidden";
    }
  }

  //Only Update the remaining factor if value is not NaN.

  if (!isNaN(SFBar.Ref[this.n].primitive())) { document.getElementById("f" + this.n + "re").innerHTML = SFBar.Ref[this.n].reValue(); }

  //Otherwise replace it with the create number option.

  else { document.getElementById("f" + this.n + "re").innerHTML = "<input type='button' style='min-width:100%;height:74px;' value='Create Number.' onclick='SFBar.create(" + this.n + ")' />"; }
}

/***********************************************************************
This is a bar for modifying a number and viewing a number after manipulation operations.
Or when number is added to another number this will update as it is linked to the number in memory.
***********************************************************************/

function TFBar( el, Num )
{
  //Check if FL64 is loaded. This is a must.
  
  if (!Number.prototype.bits) { throw new Error("FL64 is not loaded!"); }

  Num = Num || new TNumber();

  //Reference the memory location of the variable given to this bar.

  this.n = STFBar.Ref.length; STFBar.Ref[this.n] = Num; STFBar.ID[this.n] = el; STFBar.Bars[this.n] = this;

  //The bars html. This can not be shared between bars as it is specific to bar reference.

  this.X = []; this.F = []; this.SF = []; this.R = [];

  //Create bar to init size.

  STFBar.pos[this.n] = Math.min(0, Num.length - 6); this.setMax( 6 );
}

STFBar = {
  /***********************************************************************
  Basic constructor for rows and columns with bar. The "#" is bar number, and "*" col number.
  Shared between FBar to save memory. This may eventually be string only when decided on best format and layout.
  ***********************************************************************/

  X: ["<td>X<sup><div style='display: inline;' id='tf", "#", "x", "*", "'></div></sup></td>"
  ],
  F: ["<td>\
  <input type='button' style='float:left;' value='&#x2191;' onclick='STFBar.adjF(","#",",","*",",1);' />\
  <div style='display: inline;' id='tf", "#", "f", "*","'></div>\
  <input type='button' style='float:right;' value='&#x2193;' onclick='STFBar.adjF(" , "#" , "," , "*" , ",-1);' />\
  </td>"
  ],
  SF: ["<td>\
  <input type='button' value='set-F' onclick='STFBar.setF(","#",",","*",");' />\
  </td>"
  ],
  R: ["<td>\
  <input type='button' style='min-width:100%;' value='Remove' onclick='STFBar.remove(" , "#" , ",", "*", ");' />\
  </td>"
  ],

  /***********************************************************************
  Shared properties in order for each bar to work properly on page.
  ***********************************************************************/

  ID: [],
  Ref: [],
  pos: [],

  /***********************************************************************
  The bars methods. For methods that have to invoke, for example the update method after a change.
  ***********************************************************************/

  Bars: [],

  /***********************************************************************
  Passes bar number, and element across.
  ***********************************************************************/

  adjF: function (bar,el,v)
  {
    this.Ref[bar].set(this.pos[bar] + el, Math.max(1,this.Ref[bar].f[this.pos[bar] + el] + v));

    var e = Math.min(STFBar.Ref[bar].length, STFBar.Bars[bar].max), sing = this.Ref[bar].sing, s = 0;

    for (var i = 0; i < e; i++)
    {
      s = ( i % 2 == 0 ) ? sing : -sing;
      document.getElementById("tf" + bar + "f" + i + "").innerHTML = STFBar.Ref[bar].whole + "&div;" + ( s < 0 ? "-" : "" ) + STFBar.Ref[bar].f[STFBar.pos[bar] + i];
    }

    if (!isNaN(this.Ref[bar].primitive())) { document.getElementById("tf" + bar + "re").innerHTML = this.Ref[bar].valueOf(); }

    this.Bars[bar].onChange(this.Ref[bar].calc(0, this.Ref[bar].length - 1));
  },

  /***********************************************************************
  Passes bar number, and element across.
  ***********************************************************************/

  clear: function (bar)
  {
    this.Ref[bar].length = 0; this.Bars[bar].update();

    this.Bars[bar].onChange(this.Ref[bar].calc());
  },

  /***********************************************************************
  Passes bar number, and element across.
  ***********************************************************************/

  remove: function (bar, el)
  {
    this.Ref[bar].remove(this.pos[bar] + el); this.Bars[bar].update();

    this.Bars[bar].onChange(this.Ref[bar].calc());
  },

  /***********************************************************************
  Passes bar number, and element across.
  ***********************************************************************/

  split: function (bar)
  {
    if (isNaN(this.Ref[bar].primitive()))
    {
      this.Ref[bar].split(1);
    }
    else { this.Ref[bar].split(); }

    this.pos[bar] = this.Ref[bar].length - this.Bars[bar].max; this.Bars[bar].update();

    this.Bars[bar].onChange(this.Ref[bar].calc());
  },

  /***********************************************************************
  Creates a Number with current factors if number is NaN.
  ***********************************************************************/

  create: function (bar)
  {
    this.Ref[bar] = new TNumber(this.Ref[bar].calc()).splitAll();

    this.pos[bar] = this.Ref[bar].length - this.Bars[bar].max;

    this.Bars[bar].onCreate(this.Ref[bar]); this.Bars[bar].onChange(this.Ref[bar].primitive());

    this.Bars[bar].update();
  },
  
  /***********************************************************************
  Set A, or B to a value.
  ***********************************************************************/
  
  setF: function(bar, el)
  {
    if( v = prompt("Enter the Value you want to set the factor.") )
    {
      if( isNaN( v = parseInt(v, 10) ) ) { alert("Please enter an valid Number!"); return; }
      
      this.Ref[bar].set(this.pos[bar] + el, v);

      var e = Math.min(STFBar.Ref[bar].length, STFBar.Bars[bar].max), sing = this.Ref[bar].sing, s = 0;

      for (var i = 0; i < e; i++)
      {
        s = ( i % 2 == 0 ) ? sing : -sing;
      document.getElementById("tf" + bar + "f" + i + "").innerHTML = STFBar.Ref[bar].whole + "&div;" + ( s < 0 ? "-" : "" ) + STFBar.Ref[bar].f[STFBar.pos[bar] + i];
      }

      if (!isNaN(this.Ref[bar].primitive())) { document.getElementById("tf" + bar + "re").innerHTML = this.Ref[bar].valueOf(); }

      this.Bars[bar].onChange(this.Ref[bar].calc());
    }
  },

  /***********************************************************************
  Navigate to the left.
  ***********************************************************************/

  left: function (bar) { this.pos[bar] -= this.Bars[bar].max - 1; this.Bars[bar].update(); },

  /***********************************************************************
  Navigate to the right.
  ***********************************************************************/

  right: function (bar) { this.pos[bar] += this.Bars[bar].max - 1; this.Bars[bar].update(); }
};

/***********************************************************************
Pre constructed lines to nth element, for fast bar html creation.
Only necessary when changing orientation.
***********************************************************************/

TFBar.prototype.X = []; //X-n.
TFBar.prototype.F = []; //A-n.
TFBar.prototype.SF = []; //B-n.
TFBar.prototype.R = []; //Remove/Edit.

/***********************************************************************
Create bar cols to max set size.
***********************************************************************/

TFBar.prototype.omax = TFBar.prototype.max = 0; TFBar.prototype.setMax = function (n)
{
  this.max = this.X.length;

  for (var i = 0, s = ""; this.max <= n; this.max++)
  {
    //Iterate the constructors and add a sting together using reference number.

    for (; i < STFBar.X.length; s += STFBar.X[i] + (STFBar.X[i + 1] ? (STFBar.X[i + 1] == "#" ? this.n : this.max) : ""), i += 2); this.X[this.max] = s; i = 0; s = "";
    for (; i < STFBar.F.length; s += STFBar.F[i] + (STFBar.F[i + 1] ? (STFBar.F[i + 1] == "#" ? this.n : this.max) : ""), i += 2); this.F[this.max] = s; i = 0; s = "";
    for (; i < STFBar.SF.length; s += STFBar.SF[i] + (STFBar.SF[i + 1] ? (STFBar.SF[i + 1] == "#" ? this.n : this.max) : ""), i += 2); this.SF[this.max] = s; i = 0; s = "";
    for (; i < STFBar.R.length; s += STFBar.R[i] + (STFBar.R[i + 1] ? (STFBar.R[i + 1] == "#" ? this.n : this.max) : ""), i += 2); this.R[this.max] = s; i = 0; s = "";
  }

  this.max = n;
}

/***********************************************************************
Horizontal, or vertical. Changing orientation means recreating the bar.
***********************************************************************/

TFBar.prototype.V = TFBar.prototype.Vertical = false;

/***********************************************************************
FBar reference number. The element specific to this FBar in shared Ref, and ID.
***********************************************************************/

TFBar.prototype.n = 0;

/***********************************************************************
Set the number, or fraction used with this bar.
***********************************************************************/

TFBar.prototype.set = function (v)
{
  STFBar.Ref[this.n] = v; this.update();

  this.onChange(v.calc());
}

/***********************************************************************
Get the number, or fraction used with this bar.
***********************************************************************/

TFBar.prototype.get = function () { return (STFBar.Ref[this.n]); }

/***********************************************************************
Event that is trigged on creating a new number.
***********************************************************************/

TFBar.prototype.onCreate = function () { }

/***********************************************************************
When user makes changes to a number or fraction.
***********************************************************************/

TFBar.prototype.onChange = function () { }

/***********************************************************************
Auto adjust for best layout on resize event.
***********************************************************************/

TFBar.prototype.auto = function ()
{
  //Vertical or horizontal best fits the screen,

  var w = document.getElementById(STFBar.ID[this.n]).offsetWidth, h = document.getElementById(STFBar.ID[this.n]).offsetHeight;

  this.Vertical = h > w;

  //Number of rows best fit.

  if (this.Vertical) { this.setMax(Math.floor(h / 32) - 5); } else { this.setMax(Math.floor(w / 120) - 3); }

  //If number is NaN. Then automatically split to number of rows, or cols on display.

  if (isNaN(STFBar.Ref[this.n]))
  {
    for (var i = STFBar.Ref[this.n].length; i < this.max; i++) { STFBar.Ref[this.n].split(1); }
  }

  //Update.

  this.update();
}

/***********************************************************************
keep track of enabled rows and cols.
***********************************************************************/

TFBar.prototype.enabled = 0;

/***********************************************************************
Update the component to page element.
Calling this function is only necessary when making changes to a number,
or fraction with custom code, or methods.
***********************************************************************/

TFBar.prototype.update = function (force)
{
  //Adjust position within boundaries.

  STFBar.pos[this.n] = Math.max(0, Math.min(STFBar.pos[this.n], STFBar.Ref[this.n].length - STFBar.Bars[this.n].max));

  //re-Create bar if necessary.

  if (force || this.V != this.Vertical || this.omax != this.max )
  {
    this.V = this.Vertical; this.omax = this.max; this.enabled = this.max;

    //Create bar html body.

    var html = "<table class='" + (this.V ? "FBarV" : "FBarH") + "' id='tf" + this.n + "' border='1px;'>";

    //Across and down by row.

    if (this.Vertical)
    {
      //Columns X, A, B.

      html += "<tr><td>X</td><td>F</td>";
      
      //Set A, or B to a value.
      
      html += "<td>set-F</td>"

      //Remove all factors column with button "X".

      html += "<td><input style='min-width:100%;' type='button' value='X' onclick='STFBar.clear(" + this.n + ");' /></td></tr>";

      //Move Up.

      html += "<tr><td id='tf" + this.n + "l' colspan='5'><input style='min-width:100%;' type='button' value='&#x2191;' onclick='STFBar.left(" + this.n + ");' /></td></tr>";

      //Put each row together in X, F, SF, R. In which R is the button to remove a individual factor.

      for (var i = 0; i < this.max; i++)
      {
        html += "<tr>" + this.X[i] + this.F[i] + this.SF[i] + this.R[i] + "</tr>";
      }

      //Move Down.

      html += "<tr><td id='tf" + this.n + "r' colspan='5'><input style='min-width:100%;' type='button' value='&#x2193;' onclick='STFBar.right(" + this.n + ");' /></td></tr>";

      //The split button at the bottom across all 4 all columns.

      html += "<tr><td colspan='5'><input type='button' style='min-width:100%;' value='Split' onclick='STFBar.split(" + this.n + ");' /></td></tr>";

      //The remainder on it own row across all columns.

      html += "<tr><td id='tf" + this.n + "re' colspan='5'></td></tr>";
    }

    //by Col.

    else
    {
      html += "<tr><td>X=</td>";

      //Move to the Left. 

      html += "<td id='tf" + this.n + "l' rowspan='5'><input type='button' style='width:100%;height:102px;' value='<' onclick='STFBar.left(" + this.n + ");' /></td>";

      for (var i = 0; i < this.max; i++) { html += this.X[i]; }

      //Move to the Right.

      html += "<td id='tf" + this.n + "r' rowspan='5'><input type='button' style='width:100%;height:102px;' value='>' onclick='STFBar.right(" + this.n + ");' /></td>";

      //The reminder as id="f#re" spans -1 col so the split button fits on the last col.

      html += "<td id='tf" + this.n + "re' rowspan='3'></td></tr>";

      //Create row "F=".

      html += "<tr><td>F=</td>"; i = 0; for (; i < this.max; i++) { html += this.F[i]; }
      
      //Create row "SF".

      html += "</tr><tr><td>Adj</td>"; i = 0; for (; i < this.max; i++) { html += this.SF[i]; }
      
      //Create row "X" clear factors button.

      html += "</tr><tr><td><input style='min-width:100%;' type='button' value='X' onclick='STFBar.clear(" + this.n + ");' /></td>";

      //Individual remove factors.

      i = 0; for (; i < this.max; i++) { html += this.R[i]; }

      //The split button at the end of the fourth column. Fits right under the reminder that spans 3 rows.

      html += "<td><input type='button' style='min-width:100%;' value='Split' onclick='STFBar.split(" + this.n + ");' /></td></tr>";
    }

    //Create body.

    document.getElementById(STFBar.ID[this.n]).innerHTML = html + "</table>";
  }

  //Enable and disable left and right bar navigation.

  if (STFBar.pos[this.n] > 0) { document.getElementById("tf" + this.n + "l").style.display = ""; }
  else { document.getElementById("tf" + this.n + "l").style.display = "none"; }

  if ((STFBar.pos[this.n] + this.max) >= STFBar.Ref[this.n].length) { document.getElementById("tf" + this.n + "r").style.display = "none"; }
  else { document.getElementById("tf" + this.n + "r").style.display = ""; }

  //Update Elements. From start to end if defined. Otherwise update all elements.

  var e = Math.min(STFBar.Ref[this.n].length, this.max), sing = STFBar.Ref[this.n].sing, s = 0;

  for (var i = 0; i < e; i++)
  {
    s = ( i % 2 == 0 ) ? sing : -sing;
    document.getElementById("tf" + this.n + "x" + i + "").innerHTML = STFBar.pos[this.n] + i;
    document.getElementById("tf" + this.n + "f" + i + "").innerHTML = STFBar.Ref[this.n].whole + "&div;" + ( s < 0 ? "-" : "" ) + STFBar.Ref[this.n].f[STFBar.pos[this.n] + i];
  }

  //Enable row and cols. This improves performance as the table body is not reconstructed for the data to display.

  for (; this.enabled < e; this.enabled++)
  {
    if (this.Vertical)
    {
      document.getElementById("tf" + this.n + "f" + this.enabled + "").parentElement.parentElement.style.visibility = "";
    }
    else
    {
      var r = document.getElementById("tf" + this.n + "").rows;

      r[3].cells[this.enabled + 1].style.visibility = "";
      r[2].cells[this.enabled + 1].style.visibility = "";
      r[1].cells[this.enabled + 1].style.visibility = "";
      r[0].cells[this.enabled + 2].style.visibility = "";
    }
  }

  //Disable rows or cols. This improves performance as the table body is not reconstructed for the data to display.

  for (; e < this.enabled; i++, this.enabled--)
  {
    if (this.Vertical)
    {
      document.getElementById("tf" + this.n + "f" + i + "").parentElement.parentElement.style.visibility = "hidden";
    }
    else
    {
      var r = document.getElementById("tf" + this.n + "").rows;

      r[3].cells[i + 1].style.visibility = "hidden";
      r[2].cells[i + 1].style.visibility = "hidden";
      r[1].cells[i + 1].style.visibility = "hidden";
      r[0].cells[i + 2].style.visibility = "hidden";
    }
  }

  //Only Update the remaining factor if value is not NaN.

  if (!isNaN(STFBar.Ref[this.n].primitive())) { document.getElementById("tf" + this.n + "re").innerHTML = STFBar.Ref[this.n].valueOf(); }

  //Otherwise replace it with the create number option.

  else { document.getElementById("tf" + this.n + "re").innerHTML = "<input type='button' style='min-width:100%;height:74px;' value='Create Number.' onclick='STFBar.create(" + this.n + ")' />"; }
  }

/***********************************************************************
The convergent bar.
***********************************************************************/

function CBar(el, Num)
{
  //Check if FL64 is loaded. This is a must.

  Num = Num || NaN; if (!Number.prototype.bits) { throw new Error("FL64 is not loaded!"); }

  //Reference the memory location of the variable given to this bar.

  this.n = SCBar.Ref.length; SCBar.Ref[this.n] = Num; SCBar.ID[this.n] = el; SCBar.Bars[this.n] = this;

  //The bars html. This can not be shared between bars as it is specific to bar reference.

  this.X = []; this.F = []; this.Fr = [];

  //Store a copy of the numbers factors.

  for (var i = 0; i < Num.length; i++) { this.Fr[i] = Num.calcF(0, i); }

  //Create bar to init size.

  SCBar.pos[this.n] = Math.min(0, Num.length - 6); this.setMax(6);
}

SCBar = {
  /***********************************************************************
  Basic constructor for rows and columns with bar. The "#" is bar number, and "*" col number.
  Shared between FBar to save memory. This may eventually be string only when decided on best format and layout.
  ***********************************************************************/

  X: ["<td>X<sup><div style='display: inline;' id='c", "#", "x", "*", "'></div></sup></td>"
  ],
  F: ["<td>\
  <div style='display: inline;' id='c", "#", "f", "*", "'></div>\
  </td>"
  ],

  /***********************************************************************
  Shared properties in order for each bar to work properly on page.
  ***********************************************************************/

  ID: [],
  Ref: [],
  pos: [],

  /***********************************************************************
  The bars methods. For methods that have to invoke, for example the update method after a change.
  ***********************************************************************/

  Bars: [],

  /***********************************************************************
  Navigate to the left.
  ***********************************************************************/

  left: function (bar) { this.pos[bar] -= this.Bars[bar].max - 1; this.Bars[bar].update(); },

  /***********************************************************************
  Navigate to the right.
  ***********************************************************************/

  right: function (bar) { this.pos[bar] += this.Bars[bar].max - 1; this.Bars[bar].update(); }
};

/***********************************************************************
A copy of a numbers factors so the convent bar only updates when specified.
***********************************************************************/

CBar.prototype.Fr = [];

/***********************************************************************
Pre constructed lines to nth element, for fast bar html creation.
Only necessary when changing orientation.
***********************************************************************/

CBar.prototype.X = []; //X-n.
CBar.prototype.F = []; //F-n.

/***********************************************************************
Create bar cols to max set size.
***********************************************************************/

CBar.prototype.omax = CBar.prototype.max = 0; CBar.prototype.setMax = function (n)
{
  this.max = this.X.length;

  for (var i = 0, s = ""; this.max <= n; this.max++)
  {
    //Iterate the constructors and add a sting together using reference number.

    for (; i < SCBar.X.length; s += SCBar.X[i] + (SCBar.X[i + 1] ? (SCBar.X[i + 1] == "#" ? this.n : this.max) : ""), i += 2); this.X[this.max] = s; i = 0; s = "";
    for (; i < SCBar.F.length; s += SCBar.F[i] + (SCBar.F[i + 1] ? (SCBar.F[i + 1] == "#" ? this.n : this.max) : ""), i += 2); this.F[this.max] = s; i = 0; s = "";
  }

  this.max = n;
}

/***********************************************************************
Horizontal, or vertical. Changing orientation means recreating the bar.
***********************************************************************/

CBar.prototype.V = CBar.prototype.Vertical = false;

/***********************************************************************
FBar reference number. The element specific to this FBar in shared Ref, and ID.
***********************************************************************/

CBar.prototype.n = 0;

/***********************************************************************
Set the number, or fraction used with this bar.
***********************************************************************/

CBar.prototype.set = function (v)
{
  SCBar.Ref[this.n] = v;

  //A brand new copy of the factors.

  this.Fr = []; for (var i = 0; i < v.length; i++) { this.Fr[i] = v.calcF(0, i); }

  this.update(true);
}

/***********************************************************************
Get the number, or fraction used with this bar.
***********************************************************************/

CBar.prototype.get = function (v) { return (SCBar.Ref[this.n]); }

/***********************************************************************
Auto adjust for best layout on resize event.
***********************************************************************/

CBar.prototype.auto = function ()
{
  var w = document.getElementById(SCBar.ID[this.n]).offsetWidth, h = document.getElementById(SCBar.ID[this.n]).offsetHeight;

  this.Vertical = h > w;

  if (this.Vertical) { this.setMax(Math.floor(h / 32) - 2); } else { this.setMax(Math.floor(w / 180) - 1); }

  this.update();
}

/***********************************************************************
keep track of enabled rows and cols.
***********************************************************************/

CBar.prototype.enabled = 0;

/***********************************************************************
Update the component to page element.
***********************************************************************/

CBar.prototype.update = function (force)
{
  //There is no convergences if value is NaN, or undefined.

  if (isNaN(SCBar.Ref[this.n])) { document.getElementById(SCBar.ID[this.n]).innerHTML = ""; return; }

  //Adjust position within boundaries.

  SCBar.pos[this.n] = Math.max(0, Math.min(SCBar.pos[this.n], this.Fr.length - SCBar.Bars[this.n].max));

  //re-Create bar if necessary.

  if (force || this.V != this.Vertical || this.omax != this.max)
  {
    this.V = this.Vertical; this.omax = this.max; this.enabled = this.max;

    //Create bar html body.

    var html = "<table class='" + (this.V ? "CBarV" : "CBarH") + "' id='c" + this.n + "' border='1px;'>";

    //Across and down by row.

    if (this.Vertical)
    {
      //Convergent row.

      html += "<tr><td colspan='2'>Convergent's.</td></tr>";

      //Move Up.

      html += "<tr><td id='c" + this.n + "l' colspan='2'><input style='min-width:100%;' type='button' value='&#x2191;' onclick='SCBar.left(" + this.n + ");' /></td></tr>";

      //Put each row together in X, F.

      for (var i = 0; i < this.max; i++) { html += "<tr>" + this.X[i] + this.F[i] + "</tr>"; }

      //Move Down.

      html += "<tr><td id='c" + this.n + "r' colspan='2'><input style='min-width:100%;' type='button' value='&#x2193;' onclick='SCBar.right(" + this.n + ");' /></td></tr>";
    }

    //by Col.

    else
    {
      html += "<tr><td rowspan='2'>Convergent's:</td>";

      //Move to the Left. 

      html += "<td id='c" + this.n + "l' rowspan='2'><input type='button' style='width:100%;height:42px;' value='<' onclick='SCBar.left(" + this.n + ");' /></td>";

      //Factor number.

      for (var i = 0; i < this.max; i++) { html += this.X[i]; }

      //Move to the Right.

      html += "<td id='c" + this.n + "r' rowspan='4'><input type='button' style='width:100%;min-height:42px;' value='>' onclick='SCBar.right(" + this.n + ");' /></td>";

      //Create factor row.

      html += "<tr>"; i = 0; for (; i < this.max; i++) { html += this.F[i]; } html += "</tr>";
    }

    //Create body.

    document.getElementById(SCBar.ID[this.n]).innerHTML = html + "</table>";
  }

  //Enable and disable left and right bar navigation.

  if (SCBar.pos[this.n] > 0) { document.getElementById("c" + this.n + "l").style.display = ""; }
  else { document.getElementById("c" + this.n + "l").style.display = "none"; }

  if ((SCBar.pos[this.n] + this.max) >= this.Fr.length) { document.getElementById("c" + this.n + "r").style.display = "none"; }
  else { document.getElementById("c" + this.n + "r").style.display = ""; }

  //Update Elements. From start to end if defined. Otherwise update all elements.

  var e = Math.min(Math.max(0, this.Fr.length - SCBar.pos[this.n]), this.max);

  for (var i = 0; i < e; i++)
  {
    document.getElementById("c" + this.n + "x" + i + "").innerHTML = SCBar.pos[this.n] + i;
    document.getElementById("c" + this.n + "f" + i + "").innerHTML = this.Fr[SCBar.pos[this.n] + i];
  }

  //Enable row and cols. This improves performance as the table body is not reconstructed for the data to display.

  for (; this.enabled < e; this.enabled++)
  {
    if (this.Vertical)
    {
      document.getElementById("c" + this.n + "f" + this.enabled + "").parentElement.parentElement.style.visibility = "";
    }
    else
    {
      var r = document.getElementById("c" + this.n + "").rows;

      r[1].cells[this.enabled].style.visibility = "";
      r[0].cells[this.enabled + 2].style.visibility = "";
    }
  }

  //Disable rows or cols. This improves performance as the table body is not reconstructed for the data to display.

  for (; e < this.enabled; i++, this.enabled-- )
  {
    if (this.Vertical)
    {
      document.getElementById("c" + this.n + "f" + i + "").parentElement.parentElement.style.visibility = "hidden";
    }
    else
    {
      var r = document.getElementById("c" + this.n + "").rows;

      r[1].cells[i].style.visibility = "hidden";
      r[0].cells[i + 2].style.visibility = "hidden";
    }
  }
}

/***********************************************************************
This is a bar for modifying Factors in the FBar. To aid in creating a number, or line up a number.
***********************************************************************/

function TBar(el, FBar)
{
  //Check if FL64 is loaded. This is a must.

  if (!Number.prototype.bits) { throw new Error("FL64 is not loaded!"); }

  //Check if AI Matrix is loaded. This is a must.

  if (!AI_Mat) { throw new Error("AI-Mat is not loaded!"); }

  //Reference the memory location of the variable given to this bar.

  this.n = STBar.Ref.length; STBar.Ref[this.n] = FBar; STBar.ID[this.n] = el; STBar.Bars[this.n] = this;

  //The bars html. This can not be shared between bars as it is specific to bar reference.

  this.D = []; this.A = []; this.B = []; this.CR = [];

  //default Transformation settings.

  this.Ta = [1]; this.Tb = [1]; this.index = 0;

  //Create bar to init size.

  this.setMax(1); this.setMaxIndex(3);
}

STBar = {
  /***********************************************************************
  Basic constructor for rows and columns with bar. The "#" is bar number, and "*" col number.
  Shared between FBar to save memory. This may eventually be string only when decided on best format and layout.
  ***********************************************************************/

  A: ["<td>\
  <input type='button' style='float:left;' value='&#x2191;' onclick='STBar.setA(", "#", ",", "*", ",1);' />\
  <div style='display: inline;' id='t", "#", "a", "*", "'></div>\
  <input type='button' style='float:right;' value='&#x2193;' onclick='STBar.setA(" , "#", ",", "*", ",-1);' />\
  </td>"
  ],
  B: ["<td>\
  <input type='button' style='float:left;' value='&#x2191;' onclick='STBar.setB(", "#", ",", "*", ",1);' />\
  <div style='display: inline;' id='t", "#", "b", "*", "'></div>\
  <input type='button' style='float:right;' value = '&#x2193;' onclick='STBar.setB(" , "#", ",", "*", ",-1);' />\
  </td>"
  ],
  S: ["<option value='", "*", "'>X<sup>", "*", "</sup></option>"],

  /***********************************************************************
  Shared properties in order for each bar to work properly on page.
  ***********************************************************************/

  ID: [],
  Ref: [],

  /***********************************************************************
  The bars methods. For methods that have to invoke, for example the update method after a change.
  ***********************************************************************/

  Bars: [],

  /***********************************************************************
  Passes bar number, and element across.
  ***********************************************************************/

  setA: function (bar, el, v)
  {
    document.getElementById("t" + bar + "a" + el).innerHTML = this.Bars[bar].Ta[el] += v;

    this.Trans(bar);
  },

  /***********************************************************************
  Passes bar number, and element across.
  ***********************************************************************/

  setB: function (bar, el, v)
  {
    document.getElementById("t" + bar + "b" + el).innerHTML = this.Bars[bar].Tb[el] += v;

    this.Trans(bar);
  },

  /***********************************************************************
  Reset transformation factors.
  ***********************************************************************/

  reset: function (bar)
  {
    this.Bars[bar].Ta = [1]; this.Bars[bar].Tb = [1];

    this.Bars[bar].setMax(1); this.Bars[bar].update();
  },

  /***********************************************************************
  Passes bar number, and element across.
  ***********************************************************************/

  remove: function (bar, el)
  {
    this.Bars[bar].Ta.splice(el,1); this.Bars[bar].Tb.splice(el,1);

    this.Bars[bar].setMax(this.Bars[bar].Ta.length); this.Bars[bar].update(); 
  },

  /***********************************************************************
  Add a factor to the end of the transformation bar.
  ***********************************************************************/

  add: function (bar)
  {
    var l = this.Bars[bar].Ta.length; this.Bars[bar].Ta[l] = 0; this.Bars[bar].Tb[l] = 0;

    this.Bars[bar].setMax(l+1); this.Bars[bar].update(); 
  },

  /***********************************************************************
  Set index across the factor bar.
  ***********************************************************************/

  setIndex: function (bar, i)
  {
    i = i.value & -1; this.Bars[bar].index = i;
  },

  /***********************************************************************
  Begin transformation.
  ***********************************************************************/

  Trans: function (bar)
  {
    //Create a sequence of selected dimensions.

    function createFunc(Dims)
    {
      AI_Mat.adjustPMat(Dims.length);

      for(var i = 0; i < Dims.length && Dims[i] == 0; i++ );

      if (i == Dims.length)
      {
        return (function ()
{
  return (0);
});
      }

      eval("var temp = function( s )\r\n{\r\n  var s = s.slice( 0 );\r\n\r\n\
        " + AI_Mat.MkD("s", AI_Mat.PMat.slice(0, Dims.length - 1), true) + "\r\n\
        return( new DSet( s, [ 0 ], [ 0, 0 ] ) );\r\n}" );

      return ((temp(Dims)).getFunc());
    }

    //Transform values.

    var A = createFunc(this.Bars[bar].Ta), B = createFunc(this.Bars[bar].Tb);

    document.getElementById("t"+bar+"r").innerHTML = "<table border='1'><tr><td><center>A</center></td><td><center>B</center></td></tr><tr><td>" + A.toString().html() + "</td><td>" + B.toString().html() + "</td></tr></table>";

    var n = this.Ref[bar]; //The FBar reference.

    SFBar.Ref[n.n] = SFBar.Ref[n.n].Trans(this.Bars[bar].index, A, B);

    SFBar.pos[n.n] = SFBar.Ref[n.n].length - n.max;

    n.update(true); this.Bars[bar].update(); 

    n.onChange(SFBar.Ref[bar].calc(0, SFBar.Ref[bar].length - 1));
  },

  /***********************************************************************
  Force seq of factors.
  ***********************************************************************/

  seq: function (bar)
  {
    //Transform values.

    var n = this.Ref[bar]; //The FBar reference.

    var A = SFBar.Ref[n.n].a, B = SFBar.Ref[n.n].b;

    A = A.slice(this.Bars[bar].index, Math.min(SFBar.Ref[n.n].length, 12));
    B = B.slice(this.Bars[bar].index, Math.min(SFBar.Ref[n.n].length, 12));
		
    AI_Mat.adjustSMat(A.length);

    if ( A.length > 0 )
    {
      eval("var temp = function( s )\r\n{\r\n  var s = s.slice( 0 );\r\n\r\n\
        " + AI_Mat.MkS("s", AI_Mat.SMat.slice(0, A.length - 1), true) + "\r\n\
        return( s );\r\n}" );

      A = temp(A); B = temp(B);

      this.Bars[bar].set(A, B);
    }
  }
};

/***********************************************************************
Pre constructed lines to nth element, for simplified bar creation.
***********************************************************************/

TBar.prototype.A = []; //A-n.
TBar.prototype.B = []; //B-n.
TBar.prototype.S = ""; //The select index.

/***********************************************************************
The bars transformation bar settings.
***********************************************************************/

TBar.prototype.Ta = []; TBar.prototype.Tb = [];

/***********************************************************************
Create bar cols to max set size.
***********************************************************************/

TBar.prototype.omax = TBar.prototype.max = 0; TBar.prototype.setMax = function (n)
{
  this.max = this.D.length;

  for (var i = 0, s = ""; this.max <= n; this.max++)
  {
    //Iterate the constructors and add a sting together using reference number.

    for (; i < STBar.A.length; s += STBar.A[i] + (STBar.A[i + 1] ? (STBar.A[i + 1] == "#" ? this.n : this.max) : ""), i += 2); this.A[this.max] = s; i = 0; s = "";
    for (; i < STBar.B.length; s += STBar.B[i] + (STBar.B[i + 1] ? (STBar.B[i + 1] == "#" ? this.n : this.max) : ""), i += 2); this.B[this.max] = s; i = 0; s = "";
  }

  this.max = n;
}

/***********************************************************************
Max index for the selection bar.
***********************************************************************/

TBar.prototype.index = TBar.prototype.maxIndex = 0; TBar.prototype.setMaxIndex = function (n)
{
  this.maxIndex = this.S.length;

  for (var i = 0, s = ""; this.maxIndex <= n; this.maxIndex++)
  {
    //Iterate the constructors and add a sting together using reference number.

    for (; i < STBar.S.length; s += STBar.S[i] + (STBar.S[i + 1] ? (STBar.S[i + 1] == "#" ? this.n : this.maxIndex) : ""), i += 2); this.S += s; i = 0; s = "";
  }
}

/***********************************************************************
FBar reference number. The element specific to this FBar in shared Ref, and ID.
***********************************************************************/

TBar.prototype.n = 0;

/***********************************************************************
Set a transformation.
***********************************************************************/

TBar.prototype.set = function (a, b)
{
	//Trim out 0.
	
  for (var i1 = a.length - 1; i1 > 0 && a[i1] == 0; i1--); for (var i2 = b.length - 1; i2 > 0 && b[i2] == 0; i2--);

  a = a.slice(0, Math.max(i1, i2) + 1); b = b.slice(0, a.length);
	
  this.setMaxIndex(this.index); this.setMax(a.length);

  this.Ta = a; this.Tb = b; STBar.Trans(this.n);
}

/***********************************************************************
Update the component to page element.
Calling this function is only necessary when making changes to a number,
or fraction with custom code, or methods.
***********************************************************************/

TBar.prototype.update = function (force)
{
  //re-Create bar if necessary.

  if (force || this.omax != this.max)
  {
    this.omax = this.max;

    //Create bar html body.

    var html = "<table style='display:inline-block;' class='TBar' id='t" + this.n + "' border='1px;'>";

    //Add selection.

    html += "<tr><td rowspan='3'><select id='ts" + this.n + "' onchange='STBar.setIndex(" + this.n + ",this);'>" + this.S + "</select>";

    //by Col.

    html += "<td>Dim</td>"; for (var i = 0; i < this.max; i++) { html += "<td>D<sup>" + i + "</sup></td>"; }

    //Transform function output.

    var r = document.getElementById("t" + this.n + "r");

    html += "<td id='t" + this.n + "r' rowspan='4'>" + (r ? r.innerHTML : "") + "</td></tr>";

    //Create row "A=".

    html += "<tr><td>A=</td>"; i = 0; for (; i < this.max; i++) { html += this.A[i]; }

    //Create row "B=".

    html += "</tr><tr><td>B=</td>"; i = 0; for (; i < this.max; i++) { html += this.B[i]; }

    //Seq current factors.

    html += "</tr><tr><td><input type='button' style='min-width:100%;' value='Seq' onclick='STBar.seq( " + this.n + " );' /></td>";

    //Reset.

    html += "<td><input type='button' style='min-width:100%;' value='X' onclick='STBar.reset(" + this.n + ");' /></td>";

    //Individually remove factors.

    i = 0; for (; i < (this.max - 1); i++) { html += "<td><input type='button' style='min-width:100%;' value='Remove' onclick='STBar.remove(" + this.n + "," + i + ");' /></td>"; }

    //Add a factor.

    html += "<td><input type='button' style='min-width:100%;' value='Add' onclick='STBar.add(" + this.n + ");' /></td></tr></table>";

    //Create body.

    document.getElementById(STBar.ID[this.n]).innerHTML = html + "";
  }

  //Set selected index.

  document.getElementById("ts" + this.n).value = this.index;

  //Update Transformation Elements.

  for (var i = 0; i < STBar.Bars[this.n].max; i++)
  {
    document.getElementById("t" + this.n + "a" + i + "").innerHTML = STBar.Bars[this.n].Ta[i];
    document.getElementById("t" + this.n + "b" + i + "").innerHTML = STBar.Bars[this.n].Tb[i];
  }
}

/***********************************************************************
This is a bar for modifying Factors in the TFBar. To aid in creating a number, or line up a number.
***********************************************************************/

function TTBar(el, FBar)
{
  //Check if FL64 is loaded. This is a must.

  if (!Number.prototype.bits) { throw new Error("FL64 is not loaded!"); }

  //Check if AI Matrix is loaded. This is a must.

  if (!AI_Mat) { throw new Error("AI-Mat is not loaded!"); }

  //Reference the memory location of the variable given to this bar.

  this.n = STTBar.Ref.length; STTBar.Ref[this.n] = FBar; STTBar.ID[this.n] = el; STTBar.Bars[this.n] = this;

  //The bars html. This can not be shared between bars as it is specific to bar reference.

  this.D = []; this.F = []; this.CR = [];

  //default Transformation settings.

  this.Tf = [1,1]; this.index = 0;

  //Create bar to init size.

  this.setMax(2); this.setMaxIndex(3);
}

STTBar = {
  /***********************************************************************
  Basic constructor for rows and columns with bar. The "#" is bar number, and "*" col number.
  Shared between FBar to save memory. This may eventually be string only when decided on best format and layout.
  ***********************************************************************/

  F: ["<td>\
  <input type='button' style='float:left;' value='&#x2191;' onclick='STTBar.setF(", "#", ",", "*", ",1);' />\
  <div style='display: inline;' id='tt", "#", "f", "*", "'></div>\
  <input type='button' style='float:right;' value='&#x2193;' onclick='STTBar.setF(" , "#", ",", "*", ",-1);' />\
  </td>"
  ],
  S: ["<option value='", "*", "'>X<sup>", "*", "</sup></option>"],

  /***********************************************************************
  Shared properties in order for each bar to work properly on page.
  ***********************************************************************/

  ID: [],
  Ref: [],

  /***********************************************************************
  The bars methods. For methods that have to invoke, for example the update method after a change.
  ***********************************************************************/

  Bars: [],

  /***********************************************************************
  Passes bar number, and element across.
  ***********************************************************************/

  setF: function (bar, el, v)
  {
    this.Bars[bar].Tf[el] += v;
    
    if( this.Bars[bar].Tf[el] < 0 ) { this.Bars[bar].Tf[el] = 0; }
    
    document.getElementById("tt" + bar + "f" + el).innerHTML = this.Bars[bar].Tf[el];

    this.Trans(bar);
  },

  /***********************************************************************
  Reset transformation factors.
  ***********************************************************************/

  reset: function (bar)
  {
    this.Bars[bar].Tf = [1,1];

    this.Bars[bar].setMax(2); this.Bars[bar].update();
  },

  /***********************************************************************
  Passes bar number, and element across.
  ***********************************************************************/

  remove: function (bar, el)
  {
    if(this.Bars[bar].Tf.length > 2 )
    {
      this.Bars[bar].Tf.splice(el,1);

      this.Bars[bar].setMax(this.Bars[bar].Tf.length); this.Bars[bar].update();
    }
  },

  /***********************************************************************
  Add a factor to the end of the transformation bar.
  ***********************************************************************/

  add: function (bar)
  {
    var l = this.Bars[bar].Tf.length; this.Bars[bar].Tf[l] = 0;

    this.Bars[bar].setMax(l+1); this.Bars[bar].update(); 
  },

  /***********************************************************************
  Set index across the factor bar.
  ***********************************************************************/

  setIndex: function (bar, i)
  {
    i = i.value & -1; this.Bars[bar].index = i;
  },

  /***********************************************************************
  Begin transformation.
  ***********************************************************************/

  Trans: function (bar)
  {
    //Create a sequence of selected dimensions.

    function createFunc(Dims)
    {
      AI_Mat.adjustPMat(Dims.length);

      for(var i = 0; i < Dims.length && Dims[i] == 0; i++ );

      if (i == Dims.length)
      {
        return (function ()
{
  return (0);
});
      }

      eval("var temp = function( s )\r\n{\r\n  var s = s.slice( 0 );\r\n\r\n\
        " + AI_Mat.MkD("s", AI_Mat.PMat.slice(0, Dims.length - 1), true) + "\r\n\
        return( new DSet( s, [ 0 ], [ 0, 0 ] ) );\r\n}" );

      return ((temp(Dims)).getFunc());
    }

    //Transform values.

    var nF = createFunc(this.Bars[bar].Tf);

    document.getElementById("tt"+bar+"r").innerHTML = "<table border='1'><tr><td><center>F</center></td></tr><tr><td>" + nF.toString().html() + "</td></tr></table>";

    var n = this.Ref[bar]; //The FBar reference.

    STFBar.Ref[n.n] = STFBar.Ref[n.n].Trans(this.Bars[bar].index, nF );

    STFBar.pos[n.n] = STFBar.Ref[n.n].length - n.max;

    n.update(true); this.Bars[bar].update(); 

    n.onChange(STFBar.Ref[bar].calc(0, STFBar.Ref[bar].length - 1));
  },

  /***********************************************************************
  Force seq of factors.
  ***********************************************************************/

  seq: function (bar)
  {
    //Transform values.

    var n = this.Ref[bar]; //The FBar reference.

    var F = STFBar.Ref[n.n].f;

    F = F.slice(this.Bars[bar].index, Math.min(STFBar.Ref[n.n].length, 12));
		
    AI_Mat.adjustSMat(F.length);

    if ( F.length > 0 )
    {
      eval("var temp = function( s )\r\n{\r\n  var s = s.slice( 0 );\r\n\r\n\
        " + AI_Mat.MkS("s", AI_Mat.SMat.slice(0, F.length - 1), true) + "\r\n\
        return( s );\r\n}" );

      F = temp(F);

      this.Bars[bar].set(F);
    }
  }
};

/***********************************************************************
Pre constructed lines to nth element, for simplified bar creation.
***********************************************************************/

TTBar.prototype.F = []; //F-n.
TTBar.prototype.S = ""; //The select index.

/***********************************************************************
The bars transformation bar settings.
***********************************************************************/

TTBar.prototype.Tf = [1,1];

/***********************************************************************
Create bar cols to max set size.
***********************************************************************/

TTBar.prototype.omax = TTBar.prototype.max = 0; TTBar.prototype.setMax = function (n)
{
  this.max = this.D.length;

  for (var i = 0, s = ""; this.max <= n; this.max++)
  {
    //Iterate the constructors and add a sting together using reference number.

    for (; i < STTBar.F.length; s += STTBar.F[i] + (STTBar.F[i + 1] ? (STTBar.F[i + 1] == "#" ? this.n : this.max) : ""), i += 2); this.F[this.max] = s; i = 0; s = "";
  }

  this.max = n;
}

/***********************************************************************
Max index for the selection bar.
***********************************************************************/

TTBar.prototype.index = TTBar.prototype.maxIndex = 0; TTBar.prototype.setMaxIndex = function (n)
{
  this.maxIndex = this.S.length;

  for (var i = 0, s = ""; this.maxIndex <= n; this.maxIndex++)
  {
    //Iterate the constructors and add a sting together using reference number.

    for (; i < STTBar.S.length; s += STTBar.S[i] + (STTBar.S[i + 1] ? (STTBar.S[i + 1] == "#" ? this.n : this.maxIndex) : ""), i += 2); this.S += s; i = 0; s = "";
  }
}

/***********************************************************************
FBar reference number. The element specific to this FBar in shared Ref, and ID.
***********************************************************************/

TTBar.prototype.n = 0;

/***********************************************************************
Set a transformation.
***********************************************************************/

TTBar.prototype.set = function (f)
{
	//Trim out 0.
	
  for (var i1 = f.length - 1; i1 > 0 && f[i1] == 0; i1--);

  f = f.slice(0, i1 + 1);
	
  this.setMaxIndex(this.index); this.setMax(f.length);

  this.Tf = f; STTBar.Trans(this.n);
}

/***********************************************************************
Update the component to page element.
Calling this function is only necessary when making changes to a number,
or fraction with custom code, or methods.
***********************************************************************/

TTBar.prototype.update = function (force)
{
  //re-Create bar if necessary.

  if (force || this.omax != this.max)
  {
    this.omax = this.max;

    //Create bar html body.

    var html = "<table style='display:inline-block;' class='TBar' id='tt" + this.n + "' border='1px;'>";

    //Add selection.

    html += "<tr><td rowspan='2'><select id='ts" + this.n + "' onchange='STTBar.setIndex(" + this.n + ",this);'>" + this.S + "</select>";

    //by Col.

    html += "<td>Dim</td>"; for (var i = 0; i < this.max; i++) { html += "<td>D<sup>" + i + "</sup></td>"; }

    //Transform function output.

    var r = document.getElementById("tt" + this.n + "r");

    html += "<td id='tt" + this.n + "r' rowspan='3'>" + (r ? r.innerHTML : "") + "</td></tr>";

    //Create row "F=".

    html += "<tr><td>F=</td>"; i = 0; for (; i < this.max; i++) { html += this.F[i]; }

    //Seq current factors.

    html += "</tr><tr><td><input type='button' style='min-width:100%;' value='Seq' onclick='STTBar.seq( " + this.n + " );' /></td>";

    //Reset.

    html += "<td><input type='button' style='min-width:100%;' value='X' onclick='STTBar.reset(" + this.n + ");' /></td>";

    //Individually remove factors.

    i = 0; for (; i < (this.max - 1); i++) { html += "<td><input type='button' style='min-width:100%;' value='Remove' onclick='STTBar.remove(" + this.n + "," + i + ");' /></td>"; }

    //Add a factor.

    html += "<td><input type='button' style='min-width:100%;' value='Add' onclick='STTBar.add(" + this.n + ");' /></td></tr></table>";

    //Create body.

    document.getElementById(STTBar.ID[this.n]).innerHTML = html + "";
  }

  //Set selected index.

  document.getElementById("ts" + this.n).value = this.index;

  //Update Transformation Elements.

  for (var i = 0; i < STTBar.Bars[this.n].max; i++)
  {
    document.getElementById("tt" + this.n + "f" + i + "").innerHTML = STTBar.Bars[this.n].Tf[i];
  }
}
