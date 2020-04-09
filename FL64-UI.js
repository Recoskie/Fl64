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
  <input type='button' style='float:left;' value='&#x2191;' onclick='SFBar.setA(","#",",","*",",1);' />\
  <div style='display: inline;' id='f", "#", "a", "*","'></div>\
  <input type='button' style='float:right;' value='&#x2193;' onclick='SFBar.setA(" , "#" , "," , "*" , ",-1);' />\
  </td>"
  ],
  B: ["<td>\
  <input type='button' style='float:left;' value='&#x2191;' onclick='SFBar.setB(", "#", ",", "*", ",1);' />\
  <div style='display: inline;' id='f", "#", "b", "*", "'></div>\
  <input type='button' style='float:right;' value = '&#x2193;' onclick='SFBar.setB(" , "#", ",", "*", ",-1);' />\
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

  setA: function (bar,el,v)
  {
    this.Ref[bar].setA(this.pos[bar] + el, this.Ref[bar].a[this.pos[bar] + el] + v);
    document.getElementById("f" + bar + "a" + el).innerHTML = this.Ref[bar].a[this.pos[bar] + el];
    document.getElementById("f" + bar + "re").innerHTML = this.Ref[bar].reValue();

    this.Bars[bar].onChange(this.Ref[bar].calc(0, this.Ref[bar].length - 1));
  },

  /***********************************************************************
  Passes bar number, and element across.
  ***********************************************************************/

  setB: function (bar, el,v)
  {
    this.Ref[bar].setB(this.pos[bar] + el, this.Ref[bar].b[this.pos[bar] + el] + v);
    document.getElementById("f" + bar + "b" + el).innerHTML = this.Ref[bar].b[this.pos[bar] + el];
    document.getElementById("f" + bar + "re").innerHTML = this.Ref[bar].reValue();

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

      //Remove all factors column with button "X".

      html += "<td><input style='min-width:100%;' type='button' value='X' onclick='SFBar.clear(" + this.n + ");' /></td></tr>";

      //Move Up.

      html += "<tr><td id='f" + this.n + "l' colspan='4'><input style='min-width:100%;' type='button' value='&#x2191;' onclick='SFBar.left(" + this.n + ");' /></td></tr>";

      //Put each row together in X, A, B, R. In which R is the button to remove a individual factor.

      for (var i = 0; i < this.max; i++) { html += "<tr>" + this.X[i] + this.A[i] + this.B[i] + this.R[i] + "</tr>"; }

      //Move Down.

      html += "<tr><td id='f" + this.n + "r' colspan='4'><input style='min-width:100%;' type='button' value='&#x2193;' onclick='SFBar.right(" + this.n + ");' /></td></tr>";

      //The split button at the bottom across all 4 all columns.

      html += "<tr><td colspan='4'><input type='button' style='min-width:100%;' value='Split' onclick='SFBar.split(" + this.n + ");' /></td></tr>";

      //The remainder on it own row across all columns.

      html += "<tr><td id='f" + this.n + "re' colspan='4'></td></tr>";
    }

    //by Col.

    else
    {
      html += "<tr><td>X=</td>";

      //Move to the Left. 

      html += "<td id='f" + this.n + "l' rowspan='4'><input type='button' style='width:100%;height:102px;' value='<' onclick='SFBar.left(" + this.n + ");' /></td>";

      for (var i = 0; i < this.max; i++) { html += this.X[i]; }

      //Move to the Right.

      html += "<td id='f" + this.n + "r' rowspan='4'><input type='button' style='width:100%;min-height:102px;' value='>' onclick='SFBar.right(" + this.n + ");' /></td>";

      //The reminder as id="f#re" spans -1 col so the split button fits on the last col.

      html += "<td id='f" + this.n + "re' rowspan='3'></td></tr>";

      //Create row "A=".

      html += "<tr><td>A=</td>"; i = 0; for (; i < this.max; i++) { html += this.A[i]; }

      //Create row "B=".

      html += "</tr><tr><td>B=</td>"; i = 0; for (; i < this.max; i++) { html += this.B[i]; }

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

  this.update();
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

    html += "<tr><td rowspan='4'><select id='ts" + this.n + "' onchange='STBar.setIndex(" + this.n + ",this);'>" + this.S + "</select>";

    //by Col.

    html += "<td>Dim</td>"; for (var i = 0; i < this.max; i++) { html += "<td>D<sup>" + i + "</sup></td>"; }

    //Transform function output.

    var r = document.getElementById("t" + this.n + "r");

    html += "<td id='t" + this.n + "r' rowspan='4'>" + (r ? r.innerHTML : "") + "</td></tr>";

    //Create row "A=".

    html += "<tr><td>A=</td>"; i = 0; for (; i < this.max; i++) { html += this.A[i]; }

    //Create row "B=".

    html += "</tr><tr><td>B=</td>"; i = 0; for (; i < this.max; i++) { html += this.B[i]; }

    //Reset.

    html += "</tr><tr><td><input type='button' style='min-width:100%;' value='X' onclick='STBar.reset(" + this.n + ");' /></td>";

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
