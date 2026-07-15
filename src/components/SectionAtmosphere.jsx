/**
 * Static decorative background layers per section.
 * Pure CSS motion; no pointer tracking.
 */
function SectionAtmosphere({ variant }) {
  return (
    <div className={`section-atmosphere section-atmosphere--${variant}`} aria-hidden="true">
      <div className="section-atmosphere__glow" />
      <div className="section-atmosphere__pattern" />
    </div>
  )
}

export default SectionAtmosphere
