function sum(a: number, b: number) {
    return a + b;
}

// 用+会导致jestrunner单个运行匹配不上
test('adds 1 + 33 to equal 33', () => {
    expect(sum(1, 3)).toBe(3);
});

test('adds 1 plus 33 to equal 33', () => {
    expect(sum(1, 2)).toBe(3);
});