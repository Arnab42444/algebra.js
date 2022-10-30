var isInt = require('./helper').isInt;

var Fraction = function(a, b) {
    if (isInt(a) && isInt(b) && b) {
        this.numer = a;
        this.denom = b;
    }
};

var gcd = require('./helper').gcd;
var lcm = require('./helper').lcm;

Fraction.prototype.copy = function() {
    return new Fraction(this.numer, this.denom);
};

Fraction.prototype.reduce = function() {
    var copy = this.copy();

    var g = gcd(copy.numer, copy.denom);
    copy.numer = copy.numer / g;
    copy.denom = copy.denom / g;

    if (Math.sign(copy.denom) == -1 && Math.sign(copy.numer) == 1) {
        copy.numer *= -1;
        copy.denom *= -1;
    }

    return copy;
};

Fraction.prototype.add = function(f) {
    var a, b;

    if (f instanceof Fraction) {
        a = f.numer;
        b = f.denom;
    } else if (isInt(f)) {
        a = f;
        b = 1;
    } else {
        return;
    }

    var copy = this.copy();

    if (this.denom == b) {
        copy.numer += a;
    } else {
        var m = lcm(copy.denom, b);
        var thisM = m / copy.denom;
        var otherM = m / b;

        copy.numer *= thisM;
        copy.denom *= thisM;

        a *= otherM;

        copy.numer += a;
    }

    return copy;
};

Fraction.prototype.subtract = function(f) {
    var copy = this.copy();

    if (f instanceof Fraction) {
        return copy.add(new Fraction(-f.numer, f.denom));
    } else if (isInt(f)) {
        return copy.add(new Fraction(-f, 1));
    }
};

Fraction.prototype.multiply = function(f) {
    var a, b;

    if (f instanceof Fraction) {
        a = f.numer;
        b = f.denom;
    } else if (isInt(f) && f) {
        a = f;
        b = 1;
    } else if (f == 0) {
        a = 0;
        b = 1;
    } else {
        return;
    }

    var copy = this.copy();

    copy.numer *= a;
    copy.denom *= b;

    return copy;
};

Fraction.prototype.divide = function(f) {
    if (f == 0) {
        return;
    }

    var copy = this.copy();

    if (f instanceof Fraction) {
        return copy.multiply(new Fraction(f.denom, f.numer));
    } else if (isInt(f)) {
        return copy.multiply(new Fraction(1, f));
    }
};

Fraction.prototype.abs = function() {
    var copy = this.copy();
    copy = copy.reduce();
    copy.numer = Math.abs(copy.numer);
    return copy;
};

Fraction.prototype.decimal = function() {
    return this.numer / this.denom;
};

Fraction.prototype.print = function() {
    if (this.numer == 0) {
        return "0";
    } else if (this.denom == 1) {
        return this.numer.toString();
    } else if (this.denom == -1) {
        var num = this.numer * -1;
        return num.toString();
    } else {
        return this.numer + "/" + this.denom;
    }
};

Fraction.prototype.tex = function() {
    if (this.numer == 0) {
        return "0";
    } else if (this.denom == 1) {
        return this.numer.toString();
    } else if (this.denom == -1) {
        var num = this.numer * -1;
        return num.toString();
    } else {
        return "\\frac{" + this.numer + "}{" + this.denom + "}";
    }
};

module.exports = Fraction;