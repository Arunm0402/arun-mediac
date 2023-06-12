import { contentHelper } from 'src/services/contentHelper';

const { sortenTitle, floatToPercent, renderColorFromName } = contentHelper();

describe('srotenTitle', () => {
  it('sorten title if it is longer than 10 characters', () => {
    expect(sortenTitle('test title', 5)).toBe('test ...');
  });
  it('does nothing if title is sorter than limit', () => {
    expect(sortenTitle('test', 5)).toBe('test');
  });
});

describe('floatToPercent', () => {
  it('convert float number to string with percentage', () => {
    expect(floatToPercent(0.55)).toBe('55.0%');
  });
});

describe('renderColorFromName', () => {
  it('return a hex color from 2nd character of name', () => {
    expect(typeof renderColorFromName('ab')).toBe('string');
  });
  it('returns orange when there is no 2nd character in name', () => {
    expect(typeof renderColorFromName('ab')).toBe('string');
  });
});
