export function sum(a: number, b: number) {
    return a + b;
}

export function capitalizeIfString(value: string | null) {
    if (value === null) {
        return null;
    }

    return value.charAt(0).toUpperCase() + value.slice(1);
}

export function reverseCopyArray(array: number[]) {
    return [...array].reverse();
}

export function fibonacci(n: number): number {
    if (n === 0 || n === 1) {
        return n;
    }

    return fibonacci(n - 1) + fibonacci(n - 2);
}
