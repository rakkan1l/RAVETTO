import React, { useEffect, useRef } from 'react';
import Odometer from 'odometer';

interface OdometerCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  format?: string;
  duration?: number;
}

export const OdometerCounter: React.FC<OdometerCounterProps> = ({
  value,
  prefix = '',
  suffix = '',
  className = 'font-mono font-bold',
  format = '(,ddd)',
  duration = 1000,
}) => {
  const elRef = useRef<HTMLSpanElement>(null);
  const odometerRef = useRef<Odometer | null>(null);

  useEffect(() => {
    if (!elRef.current) return;

    if (!odometerRef.current) {
      odometerRef.current = new Odometer({
        el: elRef.current,
        value: 0,
        format,
        duration,
        theme: 'minimal',
      });
      // Initial roll to value
      setTimeout(() => {
        odometerRef.current?.update(value);
      }, 50);
    } else {
      odometerRef.current.update(value);
    }
  }, [value, format, duration]);

  return (
    <span className={`inline-flex items-baseline ${className}`}>
      {prefix && <span className="mr-0.5">{prefix}</span>}
      <span ref={elRef} className="odometer">0</span>
      {suffix && <span className="ml-0.5">{suffix}</span>}
    </span>
  );
};
