import { describe, it, expect } from 'vitest';
import { createSampleImage } from './sampleImages';

describe('sampleImages utility', () => {
  it('should generate a valid data URL containing SVG for before image', () => {
    const url = createSampleImage('Test Title', 'Test Subtitle', true);
    expect(url).toBeTypeOf('string');
    expect(url.startsWith('data:image/svg+xml;charset=utf-8,')).toBe(true);
    const decoded = decodeURIComponent(url);
    expect(decoded).toContain('BEFORE');
    expect(decoded).toContain('Test Title');
  });

  it('should generate a valid data URL containing SVG for after image', () => {
    const url = createSampleImage('Test Title 2', 'Test Subtitle 2', false);
    expect(url).toBeTypeOf('string');
    expect(url.startsWith('data:image/svg+xml;charset=utf-8,')).toBe(true);
    const decoded = decodeURIComponent(url);
    expect(decoded).toContain('AFTER');
    expect(decoded).toContain('Test Title 2');
  });

  it('should escape XML special characters correctly', () => {
    const url = createSampleImage('UI & UX', 'Design <Draft> & "Review"', false);
    expect(url).toBeTypeOf('string');
    const decoded = decodeURIComponent(url);
    expect(decoded).toContain('UI &amp; UX');
    expect(decoded).toContain('Design &lt;Draft&gt; &amp; &quot;Review&quot;');
  });
});
