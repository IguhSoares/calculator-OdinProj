const buffer = require('./calculator').buffer;

describe('Buffer object', () => {
  it('should contains these properties', () => {
    expect(buffer).toHaveProperty('num');
    expect(buffer).toHaveProperty('operand');
    expect(buffer).toHaveProperty('calc');
  });

  it('should have num property equals null', () => {
    expect(buffer.num).toBe(null);
  });

  it('should have operand property equals null', () => {
    expect(buffer.operand).toBe(null);
  });

  it('should have calc property returning a function', () => {
    expect(buffer.calc).toBeInstanceOf(Function);
  });

  describe('Buffer.calc property', () => {
    it('should return a number', () => {
      buffer.num = 5;
      buffer.operand = '+';
      expect(typeof buffer.calc(3)).toBe('number');
    });

    it('should perform sum operation', () => {
      buffer.num = 5;
      buffer.operand = '+';
      expect(buffer.calc(3)).toBe(8);
    });

    it('should perform subtraction operation', () => {
      buffer.num = 5;
      buffer.operand = '-';
      expect(buffer.calc(3)).toBe(2);

      buffer.num = 1;
      expect(buffer.calc(3)).toBe(-2);
    });

    it('should perform division operation', () => {
      buffer.num = 5;
      buffer.operand = '/';
      expect(buffer.calc(3)).toBe(1.6666666666666667);

      buffer.num = 9;
      expect(buffer.calc(3)).toBe(3);
    });

    it('should perform multiplication operation', () => {
      buffer.num = 5;
      buffer.operand = '*';
      expect(buffer.calc(3)).toBe(15);

      buffer.num = 0;
      expect(buffer.calc(3)).toBe(0);
    });
  });
});
