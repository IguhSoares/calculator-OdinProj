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
      Buffer.add(5);
      Buffer.add('+');
      expect(typeof Buffer.calc(3)).toBe('number');
    });

    it('should perform sum operation', () => {
      Buffer.add(5);
      Buffer.add('+');
      expect(Buffer.calc(3)).toBe(8);
    });

    it('should perform subtraction operation', () => {
      Buffer.add(5);
      Buffer.add('-');
      expect(Buffer.calc(3)).toBe(2);

      Buffer.add(1);
      expect(Buffer.calc(3)).toBe(-2);
    });

    it('should perform division operation', () => {
      Buffer.add(5);
      Buffer.add('/');
      expect(Buffer.calc(3)).toBe(1.66666666666667);

      Buffer.add(9);
      expect(Buffer.calc(3)).toBe(3);
    });

    it('should perform multiplication operation', () => {
      Buffer.add(5);
      Buffer.add('*');
      expect(Buffer.calc(3)).toBe(15);

      Buffer.add(0);
      expect(Buffer.calc(3)).toBe(0);
    });

    it('should throw error on division by zero', () => {
      Buffer.add(5);
      Buffer.add('/');
      expect(() => Buffer.calc(0)).toThrow('Division by zero attempt');
    });

    it('should limit decimal places to maximum of 14', () => {
      Buffer.add(7);
      Buffer.add('/');
      expect(Buffer.calc(10005)).toBe(0.00069965017491);

      Buffer.add(5 / 3);
      Buffer.add('+');
      expect(Buffer.calc(5 / 9)).toBe(2.22222222222223);
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
      Buffer.add(10);
      expect(() => (Buffer.operator = '$')).toThrow('Invalid operator: $');
    });
  });

  describe('Clear method', () => {
    it('should set num and operator properties to null', () => {
      Buffer.add(7);
      Buffer.add('-');
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

  describe('validateSize in add()', () => {
    it('should throw error if number of digits > 15', () => {
      expect(() => Buffer.add('9999999999999999')).toThrowError();
    });
  });

  describe('validateOperands in calc()', () => {
    it('should throw error if number of digits > 15', () => {
      Buffer.add(1231);
      Buffer.add('-');
      expect(() => Buffer.calc('9999999999999999')).toThrowError();
    });

    it('should throw error if denominator is 5 digits larger than numerator', () => {
      Buffer.add(12345);
      Buffer.add('/');
      expect(() => Buffer.calc('1234554321')).toThrowError();
    });

    it('should throw error if total sum of operands digits is greater than 21', () => {
      Buffer.add(123456789);
      Buffer.add('*');
      expect(() => Buffer.calc('1234554321987')).toThrowError();
    });
  });
});
