type MarqueeDirection = "ltr" | "rtl"

type MarqueeProps = {
  text: string
  direction: MarqueeDirection
  repeat?: number
}

const buildRepeatedItems = (text: string, count: number) =>
  Array.from({ length: count }, (_, index) => ({
    id: `${text}-${index}`,
    text,
  }))

export default function Marquee({ text, direction, repeat = 4 }: MarqueeProps) {
  const items = buildRepeatedItems(text, repeat)

  return (
    <div
      className={`marquee__row marquee__row--${direction}`}
      aria-hidden="true"
    >
      <div className="marquee__track">
        {items.map(({ id, text: itemText }) => (
          <span key={id}>{itemText}</span>
        ))}
      </div>
    </div>
  )
}
