import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
}

const sizes = {
  sm: {
    image: 32,
    text: "text-lg",
  },
  md: {
    image: 42,
    text: "text-2xl",
  },
  lg: {
    image: 56,
    text: "text-3xl",
  },
};

export default function Logo({
  showText = true,
  size = "md",
  href = "/",
  className = "",
}: LogoProps) {
  const currentSize = sizes[size];

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 ${className}`}
    >
      <Image
        src="/gridFlow.png"
        alt="GridFlow"
        width={currentSize.image}
        height={currentSize.image}
        priority
        className="object-contain rounded-full"
      />

      {showText && (
        <span
          className={`${currentSize.text} font-bold tracking-tight`}
        >
          <span className="text-slate-900">Grid</span>
          <span className="text-green-500">Flow</span>
        </span>
      )}
    </Link>
  );
}