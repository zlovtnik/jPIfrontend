import { useEffect } from 'react'

type MetaOptions = {
  title?: string
  description?: string
  ogTitle?: string
  ogDescription?: string
}

function setMetaTag(name: string, value: string) {
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

export default function usePageMeta(opts: MetaOptions) {
  useEffect(() => {
    if (opts.title) document.title = opts.title
    if (opts.description) setMetaTag('description', opts.description)
    if (opts.ogTitle) setMetaTag('og:title', opts.ogTitle)
    if (opts.ogDescription) setMetaTag('og:description', opts.ogDescription)
  }, [opts.title, opts.description, opts.ogTitle, opts.ogDescription])
}
