'use client';

interface LottieProps {
  src: string;
  className?: string;
}

export function Lottie({ src, className = '' }: LottieProps) {
  return (
    <div className={`flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg ${className}`}>
      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
        Loading animation...
      </div>
    </div>
  );
}
