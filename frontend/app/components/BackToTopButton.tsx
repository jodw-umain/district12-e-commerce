"use client"

import { Button } from "./ui/button"
import { ArrowUp } from "lucide-react"

export function BackToTopButton() {
  return (
    <Button
      size="icon"
      className="fixed bottom-6 right-6 rounded-full bg-black text-white hover:bg-neutral-800 shadow-lg"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5" />
    </Button>
  )
}