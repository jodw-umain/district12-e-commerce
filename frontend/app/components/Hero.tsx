import {HeroSection} from '@/sanity.types'

type HeroProps = {
  block: HeroSection
  index: number
}

export default function Hero({block}: HeroProps) {

  return (
    <section className="flex items-center">
      <div className="container py-6 px-2 sm:px-6">
        <div className="flex flex-col justify-between gap-5">
         <h1 className="text-5xl px-1 py-10 sel">{block.heading}</h1>
         <h2 className="text-2xl self-end">{block.subheading}</h2>
        </div>
      </div>
    </section>
  )
}
