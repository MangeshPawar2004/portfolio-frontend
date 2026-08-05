export default function Tag({ children }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs
                     font-mono text-[#A1A1AA] bg-[#161616] border border-[#242424]">
      {children}
    </span>
  )
}