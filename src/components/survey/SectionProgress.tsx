'use client';

interface Props {
  current: number;
  total: number;
  subtitle: string;
}

export default function SectionProgress({ current, total, subtitle }: Props) {
  return (
    <div className="flex flex-col gap-2 px-4 pb-3">
      {/* Segmented bar */}
      <div className="flex gap-1">
        {Array.from({ length: total }).map((_, i) => {
          const done   = i < current;
          const active = i === current;
          return (
            <div key={i} className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: '#E2D9D4' }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: done || active ? '100%' : '0%',
                  background: done ? 'rgba(190,30,45,0.45)' : active ? '#BE1E2D' : 'transparent',
                  transition: 'width 380ms cubic-bezier(0.23, 1, 0.32, 1)',
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Label */}
      <p className="font-body text-[11px]" style={{ color: 'rgba(26,8,0,0.45)' }}>
        <span className="font-semibold" style={{ color: 'rgba(26,8,0,0.65)' }}>
          {current + 1} / {total}
        </span>
        {'  ·  '}
        {subtitle}
      </p>
    </div>
  );
}
