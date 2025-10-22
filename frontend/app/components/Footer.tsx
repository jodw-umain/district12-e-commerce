import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/utils'
import Link from 'next/link'
import { footerQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'

export default async function Footer() {
  const { data: footer } = await sanityFetch<any>({
    query: footerQuery,
    perspective: 'published',
  })

  if (!footer) return null

  return (
    <footer className="bg-black text-white py-12 px-8">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
        {footer.columns?.map((col: any) => (
          <div key={col.title}>
            <h4 className="font-semibold mb-4">{col.title}</h4>
            <ul className="space-y-2">
              {col.links?.map((link: any) => {
                const isExternal = link.url?.startsWith('http')
                return (
                  <li key={link.label}>
                    {link.url ? (
                      isExternal ? (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm hover:underline"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.url} className="text-sm hover:underline">
                          {link.label}
                        </Link>
                      )
                    ) : (
                      <span className="text-sm">{link.label}</span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}

        <div>
          {footer.contact?.title && (
            <h4 className="font-semibold mb-4">{footer.contact.title}</h4>
          )}

          {footer.contact?.contactItems?.length > 0 && (
            <ul className="space-y-2 text-sm">
              {footer.contact.contactItems.map((item: any, idx: number) => (
                <li key={idx}>
                  {item.url ? (
                    <a href={item.url} className="hover:underline">
                      {item.label ? `${item.label}: ` : ''}{item.value}
                    </a>
                  ) : (
                    <>
                      {item.label ? `${item.label}: ` : ''}{item.value}
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}

          {footer.contact?.socialLinks?.length > 0 && (
            <div className="flex gap-4 mt-4">
              {footer.contact.socialLinks.map((item: any) => (
                <a
                  key={item.platform}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  {item.icon?.url && (
                    <Image
                      src={item.icon.url}
                      alt={item.platform}
                      width={24}
                      height={24}
                      className="invert-[.8]"
                    />
                  )}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col items-end">
          {footer.logo && (
            <Image
              src={urlForImage(footer.logo)?.url() ?? ''}
              alt="Footer logo"
              width={120}
              height={60}
              className="object-contain"
            />
          )}
          {footer.description && (
            <p className="text-sm text-gray-400 mt-2">{footer.description}</p>
          )}
        </div>
      </div>
    </footer>
  )
}