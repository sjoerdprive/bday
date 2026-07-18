interface Props {
  height: number;
  width: number;
  depth: number;
  angle: number;
  children?: React.ReactNode;
}

export const Box = ({ height, width, depth, angle, children }: Props) => {
  return (
    <div className="transform-3d perspective-[2000px] relative">
      {/* Box */}
      <div
        className="transform-3d  "
        style={{
          width,
          height,
          transform: `rotateX(-${angle}deg) rotateY(-${angle / 2}deg)`,
        }}
      >
        {/* Front */}
        <div
          style={{
            width,
            height,
            transform: `translateZ(${depth / 2}px)`,
          }}
          className="bg-amber-400 flex justify-center items-stretch absolute rounded-lg"
        >
          <div className="bg-red-400 w-1/6" />
        </div>
        {/* Back */}
        <div
          style={{
            width,
            height,
            transform: `translateZ(-${depth / 2}px)`,
          }}
          className="bg-amber-800 absolute"
        />
        {/* Left */}
        <div
          style={{
            width: depth,
            height,
            transform: `rotateY(90deg) translateZ(-${depth / 2 - 1}px)`,
          }}
          className="bg-amber-900 absolute rounded-tl-lg"
        />
        {/* Right */}
        <div
          style={{
            width: depth,
            height,
            transform: `rotateY(-90deg) translateZ(-${depth / 2}px)`,
          }}
          className="bg-amber-700 absolute rounded-tr-lg"
        />
        {children}
      </div>
    </div>
  );
};
