import Image from 'next/image'
import Link from 'next/link'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer'

import {Button} from '../ui/button'
import {Menu} from 'lucide-react'
import ShoppingCartIcon from './ShoppingCartIcon'
import {NavbarQueryResult} from '@/sanity.types'
import {urlForImage} from '@/sanity/lib/utils'

interface DropdownItemResult {
  label: string
  url: string
}

interface MobileNavProps {
  navbarData: NavbarQueryResult
}

type NavItem = NonNullable<NonNullable<NavbarQueryResult>['items']>[number]

export default function MobileNav({navbarData}: MobileNavProps) {
  const logo = urlForImage(navbarData?.logo)?.url()
  const items = navbarData?.items
  const shoppingCartIcon = navbarData?.shoppingBagIcon

  const getDropdownItems = (item: NavItem): DropdownItemResult[] => {
    if (!item) return []

    switch (item.type) {
      case 'dropdown':
        return (
          item.dropdownItems?.map((dropdownItem) => ({
            label: dropdownItem.label || '',
            url: dropdownItem.url || '#',
          })) || []
        )

      case 'artists':
        if (item.showAllArtists) {
          return (
            navbarData?.allArtists?.map((artist) => ({
              label: artist.authorName || '',
              url: `/artists/${artist.slug?.current || ''}`,
            })) || []
          )
        }
        return (
          item.selectedArtists?.map((artist) => ({
            label: artist.authorName || '',
            url: `/artists/${artist.slug?.current || ''}`,
          })) || []
        )

      case 'categories':
        if (item.showAllCategories) {
          return (
            navbarData?.allCategories?.map((category) => ({
              label: category.title || '',
              url: `/categories/${category.slug?.current || ''}`,
            })) || []
          )
        }
        return (
          item.selectedCategories?.map((category) => ({
            label: category.title || '',
            url: `/categories/${category.slug?.current || ''}`,
          })) || []
        )

      default:
        return []
    }
  }

  return (
    <div className="flex items-center justify-between w-full">
      {/* Logo */}
      <Link href="/" aria-label="Home">
        {logo ? (
          <Image src={`${logo}`} alt="Site logo" width={60} height={40} priority />
        ) : (
          <span className="text-xl font-bold">District 12</span>
        )}
      </Link>

      <div className="flex items-center gap-2">
        {/* Shopping Cart */}
        <Button variant={'ghost'} size={'icon'} aria-label="Open cart">
          <Link href="/checkout" aria-label="Shopping cart icon" className="w-6 items-center">
            <ShoppingCartIcon icon={shoppingCartIcon} />
          </Link>
        </Button>

        {/* Mobile Menu Drawer */}
        <Drawer>
          <DrawerTrigger asChild aria-label="Open Menu">
            <Button variant={'ghost'} size={'icon'} aria-label="Open menu">
              <Menu width={40} height={60} />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[80vh] flex flex-col">
            <DrawerHeader className="flex-shrink-0">
              <DrawerTitle>Menu</DrawerTitle>
              <DrawerDescription>District 12</DrawerDescription>
            </DrawerHeader>

            <div className="flex-1 overflow-y-auto overscroll-contain">
              <nav
                className="px-6 py-4 space-y-4"
                role="navigation"
                aria-label="Mobile navigation menu"
              >
                {items?.map((item) => {
                  if (!item) return null

                  if (item.type === 'link') {
                    return (
                      <Link
                        key={item.label}
                        href={item.url || '#'}
                        className="block py-3 px-2 hover:text-brand transition-colors underline"
                        role="menuitem"
                      >
                        {item.label}
                      </Link>
                    )
                  }

                  const dropdownItems = getDropdownItems(item)
                  return (
                    <div
                      key={item.label}
                      className="space-y-2"
                      role="group"
                      aria-labelledby={`${item.label}-heading`}
                    >
                      <div
                        id={`${item.label}-heading`}
                        className="py-2 px-2 text-foreground font-medium"
                        role="heading"
                        aria-level={3}
                      >
                        {item.label}:
                      </div>
                      <div
                        className="pl-4 space-y-1"
                        role="menu"
                        aria-labelledby={`${item.label}-heading`}
                      >
                        {dropdownItems.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.label}
                            href={dropdownItem.url}
                            className="block py-2 px-2 hover:text-brand transition-colors underline"
                            role="menuitem"
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </nav>
            </div>

            <DrawerFooter className="flex-shrink-0">
              <DrawerClose asChild>
                <Button variant={'secondary'}>Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  )
}
