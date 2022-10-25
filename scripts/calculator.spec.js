const buffer = require('./calculator').buffer;

describe('Buffer object', () => {
  it('should contains these properties', () => {
    expect(buffer).toHaveProperty('number');
    expect(buffer).toHaveProperty('op');
    expect(buffer).toHaveProperty('calc');
  });

  it('should have num property equals null', () => {
    expect(buffer.num).toBe(null);
  });

  it('should have operator property equals null', () => {
    expect(buffer.operator).toBe(null);
  });

  it('should have calc property returning a function', () => {
    expect(buffer.calc).toBeInstanceOf(Function);
  });

  describe('Buffer.calc property', () => {
    it('should return a number', () => {
      buffer.num = 5;
      buffer.operator = '+';
      expect(typeof buffer.calc(3)).toBe('number');
    });

    it('should perform sum operation', () => {
      buffer.num = 5;
      buffer.operator = '+';
      expect(buffer.calc(3)).toBe(8);
    });

    it('should perform subtraction operation', () => {
      buffer.num = 5;
      buffer.operator = '-';
      expect(buffer.calc(3)).toBe(2);

      buffer.num = 1;
      expect(buffer.calc(3)).toBe(-2);
    });

    it('should perform division operation', () => {
      buffer.num = 5;
      buffer.operator = '/';
      expect(buffer.calc(3)).toBe(1.666666666666667);

      buffer.num = 9;
      expect(buffer.calc(3)).toBe(3);
    });

    it('should perform multiplication operation', () => {
      buffer.num = 5;
      buffer.operator = '*';
      expect(buffer.calc(3)).toBe(15);

      buffer.num = 0;
      expect(buffer.calc(3)).toBe(0);
    });

    it('should throw error on division by zero', () => {
      buffer.num = 5;
      buffer.operator = '/';
      expect(() => buffer.calc(0)).toThrow('Division by zero attempt');
    });

    it('should limit decimal places to maximum of 15', () => {
      buffer.num = 7;
      buffer.operator = '/';
      expect(buffer.calc(10005)).toBe(0.000699650174913);

      buffer.num = 5 / 3;
      buffer.operator = '+';
      expect(buffer.calc(5 / 9)).toBe(2.222222222222222);
    });
  });

  describe('Set num property', () => {
    it('should throw error if undefined', () => {
      expect(() => (buffer.num = undefined)).toThrow(
        'Number cannot be set to undefined'
      );
    });

    it('should throw error if not a number', () => {
      expect(() => (buffer.num = [])).toThrow('Not a number');
    });
  });

  describe('Set operator property', () => {
    it('should throw error if buffer.num not set', () => {
      buffer.num = null;
      expect(() => (buffer.operator = '*')).toThrow(
        'Unable to set operator: no number in buffer'
      );
    });

    it('should throw error if not a valid operator', () => {
      buffer.num = 10;
      expect(() => (buffer.operator = '$')).toThrow('Invalid operator: $');
    });
  });

  describe('Clear method', () => {
    it('should set num and operator properties to null', () => {
      buffer.num = 7;
      buffer.operator = '-';
      buffer.clear();
      expect(buffer.num).toBe(null);
      expect(buffer.operator).toBe(null);
    });
  });
});
