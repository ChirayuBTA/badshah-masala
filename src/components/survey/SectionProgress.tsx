'use client';

interface Props {
  current: number;
  total: number;
  subtitle: string;
}

export default function SectionProgress({ current, total, subtitle }: Props) {
  return (
    <div className="flex flex-col gap-2 px-6 py-4">
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => {
          const state = i < current ? 'done' : i === current ? 'active' : 'pending';
          return (
            <div
              key={i}
              className="flex-1 h-1.5 rounded-full overflow-hidden bg-parchment-dark"
            >
              <div
                className={`h-full rounded-full transition-all duration-[400ms] ${
                  state === 'done'
                    ? 'w-full bg-crimson/50'
                    : state === 'active'
                    ? 'w-full bg-crimson'
                    : 'w-0 bg-crimson'
                }`}
                style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
              />
            </div>
          );
        })}
      </div>
      <p className="font-body text-xs text-espresso/50">
        <span className="font-semibold text-espresso/70">
          Section {current + 1} of {total}
        </span>
        {' '}—{' '}{subtitle}
      </p>
    </div>
  );
}
