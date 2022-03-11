const Fac = (n) => {
    if (n <= 1) return 1
    else return n * Fac(n - 1)
}

const Fib = (n) => {
    if (n <= 1) return 1
    return Fib(n - 1) + Fib(n - 2)
}

console.log(Fib(5));