const { Buffer } = require('./buffer');

describe('Buffer object', () => {
  it('should contains these properties', () => {
    expect(Buffer).toHaveProperty('num');
    expect(Buffer).toHaveProperty('operator');
    expect(Buffer).toHaveProperty('calc');
  });

  it('should have num property equals null', () => {
    expect(Buffer.num).toBe(null);
  });

  it('should have operator property equals null', () => {
    expect(Buffer.operator).toBe(null);
  });

  it('should have calc property returning a function', () => {
    expect(Buffer.calc).toBeInstanceOf(Function);
  });

  describe('Buffer.calc property', () => {
    it('should return a number', () => {
      Buffer.num = 5;
      Buffer.operator = '+';
      expect(typeof Buffer.calc(3)).toBe('number');
    });

    it('should perform sum operation', () => {
      Buffer.num = 5;
      Buffer.operator = '+';
      expect(Buffer.calc(3)).toBe(8);
    });

    it('should perform subtraction operation', () => {
      Buffer.num = 5;
      Buffer.operator = '-';
      expect(Buffer.calc(3)).toBe(2);

      Buffer.num = 1;
      expect(Buffer.calc(3)).toBe(-2);
    });

    it('should perform division operation', () => {
      Buffer.num = 5;
      Buffer.operator = '/';
      expect(Buffer.calc(3)).toBe(1.666666666666667);

      Buffer.num = 9;
      expect(Buffer.calc(3)).toBe(3);
    });

    it('should perform multiplication operation', () => {
      Buffer.num = 5;
      Buffer.operator = '*';
      expect(Buffer.calc(3)).toBe(15);

      Buffer.num = 0;
      expect(Buffer.calc(3)).toBe(0);
    });

    it('should throw error on division by zero', () => {
      Buffer.num = 5;
      Buffer.operator = '/';
      expect(() => Buffer.calc(0)).toThrow('Division by zero attempt');
    });

    it('should limit decimal places to maximum of 15', () => {
      Buffer.num = 7;
      Buffer.operator = '/';
      expect(Buffer.calc(10005)).toBe(0.000699650174913);

      Buffer.num = 5 / 3;
      Buffer.operator = '+';
      expect(Buffer.calc(5 / 9)).toBe(2.222222222222222);
    });
  });

  describe('Set num property', () => {
    it('should throw error if undefined', () => {
      expect(() => (Buffer.num = undefined)).toThrow(
        'Number cannot be set to undefined'
      );
    });

    it('should throw error if not a number', () => {
      expect(() => (Buffer.num = [])).toThrow('Not a number');
    });
  });

  describe('Set operator property', () => {
    it('should throw error if buffer.num not set', () => {
      Buffer.num = null;
      expect(() => (Buffer.operator = '*')).toThrow(
        'Unable to set operator: no number in buffer'
      );
    });

    it('should throw error if not a valid operator', () => {
      Buffer.num = 10;
      expect(() => (Buffer.operator = '$')).toThrow('Invalid operator: $');
    });
  });

  describe('Clear method', () => {
    it('should set num and operator properties to null', () => {
      Buffer.num = 7;
      Buffer.operator = '-';
      Buffer.clear();
      expect(Buffer.num).toBe(null);
      expect(Buffer.operator).toBe(null);
    });
  });

  describe('add method', () => {
    it('should set buffer.num', () => {
      Buffer.add(127.74);
      expect(Buffer.num).toBe(127.74);
    });

    it('should set buffer.operator', () => {
      Buffer.add('*');
      expect(Buffer.operator).toBe('*');
    });
  });
});
