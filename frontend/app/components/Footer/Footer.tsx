import Image from 'next/image'
import {urlForImage} from '@/sanity/lib/utils'
import Link from 'next/link'
import {footerQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'

export default async function Footer() {
  const {data: footer} = await sanityFetch<any>({
    query: footerQuery,
    perspective: 'published',
  })

  if (!footer) return null

  return (
    <footer className="py-12 px-20 sm:h-[400px]">
      <div className="h-full flex justify-between max-w-6xl">
        <div className="flex flex-col justify-between">
          {footer.logo && (
            <Image
              src={urlForImage(footer.logo)?.url() ?? ''}
              alt={footer.logo?.alt || 'Footer Logo'}
              width={80}
              height={60}
              className="object-contain"
            />
          )}
          {footer.description && <p className="">{footer.description}</p>}
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
        <div className="flex flex-col justify-between">
          {/* links  */}
          <div>
            {footer.columns?.map((col: any) => (
              <div key={col.title}>
                <h4 className="mb-4">{col.title}</h4>
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
          </div>
          {/* contact us */}
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
                        {item.label ? `${item.label}: ` : ''}
                        {item.value}
                      </a>
                    ) : (
                      <>
                        {item.label ? `${item.label}: ` : ''}
                        {item.value}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
