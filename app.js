function y() {
    a = 7;
    function x() {
        console.log(a);
    }
    a = 100;
    return x;
}

y()();
