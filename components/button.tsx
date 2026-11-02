import type { ComponentProps } from "react";

type Variant = "primary" | "outline";

export function buttonClasses(variant: Variant = "outline") {
  const base = "inline-flex w-fit items-center justify-center gap-2 rounded-full border font-medium no-underline motion-safe:active:translate-y-px";
  const style = variant === "primary"
    ? "min-h-[52px] border-signal bg-signal px-4 py-2 text-sm text-night hover:border-signal-hover hover:bg-signal-hover sm:px-6 sm:text-base"
    : "min-h-11 border-current/25 px-4 py-2 text-sm hover:border-current";

  return `${base} ${style}`;
}

export function ButtonLink({ variant, className = "", ...props }: ComponentProps<"a"> & { variant?: Variant }) {
  return <a className={`${buttonClasses(variant)} ${className}`} {...props} />;
}

export function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" />
    </svg>
  );
}
